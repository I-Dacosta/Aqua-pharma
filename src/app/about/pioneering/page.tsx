import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

import { ContactSection } from "@/components/core/ContactSection";
import { Footer } from "@/components/core/Footer";
import { Navbar } from "@/components/core/Navbar";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getEditorialPagesContent } from "@/i18n/editorial-pages";
import { getRequestLocale } from "@/i18n/request";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  return getEditorialPagesContent(locale).pioneering.metadata;
}

export default async function PioneeringPage() {
  const locale = await getRequestLocale();
  const page = getEditorialPagesContent(locale).pioneering;

  return (
    <div className="min-h-[90vh] bg-(--brand-paper) text-(--brand-dark)">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative flex min-h-[90vh] w-full flex-col justify-end overflow-hidden bg-(--brand-blue)">
        <div className="absolute inset-0">
          <Image
            src="/images/wp/pioneering/hero.jpg"
            alt={page.hero.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40 motion-safe:animate-[zoomOut_12s_ease-out_forwards]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(38,45,98,0.96)_0%,rgba(38,45,98,0.42)_55%,rgba(38,45,98,0.18)_100%)]" />
        </div>
        <ScrollReveal className="relative z-10 px-6 pb-20 pt-40 md:px-12 lg:px-20 lg:pb-28" duration={1.12} yOffset={34}>
          <p className="mb-6 text-[0.65rem] font-medium uppercase tracking-[0.35em] text-white/60">
            {page.hero.kicker}
          </p>
          <h1 className="font-heading text-[clamp(3.5rem,8vw,8rem)] font-light leading-[0.9] tracking-tight text-white mb-6 whitespace-pre-line">
            {page.hero.title}
          </h1>
          <p className="mt-8 max-w-xl text-[1.15rem] font-light leading-[1.8] text-white/70">
            {page.hero.description}
          </p>
        </ScrollReveal>
      </section>

      {/* ── Intro split ── */}
      <section className="border-b border-(--brand-blue)/8 px-6 py-24 md:px-12 md:py-32 lg:px-20">
        <ScrollReveal className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-32" duration={0.92} start="top 90%" yOffset={26}>
          <div>
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-(--brand-glaucous)">
              {page.intro.kicker}
            </p>
            <h2 className="mt-6 font-heading text-[clamp(2rem,3.8vw,3.6rem)] font-light leading-[1.1] tracking-wide text-(--brand-blue)">
              {page.intro.title}
            </h2>
          </div>
          <p className="flex items-center text-[1.15rem] font-light leading-[1.85] text-(--brand-dark)/70">
            {page.intro.body}
          </p>
        </ScrollReveal>
      </section>

      {/* ── Timeline chapters ── */}
      <section className="px-6 py-16 md:px-12 md:py-24 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="mb-14" duration={0.82} start="top 91%" yOffset={18}>
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-(--brand-glaucous)">
              {page.timeline.kicker}
            </p>
          </ScrollReveal>

          <div className="space-y-0 border-t border-(--brand-blue)/10">
            {page.timeline.entries.map((ch, idx) => (
              <ScrollReveal
                key={`${ch.year}-${ch.label}`}
                className="grid grid-cols-1 gap-8 py-12 md:grid-cols-[10rem_1fr] md:gap-16 md:py-14 lg:grid-cols-[16rem_1fr] border-b border-(--brand-blue)/10 transition-colors duration-500 group hover:bg-(--brand-blue)/[0.02]"
                delay={Math.min(idx * 0.025, 0.1)}
                duration={0.8}
                start="top 91%"
                yOffset={20}
              >
                {/* Year + label */}
                <div>
                  <span className="font-heading text-[0.78rem] font-light tabular-nums text-(--brand-blue)/30">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-1 font-heading text-[1rem] font-light text-(--brand-blue)/60">
                    {ch.year}
                  </p>
                  <p className="mt-1 text-[0.72rem] font-medium uppercase tracking-[0.2em] text-(--brand-glaucous)">
                    {ch.label}
                  </p>
                </div>
                {/* Body */}
                <div className={`grid gap-8 ${ch.image ? "xl:grid-cols-[minmax(0,1fr)_20rem] xl:items-start" : "grid-cols-1"}`}>
                  <p className="text-[1.15rem] font-light leading-[1.85] text-(--brand-dark)/70">
                    {ch.body}
                  </p>
                  {ch.image ? (
                    <div className="overflow-hidden border border-(--brand-blue)/10 bg-(--brand-paper-mist)">
                      <Image
                        src={ch.image}
                        alt={ch.alt ?? ch.label}
                        width={1280}
                        height={960}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  ) : null}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Image break ── */}
      <section className="h-[45vh] overflow-hidden md:h-[55vh]">
        <Image
          src="/hero.jpg"
          alt={page.imageBreakAlt}
          width={1920}
          height={960}
          className="h-full w-full object-cover object-center"
          sizes="100vw"
        />
      </section>

      {/* ── Key outcomes ── */}
      <section className="border-b border-(--brand-blue)/8 px-6 py-24 md:px-12 md:py-32 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="max-w-2xl" duration={0.9} start="top 90%" yOffset={24}>
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-(--brand-glaucous)">
              {page.outcomes.kicker}
            </p>
            <h2 className="mt-6 font-heading text-[clamp(2rem,3.6vw,3.4rem)] font-light leading-[1.1] tracking-wide text-(--brand-blue)">
              {page.outcomes.title}
            </h2>
          </ScrollReveal>

          <ScrollReveal className="mt-16 grid grid-cols-1 gap-px bg-(--brand-blue)/8 md:grid-cols-2" duration={0.84} start="top 90%" yOffset={20} staggerChildren staggerAmount={0.08}>
            {page.outcomes.items.map(({ title, body }) => (
              <div key={title} className="bg-(--brand-paper) p-10 md:p-14">
                <p className="font-heading text-[1.15rem] font-light text-(--brand-blue)">{title}</p>
                <div className="my-5 h-px w-10 bg-(--brand-tangerine)/60" />
                <p className="text-[1.15rem] font-light leading-[1.85] text-(--brand-dark)/70">{body}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* ── Looking forward CTA ── */}
      <section className="bg-(--brand-blue) px-6 py-24 md:px-12 md:py-32 lg:px-20">
        <ScrollReveal className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:gap-24" duration={0.92} start="top 90%" yOffset={24}>
          <div>
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-white/50">
              {page.forward.kicker}
            </p>
            <h2 className="mt-6 font-heading text-[clamp(3.5rem,8vw,8rem)] font-light leading-[1.05] text-white">
              {page.forward.title}
            </h2>
          </div>
          <div className="flex flex-col justify-center gap-6">
            <p className="text-[1.15rem] font-light leading-[1.85] text-white/72">
              {page.forward.body}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/about"
                className="border border-white/20 px-7 py-3.5 text-[0.8rem] font-medium uppercase tracking-[0.15em] text-white transition-colors hover:bg-white hover:text-(--brand-blue)"
              >
                {page.forward.aboutCta}
              </Link>
              <Link
                href="/about/team"
                className="text-[0.8rem] font-medium uppercase tracking-[0.15em] text-white/55 transition-colors hover:text-white"
              >
                {page.forward.teamCta}
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <ContactSection />
      <Footer />
    </div>
  );
}
