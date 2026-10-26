import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/core/Navbar";
import { Footer } from "@/components/core/Footer";
import { News } from "@/components/home/News";
import { MapSection } from "@/components/home/MapSection";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getEditorialPagesContent } from "@/i18n/editorial-pages";
import { getRequestLocale } from "@/i18n/request";

export async function generateMetadata(): Promise<Metadata> {
    const locale = await getRequestLocale();
    return getEditorialPagesContent(locale).about.metadata;
}

export default async function AboutPage() {
    const locale = await getRequestLocale();
    const content = getEditorialPagesContent(locale);
    const page = content.about;
    const team = content.team;

    return (
        <main className="min-h-screen bg-(--brand-paper)">
            <Navbar />

            <section id="about-hero" className="relative flex min-h-[90vh] w-full flex-col justify-end overflow-hidden bg-(--brand-blue)">
                <div className="absolute inset-0">
                    <Image
                        src="/images/wp/about/about-hero.jpg"
                        alt={page.hero.imageAlt}
                        fill
                        priority
                        sizes="100vw"
                        className="scale-105 object-cover opacity-60 motion-safe:animate-[zoomOut_16s_ease-out_forwards]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-(--brand-blue) via-(--brand-blue)/40 to-transparent" />
                </div>
                <ScrollReveal className="relative z-10 px-6 pb-24 pt-40 md:px-12 lg:px-20 lg:pb-32" duration={1.15} yOffset={34}>
                    <div className="flex flex-col gap-12 md:flex-row md:items-end md:justify-between">
                        <div className="max-w-4xl">
                            <p className="mb-8 text-[0.875rem] font-medium uppercase text-white/80">{page.hero.kicker}</p>
                            <h1 className="mb-6 whitespace-pre-line font-heading text-[clamp(3.5rem,8vw,8rem)] font-light leading-[0.9] tracking-tight text-white">{page.hero.title}</h1>
                        </div>
                        <p className="type-body max-w-sm pb-4 font-light text-white/80">{page.hero.description}</p>
                    </div>
                </ScrollReveal>
            </section>

            <section id="who-we-are" className="bg-(--brand-paper) px-6 py-24 md:px-12 md:py-32 lg:px-20">
                <ScrollReveal className="mx-auto grid max-w-[100rem] grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-28" duration={0.9} start="top 85%" yOffset={26}>
                    <div>
                        <p className="text-[0.75rem] font-medium uppercase tracking-[0.14em] text-(--brand-glaucous)">{page.company.kicker}</p>
                        <h2 className="mt-6 font-heading text-[clamp(2.25rem,4vw,4.25rem)] font-light leading-[1.05] text-(--brand-blue)">{page.company.title}</h2>
                    </div>
                    <div className="space-y-7 lg:pt-2">
                        <p className="type-body font-light text-(--brand-dark)/80">{page.company.bodyPrimary}</p>
                        <p className="type-body font-light text-(--brand-dark)/80">{page.company.bodySecondary}</p>
                    </div>
                </ScrollReveal>
            </section>

            <section id="our-mission" className="bg-(--brand-blue) px-6 py-24 text-white md:px-12 md:py-28 lg:px-20">
                <ScrollReveal className="mx-auto grid max-w-[100rem] grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-28" duration={0.88} start="top 85%" yOffset={24}>
                    <div>
                        <p className="text-[0.75rem] font-medium uppercase tracking-[0.14em] text-white/68">{page.values.kicker}</p>
                        <h2 className="mt-6 font-heading text-[clamp(2.25rem,4vw,4.25rem)] font-light leading-[1.05] text-white">{page.values.title}</h2>
                    </div>
                    <div className="grid gap-10 sm:grid-cols-2">
                        <article className="border-t border-white/25 pt-5">
                            <h3 className="font-heading text-[1.7rem] font-light text-white">{page.values.careTitle}</h3>
                            <p className="mt-5 font-light leading-7 text-white/78">{page.values.careBody}</p>
                        </article>
                        <article className="border-t border-white/25 pt-5">
                            <h3 className="font-heading text-[1.7rem] font-light text-white">{page.values.dareTitle}</h3>
                            <p className="mt-5 font-light leading-7 text-white/78">{page.values.dareBody}</p>
                        </article>
                    </div>
                </ScrollReveal>
            </section>

            <MapSection id="global-presence" titleMode="global-presence" />

            <section id="team" className="bg-(--brand-paper) px-6 py-24 md:px-12 md:py-32 lg:px-20">
                <ScrollReveal className="mx-auto grid max-w-[100rem] gap-12 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-28" duration={0.9} start="top 85%" yOffset={26}>
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[8px] bg-(--brand-blue-soft)">
                        <Image src="/images/wp/about/about-team.jpg" alt={team.hero.imageAlt} fill sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" />
                    </div>
                    <div>
                        <p className="text-[0.75rem] font-medium uppercase tracking-[0.14em] text-(--brand-glaucous)">{team.intro.kicker}</p>
                        <h2 className="mt-6 max-w-[16ch] font-heading text-[clamp(2.25rem,4vw,4.25rem)] font-light leading-[1.05] text-(--brand-blue)">{team.intro.title}</h2>
                        <p className="type-body mt-6 max-w-[38rem] font-light text-(--brand-dark)/80">{team.intro.body}</p>
                        <Link href="/about/team" className="brand-button mt-8">{page.explore.teamCta}</Link>
                    </div>
                </ScrollReveal>
            </section>

            <News today={new Date().toISOString().slice(0, 10)} onAbout />
            <Footer />
        </main>
    );
}
