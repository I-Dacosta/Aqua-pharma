import { COUNTRIES, LOCAL_COUNTRY_GEOJSON_URL, type CountryItem } from './mapConstants';

let countriesGeoJsonPromise: Promise<GeoJSON.FeatureCollection> | null = null;

export function loadCountriesGeoJson(): Promise<GeoJSON.FeatureCollection> {
    if (typeof window === 'undefined') {
        return Promise.reject(new Error('SSR'));
    }
    if (!countriesGeoJsonPromise) {
        countriesGeoJsonPromise = fetch(LOCAL_COUNTRY_GEOJSON_URL).then((r) => {
            if (!r.ok) throw new Error('HTTP error');
            return r.json() as Promise<GeoJSON.FeatureCollection>;
        });
    }
    return countriesGeoJsonPromise;
}

export function browserSupportsWebGL() {
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

export function getOverviewZoom(container: HTMLDivElement) {
    const aspectRatio = container.offsetWidth / Math.max(container.offsetHeight, 1);

    if (aspectRatio > 2.2) {
        return 1.12;
    }

    if (aspectRatio > 1.55) {
        return 1.2;
    }

    return 1.08;
}

export function getOverviewPadding(container: HTMLDivElement) {
    const horizontal = Math.max(28, Math.min(88, Math.round(container.offsetWidth * 0.055)));

    return {
        top: Math.max(32, Math.round(container.offsetHeight * 0.08)),
        right: horizontal,
        bottom: Math.max(42, Math.round(container.offsetHeight * 0.1)),
        left: horizontal
    };
}

export function getFocusPadding(container: HTMLDivElement) {
    return {
        top: Math.max(52, Math.round(container.offsetHeight * 0.11)),
        right: Math.max(52, Math.min(100, Math.round(container.offsetWidth * 0.08))),
        bottom: Math.max(104, Math.round(container.offsetHeight * 0.22)),
        left: Math.max(40, Math.min(84, Math.round(container.offsetWidth * 0.06)))
    };
}

export function getMarketByIso(iso: string | null) {
    return COUNTRIES.find((country) => country.iso === iso) ?? null;
}

export function buildCountryFilter(isos: string[]) {
    return [
        'any',
        ['in', ['get', 'adm0_a3'], ['literal', isos]],
        ['in', ['get', 'ADM0_A3'], ['literal', isos]],
        ['in', ['get', 'ISO_A3'], ['literal', isos]],
        ['in', ['get', 'iso_a3'], ['literal', isos]]
    ] as const;
}

export function buildActiveCountryFilter(iso: string | null) {
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

export function buildExcludedCountryFilter() {
    return [
        'all',
        ['!=', ['coalesce', ['get', 'adm0_a3'], ['get', 'ADM0_A3'], ['get', 'ISO_A3'], ['get', 'iso_a3'], ''], 'ATA'],
        ['!=', ['coalesce', ['get', 'ADMIN'], ['get', 'admin'], ['get', 'name_en'], ['get', 'NAME_EN'], ['get', 'NAME'], ['get', 'name'], ''], 'Antarctica']
    ] as const;
}

export function getCountryFocusZoom(country: CountryItem) {
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
