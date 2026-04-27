"use client";

import { MapPin } from "lucide-react";
import { AnimatedArrowButton, AnimatedArrowLink } from "../../ui/AnimatedArrowCta";
import { COUNTRIES, type CountryItem } from "./mapConstants";
import type { MapMarket } from "@/i18n/site-content";

type MapHudProps = {
    sectionTitle: string;
    activeMarket: CountryItem;
    activeMarketCopy: MapMarket | null;
    selectedMarket: CountryItem | null;
    marketsSuffix: string;
    resetSelectionLabel: string;
    onResetSelection: () => void;
};

export function MapHud({
    sectionTitle,
    activeMarket,
    activeMarketCopy,
    selectedMarket,
    marketsSuffix,
    resetSelectionLabel,
    onResetSelection,
}: MapHudProps) {
    return (
        <div className="map-section__hud pointer-events-auto absolute right-5 top-3 z-30 w-[min(18rem,calc(100%-2.5rem))] text-(--brand-blue) md:right-6 md:top-4 md:w-[19rem]">
            <div>
                <h2 className="font-heading text-[1.35rem] leading-[0.94] tracking-[-0.04em] text-(--brand-blue) md:text-[1.5rem]">
                    {sectionTitle}
                </h2>
                <h3 className="mt-2.5 font-heading text-[1.1rem] leading-[0.96] tracking-[-0.03em] text-(--brand-blue) md:text-[1.2rem]">
                    {activeMarketCopy?.modalTitle ?? activeMarket.modalTitle}
                </h3>
                <p className="mt-2 text-[0.72rem] leading-[1.55] text-(--brand-ink-muted) md:text-[0.76rem]">
                    {activeMarketCopy?.modalDescription ?? activeMarket.modalDescription}
                </p>

                <div className="mt-3 grid gap-2 text-[0.72rem] text-(--brand-dark) md:text-[0.76rem]">
                    <div className="flex items-start gap-2.5">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-(--brand-tangerine)" strokeWidth={1.8} />
                        <span>{activeMarketCopy?.address ?? activeMarket.address}, {activeMarketCopy?.region ?? activeMarket.region}</span>
                    </div>
                </div>

                <div className="mt-3.5 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-(--brand-glaucous)">
                    <span className="inline-flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-(--brand-tangerine)" />
                        {COUNTRIES.length} {marketsSuffix}
                    </span>
                    <span>{activeMarketCopy?.region ?? activeMarket.region}</span>
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
                            onClick={onResetSelection}
                            className="group/cta inline-flex items-center text-(--brand-tangerine) transition-colors hover:text-(--brand-blue)"
                        >
                            {resetSelectionLabel}
                        </AnimatedArrowButton>
                    ) : null}
                </div>
            </div>
        </div>
    );
}
