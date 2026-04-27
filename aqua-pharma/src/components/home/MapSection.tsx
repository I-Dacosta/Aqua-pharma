'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Globe, MapPin } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import maplibregl from 'maplibre-gl';
import { AnimatedArrowButton, AnimatedArrowLink } from '../ui/AnimatedArrowCta';
import { ScrollReveal } from '../ui/ScrollReveal';

gsap.registerPlugin(useGSAP, ScrollTrigger);

type MapLayerDefinition = Parameters<maplibregl.Map['addLayer']>[0];
type MapPaintValue = Parameters<maplibregl.Map['setPaintProperty']>[2];

type CountryItem = {
    iso: string;
    name: string;
    focus: [number, number];
    highlightIso?: string;
    markerCoordinates: [number, number];
    modalTitle: string;
    modalDescription: string;
    address: string;
    region: string;
    email?: string;
    phone?: string;
};

const COUNTRIES: CountryItem[] = [
    {
        iso: 'AUS',
        name: 'Australia',
        focus: [133.8, -25.3],
        highlightIso: 'AUS',
        markerCoordinates: [151.2093, -33.8688],
        modalTitle: 'Australia Market',
        modalDescription: 'Commercial distribution coverage across Australia for Aqua Pharma treatment systems and support.',
        address: 'Sydney, Australia',
        region: 'Oceania',
        email: 'australia@aquapharma.example'
    },
    {
        iso: 'BEL',
        name: 'Belgium',
        focus: [4.6, 50.8],
        highlightIso: 'BEL',
        markerCoordinates: [4.3517, 50.8503],
        modalTitle: 'Belgium Market',
        modalDescription: 'Benelux access point for formulation partnerships, supply coordination, and field support.',
        address: 'Brussels, Belgium',
        region: 'Europe',
        email: 'belgium@aquapharma.example'
    },
    {
        iso: 'CAN',
        name: 'Canada',
        focus: [-96.5, 57],
        highlightIso: 'CAN',
        markerCoordinates: [-79.3832, 43.6532],
        modalTitle: 'Canada Market',
        modalDescription: 'North American delivery coverage for water chemistry systems, dosing workflows, and customer onboarding.',
        address: 'Toronto, Canada',
        region: 'North America',
        email: 'canada@aquapharma.example'
    },
    {
        iso: 'CHL',
        name: 'Chile',
        focus: [-71.3, -33.1],
        highlightIso: 'CHL',
        markerCoordinates: [-70.6693, -33.4489],
        modalTitle: 'Chile Market',
        modalDescription: 'Regional support for Latin American aquaculture operations, conditioning systems, and treatment rollout.',
        address: 'Santiago, Chile',
        region: 'South America',
        email: 'chile@aquapharma.example'
    },
    {
        iso: 'ECU',
        name: 'Ecuador',
        focus: [-78.3, -1.2],
        highlightIso: 'ECU',
        markerCoordinates: [-78.4678, -0.1807],
        modalTitle: 'Ecuador Market',
        modalDescription: 'Shrimp and aquaculture market support for formulation deployment, performance checks, and local coordination.',
        address: 'Quito, Ecuador',
        region: 'South America',
        email: 'ecuador@aquapharma.example'
    },
    {
        iso: 'IDN',
        name: 'Indonesia',
        focus: [118, -2.4],
        highlightIso: 'IDN',
        markerCoordinates: [106.8456, -6.2088],
        modalTitle: 'Indonesia Market',
        modalDescription: 'Operational coverage for Southeast Asia with support around oxygenation, treatment quality, and local delivery.',
        address: 'Jakarta, Indonesia',
        region: 'Asia',
        email: 'indonesia@aquapharma.example'
    },
    {
        iso: 'NOR',
        name: 'Norway',
        focus: [10.4, 64.8],
        highlightIso: 'NOR',
        markerCoordinates: [10.7522, 59.9139],
        modalTitle: 'Norway Market',
        modalDescription: 'Coverage for cold-water fish farming operations, treatment integration, and partner support in the Nordics.',
        address: 'Oslo, Norway',
        region: 'Europe',
        email: 'norway@aquapharma.example'
    },
    {
        iso: 'SCT',
        name: 'Scotland',
        focus: [-3.5, 56.4],
        highlightIso: 'GBR',
        markerCoordinates: [-3.1883, 55.9533],
        modalTitle: 'Scotland Market',
        modalDescription: 'Scottish market coverage for salmon farming and partner operations, represented as a focused market point.',
        address: 'Edinburgh, Scotland',
        region: 'Europe',
        email: 'scotland@aquapharma.example'
    },
    {
        iso: 'USA',
        name: 'USA',
        focus: [-98.5, 39.8],
        highlightIso: 'USA',
        markerCoordinates: [-87.6298, 41.8781],
        modalTitle: 'United States Market',
        modalDescription: 'Commercial and technical support for Aqua Pharma partners across the United States.',
        address: 'Chicago, United States',
        region: 'North America',
        email: 'usa@aquapharma.example'
    }
];

const MAP_STYLE = 'https://demotiles.maplibre.org/style.json';
const LOCAL_COUNTRY_GEOJSON_URL = '/data/map-countries.geojson';
const INITIAL_CENTER: [number, number] = [18, 7];
const OVERVIEW_CENTER: [number, number] = [18, 7];
const OVERVIEW_PITCH = 42;
const OVERVIEW_BEARING = 0;
const ACTIVE_FILL = '#f6af6e';
const MARKET_FILL = '#262D62';
const BASE_FILL = '#d7e4f2';
const BASE_LINE = '#ffffff';
const BASE_WATER = '#ffffff';
const BASE_BACKGROUND = '#ffffff';
const COUNTRY_SOURCE_ID = 'countries-geojson';
const COUNTRY_BASE_FILL_LAYER = 'countries-base-fill';
const COUNTRY_BASE_STROKE_LAYER = 'countries-base-stroke';
const COUNTRY_FILL_LAYER = 'highlighted-countries';
const COUNTRY_STROKE_LAYER = 'highlighted-countries-stroke';
const COUNTRY_ACTIVE_FILL_LAYER = 'active-country-fill';
const COUNTRY_ACTIVE_STROKE_LAYER = 'active-country-stroke';

function browserSupportsWebGL() {
    if (typeof window === 'undefined') {
        return false;
    }

    const canvas = document.createElement('canvas');

    try {
        return Boolean(canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch {
        return false;
    }
}

function getOverviewZoom(container: HTMLDivElement) {
    const aspectRatio = container.offsetWidth / Math.max(container.offsetHeight, 1);

    if (aspectRatio > 2.2) {
        return 1.12;
    }

    if (aspectRatio > 1.55) {
        return 1.2;
    }

    return 1.08;
}

function getOverviewPadding(container: HTMLDivElement) {
    const horizontal = Math.max(28, Math.min(88, Math.round(container.offsetWidth * 0.055)));

    return {
        top: Math.max(32, Math.round(container.offsetHeight * 0.08)),
        right: horizontal,
        bottom: Math.max(42, Math.round(container.offsetHeight * 0.1)),
        left: horizontal
    };
}

function getFocusPadding(container: HTMLDivElement) {
    return {
        top: Math.max(52, Math.round(container.offsetHeight * 0.11)),
        right: Math.max(52, Math.min(100, Math.round(container.offsetWidth * 0.08))),
        bottom: Math.max(104, Math.round(container.offsetHeight * 0.22)),
        left: Math.max(40, Math.min(84, Math.round(container.offsetWidth * 0.06)))
    };
}

function getMarketByIso(iso: string | null) {
    return COUNTRIES.find((country) => country.iso === iso) ?? null;
}

function buildCountryFilter(isos: string[]) {
    return [
        'any',
        ['in', ['get', 'adm0_a3'], ['literal', isos]],
        ['in', ['get', 'ADM0_A3'], ['literal', isos]],
        ['in', ['get', 'ISO_A3'], ['literal', isos]],
        ['in', ['get', 'iso_a3'], ['literal', isos]]
    ] as const;
}

function buildActiveCountryFilter(iso: string | null) {
    if (!iso) {
        return ['==', ['literal', '__inactive__'], ['literal', '__active__']] as const;
    }

    return [
        'any',
        ['==', ['get', 'adm0_a3'], iso],
        ['==', ['get', 'ADM0_A3'], iso],
        ['==', ['get', 'ISO_A3'], iso],
        ['==', ['get', 'iso_a3'], iso]
    ] as const;
}

function buildExcludedCountryFilter() {
    return [
        'all',
        ['!=', ['coalesce', ['get', 'adm0_a3'], ['get', 'ADM0_A3'], ['get', 'ISO_A3'], ['get', 'iso_a3'], ''], 'ATA'],
        ['!=', ['coalesce', ['get', 'ADMIN'], ['get', 'admin'], ['get', 'name_en'], ['get', 'NAME_EN'], ['get', 'NAME'], ['get', 'name'], ''], 'Antarctica']
    ] as const;
}

function getCountryFocusZoom(country: CountryItem) {
    switch (country.iso) {
        case 'BEL':
        case 'SCT':
            return 3.95;
        case 'ECU':
        case 'NOR':
            return 3.5;
        default:
            return 2.95;
    }
}

export function MapSection() {
    const initialMapError = typeof window !== 'undefined' && !browserSupportsWebGL()
        ? 'Interactive map unavailable in this browser. Enable hardware acceleration or try Safari or Chrome.'
        : null;
    const sectionRef = useRef<HTMLElement>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);
    const applyOverviewCameraRef = useRef<((animate: boolean) => void) | null>(null);
    const activeIsoRef = useRef<string | null>(null);
    const [activeCountryIso, setActiveCountryIso] = useState<string | null>(null);
    const [selectedMarketIso, setSelectedMarketIso] = useState<string | null>(null);
    const [isMapReady, setIsMapReady] = useState(false);
    const [mapError, setMapError] = useState<string | null>(initialMapError);

    const selectedMarket = getMarketByIso(selectedMarketIso);
    const fallbackMarket = COUNTRIES[0];
    const activeMarket = getMarketByIso(activeCountryIso) ?? selectedMarket ?? fallbackMarket;
    // Stores a focus request that arrived before the map was ready
    const pendingFocusRef = useRef<{ country: CountryItem; openModal: boolean } | null>(null);
    const focusMarketRef = useRef<((country: CountryItem | null, options?: { openModal?: boolean }) => void) | null>(null);
    const previewMarketRef = useRef<((country: CountryItem | null) => void) | null>(null);
    const selectedMarketIsoRef = useRef<string | null>(null);

    const applyActiveCountry = (country: CountryItem | null): void => {
        const map = mapRef.current;
        setActiveCountryIso(country?.iso ?? null);

        if (!map) {
            return;
        }

        activeIsoRef.current = country?.iso ?? null;

        const activeFilter = buildActiveCountryFilter(country?.highlightIso ?? null);

        if (map.getLayer(COUNTRY_ACTIVE_FILL_LAYER)) {
            map.setFilter(COUNTRY_ACTIVE_FILL_LAYER, activeFilter as unknown as maplibregl.FilterSpecification);
        }

        if (map.getLayer(COUNTRY_ACTIVE_STROKE_LAYER)) {
            map.setFilter(COUNTRY_ACTIVE_STROKE_LAYER, activeFilter as unknown as maplibregl.FilterSpecification);
        }
    };

    const previewMarket = (country: CountryItem | null): void => {
        applyActiveCountry(country ?? selectedMarket ?? null);
    };

    const focusMarket = (country: CountryItem | null, options?: { openModal?: boolean }): void => {
        const map = mapRef.current;

        if (!country) {
            setSelectedMarketIso(null);
            applyActiveCountry(null);
            applyOverviewCameraRef.current?.(true);
            return;
        }

        if (options?.openModal && selectedMarketIso === country.iso) {
            setSelectedMarketIso(null);
            applyActiveCountry(null);
            applyOverviewCameraRef.current?.(true);
            return;
        }

        if (options?.openModal) {
            setSelectedMarketIso(country?.iso ?? null);
        }

        // If the map isn't ready yet, store this focus request and apply it once ready
        if (!map) {
            if (country) {
                pendingFocusRef.current = { country, openModal: options?.openModal ?? false };
            }

            return;
        }

        applyActiveCountry(country);

        if (!options?.openModal) {
            return;
        }

        const focusContainer = mapContainerRef.current;

        map.easeTo({
            center: country.focus,
            zoom: getCountryFocusZoom(country),
            duration: 950,
            pitch: 46,
            bearing: 0,
            padding: focusContainer ? getFocusPadding(focusContainer) : undefined,
            essential: true,
            easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
        });
    };

    useEffect(() => {
        focusMarketRef.current = focusMarket;
        previewMarketRef.current = previewMarket;
    });

    useGSAP(() => {
        if (!isMapReady || !sectionRef.current || !applyOverviewCameraRef.current) {
            return;
        }

        // Re-apply the overview framing when the section scrolls back into view.
        const trigger = ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top 85%',
            end: 'top 15%',
            onEnter: () => {
                // Only auto-center if user hasn't manually selected a market yet
                if (!activeIsoRef.current) {
                    applyOverviewCameraRef.current?.(true);
                }
            },
            onEnterBack: () => {
                if (!activeIsoRef.current) {
                    applyOverviewCameraRef.current?.(true);
                }
            }
        });

        gsap.from('.map-section__panel', {
            y: 28,
            opacity: 0,
            duration: 0.95,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 82%',
            }
        });

        gsap.from('.map-section__hud', {
            y: -20,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 78%',
            }
        });

        gsap.to('.map-section__map-shell', {
            yPercent: -3,
            ease: 'none',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            }
        });

        return () => {
            trigger.kill();
        };
    }, { dependencies: [isMapReady], scope: sectionRef });

    useEffect(() => {
        if (!selectedMarketIso) {
            return;
        }

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                focusMarketRef.current?.(null);
            }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
    }, [selectedMarketIso]);

    useEffect(() => {
        selectedMarketIsoRef.current = selectedMarketIso;
    }, [selectedMarketIso]);

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
                    setMapError('Interactive map failed to start in this browser.');
                }
            });
            return;
        }

        mapRef.current = map;

        // Keep the interaction flat and direct: drag to pan, click to select.
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

        const loadHighlightedCountries = async () => {
            let data: GeoJSON.FeatureCollection | null = null;

            try {
                const response = await fetch(LOCAL_COUNTRY_GEOJSON_URL);
                if (response.ok) {
                    data = await response.json() as GeoJSON.FeatureCollection;
                }
            } catch {
                data = null;
            }

            if (!data || isDisposed || !mapRef.current) {
                if (!isDisposed && !data) {
                    setMapError('Interactive map data could not be loaded.');
                }

                return;
            }

            // Exclude Antarctica (ISO 'ATA') from the rendered source so it
            // does not appear on the map.
            const filteredFeatures = data.features.filter((feature) => {
                const props = feature.properties as Record<string, any> | null;
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

            // Click directly on a highlighted country polygon to open its modal
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

            let hoverIso: string | null = null;

            const getIsoFromFeature = (feature: maplibregl.MapGeoJSONFeature): string | null => {
                const p = feature.properties as Record<string, string>;
                return p['adm0_a3'] || p['ADM0_A3'] || p['ISO_A3'] || p['iso_a3'] || null;
            };

            map.on('mousemove', COUNTRY_FILL_LAYER, (e) => {
                const iso = e.features?.[0] ? getIsoFromFeature(e.features[0]) : null;
                if (iso !== hoverIso) {
                    hoverIso = iso;
                    map.getCanvas().style.cursor = iso ? 'pointer' : '';
                    const market = COUNTRIES.find((country) => country.highlightIso === iso || country.iso === iso) ?? null;
                    previewMarketRef.current?.(market);
                }
            });

            map.on('mouseleave', COUNTRY_FILL_LAYER, () => {
                if (hoverIso !== null) {
                    hoverIso = null;
                    map.getCanvas().style.cursor = '';
                    previewMarketRef.current?.(selectedMarket);
                }
            });

            // Click anywhere not on a highlighted country should reset selection (zoom out)
            handleMapClick = (e) => {
                try {
                    const features = map.queryRenderedFeatures(e.point, { layers: [COUNTRY_FILL_LAYER] });
                    if (!features || features.length === 0) {
                        if (selectedMarketIsoRef.current) {
                            focusMarketRef.current?.(null);
                        }
                    }
                } catch {
                    // ignore errors from queryRenderedFeatures
                }
            };

            map.on('click', handleMapClick);

            if (!isDisposed) {
                setMapError(null);
                setIsMapReady(true);

                // Apply any focus request that arrived before the map was ready
                const pending = pendingFocusRef.current;
                if (pending) {
                    pendingFocusRef.current = null;
                    // Short delay so the initial overview framing settles first.
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

            void loadHighlightedCountries().then(() => {
                if (!isDisposed) {
                    applyOverviewCamera(false);
                }
            });
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
                        ? 'Interactive map unavailable in this browser. Enable hardware acceleration or try Safari or Chrome.'
                        : 'Interactive map failed to load.'
                );
            }
        });

        return () => {
            isDisposed = true;
            window.removeEventListener('resize', handleResize);
            applyOverviewCameraRef.current = null;
            try {
                if (handleMapClick) {
                    map.off('click', handleMapClick as any);
                }
            } catch {
                // ignore
            }
            map.remove();
            mapRef.current = null;
        };
    }, []);

    return (
        <section ref={sectionRef} id="map-section" className="overflow-hidden bg-(--brand-paper) px-6 py-32 md:px-12 lg:px-20">
            <div className="mx-auto flex w-full max-w-[100rem] flex-col gap-0">
                <div className="map-section map-section__map-shell relative overflow-hidden bg-white lg:min-h-[34rem] xl:min-h-[40rem]">
                    <div className="pointer-events-none absolute left-1/2 top-1/2 z-1 h-160 w-2xl -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle,rgba(255,255,255,0.75)_0%,rgba(255,255,255,0.2)_34%,rgba(255,255,255,0)_72%)] blur-3xl md:h-200 md:w-225 xl:h-250 xl:w-275" />
                    <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0)_56%,rgba(255,255,255,0.22)_100%)]" />
                    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-32 bg-[linear-gradient(180deg,rgba(255,255,255,0.98)_0%,rgba(255,255,255,0)_100%)]" />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-[linear-gradient(0deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0)_100%)]" />

                        <div className="pointer-events-none absolute left-6 top-3 z-30 md:left-8 md:top-4">
                            <h2 className="font-heading text-[1.35rem] leading-[0.94] tracking-[-0.04em] text-(--brand-blue) md:text-[1.6rem]">
                                We operate around the world
                            </h2>
                        </div>

                        {!mapError ? (
                            <div className="map-section__hud pointer-events-auto absolute right-5 top-3 z-30 w-[min(18rem,calc(100%-2.5rem))] text-(--brand-blue) md:right-6 md:top-4 md:w-[19rem]">
                                <div>
                                    <h2 className="font-heading text-[1.35rem] leading-[0.94] tracking-[-0.04em] text-(--brand-blue) md:text-[1.5rem]">
                                        We operate around the world
                                    </h2>
                                    <h3 className="mt-2.5 font-heading text-[1.1rem] leading-[0.96] tracking-[-0.03em] text-(--brand-blue) md:text-[1.2rem]">
                                        {activeMarket.modalTitle}
                                    </h3>
                                    <p className="mt-2 text-[0.72rem] leading-[1.55] text-[rgba(51,51,51,0.74)] md:text-[0.76rem]">
                                        {activeMarket.modalDescription}
                                    </p>

                                    <div className="mt-3 grid gap-2 text-[0.72rem] text-[#2e3640] md:text-[0.76rem]">
                                        <div className="flex items-start gap-2.5">
                                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-(--brand-tangerine)" strokeWidth={1.8} />
                                            <span>{activeMarket.address}, {activeMarket.region}</span>
                                        </div>
                                    </div>

                                    <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-(--brand-glaucous)">
                                        <span className="inline-flex items-center gap-2">
                                            <span className="h-2 w-2 rounded-full bg-(--brand-tangerine)" />
                                            {COUNTRIES.length} markets
                                        </span>
                                        <span>{activeMarket.region}</span>
                                    </div>

                                    <div className="mt-3.5 flex flex-wrap items-center gap-3 text-[0.72rem] md:text-[0.76rem]">
                                        {activeMarket.email ? (
                                            <AnimatedArrowLink
                                                href={`mailto:${activeMarket.email}`}
                                                className="group/cta inline-flex items-center text-(--brand-tangerine) transition-colors hover:text-(--brand-blue)"
                                            >
                                                {activeMarket.email}
                                            </AnimatedArrowLink>
                                        ) : null}
                                        {selectedMarket ? (
                                            <AnimatedArrowButton
                                                onClick={() => {
                                                    setSelectedMarketIso(null);
                                                    focusMarket(null);
                                                }}
                                                className="group/cta inline-flex items-center text-(--brand-tangerine) transition-colors hover:text-(--brand-blue)"
                                            >
                                                Reset selection
                                            </AnimatedArrowButton>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                        ) : null}

                        <div className="relative h-[32rem] overflow-hidden sm:h-[36rem] lg:h-[42rem] xl:h-[46rem]">
                            <div className={`absolute inset-0 transition-opacity duration-500 ${isMapReady ? 'opacity-0' : 'opacity-100'}`}>
                                <Image
                                    src="/images/wp/home/world-presence.jpg"
                                    alt="Aqua Pharma world presence"
                                    fill
                                    className="object-cover object-center opacity-18 saturate-0"
                                    sizes="(min-width: 1280px) 90vw, 100vw"
                                />
                                <div className="absolute inset-0 bg-white/70" />
                            </div>

                            <div
                                ref={mapContainerRef}
                                className={`absolute inset-0 bg-white transition-opacity duration-500 ${isMapReady ? 'opacity-100' : 'opacity-0'}`}
                            />

                            {mapError ? (
                                <div className="pointer-events-none absolute left-1/2 top-10 z-30 w-[min(32rem,calc(100%-2rem))] -translate-x-1/2 text-center text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-[rgba(38,45,98,0.72)]">
                                    {mapError}
                                </div>
                            ) : null}
                        </div>

                        {!mapError ? (
                            <div className="pointer-events-none absolute bottom-6 left-6 z-30 inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-(--brand-glaucous)">
                                <Globe className="h-3 w-3 text-(--brand-tangerine)" strokeWidth={1.9} />
                                <span>Drag to explore · Hover or click a market</span>
                            </div>
                        ) : null}
                </div>

                <div className="map-section__panel pointer-events-auto min-h-[25vh] border border-(--brand-border) bg-white/56 backdrop-blur-[2px]">
                    <ScrollReveal className="p-6 md:p-8 xl:p-10" duration={0.86} yOffset={20} start="top 90%">
                        <div className="flex h-full flex-col justify-between gap-8">
                            <div>
                                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                                    <div>
                                        <p className="mb-2 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-(--brand-glaucous)">
                                            Market coverage
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-5 flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-(--brand-glaucous)">
                                    <span className="h-2 w-2 rounded-full bg-(--brand-tangerine)" />
                                    <span>Operating markets</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-x-6 gap-y-0 border-t border-(--brand-border) xl:grid-cols-3">
                                {COUNTRIES.map((country) => {
                                    const isActive = activeCountryIso === country.iso;
                                    const isSelected = selectedMarketIso === country.iso;

                                    return (
                                        <AnimatedArrowButton
                                            key={country.iso}
                                            onMouseEnter={() => previewMarket(country)}
                                            onFocus={() => previewMarket(country)}
                                            onMouseLeave={() => previewMarket(selectedMarket)}
                                            onBlur={() => previewMarket(selectedMarket)}
                                            onClick={() => focusMarket(country, { openModal: true })}
                                            iconClassName={isActive || isSelected ? 'h-2.5 w-5 text-(--brand-tangerine)' : 'h-2.5 w-5 text-(--brand-tangerine) opacity-0 transition-opacity group-hover/cta:opacity-100'}
                                            className={`group/cta flex w-full items-center justify-between border-b border-(--brand-border) py-3 text-left text-[0.8rem] font-light tracking-[0.03em] transition-colors ${
                                                isActive || isSelected
                                                    ? 'text-(--brand-blue)'
                                                    : 'text-[rgba(51,51,51,0.72)] hover:text-(--brand-glaucous)'
                                            }`}
                                        >
                                            <span>{country.name}</span>
                                        </AnimatedArrowButton>
                                    );
                                })}
                            </div>

                            <div className="mt-6 max-w-[58rem] space-y-3 text-[0.84rem] leading-[1.72] text-[rgba(51,51,51,0.78)]">
                                <p>
                                    Aqua Pharma operate in 9 countries (Australia, Belgium, Canada, Chile, Ecuador, Indonesia, Norway, Scotland and the USA), with around 50 employees across the globe.
                                </p>
                                <p>
                                    Aqua Pharma Group is structurally backed by two innovative parent companies,
                                    Solvay (a global leader in sustainable materials and solutions) and
                                    Aquatiq (a Norwegian reference in Food Safety).
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
            </section>
        );
    }
