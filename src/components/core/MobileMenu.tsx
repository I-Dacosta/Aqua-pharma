"use client";

import type { RefObject } from "react";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/core/LanguageSwitcher";
import type { NavigationGroup, NavigationLink, NavigationSection } from "@/i18n/site-content";

type MobileMenuProps = {
    overlayRef: RefObject<HTMLDivElement | null>;
    onClose: () => void;
    menuLabel: string;
    closeLabel: string;
    sections: NavigationSection[];
};

type MenuLinkProps = {
    item: NavigationLink;
    onClose: () => void;
    className?: string;
};

const focusRing = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";
const columnTitleClass = `w-fit text-[clamp(1.02rem,1.1vw,1.24rem)] font-extrabold uppercase leading-[1.08] text-white transition-colors duration-300 hover:text-(--brand-cyan-teal) ${focusRing}`;

function MenuLink({ item, onClose, className }: MenuLinkProps) {
    return (
        <Link
            href={item.href}
            className={`group block max-w-[28rem] text-[clamp(0.88rem,0.98vw,1.08rem)] leading-[1.2] text-white/94 transition-colors duration-300 hover:text-(--brand-cyan-teal) ${item.indent ? "ml-4 font-normal text-white/70" : "font-semibold"} ${focusRing} ${className ?? ""}`}
            onClick={onClose}
        >
            <span className="whitespace-pre-line">{item.name}</span>
            {item.note ? (
                <span className="mt-2 block max-w-[17rem] text-[clamp(0.9rem,0.96vw,1.06rem)] font-medium italic leading-[1.28] text-white/78">
                    {item.note}
                </span>
            ) : null}
        </Link>
    );
}

function SectionHeading({ children, id }: { children: string; id: string }) {
    return (
        <h2
            id={id}
            className="text-[clamp(1.7rem,2.4vw,2.7rem)] font-light uppercase leading-none text-[rgb(64,163,226)]"
        >
            {children}
        </h2>
    );
}

function OfferGroupColumn({ group, onClose }: { group: NavigationGroup; onClose: () => void }) {
    const [title, subtitle] = group.title.split("\n");
    const links = [...group.items, ...(group.footerItems ?? [])];

    return (
        <section className="flex min-w-0 flex-col">
            <div className="flex min-h-[clamp(3rem,6.5vh,4.2rem)] flex-col justify-end border-b border-white/30 pb-3">
                <Link href={group.href} className={columnTitleClass} onClick={onClose}>
                    {title}
                </Link>
                {subtitle ? (
                    <Link
                        href={group.href}
                        className={`mt-0.5 w-fit text-[clamp(0.96rem,1.02vw,1.14rem)] font-bold leading-[1.12] text-white transition-colors duration-300 hover:text-(--brand-cyan-teal) ${focusRing}`}
                        onClick={onClose}
                    >
                        {subtitle}
                    </Link>
                ) : null}
            </div>

            <div className="mt-[clamp(0.8rem,2vh,1.5rem)] space-y-[clamp(0.55rem,1.7vh,1.25rem)]">
                {links.map((item) => (
                    <MenuLink key={`${group.label}-${item.name}`} item={item} onClose={onClose} />
                ))}
            </div>

        </section>
    );
}

function OfferSectionColumn({ section, onClose }: { section: NavigationSection; onClose: () => void }) {
    return (
        <section className="flex min-w-0 flex-col">
            <div className="flex min-h-[clamp(3rem,6.5vh,4.2rem)] flex-col justify-end border-b border-white/30 pb-3">
                <Link href={section.href} className={columnTitleClass} onClick={onClose}>
                    {section.title}
                </Link>
            </div>

            {section.items?.length ? (
                <div className="mt-[clamp(0.8rem,2vh,1.5rem)] space-y-[clamp(0.55rem,1.7vh,1.25rem)]">
                    {section.items.map((item) => (
                        <MenuLink key={`${section.key}-${item.name}`} item={item} onClose={onClose} />
                    ))}
                </div>
            ) : null}

        </section>
    );
}

function OfferNavigation({ sections, onClose }: { sections: NavigationSection[]; onClose: () => void }) {
    const aquacultureSection = sections.find((section) => section.key === "aquaculture");
    const systemsSection = sections.find((section) => section.key === "systems");
    const rdSection = sections.find((section) => section.key === "rd");
    const offerGroups = aquacultureSection?.groups ?? [];

    return (
        <section aria-labelledby="menu-offer-heading">
            <SectionHeading id="menu-offer-heading">What We Offer</SectionHeading>

            <div className="mt-[clamp(0.75rem,2vh,1.5rem)] grid gap-x-14 gap-y-8 md:grid-cols-2 xl:grid-cols-[1.05fr_0.98fr_0.95fr_1.2fr]">
                {offerGroups.map((group) => (
                    <OfferGroupColumn
                        key={group.label}
                        group={group}
                        onClose={onClose}
                    />
                ))}
                {systemsSection ? <OfferSectionColumn section={systemsSection} onClose={onClose} /> : null}
                {rdSection ? <OfferSectionColumn section={rdSection} onClose={onClose} /> : null}
            </div>
        </section>
    );
}

function WhoWeAreNavigation({ sections, onClose }: { sections: NavigationSection[]; onClose: () => void }) {
    const aboutSection = sections.find((section) => section.key === "about");
    const aboutHref = aboutSection?.href ?? "/about";
    const titleClass = `mb-[clamp(0.6rem,1.8vh,1.25rem)] block w-fit text-[clamp(0.95rem,1.05vw,1.15rem)] font-extrabold text-white transition-colors duration-300 hover:text-(--brand-cyan-teal) ${focusRing}`;

    return (
        <section className="mt-[clamp(1.5rem,4.5vh,3.5rem)]" aria-labelledby="menu-company-heading">
            <SectionHeading id="menu-company-heading">Who We Are</SectionHeading>

            <div className="mt-[clamp(0.75rem,2vh,1.5rem)] grid max-w-[54rem] gap-x-14 gap-y-8 border-t border-white/30 pt-[clamp(0.8rem,2vh,1.5rem)] md:grid-cols-2">
                <section className="flex flex-col">
                    <Link href={aboutHref} className={titleClass} onClick={onClose}>
                        About Us
                    </Link>
                    <div className="space-y-[clamp(0.55rem,1.7vh,1.25rem)]">
                        {aboutSection?.items?.map((item) => (
                            <MenuLink key={`about-${item.name}`} item={item} onClose={onClose} />
                        ))}
                    </div>
                </section>

                <section>
                    <Link href="/contact" className={titleClass} onClick={onClose}>
                        Contact
                    </Link>
                    <MenuLink item={{ name: "Sales Contacts by Country", href: "/contact#local-experts" }} onClose={onClose} className="max-w-[14rem]" />
                </section>

            </div>
        </section>
    );
}

export function MobileMenu({
    overlayRef,
    onClose,
    menuLabel,
    closeLabel,
    sections,
}: MobileMenuProps) {
    return (
        <div
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-label={menuLabel}
            tabIndex={-1}
            className="pointer-events-none fixed inset-0 z-40 translate-x-full bg-(--brand-blue) opacity-0"
            onClick={onClose}
            onKeyDown={(event) => {
                if (event.key === "Escape") {
                    onClose();
                }
            }}
        >
            <div
                role="document"
                data-lenis-prevent className="h-full overflow-y-auto overscroll-contain bg-(--brand-blue) px-6 pb-10 pt-[clamp(7rem,13vh,9rem)] text-white md:px-10 lg:px-14 xl:px-20"
                onClick={(event) => event.stopPropagation()}
                onKeyDown={(event) => {
                    if (event.key === "Escape") {
                        onClose();
                        return;
                    }

                    event.stopPropagation();
                }}
            >
                <span className="sr-only">{closeLabel}</span>

                <div className="mx-auto flex min-h-full w-full max-w-[94rem] flex-col justify-center">
                    <div>
                        <OfferNavigation sections={sections} onClose={onClose} />
                        <WhoWeAreNavigation sections={sections} onClose={onClose} />
                    </div>

                    <div className="mt-8 md:hidden">
                        <LanguageSwitcher compact onSelect={onClose} />
                    </div>
                </div>
            </div>
        </div>
    );
}
