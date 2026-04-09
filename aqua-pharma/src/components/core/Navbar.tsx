"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type NavDropdown = "salmon" | "shrimp" | "about" | null;
type NavDropdownKey = Exclude<NavDropdown, null>;

type NavLink =
    | { name: string; href: string; dropdown?: never; subLinks?: never }
    | { name: string; href?: never; dropdown: NavDropdownKey; subLinks: Array<{ name: string; href: string }> };

const navLinks: NavLink[] = [
    {
        name: "Salmon Farming",
        dropdown: "salmon" as const,
        subLinks: [
            { name: "Bath Treatments", href: "/products/bath-treatments" },
            { name: "Dosing Units", href: "/products/dosing-units-services" },
        ]
    },
    {
        name: "Shrimp Farming",
        dropdown: "shrimp" as const,
        subLinks: [
            { name: "Water Conditioning", href: "/products/water-conditioning-oxygenation" },
        ]
    },
    { name: "Sustainability", href: "/sustainability" },
    {
        name: "About",
        dropdown: "about" as const,
        subLinks: [
            { name: "About Us", href: "/about" },
            { name: "Team", href: "/about/team" },
            { name: "Pioneering", href: "/about/pioneering" },
            { name: "Media", href: "/about/media" },
        ]
    },
];

export function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<NavDropdown>(null);
    const navInnerRef = useRef<HTMLDivElement>(null);
    const logoWrapRef = useRef<HTMLDivElement>(null);
    const mobileMenuRef = useRef<HTMLDivElement>(null);
    const burgerButtonRef = useRef<HTMLButtonElement>(null);
    const burgerTopRef = useRef<HTMLSpanElement>(null);
    const burgerMiddleRef = useRef<HTMLSpanElement>(null);
    const burgerBottomRef = useRef<HTMLSpanElement>(null);

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
    };

    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? "hidden" : "";

        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileMenuOpen]);

    useGSAP(() => {
        const navLogoWrap = logoWrapRef.current;
        const navInner = navInnerRef.current;
        const burgerButton = burgerButtonRef.current;
        if (!navLogoWrap || !navInner || !burgerButton) return;

        const heroSection = document.getElementById("hero");
        const heroLogoPlaceholder = document.querySelector(".hero-brand") as HTMLElement | null;
        const logoImage = navLogoWrap.querySelector("img");

        if (heroSection && heroLogoPlaceholder && logoImage) {
            let xOffset = 0;
            let yOffset = 0;
            let scaleOffset = 1;

            const calculateBounds = () => {
                const st = navLogoWrap.style;
                const oldT = st.transform;
                st.transform = "none";

                const nRect = navLogoWrap.getBoundingClientRect();
                const hRect = heroLogoPlaceholder.getBoundingClientRect();

                st.transform = oldT;

                if (!nRect.width || !hRect.width) {
                    xOffset = 0;
                    yOffset = 0;
                    scaleOffset = 1;
                    return;
                }

                xOffset = hRect.left - nRect.left;
                yOffset = hRect.top - nRect.top;
                scaleOffset = hRect.width / nRect.width;
            };

            // Calculate bounds first so the initial gsap.set places the logo at
            // the hero placeholder position — no flash to navbar position.
            calculateBounds();

            gsap.set(navLogoWrap, {
                autoAlpha: 1,
                x: xOffset,
                y: yOffset,
                scale: scaleOffset,
                pointerEvents: "auto",
                transformOrigin: "top left",
                force3D: true,
                willChange: "transform",
            });
            gsap.set(navInner, { color: "#ffffff" });
            gsap.set(burgerButton, {
                color: "#ffffff",
                backgroundColor: "transparent",
                borderColor: "rgba(255,255,255,0.18)",
                boxShadow: "none",
            });
            gsap.set(logoImage, { filter: "brightness(1) saturate(100%)" });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: heroSection,
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.2,
                    invalidateOnRefresh: true,
                    onRefreshInit: calculateBounds,
                }
            });

            tl.fromTo(navLogoWrap,
                { x: () => xOffset, y: () => yOffset, scale: () => scaleOffset },
                { duration: 1, x: 0, y: 0, scale: 1, ease: "none" },
                0
            )
                .to(navInner, { duration: 0.28, color: "var(--brand-blue)", ease: "none" }, 0.80)
                .to(burgerButton, {
                    duration: 0.24,
                    color: "var(--brand-blue)",
                    ease: "none"
                }, 0.74)
                .to(burgerButton, {
                    duration: 0.28,
                    backgroundColor: "rgba(255,255,255,0.96)",
                    borderColor: "rgba(21,31,109,0.12)",
                    boxShadow: "0 14px 32px rgba(21,31,109,0.12)",
                    ease: "none"
                }, 0.80)
                .to(logoImage, { duration: 0.28, filter: "brightness(0) saturate(100%)", ease: "none" }, 0.74);

            return () => {
                gsap.set(navLogoWrap, { clearProps: "willChange" });
            };
        }

        gsap.to(navLogoWrap, {
            autoAlpha: 1,
            x: 0,
            scale: 1,
            duration: 0.22,
            ease: "power3.out"
        });
        gsap.to(navInner, {
            color: "var(--brand-blue)",
            duration: 0.22,
            ease: "power3.out"
        });
        gsap.to(burgerButton, {
            color: "var(--brand-blue)",
            backgroundColor: "rgba(255,255,255,0.96)",
            borderColor: "rgba(21,31,109,0.12)",
            boxShadow: "0 14px 32px rgba(21,31,109,0.12)",
            duration: 0.22,
            ease: "power3.out"
        });
    }, []);

    useGSAP(() => {
        if (!mobileMenuRef.current || !burgerTopRef.current || !burgerMiddleRef.current || !burgerBottomRef.current) {
            return;
        }

        const timeline = gsap.timeline({ defaults: { duration: 0.35, ease: "power3.out" } });

        if (mobileMenuOpen) {
            gsap.set(mobileMenuRef.current, { pointerEvents: "auto" });

            timeline
                .to(mobileMenuRef.current, { autoAlpha: 1, x: 0 }, 0)
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
            </nav>

            <div
                ref={mobileMenuRef}
                className="pointer-events-none fixed inset-0 z-40 translate-x-full bg-[rgba(21,31,109,0.18)] opacity-0"
                onClick={closeMobileMenu}
            >
                <div
                    className="ml-auto flex h-full w-full max-w-xl flex-col bg-(--brand-paper) px-6 pb-10 pt-24 text-(--brand-blue) shadow-[-18px_0_60px_rgba(21,31,109,0.18)] md:px-8"
                    onClick={(event) => event.stopPropagation()}
                >
                    <div className="mb-12 border-b border-(--brand-border) pb-8">
                        <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-(--brand-glaucous)">
                            Aqua Pharma
                        </p>
                        <p className="mt-4 max-w-sm text-[1.55rem] leading-[1.15] tracking-[-0.04em] text-(--brand-blue) md:text-[1.9rem]">
                            Prevention and control of disease in aquaculture.
                        </p>
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                        <div className="space-y-2">
                            {navLinks.map((link) => (
                                <div key={link.name}>
                                    {link.href ? (
                                        <Link
                                            href={link.href}
                                            className="block rounded-full px-4 py-3 text-[0.95rem] font-medium tracking-[-0.02em] transition-colors hover:bg-(--brand-blue-soft)"
                                            onClick={closeMobileMenu}
                                        >
                                            {link.name}
                                        </Link>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => {
                                                    if ('dropdown' in link && link.dropdown) {
                                                        setActiveDropdown(activeDropdown === link.dropdown ? null : link.dropdown);
                                                    }
                                                }}
                                                className="flex w-full items-center justify-between rounded-full px-4 py-3 text-left text-[0.95rem] font-medium tracking-[-0.02em] transition-colors hover:bg-(--brand-blue-soft)"
                                            >
                                                {link.name}
                                                <span className={`transition-transform ${activeDropdown === ('dropdown' in link ? link.dropdown : null) ? "rotate-180" : ""}`}>
                                                    ▼
                                                </span>
                                            </button>
                                            {'dropdown' in link && activeDropdown === link.dropdown && (
                                                <div className="ml-4 space-y-1 rounded-lg bg-(--brand-blue-soft)/55 py-2">
                                                    {link.subLinks?.map((subLink) => (
                                                        <Link
                                                            key={subLink.name}
                                                            href={subLink.href}
                                                            className="block px-4 py-2 text-[0.9rem] font-medium tracking-[-0.02em] text-[rgba(51,51,51,0.72)] transition-colors hover:text-(--brand-blue)"
                                                            onClick={closeMobileMenu}
                                                        >
                                                            {subLink.name}
                                                        </Link>
                                                    ))}
                                                </div>
                                            )}
                                        </>
                                    )}
                                </div>
                            ))}
                        </div>

                        <div className="mt-12 space-y-5 border-t border-(--brand-border) pt-8">
                            <Link
                                href="#contact"
                                className="inline-flex min-h-13 items-center rounded-full bg-(--brand-tangerine) px-6 py-3 text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-(--brand-dark) transition-colors hover:bg-[#ef9a4e]"
                                onClick={closeMobileMenu}
                            >
                                Contact Us
                            </Link>
                            <p className="max-w-sm text-sm leading-6 text-[rgba(51,51,51,0.72)]">
                                Aqua Pharma develops practical health and welfare solutions for aquaculture operations.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
