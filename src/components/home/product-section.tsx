"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedArrowLink } from "../ui/AnimatedArrowCta";
import { SplitTextAnimate } from "../ui/SplitTextAnimate";
import { products, type ProductRecord, type ProductSlug } from "@/data/products";
import { useProductTransition } from "../core/ProductTransitionProvider";

gsap.registerPlugin(ScrollTrigger);

function formatSectionIndex(index: number) {
    return String(index + 1).padStart(2, "0");
}

const storyMeta: Record<ProductSlug, { context: string; statement: string }> = {
    "bath-treatments": {
        context: "Salmon farms / Bath treatments",
        statement: "Treatment systems built for fish welfare in the exact moment parasite pressure rises.",
    },
    "water-conditioning-oxygenation": {
        context: "Shrimp ponds / Water conditioning",
        statement: "Protocols, pond preparation, and oxygen support shaped around fragile aquatic ecosystems.",
    },
    "dosing-units-services": {
        context: "Live operations / Dosing systems",
        statement: "Engineering that turns a prescribed treatment into something safer, calmer, and repeatable in the field.",
    },
};

function SectionCard({
    section,
    index,
    cardRef,
    imageFrameRef,
    activeCardIndex,
    onNavigate,
    onPointerEnter,
    onPointerLeave,
}: {
    section: ProductRecord;
    index: number;
    cardRef: React.RefCallback<HTMLDivElement>;
    imageFrameRef: React.RefCallback<HTMLDivElement>;
    activeCardIndex: number | null;
    onNavigate: (event: React.MouseEvent<HTMLAnchorElement>) => void;
    onPointerEnter: () => void;
    onPointerLeave: () => void;
}) {
    const isDimmed = activeCardIndex !== null && activeCardIndex !== index;
    const isActive = activeCardIndex === index;

    return (
        <article
            ref={cardRef}
            onMouseEnter={onPointerEnter}
            onMouseLeave={onPointerLeave}
            className={`group/product-card premium-dark-card-surface relative cursor-pointer overflow-hidden border p-4 transition-all duration-500 hover:-translate-y-1 hover:scale-[1.015] focus-visible:scale-[1.015] focus-visible:outline-none md:p-5 ${isActive ? "border-white/18 shadow-[0_34px_90px_rgba(3,9,27,0.42)]" : "border-white/8"} ${isDimmed ? "scale-[0.985] opacity-58" : "opacity-100"} ${index === 1 ? "lg:translate-y-20" : ""} ${index === 2 ? "lg:translate-y-8" : ""}`}
        >
            <Link href={section.href} onClick={onNavigate} onFocus={onPointerEnter} onBlur={onPointerLeave} className="block">
                <div ref={imageFrameRef} className="relative h-[20rem] overflow-hidden border border-white/8 bg-white/5 md:h-[24rem] lg:h-[27rem]">
                    <div className="product-card-media absolute inset-0">
                        <Image
                            src={section.image}
                            alt={section.alt}
                            fill
                            sizes="(max-width: 1024px) 100vw, 28vw"
                            className="object-cover transition-transform duration-[1400ms] ease-out group-hover/product-card:scale-[1.05]"
                        />
                    </div>
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,11,31,0)_25%,rgba(4,11,31,0.72)_100%)]" />

                    <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                        <p className="text-[0.62rem] font-medium uppercase tracking-[0.32em] text-white/55">
                            {formatSectionIndex(index)} / {storyMeta[section.slug].context}
                        </p>
                        <h3 className="mt-4 font-heading text-[clamp(1.6rem,2.6vw,2.6rem)] font-light leading-[1.02] tracking-[-0.03em] text-white break-words">
                            {section.title.includes('&') ? (
                                <>{section.title.split('&')[0].trim()} &<br />{section.title.split('&')[1].trim()}</>
                            ) : section.title}
                        </h3>
                    </div>
                </div>
            </Link>

            <div className="mt-5 border-t border-white/10 pt-5 md:mt-6">
                <p className="max-w-md text-[0.98rem] font-light leading-[1.8] text-white/70">
                    {storyMeta[section.slug].statement}
                </p>

                <AnimatedArrowLink
                    href={section.href}
                    onClick={onNavigate}
                    onFocus={onPointerEnter}
                    onBlur={onPointerLeave}
                    className="mt-6 text-[0.68rem] font-medium uppercase tracking-[0.32em] text-(--brand-tangerine)"
                    motionClassName="group-hover/product-card:translate-x-0 group-focus-visible/product-card:translate-x-0"
                    aria-label={`${section.cta}: ${section.description}`}
                >
                    Enter chapter
                </AnimatedArrowLink>
            </div>
        </article>
    );
}

export function ProductSection() {
    const { startProductTransition } = useProductTransition();
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
    const imageFramesRef = useRef<(HTMLDivElement | null)[]>([]);
    const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

    const handleProductNavigation = (
        event: React.MouseEvent<HTMLAnchorElement>,
        product: ProductRecord,
        index: number,
    ) => {
        if (
            event.defaultPrevented ||
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
        ) {
            return;
        }

        const sourceFrame = imageFramesRef.current[index];
        if (!sourceFrame) {
            return;
        }

        event.preventDefault();

        const rect = sourceFrame.getBoundingClientRect();

        startProductTransition({
            href: product.href,
            image: product.image,
            alt: product.alt,
            sourceRect: {
                top: rect.top,
                left: rect.left,
                right: rect.right,
                bottom: rect.bottom,
                width: rect.width,
                height: rect.height,
            },
        });
    };

    useLayoutEffect(() => {
        if (!sectionRef.current) {
            return;
        }

        const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
        if (cards.length === 0) {
            return;
        }

        const media = gsap.matchMedia();
        const context = gsap.context(() => {
            media.add("(prefers-reduced-motion: reduce)", () => {
                gsap.set(cards, { opacity: 1, y: 0, filter: "none" });
                cards.forEach((card) => {
                    const image = card.querySelector<HTMLElement>(".product-card-media");

                    if (image) {
                        gsap.set(image, { clearProps: "transform" });
                    }
                });
            });

            media.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.set(cards, { opacity: 0, y: 64, filter: "blur(10px)" });

                gsap.to(cards, {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    duration: 1,
                    stagger: 0.12,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 72%",
                    },
                });

                cards.forEach((card) => {
                    const image = card.querySelector<HTMLElement>(".product-card-media");

                    if (!image) {
                        return;
                    }

                    gsap.fromTo(
                        image,
                        { yPercent: -8, scale: 1.08 },
                        {
                            yPercent: 8,
                            scale: 1,
                            ease: "none",
                            scrollTrigger: {
                                trigger: card,
                                start: "top bottom",
                                end: "bottom top",
                                scrub: true,
                            },
                        }
                    );
                });
            });
        }, sectionRef);

        return () => {
            media.revert();
            context.revert();
        };
    }, []);

    return (
        <section
            id="products"
            ref={sectionRef}
            className="premium-ink-surface relative overflow-hidden px-6 py-24 text-white md:px-12 lg:px-20 lg:py-36"
        >
            <div className="premium-ink-grid pointer-events-none absolute inset-0 opacity-40" />

            <div className="relative z-10 mx-auto max-w-[100rem]">
                <div className="grid grid-cols-1 gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
                    <div className="lg:sticky lg:top-28 lg:self-start">
                        <p className="mb-8 text-[0.65rem] font-medium uppercase tracking-[0.35em] text-white/45">
                            Chapter 03 / Treatment chapters
                        </p>
                        <h2 className="sr-only">Choose your treatment category.</h2>
                        <SplitTextAnimate
                            text="Three treatment chapters"
                            triggerRef={sectionRef}
                            once
                            className="font-heading text-[clamp(2rem,4.2vw,4.8rem)] font-light leading-[0.9] tracking-[-0.05em] text-white"
                        />

                        <p className="mt-4 text-[1.05rem] font-light leading-[1.3] text-white/86">
                            One welfare operating model.
                        </p>

                        <p className="mt-6 max-w-xl text-[1.0rem] font-light leading-[1.9] text-white/68 md:text-[1.06rem]">
                            Each chapter is shaped around a different operational reality: low-impact therapeutics, water conditioning, and engineered dosing support designed for calmer execution in the field.
                        </p>

                        {/* feature badges intentionally removed per request */}

                        <div className="mt-8 hidden max-w-xl items-center gap-4 border-t border-white/10 pt-5 lg:flex">
                            {products.map((product, index) => {
                                const isActive = activeCardIndex === index;

                                return (
                                    <button
                                        key={product.id}
                                        type="button"
                                        onMouseEnter={() => setActiveCardIndex(index)}
                                        onFocus={() => setActiveCardIndex(index)}
                                        onMouseLeave={() => setActiveCardIndex(null)}
                                        onBlur={() => setActiveCardIndex(null)}
                                        onClick={() => cardsRef.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" })}
                                        className={`flex items-center gap-3 text-left text-[0.66rem] font-medium uppercase tracking-[0.24em] transition-colors ${isActive ? "text-white" : "text-white/42 hover:text-white/72"}`}
                                    >
                                        <span className={`block h-px transition-all ${isActive ? "w-12 bg-(--brand-tangerine)" : "w-6 bg-white/18"}`} />
                                        <span>{formatSectionIndex(index)}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-5 xl:gap-7">
                        {products.map((section, index) => (
                            <SectionCard
                                key={section.id}
                                section={section}
                                index={index}
                                cardRef={(element) => {
                                    cardsRef.current[index] = element;
                                }}
                                imageFrameRef={(element) => {
                                    imageFramesRef.current[index] = element;
                                }}
                                activeCardIndex={activeCardIndex}
                                onNavigate={(event) => {
                                    handleProductNavigation(event, section, index);
                                }}
                                onPointerEnter={() => setActiveCardIndex(index)}
                                onPointerLeave={() => setActiveCardIndex(null)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
