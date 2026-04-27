"use client";

import Image from "next/image";
import { useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedArrowLink } from "../ui/AnimatedArrowCta";
import { ScrollReveal } from "../ui/ScrollReveal";
import { useSiteLocale } from "@/components/core/SiteLocaleProvider";

gsap.registerPlugin(ScrollTrigger);

const operatingTerrains: string[] = [];

export function WhatWeDo() {
    const { content } = useSiteLocale();
    const containerRef = useRef<HTMLElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const [expandedCard, setExpandedCard] = useState<string | null>(null);
    const serviceSignals = content.home.whatWeDo.signals;
    const [activeSignal, setActiveSignal] = useState(serviceSignals[0]?.title ?? null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: ReactMouseEvent<HTMLDivElement>) => {
        if (!imageRef.current) return;
        const rect = imageRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePos({ x, y });
    };

    const handleMouseLeave = () => {
        setMousePos({ x: 0, y: 0 });
    };

    useGSAP(() => {
        const media = gsap.matchMedia();

        media.add("(prefers-reduced-motion: no-preference)", () => {
            gsap.to(".whatwedo-axis", {
                yPercent: 12,
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                },
            });

            gsap.fromTo(
                ".whatwedo-image",
                { y: "-8%", scale: 1.08 },
                {
                    y: "8%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: ".whatwedo-image",
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    },
                }
            );
        });

        media.add("(prefers-reduced-motion: reduce)", () => {
            gsap.set(".whatwedo-image", { clearProps: "transform" });
        });

        return () => {
            media.revert();
        };
    }, { scope: containerRef });

    return (
        <section
            id="what-we-do"
            ref={containerRef}
            className="relative overflow-hidden px-6 py-16 text-(--brand-dark) md:px-12 lg:px-20 lg:py-20"
        >
            <div className="premium-grid-overlay pointer-events-none absolute inset-0 opacity-[0.22]" />
            {/* left decorative axis removed per design request */}

            <div className="mx-auto max-w-[96rem] space-y-8 lg:space-y-10">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-12">
                    <div className="relative z-10 max-w-xl">
                        <p className="mb-5 text-[0.65rem] font-medium uppercase tracking-[0.35em] text-(--brand-glaucous)">
                            {content.home.whatWeDo.kicker}
                        </p>

                        <h2 className="font-heading text-[clamp(2.4rem,5vw,4.8rem)] font-light leading-[0.96] tracking-[-0.05em] text-(--brand-blue)">
                            {content.home.whatWeDo.title}
                        </h2>

                        <p className="mt-6 text-[1rem] font-light leading-[1.8] text-(--brand-dark)/72 md:text-[1.06rem]">
                            {content.home.whatWeDo.description}
                        </p>

                        <div className="mt-6 flex flex-wrap gap-3">
                            {operatingTerrains.map((terrain) => (
                                <span
                                    key={terrain}
                                    className="border border-(--brand-blue)/10 bg-white/70 px-3 py-2 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-(--brand-blue)/76"
                                >
                                    {terrain}
                                </span>
                            ))}
                        </div>

                        <AnimatedArrowLink
                            href="#products"
                            className="mt-7 text-[0.7rem] font-medium uppercase tracking-[0.32em] text-(--brand-blue)"
                        >
                            {content.home.whatWeDo.cta}
                        </AnimatedArrowLink>
                    </div>

                    <ScrollReveal duration={0.82} start="top 90%" yOffset={18}>
                        <div
                            ref={imageRef}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={handleMouseLeave}
                            className="group relative overflow-hidden"
                        >
                            <figure>
                                <div className="whatwedo-image relative aspect-[4/5] overflow-hidden md:aspect-[1.34/1]">
                                    <Image
                                        src="/images/generated/what-we-do-editorial.png"
                                        alt={content.home.whatWeDo.imageAlt}
                                        fill
                                        sizes="(max-width: 1280px) 100vw, 44vw"
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(38,45,98,0.03)_0%,rgba(38,45,98,0.2)_100%)]" />
                                    {mousePos.x > 0 && (
                                        <div
                                            className="pointer-events-none absolute h-64 w-64 rounded-full bg-white/7 blur-3xl transition-opacity duration-200"
                                            style={{
                                                left: `${mousePos.x - 128}px`,
                                                top: `${mousePos.y - 128}px`,
                                            }}
                                        />
                                    )}
                                </div>
                                <figcaption className="mt-3 flex flex-col gap-2 pt-3 md:flex-row md:items-start md:justify-between">
                                    <span className="text-[0.66rem] font-medium uppercase tracking-[0.24em] text-(--brand-glaucous)">
                                        {content.home.whatWeDo.imageCaption}
                                    </span>
                                    <span className="max-w-xs text-[0.66rem] font-medium uppercase tracking-[0.24em] text-(--brand-glaucous)">
                                        {content.home.whatWeDo.imageNote}
                                    </span>
                                </figcaption>
                            </figure>
                        </div>
                    </ScrollReveal>
                </div>

                <ScrollReveal
                    className="grid grid-cols-1 gap-4 border-t border-(--brand-blue)/10 pt-6 md:grid-cols-3"
                    duration={0.72}
                    start="top 92%"
                    yOffset={14}
                    staggerChildren
                    staggerAmount={0.06}
                >
                    {serviceSignals.map((signal) => (
                        <button
                            key={signal.title}
                            onMouseEnter={() => setActiveSignal(signal.title)}
                            onFocus={() => setActiveSignal(signal.title)}
                            onBlur={() => setActiveSignal(serviceSignals[0]?.title ?? null)}
                            onClick={() => setExpandedCard(expandedCard === signal.title ? null : signal.title)}
                            className={`group relative cursor-pointer overflow-hidden border p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-md ${activeSignal === signal.title ? "border-(--brand-blue)/24 bg-(--brand-blue-soft)/46 shadow-[0_18px_45px_rgba(38,45,98,0.08)]" : "border-(--brand-blue)/8 hover:border-(--brand-blue)/24 hover:bg-(--brand-blue-soft)/40"}`}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/0 to-(--brand-blue-soft)/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            <div className="relative z-10">
                                <h3 className="font-heading text-[1.25rem] font-light leading-[1.1] tracking-[-0.03em] text-(--brand-blue) transition-colors duration-300">
                                    {signal.title}
                                </h3>
                                {expandedCard === signal.title && (
                                    <div className="mt-4 border-t border-(--brand-blue)/10 pt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                                        <p className="text-[0.95rem] font-light leading-[1.7] text-(--brand-dark)/64">
                                            {signal.body}
                                        </p>
                                        <p className="mt-3 text-[0.9rem] font-light leading-[1.6] text-(--brand-dark)/72">
                                            {signal.details}
                                        </p>
                                    </div>
                                )}
                            </div>
                            {/* Hover indicator */}
                            <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-transparent via-(--brand-blue) to-transparent transition-all duration-300 group-hover:w-full" />
                        </button>
                    ))}
                </ScrollReveal>
            </div>
        </section>
    );
}
