import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/core/Navbar";
import { Footer } from "@/components/core/Footer";
import { ContactSection } from "@/components/core/ContactSection";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata = {
  title: "About Us | Aqua Pharma",
  description: "Learn about Aqua Pharma's mission, values, and 50+ years of innovation in aquaculture",
};

export default function AboutPage() {
  return (
    <div className="min-h-[90vh] bg-(--brand-paper)">
      <Navbar />
      
      {/* ── Hero ── */}
      <section className="relative flex min-h-[90vh] w-full flex-col justify-end overflow-hidden bg-(--brand-blue)">
        <div className="absolute inset-0">
          <Image
            src="/images/wp/about/about-hero.jpg"
            alt="Aqua Pharma aquaculture operations"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-60 motion-safe:animate-[zoomOut_16s_ease-out_forwards] scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-(--brand-blue) via-(--brand-blue)/40 to-transparent" />
        </div>

        <ScrollReveal className="relative z-10 px-6 pb-24 pt-40 md:px-12 lg:px-24 lg:pb-32" duration={1.15} yOffset={34}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-12">
            <div className="max-w-4xl">
              <p className="mb-8 text-[0.65rem] font-medium uppercase tracking-[0.35em] text-white/50">
                About Aqua Pharma
              </p>
              <h1 className="font-heading text-[clamp(3.5rem,8vw,8rem)] font-light leading-[0.9] tracking-tight text-white mb-6">
                Veterinary Care<br />Below Water.
              </h1>
            </div>
            <div className="max-w-sm pb-4">
              <p className="text-[1.15rem] font-light leading-[1.8] text-white/80">
                Leading veterinary services for aquaculture — designing and developing solutions for fish and shrimp health globally.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Who We Are ── */}
      <section className="px-6 py-32 md:px-12 md:py-48 lg:px-24 bg-(--brand-paper)">
        <ScrollReveal className="mx-auto grid max-w-screen-2xl grid-cols-1 gap-16 lg:grid-cols-[1fr_1.5fr] lg:gap-32" duration={0.9} start="top 85%" yOffset={26}>
          <div>
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-(--brand-glaucous) mb-8">
              Who We Are
            </p>
            <h2 className="font-heading text-[clamp(2.5rem,4.5vw,4.5rem)] font-light leading-[1.05] tracking-tight text-(--brand-blue)">
              A science-led company shaped by the sea.
            </h2>
          </div>
          <div className="flex flex-col justify-center gap-10 lg:pt-16">
            <p className="text-[1.25rem] font-light leading-[1.8] text-(--brand-dark)/80">
              Aqua Pharma is a leading veterinary services provider for the aquaculture industry. We design and develop solutions for fish and shrimp health globally. We operate in 9 countries — Australia, Belgium, Canada, Chile, Ecuador, Indonesia, Norway, Scotland and the USA — with around 50 employees across the world.
            </p>
            <p className="text-[1.15rem] font-light leading-[1.8] text-(--brand-dark)/60">
              The main market for Aqua Pharma is salmon farming, but we also develop treatment solutions for other species: shrimp, kingfish, trout, seabass, and seabream. Aqua Pharma Group is structurally backed by two innovative parent companies — <a href="https://www.solvay.com" className="border-b border-(--brand-blue)/30 pb-0.5 transition-colors hover:border-(--brand-blue) hover:text-(--brand-blue)">Solvay</a> (a global leader in sustainable materials and solutions) and <a href="https://aquatiq.com" className="border-b border-(--brand-blue)/30 pb-0.5 transition-colors hover:border-(--brand-blue) hover:text-(--brand-blue)">Aquatiq</a> (a Norwegian reference in Food Safety).
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Stats ── */}
      <section className="px-6 py-24 md:px-12 lg:px-24 bg-(--brand-blue) text-white">
        <ScrollReveal className="mx-auto grid max-w-screen-2xl grid-cols-2 gap-y-16 divide-x divide-white/10 border-y border-white/10 py-16 md:grid-cols-4" duration={0.78} start="top 85%" yOffset={18} staggerChildren staggerAmount={0.1}>
          {[
            { stat: "9", label: "Countries" },
            { stat: "50+", label: "Experts" },
            { stat: "50+", label: "Years" },
            { stat: "30+", label: "Dosing Systems" },
          ].map(({ stat, label }) => (
            <div key={label} className="flex flex-col justify-center px-8 md:px-12 text-center">
              <p className="font-heading text-[clamp(4rem,7vw,6.5rem)] font-light leading-none tracking-tight">
                {stat}
              </p>
              <p className="mt-6 text-[0.65rem] font-medium uppercase tracking-[0.35em] text-white/50">
                {label}
              </p>
            </div>
          ))}
        </ScrollReveal>
      </section>

       {/* ── Values ── */}
      <section className="border-b border-(--brand-blue)/8 px-6 py-24 md:px-12 md:py-32 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="max-w-2xl" duration={0.9} start="top 90%" yOffset={24}>
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-(--brand-glaucous)">
              Our Values
            </p>
            <h2 className="mt-6 font-heading text-[clamp(2rem,3.8vw,3.4rem)] font-light leading-[1.1] tracking-wide text-(--brand-blue)">
              We Care. We Dare.
            </h2>
          </ScrollReveal>

          <ScrollReveal className="mt-16 grid grid-cols-1 gap-px bg-(--brand-blue)/8 md:grid-cols-2" duration={0.84} start="top 90%" yOffset={20} staggerChildren staggerAmount={0.08}>
            <div className="bg-(--brand-paper) p-10 md:p-14">
              <p className="font-heading text-[clamp(1.6rem,2.5vw,2.4rem)] font-light tracking-wide text-(--brand-blue)">
                We Care
              </p>
              <div className="my-6 h-px w-12 bg-(--brand-tangerine)/60" />
              <p className="text-[1.05rem] font-light leading-[1.85] text-(--brand-dark)/70">
              Aqua Pharma goes beyond basic expectations and continuously improves in prevention and control methods, where technology allows it. We contribute to maintaining a responsible aquaculture industry by evolving our systems to support producers in meeting their objectives.
              </p>
            </div>
            <div className="bg-(--brand-paper) p-10 md:p-14">
              <p className="font-heading text-[clamp(1.6rem,2.5vw,2.4rem)] font-light tracking-wide text-(--brand-blue)">
                We Dare
              </p>
              <div className="my-6 h-px w-12 bg-(--brand-tangerine)/60" />
              <p className="text-[1.05rem] font-light leading-[1.85] text-(--brand-dark)/70">
              Our vision &ldquo;What it Takes&rdquo; reflects our employees&apos; attitude in their daily work and is the inspiration behind all our activities. Aqua Pharma always goes beyond the customer&apos;s expectations, bringing innovative thinking to old problems. We promote quality and take pride in the work we do — committed to our team and our customers, constantly working towards safe and sustainable approaches for management of life below water.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── History Timeline ── */}
      <section className="px-6 py-32 md:px-12 md:py-48 lg:px-24 bg-(--brand-paper)">
        <div className="mx-auto max-w-screen-2xl">
          <ScrollReveal className="max-w-3xl mb-24 lg:mb-32" duration={0.9} start="top 85%" yOffset={24}>
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-(--brand-glaucous) mb-8">
              Our History
            </p>
            <h2 className="font-heading text-[clamp(3.5rem,8vw,8rem)] font-light leading-[1] tracking-tight text-(--brand-blue)">
              Five decades<br/>in the water.
            </h2>
          </ScrollReveal>

          <div className="space-y-0 border-t border-(--brand-blue)/10">
            {[
              { era: "1970", label: "Origins", body: "First salmon farming begins in Norway — pens in the sea. A new industry is born, creating an urgent need for veterinary healthcare solutions for farmed fish populations at scale." },
              { era: "Late 1980s", label: "Industry Emerges", body: "Aquaculture expands rapidly with salmon and trout. Increasing fish density in cages accelerates the spread of disease. Salmon production loses approximately $1 billion a year to sea lice — a pressing challenge that will define Aqua Pharma's purpose." },
              { era: "2009", label: "Aqua Pharma Founded", body: "Aquatiq Norway — experts in food safety — enter the scene, setting up Aqua Pharma. They develop a concept for safe and sustainable bath treatments for both tarpaulin and well boat treatments. Solvay supports product knowledge." },
              { era: "2010 – 2018", label: "Global Expansion", body: "Other countries quickly follow, with operations set up in all the main salmon farming countries across Europe, North America, South America, and South-East Asia." },
              { era: "2019 – Present", label: "Aqua Pharma Group", body: "In September 2019, a joint venture between Aquatiq and Solvay is created, and Aqua Pharma becomes Aqua Pharma Group. The partnership will accelerate research initiatives and support further growth in new aquaculture markets." },
            ].map(({ era, label, body }, idx) => (
              <ScrollReveal key={era} className="grid grid-cols-1 gap-8 py-12 md:grid-cols-[1fr_2fr] lg:grid-cols-[300px_300px_1fr] lg:gap-16 lg:py-16 border-b border-(--brand-blue)/10 group hover:bg-(--brand-blue)/[0.02] transition-colors duration-500 group hover:bg-(--brand-blue)/[0.02] transition-colors duration-500 border-b border-(--brand-blue)/10" delay={Math.min(idx * 0.05, 0.2)} duration={0.8} start="top 85%" yOffset={24}>
                <div className="pt-2">
                  <p className="font-heading text-[1.5rem] md:text-[2rem] font-light tracking-tight text-(--brand-blue) transition-colors duration-500 group-hover:text-(--brand-cyan)">{era}</p>
                </div>
                <div className="pt-2 lg:pt-4">
                  <p className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-(--brand-glaucous)">{label}</p>
                </div>
                <div className="pt-2 lg:pt-3 max-w-2xl">
                  <p className="text-[1.15rem] font-light leading-[1.8] text-(--brand-dark)/70">{body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Archive Gallery ── */}
      <section className="border-b border-(--brand-blue)/8 px-6 py-24 md:px-12 md:py-28 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.3fr] lg:gap-20" duration={0.9} start="top 90%" yOffset={24}>
            <div>
              <p className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-(--brand-glaucous)">
                From the Archive
              </p>
              <h2 className="mt-6 max-w-xl font-heading text-[clamp(2rem,3.6vw,3.2rem)] font-light leading-[1.08] tracking-wide text-(--brand-blue)">
                The people, systems, and field realities that shaped the company.
              </h2>
            </div>
            <p className="text-[1.15rem] font-light leading-[1.85] text-(--brand-dark)/70 lg:self-end">
              These source images from the original Aqua Pharma site document the operational context behind the company&apos;s growth: live farm conditions, early treatment systems, pioneering field work, and the global team supporting customers in-market.
            </p>
          </ScrollReveal>

          <ScrollReveal className="grid grid-cols-1 gap-px bg-(--brand-blue)/8 md:grid-cols-2 xl:grid-cols-4" duration={0.82} start="top 90%" yOffset={20} staggerChildren staggerAmount={0.08}>
            {[
              { src: "/images/wp/about/about-history.jpg", alt: "Early aquaculture history", label: "History" },
              { src: "/images/wp/about/about-operations.jpg", alt: "Operational work in the field", label: "Operations" },
              { src: "/images/wp/about/about-pioneering.jpg", alt: "Pioneering treatment development", label: "Pioneering" },
              { src: "/images/wp/about/about-team.jpg", alt: "Aqua Pharma team in Chile", label: "Team" },
            ].map((item) => (
              <figure key={item.label} className="bg-(--brand-paper)">
                <div className="overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={1280}
                    height={1280}
                    className="h-[18rem] w-full object-cover"
                  />
                </div>
                <figcaption className="px-6 py-5 text-[0.72rem] font-medium uppercase tracking-[0.2em] text-(--brand-glaucous)">
                  {item.label}
                </figcaption>
              </figure>
            ))}
          </ScrollReveal>
        </div>
      </section>

      {/* ── Explore links ── */}
      <section className="px-6 py-32 md:py-32 lg:py-48 md:py-28 lg:px-20">
        <ScrollReveal className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:gap-10" duration={0.88} start="top 91%" staggerChildren yOffset={18}>
          <p className="text-[1rem] font-light text-(--brand-dark)/60">
            Learn more about the people and ideas behind Aqua Pharma
          </p>
          <div className="flex flex-wrap shrink-0 gap-4">
            <Link
              href="/about/team"
              className="border border-(--brand-blue)/20 px-7 py-3.5 text-[0.8rem] font-medium uppercase tracking-[0.15em] text-(--brand-blue) transition-colors hover:bg-(--brand-blue) hover:text-white"
            >
              Meet the Team
            </Link>
            <Link
              href="/about/pioneering"
              className="border border-(--brand-blue)/20 px-7 py-3.5 text-[0.8rem] font-medium uppercase tracking-[0.15em] text-(--brand-blue) transition-colors hover:bg-(--brand-blue) hover:text-white"
            >
              Innovation Story
            </Link>
          </div>
        </ScrollReveal>
      </section>

      <ContactSection />
      <Footer />
    </div>
  );
}
