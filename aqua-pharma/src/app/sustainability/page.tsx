import Image from "next/image";
import { Navbar } from "@/components/core/Navbar";
import { Footer } from "@/components/core/Footer";
import { ContactSection } from "@/components/core/ContactSection";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata = {
  title: "Sustainability | Aqua Pharma",
  description: "Our commitment to responsible farming and environmental protection",
};

export default function SustainabilityPage() {
  return (
    <main className="min-h-screen bg-(--brand-paper) text-(--brand-dark)">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative flex min-h-[80vh] w-full flex-col justify-end overflow-hidden bg-(--brand-blue)">
        <div className="absolute inset-0">
          <Image
            src="/images/wp/sustainability/hero.jpg"
            alt="Aqua Pharma sustainability operations at sea"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45 motion-safe:animate-[zoomOut_12s_ease-out_forwards]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(21,31,109,0.96)_0%,rgba(21,31,109,0.42)_55%,rgba(21,31,109,0.18)_100%)]" />
        </div>

        <ScrollReveal className="relative z-10 px-6 pb-20 pt-40 md:px-12 lg:px-20 lg:pb-28" duration={1.12} yOffset={34}>
          <p className="mb-6 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-white/60">
            Sustainability
          </p>
          <h1 className="font-heading text-[clamp(3rem,7vw,7rem)] font-light leading-[0.94] tracking-wide text-white">
            Passion for Pure
          </h1>
          <p className="mt-8 max-w-xl text-[1.1rem] font-light leading-[1.8] text-white/72">
            Responsible farming — how we contribute
          </p>
        </ScrollReveal>
      </section>

      {/* ── Content Sections ── */}
      <section className="px-6 py-24 md:px-12 md:py-32 lg:px-20">
        <div className="mx-auto max-w-7xl space-y-0 divide-y divide-(--brand-blue)/8">

          {/* 01 Health & Safety */}
          <ScrollReveal className="grid grid-cols-1 gap-10 py-16 md:py-20 lg:grid-cols-[14rem_1fr] lg:gap-24" duration={0.88} start="top 90%" yOffset={22}>
            <div className="flex flex-row items-start gap-4 lg:flex-col lg:gap-2">
              <span className="font-heading text-[0.78rem] font-light tabular-nums text-(--brand-blue)/30">01</span>
              <p className="text-[0.72rem] font-medium uppercase tracking-[0.2em] text-(--brand-glaucous)">
                Health &amp; Safety
              </p>
            </div>
            <div>
              <h2 className="font-heading text-[clamp(2rem,4.4vw,4.8rem)] font-light leading-[0.94] tracking-wide text-(--brand-blue)">
                Health &amp; Safety
              </h2>
              <p className="mt-8 max-w-3xl text-[1.08rem] font-light leading-[1.85] text-(--brand-dark)/70">
                High safety standards and continuous improvement are an integral part of the Aqua Pharma Group work ethic and commitment. Each employee is expected to contribute to the safety of the workplace by being alert and aware of the rules, policies, and procedures, and by reporting any unsafe conditions. We are also committed to safeguarding people along the supply chain, by continuously improving our health and safety performance; processes and designs; and stewardship.
              </p>
              <div className="mt-10 overflow-hidden border border-(--brand-blue)/10 bg-(--brand-paper-warm)">
                <Image
                  src="/images/wp/sustainability/health-safety.jpg"
                  alt="Health and safety work in aquaculture operations"
                  width={1280}
                  height={852}
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* 02 Environment */}
          <ScrollReveal className="grid grid-cols-1 gap-10 py-16 md:py-20 lg:grid-cols-[14rem_1fr] lg:gap-24" duration={0.88} start="top 90%" yOffset={22}>
            <div className="flex flex-row items-start gap-4 lg:flex-col lg:gap-2">
              <span className="font-heading text-[0.78rem] font-light tabular-nums text-(--brand-blue)/30">02</span>
              <p className="text-[0.72rem] font-medium uppercase tracking-[0.2em] text-(--brand-glaucous)">
                Environment
              </p>
            </div>
            <div>
              <h2 className="font-heading text-[clamp(2rem,4.4vw,4.8rem)] font-light leading-[0.94] tracking-wide text-(--brand-blue)">
                Environment
              </h2>
              <p className="mt-8 max-w-3xl text-[1.08rem] font-light leading-[1.85] text-(--brand-dark)/70">
                The Aquaculture industry is dedicated to minimising its impact on the environment. Aqua Pharma Group is committed to support the industry in this continuous process by delivering concepts and services that guarantee the wellbeing of the environment and the people who work in the industry. We achieve this through ongoing focus on research and innovation.
              </p>
              <div className="mt-10 overflow-hidden border border-(--brand-blue)/10 bg-(--brand-paper-warm)">
                <Image
                  src="/images/wp/sustainability/environment.jpg"
                  alt="Environmental stewardship in aquaculture"
                  width={1280}
                  height={850}
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* 03 UN SDGs */}
          <ScrollReveal className="grid grid-cols-1 gap-10 py-16 md:py-20 lg:grid-cols-[14rem_1fr] lg:gap-24" duration={0.9} start="top 90%" yOffset={22}>
            <div className="flex flex-row items-start gap-4 lg:flex-col lg:gap-2">
              <span className="font-heading text-[0.78rem] font-light tabular-nums text-(--brand-blue)/30">03</span>
              <p className="text-[0.72rem] font-medium uppercase tracking-[0.2em] text-(--brand-glaucous)">
                UN SDGs
              </p>
            </div>
            <div>
              <h2 className="font-heading text-[clamp(2rem,4.4vw,4.8rem)] font-light leading-[0.94] tracking-wide text-(--brand-blue)">
                We Support the UN Sustainable Development Goals
              </h2>
              <p className="mt-8 max-w-3xl text-[1.08rem] font-light leading-[1.85] text-(--brand-dark)/70">
                At Aqua Pharma Group, we believe that the respect of human lives stands above everything else. We support the UN Sustainable Development Goals where we can have a material impact. Our ambition is simple: to support farmers in lowering environmental impact and increase fish welfare, while bringing factual proof. Only by doing so, will we be able to reassure consumers that the fish and shrimp we eat is sustainably farmed according to the highest welfare standards.
              </p>
              <div className="mt-10 overflow-hidden border border-(--brand-blue)/10 bg-(--brand-paper)">
                <Image
                  src="/images/wp/sustainability/un-sdgs.png"
                  alt="UN Sustainable Development Goals supported by Aqua Pharma"
                  width={768}
                  height={401}
                  className="h-auto w-full object-cover"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* 04 Recognition */}
          <ScrollReveal className="grid grid-cols-1 gap-10 py-16 md:py-20 lg:grid-cols-[14rem_1fr] lg:gap-24" duration={0.9} start="top 90%" yOffset={22}>
            <div className="flex flex-row items-start gap-4 lg:flex-col lg:gap-2">
              <span className="font-heading text-[0.78rem] font-light tabular-nums text-(--brand-blue)/30">04</span>
              <p className="text-[0.72rem] font-medium uppercase tracking-[0.2em] text-(--brand-glaucous)">
                Recognition
              </p>
            </div>
            <div>
              <h2 className="font-heading text-[clamp(2rem,4.4vw,4.8rem)] font-light leading-[0.94] tracking-wide text-(--brand-blue)">
                Recognition
              </h2>

              <div className="mt-10 space-y-0 divide-y divide-(--brand-blue)/8">
                <div className="pb-10">
                  <p className="text-[0.72rem] font-medium uppercase tracking-[0.2em] text-(--brand-glaucous)">
                    Aquaculture Stewardship Council
                  </p>
                  <h3 className="mt-4 font-heading text-[1.55rem] font-light leading-[1.15] text-(--brand-blue) md:text-[1.9rem]">
                    ASC
                  </h3>
                  <p className="mt-4 max-w-3xl text-[1.08rem] font-light leading-[1.85] text-(--brand-dark)/70">
                    We are a proud supporter of the Aquaculture Stewardship Council (ASC), a non-profit organization founded by the World Wildlife Fund (WWF) and the Sustainable Trade Initiative (IDH). The ASC certifies farms that care for the environment and aims to stimulate retailers, food service companies and consumers to buy ASC labelled seafood products. In this context, the use of our products for the prevention and control of disease can contribute to sustainable aquaculture.
                  </p>
                </div>

                <div className="pt-10">
                  <p className="text-[0.72rem] font-medium uppercase tracking-[0.2em] text-(--brand-glaucous)">
                    Solar Impulse Foundation
                  </p>
                  <h3 className="mt-4 font-heading text-[1.55rem] font-light leading-[1.15] text-(--brand-blue) md:text-[1.9rem]">
                    Efficient Solutions Label
                  </h3>
                  <p className="mt-4 max-w-3xl text-[1.08rem] font-light leading-[1.85] text-(--brand-dark)/70">
                    The Paramove® concept holds the Efficient Solution label. This award, granted in 2019 by the Solar Impulse Foundation, recognizes the technological feasibility, environmental and socio-economic benefits, and economic profitability of our sea lice removal treatment concept.
                  </p>
                  <a
                    href="https://youtu.be/Zpsnd83reGU"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-block text-[0.72rem] font-medium uppercase tracking-[0.2em] text-(--brand-glaucous) hover:text-(--brand-blue)"
                  >
                    See Video →
                  </a>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-px bg-(--brand-blue)/8 md:grid-cols-[1.3fr_0.7fr]">
                <div className="bg-(--brand-paper)">
                  <Image
                    src="/images/wp/sustainability/recognition.jpg"
                    alt="Recognition imagery from Aqua Pharma sustainability work"
                    width={1280}
                    height={959}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex items-center justify-center bg-(--brand-paper-warm) p-10 md:p-14">
                  <Image
                    src="/images/wp/sustainability/solar-impulse.png"
                    alt="Solar Impulse Efficient Solution label"
                    width={500}
                    height={500}
                    className="h-auto w-full max-w-[14rem] object-contain"
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ── Forward CTA ── */}
      <section className="border-t border-(--brand-blue)/8 bg-(--brand-blue) px-6 py-24 md:px-12 md:py-32 lg:px-20">
        <ScrollReveal className="mx-auto grid max-w-7xl grid-cols-1 gap-12 lg:grid-cols-[1fr_1fr] lg:gap-24" duration={0.92} start="top 90%" yOffset={24}>
          <div>
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-white/50">
              Our Commitment
            </p>
            <h2 className="mt-6 font-heading text-[clamp(2rem,4vw,4rem)] font-light leading-[1.05] text-white">
              Wellbeing below water, every day.
            </h2>
          </div>
          <div className="flex flex-col justify-center gap-6">
            <p className="text-[1.05rem] font-light leading-[1.85] text-white/72">
              Sustainability is not a destination — it&apos;s a practice. Aqua Pharma continues to invest in solutions that protect ecosystems, improve fish welfare, and safeguard the industry&apos;s long-term future.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="/about/pioneering"
                className="border border-white/20 px-7 py-3.5 text-[0.8rem] font-medium uppercase tracking-[0.15em] text-white transition-colors hover:bg-white hover:text-(--brand-blue)"
              >
                Our Innovation Story
              </a>
              <a
                href="/about"
                className="text-[0.8rem] font-medium uppercase tracking-[0.15em] text-white/55 transition-colors hover:text-white"
              >
                About Aqua Pharma →
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <ContactSection />
      <Footer />
    </main>
  );
}
