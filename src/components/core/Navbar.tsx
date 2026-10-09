"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { LanguageSwitcher } from "@/components/core/LanguageSwitcher";
import { MobileMenu } from "@/components/core/MobileMenu";
import { EDGE_WIDE } from "@/lib/edge-wide";
import { useSiteLocale } from "@/components/core/SiteLocaleProvider";
import { AquaPharmaCircleMark } from "@/components/ui/AquaPharmaCircleMark";
import { AquaPharmaWordmark } from "@/components/ui/AquaPharmaWordmark";
import { NavDropdownPanel } from "@/components/core/NavDropdownPanel";
import type { NavigationSection } from "@/i18n/site-content";

function PrimaryNavigation({
    sections,
    activeKey,
    onActivate,
}: {
    sections: NavigationSection[];
    activeKey: string | null;
    onActivate: (key: string) => void;
}) {
    return (
        <div className="hidden flex-1 items-center justify-end pl-8 pr-10 xl:flex">
            <div className="flex items-center gap-1 text-current" aria-label="Primary navigation">
                {sections.map((section) => (
                    <Link
                        key={section.key}
                        href={section.href}
                        onMouseEnter={() => onActivate(section.key)}
                        onFocus={() => onActivate(section.key)}
                        aria-expanded={activeKey === section.key}
                        className={`inline-flex min-h-10 items-center whitespace-nowrap rounded-full px-4 text-[0.975rem] font-light leading-none tracking-[0.06em] transition-[background-color,color,opacity] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current ${activeKey === section.key ? "bg-(--brand-blue) text-white" : activeKey ? "opacity-55" : ""}`}
                    >
                        {section.title}
                    </Link>
                ))}
            </div>
        </div>
    );
}

export function Navbar() {
    const { content } = useSiteLocale();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeKey, setActiveKey] = useState<string | null>(null);
    const [shownKey, setShownKey] = useState<string | null>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const burgerTopRef = useRef<HTMLSpanElement>(null);
    const burgerMiddleRef = useRef<HTMLSpanElement>(null);
    const burgerBottomRef = useRef<HTMLSpanElement>(null);

    const activateSection = (key: string) => {
        cancelClose();
        setActiveKey(key);
        setShownKey(key);
    };

    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const cancelClose = () => {
        if (closeTimer.current) {
            clearTimeout(closeTimer.current);
            closeTimer.current = null;
        }
    };

    const closeDropdown = () => {
        cancelClose();
        setActiveKey(null);
    };

    const scheduleClose = () => {
        cancelClose();
        closeTimer.current = setTimeout(() => setActiveKey(null), 120);
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileMenuOpen]);

    useGSAP(() => {
        if (!mobileMenuRef.current || !burgerTopRef.current || !burgerMiddleRef.current || !burgerBottomRef.current) {
            return;
        }

        const timeline = gsap.timeline({ defaults: { duration: 0.35, ease: "power3.out" } });

        if (mobileMenuOpen) {
            gsap.set(mobileMenuRef.current, { pointerEvents: "auto" });

            timeline
                .to(mobileMenuRef.current, { autoAlpha: 1, x: 0 }, 0)
                .to(burgerTopRef.current, { rotate: 45, y: 5.5 }, 0)
                .to(burgerMiddleRef.current, { autoAlpha: 0, scaleX: 0.4 }, 0)
                .to(burgerBottomRef.current, { rotate: -45, y: -5.5 }, 0);

            return;
        }

        timeline
            .to(burgerTopRef.current, { rotate: 0, y: 0 }, 0)
            .to(burgerMiddleRef.current, { autoAlpha: 1, scaleX: 1 }, 0)
            .to(burgerBottomRef.current, { rotate: 0, y: 0 }, 0)
            .to(mobileMenuRef.current, {
                autoAlpha: 0,
                x: "100%",
                onComplete: () => {
                    gsap.set(mobileMenuRef.current, { pointerEvents: "none" });
                }
            }, 0);
    }, { dependencies: [mobileMenuOpen] });

    return (
        <>
            <nav
                className="fixed inset-x-0 top-0 z-50 bg-white px-6 py-3 md:px-12 md:py-4 lg:px-20"
                onMouseLeave={scheduleClose}
                onMouseEnter={cancelClose}
            >
                <div
                    className={`${EDGE_WIDE} flex items-center justify-between py-0 text-(--brand-blue)`}
                >
                    <div className="flex min-w-0 items-center" onMouseEnter={closeDropdown}>
                        <Link
                            href="/"
                            aria-label="Aqua Pharma"
                            className="nav-logo-lockup relative block shrink-0 overflow-visible text-current"
                            onClick={closeDropdown}
                        >
                            <span className="nav-logo-wordmark pointer-events-none absolute block">
                                <AquaPharmaWordmark className="h-full w-full" />
                            </span>
                            <span className="nav-corner-mark pointer-events-none absolute block text-current">
                                <AquaPharmaCircleMark className="h-full w-full" />
                            </span>
                        </Link>
                    </div>

                    {mobileMenuOpen ? (
                        <div className="hidden flex-1 xl:block" aria-hidden="true" />
                    ) : (
                        <PrimaryNavigation sections={content.nav.sections} activeKey={activeKey} onActivate={activateSection} />
                    )}

                    <div className="flex items-center gap-4" onMouseEnter={closeDropdown}>
                        <LanguageSwitcher className="hidden md:block" tone="overlay" />
                        <button
                            type="button"
                            className="group flex h-8 w-8 shrink-0 items-center justify-center bg-transparent text-current"
                            onClick={() => {
                                closeDropdown();
                                setMobileMenuOpen((open) => !open);
                            }}
                            aria-expanded={mobileMenuOpen}
                            aria-label={mobileMenuOpen ? content.nav.closeLabel : content.nav.menuLabel}
                        >
                            <span
                                className={`flex h-8 w-8 items-center justify-center transition-[background-color,color,border-radius] duration-300 ${mobileMenuOpen ? "rounded-[6px] bg-(--brand-cyan-light) text-(--brand-blue)" : "rounded-full bg-(--brand-blue)/85 text-white group-hover:bg-(--brand-blue)"}`}
                            >
                                <span className="flex w-[13px] flex-col gap-[3.5px]">
                                    <span ref={burgerTopRef} className="block h-[1.5px] w-full origin-center rounded-full bg-current" />
                                    <span ref={burgerMiddleRef} className="block h-[1.5px] w-full origin-center rounded-full bg-current" />
                                    <span ref={burgerBottomRef} className="block h-[1.5px] w-full origin-center rounded-full bg-current" />
                                </span>
                            </span>
                        </button>
                    </div>
                </div>

                <NavDropdownPanel
                    section={content.nav.sections.find((section) => section.key === shownKey)}
                    open={activeKey !== null && !mobileMenuOpen}
                    onNavigate={closeDropdown}
                />
            </nav>

            <MobileMenu
                overlayRef={mobileMenuRef}
                onClose={closeMobileMenu}
                menuLabel={content.nav.menuLabel}
                closeLabel={content.nav.closeLabel}
                sections={content.nav.sections}
            />
        </>
    );
}
