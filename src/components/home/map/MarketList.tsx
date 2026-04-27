"use client";

import { AnimatedArrowButton } from "../../ui/AnimatedArrowCta";
import { COUNTRIES, type CountryItem } from "./mapConstants";
import type { MapMarket } from "@/i18n/site-content";

type MarketListProps = {
    activeCountryIso: string | null;
    selectedMarketIso: string | null;
    selectedMarket: CountryItem | null;
    getLocalizedMarket: (iso: string | null) => MapMarket | null;
    onPreview: (country: CountryItem | null) => void;
    onFocus: (country: CountryItem | null, options?: { openModal?: boolean }) => void;
};

export function MarketList({
    activeCountryIso,
    selectedMarketIso,
    selectedMarket,
    getLocalizedMarket,
    onPreview,
    onFocus,
}: MarketListProps) {
    return (
        <div className="grid grid-cols-2 gap-x-6 gap-y-0 border-t border-(--brand-border) xl:grid-cols-3">
            {COUNTRIES.map((country) => {
                const isActive = activeCountryIso === country.iso;
                const isSelected = selectedMarketIso === country.iso;

                return (
                    <AnimatedArrowButton
                        key={country.iso}
                        onMouseEnter={() => onPreview(country)}
                        onFocus={() => onPreview(country)}
                        onMouseLeave={() => onPreview(selectedMarket)}
                        onBlur={() => onPreview(selectedMarket)}
                        onClick={() => onFocus(country, { openModal: true })}
                        iconClassName={isActive || isSelected ? 'h-2.5 w-5 text-(--brand-tangerine)' : 'h-2.5 w-5 text-(--brand-tangerine) opacity-0 transition-opacity group-hover/cta:opacity-100'}
                        className={`group/cta flex w-full items-center justify-between border-b border-(--brand-border) py-3 text-left text-[0.8rem] font-light tracking-[0.03em] transition-colors ${
                            isActive || isSelected
                                ? 'text-(--brand-blue)'
                                : 'text-(--brand-ink-muted) hover:text-(--brand-glaucous)'
                        }`}
                    >
                        <span>{getLocalizedMarket(country.iso)?.name ?? country.name}</span>
                    </AnimatedArrowButton>
                );
            })}
        </div>
    );
}
