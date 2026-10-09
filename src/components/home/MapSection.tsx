'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import * as maplibregl from 'maplibre-gl';
import { useSiteLocale } from '../core/SiteLocaleProvider';
import type { Locale } from '@/i18n/config';
import {
    COUNTRIES,
    COUNTRY_ACTIVE_FILL_LAYER,
    COUNTRY_ACTIVE_STROKE_LAYER,
    type CountryItem
} from './map/mapConstants';
import {
    buildActiveCountryFilter,
    loadCountriesGeoJson
} from './map/mapHelpers';
import { useMapInitialization } from './map/useMapInitialization';
import { useMapScrollAnimations } from './map/useMapScrollAnimations';

const snapshotCopy: Record<Locale, { title: string; employees: string; countries: string; jointVenture: string; partners: string; fish: string; shrimp: string }> = {
    en: { title: 'Markets Snapshot', employees: 'employees', countries: 'countries', jointVenture: 'joint venture', partners: 'Solvay & Aquatiq', fish: 'Fish', shrimp: 'Shrimp' },
    es: { title: 'Presencia global', employees: 'empleados', countries: 'países', jointVenture: 'empresa conjunta', partners: 'Solvay y Aquatiq', fish: 'Peces', shrimp: 'Camarón' },
    no: { title: 'Markeder i korte trekk', employees: 'ansatte', countries: 'land', jointVenture: 'fellesforetak', partners: 'Solvay og Aquatiq', fish: 'Fisk', shrimp: 'Reker' },
};

export function MapSection() {
    const router = useRouter();
    const { content, locale } = useSiteLocale();
    const snapshot = snapshotCopy[locale];
    const sectionRef = useRef<HTMLElement>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<maplibregl.Map | null>(null);
    const applyOverviewCameraRef = useRef<((animate: boolean) => void) | null>(null);
    const activeIsoRef = useRef<string | null>(null);
    const [isMapReady, setIsMapReady] = useState(false);
    const [mapError, setMapError] = useState<string | null>(null);
    const focusMarketRef = useRef<((country: CountryItem | null, options?: { openModal?: boolean }) => void) | null>(null);
    const previewMarketRef = useRef<((country: CountryItem | null) => void) | null>(null);
    const mapErrorsRef = useRef(content.home.map.errors);
    const geoJsonCacheRef = useRef<GeoJSON.FeatureCollection | null>(null);
    const onGeoJsonReadyRef = useRef<((data: GeoJSON.FeatureCollection) => void) | null>(null);

    const applyActiveCountry = (country: CountryItem | null): void => {
        const map = mapRef.current;

        activeIsoRef.current = country?.iso ?? null;

        if (!map) {
            return;
        }

        const activeFilter = buildActiveCountryFilter(country?.highlightIso ?? null);

        if (map.getLayer(COUNTRY_ACTIVE_FILL_LAYER)) {
            map.setFilter(COUNTRY_ACTIVE_FILL_LAYER, activeFilter as unknown as maplibregl.FilterSpecification);
        }

        if (map.getLayer(COUNTRY_ACTIVE_STROKE_LAYER)) {
            map.setFilter(COUNTRY_ACTIVE_STROKE_LAYER, activeFilter as unknown as maplibregl.FilterSpecification);
        }
    };

    const previewMarket = (country: CountryItem | null): void => {
        applyActiveCountry(country);
    };

    const focusMarket = (country: CountryItem | null): void => {
        if (!country) {
            previewMarket(null);
            return;
        }

        router.push(country.productHref);
    };

    useEffect(() => {
        focusMarketRef.current = focusMarket;
        previewMarketRef.current = previewMarket;
    });

    useMapScrollAnimations({ sectionRef, isMapReady, applyOverviewCameraRef, activeIsoRef });

    useEffect(() => {
        mapErrorsRef.current = content.home.map.errors;
    }, [content.home.map.errors]);

    useEffect(() => {
        let cancelled = false;
        loadCountriesGeoJson()
            .then((data) => {
                if (cancelled) return;
                geoJsonCacheRef.current = data;
                const apply = onGeoJsonReadyRef.current;
                if (apply) apply(data);
            })
            .catch(() => {
                if (!cancelled) setMapError(mapErrorsRef.current.dataUnavailable);
            });
        return () => { cancelled = true; };
    }, []);

    useMapInitialization({
        mapContainerRef,
        mapRef,
        applyOverviewCameraRef,
        onGeoJsonReadyRef,
        geoJsonCacheRef,
        focusMarketRef,
        previewMarketRef,
        mapErrorsRef,
        activeIsoRef,
        setMapError,
        setIsMapReady,
    });

    return (
        <section ref={sectionRef} id="map-section" className="overflow-hidden bg-white px-6 py-28 md:px-12 lg:px-20">
            <div className="mx-auto w-full max-w-[100rem]">
                <div className="mb-10">
                    <h2 className="font-heading text-[clamp(2.2rem,4vw,4.4rem)] font-light leading-[1.02] text-(--brand-blue)">{snapshot.title}</h2>
                    <div className="mt-10 grid grid-cols-1 border-y border-(--brand-blue)/15 sm:grid-cols-3">
                        <div className="flex items-baseline gap-3 py-6 sm:border-r sm:border-(--brand-blue)/15 sm:pr-8">
                            <strong className="font-heading text-[clamp(2.8rem,5vw,5rem)] font-light leading-none text-(--brand-blue)">40</strong>
                            <span className="text-[0.92rem] text-(--brand-ink-muted)">{snapshot.employees}</span>
                        </div>
                        <div className="flex items-baseline gap-3 border-t border-(--brand-blue)/15 py-6 sm:border-r sm:border-t-0 sm:px-8 sm:border-(--brand-blue)/15">
                            <strong className="font-heading text-[clamp(2.8rem,5vw,5rem)] font-light leading-none text-(--brand-blue)">{COUNTRIES.length}</strong>
                            <span className="text-[0.92rem] text-(--brand-ink-muted)">{snapshot.countries}</span>
                        </div>
                        <div className="flex items-baseline gap-3 border-t border-(--brand-blue)/15 py-6 sm:border-t-0 sm:pl-8">
                            <strong className="font-heading text-[clamp(2.8rem,5vw,5rem)] font-light leading-none text-(--brand-blue)">50/50</strong>
                            <span className="text-[0.92rem] leading-snug text-(--brand-ink-muted)">{snapshot.jointVenture}<br />{snapshot.partners}</span>
                        </div>
                    </div>
                    <div className="mt-5 flex gap-5 text-[0.78rem] uppercase text-(--brand-blue)/70"><span className="inline-flex items-center gap-2"><span aria-hidden="true" className="map-species-icon map-species-icon--fish" />{snapshot.fish}</span><span className="inline-flex items-center gap-2"><span aria-hidden="true" className="map-species-icon map-species-icon--shrimp" />{snapshot.shrimp}</span></div>
                </div>

                <div className="map-section map-section__map-shell relative -mx-6 overflow-hidden bg-white sm:mx-0">
                    <div className="relative aspect-[1.2/1] min-h-[14rem] overflow-hidden sm:aspect-[1.4/1]">
                        <div
                            ref={mapContainerRef}
                            className={`absolute inset-y-0 left-1/2 w-[90.8%] -translate-x-1/2 bg-white transition-opacity duration-500 sm:left-0 sm:w-full sm:translate-x-0 ${isMapReady ? 'opacity-100' : 'opacity-0'}`}
                        />

                        {mapError ? (
                            <div className="pointer-events-none absolute left-1/2 top-10 z-30 w-[min(32rem,calc(100%-2rem))] -translate-x-1/2 text-center text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-(--brand-blue)/72">
                                {mapError}
                            </div>
                        ) : null}

                        {!mapError && !isMapReady ? (
                            <div className="absolute inset-0 bg-[linear-gradient(180deg,#fff_0%,#f8fafc_100%)]" />
                        ) : null}
                    </div>
                </div>

                <nav className="mt-6 grid grid-cols-2 gap-x-5 sm:hidden" aria-label={snapshot.title}>
                    {COUNTRIES.map((country) => (
                        <Link
                            key={country.iso}
                            href={country.productHref}
                            className="map-section__mobile-market flex min-h-12 items-center gap-2 border-b border-(--brand-blue)/15 py-2 text-[0.78rem] font-semibold uppercase text-(--brand-blue)"
                        >
                            <span className="inline-flex w-10 shrink-0 items-center" aria-hidden="true">
                                {country.aquacultureLabel === 'Fish' || country.aquacultureLabel === 'Systems' ? <span className="map-species-icon map-species-icon--fish" /> : null}
                                {country.aquacultureLabel === 'Shrimp' || country.aquacultureLabel === 'Systems' ? <span className="map-species-icon map-species-icon--shrimp" /> : null}
                            </span>
                            <span>{country.name}</span>
                        </Link>
                    ))}
                </nav>

                <div className="type-body mt-10 max-w-[58rem] text-(--brand-ink-muted)">
                    <p>{content.home.map.parentSummary}</p>
                </div>
            </div>
        </section>
    );
}
