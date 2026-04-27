import { useEffect, type RefObject } from 'react';
import maplibregl from 'maplibre-gl';
import {
    ACTIVE_FILL,
    BASE_BACKGROUND,
    BASE_FILL,
    BASE_LINE,
    BASE_WATER,
    COUNTRIES,
    COUNTRY_ACTIVE_FILL_LAYER,
    COUNTRY_ACTIVE_STROKE_LAYER,
    COUNTRY_BASE_FILL_LAYER,
    COUNTRY_BASE_STROKE_LAYER,
    COUNTRY_FILL_LAYER,
    COUNTRY_SOURCE_ID,
    COUNTRY_STROKE_LAYER,
    INITIAL_CENTER,
    MAP_STYLE,
    MARKET_FILL,
    OVERVIEW_BEARING,
    OVERVIEW_CENTER,
    OVERVIEW_PITCH,
    type CountryItem,
    type MapLayerDefinition
} from './mapConstants';
import {
    browserSupportsWebGL,
    buildActiveCountryFilter,
    buildCountryFilter,
    buildExcludedCountryFilter,
    getOverviewPadding,
    getOverviewZoom
} from './mapHelpers';

type MapErrors = {
    unsupportedBrowser: string;
    startupFailed: string;
    dataUnavailable: string;
    loadFailed: string;
};

type FocusOptions = { openModal?: boolean };
type FocusFn = (country: CountryItem | null, options?: FocusOptions) => void;
type PreviewFn = (country: CountryItem | null) => void;

type UseMapInitializationParams = {
    mapContainerRef: RefObject<HTMLDivElement | null>;
    mapRef: RefObject<maplibregl.Map | null>;
    applyOverviewCameraRef: RefObject<((animate: boolean) => void) | null>;
    onGeoJsonReadyRef: RefObject<((data: GeoJSON.FeatureCollection) => void) | null>;
    geoJsonCacheRef: RefObject<GeoJSON.FeatureCollection | null>;
    pendingFocusRef: RefObject<{ country: CountryItem; openModal: boolean } | null>;
    focusMarketRef: RefObject<FocusFn | null>;
    previewMarketRef: RefObject<PreviewFn | null>;
    selectedMarketIsoRef: RefObject<string | null>;
    selectedMarketRef: RefObject<CountryItem | null>;
    mapErrorsRef: RefObject<MapErrors>;
    activeIsoRef: RefObject<string | null>;
    setMapError: (value: string | null) => void;
    setIsMapReady: (value: boolean) => void;
};

export function useMapInitialization(params: UseMapInitializationParams) {
    const {
        mapContainerRef,
        mapRef,
        applyOverviewCameraRef,
        onGeoJsonReadyRef,
        geoJsonCacheRef,
        pendingFocusRef,
        focusMarketRef,
        previewMarketRef,
        selectedMarketIsoRef,
        selectedMarketRef,
        mapErrorsRef,
        activeIsoRef,
        setMapError,
        setIsMapReady
    } = params;

    useEffect(() => {
        const container = mapContainerRef.current;
        if (!container) {
            return;
        }

        let isDisposed = false;
        const initialZoom = getOverviewZoom(container);

        if (!browserSupportsWebGL()) {
            return;
        }

        let map: maplibregl.Map;

        try {
            map = new maplibregl.Map({
                container,
                style: MAP_STYLE,
                center: INITIAL_CENTER,
                zoom: initialZoom,
                pitch: OVERVIEW_PITCH,
                bearing: OVERVIEW_BEARING,
                attributionControl: false,
                dragRotate: false,
                pitchWithRotate: false,
                renderWorldCopies: false,
                minZoom: 0.8,
                maxZoom: 5.4
            });
        } catch {
            queueMicrotask(() => {
                if (!isDisposed) {
                    setMapError(mapErrorsRef.current.startupFailed);
                }
            });
            return;
        }

        mapRef.current = map;

        map.dragPan.enable();
        map.dragRotate.disable();
        map.scrollZoom.disable();
        map.boxZoom.disable();
        map.doubleClickZoom.disable();
        map.keyboard.disable();
        map.touchZoomRotate.disableRotation();

        const applyOverviewCamera = (animate: boolean) => {
            const overviewContainer = mapContainerRef.current;

            if (!overviewContainer) {
                return;
            }

            const cameraOptions = {
                center: OVERVIEW_CENTER,
                zoom: getOverviewZoom(overviewContainer),
                pitch: OVERVIEW_PITCH,
                bearing: OVERVIEW_BEARING,
                padding: getOverviewPadding(overviewContainer),
                essential: true
            } as const;

            if (animate) {
                map.easeTo({
                    ...cameraOptions,
                    duration: 1500,
                    easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
                });

                return;
            }

            map.jumpTo(cameraOptions);
        };

        applyOverviewCameraRef.current = applyOverviewCamera;

        let handleMapClick: ((e: maplibregl.MapMouseEvent) => void) | null = null;

        const applyGeoJsonToMap = (data: GeoJSON.FeatureCollection) => {
            if (isDisposed || !mapRef.current) return;

            const filteredFeatures = data.features.filter((feature) => {
                const props = feature.properties as Record<string, unknown> | null;
                if (!props) return true;
                const iso = props['adm0_a3'] || props['ADM0_A3'] || props['ISO_A3'] || props['iso_a3'] || null;
                const name = props['ADMIN'] || props['admin'] || props['name_en'] || props['NAME_EN'] || props['NAME'] || props['name'] || null;
                return iso !== 'ATA' && name !== 'Antarctica';
            });

            const styledData: GeoJSON.FeatureCollection = {
                ...data,
                features: filteredFeatures.map((feature) => ({
                    ...feature,
                    properties: {
                        ...feature.properties,
                        aquaColor: MARKET_FILL,
                        aquaHeight: 180000
                    }
                }))
            };

            if (!map.getSource(COUNTRY_SOURCE_ID)) {
                map.addSource(COUNTRY_SOURCE_ID, {
                    type: 'geojson',
                    data: styledData,
                    tolerance: 0
                });
            } else {
                const source = map.getSource(COUNTRY_SOURCE_ID) as maplibregl.GeoJSONSource;
                source.setData(styledData);
            }

            const highlightedIsos = COUNTRIES
                .map((country) => country.highlightIso)
                .filter((iso): iso is string => Boolean(iso));
            const countryFilter = buildCountryFilter(highlightedIsos);

            if (!map.getLayer(COUNTRY_FILL_LAYER)) {
                const baseFillLayer = {
                    id: COUNTRY_BASE_FILL_LAYER,
                    type: 'fill',
                    source: COUNTRY_SOURCE_ID,
                    paint: {
                        'fill-color': BASE_FILL,
                        'fill-opacity': 0.68
                    }
                } as unknown as MapLayerDefinition;

                map.addLayer(baseFillLayer);
            }

            if (!map.getLayer(COUNTRY_BASE_STROKE_LAYER)) {
                const baseStrokeLayer = {
                    id: COUNTRY_BASE_STROKE_LAYER,
                    type: 'line',
                    source: COUNTRY_SOURCE_ID,
                    paint: {
                        'line-color': BASE_LINE,
                        'line-width': 1,
                        'line-opacity': 0.9
                    }
                } as unknown as MapLayerDefinition;

                map.addLayer(baseStrokeLayer);
            }

            if (!map.getLayer(COUNTRY_FILL_LAYER)) {
                const fillLayer = {
                    id: COUNTRY_FILL_LAYER,
                    type: 'fill',
                    source: COUNTRY_SOURCE_ID,
                    filter: countryFilter,
                    paint: {
                        'fill-color': MARKET_FILL,
                        'fill-opacity': 0.96
                    }
                } as unknown as MapLayerDefinition;

                map.addLayer(fillLayer);
            }

            if (!map.getLayer(COUNTRY_STROKE_LAYER)) {
                const strokeLayer = {
                    id: COUNTRY_STROKE_LAYER,
                    type: 'line',
                    source: COUNTRY_SOURCE_ID,
                    filter: countryFilter,
                    paint: {
                        'line-color': BASE_LINE,
                        'line-width': 1.1,
                        'line-opacity': 1
                    }
                } as unknown as MapLayerDefinition;

                map.addLayer(strokeLayer);
            }

            if (!map.getLayer(COUNTRY_ACTIVE_FILL_LAYER)) {
                const activeFillLayer = {
                    id: COUNTRY_ACTIVE_FILL_LAYER,
                    type: 'fill',
                    source: COUNTRY_SOURCE_ID,
                    filter: buildActiveCountryFilter(activeIsoRef.current),
                    paint: {
                        'fill-color': ACTIVE_FILL,
                        'fill-opacity': 0.96
                    }
                } as unknown as MapLayerDefinition;

                map.addLayer(activeFillLayer);
            }

            if (!map.getLayer(COUNTRY_ACTIVE_STROKE_LAYER)) {
                const activeStrokeLayer = {
                    id: COUNTRY_ACTIVE_STROKE_LAYER,
                    type: 'line',
                    source: COUNTRY_SOURCE_ID,
                    filter: buildActiveCountryFilter(activeIsoRef.current),
                    paint: {
                        'line-color': BASE_LINE,
                        'line-width': 2.2,
                        'line-opacity': 1
                    }
                } as unknown as MapLayerDefinition;

                map.addLayer(activeStrokeLayer);
            }

            const handleCountryClick = (e: maplibregl.MapMouseEvent & { features?: maplibregl.MapGeoJSONFeature[] }) => {
                const feature = e.features?.[0];
                if (!feature) return;

                const props = feature.properties as Record<string, string>;
                const clickedIso =
                    props['adm0_a3'] ||
                    props['ADM0_A3'] ||
                    props['ISO_A3'] ||
                    props['iso_a3'] ||
                    null;

                if (!clickedIso) return;

                const market = COUNTRIES.find(
                    (c) => c.highlightIso === clickedIso || c.iso === clickedIso
                );

                if (market) {
                    focusMarketRef.current?.(market, { openModal: true });
                }
            };

            map.on('click', COUNTRY_FILL_LAYER, handleCountryClick);

            const hoverState = { iso: null as string | null };

            const getIsoFromFeature = (feature: maplibregl.MapGeoJSONFeature): string | null => {
                const p = feature.properties as Record<string, string>;
                return p['adm0_a3'] || p['ADM0_A3'] || p['ISO_A3'] || p['iso_a3'] || null;
            };

            map.on('mousemove', COUNTRY_FILL_LAYER, (e) => {
                const iso = e.features?.[0] ? getIsoFromFeature(e.features[0]) : null;
                if (iso !== hoverState.iso) {
                    hoverState.iso = iso;
                    map.getCanvas().style.cursor = iso ? 'pointer' : '';
                    const market = COUNTRIES.find((country) => country.highlightIso === iso || country.iso === iso) ?? null;
                    previewMarketRef.current?.(market);
                }
            });

            map.on('mouseleave', COUNTRY_FILL_LAYER, () => {
                if (hoverState.iso !== null) {
                    hoverState.iso = null;
                    map.getCanvas().style.cursor = '';
                    previewMarketRef.current?.(selectedMarketRef.current);
                }
            });

            handleMapClick = (e) => {
                let features: maplibregl.MapGeoJSONFeature[] = [];
                try {
                    features = map.queryRenderedFeatures(e.point, { layers: [COUNTRY_FILL_LAYER] });
                } catch {
                    return;
                }
                if (features.length > 0) return;
                if (!selectedMarketIsoRef.current) return;
                const focus = focusMarketRef.current;
                if (focus) focus(null);
            };

            map.on('click', handleMapClick);

            if (!isDisposed) {
                setMapError(null);
                setIsMapReady(true);

                const pending = pendingFocusRef.current;
                if (pending) {
                    pendingFocusRef.current = null;
                    setTimeout(() => {
                        if (!isDisposed && mapRef.current) {
                            focusMarketRef.current?.(pending.country, { openModal: pending.openModal });
                        }
                    }, 400);
                }
            }
        };

        map.on('style.load', () => {
            try {
                map.setProjection({ type: 'mercator' });
            } catch {
                // Ignore optional projection APIs if the current engine does not expose them.
            }
        });

        map.on('load', () => {
            const hiddenLayers = ['poi-label', 'transit-label', 'road-label', 'road-number-shield', 'geolines', 'geolines-label'];
            const excludedCountryFilter = buildExcludedCountryFilter();

            hiddenLayers.forEach((layerId) => {
                if (map.getLayer(layerId)) {
                    map.setLayoutProperty(layerId, 'visibility', 'none');
                }
            });

            ['countries', 'countries-fill', 'country-fill', 'country', 'country-outline', 'countries-boundary', 'coastline'].forEach((layerId) => {
                if (map.getLayer(layerId)) {
                    try {
                        map.setFilter(layerId, excludedCountryFilter as unknown as maplibregl.FilterSpecification);
                    } catch {
                        // Ignore style-specific filter differences.
                    }
                }
            });

            ['water', 'waterway'].forEach((layerId) => {
                if (map.getLayer(layerId)) {
                    try {
                        map.setPaintProperty(layerId, 'fill-color', BASE_WATER);
                    } catch {
                        // Ignore style-specific paint differences.
                    }
                }
            });

            ['background'].forEach((layerId) => {
                if (map.getLayer(layerId)) {
                    try {
                        map.setPaintProperty(layerId, 'background-color', BASE_BACKGROUND);
                    } catch {
                        // Ignore style-specific paint differences.
                    }
                }
            });

            [
                ['countries', 'fill-color', BASE_FILL],
                ['countries', 'fill-outline-color', BASE_LINE],
                ['countries-fill', 'fill-color', BASE_FILL],
                ['countries-boundary', 'line-color', BASE_LINE],
                ['coastline', 'line-color', '#ffffff'],
                ['geolines', 'line-color', 'rgba(38,45,98,0.12)'],
                ['crimea-fill', 'fill-color', BASE_FILL]
            ].forEach(([layerId, property, value]) => {
                if (map.getLayer(layerId)) {
                    try {
                        map.setPaintProperty(layerId, property, value);
                    } catch {
                        // Ignore style-specific paint differences.
                    }
                }
            });

            onGeoJsonReadyRef.current = (data) => {
                onGeoJsonReadyRef.current = null;
                applyGeoJsonToMap(data);
                if (!isDisposed) {
                    applyOverviewCamera(false);
                }
            };
            if (geoJsonCacheRef.current) {
                onGeoJsonReadyRef.current(geoJsonCacheRef.current);
            }
        });

        const handleResize = () => {
            if (!mapRef.current || !mapContainerRef.current) {
                return;
            }

            map.resize();

            applyOverviewCamera(false);
        };

        window.addEventListener('resize', handleResize);

        map.on('error', (event) => {
            if (!isDisposed) {
                setIsMapReady(false);
                setMapError(
                    event?.error?.message?.includes('WebGL')
                        ? mapErrorsRef.current.unsupportedBrowser
                        : mapErrorsRef.current.loadFailed
                );
            }
        });

        return () => {
            isDisposed = true;
            onGeoJsonReadyRef.current = null;
            window.removeEventListener('resize', handleResize);
            applyOverviewCameraRef.current = null;
            try {
                if (handleMapClick) {
                    map.off('click', handleMapClick);
                }
            } catch {
                // ignore
            }
            map.remove();
            mapRef.current = null;
        };
    }, [
        mapContainerRef,
        mapRef,
        applyOverviewCameraRef,
        onGeoJsonReadyRef,
        geoJsonCacheRef,
        pendingFocusRef,
        focusMarketRef,
        previewMarketRef,
        selectedMarketIsoRef,
        selectedMarketRef,
        mapErrorsRef,
        activeIsoRef,
        setMapError,
        setIsMapReady
    ]);
}
