import { Navbar } from "@/components/core/Navbar";
import { Footer } from "@/components/core/Footer";
import { ContactSection } from "@/components/core/ContactSection";

export const metadata = {
  title: "Sustainability | Aqua Pharma",
  description: "Our commitment to responsible farming and environmental protection",
};

export default function SustainabilityPage() {
  return (
    <main className="min-h-screen bg-(--brand-paper) text-(--brand-dark)">
      <Navbar />

      <section className="relative min-h-screen overflow-hidden bg-(--brand-blue) pt-32 text-white">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(21,31,109,0.98)_0%,rgba(78,96,173,0.82)_60%,rgba(85,109,90,0.42)_100%)]" />
        <div className="mx-auto max-w-400 px-8 py-20 md:px-12 lg:px-16">
          <div className="relative z-10 max-w-4xl">
            <h1 className="text-[clamp(3rem,7vw,7rem)] font-heading leading-[0.9] tracking-[-0.05em] text-white">
              Passion for Pure
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/78 md:text-xl">
              Responsible farming … how we contribute
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-(--brand-border) bg-(--brand-paper) px-8 py-18 md:px-12 lg:px-16 lg:py-24">
        <div className="mx-auto w-full max-w-400">
          <div className="space-y-20">
            <div>
              <h2 className="text-[clamp(2rem,4.4vw,4.8rem)] font-heading leading-[0.94] tracking-[-0.05em] text-(--brand-blue)">
                Health & Safety
              </h2>
              <p className="mt-8 max-w-3xl text-lg leading-relaxed text-[rgba(51,51,51,0.72)] md:text-[1.18rem]">
                High safety standards and continuous improvement are an integral part of the Aqua Pharma Group work ethic and commitment. Each employee is expected to contribute to the safety of the workplace by being alert and aware of the rules, policies, and procedures, and by reporting any unsafe conditions. We are also committed to safeguarding people along the supply chain, by continuously improving our health and safety performance; processes and designs; and stewardship.
              </p>
            </div>

            <div>
              <h2 className="text-[clamp(2rem,4.4vw,4.8rem)] font-heading leading-[0.94] tracking-[-0.05em] text-(--brand-blue)">
                Environment
              </h2>
              <p className="mt-8 max-w-3xl text-lg leading-relaxed text-[rgba(51,51,51,0.72)] md:text-[1.18rem]">
                The Aquaculture industry is dedicated to minimising its impact on the environment. Aqua Pharma Group is committed to support the industry in this continuous process by delivering concepts and services that guarantee the wellbeing of the environment and the people who work in the industry. We achieve this through ongoing focus on research and innovation.
              </p>
            </div>

            <div>
              <h2 className="text-[clamp(2rem,4.4vw,4.8rem)] font-heading leading-[0.94] tracking-[-0.05em] text-(--brand-blue)">
                UN Sustainable Development Goals
              </h2>
              <p className="mt-8 max-w-3xl text-lg leading-relaxed text-[rgba(51,51,51,0.72)] md:text-[1.18rem]">
                At Aqua Pharma Group, we believe that the respect of human lives stands above everything else. We support the UN Sustainable Development Goals where we can have a material impact. Our ambition is simple: to support farmers in lowering environmental impact and increase fish welfare, while bringing factual proof. Only by doing so, will we be able to reassure consumers that the fish and shrimp we eat is sustainably farmed according to the highest welfare standards.
              </p>
            </div>

            <div>
              <h2 className="text-[clamp(2rem,4.4vw,4.8rem)] font-heading leading-[0.94] tracking-[-0.05em] text-(--brand-blue)">
                Recognition
              </h2>
              <div className="mt-8 space-y-12">
                <div>
                  <h3 className="text-[1.55rem] font-heading leading-[1.15] tracking-[-0.04em] text-(--brand-glaucous) md:text-[1.9rem]">
                    Aquaculture Stewardship Council (ASC)
                  </h3>
                  <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[rgba(51,51,51,0.72)] md:text-[1.18rem]">
                    We are a proud supporter of the Aquaculture Stewardship Council (ASC), a non-profit organization founded by the World Wildlife Fund (WWF) and the Sustainable Trade Initiative (IDH). The ASC certifies farms that care for the environment and aims to stimulate retailers, food service companies and consumers to buy ASC labelled seafood products. In this context, the use of our products for the prevention and control of disease can contribute to sustainable aquaculture.
                  </p>
                </div>

                <div>
                  <h3 className="text-[1.55rem] font-heading leading-[1.15] tracking-[-0.04em] text-(--brand-green) md:text-[1.9rem]">
                    Efficient Solutions Label
                  </h3>
                  <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[rgba(51,51,51,0.72)] md:text-[1.18rem]">
                    The Paramove® concept holds the Efficient Solution label. This award, granted in 2019 by the Solar Impulse Foundation, recognizes the technological feasibility, environmental and socio-economic benefits, and economic profitability of our sea lice removal treatment concept.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </main>
  );
}
