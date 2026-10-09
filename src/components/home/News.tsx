"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useSiteLocale } from "@/components/core/SiteLocaleProvider";
import { EVENTS, getUpcomingEvents } from "@/data/events";
import type { Locale } from "@/i18n/config";
import { getEditorialPagesContent } from "@/i18n/editorial-pages";

const copy: Record<Locale, { title: string; intro: string; upcoming: string; next: string; empty: string; organiser: string; meet: string; all: string; archive: string; read: string }> = {
    en: { title: "Events & News", intro: "Research, partnerships and company stories from Aqua Pharma.", upcoming: "Upcoming", next: "Next up", empty: "More events to be announced.", organiser: "Visit organiser", meet: "Meet us there", all: "All news", archive: "From the archive", read: "Read story" },
    es: { title: "Eventos y noticias", intro: "Investigación, alianzas e historias de Aqua Pharma.", upcoming: "Próximamente", next: "A continuación", empty: "Pronto anunciaremos más eventos.", organiser: "Visitar organizador", meet: "Encuéntranos allí", all: "Todas las noticias", archive: "Del archivo", read: "Leer noticia" },
    no: { title: "Arrangementer og nyheter", intro: "Forskning, samarbeid og historier fra Aqua Pharma.", upcoming: "Kommende", next: "Neste", empty: "Flere arrangementer kunngjøres snart.", organiser: "Besøk arrangør", meet: "Møt oss der", all: "Alle nyheter", archive: "Fra arkivet", read: "Les saken" },
};

export function News({ today, onAbout = false }: { today: string; onAbout?: boolean }) {
    const { locale } = useSiteLocale();
    const labels = copy[locale];
    const [featured, ...following] = getUpcomingEvents(EVENTS, new Date(`${today}T00:00:00Z`));
    const [leadStory, ...otherStories] = getEditorialPagesContent(locale).media.releases.slice(0, 3);
    const dateLocale = locale === "no" ? "nb-NO" : locale === "es" ? "es-ES" : "en-GB";
    const date = (value: string) => new Intl.DateTimeFormat(dateLocale, { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${value}T00:00:00Z`));

    return (
        <section id={onAbout ? "events-news" : "news"} className="bg-(--brand-paper) px-6 pb-24 pt-32 md:px-12 lg:px-20">
            <div className="mx-auto max-w-[100rem]">
                <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
                    <div>
                        <h2 className="font-heading text-[clamp(2.5rem,4vw,4rem)] font-light leading-none text-(--brand-blue)">{labels.title}</h2>
                        <p className="type-body mt-4 font-light text-(--brand-dark)/80">{labels.intro}</p>
                    </div>
                    <Link href="/about/media" className="brand-button-outline">{labels.all}<ArrowRight aria-hidden="true" size={16} /></Link>
                </div>

                {featured ? (
                    <div className="grid gap-10 border-t border-(--brand-blue)/20 pt-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
                        <div className="relative aspect-[16/10] overflow-hidden rounded-[8px] bg-(--brand-blue-soft)">
                            <Image src={featured.image} alt={featured.imageAlt} fill sizes="(max-width: 1023px) 100vw, 60vw" className="object-cover" />
                        </div>
                        <div className="flex flex-col justify-center">
                            <p className="text-[0.78rem] uppercase text-(--brand-glaucous)">{labels.upcoming} · {date(featured.startsAt)} · {featured.location}</p>
                            <h3 className="mt-5 font-heading text-[clamp(1.8rem,3vw,3rem)] font-light leading-[1.08] text-(--brand-blue)">{featured.title[locale]}</h3>
                            <p className="mt-6 max-w-[38rem] font-light leading-[1.7] text-(--brand-dark)/70">{featured.excerpt[locale]}</p>
                            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4 text-sm text-(--brand-blue)">
                                <a href={featured.organizerUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:underline">{labels.organiser}<ArrowUpRight aria-hidden="true" size={16} /></a>
                                <Link href="/#contact" className="brand-button">{labels.meet}<ArrowRight aria-hidden="true" size={16} /></Link>
                            </div>
                        </div>
                    </div>
                ) : null}

                {following.length ? (
                    <div className="mt-10 grid gap-4 md:grid-cols-2">
                        {following.map((event) => (
                            <div key={event.id} className="border-t border-(--brand-blue)/20 pt-5">
                                <p className="text-[0.75rem] uppercase text-(--brand-glaucous)">{labels.next} · {date(event.startsAt)} · {event.location}</p>
                                <h3 className="mt-3 font-heading text-[1.5rem] font-light text-(--brand-blue)">{event.title[locale]}</h3>
                            </div>
                        ))}
                    </div>
                ) : null}

                {leadStory ? (
                    <div className={featured ? "mt-20 border-t border-(--brand-blue)/20 pt-8" : "border-t border-(--brand-blue)/20 pt-8"}>
                        <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
                            <p className="text-[0.75rem] uppercase text-(--brand-glaucous)">{labels.archive}</p>
                            {!featured ? <p className="text-sm font-light text-(--brand-dark)/70">{labels.empty}</p> : null}
                        </div>
                        <article className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
                            <a href={leadStory.href ?? "/about/media"} target={leadStory.href ? "_blank" : undefined} rel={leadStory.href ? "noopener noreferrer" : undefined} className="group block overflow-hidden rounded-[8px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--brand-blue)">
                                <div className="relative aspect-[16/9] overflow-hidden bg-(--brand-blue-soft)">
                                    <Image src={leadStory.image} alt={leadStory.title} fill sizes="(max-width: 1023px) 100vw, 55vw" className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                                </div>
                            </a>
                            <div>
                                <p className="text-[0.75rem] uppercase text-(--brand-glaucous)">{leadStory.category} · {leadStory.date}</p>
                                <h3 className="mt-5 font-heading text-[clamp(1.7rem,2.5vw,2.75rem)] font-light leading-[1.15] text-(--brand-blue)">{leadStory.title}</h3>
                                <p className="mt-5 max-w-[39rem] font-light leading-[1.7] text-(--brand-dark)/70">{leadStory.description}</p>
                                <a href={leadStory.href ?? "/about/media"} target={leadStory.href ? "_blank" : undefined} rel={leadStory.href ? "noopener noreferrer" : undefined} className="brand-button mt-7">{labels.read}<ArrowUpRight aria-hidden="true" size={16} /></a>
                            </div>
                        </article>
                        <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-8 lg:mt-16">
                            {otherStories.map((story) => (
                                <article key={story.title} className="grid gap-5 border-t border-(--brand-blue)/20 pt-6 sm:grid-cols-[10rem_1fr] sm:items-start">
                                    <div className="relative aspect-[16/10] overflow-hidden rounded-[8px] bg-(--brand-blue-soft)">
                                        <Image src={story.image} alt={story.title} fill sizes="(max-width: 639px) 100vw, 160px" className="object-cover" />
                                    </div>
                                    <div>
                                        <p className="text-[0.72rem] uppercase text-(--brand-glaucous)">{story.category} · {story.date}</p>
                                        <h3 className="mt-2 font-heading text-[1.3rem] font-light leading-[1.25] text-(--brand-blue)">{story.title}</h3>
                                        <a href={story.href ?? "/about/media"} target={story.href ? "_blank" : undefined} rel={story.href ? "noopener noreferrer" : undefined} className="mt-4 inline-flex items-center gap-2 text-sm text-(--brand-blue) hover:underline">{labels.read}<ArrowUpRight aria-hidden="true" size={15} /></a>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                ) : (
                    !featured && <p className="border-y border-(--brand-blue)/20 py-10 font-light text-(--brand-blue)">{labels.empty}</p>
                )}
            </div>
        </section>
    );
}
