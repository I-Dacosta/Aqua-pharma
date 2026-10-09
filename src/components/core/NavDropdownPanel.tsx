"use client";

import Image from "next/image";
import Link from "next/link";
import { getNavFeature } from "@/components/core/navFeatureCards";
import { EDGE_WIDE } from "@/lib/edge-wide";
import { useSiteLocale } from "@/components/core/SiteLocaleProvider";
import type { NavigationLink, NavigationSection } from "@/i18n/site-content";

const linkClass =
    "block text-[0.95rem] font-light leading-snug text-(--brand-blue)/72 transition-colors duration-200 hover:text-(--brand-blue) focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--brand-blue)";

function LinkList({ items, onNavigate }: { items: NavigationLink[]; onNavigate: () => void }) {
    return (
        <ul className="space-y-5">
            {items.map((item) => (
                <li key={item.name}>
                    <Link href={item.href} className={`${linkClass} ${item.indent ? "ml-4 text-(--brand-blue)/55" : ""}`} onClick={onNavigate}>
                        {item.name}
                    </Link>
                </li>
            ))}
        </ul>
    );
}

export function NavDropdownPanel({
    section,
    open,
    onNavigate,
}: {
    section: NavigationSection | undefined;
    open: boolean;
    onNavigate: () => void;
}) {
    const { content } = useSiteLocale();

    if (!section) {
        return null;
    }

    const feature = getNavFeature(section, content);

    return (
        <div
            aria-hidden={!open}
            className={`absolute inset-x-0 top-full hidden bg-white px-6 text-(--brand-blue) shadow-[0_40px_60px_-30px_rgba(20,26,66,0.18)] transition-[opacity,visibility] duration-200 ease-out md:px-12 lg:px-20 xl:block ${open ? "visible opacity-100" : "invisible opacity-0"}`}
        >
            <div className={`${EDGE_WIDE} grid grid-cols-12 gap-10 pb-14 pt-12`}>
                <div className="col-span-5 pl-[clamp(8rem,11vw,12rem)]">
                    {section.groups?.length ? (
                        <div className="space-y-9">
                            {section.groups.map((group) => (
                                <div key={group.label}>
                                    <Link
                                        href={group.href}
                                        onClick={onNavigate}
                                        className="mb-4 block text-[0.78rem] font-normal uppercase tracking-[0.08em] text-(--brand-blue)/45 transition-colors hover:text-(--brand-blue)"
                                    >
                                        {group.title.split("\n").join(" · ")}
                                    </Link>
                                    <LinkList items={[...group.items, ...(group.footerItems ?? [])]} onNavigate={onNavigate} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <LinkList items={section.items ?? []} onNavigate={onNavigate} />
                    )}
                </div>

                <div className="col-span-7">
                    <p className="mb-4 text-[0.82rem] font-light text-(--brand-blue)/50">{feature.heading}</p>
                    <div className="grid grid-cols-2 gap-4">
                        {feature.cards.map((card) => (
                            <Link key={card.title} href={card.href} onClick={onNavigate} className="group/card block">
                                <span className="relative block aspect-[16/10] overflow-hidden rounded-[6px] bg-(--brand-blue-soft)">
                                    <Image
                                        src={card.image}
                                        alt=""
                                        fill
                                        sizes="(min-width: 1280px) 28vw, 0px"
                                        className="object-cover transition-transform duration-700 group-hover/card:scale-[1.04]"
                                    />
                                </span>
                                <span className="mt-3 block text-[0.95rem] font-normal leading-snug">{card.title}</span>
                                <span className="mt-2 inline-block text-[0.82rem] font-light underline underline-offset-4 opacity-70 transition-opacity group-hover/card:opacity-100">
                                    {card.cta}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
