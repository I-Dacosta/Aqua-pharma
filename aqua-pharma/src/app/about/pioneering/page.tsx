import Link from "next/link";
import Image from "next/image";

import { ContactSection } from "@/components/core/ContactSection";
import { Footer } from "@/components/core/Footer";
import { Navbar } from "@/components/core/Navbar";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata = {
  title: "A History of Pioneering | Aqua Pharma",
  description: "Our journey of pioneering innovation in aquaculture — from the first well boat treatments in 2009 to next-generation sustainable solutions.",
};

interface Chapter {
  year: string;
  label: string;
  body: string;
  image?: string;
  alt?: string;
}

const chapters: Chapter[] = [
  {
    year: "2009",
    label: "Well Boats",
    image: "/images/wp/pioneering/well-boats.jpg",
    alt: "Well boat treatment system",
    body: "This is where it all started. Each well boat became equipped with one or two ISOs and a closed dosing system to ensure the highest safety standards. The well boat dosing unit determines the exact treatment volume required, bringing pharmaceutical precision directly to the farm site.",
  },
  {
    year: "2009 –",
    label: "Titrations & Calibrations",
    image: "/images/wp/pioneering/titrations.jpg",
    alt: "Titration and calibration process",
    body: "Aqua Pharma's concept has the great advantage that the required concentration of product used can be easily examined by a quick titration. This method also allows the customer to assess and adjust the dosing mixture. The system takes multiple samples from the well to estimate flow and distribution, determining the right treatment volume needed. Auto-titration systems are available to further simplify the process.",
  },
  {
    year: "2013",
    label: "Tarpaulin Treatments",
    image: "/images/wp/pioneering/tarpaulins.png",
    alt: "Tarpaulin treatment concept",
    body: "In 2013, the tarpaulin treatment concept was introduced. These bath treatments require less handling of the fish, are faster, and are regarded as among the gentlest treatments available with respect to fish welfare. Fish remain in their natural environment, reducing stress and supporting better welfare, while the tarpaulin limits exposure to the surrounding environment.",
  },
  {
    year: "2013 –",
    label: "Dosing Innovation",
    image: "/images/wp/pioneering/dosing-innovation.png",
    alt: "Pioneering dosing unit design",
    body: "The high safety results developed for the well boat treatments were duplicated and adapted for tarpaulin treatments. Different designs were developed depending on the size of the treatment vessels. Common to all systems is that dosing occurs in a closed system until the treatment substance reaches the cage.",
  },
  {
    year: "2014 –",
    label: "Pre-Dose Concept",
    image: "/images/wp/pioneering/pre-dose.jpg",
    alt: "Pre-dose concept for tarpaulin treatments",
    body: "The calibration systems from the well boat experience were brought over to tarpaulin treatments. The calibration system for tarpaulin allows the user to start with just a small dose, collect samples and calculate the filling volume in the tarp prior to the main dose. By doing so, margins and fish welfare are maximised.",
  },
  {
    year: "2019 –",
    label: "Aqua Pharma Group",
    body: "In September 2019, a joint venture between Aquatiq and Solvay creates Aqua Pharma Group, accelerating research initiatives and supporting further growth in new markets. The BREEZE initiative — combining hydrogen peroxide treatment with acoustic technology — wins the European Sustainable Aquaculture Competition in 2021. SEATRU™ launches in 2022 to bring the same precision to shrimp farming.",
  },
];

export default function PioneeringPage() {
  return (
    <div className="min-h-screen bg-(--brand-paper) text-(--brand-dark)">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative flex min-h-[78vh] w-full flex-col justify-end overflow-hidden bg-(--brand-blue)">
        <div className="absolute inset-0">
          <Image
            src="/images/wp/pioneering/hero.jpg"
            alt="Aqua Pharma pioneering well boat operations"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40 motion-safe:animate-[zoomOut_12s_ease-out_forwards]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(21,31,109,0.96)_0%,rgba(21,31,109,0.42)_55%,rgba(21,31,109,0.18)_100%)]" />
        </div>
        <ScrollReveal className="relative z-10 px-6 pb-20 pt-40 md:px-12 lg:px-20 lg:pb-28" duration={1.12} yOffset={34}>
          <p className="mb-6 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-white/60">
            Innovation History
          </p>
          <h1 className="font-heading text-[clamp(2.8rem,6vw,6rem)] font-light leading-[1.0] tracking-wide text-white">
            A History<br />of Pioneering
          </h1>
          <p className="mt-8 max-w-xl text-[1.05rem] font-light leading-[1.8] text-white/70">
            Precision treatment and fish welfare — how it all started.
          </p>
        </ScrollReveal>
      </section>

      {/* ── Intro split ── */}
      <section className="border-b border-(--brand-blue)/8 px-6 py-24 md:px-12 md:py-32 lg:px-20">
        <ScrollReveal className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-32" duration={0.92} start="top 90%" yOffset={26}>
          <div>
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-(--brand-glaucous)">
              Our Approach
            </p>
            <h2 className="mt-6 font-heading text-[clamp(2rem,3.8vw,3.6rem)] font-light leading-[1.1] tracking-wide text-(--brand-blue)">
              We innovate around real farm conditions, not lab abstractions.
            </h2>
          </div>
          <p className="flex items-center text-[1.1rem] font-light leading-[1.85] text-(--brand-dark)/70">
            Since our founding, Aqua Pharma has been at the forefront of aquaculture innovation. Each milestone represents a practical breakthrough — shaped by the realities of farm operations and driven by our commitment to fish welfare and environmental responsibility.
          </p>
        </ScrollReveal>
      </section>

      {/* ── Timeline chapters ── */}
      <section className="px-6 py-16 md:px-12 md:py-24 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="mb-14" duration={0.82} start="top 91%" yOffset={18}>
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-(--brand-glaucous)">
              Innovation Timeline
            </p>
          </ScrollReveal>

          <div className="space-y-0 divide-y divide-(--brand-blue)/8">
            {chapters.map((ch, idx) => (
              <ScrollReveal
                key={`${ch.year}-${ch.label}`}
                className="grid grid-cols-1 gap-8 py-12 md:grid-cols-[10rem_1fr] md:gap-16 md:py-14 lg:grid-cols-[16rem_1fr]"
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
                  <p className="text-[1.05rem] font-light leading-[1.85] text-(--brand-dark)/70">
                    {ch.body}
                  </p>
                  {ch.image ? (
                    <div className="overflow-hidden border border-(--brand-blue)/10 bg-(--brand-paper-warm)">
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
          alt="Aquaculture fish farm operations at sea"
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
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-(--brand-glaucous)">
              What It Changed
            </p>
            <h2 className="mt-6 font-heading text-[clamp(2rem,3.6vw,3.4rem)] font-light leading-[1.1] tracking-wide text-(--brand-blue)">
              The outcomes behind the milestones.
            </h2>
          </ScrollReveal>

          <ScrollReveal className="mt-16 grid grid-cols-1 gap-px bg-(--brand-blue)/8 md:grid-cols-2" duration={0.84} start="top 90%" yOffset={20} staggerChildren staggerAmount={0.08}>
            {[
              {
                title: "Industry Leadership",
                body: "Aqua Pharma technologies and operational methods are used across aquaculture markets worldwide, shaping how modern treatment programs are delivered.",
              },
              {
                title: "Research & Development",
                body: "Dedicated R&D investment keeps our work grounded in science while pushing practical treatment systems forward — from BREEZE to SEATRU™.",
              },
              {
                title: "Environmental Commitment",
                body: "Our transition toward lower-impact and non-antimicrobial approaches reflects a deliberate commitment to sustainable aquaculture. H₂O₂ breaks down into water and oxygen — no residue left behind.",
              },
              {
                title: "Global Operational Impact",
                body: "Over 30 dosing systems installed across 9 countries. Thousands of farm operations benefit from systems designed to improve fish welfare, productivity, and consistency at scale.",
              },
            ].map(({ title, body }) => (
              <div key={title} className="bg-(--brand-paper) p-10 md:p-14">
                <p className="font-heading text-[1.15rem] font-light text-(--brand-blue)">{title}</p>
                <div className="my-5 h-px w-10 bg-(--brand-tangerine)/60" />
                <p className="text-[1.05rem] font-light leading-[1.85] text-(--brand-dark)/70">{body}</p>
              </div>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* ── Looking forward CTA ── */}
      <section className="bg-(--brand-blue) px-6 py-24 md:px-12 md:py-32 lg:px-20">
        <ScrollReveal className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:gap-24" duration={0.92} start="top 90%" yOffset={24}>
          <div>
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-white/50">
              Looking Forward
            </p>
            <h2 className="mt-6 font-heading text-[clamp(2rem,4vw,4rem)] font-light leading-[1.05] text-white">
              The next chapter is already in the water.
            </h2>
          </div>
          <div className="flex flex-col justify-center gap-6">
            <p className="text-[1.05rem] font-light leading-[1.85] text-white/72">
              Aqua Pharma continues to explore biotechnology, automation, and sustainable farming practices. Our commitment to innovation doesn&apos;t stop — driven by science, shaped by operations, and guided by the health of life below water.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/about"
                className="border border-white/20 px-7 py-3.5 text-[0.8rem] font-medium uppercase tracking-[0.15em] text-white transition-colors hover:bg-white hover:text-(--brand-blue)"
              >
                About Aqua Pharma
              </Link>
              <Link
                href="/about/team"
                className="text-[0.8rem] font-medium uppercase tracking-[0.15em] text-white/55 transition-colors hover:text-white"
              >
                Meet the Team →
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
