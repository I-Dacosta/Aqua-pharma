'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Award, Building2, Globe, Handshake, MapPin, Sparkles, X } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import maplibregl from 'maplibre-gl';

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

const STAT_CARDS = [
    { label: 'Founded in', value: '2012', plus: false, icon: Sparkles },
    { label: 'Network clients', value: '100', plus: true, icon: Handshake },
    { label: 'Markets served', value: '9', plus: false, icon: Building2 },
    { label: 'Certification marks', value: '4', plus: true, icon: Award }
] as const;

const MAP_STYLE = 'https://demotiles.maplibre.org/style.json';
const LOCAL_COUNTRY_GEOJSON_URL = '/data/map-countries.geojson';
const INITIAL_CENTER: [number, number] = [18, 7];
const OVERVIEW_CENTER: [number, number] = [18, 7];
const OVERVIEW_PITCH = 58;
const OVERVIEW_BEARING = 0;
const ACCENT = '#4e60ad';
const FOCUS = '#151f6d';
const STROKE = '#f6af6e';
const BASE_FILL = '#e3ebf2';
const BASE_LINE = '#ffffff';
const BASE_WATER = '#f7f9fc';
const BASE_BACKGROUND = '#ffffff';
const COUNTRY_SOURCE_ID = 'countries-geojson';
const COUNTRY_FILL_LAYER = 'highlighted-countries';
const COUNTRY_STROKE_LAYER = 'highlighted-countries-stroke';

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
        return 1.58;
    }

    if (aspectRatio > 1.55) {
        return 1.36;
    }

    return 1.16;
}

function getOverviewPadding(container: HTMLDivElement) {
    const horizontal = Math.max(32, Math.min(92, Math.round(container.offsetWidth * 0.07)));

    return {
        top: Math.max(56, Math.round(container.offsetHeight * 0.13)),
        right: horizontal,
        bottom: Math.max(88, Math.round(container.offsetHeight * 0.2)),
        left: horizontal
    };
}

function getFocusPadding(container: HTMLDivElement, reserveModalSpace: boolean) {
    return {
        top: Math.max(52, Math.round(container.offsetHeight * 0.11)),
        right: reserveModalSpace
            ? Math.max(144, Math.min(420, Math.round(container.offsetWidth * 0.34)))
            : Math.max(52, Math.min(100, Math.round(container.offsetWidth * 0.08))),
        bottom: Math.max(104, Math.round(container.offsetHeight * 0.22)),
        left: Math.max(40, Math.min(84, Math.round(container.offsetWidth * 0.06)))
    };
}

function getMarketByIso(iso: string | null) {
    return COUNTRIES.find((country) => country.iso === iso) ?? null;
}

function toRadians(value: number) {
    return (value * Math.PI) / 180;
}

function getDistanceBetween(a: [number, number], b: [number, number]) {
    const earthRadiusKm = 6371;
    const deltaLat = toRadians(b[1] - a[1]);
    const deltaLng = toRadians(b[0] - a[0]);
    const lat1 = toRadians(a[1]);
    const lat2 = toRadians(b[1]);

    const haversine =
        Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);

    return 2 * earthRadiusKm * Math.atan2(Math.sqrt(haversine), Math.sqrt(1 - haversine));
}

function getClosestMarket(userCoordinates: [number, number]) {
    return COUNTRIES.reduce((closest, market) => {
        const distance = getDistanceBetween(userCoordinates, market.markerCoordinates);

        if (!closest || distance < closest.distance) {
            return { market, distance };
        }

        return closest;
    }, null as { market: CountryItem; distance: number } | null)?.market ?? null;
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

function buildCountryFilter(isos: string[]) {
    return [
        'any',
        ['in', ['get', 'adm0_a3'], ['literal', isos]],
        ['in', ['get', 'ADM0_A3'], ['literal', isos]],
        ['in', ['get', 'ISO_A3'], ['literal', isos]],
        ['in', ['get', 'iso_a3'], ['literal', isos]]
    ] as const;
}

function buildFillExpression(activeIso: string | null) {
    if (!activeIso) {
        return ACCENT;
    }

    return [
        'case',
        [
            'any',
            ['==', ['get', 'adm0_a3'], activeIso],
            ['==', ['get', 'ADM0_A3'], activeIso],
            ['==', ['get', 'ISO_A3'], activeIso],
            ['==', ['get', 'iso_a3'], activeIso]
        ],
        FOCUS,
        ACCENT
    ] as const;
}

function buildStrokeColorExpression(activeIso: string | null) {
    if (!activeIso) {
        return STROKE;
    }

    return [
        'case',
        [
            'any',
            ['==', ['get', 'adm0_a3'], activeIso],
            ['==', ['get', 'ADM0_A3'], activeIso],
            ['==', ['get', 'ISO_A3'], activeIso],
            ['==', ['get', 'iso_a3'], activeIso]
        ],
        FOCUS,
        STROKE
    ] as const;
}

function buildStrokeWidthExpression(activeIso: string | null) {
    if (!activeIso) {
        return 1.3;
    }

    return [
        'case',
        [
            'any',
            ['==', ['get', 'adm0_a3'], activeIso],
            ['==', ['get', 'ADM0_A3'], activeIso],
            ['==', ['get', 'ISO_A3'], activeIso],
            ['==', ['get', 'iso_a3'], activeIso]
        ],
        2.4,
        1.3
    ] as const;
}

export function MapSection() {
    const initialMapError = typeof window !== 'undefined' && !browserSupportsWebGL()
        ? 'Interactive map unavailable in this browser. Enable hardware acceleration or try Safari or Chrome.'
        : null;
    const sectionRef = useRef<HTMLElement>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);
    const markersRef = useRef<maplibregl.Marker[]>([]);
    const applyOverviewCameraRef = useRef<((animate: boolean) => void) | null>(null);
    const activeIsoRef = useRef<string | null>(null);
    const [activeCountryIso, setActiveCountryIso] = useState<string | null>(null);
    const [selectedMarketIso, setSelectedMarketIso] = useState<string | null>(null);
    const [closestMarketIso, setClosestMarketIso] = useState<string | null>(null);
    const [isMapReady, setIsMapReady] = useState(false);
    const [mapError, setMapError] = useState<string | null>(initialMapError);

    const selectedMarket = getMarketByIso(selectedMarketIso);
    // Stores a geolocation result that arrived before the map was ready
    const pendingFocusRef = useRef<{ country: CountryItem; openModal: boolean } | null>(null);
    const focusMarketRef = useRef<((country: CountryItem | null, options?: { openModal?: boolean }) => void) | null>(null);

    const focusMarket = (country: CountryItem | null, options?: { openModal?: boolean }) => {
        const map = mapRef.current;
        activeIsoRef.current = country?.iso ?? null;
        setActiveCountryIso(country?.iso ?? null);

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

        if (map.getLayer(COUNTRY_FILL_LAYER)) {
            map.setPaintProperty(COUNTRY_FILL_LAYER, 'fill-color', buildFillExpression(country?.highlightIso ?? null) as MapPaintValue);
        }

        if (map.getLayer(COUNTRY_STROKE_LAYER)) {
            map.setPaintProperty(COUNTRY_STROKE_LAYER, 'line-color', buildStrokeColorExpression(country?.highlightIso ?? null) as MapPaintValue);
            map.setPaintProperty(COUNTRY_STROKE_LAYER, 'line-width', buildStrokeWidthExpression(country?.highlightIso ?? null) as MapPaintValue);
        }

        if (!country) {
            applyOverviewCameraRef.current?.(true);
            return;
        }

        const focusContainer = mapContainerRef.current;

        map.easeTo({
            center: country.focus,
            zoom: getCountryFocusZoom(country),
            duration: 950,
            pitch: 60,
            bearing: 0,
            padding: focusContainer ? getFocusPadding(focusContainer, false) : undefined,
            essential: true,
            easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
        });
    };

    useEffect(() => {
        focusMarketRef.current = focusMarket;
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

        return () => {
            trigger.kill();
        };
    }, { dependencies: [isMapReady], scope: sectionRef });

    useEffect(() => {
        if (typeof window === 'undefined' || !('geolocation' in navigator)) {
            return;
        }

        let cancelled = false;

        navigator.geolocation.getCurrentPosition(
            (position) => {
                if (cancelled) {
                    return;
                }

                const nearest = getClosestMarket([position.coords.longitude, position.coords.latitude]);

                if (!nearest) {
                    return;
                }

                setClosestMarketIso(nearest.iso);
                setSelectedMarketIso(nearest.iso);
                focusMarketRef.current?.(nearest, { openModal: true });
            },
            () => {
                if (!cancelled) {
                    setClosestMarketIso('BEL');
                    const fallbackMarket = getMarketByIso('BEL');

                    if (fallbackMarket) {
                        setSelectedMarketIso(fallbackMarket.iso);
                        focusMarketRef.current?.(fallbackMarket, { openModal: true });
                    }
                }
            },
            {
                enableHighAccuracy: false,
                timeout: 6000,
                maximumAge: 1000 * 60 * 60
            }
        );

        return () => {
            cancelled = true;
        };
    }, []);

    useEffect(() => {
        if (!selectedMarketIso) {
            return;
        }

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setSelectedMarketIso(null);
            }
        };

        window.addEventListener('keydown', onKeyDown);

        return () => {
            window.removeEventListener('keydown', onKeyDown);
        };
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

        const createMarketMarkers = () => {
            COUNTRIES.forEach((market) => {
                const markerNode = document.createElement('div');
                markerNode.className = 'map-section__office-marker';
                markerNode.setAttribute('aria-label', market.modalTitle);
                markerNode.setAttribute('role', 'button');
                markerNode.tabIndex = 0;

                const openMarketModal = () => {
                    focusMarketRef.current?.(market, { openModal: true });
                };

                markerNode.addEventListener('click', openMarketModal);
                markerNode.addEventListener('keydown', (event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        openMarketModal();
                    }
                });

                const marker = new maplibregl.Marker({ element: markerNode, anchor: 'center' })
                    .setLngLat(market.markerCoordinates)
                    .addTo(map);

                markersRef.current.push(marker);
            });
        };

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

            const styledData: GeoJSON.FeatureCollection = {
                ...data,
                features: data.features.map((feature) => ({
                    ...feature,
                    properties: {
                        ...feature.properties,
                        aquaColor: ACCENT,
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
                const fillLayer = {
                    id: COUNTRY_FILL_LAYER,
                    type: 'fill',
                    source: COUNTRY_SOURCE_ID,
                    filter: countryFilter,
                    paint: {
                        'fill-color': buildFillExpression(activeIsoRef.current),
                        'fill-opacity': 0.28,
                        'fill-outline-color': STROKE
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
                        'line-color': buildStrokeColorExpression(activeIsoRef.current),
                        'line-width': buildStrokeWidthExpression(activeIsoRef.current),
                        'line-opacity': 0.95,
                        'line-blur': 0.2
                    }
                } as unknown as MapLayerDefinition;

                map.addLayer(strokeLayer);
            }

            createMarketMarkers();

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

            // Hover highlight: brighten the country fill on mouseover so it feels clickable
            let hoverIso: string | null = null;

            const getIsoFromFeature = (feature: maplibregl.MapGeoJSONFeature): string | null => {
                const p = feature.properties as Record<string, string>;
                return p['adm0_a3'] || p['ADM0_A3'] || p['ISO_A3'] || p['iso_a3'] || null;
            };

            const buildHoverOpacity = (iso: string | null) => {
                if (!iso) return 0.28;
                return [
                    'case',
                    ['any',
                        ['==', ['get', 'adm0_a3'], iso],
                        ['==', ['get', 'ADM0_A3'], iso],
                        ['==', ['get', 'ISO_A3'], iso],
                        ['==', ['get', 'iso_a3'], iso]
                    ],
                    0.62,
                    0.28
                ];
            };

            map.on('mousemove', COUNTRY_FILL_LAYER, (e) => {
                const iso = e.features?.[0] ? getIsoFromFeature(e.features[0]) : null;
                if (iso !== hoverIso) {
                    hoverIso = iso;
                    map.getCanvas().style.cursor = iso ? 'pointer' : '';
                    map.setPaintProperty(COUNTRY_FILL_LAYER, 'fill-opacity', buildHoverOpacity(iso) as MapPaintValue);
                }
            });

            map.on('mouseleave', COUNTRY_FILL_LAYER, () => {
                if (hoverIso !== null) {
                    hoverIso = null;
                    map.getCanvas().style.cursor = '';
                    map.setPaintProperty(COUNTRY_FILL_LAYER, 'fill-opacity', 0.28 as MapPaintValue);
                }
            });

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
            const hiddenLayers = ['poi-label', 'transit-label', 'road-label', 'road-number-shield'];
            hiddenLayers.forEach((layerId) => {
                if (map.getLayer(layerId)) {
                    map.setLayoutProperty(layerId, 'visibility', 'none');
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
                ['coastline', 'line-color', '#b6c0c5'],
                ['geolines', 'line-color', '#cad3d7'],
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

            if (activeIsoRef.current) {
                const activeCountry = COUNTRIES.find((country) => country.iso === activeIsoRef.current) ?? null;

                if (activeCountry) {
                    focusMarketRef.current?.(activeCountry);
                }

                return;
            }

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
            markersRef.current.forEach((marker) => marker.remove());
            markersRef.current = [];
            applyOverviewCameraRef.current = null;
            map.remove();
            mapRef.current = null;
        };
    }, []);

    return (
        <section ref={sectionRef} id="map-section" className="overflow-hidden bg-(--brand-paper) px-3 py-14 md:px-4 md:py-18 lg:py-22">
            <div className="mx-auto grid w-full max-w-6xl gap-6 xl:grid-cols-[18rem_minmax(0,1fr)]">
                <aside className="pointer-events-auto flex flex-col justify-between rounded-[2.2rem] bg-(--brand-blue-soft) p-5 shadow-[0_22px_60px_rgba(21,31,109,0.08)] xl:p-6">
                    <div>
                        <p className="mb-3 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-(--brand-glaucous)">
                            Global operating footprint
                        </p>
                        <h2 className="font-heading text-[clamp(2.8rem,5vw,5.1rem)] leading-[0.88] tracking-[-0.065em] text-(--brand-blue)">
                            Trusted<br />across borders
                        </h2>
                        <p className="mt-4 max-w-68 text-[0.92rem] leading-[1.55] text-[rgba(51,51,51,0.74)] md:text-[0.98rem]">
                            Aqua Pharma&apos;s active markets in brand blue, on a focused 2D map tuned for fast scanning and direct market selection.
                        </p>

                        {closestMarketIso ? (
                            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/78 px-3 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-(--brand-glaucous) shadow-[0_10px_24px_rgba(21,31,109,0.08)] backdrop-blur-sm">
                                <MapPin className="h-3.5 w-3.5 text-(--brand-tangerine)" strokeWidth={1.8} />
                                <span>Closest: {getMarketByIso(closestMarketIso)?.name}</span>
                            </div>
                        ) : null}
                    </div>

                    <div className="mt-6 grid gap-2 sm:grid-cols-2 xl:grid-cols-1">
                        {STAT_CARDS.map((card) => {
                            const Icon = card.icon;

                            return (
                                <article
                                    key={card.label}
                                    className="rounded-3xl bg-white/82 px-4 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.82),0_12px_26px_rgba(21,31,109,0.06)] backdrop-blur-sm"
                                >
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="text-[0.63rem] font-semibold uppercase tracking-[0.14em] text-(--brand-glaucous)">
                                            {card.label}
                                        </p>
                                        <Icon className="h-3.5 w-3.5 text-(--brand-blue)" strokeWidth={1.7} />
                                    </div>

                                    <div className="mt-3 flex items-start text-(--brand-blue)">
                                        <span className="font-heading text-[2.85rem] leading-none tracking-[-0.07em] md:text-[3.2rem]">
                                            {card.value}
                                        </span>
                                        {card.plus ? (
                                            <span className="ml-1 pt-1 font-heading text-[1.5rem] leading-none text-(--brand-tangerine)">+</span>
                                        ) : null}
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </aside>

                <div className="space-y-3">
                    <div className="map-section relative overflow-hidden rounded-[2.2rem] bg-white shadow-[0_28px_90px_rgba(21,31,109,0.12)]">
                        <div className="pointer-events-none absolute left-1/2 top-[13%] z-1 h-112 w-md -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(78,96,173,0.24)_0%,rgba(246,175,110,0.14)_34%,rgba(255,255,255,0)_72%)] blur-3xl md:h-160 md:w-160" />
                        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.88),rgba(227,235,242,0)_34%)]" />
                        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-40 bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0)_100%)]" />
                        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-[linear-gradient(0deg,rgba(255,255,255,0.84)_0%,rgba(255,255,255,0)_100%)]" />
                        <div className="relative h-92 overflow-hidden sm:h-108 md:h-124 xl:h-140">
                            <div className={`absolute inset-0 transition-opacity duration-500 ${isMapReady ? 'opacity-0' : 'opacity-100'}`}>
                                <Image
                                    src="/map-fallback.svg"
                                    alt="Global market coverage map"
                                    fill
                                    priority={false}
                                    className="object-cover object-center"
                                    sizes="(min-width: 1280px) 70vw, 100vw"
                                />
                            </div>
                            <div ref={mapContainerRef} className={`absolute inset-0 transition-opacity duration-500 ${isMapReady ? 'opacity-100' : 'opacity-0'}`} />
                        </div>

                        {mapError ? (
                            <div className="pointer-events-none absolute left-1/2 top-10 z-30 w-[min(32rem,calc(100%-2rem))] -translate-x-1/2 rounded-full border border-(--brand-border) bg-white/92 px-5 py-3 text-center text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-[rgba(51,51,51,0.72)] shadow-[0_14px_30px_rgba(21,31,109,0.12)] backdrop-blur-md">
                                {mapError}
                            </div>
                        ) : null}
                    </div>

                    {isMapReady && !mapError ? (
                        <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-(--brand-border) bg-white/80 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-(--brand-glaucous) shadow-[0_8px_20px_rgba(21,31,109,0.1)] backdrop-blur-sm">
                            <Globe className="h-3 w-3 text-(--brand-tangerine)" strokeWidth={1.9} />
                            <span>Drag to explore · Click marker to view market</span>
                        </div>
                    ) : null}
                </div>
            </div>

            <div className="mx-auto mt-6 grid w-full max-w-6xl gap-4 xl:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
                <div className="pointer-events-auto rounded-[1.8rem] bg-(--brand-blue-soft) p-4 shadow-[0_22px_60px_rgba(21,31,109,0.08)] backdrop-blur-md md:p-5">
                    {selectedMarket ? (
                        <>
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-(--brand-glaucous)">
                                        {closestMarketIso === selectedMarket.iso ? 'Closest market to you' : selectedMarket.region}
                                    </p>
                                    <h3 className="mt-2 font-heading text-[1.7rem] leading-[0.92] tracking-[-0.05em] text-(--brand-blue)">
                                        {selectedMarket.modalTitle}
                                    </h3>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setSelectedMarketIso(null)}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-(--brand-border) bg-white/70 text-(--brand-blue) transition-colors hover:bg-white"
                                    aria-label="Close market details"
                                >
                                    <X className="h-4.5 w-4.5" strokeWidth={1.8} />
                                </button>
                            </div>

                            <p className="mt-3 text-[0.92rem] leading-[1.58] text-[rgba(51,51,51,0.74)]">
                                {selectedMarket.modalDescription}
                            </p>

                            <div className="mt-5 grid gap-3 text-[0.88rem] text-(--brand-dark)">
                                <div className="flex items-start gap-2.5">
                                    <MapPin className="mt-0.5 h-4 w-4 text-(--brand-tangerine)" strokeWidth={1.8} />
                                    <span>{selectedMarket.address}</span>
                                </div>
                                <div className="flex items-start gap-2.5">
                                    <Globe className="mt-0.5 h-4 w-4 text-(--brand-tangerine)" strokeWidth={1.8} />
                                    <span>{selectedMarket.region}</span>
                                </div>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2">
                                {selectedMarket.email ? (
                                    <a
                                        href={`mailto:${selectedMarket.email}`}
                                        className="rounded-full border border-(--brand-border) bg-white/80 px-3 py-2 text-[0.74rem] font-semibold uppercase tracking-[0.12em] text-(--brand-blue) transition-colors hover:bg-white"
                                    >
                                        {selectedMarket.email}
                                    </a>
                                ) : null}
                                <button
                                    type="button"
                                    onClick={() => focusMarket(selectedMarket)}
                                    className="rounded-full bg-(--brand-blue) px-3 py-2 text-[0.74rem] font-semibold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-92"
                                >
                                    Zoom to market
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-(--brand-glaucous)">
                                Market details
                            </p>
                            <h3 className="mt-2 font-heading text-[1.7rem] leading-[0.92] tracking-[-0.05em] text-(--brand-blue)">
                                Select a market
                            </h3>
                            <p className="mt-3 max-w-xl text-[0.92rem] leading-[1.58] text-[rgba(51,51,51,0.74)]">
                                Pick any country from the selector or click directly on the map to inspect the market, then zoom into its operating region.
                            </p>
                        </>
                    )}
                </div>

                <div className="pointer-events-auto rounded-[1.8rem] bg-(--brand-tangerine-soft)/40 p-4 shadow-[0_22px_60px_rgba(21,31,109,0.12)] backdrop-blur-md md:p-5">
                    <div className="flex flex-col gap-5 border-b border-(--brand-border) pb-5 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="mb-2 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-(--brand-glaucous)">
                                Market coverage
                            </p>
                            <h3 className="font-heading text-[clamp(1.75rem,3.6vw,2.7rem)] leading-[0.92] tracking-[-0.05em] text-(--brand-blue)">
                                We are worldwide
                            </h3>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.76rem] font-semibold uppercase tracking-[0.12em] text-(--brand-glaucous)">
                            <div className="flex items-center gap-2.5">
                                <span className="h-2.5 w-2.5 rounded-full bg-(--brand-tangerine)" />
                                <span>Operating Markets</span>
                            </div>
                        </div>
                    </div>

                    <div className="mt-4 grid gap-2 md:grid-cols-2 xl:grid-cols-3 xl:gap-x-3 xl:gap-y-2">
                        {COUNTRIES.map((country) => {
                            const isActive = activeCountryIso === country.iso;
                            const isSelected = selectedMarketIso === country.iso;
                            const isClosest = closestMarketIso === country.iso;

                            return (
                                <button
                                    key={country.iso}
                                    type="button"
                                    onMouseEnter={() => focusMarket(country)}
                                    onMouseLeave={() => focusMarket(selectedMarket)}
                                    onFocus={() => focusMarket(country)}
                                    onBlur={() => focusMarket(selectedMarket)}
                                    onClick={() => focusMarket(country, { openModal: true })}
                                    className={`flex items-center gap-3 rounded-full px-3 py-2 text-left text-[0.87rem] font-medium transition-colors ${
                                        isActive || isSelected ? 'bg-(--brand-blue) text-white' : 'text-(--brand-dark) hover:bg-white/75'
                                    }`}
                                >
                                    <span className={`h-2.5 w-2.5 rounded-full border border-(--brand-tangerine) ${isActive || isSelected ? 'bg-(--brand-tangerine)' : 'bg-transparent'}`} />
                                    <span>{country.name}</span>
                                    {isClosest ? (
                                        <span className="rounded-full bg-white/80 px-2 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-(--brand-glaucous)">
                                            Closest
                                        </span>
                                    ) : null}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
