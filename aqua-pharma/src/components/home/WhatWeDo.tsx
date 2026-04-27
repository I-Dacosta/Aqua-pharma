"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Fish,
    ShieldCheck,
    FlaskConical,
    Waves,
    Droplets,
    Wrench,
} from "lucide-react";
import { SplitTextAnimate } from "../ui/SplitTextAnimate";

gsap.registerPlugin(ScrollTrigger);

export function WhatWeDo() {
    const containerRef = useRef<HTMLElement>(null);
    const whatWeDoIcons = [
        { Icon: Fish, label: "Fish & Shrimp Health" },
        { Icon: ShieldCheck, label: "Biosecurity" },
        { Icon: FlaskConical, label: "Diagnostics & Lab" },
        { Icon: Waves, label: "Water Quality" },
        { Icon: Droplets, label: "Oxygenation" },
        { Icon: Wrench, label: "Equipment & Service" },
    ];

    useGSAP(() => {
        const bodyElement = containerRef.current?.querySelector(".whatwedo-body");
        if (!bodyElement) return;

        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top 80%",
            animation: gsap.from(
                bodyElement,
                {
                    y: 60,
                    opacity: 0,
                    scale: 0.95,
                    filter: "blur(10px)",
                    duration: 1.2,
                    ease: "power3.out",
                }
            ),
            toggleActions: "play reverse play reverse",
        });
    }, { scope: containerRef });

    return (
        <section
            id="what-we-do"
            ref={containerRef}
            className="w-full overflow-hidden bg-(--brand-paper) pt-[10vh] pb-20 text-(--brand-dark) md:pb-28 lg:pb-32"
        >
            <div className="w-[90%] mx-auto flex flex-col min-h-[15vh] md:min-h-[24vh] lg:min-h-[28vh]">
                <div className="relative right-5 flex-1 flex justify-end items-center">
                    <div className="w-full lg:w-1/2">
                        {/* Heading — overflows left of container on lg */}
                        <div className="px-6 md:px-12 lg:px-2 mb-8">
                            <h2 className="sr-only">What  We  Do</h2>
                            <SplitTextAnimate
                                text="WHAT WE DO"
                                className="inline-block text-[clamp(3rem,6vw,5.5rem)] leading-[0.9] tracking-[-0.03em] font-heading lg:-translate-x-full lg:pr-4 lg:text-right"
                                triggerRef={containerRef}
                            />

                            <div className="relative right-60 whatwedo-body mt-6 flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-8">
                                <div
                                    className="relative right-40 grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-3 lg:w-max lg:shrink-0"
                                    aria-label="Treatment category icons"
                                >
                                    {whatWeDoIcons.map(({ Icon, label }, index) => (
                                        <button
                                            key={index}
                                            type="button"
                                            aria-label={label}
                                            className="relative group flex h-14 w-14 items-center justify-center rounded-full border border-(--brand-border) bg-(--brand-blue-soft)/35"
                                        >
                                            <Icon className="h-6 w-6 text-(--brand-blue)" strokeWidth={1.7} />

                                            <span className="pointer-events-none absolute left-1/2 -top-10 z-10 w-max -translate-x-1/2 whitespace-nowrap rounded-md bg-(--brand-blue) px-3 py-1 text-xs text-white opacity-0 shadow-sm transition-opacity duration-150 group-hover:opacity-100 group-focus:opacity-100">
                                                {label}
                                            </span>
                                        </button>
                                    ))}
                                </div>

                                <div className="max-w-2xl lg:pt-1">
                                    <p className="text-base leading-relaxed text-[rgba(51,51,51,0.8)] md:text-lg">
                                        Aqua Pharma offers products, equipment, and services for shrimp and salmon farming, aimed at preventing and controlling disease and improving the health of fish and shrimp.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Silver line splitter with faded corners */}
                <div
                    className="h-px mt-8 md:mt-12"
                    style={{
                        background: "linear-gradient(90deg, rgba(21,31,109,0) 0%, rgba(21,31,109,0.24) 10%, rgba(78,96,173,0.24) 90%, rgba(21,31,109,0) 100%)",
                    }}
                />
            </div>
        </section>
    );
}