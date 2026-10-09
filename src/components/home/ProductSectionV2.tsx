"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSiteLocale } from "@/components/core/SiteLocaleProvider";
import type { Locale } from "@/i18n/config";

gsap.registerPlugin(ScrollTrigger);

type ConceptCard = { title: string; href: string; image: string; alt: string; cta: string };

const cards: Record<Locale, ConceptCard[]> = {
    en: [
        { title: "Fish – Parasite Control", href: "/concepts/fish", image: "/images/wp/products/bath-hero.jpg", alt: "Salmon treatment at a sea farm", cta: "Explore fish" },
        { title: "Shrimp – Pond Health", href: "/concepts/shrimp", image: "/images/wp/products/water-chapter-seatru.jpg", alt: "Shrimp farming ponds", cta: "Explore shrimp" },
        { title: "Systems & Services", href: "/systems-services", image: "/images/wp/products/dosing-hero.jpg", alt: "Automated dosing equipment", cta: "Explore systems" },
    ],
    es: [
        { title: "Peces – Control de parásitos", href: "/concepts/fish", image: "/images/wp/products/bath-hero.jpg", alt: "Tratamiento de salmón en una granja marina", cta: "Explorar peces" },
        { title: "Camarón – Salud del estanque", href: "/concepts/shrimp", image: "/images/wp/products/water-chapter-seatru.jpg", alt: "Estanques de cultivo de camarón", cta: "Explorar camarón" },
        { title: "Sistemas y servicios", href: "/systems-services", image: "/images/wp/products/dosing-hero.jpg", alt: "Equipo de dosificación automatizado", cta: "Explorar sistemas" },
    ],
    no: [
        { title: "Fisk – Parasittkontroll", href: "/concepts/fish", image: "/images/wp/products/bath-hero.jpg", alt: "Laksebehandling ved et sjøanlegg", cta: "Utforsk fisk" },
        { title: "Reker – Damhelse", href: "/concepts/shrimp", image: "/images/wp/products/water-chapter-seatru.jpg", alt: "Rekedammer", cta: "Utforsk reker" },
        { title: "Systemer og tjenester", href: "/systems-services", image: "/images/wp/products/dosing-hero.jpg", alt: "Automatisert doseringsutstyr", cta: "Utforsk systemer" },
    ],
};

const headings: Record<Locale, { title: string; subtitle: string }> = {
    en: { title: "Aquaculture Health Concepts", subtitle: "Two proven platforms. One mission: healthier fish and shrimp farming." },
    es: { title: "Conceptos de salud acuícola", subtitle: "Dos plataformas probadas. Una misión: una acuicultura de peces y camarones más saludable." },
    no: { title: "Helsekonsepter for akvakultur", subtitle: "To velprøvde plattformer. Ett mål: sunnere oppdrett av fisk og reker." },
};

export function ProductSectionV2({ asPage = false }: { asPage?: boolean }) {
    const { locale } = useSiteLocale();
    const sectionRef = useRef<HTMLElement>(null);
    const cardsRef = useRef<(HTMLElement | null)[]>([]);

    useLayoutEffect(() => {
        if (!sectionRef.current) return;
        const elements = cardsRef.current.filter(Boolean) as HTMLElement[];
        const media = gsap.matchMedia();
        const context = gsap.context(() => {
            media.add("(prefers-reduced-motion: reduce)", () => gsap.set(elements, { opacity: 1, y: 0 }));
            media.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.fromTo(elements, { opacity: 0, y: 30 }, {
                    opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out",
                    scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
                });
            });
        }, sectionRef);
        return () => { media.revert(); context.revert(); };
    }, [locale]);

    return (
        <section id="products" ref={sectionRef} aria-labelledby="product-section-v2-title" className="bg-(--brand-paper) px-6 pb-24 pt-32 text-(--brand-dark) md:px-12 md:pt-40 lg:px-20">
            <div className="mx-auto w-full max-w-[100rem]">
                <div className="mb-12 max-w-[50rem]">
                    {asPage ? (
                        <h1 id="product-section-v2-title" className="font-heading text-[clamp(2.4rem,4vw,4.5rem)] font-light leading-[1.02] text-(--brand-blue)">{headings[locale].title}</h1>
                    ) : (
                        <h2 id="product-section-v2-title" className="font-heading text-[clamp(2.4rem,4vw,4.5rem)] font-light leading-[1.02] text-(--brand-blue)">{headings[locale].title}</h2>
                    )}
                    <p className="type-body mt-5 font-light text-(--brand-dark)/80">{headings[locale].subtitle}</p>
                </div>
                <div className="grid grid-cols-1 gap-x-[clamp(1.25rem,2.4vw,2.5rem)] gap-y-14 md:grid-cols-3 md:gap-y-0">
                    {cards[locale].map((card, index) => (
                        <article key={card.href} ref={(element) => { cardsRef.current[index] = element; }} className="group product-card-v2">
                            <Link href={card.href} className="block focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-(--brand-blue)">
                                <div className="relative aspect-[16/9] overflow-hidden rounded-[8px] bg-(--brand-paper-mist)">
                                    <Image src={card.image} alt={card.alt} fill sizes="(max-width: 767px) 100vw, 33vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.035]" />
                                </div>
                                <div className="pt-5 md:pt-6">
                                    <p className="text-[0.7rem] text-(--brand-ink-muted)">{String(index + 1).padStart(3, "0")}</p>
                                    <h3 className="mt-3 min-h-[2.3em] max-w-[18ch] font-heading text-[clamp(1.5rem,2.05vw,2.05rem)] font-light leading-[1.08] text-(--brand-dark)">{card.title}</h3>
                                    <div className="mt-5 border-t border-(--brand-dark)/20" />
                                    <span className="brand-button mt-5">{card.cta}<ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} /></span>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
