"use client";

import { useRef } from "react";
import { SplitTextAnimate } from "../ui/SplitTextAnimate";
import { ScrollReveal } from "../ui/ScrollReveal";

export function WhatWeDo() {
    const containerRef = useRef<HTMLElement>(null);
    const storyPillars = [
        {
            number: "01",
            title: "Prevention before reaction",
            body: "We work upstream of crisis: treatment planning, product quality, and precise application before stress becomes damage in the cage or pond.",
        },
        {
            number: "02",
            title: "Precision in the treatment moment",
            body: "Whether the setting is a well boat, a tarpaulin, or a shrimp pond, our systems are built around exact concentration, safer handling, and better control in the field.",
        },
        {
            number: "03",
            title: "Presence where farming happens",
            body: "The company operates through live farm realities across countries and species. That proximity changes the design language of every service, protocol, and dosing system we build.",
        },
    ];

    return (
        <section
            id="what-we-do"
            ref={containerRef}
            className="w-full overflow-hidden bg-(--brand-paper-warm) px-6 py-24 text-(--brand-dark) md:px-12 md:py-32 lg:px-20"
        >
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-10 border-b border-(--brand-blue)/8 pb-14 lg:grid-cols-[14rem_1fr] lg:gap-20 lg:pb-18">
                    <ScrollReveal duration={0.74} yOffset={14} start="top 92%">
                        <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-(--brand-glaucous)">
                            Chapter 02 / At the Farm Edge
                        </p>
                    </ScrollReveal>

                    <div>
                        <h2 className="sr-only">What We Do</h2>
                        <SplitTextAnimate
                            text="We work in the moments where treatment decisions become welfare decisions."
                            className="max-w-5xl text-[clamp(2.4rem,5vw,5.5rem)] leading-[0.94] tracking-[-0.05em] font-heading text-(--brand-blue)"
                            triggerRef={containerRef}
                        />

                        <ScrollReveal duration={0.78} yOffset={16} start="top 92%">
                            <p className="mt-8 max-w-3xl text-[1.02rem] font-light leading-[1.85] text-(--brand-dark)/70 md:text-[1.1rem]">
                                Aqua Pharma develops products, equipment, and services for salmon and shrimp farming, but the company is best understood as an operational partner in difficult treatment environments. The work begins in the lived conditions of farms, vessels, and teams who need safer, clearer, more repeatable systems.
                            </p>
                        </ScrollReveal>
                    </div>
                </div>

                <ScrollReveal className="mt-14" duration={0.72} yOffset={14} staggerChildren staggerAmount={0.05} start="top 93%">
                <div className="grid grid-cols-1 gap-px bg-(--brand-blue)/8 lg:grid-cols-3">
                    {storyPillars.map((pillar) => (
                        <article key={pillar.number} className="bg-(--brand-paper) p-8 md:p-10 lg:p-12">
                            <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-(--brand-glaucous)">
                                {pillar.number}
                            </p>
                            <h3 className="mt-6 max-w-[12ch] font-heading text-[clamp(1.6rem,2.4vw,2.4rem)] font-light leading-[1.04] text-(--brand-blue)">
                                {pillar.title}
                            </h3>
                            <p className="mt-6 text-[0.98rem] font-light leading-[1.8] text-(--brand-dark)/68">
                                {pillar.body}
                            </p>
                        </article>
                    ))}
                </div>
                </ScrollReveal>

                <ScrollReveal className="mt-12 border-t border-(--brand-blue)/8 pt-8" duration={0.76} yOffset={14} start="top 93%">
                    <p className="max-w-4xl font-heading text-[clamp(1.45rem,2.3vw,2.3rem)] font-light leading-[1.22] text-(--brand-blue)/82">
                        The company story is not organized around features. It is organized around water conditions, fish welfare, application accuracy, and the people standing inside those treatment moments.
                    </p>
                </ScrollReveal>
            </div>
        </section>
    );
}