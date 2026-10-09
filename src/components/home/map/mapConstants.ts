import type * as maplibregl from 'maplibre-gl';

export type MapLayerDefinition = Parameters<maplibregl.Map['addLayer']>[0];

export type CountryItem = {
    iso: string;
    name: string;
    focus: [number, number];
    highlightIso?: string;
    markerCoordinates: [number, number];
    markerLabelAlign?: 'left' | 'right';
    modalTitle: string;
    modalDescription: string;
    address: string;
    region: string;
    email?: string;
    phone?: string;
    aquacultureLabel: string;
    productHref: string;
};

export const COUNTRIES: CountryItem[] = [
    {
        iso: 'AUS',
        name: 'Australia',
        focus: [133.8, -25.3],
        highlightIso: 'AUS',
        markerCoordinates: [146.2, -32.4],
        markerLabelAlign: 'left',
        modalTitle: 'Australia Market',
        modalDescription: 'Commercial distribution coverage across Australia for Aqua Pharma treatment systems and support.',
        address: 'Sydney, Australia',
        region: 'Oceania',
        email: 'australia@aquapharma.example',
        aquacultureLabel: 'Shrimp',
        productHref: '/concepts/shrimp'
    },
    {
        iso: 'BEL',
        name: 'Belgium',
        focus: [4.6, 50.8],
        highlightIso: 'BEL',
        markerCoordinates: [4.55, 50.74],
        markerLabelAlign: 'right',
        modalTitle: 'Belgium Market',
        modalDescription: 'Benelux access point for formulation partnerships, supply coordination, and field support.',
        address: 'Brussels, Belgium',
        region: 'Europe',
        email: 'belgium@aquapharma.example',
        aquacultureLabel: 'Systems',
        productHref: '/systems-services'
    },
    {
        iso: 'CAN',
        name: 'Canada',
        focus: [-104, 56],
        highlightIso: 'CAN',
        markerCoordinates: [-124.2, 49.6],
        markerLabelAlign: 'left',
        modalTitle: 'Canada Market',
        modalDescription: 'North American delivery coverage for water chemistry systems, dosing workflows, and customer onboarding.',
        address: 'Toronto, Canada',
        region: 'North America',
        email: 'canada@aquapharma.example',
        aquacultureLabel: 'Fish',
        productHref: '/concepts/fish'
    },
    {
        iso: 'CHL',
        name: 'Chile',
        focus: [-72.5, -37.7],
        highlightIso: 'CHL',
        markerCoordinates: [-73.0, -41.5],
        markerLabelAlign: 'left',
        modalTitle: 'Chile Market',
        modalDescription: 'Regional support for Latin American aquaculture operations, conditioning systems, and treatment rollout.',
        address: 'Santiago, Chile',
        region: 'South America',
        email: 'chile@aquapharma.example',
        aquacultureLabel: 'Fish',
        productHref: '/concepts/fish'
    },
    {
        iso: 'ECU',
        name: 'Ecuador',
        focus: [-79.2, -1.5],
        highlightIso: 'ECU',
        markerCoordinates: [-80.25, -2.05],
        markerLabelAlign: 'left',
        modalTitle: 'Ecuador Market',
        modalDescription: 'Shrimp and aquaculture market support for formulation deployment, performance checks, and local coordination.',
        address: 'Quito, Ecuador',
        region: 'South America',
        email: 'ecuador@aquapharma.example',
        aquacultureLabel: 'Shrimp',
        productHref: '/concepts/shrimp'
    },
    {
        iso: 'IDN',
        name: 'Indonesia',
        focus: [118, -2.4],
        highlightIso: 'IDN',
        markerCoordinates: [113.4, -3.6],
        markerLabelAlign: 'left',
        modalTitle: 'Indonesia Market',
        modalDescription: 'Operational coverage for Southeast Asia with support around oxygenation, treatment quality, and local delivery.',
        address: 'Jakarta, Indonesia',
        region: 'Asia',
        email: 'indonesia@aquapharma.example',
        aquacultureLabel: 'Shrimp',
        productHref: '/concepts/shrimp'
    },
    {
        iso: 'NOR',
        name: 'Norway',
        focus: [10.4, 64.8],
        highlightIso: 'NOR',
        markerCoordinates: [7.9, 62.3],
        markerLabelAlign: 'right',
        modalTitle: 'Norway Market',
        modalDescription: 'Coverage for cold-water fish farming operations, treatment integration, and partner support in the Nordics.',
        address: 'Oslo, Norway',
        region: 'Europe',
        email: 'norway@aquapharma.example',
        aquacultureLabel: 'Fish',
        productHref: '/concepts/fish'
    },
    {
        iso: 'SCT',
        name: 'Scotland',
        focus: [-3.5, 56.4],
        highlightIso: 'GBR',
        markerCoordinates: [-4.65, 57.15],
        markerLabelAlign: 'left',
        modalTitle: 'Scotland Market',
        modalDescription: 'Scottish market coverage for salmon farming and partner operations, represented as a focused market point.',
        address: 'Edinburgh, Scotland',
        region: 'Europe',
        email: 'scotland@aquapharma.example',
        aquacultureLabel: 'Fish',
        productHref: '/concepts/fish'
    },
    {
        iso: 'GRC',
        name: 'Greece',
        focus: [23.7, 38],
        highlightIso: 'GRC',
        markerCoordinates: [23.7, 38],
        markerLabelAlign: 'right',
        modalTitle: 'Greece Market',
        modalDescription: 'Fish-health trials and application development in Greek waters.',
        address: 'Greece',
        region: 'Europe',
        aquacultureLabel: 'Fish',
        productHref: '/concepts/fish'
    }
];

export const MAP_STYLE = 'https://demotiles.maplibre.org/style.json';
export const LOCAL_COUNTRY_GEOJSON_URL = '/data/map-countries.geojson';
export const INITIAL_CENTER: [number, number] = [18, 32];
export const OVERVIEW_CENTER: [number, number] = [18, 32];
export const OVERVIEW_PITCH = 0;
export const OVERVIEW_BEARING = 0;
export const ACTIVE_FILL = '#edf1f5';
export const MARKET_FILL = '#edf1f5';
export const BASE_FILL = '#edf1f5';
export const BASE_LINE = '#d9e1ea';
export const BASE_WATER = '#ffffff';
export const BASE_BACKGROUND = '#ffffff';
export const COUNTRY_SOURCE_ID = 'countries-geojson';
export const COUNTRY_BASE_FILL_LAYER = 'countries-base-fill';
export const COUNTRY_BASE_STROKE_LAYER = 'countries-base-stroke';
export const COUNTRY_FILL_LAYER = 'highlighted-countries';
export const COUNTRY_STROKE_LAYER = 'highlighted-countries-stroke';
export const COUNTRY_ACTIVE_FILL_LAYER = 'active-country-fill';
export const COUNTRY_ACTIVE_STROKE_LAYER = 'active-country-stroke';
