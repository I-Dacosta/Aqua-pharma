'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Globe } from 'lucide-react';
import maplibregl from 'maplibre-gl';
import { useSiteLocale } from '../core/SiteLocaleProvider';
import { ScrollReveal } from '../ui/ScrollReveal';
import {
    COUNTRIES,
    COUNTRY_ACTIVE_FILL_LAYER,
    COUNTRY_ACTIVE_STROKE_LAYER,
    type CountryItem
} from './map/mapConstants';
import {
    browserSupportsWebGL,
    buildActiveCountryFilter,
    getFocusPadding,
    getCountryFocusZoom,
    getMarketByIso,
    loadCountriesGeoJson
} from './map/mapHelpers';
import { useMapInitialization } from './map/useMapInitialization';
import { useMapScrollAnimations } from './map/useMapScrollAnimations';
import { MapHud } from './map/MapHud';
import { MarketList } from './map/MarketList';

export function MapSection() {
    const { content } = useSiteLocale();
    const initialMapError = typeof window !== 'undefined' && !browserSupportsWebGL()
        ? content.home.map.errors.unsupportedBrowser
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
    const localizedMarkets = content.home.map.markets;
    const getLocalizedMarket = (iso: string | null) => localizedMarkets.find((market) => market.iso === iso) ?? null;
    const activeMarketCopy = getLocalizedMarket(activeMarket.iso);
    const pendingFocusRef = useRef<{ country: CountryItem; openModal: boolean } | null>(null);
    const focusMarketRef = useRef<((country: CountryItem | null, options?: { openModal?: boolean }) => void) | null>(null);
    const previewMarketRef = useRef<((country: CountryItem | null) => void) | null>(null);
    const selectedMarketIsoRef = useRef<string | null>(null);
    const selectedMarketRef = useRef<CountryItem | null>(selectedMarket);
    const mapErrorsRef = useRef(content.home.map.errors);
    const geoJsonCacheRef = useRef<GeoJSON.FeatureCollection | null>(null);
    const onGeoJsonReadyRef = useRef<((data: GeoJSON.FeatureCollection) => void) | null>(null);

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
        applyActiveCountry(country ?? selectedMarketRef.current ?? null);
    };

    const focusMarket = (country: CountryItem | null, options?: { openModal?: boolean }): void => {
        const map = mapRef.current;

        if (!country) {
            setSelectedMarketIso(null);
            applyActiveCountry(null);
            applyOverviewCameraRef.current?.(true);
            return;
        }

        if (options?.openModal && selectedMarketIsoRef.current === country.iso) {
            setSelectedMarketIso(null);
            applyActiveCountry(null);
            applyOverviewCameraRef.current?.(true);
            return;
        }

        if (options?.openModal) {
            setSelectedMarketIso(country?.iso ?? null);
        }

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

    useMapScrollAnimations({ sectionRef, isMapReady, applyOverviewCameraRef, activeIsoRef });

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
        selectedMarketRef.current = selectedMarket;
    }, [selectedMarket]);

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
        pendingFocusRef,
        focusMarketRef,
        previewMarketRef,
        selectedMarketIsoRef,
        selectedMarketRef,
        mapErrorsRef,
        activeIsoRef,
        setMapError,
        setIsMapReady,
    });

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
                            {content.home.map.sectionTitle}
                        </h2>
                    </div>

                    {!mapError ? (
                        <MapHud
                            sectionTitle={content.home.map.sectionTitle}
                            activeMarket={activeMarket}
                            activeMarketCopy={activeMarketCopy}
                            selectedMarket={selectedMarket}
                            marketsSuffix={content.home.map.marketsSuffix}
                            resetSelectionLabel={content.home.map.resetSelection}
                            onResetSelection={() => {
                                setSelectedMarketIso(null);
                                focusMarket(null);
                            }}
                        />
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
                            <div className="pointer-events-none absolute left-1/2 top-10 z-30 w-[min(32rem,calc(100%-2rem))] -translate-x-1/2 text-center text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-(--brand-blue)/72">
                                {mapError}
                            </div>
                        ) : null}
                    </div>

                    {!mapError ? (
                        <div className="pointer-events-none absolute bottom-6 left-6 z-30 inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-(--brand-glaucous)">
                            <Globe className="h-3 w-3 text-(--brand-tangerine)" strokeWidth={1.9} />
                            <span>{content.home.map.dragHint}</span>
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
                                            {content.home.map.coverageLabel}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-5 flex items-center gap-2 text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-(--brand-glaucous)">
                                    <span className="h-2 w-2 rounded-full bg-(--brand-tangerine)" />
                                    <span>{content.home.map.operatingMarketsLabel}</span>
                                </div>
                            </div>

                            <MarketList
                                activeCountryIso={activeCountryIso}
                                selectedMarketIso={selectedMarketIso}
                                selectedMarket={selectedMarket}
                                getLocalizedMarket={getLocalizedMarket}
                                onPreview={previewMarket}
                                onFocus={focusMarket}
                            />

                            <div className="mt-6 max-w-[58rem] space-y-3 text-[0.84rem] leading-[1.72] text-(--brand-ink-muted)">
                                <p>{content.home.map.companySummary}</p>
                                <p>{content.home.map.parentSummary}</p>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}
