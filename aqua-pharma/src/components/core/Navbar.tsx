"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { LanguageSwitcher } from "@/components/core/LanguageSwitcher";
import { MobileMenu } from "@/components/core/MobileMenu";
import { useNavbarLogoMorph } from "@/components/core/useNavbarLogoMorph";
import { useSiteLocale } from "@/components/core/SiteLocaleProvider";

export function Navbar() {
    const { content } = useSiteLocale();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navInnerRef = useRef<HTMLDivElement>(null);
    const logoWrapRef = useRef<HTMLDivElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const burgerButtonRef = useRef<HTMLButtonElement>(null);
    const burgerTopRef = useRef<HTMLSpanElement>(null);
    const burgerMiddleRef = useRef<HTMLSpanElement>(null);
    const burgerBottomRef = useRef<HTMLSpanElement>(null);

    const syncBurgerButtonToNavState = () => {
        const burgerButton = burgerButtonRef.current;
        const navInner = navInnerRef.current;

        if (!burgerButton || !navInner) {
            return;
        }

        const currentColor = window.getComputedStyle(navInner).color;
        const isLightNav = currentColor.includes("255");

        gsap.to(burgerButton, {
            duration: 0.24,
            color: isLightNav ? "#ffffff" : "var(--brand-blue)",
            backgroundColor: isLightNav ? "transparent" : "rgba(255,255,255,0.96)",
            borderColor: isLightNav ? "rgba(255,255,255,0.18)" : "rgba(38,45,98,0.12)",
            boxShadow: isLightNav ? "none" : "0 14px 32px rgba(38,45,98,0.12)",
            ease: "power3.out",
        });
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

    useNavbarLogoMorph({ navInnerRef, logoWrapRef, burgerButtonRef });

    useGSAP(() => {
        if (!mobileMenuRef.current || !burgerButtonRef.current || !burgerTopRef.current || !burgerMiddleRef.current || !burgerBottomRef.current) {
            return;
        }

        const timeline = gsap.timeline({ defaults: { duration: 0.35, ease: "power3.out" } });

        if (mobileMenuOpen) {
            gsap.set(mobileMenuRef.current, { pointerEvents: "auto" });

            timeline
                .to(mobileMenuRef.current, { autoAlpha: 1, x: 0 }, 0)
                .to(burgerButtonRef.current, {
                    color: "var(--brand-blue)",
                    backgroundColor: "rgba(255,255,255,0.96)",
                    borderColor: "rgba(38,45,98,0.12)",
                    boxShadow: "0 14px 32px rgba(38,45,98,0.12)",
                }, 0)
                .to(burgerTopRef.current, { rotate: 45, y: 7 }, 0)
                .to(burgerMiddleRef.current, { autoAlpha: 0, scaleX: 0.4 }, 0)
                .to(burgerBottomRef.current, { rotate: -45, y: -7 }, 0);

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
                    syncBurgerButtonToNavState();
                }
            }, 0);
    }, { dependencies: [mobileMenuOpen] });

    return (
        <>
            <nav className="fixed inset-x-0 top-0 z-50 px-4 py-4 md:px-8 md:py-6">
                <div
                    ref={navInnerRef}
                    className="flex w-full items-center justify-between px-[1%] py-0 text-white"
                >
                    <div ref={logoWrapRef} className="flex items-center">
                        <Link href="/" aria-label="Aqua Pharma" className="block">
                            <Image
                                src="/Aqua-Pharma-white.svg"
                                alt="Aqua Pharma"
                                width={140}
                                height={44}
                                priority
                                className="h-8 w-auto md:h-10"
                            />
                        </Link>
                    </div>

                    <div className="flex items-center gap-3">
                        <LanguageSwitcher className="hidden md:block" tone={mobileMenuOpen ? "panel" : "overlay"} />
                        <button
                            ref={burgerButtonRef}
                            type="button"
                            className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-transparent text-current transition-[background-color,border-color,box-shadow,color] duration-300"
                            onClick={() => setMobileMenuOpen((open) => !open)}
                            aria-expanded={mobileMenuOpen}
                            aria-label="Toggle navigation"
                        >
                            <span className="sr-only">Open navigation</span>
                            <span className="flex w-7 flex-col gap-1.5">
                                <span ref={burgerTopRef} className="block h-px w-full origin-center bg-current" />
                                <span ref={burgerMiddleRef} className="block h-px w-full origin-center bg-current" />
                                <span ref={burgerBottomRef} className="block h-px w-full origin-center bg-current" />
                            </span>
                        </button>
                    </div>
                </div>
            </nav>

            <MobileMenu
                overlayRef={mobileMenuRef}
                onClose={closeMobileMenu}
                intro={content.nav.intro}
                description={content.nav.description}
                contactLabel={content.nav.contactLabel}
                links={content.nav.links}
            />
        </>
    );
}
