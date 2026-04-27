import Image from "next/image";
import { Navbar } from "@/components/core/Navbar";
import { Footer } from "@/components/core/Footer";
import { ContactSection } from "@/components/core/ContactSection";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export const metadata = {
  title: "In The Press | Aqua Pharma",
  description: "Latest news, press releases, and media coverage about Aqua Pharma",
};

interface PressRelease {
  date: string;
  title: string;
  description: string;
  category: string;
  href?: string;
  image: string;
}

const pressReleases: PressRelease[] = [
  {
    date: "October 2022",
    title: "Trials of Pioneering New Anti-Sea Lice Treatment Concept Carried Out in Shetland",
    description: "A new anti-sea lice treatment concept under development to help make aquaculture more sustainable has successfully completed environmental safety trials of the state-of-the-art equipment in Scotland. The BREEZE consortium carried out the week-long trials at a salmon farm in Shetland, owned and operated by Scottish Sea Farms.",
    category: "Research",
    href: "https://aqua-pharma.com/wp-content/uploads/2021/02/BREEZE-Press-Release-27OCT2022-v2-1.pdf",
    image: "/images/wp/media/breeze-trials.jpg",
  },
  {
    date: "June 2022",
    title: "SEATRU™ Kicks Off With 2-Year Research Program",
    description: "Aqua Pharma are joining forces with microbial fingerprinting experts KYTOS to develop SEATRU™ — a unique new service platform offering shrimp farmers worldwide effective microbial control through precise dosing recommendations. The initiative kicks off in July 2022 with a two-year research project in Indonesia with local partner eFishery.",
    category: "Product Launch",
    href: "https://aqua-pharma.com/wp-content/uploads/2021/02/SEATRU%E2%84%A2-Press-Release-JUNE2022.pdf",
    image: "/images/wp/media/seatru.jpg",
  },
  {
    date: "May 2022",
    title: "Aqua Pharma Expands: Opens New Office in Chile and New Subsidiary for Salmon Farming",
    description: "The Norwegian supplier of hydrogen peroxide completes a major expansion in Chile, opening new offices in Puerto Montt. From this year, Aqua Pharma will also offer food safety services to the national industry through its aquaculture subsidiary, Aquatiq.",
    category: "Expansion",
    href: "https://www.salmonexpert.cl/article/aqua-pharma-en-expansion-abre-oficinas-en-chile-y-nueva-filial-para-salmonicultura/",
    image: "/images/wp/media/chile-expansion.jpg",
  },
  {
    date: "June 2021",
    title: "BREEZE Concept Wins European Sustainable Aquaculture Competition",
    description: "The BREEZE initiative developed by a consortium made up of Aqua Pharma Group, Pulcea, and the Norwegian University of Science & Technology was selected by EIT Food for inclusion in its 2021 Business Plan for Sustainable Aquaculture. BREEZE combines hydrogen peroxide treatment with acoustic technology pioneered by Pulcea to improve the efficiency of sea lice removal.",
    category: "Recognition",
    href: "https://aqua-pharma.com/about/pioneering/",
    image: "/images/wp/media/breeze-award.jpg",
  },
  {
    date: "May 2020",
    title: "Aqua Pharma Invests in Start-Up Technology Company Pulcea",
    description: "The development of an innovative new treatment method to control lice in farmed salmon has moved a step closer with the merging of interests between two experts. Pulcea, developing the use of sound energy to improve efficiency of existing sea lice treatments, has received investments from Aqua Pharma to accelerate delivery from testing through to commercialisation.",
    category: "Partnership",
    href: "https://aqua-pharma.com/aqua-pharma-takes-50-stake-in-lice-pioneer-pulcea/",
    image: "/images/wp/media/pulcea.png",
  },
  {
    date: "September 2019",
    title: "Stronger Together — A New Governance Structure for Aqua Pharma Group",
    description: "Paramove producer Solvay and Norwegian Food Hygiene expert Aquatiq have concluded a joint-venture agreement regarding Aqua Pharma Group, reinforcing their long-term collaboration to serve aquaculture customers. With this strong shareholder alliance, Aqua Pharma will put an even stronger focus on R&D and new treatment development for a diverse range of aquaculture segments.",
    category: "Partnership",
    href: "https://aqua-pharma.com/solvay-kjoper-seg-inn-i-aqua-pharma-group/",
    image: "/images/wp/media/stronger-together.jpg",
  },
];

export default function MediaPage() {
  return (
    <div className="min-h-[90vh] bg-(--brand-paper)">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative flex min-h-[60vh] w-full flex-col justify-end overflow-hidden bg-(--brand-blue)">
        <div className="absolute inset-0">
          <Image
            src="/images/wp/media/breeze-trials.jpg"
            alt="Aqua Pharma media and press coverage"
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
            In the Press
          </p>
          <h1 className="font-heading text-[clamp(3.5rem,8vw,8rem)] font-light leading-[0.9] tracking-tight text-white mb-6">
            News &amp; Stories
          </h1>
          <p className="mt-8 max-w-xl text-[1.15rem] font-light leading-[1.8] text-white/70">
            Updates from Aqua Pharma on innovations, partnerships, and our impact on global aquaculture.
          </p>
        </ScrollReveal>
      </section>

      {/* ── Press Releases ── */}
      <section className="px-6 py-24 md:px-12 md:py-32 lg:px-20">
        <div className="mx-auto max-w-7xl">
          <ScrollReveal className="mb-16" duration={0.82} start="top 91%" yOffset={18}>
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-(--brand-glaucous)">
              Press Releases
            </p>
          </ScrollReveal>

          <div className="space-y-0 border-t border-(--brand-blue)/10">
            {pressReleases.map((release, idx) => (
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
                <div className="overflow-hidden border border-(--brand-blue)/10 bg-(--brand-paper-warm)">
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
                    Read →
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
                Media Kit
              </p>
              <h2 className="mt-6 font-heading text-[clamp(2.5rem,4.5vw,4.5rem)] font-light leading-[1.05] tracking-tight text-(--brand-blue)">
                Resources for journalists &amp; media.
              </h2>
            </div>
            <p className="flex items-center text-[1.15rem] font-light leading-[1.85] text-(--brand-dark)/70">
              For journalists, bloggers, and outlets covering aquaculture innovation — company backgrounders, executive bios, product images, and historical information available on request.
            </p>
          </ScrollReveal>

          <ScrollReveal className="grid grid-cols-1 gap-px bg-(--brand-blue)/8 md:grid-cols-3" duration={0.82} start="top 90%" yOffset={20} staggerChildren staggerAmount={0.08}>
            {[
              {
                label: "Bath Treatments Brochure",
                sub: "Download PDF",
                href: "/downloads/wp/bath/norway-bath-treatments-brochure.pdf",
              },
              {
                label: "Dosing Flyer",
                sub: "Download PDF",
                href: "/downloads/wp/dosing/dosing-flyer.pdf",
              },
              {
                label: "Product Download Library",
                sub: "Browse Resources",
                href: "/products/bath-treatments#product-downloads",
              },
            ].map(({ label, sub, href }) => (
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
      <section className="border-t border-(--brand-blue)/8 px-6 py-32 md:py-32 lg:py-48 md:py-24 lg:px-20">
        <ScrollReveal className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[1fr_1fr] lg:gap-24" duration={0.88} start="top 90%" yOffset={22}>
          <div>
            <p className="text-[0.65rem] font-medium uppercase tracking-[0.35em] text-(--brand-glaucous)">
              Press Inquiries
            </p>
            <h2 className="mt-6 font-heading text-[clamp(1.6rem,2.8vw,2.4rem)] font-light leading-[1.12] text-(--brand-blue)">
              Let&apos;s tell the story together.
            </h2>
            <p className="mt-6 text-[1.15rem] font-light leading-[1.85] text-(--brand-dark)/70">
              For interview requests, press release distribution, or media partnerships, reach out to our communications team directly.
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
