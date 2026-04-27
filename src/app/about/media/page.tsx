import Image from "next/image";
import type { Metadata } from "next";
import { Navbar } from "@/components/core/Navbar";
import { Footer } from "@/components/core/Footer";
import { ContactSection } from "@/components/core/ContactSection";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { getEditorialPagesContent } from "@/i18n/editorial-pages";
import { getRequestLocale } from "@/i18n/request";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale();
  return getEditorialPagesContent(locale).media.metadata;
}

export default async function MediaPage() {
  const locale = await getRequestLocale();
  const page = getEditorialPagesContent(locale).media;

  return (
    <div className="min-h-[90vh] bg-(--brand-paper)">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative flex min-h-[60vh] w-full flex-col justify-end overflow-hidden bg-(--brand-blue)">
        <div className="absolute inset-0">
          <Image
            src="/images/wp/media/breeze-trials.jpg"
            alt={page.hero.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-32 motion-safe:animate-[zoomOut_12s_ease-out_forwards]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(38,45,98,0.96)_0%,rgba(38,45,98,0.55)_55%,rgba(38,45,98,0.25)_100%)]" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 0,transparent 50%),repeating-linear-gradient(180deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize: "80px 80px" }}
          />
        </div>
        <ScrollReveal className="relative z-10 px-6 pb-20 pt-40 md:px-12 lg:px-20 lg:pb-28" duration={1.1} yOffset={34}>
          <p className="mb-6 text-[0.65rem] font-medium uppercase tracking-[0.35em] text-white/60">
            {page.hero.kicker}
          </p>
          <h1 className="font-heading text-[clamp(3.5rem,8vw,8rem)] font-light leading-[0.9] tracking-tight text-white mb-6">
            {page.hero.title}
          </h1>
          <p className="mt-8 max-w-xl text-[1.15rem] font-light leading-[1.8] text-white/70">
            {page.hero.description}
          </p>
        </ScrollReveal>
      </section>

      {/* ── Press Releases ── */}
      <section className="px-6 py-24 md:px-12 md:py-32 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="mb-16" duration={0.82} start="top 91%" yOffset={18}>
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-(--brand-glaucous)">
              {page.releasesKicker}
            </p>
          </ScrollReveal>

          <div className="space-y-0 border-t border-(--brand-blue)/10">
            {page.releases.map((release, idx) => (
              <ScrollReveal key={release.title} className="py-10 lg:py-12" delay={Math.min(idx * 0.02, 0.1)} duration={0.8} start="top 91%" yOffset={20}>
                <article className="group grid grid-cols-1 gap-6 transition-colors hover:bg-(--brand-blue-soft)/25 lg:grid-cols-[6rem_11rem_15rem_1fr_auto] lg:gap-8 lg:px-2">
                {/* Index */}
                <div className="hidden font-heading text-[0.78rem] font-light tabular-nums text-(--brand-blue)/30 lg:block lg:pt-1">
                  {String(idx + 1).padStart(3, "0")}
                </div>
                {/* Date + Category */}
                <div className="flex flex-row gap-4 lg:flex-col lg:gap-1">
                  <p className="font-heading text-[0.9rem] font-light text-(--brand-blue)/60">
                    {release.date}
                  </p>
                  <p className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-(--brand-glaucous)">
                    {release.category}
                  </p>
                </div>
                <div className="overflow-hidden border border-(--brand-blue)/10 bg-(--brand-paper-mist)">
                  <Image
                    src={release.image}
                    alt={release.title}
                    width={1280}
                    height={960}
                    priority={idx === 0}
                    className="h-full w-full object-cover"
                  />
                </div>
                {/* Title + Body */}
                <div>
                  <h3 className="font-heading text-[1.15rem] font-light leading-[1.35] text-(--brand-blue)">
                    {release.title}
                  </h3>
                  <p className="mt-3 text-[0.95rem] font-light leading-[1.8] text-(--brand-dark)/60">
                    {release.description}
                  </p>
                </div>
                {/* Arrow link */}
                <div className="flex items-start">
                  <a
                    href={release.href ?? "#"}
                    target={release.href ? "_blank" : undefined}
                    rel={release.href ? "noopener noreferrer" : undefined}
                    className="text-[0.72rem] font-medium uppercase tracking-[0.15em] text-(--brand-glaucous) transition-colors hover:text-(--brand-blue)"
                    aria-label={`Read story: ${release.title}`}
                  >
                    {page.readLabel}
                  </a>
                </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Media Kit ── */}
      <section className="border-t border-(--brand-blue)/8 px-6 py-24 md:px-12 md:py-32 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="mb-14 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-24" duration={0.9} start="top 90%" yOffset={24}>
            <div>
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-(--brand-glaucous)">
                {page.mediaKit.kicker}
              </p>
              <h2 className="mt-6 font-heading text-[clamp(2.5rem,4.5vw,4.5rem)] font-light leading-[1.05] tracking-tight text-(--brand-blue)">
                {page.mediaKit.title}
              </h2>
            </div>
            <p className="flex items-center text-[1.15rem] font-light leading-[1.85] text-(--brand-dark)/70">
              {page.mediaKit.body}
            </p>
          </ScrollReveal>

          <ScrollReveal className="grid grid-cols-1 gap-px bg-(--brand-blue)/8 md:grid-cols-3" duration={0.82} start="top 90%" yOffset={20} staggerChildren staggerAmount={0.08}>
            {page.mediaKit.items.map(({ label, sub, href }) => (
              <a
                key={label}
                href={href}
                download={href.endsWith(".pdf") ? "" : undefined}
                className="flex flex-col justify-between bg-(--brand-paper) p-8 transition-colors hover:bg-(--brand-blue-soft)/40 md:p-10"
              >
                <p className="font-heading text-[1.15rem] font-light text-(--brand-blue)">
                  {label}
                </p>
                <p className="mt-6 text-[0.72rem] font-medium uppercase tracking-[0.2em] text-(--brand-glaucous)">
                  {sub}
                </p>
              </a>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* ── Press Contact ── */}
      <section className="border-t border-(--brand-blue)/8 px-6 py-32 md:py-24 lg:px-20 lg:py-48">
        <ScrollReveal className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-24" duration={0.88} start="top 90%" yOffset={22}>
          <div>
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-(--brand-glaucous)">
              {page.press.kicker}
            </p>
            <h2 className="mt-6 font-heading text-[clamp(1.6rem,2.8vw,2.4rem)] font-light leading-[1.12] text-(--brand-blue)">
              {page.press.title}
            </h2>
            <p className="mt-6 text-[1.15rem] font-light leading-[1.85] text-(--brand-dark)/70">
              {page.press.body}
            </p>
          </div>
          <div className="flex flex-col justify-center gap-5">
            <a
              href="mailto:press@aqua-pharma.com"
              className="border-b border-(--brand-blue)/10 py-4 font-heading text-[1rem] font-light text-(--brand-blue) transition-colors hover:text-(--brand-glaucous)"
            >
              press@aqua-pharma.com
            </a>
            <a
              href="tel:+15550123"
              className="border-b border-(--brand-blue)/10 py-4 font-heading text-[1rem] font-light text-(--brand-blue) transition-colors hover:text-(--brand-glaucous)"
            >
              +1 (555) 0123
            </a>
          </div>
        </ScrollReveal>
      </section>

      <ContactSection />
      <Footer />
    </div>
  );
}
