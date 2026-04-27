import type maplibregl from 'maplibre-gl';

export type MapLayerDefinition = Parameters<maplibregl.Map['addLayer']>[0];

export type CountryItem = {
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

export const COUNTRIES: CountryItem[] = [
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

export const MAP_STYLE = 'https://demotiles.maplibre.org/style.json';
export const LOCAL_COUNTRY_GEOJSON_URL = '/data/map-countries.geojson';
export const INITIAL_CENTER: [number, number] = [18, 7];
export const OVERVIEW_CENTER: [number, number] = [18, 7];
export const OVERVIEW_PITCH = 42;
export const OVERVIEW_BEARING = 0;
export const ACTIVE_FILL = '#6dc6e0';
export const MARKET_FILL = '#262d62';
export const BASE_FILL = '#e3ebf2';
export const BASE_LINE = '#ffffff';
export const BASE_WATER = '#ffffff';
export const BASE_BACKGROUND = '#ffffff';
export const COUNTRY_SOURCE_ID = 'countries-geojson';
export const COUNTRY_BASE_FILL_LAYER = 'countries-base-fill';
export const COUNTRY_BASE_STROKE_LAYER = 'countries-base-stroke';
export const COUNTRY_FILL_LAYER = 'highlighted-countries';
export const COUNTRY_STROKE_LAYER = 'highlighted-countries-stroke';
export const COUNTRY_ACTIVE_FILL_LAYER = 'active-country-fill';
export const COUNTRY_ACTIVE_STROKE_LAYER = 'active-country-stroke';
