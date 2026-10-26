"use client";

import { useSiteLocale } from "@/components/core/SiteLocaleProvider";
import { COUNTRIES } from "@/components/home/map/mapConstants";
import { marketSnapshotCopy } from "@/components/home/map/marketSnapshotCopy";

export function MarketsSnapshot() {
    const { locale } = useSiteLocale();
    const snapshot = marketSnapshotCopy[locale];

    return (
        <section id="markets-snapshot" aria-labelledby="markets-snapshot-title" className="bg-white px-6 py-28 md:px-12 lg:px-20">
            <div className="mx-auto w-full max-w-[100rem]">
                <h2 id="markets-snapshot-title" className="font-heading text-[clamp(2.2rem,4vw,4.4rem)] font-light leading-[1.02] text-(--brand-blue)">{snapshot.title}</h2>
                <div className="mt-10 grid grid-cols-1 border-y border-(--brand-blue)/15 sm:grid-cols-3">
                    <div className="flex items-baseline gap-3 py-6 sm:border-r sm:border-(--brand-blue)/15 sm:pr-8">
                        <strong className="font-heading text-[clamp(2.8rem,5vw,5rem)] font-light leading-none text-(--brand-blue)">40</strong>
                        <span className="text-[1.02rem] font-medium uppercase tracking-[0.08em] text-(--brand-ink-muted)">{snapshot.employees}</span>
                    </div>
                    <div className="flex items-baseline gap-3 border-t border-(--brand-blue)/15 py-6 sm:border-r sm:border-t-0 sm:border-(--brand-blue)/15 sm:px-8">
                        <strong className="font-heading text-[clamp(2.8rem,5vw,5rem)] font-light leading-none text-(--brand-blue)">{COUNTRIES.length}</strong>
                        <span className="text-[1.02rem] font-medium uppercase tracking-[0.08em] text-(--brand-ink-muted)">{snapshot.countries}</span>
                    </div>
                    <div className="flex items-center gap-3 border-t border-(--brand-blue)/15 py-6 sm:justify-center sm:border-t-0">
                        <strong className="shrink-0 font-heading text-[clamp(2.8rem,5vw,5rem)] font-light leading-none text-(--brand-blue)">50/50</strong>
                        <span className="shrink-0 whitespace-nowrap text-[1.02rem] font-medium leading-snug text-(--brand-ink-muted)">
                            <span className="uppercase tracking-[0.08em]">{snapshot.jointVenture}</span>
                            <br />
                            <span>{snapshot.partners}</span>
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
