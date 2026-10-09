"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { WordReveal } from "../ui/WordReveal";
import { getProducts, type ProductRecord } from "@/data/products";
import { useProductTransition } from "../core/ProductTransitionProvider";
import { useSiteLocale } from "@/components/core/SiteLocaleProvider";

gsap.registerPlugin(ScrollTrigger);

/** Nolla-style card: photo fades into a solid base carrying centred copy and a pill CTA. */
function ChapterCard({
    section,
    isActive,
    enterChapterLabel,
    cardRef,
    imageFrameRef,
    onNavigate,
    onSelect,
}: {
    section: ProductRecord;
    isActive: boolean;
    enterChapterLabel: string;
    cardRef: React.RefCallback<HTMLElement>;
    imageFrameRef: React.RefCallback<HTMLDivElement>;
    onNavigate: (event: React.MouseEvent<HTMLAnchorElement>) => void;
    onSelect: () => void;
}) {
    const base = isActive ? "#14110f" : "#ffffff";

    return (
        <article
            ref={cardRef}
            onMouseEnter={onSelect}
            onFocus={onSelect}
            style={{ backgroundColor: base }}
            className="product-card group/product-card relative flex aspect-[432/580] flex-col justify-end overflow-hidden rounded-[10.37px] ring-1 ring-black/5 transition-[background-color,box-shadow,transform] duration-500 hover:-translate-y-1"
        >
            <div ref={imageFrameRef} className="absolute inset-x-0 top-0 h-[58%] overflow-hidden">
                <div className="product-card-media absolute inset-0">
                    <Image
                        src={section.image}
                        alt={section.alt}
                        fill
                        sizes="(max-width: 1024px) 100vw, 32vw"
                        className="object-cover transition-transform duration-[1400ms] ease-out group-hover/product-card:scale-[1.04]"
                    />
                </div>
                <div
                    className="absolute inset-x-0 bottom-0 h-1/2 transition-[background] duration-500"
                    style={{ background: `linear-gradient(180deg, ${isActive ? "rgba(20,17,15,0)" : "rgba(255,255,255,0)"} 0%, ${base} 100%)` }}
                />
            </div>

            <div className="relative z-10 flex flex-col items-center px-8 pb-9 text-center">
                <h3
                    className={`text-[clamp(1.4rem,1.9vw,1.85rem)] font-normal leading-[1.1] tracking-[-0.02em] transition-colors duration-500 ${isActive ? "text-white" : "text-[rgb(30,34,38)]"}`}
                >
                    {section.title}
                </h3>
                <p
                    className={`mt-3 max-w-[18rem] text-[0.95rem] font-light leading-[1.5] transition-colors duration-500 ${isActive ? "text-white/65" : "text-[rgb(30,34,38)]/60"}`}
                >
                    {section.homeStatement}
                </p>
                <Link
                    href={section.href}
                    onClick={onNavigate}
                    aria-label={`${section.cta}: ${section.description}`}
                    className={`mt-6 inline-flex h-11 items-center rounded-full px-6 text-[0.7rem] font-normal uppercase tracking-[0.08em] transition-colors duration-500 ${
                        isActive
                            ? "bg-white text-[rgb(20,20,20)] hover:bg-white/85"
                            : "bg-[rgb(30,34,38)] text-white hover:bg-[rgb(30,34,38)]/85"
                    }`}
                >
                    <span>{enterChapterLabel}</span>
                </Link>
            </div>
        </article>
    );
}

export function ProductSection() {
    const { locale, content } = useSiteLocale();
    const products = getProducts(locale);
    const { startProductTransition } = useProductTransition();
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<(HTMLElement | null)[]>([]);
    const imageFramesRef = useRef<(HTMLDivElement | null)[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

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

        const cards = cardsRef.current.filter(Boolean) as HTMLElement[];
        if (cards.length === 0) {
            return;
        }

        const media = gsap.matchMedia();
        const context = gsap.context(() => {
            media.add("(prefers-reduced-motion: reduce)", () => {
                gsap.set(cards, { opacity: 1, y: 0, filter: "none" });
                cards.forEach((card) => {
                    const image = card.querySelector<HTMLElement>(
                        ".product-card-media",
                    );

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
                    const image = card.querySelector<HTMLElement>(
                        ".product-card-media",
                    );

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
                        },
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
            className="relative overflow-hidden bg-white px-6 py-16 text-[rgb(30,34,38)] md:px-12 lg:px-20 lg:py-24"
        >
            <div className="mx-auto flex max-w-[100rem] flex-col items-center gap-12">
                <div className="flex flex-col items-center gap-3 text-center">
                    <h2 className="sr-only">Choose your treatment category.</h2>
                    <WordReveal
                        as="p"
                        text={content.home.productSection.title}
                        className="text-[clamp(2.2rem,3.8vw,3.4rem)] font-normal leading-[1.05] tracking-[-0.02em] text-balance text-(--brand-blue)"
                    />
                    <p className="max-w-[34rem] text-[1.02rem] font-light leading-[1.5] text-[rgb(30,34,38)]/65">
                        {content.home.productSection.description}
                    </p>
                </div>

                <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3 md:gap-8 lg:gap-10">
                    {products.map((section, index) => (
                        <ChapterCard
                            key={section.id}
                            section={section}
                            isActive={index === activeIndex}
                            enterChapterLabel={content.home.productSection.enterChapter}
                            cardRef={(element) => {
                                cardsRef.current[index] = element;
                            }}
                            imageFrameRef={(element) => {
                                imageFramesRef.current[index] = element;
                            }}
                            onNavigate={(event) => handleProductNavigation(event, section, index)}
                            onSelect={() => setActiveIndex(index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
