import { Navbar } from "@/components/core/Navbar";
import { Footer } from "@/components/core/Footer";
import { ContactSection } from "@/components/core/ContactSection";

export const metadata = {
  title: "About Us | Aqua Pharma",
  description: "Learn about Aqua Pharma's mission, values, and 50+ years of innovation in aquaculture",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-(--brand-paper)">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative flex h-[500px] w-full items-end justify-center bg-(--brand-blue) md:h-[600px]" style={{ backgroundImage: "linear-gradient(135deg, rgba(21,31,109,1) 0%, rgba(78,96,173,0.92) 62%, rgba(85,109,90,0.36) 100%)" }}>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
        }}></div>
        
        <div className="relative z-10 text-center pb-16 px-4 max-w-4xl mx-auto">
          <p className="mb-4 text-sm font-semibold tracking-wider text-[var(--brand-tangerine)] md:text-base">ABOUT US</p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Leading Aquaculture Care
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-white/78 md:text-xl">
            Over 50 years of innovation, dedication, and pioneering solutions for aquaculture farmers worldwide
          </p>
        </div>
      </section>

      {/* Company Overview Section */}
      <section className="w-full bg-(--brand-paper) px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <div>
              <h2 className="mb-4 font-heading text-3xl font-bold text-(--brand-blue) md:text-4xl">
                Who We Are
              </h2>
              <p className="mb-4 text-lg leading-relaxed text-[rgba(51,51,51,0.8)]">
                Aqua Pharma is a leading veterinary healthcare provider for the global aquaculture industry. With a presence in 8 countries and a dedicated team of 50 experts, we deliver innovative solutions that improve fish and shrimp welfare while supporting sustainable farming practices.
              </p>
              <p className="text-lg leading-relaxed text-[rgba(51,51,51,0.8)]">
                Our mission is to empower aquaculture farmers with science-backed products and services that enhance productivity, health, and environmental responsibility across their operations.
              </p>
            </div>

            <div className="my-12 h-px bg-linear-to-r from-transparent via-(--brand-glaucous)/30 to-transparent"></div>

            {/* Our Values */}
            <div>
              <h2 className="mb-8 font-heading text-3xl font-bold text-(--brand-blue) md:text-4xl">
                Our Values
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--brand-blue-soft)">
                    <span className="text-lg font-bold text-(--brand-blue)">♡</span>
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-(--brand-blue)">We Care</h3>
                  <p className="text-lg leading-relaxed text-[rgba(51,51,51,0.72)]">
                    We deeply care about the health and welfare of farmed fish and shrimp, the sustainability of aquaculture, and the success of the farmers and communities we serve. Our commitment is unwavering.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-(--brand-tangerine)">
                    <span className="text-white font-bold text-lg">★</span>
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-(--brand-blue)">We Dare</h3>
                  <p className="text-lg leading-relaxed text-[rgba(51,51,51,0.72)]">
                    We are not afraid to challenge the status quo and pioneer new approaches. Through bold innovation and calculated risk-taking, we drive meaningful progress in aquaculture health and sustainability.
                  </p>
                </div>
              </div>
            </div>

            <div className="my-12 h-px bg-linear-to-r from-transparent via-(--brand-glaucous)/30 to-transparent"></div>

            {/* History Timeline */}
            <div>
              <h2 className="mb-8 font-heading text-3xl font-bold text-(--brand-blue) md:text-4xl">
                Our History
              </h2>
              
              <div className="space-y-6">
                <div className="flex gap-4 md:gap-6">
                  <div className="flex-shrink-0 pt-1">
                    <div className="h-4 w-4 rounded-full border-2 border-(--brand-blue) bg-(--brand-tangerine)"></div>
                  </div>
                  <div>
                    <h3 className="mb-1 font-heading text-xl font-bold text-(--brand-blue)">1970s - Founding</h3>
                    <p className="text-lg text-[rgba(51,51,51,0.72)]">
                      Aqua Pharma was founded with a vision to bring veterinary expertise to aquaculture, an emerging industry seeking professional healthcare solutions for farmed fish populations.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 md:gap-6">
                  <div className="flex-shrink-0 pt-1">
                    <div className="h-4 w-4 rounded-full border-2 border-(--brand-blue) bg-(--brand-glaucous)"></div>
                  </div>
                  <div>
                    <h3 className="mb-1 font-heading text-xl font-bold text-(--brand-blue)">1980s-1990s - Growth & Expansion</h3>
                    <p className="text-lg text-[rgba(51,51,51,0.72)]">
                      As global aquaculture expanded, so did Aqua Pharma. We established operations across multiple continents, building partnerships with leading farming operations and establishing ourselves as innovation leaders in the sector.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 md:gap-6">
                  <div className="flex-shrink-0 pt-1">
                    <div className="h-4 w-4 rounded-full border-2 border-(--brand-blue) bg-(--brand-green)"></div>
                  </div>
                  <div>
                    <h3 className="mb-1 font-heading text-xl font-bold text-(--brand-blue)">2000s - Product Innovation</h3>
                    <p className="text-lg text-[rgba(51,51,51,0.72)]">
                      The era of accelerated product development. We pioneered breakthrough solutions including bath treatments, dosing systems, and water conditioning technologies that became industry standards.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 md:gap-6">
                  <div className="flex-shrink-0 pt-1">
                    <div className="h-4 w-4 rounded-full border-2 border-(--brand-blue) bg-(--brand-tangerine)"></div>
                  </div>
                  <div>
                    <h3 className="mb-1 font-heading text-xl font-bold text-(--brand-blue)">2010s-Present - Sustainability Focus</h3>
                    <p className="text-lg text-[rgba(51,51,51,0.72)]">
                      Recognizing the critical importance of environmental stewardship, we shifted focus toward sustainable antimicrobial alternatives and lower-impact solutions. Today, we lead the industry in responsibility and innovation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-12 h-px bg-linear-to-r from-transparent via-(--brand-glaucous)/30 to-transparent"></div>

            {/* Global Presence */}
            <div>
              <h2 className="mb-6 font-heading text-3xl font-bold text-(--brand-blue) md:text-4xl">
                Global Presence
              </h2>
              <p className="mb-6 text-lg text-[rgba(51,51,51,0.72)]">
                With operations across 8 countries and a team of veterinary experts, scientists, and aquaculture specialists, Aqua Pharma supports farmers on every continent where aquaculture thrives.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="rounded-lg bg-(--brand-blue-soft) p-4 text-center">
                  <p className="text-3xl font-bold text-(--brand-blue)">8</p>
                  <p className="mt-2 text-sm text-[rgba(51,51,51,0.72)]">Countries</p>
                </div>
                <div className="rounded-lg bg-(--brand-tangerine-soft) p-4 text-center">
                  <p className="text-3xl font-bold text-(--brand-blue)">50+</p>
                  <p className="mt-2 text-sm text-[rgba(51,51,51,0.72)]">Team Members</p>
                </div>
                <div className="rounded-lg bg-(--brand-green-soft) p-4 text-center">
                  <p className="text-3xl font-bold text-(--brand-blue)">50+</p>
                  <p className="mt-2 text-sm text-[rgba(51,51,51,0.72)]">Years</p>
                </div>
                <div className="rounded-lg bg-white p-4 text-center shadow-[0_12px_30px_rgba(21,31,109,0.06)]">
                  <p className="text-3xl font-bold text-(--brand-blue)">100+</p>
                  <p className="mt-2 text-sm text-[rgba(51,51,51,0.72)]">Partner Farms</p>
                </div>
              </div>
            </div>

            <div className="my-12 h-px bg-linear-to-r from-transparent via-(--brand-glaucous)/30 to-transparent"></div>

            {/* Explore More */}
            <div className="text-center py-8">
              <p className="mb-6 text-[rgba(51,51,51,0.72)]">Learn more about the people behind Aqua Pharma</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/about/team" className="rounded-lg bg-(--brand-tangerine) px-6 py-3 font-semibold text-(--brand-dark) transition-colors hover:bg-[#ef9a4e]">
                  Meet The Team
                </a>
                <a href="/about/pioneering" className="rounded-lg border-2 border-(--brand-glaucous) px-6 py-3 font-semibold text-(--brand-glaucous) transition-colors hover:bg-(--brand-glaucous) hover:text-white">
                  Our Innovation Story
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </div>
  );
}
