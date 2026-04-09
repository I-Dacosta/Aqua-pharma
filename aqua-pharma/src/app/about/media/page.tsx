import { Navbar } from "@/components/core/Navbar";
import { Footer } from "@/components/core/Footer";
import { ContactSection } from "@/components/core/ContactSection";

export const metadata = {
  title: "In The Press | Aqua Pharma",
  description: "Latest news, press releases, and media coverage about Aqua Pharma",
};

interface PressRelease {
  date: string;
  title: string;
  description: string;
  category: string;
}

const pressReleases: PressRelease[] = [
  {
    date: "December 2022",
    title: "Aqua Pharma Launches SEATRU™ Program for Shrimp Sustainability",
    description: "New program focuses on sustainable treatments for shrimp farming, reducing environmental impact while maintaining production efficiency. SEATRU™ has been adopted by leading farms across Southeast Asia.",
    category: "Product Launch"
  },
  {
    date: "September 2022",
    title: "Chile Operations Expansion Announced",
    description: "Aqua Pharma opens new regional headquarters in Salvador, Chile, positioning the company to better serve South American salmon and aquaculture operations with localized expertise and support.",
    category: "Expansion"
  },
  {
    date: "June 2021",
    title: "Strategic Investment from Pulcea Capital",
    description: "Aqua Pharma secures significant investment to accelerate product development and global expansion. The partnership strengthens our commitment to sustainable aquaculture innovation.",
    category: "Partnership"
  },
  {
    date: "March 2021",
    title: "BREEZE Treatment Trials Show 95% Efficacy",
    description: "Clinical trials for BREEZE non-antimicrobial treatment demonstrate exceptional results in disease control. The data supports broader adoption as industry shifts toward sustainable alternatives.",
    category: "Research"
  },
  {
    date: "November 2020",
    title: "Aqua Pharma Receives ASC Certification Recognition",
    description: "Our commitment to sustainable practices receives recognition from the Aquaculture Stewardship Council (ASC). Certification strengthens position with environmentally-conscious farming partners.",
    category: "Recognition"
  },
  {
    date: "July 2019",
    title: "Joint Venture Established in Norway",
    description: "Aqua Pharma announces strategic joint venture with leading Norwegian aquaculture operator, strengthening presence in North Atlantic salmon farming and bringing innovative solutions to Scandinavian operations.",
    category: "Partnership"
  }
];

export default function MediaPage() {
  return (
    <div className="min-h-screen bg-(--brand-paper)">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative flex h-[500px] w-full items-end justify-center bg-(--brand-blue) md:h-[600px]" style={{ backgroundImage: "linear-gradient(135deg, rgba(21,31,109,1) 0%, rgba(78,96,173,0.9) 58%, rgba(85,109,90,0.42) 100%)" }}>
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 50%)',
        }}></div>
        
        <div className="relative z-10 text-center pb-16 px-4 max-w-4xl mx-auto">
          <p className="mb-4 text-sm font-semibold tracking-wider text-[var(--brand-tangerine)] md:text-base">IN THE PRESS</p>
          <h1 className="font-heading text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            News & Stories
          </h1>
          <p className="mx-auto max-w-3xl text-lg text-white/78 md:text-xl">
            Latest updates from Aqua Pharma about our innovations, partnerships, and impact on global aquaculture
          </p>
        </div>
      </section>

      {/* Press Release Content */}
      <section className="w-full bg-(--brand-paper) px-4 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          {/* Category Badges */}
          <div className="flex flex-wrap gap-3 mb-12 md:mb-16 justify-center">
            <span className="rounded-full bg-(--brand-tangerine) px-4 py-2 text-sm font-semibold text-(--brand-dark)">All News</span>
            <span className="cursor-pointer rounded-full bg-(--brand-blue-soft) px-4 py-2 text-sm font-semibold text-[rgba(51,51,51,0.72)] transition-colors hover:bg-(--brand-blue-soft)/75">Product Launch</span>
            <span className="cursor-pointer rounded-full bg-(--brand-blue-soft) px-4 py-2 text-sm font-semibold text-[rgba(51,51,51,0.72)] transition-colors hover:bg-(--brand-blue-soft)/75">Research</span>
            <span className="cursor-pointer rounded-full bg-(--brand-blue-soft) px-4 py-2 text-sm font-semibold text-[rgba(51,51,51,0.72)] transition-colors hover:bg-(--brand-blue-soft)/75">Partnership</span>
          </div>

          {/* Press Releases List */}
          <div className="space-y-8 md:space-y-12">
            {pressReleases.map((release, idx) => (
              <article key={idx} className="group">
                <div className="flex flex-col border-b-2 border-(--brand-border) pb-8 transition-colors hover:border-(--brand-glaucous) md:flex-row md:items-start md:gap-8 md:pb-12">
                  {/* Date Column */}
                  <div className="flex-shrink-0 mb-4 md:mb-0 md:w-32">
                    <p className="font-heading text-lg font-bold text-(--brand-glaucous)">
                      {release.date}
                    </p>
                  </div>

                  {/* Content Column */}
                  <div className="flex-grow">
                    <div className="mb-3">
                      <span className="mb-3 inline-block rounded-full bg-(--brand-tangerine-soft) px-3 py-1 text-xs font-bold text-(--brand-dark)">
                        {release.category}
                      </span>
                    </div>

                    <h3 className="mb-4 font-heading text-2xl font-bold text-(--brand-blue) transition-colors group-hover:text-(--brand-glaucous) md:text-3xl">
                      {release.title}
                    </h3>

                    <p className="mb-6 text-lg leading-relaxed text-[rgba(51,51,51,0.72)]">
                      {release.description}
                    </p>

                    <a href="#" className="inline-flex items-center font-semibold text-(--brand-tangerine) transition-colors hover:text-[#ef9a4e]">
                      Read Full Story
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="my-16 h-px bg-linear-to-r from-transparent via-(--brand-glaucous)/30 to-transparent md:my-24"></div>

          {/* Media Kit Section */}
          <div className="rounded-xl bg-(--brand-blue-soft) p-8 md:p-12">
            <h2 className="mb-6 font-heading text-3xl font-bold text-(--brand-blue) md:text-4xl">
              Media Kit & Resources
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-[rgba(51,51,51,0.72)]">
              For journalists, bloggers, and media outlets covering aquaculture innovation, we offer comprehensive media resources including company backgrounders, executive bios, product images, and historical information.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <a href="#" className="rounded-lg bg-white p-6 transition-shadow hover:shadow-[0_18px_40px_rgba(21,31,109,0.1)]">
                <div className="text-3xl mb-3">📄</div>
                <h3 className="mb-2 font-heading text-lg font-bold text-(--brand-blue)">Company Backgrounder</h3>
                <p className="text-sm text-[rgba(51,51,51,0.6)]">Download PDF</p>
              </a>
              <a href="#" className="rounded-lg bg-white p-6 transition-shadow hover:shadow-[0_18px_40px_rgba(21,31,109,0.1)]">
                <div className="text-3xl mb-3">🎨</div>
                <h3 className="mb-2 font-heading text-lg font-bold text-(--brand-blue)">Logos & Branding</h3>
                <p className="text-sm text-[rgba(51,51,51,0.6)]">Download ZIP</p>
              </a>
              <a href="#" className="rounded-lg bg-white p-6 transition-shadow hover:shadow-[0_18px_40px_rgba(21,31,109,0.1)]">
                <div className="text-3xl mb-3">🖼</div>
                <h3 className="mb-2 font-heading text-lg font-bold text-(--brand-blue)">Product Images</h3>
                <p className="text-sm text-[rgba(51,51,51,0.6)]">Download Gallery</p>
              </a>
            </div>
          </div>

          <div className="my-16 h-px bg-linear-to-r from-transparent via-(--brand-glaucous)/30 to-transparent md:my-24"></div>

          {/* Press Contact */}
          <div className="text-center">
            <h2 className="mb-6 font-heading text-3xl font-bold text-(--brand-blue) md:text-4xl">
              Press Inquiries
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-[rgba(51,51,51,0.72)]">
              For media requests, interview inquiries, or press release distribution, please contact our communications team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:press@aqua-pharma.com" className="rounded-lg bg-(--brand-tangerine) px-8 py-3 font-semibold text-(--brand-dark) transition-colors hover:bg-[#ef9a4e]">
                press@aqua-pharma.com
              </a>
              <a href="tel:+1-555-0123" className="rounded-lg border-2 border-(--brand-glaucous) px-8 py-3 font-semibold text-(--brand-glaucous) transition-colors hover:bg-(--brand-glaucous) hover:text-white">
                +1 (555) 0123
              </a>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </div>
  );
}
