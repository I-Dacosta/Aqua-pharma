"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useSiteLocale } from "@/components/core/SiteLocaleProvider";
import type { Locale } from "@/i18n/config";

type Solution = {
    title: string;
    href: string;
    image: string;
    imageAlt: string;
    cta: string;
};

type QuickNavCopy = {
    title: string;
    intro: string;
    navigationLabel: string;
    solutions: Solution[];
};

const copy: Record<Locale, QuickNavCopy> = {
    en: {
        title: "Aquaculture Health Concepts",
        intro: "Specialist solutions for healthier fish and shrimp farming.",
        navigationLabel: "Aquaculture health concepts",
        solutions: [
            { title: "Fish - Parasite Control", href: "/concepts/fish", image: "/images/wp/products/bath-hero.jpg", imageAlt: "Salmon treatment at a sea farm", cta: "Explore fish" },
            { title: "Shrimp - Pond Health", href: "/concepts/shrimp", image: "/images/wp/products/water-chapter-seatru.jpg", imageAlt: "Shrimp farming ponds", cta: "Explore shrimp" },
            { title: "Systems & Services", href: "/systems-services", image: "/images/wp/products/dosing-hero.jpg", imageAlt: "Automated dosing equipment", cta: "Explore systems" },
        ],
    },
    es: {
        title: "Conceptos de salud acuícola",
        intro: "Soluciones especializadas para una acuicultura de peces y camarones más saludable.",
        navigationLabel: "Conceptos de salud acuícola",
        solutions: [
            { title: "Peces - Control de parásitos", href: "/concepts/fish", image: "/images/wp/products/bath-hero.jpg", imageAlt: "Tratamiento de salmón en una granja marina", cta: "Explorar peces" },
            { title: "Camarón - Salud del estanque", href: "/concepts/shrimp", image: "/images/wp/products/water-chapter-seatru.jpg", imageAlt: "Estanques de cultivo de camarón", cta: "Explorar camarón" },
            { title: "Sistemas y servicios", href: "/systems-services", image: "/images/wp/products/dosing-hero.jpg", imageAlt: "Equipo de dosificación automatizado", cta: "Explorar sistemas" },
        ],
    },
    no: {
        title: "Helsekonsepter for akvakultur",
        intro: "Spesialistløsninger for sunnere oppdrett av fisk og reker.",
        navigationLabel: "Helsekonsepter for akvakultur",
        solutions: [
            { title: "Fisk - Parasittkontroll", href: "/concepts/fish", image: "/images/wp/products/bath-hero.jpg", imageAlt: "Laksebehandling ved et sjøanlegg", cta: "Utforsk fisk" },
            { title: "Reker - Damhelse", href: "/concepts/shrimp", image: "/images/wp/products/water-chapter-seatru.jpg", imageAlt: "Rekedammer", cta: "Utforsk reker" },
            { title: "Systemer og tjenester", href: "/systems-services", image: "/images/wp/products/dosing-hero.jpg", imageAlt: "Automatisert doseringsutstyr", cta: "Utforsk systemer" },
        ],
    },
};

export function QuickNavBlocks() {
    const { locale } = useSiteLocale();
    const section = copy[locale];

    return (
        <section id="quick-nav" aria-labelledby="quick-nav-title" className="bg-(--brand-paper) px-6 py-20 md:px-12 md:py-24 lg:px-20">
            <div className="mx-auto w-full max-w-[100rem]">
                <div className="max-w-[44rem]">
                    <h2 id="quick-nav-title" className="font-heading text-[clamp(2.25rem,4vw,4.25rem)] font-light leading-[1.02] text-(--brand-blue)">{section.title}</h2>
                    <p className="type-body mt-4 font-light text-(--brand-dark)/78">{section.intro}</p>
                </div>
                <nav aria-label={section.navigationLabel} className="mt-12 grid grid-cols-1 gap-x-[clamp(1.25rem,2.4vw,2.5rem)] gap-y-12 md:grid-cols-3 md:gap-y-0">
                    {section.solutions.map((solution, index) => (
                        <article key={solution.href} className="border-t border-(--brand-blue)/20 pt-5">
                            <Link href={solution.href} className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-(--brand-blue)">
                                <div className="relative aspect-[16/10] overflow-hidden rounded-[8px] bg-(--brand-blue-soft)">
                                    <Image src={solution.image} alt={solution.imageAlt} fill sizes="(max-width: 767px) 100vw, 33vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                                </div>
                                <p className="mt-4 text-[0.72rem] font-medium uppercase tracking-[0.1em] text-(--brand-ink-muted)">{String(index + 1).padStart(2, "0")}</p>
                                <h3 className="mt-2 max-w-[18ch] font-heading text-[clamp(1.5rem,2vw,2rem)] font-light leading-[1.08] text-(--brand-dark)">{solution.title}</h3>
                                <span className="brand-button mt-5">{solution.cta}<ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={1.5} /></span>
                            </Link>
                        </article>
                    ))}
                </nav>
            </div>
        </section>
    );
}
