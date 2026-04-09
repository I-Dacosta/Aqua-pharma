import Link from "next/link";

import { ContactSection } from "@/components/core/ContactSection";
import { Footer } from "@/components/core/Footer";
import { Navbar } from "@/components/core/Navbar";

export const metadata = {
  title: "Pioneering Innovation | Aqua Pharma",
  description: "Our 50-year journey of pioneering innovation in aquaculture",
};

interface InnovationMilestone {
  year: string;
  label: string;
  title: string;
  description: string;
  impact: string;
  tone: "blue" | "glaucous" | "tangerine" | "green";
}

const milestoneStyles: Record<
  InnovationMilestone["tone"],
  {
    cardClassName: string;
    badgeClassName: string;
    accentClassName: string;
  }
> = {
  blue: {
    cardClassName: "border-(--brand-border) bg-(--brand-blue-soft)/70",
    badgeClassName: "bg-(--brand-blue) text-white",
    accentClassName: "text-(--brand-blue)",
  },
  glaucous: {
    cardClassName: "border-[rgba(78,96,173,0.18)] bg-[rgba(227,235,242,0.92)]",
    badgeClassName: "bg-(--brand-glaucous) text-white",
    accentClassName: "text-(--brand-glaucous)",
  },
  tangerine: {
    cardClassName: "border-[rgba(246,175,110,0.28)] bg-(--brand-tangerine-soft)",
    badgeClassName: "bg-(--brand-tangerine) text-(--brand-dark)",
    accentClassName: "text-[#b96d2a]",
  },
  green: {
    cardClassName: "border-[rgba(85,109,90,0.22)] bg-(--brand-green-soft)",
    badgeClassName: "bg-(--brand-green) text-white",
    accentClassName: "text-(--brand-green)",
  },
};

const milestones: InnovationMilestone[] = [
  {
    year: "2009",
    label: "Field Delivery",
    title: "Well Boats",
    description:
      "Pioneered the first mobile treatment vessel for salmon farming, revolutionizing on-site pharmaceutical delivery and reducing transportation stress on farmed fish.",
    impact: "Brought pharmaceutical precision directly to the farm site.",
    tone: "blue",
  },
  {
    year: "2010-2012",
    label: "Signature System",
    title: "Bath Treatment Systems",
    description:
      "Developed our flagship bath treatment technology, enabling efficient whole-net pharmaceutical application. This innovation became the industry standard for disease management.",
    impact:
      "Set the reference point for efficient whole-net treatment operations.",
    tone: "glaucous",
  },
  {
    year: "2013",
    label: "Retention Control",
    title: "Tarpaulin Technology",
    description:
      "Introduced advanced tarpaulin systems that work seamlessly with our bath treatments, improving drug retention and efficacy while protecting the environment.",
    impact:
      "Improved treatment effectiveness while reducing environmental loss.",
    tone: "tangerine",
  },
  {
    year: "2014-2016",
    label: "Precision Automation",
    title: "Automated Dosing Systems",
    description:
      "Created precision dosing units that automate pharmaceutical delivery, reducing human error and ensuring consistent, accurate treatment protocols across farms.",
    impact:
      "Turned complex dosing into repeatable, measurable farm operations.",
    tone: "green",
  },
  {
    year: "2017-2018",
    label: "Methodology Shift",
    title: "Pre-Dose Concept",
    description:
      "Developed the groundbreaking pre-dose methodology, allowing farms to prepare and standardize treatments before application, improving safety and repeatability.",
    impact:
      "Made preparation safer, cleaner, and far more repeatable for operators.",
    tone: "glaucous",
  },
  {
    year: "2019-Present",
    label: "Future Focus",
    title: "Sustainable Solutions",
    description:
      "Shifted focus to non-antimicrobial alternatives and environmental responsibility, developing next-generation treatment products that protect farmed fish while preserving ocean health.",
    impact:
      "Reframed innovation around efficacy, stewardship, and long-term resilience.",
    tone: "green",
  },
];

const achievementCards = [
  {
    title: "Industry leadership",
    description:
      "Aqua Pharma technologies and operational methods are used across aquaculture markets worldwide, shaping how modern treatment programs are delivered.",
    className: "bg-(--brand-blue-soft) border-(--brand-border)",
  },
  {
    title: "Research and development",
    description:
      "Dedicated R&D investment keeps our work grounded in science while pushing practical treatment systems forward.",
    className: "bg-(--brand-tangerine-soft) border-[rgba(246,175,110,0.28)]",
  },
  {
    title: "Environmental commitment",
    description:
      "Our transition toward lower-impact and non-antimicrobial approaches reflects a deliberate commitment to sustainable aquaculture.",
    className: "bg-(--brand-green-soft) border-[rgba(85,109,90,0.22)]",
  },
  {
    title: "Global operational impact",
    description:
      "Thousands of farm operations benefit from systems designed to improve fish welfare, productivity, and consistency at scale.",
    className: "bg-white border-(--brand-border)",
  },
];

export default function PioneeringPage() {
  return (
    <div className="min-h-screen bg-(--brand-paper) text-(--brand-dark)">
      <Navbar />

      <section
        className="relative overflow-hidden bg-(--brand-blue) pt-36 text-white md:pt-44"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(21,31,109,1) 0%, rgba(78,96,173,1) 62%, rgba(227,235,242,0.92) 160%), radial-gradient(circle at 18% 18%, rgba(246,175,110,0.22), transparent 28%), radial-gradient(circle at 82% 74%, rgba(85,109,90,0.22), transparent 24%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)",
            backgroundSize: "72px 72px",
          }}
        />
        <div className="absolute -right-16 top-24 h-56 w-56 rounded-full bg-[rgba(246,175,110,0.28)] blur-3xl md:h-80 md:w-80" />
        <div className="absolute bottom-0 -left-16 h-52 w-52 rounded-full bg-[rgba(85,109,90,0.20)] blur-3xl md:h-72 md:w-72" />

        <div className="relative mx-auto grid w-full max-w-7xl gap-14 px-6 pb-20 md:px-10 md:pb-28 lg:grid-cols-[minmax(0,1.2fr)_22rem] lg:px-16">
          <div className="max-w-4xl">
            <p className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-white/88 backdrop-blur-sm">
              Innovation History
            </p>
            <h1 className="font-heading text-4xl font-bold leading-[0.94] tracking-[-0.05em] text-white md:text-6xl lg:text-7xl">
              Aqua Pharma innovation, told through the systems that changed the water.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/78 md:text-xl">
              From mobile treatment delivery to sustainable solution design, our progress has always been practical, science-led, and shaped by the realities of aquaculture operations.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="#innovation-timeline"
                className="inline-flex items-center justify-center rounded-full bg-(--brand-tangerine) px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-(--brand-dark) transition-transform duration-200 hover:-translate-y-0.5"
              >
                Explore the timeline
              </a>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-full border border-white/24 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-200 hover:bg-white/10"
              >
                Back to About
              </Link>
            </div>
          </div>

          <div className="grid gap-4 self-end">
            <div className="rounded-4xl border border-white/16 bg-white/10 p-6 backdrop-blur-sm">
              <p className="text-[0.72rem] uppercase tracking-[0.24em] text-white/66">
                Time span
              </p>
              <p className="mt-3 font-heading text-4xl font-semibold tracking-[-0.05em]">
                50+ years
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/74">
                Five decades of operational learning, treatment innovation, and aquaculture-specific care.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl bg-(--brand-tangerine) p-5 text-(--brand-dark) shadow-(--brand-shadow)">
                <p className="text-[0.7rem] uppercase tracking-[0.22em] text-black/60">
                  Core focus
                </p>
                <p className="mt-3 text-lg font-semibold leading-tight">
                  Applied treatment systems
                </p>
              </div>
              <div className="rounded-3xl bg-(--brand-green) p-5 text-white shadow-(--brand-shadow)">
                <p className="text-[0.7rem] uppercase tracking-[0.22em] text-white/70">
                  Current lens
                </p>
                <p className="mt-3 text-lg font-semibold leading-tight">
                  Sustainable aquaculture
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-10 md:py-24 lg:px-16">
        <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.65fr)] lg:items-start">
          <div>
            <p className="text-[0.76rem] font-semibold uppercase tracking-[0.28em] text-(--brand-glaucous)">
              Design Principle
            </p>
            <h2 className="mt-4 font-heading text-3xl font-bold tracking-[-0.04em] text-(--brand-blue) md:text-5xl">
              We innovate around real farm conditions, not lab abstractions.
            </h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-[rgba(51,51,51,0.82)]">
              Since our founding, Aqua Pharma has been at the forefront of aquaculture innovation. Each milestone below represents a breakthrough that has shaped the industry and improved farming outcomes worldwide.
            </p>
          </div>
          <div className="rounded-4xl border border-(--brand-border) bg-white p-7 shadow-(--brand-shadow)">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-(--brand-green)">
              Brand palette in use
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3 text-sm font-semibold text-(--brand-dark)">
              <div className="rounded-2xl bg-(--brand-blue) px-4 py-5 text-white">
                Aquatiq Blue
              </div>
              <div className="rounded-2xl bg-(--brand-glaucous) px-4 py-5 text-white">
                Glaucous
              </div>
              <div className="rounded-2xl bg-(--brand-tangerine) px-4 py-5 text-(--brand-dark)">
                Tangerine
              </div>
              <div className="rounded-2xl bg-(--brand-green) px-4 py-5 text-white">
                Green
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-[rgba(51,51,51,0.72)]">
              The page now uses the approved brand system directly, with lighter companion tones for depth, hierarchy, and readability.
            </p>
          </div>
        </div>
      </section>

      <section id="innovation-timeline" className="px-6 pb-18 md:px-10 md:pb-24 lg:px-16">
        <div className="mx-auto max-w-7xl rounded-[2.5rem] border border-(--brand-border) bg-white p-6 shadow-(--brand-shadow) md:p-10 lg:p-14">
          <div className="flex flex-col gap-4 border-b border-(--brand-border) pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-(--brand-glaucous)">
                Innovation timeline
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold tracking-[-0.04em] text-(--brand-blue) md:text-4xl">
                A timeline of systems, methods, and operational breakthroughs.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[rgba(51,51,51,0.72)]">
              Each step reflects a practical response to aquaculture health, dosing precision, environmental care, and safer workflows.
            </p>
          </div>

          <div className="relative mt-10">
            <div className="absolute bottom-0 left-[1.1rem] top-0 hidden w-px bg-linear-to-b from-(--brand-blue) via-(--brand-glaucous) to-(--brand-green) md:block" />

            <div className="space-y-12 md:space-y-16">
              {milestones.map((milestone) => (
                <div key={milestone.year} className="relative">
                  <div className="absolute left-0 top-7 hidden h-9 w-9 rounded-full border-4 border-white bg-(--brand-blue) shadow-[0_10px_30px_rgba(21,31,109,0.16)] md:block" />

                  <div className="md:ml-16 lg:ml-20">
                    <div
                      className={`rounded-4xl border p-6 md:p-8 ${milestoneStyles[milestone.tone].cardClassName}`}
                    >
                      <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                        <div className="max-w-3xl">
                          <div className="flex flex-wrap items-center gap-3">
                            <span
                              className={`inline-flex rounded-full px-3.5 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] ${milestoneStyles[milestone.tone].badgeClassName}`}
                            >
                              {milestone.year}
                            </span>
                            <span
                              className={`text-sm font-semibold uppercase tracking-[0.16em] ${milestoneStyles[milestone.tone].accentClassName}`}
                            >
                              {milestone.label}
                            </span>
                          </div>

                          <h3 className="mt-5 font-heading text-2xl font-bold tracking-[-0.04em] text-(--brand-blue) md:text-3xl">
                            {milestone.title}
                          </h3>
                          <p className="mt-4 text-lg leading-relaxed text-[rgba(51,51,51,0.8)]">
                            {milestone.description}
                          </p>
                        </div>

                        <div className="min-w-0 md:max-w-xs">
                          <div className="rounded-[1.4rem] bg-white/72 p-5 backdrop-blur-sm">
                            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-[rgba(51,51,51,0.56)]">
                              Why it mattered
                            </p>
                            <p className="mt-3 text-sm leading-relaxed text-[rgba(51,51,51,0.78)]">
                              {milestone.impact}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-8 md:px-10 md:py-12 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-(--brand-green)">
                Key achievements
              </p>
              <h2 className="mt-3 font-heading text-3xl font-bold tracking-[-0.04em] text-(--brand-blue) md:text-4xl">
                The outcomes behind the milestones.
              </h2>
            </div>
            <p className="max-w-lg text-sm leading-relaxed text-[rgba(51,51,51,0.72)]">
              Innovation at Aqua Pharma has always meant something concrete: stronger treatment control, safer workflows, better farm outcomes, and a more sustainable operational model.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {achievementCards.map((card) => (
              <div key={card.title} className={`rounded-4xl border p-8 ${card.className}`}>
                <h3 className="font-heading text-2xl font-bold tracking-[-0.03em] text-(--brand-blue)">
                  {card.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-[rgba(51,51,51,0.78)]">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20 pt-10 md:px-10 md:pb-24 lg:px-16">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[2.5rem] bg-(--brand-blue) px-8 py-10 text-white shadow-(--brand-shadow) md:px-12 md:py-14 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
          <div>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.26em] text-white/68">
              Looking forward
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold tracking-[-0.04em] md:text-4xl">
              The next chapter is already moving toward biotechnology, automation, and lower-impact treatment strategies.
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/76">
              Our commitment to innovation doesn&apos;t stop. We&apos;re exploring cutting-edge technologies in biotechnology, automation, and sustainable farming practices to meet the challenges of tomorrow&apos;s aquaculture industry.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link
              href="/about"
              className="inline-flex items-center justify-center rounded-full bg-(--brand-tangerine) px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-(--brand-dark) transition-transform duration-200 hover:-translate-y-0.5"
            >
              Learn more about Aqua Pharma
            </Link>
            <Link
              href="/about/team"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-200 hover:bg-white/10"
            >
              Meet the team
            </Link>
          </div>
        </div>
      </section>

      <div className="border-t border-(--brand-border)">
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
}
