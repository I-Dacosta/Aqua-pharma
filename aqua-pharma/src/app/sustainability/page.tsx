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
    <main className="min-h-[90vh] bg-(--brand-paper) text-(--brand-dark) selection:bg-(--brand-blue) selection:text-white">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative flex min-h-[90vh] w-full flex-col justify-end overflow-hidden bg-(--brand-blue)">
        <div className="absolute inset-0">
          <Image
            src="/images/wp/sustainability/hero.jpg"
            alt="Aqua Pharma sustainability operations at sea"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-45 motion-safe:animate-[zoomOut_16s_ease-out_forwards]"
          />
          {/* Deep atmospheric gradient */}
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(38,45,98,0.98)_0%,rgba(38,45,98,0.3)_60%,rgba(38,45,98,0)_100%)]" />
        </div>

        <ScrollReveal className="relative z-10 px-6 pb-20 pt-40 md:px-12 lg:px-20 lg:pb-32" duration={1.2} yOffset={40}>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="mb-6 text-[0.65rem] font-medium uppercase tracking-[0.35em] text-white/60">
                Sustainability
              </p>
              <h1 className="font-heading text-[clamp(3.5rem,8vw,8rem)] font-light leading-[0.9] tracking-tight text-white mb-6">
                Passion for<br/>Pure.
              </h1>
            </div>
            <div className="lg:max-w-md pb-4">
              <p className="text-[1.15rem] font-light leading-[1.8] text-white/70">
                Responsible farming — how we contribute to a cleaner, safer, and highly sustainable ocean lifecycle.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ── Content Sections ── */}
      <section className="px-6 py-32 md:px-12 lg:px-20 lg:py-48 bg-(--brand-paper)">
        <div className="mx-auto max-w-[90rem]">

          {/* 01 Health & Safety - Asymmetrical Overlap */}
          <div className="relative mb-32 md:mb-48 lg:mb-64">
            <ScrollReveal className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-0" duration={0.9} start="top 85%" yOffset={30}>
              {/* Text Block overlapping the image z-20 */}
              <div className="relative z-20 lg:-mr-24 lg:translate-y-16">
                <div className="border border-(--brand-blue)/10 bg-(--brand-paper) p-10 md:p-16 lg:p-20 shadow-[20px_20px_0px_rgba(38,45,98,0.03)] lg:pl-0 lg:border-l-0">
                  <div className="mb-12 flex flex-col items-start gap-4">
                    <span className="font-heading text-[1.4rem] font-light tabular-nums text-(--brand-blue)/30">01</span>
                    <p className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-(--brand-glaucous)">
                      Health &amp; Safety
                    </p>
                  </div>
                  <h2 className="font-heading text-[clamp(2.5rem,4.5vw,4.5rem)] font-light leading-[1.05] tracking-tight text-(--brand-blue)">
                    Health &amp; Safety
                  </h2>
                  <p className="mt-8 text-[1.15rem] font-light leading-[1.85] text-(--brand-dark)/75">
                    High safety standards and continuous improvement are an integral part of the Aqua Pharma Group work ethic and commitment. Each employee is expected to contribute to the safety of the workplace by being alert and aware of the rules, policies, and procedures, and by reporting any unsafe conditions. We are also committed to safeguarding people along the supply chain.
                  </p>
                </div>
              </div>
              
              {/* Image Block z-10 */}
              <div className="relative z-10 w-full overflow-hidden bg-(--brand-blue)/5 aspect-square md:aspect-[4/3] lg:aspect-[4/5]">
                <Image
                  src="/images/wp/sustainability/health-safety.jpg"
                  alt="Health and safety work in aquaculture operations"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover transition-transform duration-[2s] hover:scale-105"
                />
              </div>
            </ScrollReveal>
          </div>

          {/* 02 Environment - Floating Block Over Full Image */}
          <div className="relative mb-32 md:mb-48 lg:mb-64">
            <ScrollReveal duration={1.1} start="top 85%" yOffset={40}>
              <div className="relative w-full overflow-hidden min-h-[60vh] md:min-h-[80vh] lg:min-h-[90vh]">
                <Image
                  src="/images/wp/sustainability/environment.jpg"
                  alt="Environmental stewardship in aquaculture"
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
                
                {/* Floating card positioned at bottom right */}
                <div className="absolute bottom-0 right-0 w-full md:w-3/4 lg:w-1/2 xl:w-[45%] bg-(--brand-blue) p-10 md:p-16 lg:p-24 text-white shadow-[-20px_0_40px_rgba(0,0,0,0.15)]">
                  <div className="mb-12 flex flex-col items-start gap-4">
                    <span className="font-heading text-[1.4rem] font-light tabular-nums text-white/30">02</span>
                    <p className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-white/50">
                      Environment
                    </p>
                  </div>
                  <h2 className="font-heading text-[clamp(2.5rem,4.5vw,4.5rem)] font-light leading-[1.05] tracking-tight text-white mb-8">
                    Safeguarding the ecosystem.
                  </h2>
                  <p className="text-[1.15rem] font-light leading-[1.85] text-white/80">
                    The Aquaculture industry is dedicated to minimising its impact on the environment. Aqua Pharma Group is committed to support the industry in this continuous process by delivering concepts and services that guarantee the wellbeing of the environment and the people who work in the industry.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* 03 UN SDGs - Text Left, Image Right Stack */}
          <div className="relative mb-32 md:mb-48 lg:mb-64 border-t border-(--brand-blue)/10 pt-24 lg:pt-32">
            <ScrollReveal className="grid grid-cols-1 gap-16 lg:grid-cols-[1.2fr_1fr] lg:gap-24 items-center" duration={0.9} start="top 85%" yOffset={30}>
              <div className="lg:pr-12">
                <div className="mb-12 flex items-baseline gap-4">
                  <span className="font-heading text-[1.4rem] font-light tabular-nums text-(--brand-blue)/30">03</span>
                  <p className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-(--brand-glaucous)">
                    Global Commitments
                  </p>
                </div>
                <h2 className="font-heading text-[clamp(2.5rem,4.5vw,4.5rem)] font-light leading-[1.05] tracking-tight text-(--brand-blue)">
                  We Support the UN Sustainable Development Goals
                </h2>
                <p className="mt-10 text-[1.15rem] font-light leading-[1.85] text-(--brand-dark)/70 hover:text-(--brand-dark) transition-colors">
                  At Aqua Pharma Group, we believe that the respect of human lives stands above everything else. We support the UN Sustainable Development Goals where we can have a material impact. Our ambition is simple: to support farmers in lowering environmental impact and increase fish welfare, while bringing factual proof.
                </p>
              </div>
              <div className="relative flex items-center justify-center bg-(--brand-paper-warm) p-10 md:p-20 overflow-hidden border border-(--brand-blue)/5 aspect-square">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(38,45,98,0.03)_0%,transparent_100%)]" />
                <Image
                  src="/images/wp/sustainability/un-sdgs.png"
                  alt="UN Sustainable Development Goals supported by Aqua Pharma"
                  width={768}
                  height={401}
                  className="relative z-10 w-full max-w-md h-auto mix-blend-darken hover:scale-105 transition-transform duration-700"
                />
              </div>
            </ScrollReveal>
          </div>

          {/* 04 Recognition - Dense Grid Architecture */}
          <div className="relative pt-24 lg:pt-32 border-t border-(--brand-blue)/10">
            <ScrollReveal className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8" duration={0.9} start="top 85%" yOffset={24}>
              <div>
                <div className="mb-10 flex items-baseline gap-4">
                  <span className="font-heading text-[1.4rem] font-light tabular-nums text-(--brand-blue)/30">04</span>
                  <p className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-(--brand-glaucous)">
                    Industry Marks
                  </p>
                </div>
                <h2 className="font-heading text-[clamp(2.5rem,4.5vw,4.5rem)] font-light leading-[1.05] tracking-tight text-(--brand-blue)">
                  Recognition
                </h2>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-px bg-(--brand-blue)/10 border border-(--brand-blue)/10">
              
              {/* Left Column Text Cards */}
              <div className="flex flex-col gap-px bg-(--brand-blue)/10">
                <ScrollReveal className="bg-(--brand-paper) p-10 lg:p-16 group hover:bg-(--brand-blue)/[0.02] transition-colors duration-500 h-full flex flex-col justify-center" delay={0.1}>
                  <p className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-(--brand-glaucous)">
                    Aquaculture Stewardship Council
                  </p>
                  <h3 className="mt-6 mb-6 font-heading text-[2rem] lg:text-[2.5rem] font-light leading-[1.1] text-(--brand-blue)">
                    ASC Supporter
                  </h3>
                  <p className="text-[1.15rem] font-light leading-[1.8] text-(--brand-dark)/70">
                    We proudly support the ASC, certifying farms that care for the environment. Our products help prevent and control disease, directly contributing to more sustainable aquaculture worldwide.
                  </p>
                </ScrollReveal>
                
                <ScrollReveal className="bg-(--brand-paper) p-10 lg:p-16 group hover:bg-(--brand-blue)/[0.02] transition-colors duration-500 h-full flex flex-col justify-center" delay={0.2}>
                  <p className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-(--brand-glaucous)">
                    Solar Impulse Foundation
                  </p>
                  <h3 className="mt-6 mb-6 font-heading text-[2rem] lg:text-[2.5rem] font-light leading-[1.1] text-(--brand-blue)">
                    Efficient Solution Label
                  </h3>
                  <p className="text-[1.15rem] font-light leading-[1.8] text-(--brand-dark)/70">
                    The Paramove® concept holds the Efficient Solution label (2019), recognizing the technological feasibility, environmental benefits, and economic profitability of our sea lice treatment.
                  </p>
                  <a
                    href="https://youtu.be/Zpsnd83reGU"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-10 inline-flex items-center text-[0.65rem] font-medium uppercase tracking-[0.35em] text-(--brand-blue) hover:text-(--brand-glaucous) transition-colors"
                  >
                    See Video <span className="ml-3 text-lg leading-none">→</span>
                  </a>
                </ScrollReveal>
              </div>

              {/* Right Column Mixed Media */}
              <div className="flex flex-col gap-px bg-(--brand-blue)/10">
                <ScrollReveal className="relative bg-(--brand-paper) h-80 md:h-[400px] lg:h-auto lg:flex-1" delay={0.3}>
                  <Image
                    src="/images/wp/sustainability/recognition.jpg"
                    alt="Recognition imagery from Aqua Pharma sustainability work"
                    fill
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="object-cover"
                  />
                </ScrollReveal>
                <ScrollReveal className="relative flex items-center justify-center bg-(--brand-paper-warm) p-16 lg:py-24" delay={0.4}>
                  <div className="absolute inset-0 opacity-30 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(38,45,98,0.02)_10px,rgba(38,45,98,0.02)_20px)]" />
                  <Image
                    src="/images/wp/sustainability/solar-impulse.png"
                    alt="Solar Impulse Efficient Solution label"
                    width={400}
                    height={400}
                    className="relative z-10 h-auto w-full max-w-[16rem] object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.08)] mix-blend-multiply"
                  />
                </ScrollReveal>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ── Forward CTA ── */}
      <section className="bg-(--brand-blue) px-6 py-32 md:px-12 lg:px-20 lg:py-48">
        <ScrollReveal className="mx-auto grid max-w-[90rem] grid-cols-1 gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24" duration={0.92} start="top 85%" yOffset={24}>
          <div>
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-white/50">
              Our Commitment
            </p>
            <h2 className="mt-8 font-heading text-[clamp(3.5rem,8vw,8rem)] font-light leading-[0.9] tracking-tight text-white">
              Wellbeing<br/>below water,<br/>every day.
            </h2>
          </div>
          <div className="flex flex-col justify-end gap-12 lg:pb-4">
            <p className="text-[1.15rem] font-light leading-[1.85] text-white/72 max-w-xl">
              Sustainability is not a destination — it&apos;s a practice. Aqua Pharma continues to invest in solutions that protect ecosystems, improve fish welfare, and safeguard the industry&apos;s long-term future.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <a
                href="/about/pioneering"
                className="bg-white/5 border border-white/20 px-8 py-4 text-[0.65rem] font-medium uppercase tracking-[0.35em] text-white transition-all hover:bg-white hover:text-(--brand-blue) shadow-[8px_8px_0px_rgba(255,255,255,0.05)] hover:translate-y-[-2px] hover:shadow-[12px_12px_0px_rgba(255,255,255,0.1)]"
              >
                Our Innovation Story
              </a>
              <a
                href="/about"
                className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-white/55 transition-colors hover:text-white group flex items-center"
              >
                About Us
                <span className="ml-3 text-lg leading-none transform transition-transform group-hover:translate-x-2">→</span>
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
