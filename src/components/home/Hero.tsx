"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EDGE_WIDE } from "@/lib/edge-wide";
import { useSiteLocale } from "@/components/core/SiteLocaleProvider";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
    const { content } = useSiteLocale();
    const containerRef = useRef<HTMLElement>(null);

    // Video modal removed: always show poster image for hero media.

    const handleExploreClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();

        const productsSection = document.getElementById("products") || document.getElementById("what-we-do");
        if (!productsSection) {
            return;
        }

        const sectionTop = productsSection.getBoundingClientRect().top + window.scrollY;

        window.scrollTo({
            top: Math.max(sectionTop - 40, 0),
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        });
    };

    useGSAP(() => {
        const media = gsap.matchMedia();

        media.add("(prefers-reduced-motion: no-preference)", () => {
            const revealTimeline = gsap.timeline({ delay: 0.2 });

            revealTimeline
                .from(".hero-kicker", {
                    y: 18,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                })
                .from(".hero-line", {
                    yPercent: 110,
                    duration: 1.25,
                    stagger: 0.14,
                    ease: "power4.out",
                }, "-=0.25")
                .from(
                    ".hero-copy",
                    {
                        y: 24,
                        opacity: 0,
                        duration: 0.9,
                        ease: "power3.out",
                    },
                    "-=0.85"
                );

            // Stingray-style parallax: scroll distance across the hero equals its height,
            // so the media drifts down 0.8x and the copy 0.18x while the page scrolls up 1x.
            const heroHeight = () => containerRef.current?.offsetHeight ?? window.innerHeight;

            gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                    invalidateOnRefresh: true,
                },
            })
                .to(".hero-panel", { y: () => heroHeight() * 0.8, ease: "none" }, 0)
                .to(".hero-content", { y: () => heroHeight() * 0.18, ease: "none" }, 0);

            return undefined;
        });

        return () => {
            media.revert();
        };
    }, { scope: containerRef });

    return (
        <section
            id="hero"
            ref={containerRef}
            className="relative h-svh min-h-[40rem] overflow-hidden bg-(--brand-blue-dark)"
        >
            <div className="hero-panel premium-ink-surface absolute inset-0 overflow-hidden">
                <Image
                    src="/images/generated/home-hero-premium.png"
                    alt={content.home.hero.backdropAlt}
                    fill
                    priority
                    sizes="100vw"
                    className="hero-backdrop object-cover"
                />
                <div className="hero-atmosphere absolute inset-0 z-[1] bg-[linear-gradient(180deg,rgba(20,26,66,0)_0%,rgba(20,26,66,0)_48%,rgba(20,26,66,0.78)_100%)]" />
            </div>

            <div className="hero-content absolute inset-x-0 bottom-0 z-10 px-6 text-white md:px-12 lg:px-20">
                <p className="hero-kicker sr-only">{content.home.hero.kicker}</p>

                <div className={`hero-reference-layout ${EDGE_WIDE}`}>
                    <h1 className="hero-reference-title [text-shadow:0_1px_1px_rgba(0,0,0,0.28),0_6px_18px_rgba(0,0,0,0.22)]">
                        {content.home.hero.titleLines.map((line) => (
                            <span key={line} className="block overflow-hidden">
                                <span className="hero-line block">{line}</span>
                            </span>
                        ))}
                    </h1>

                    <div className="hero-copy hero-reference-copy-block">
                        <p className="hero-reference-copy">{content.home.hero.description}</p>

                        <div className="hero-reference-actions">
                            <a
                                href="#contact"
                                className="hero-pill hero-pill-solid"
                            >
                                {content.home.hero.contact}
                            </a>
                            <a
                                href="#products"
                                onClick={handleExploreClick}
                                className="hero-pill hero-pill-ghost"
                            >
                                {content.home.hero.explore}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
