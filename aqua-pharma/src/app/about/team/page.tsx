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
  return getEditorialPagesContent(locale).team.metadata;
}

interface TeamMember {
  name: string;
  role: string;
  phone?: string;
  email?: string;
  image?: string;
}

interface TeamSection {
  title: string;
  fallbackLabel: string;
  fallbackSurfaceClassName: string;
  fallbackAccentClassName: string;
  members: TeamMember[];
}

function getInitials(name: string) {
  const parts = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase());

  return parts.join("");
}

const teamSections: TeamSection[] = [
  {
    title: "Management",
    fallbackLabel: "Mgmt",
    fallbackSurfaceClassName: "bg-(--brand-blue-soft)",
    fallbackAccentClassName: "bg-(--brand-green)/60",
    members: [
      { name: "Elvin Bugge",    role: "CEO",                   phone: "+47 911 01 112",   email: "elvin.bugge@aqua-pharma.com", image: "/images/wp/team/elvin-bugge.png" },
      { name: "Hanne Mertens",  role: "COO",                   phone: "+32 486 03 9069",  email: "hanne.mertens@aqua-pharma.com", image: "/images/wp/team/hanne-mertens.png" },
      { name: "Synnøve Venås", role: "HR Business Partner",   phone: "+47 950 46 704",   email: "synnove.venas@aquatiq.com", image: "/images/wp/team/synnove-venas.png" },
    ],
  },
  {
    title: "Business Unit — South America",
    fallbackLabel: "SA",
    fallbackSurfaceClassName: "bg-(--brand-blue-soft)",
    fallbackAccentClassName: "bg-(--brand-green)/70",
    members: [
      { name: "Cesar Corona",                   role: "General Manager, South America",             phone: "+56 982 986 118",  email: "cesar.corona@aqua-pharma.com", image: "/images/wp/team/cesar-corona.png" },
      { name: "Luis Robles",                    role: "General Manager, Ecuador",                                              email: "luis.robles@aqua-pharma.com", image: "/images/wp/team/luis-robles.png" },
      { name: "María de los Angeles Brahm",     role: "Manager Técnico Veterinario",                phone: "+56 938 622 802",  email: "angeles.brahm@aqua-pharma.com", image: "/images/wp/team/maria-brahm.png" },
      { name: "Ivan Contreras",                 role: "Treatment Expert",                           phone: "+56 982 792 889",  email: "ivan.contreras@aqua-pharma.com", image: "/images/wp/team/ivan-contreras.png" },
      { name: "Rodrigo Seitz",                  role: "Logistics Manager",                          phone: "+56 934 681 931",  email: "rodrigo.seitz@aqua-pharma.com", image: "/images/wp/team/rodrigo-seitz.png" },
      { name: "Bruno Paredes",                  role: "Service Technician",                         phone: "+56 9 3197 9117",  email: "bruno.paredes@aqua-pharma.com", image: "/images/wp/team/bruno-paredes.png" },
      { name: "Guido Véliz",                   role: "Manager Técnico Veterinario & Project Manager", phone: "+56 9 3243 8371", email: "guido.veliz@aqua-pharma.com" },
      { name: "Juan Carlos Silva Hinojosa",     role: "Safety Coordination", image: "/images/wp/team/juan-carlos-silva.png" },
    ],
  },
  {
    title: "Business Unit — North Atlantic",
    fallbackLabel: "NA",
    fallbackSurfaceClassName: "bg-(--brand-blue-soft)",
    fallbackAccentClassName: "bg-(--brand-glaucous)/70",
    members: [
      { name: "Hanne Mertens",      role: "COO",                                               phone: "+32 486 03 9069",  email: "hanne.mertens@aqua-pharma.com", image: "/images/wp/team/hanne-mertens.png" },
      { name: "Rachel Brown",       role: "Business Development Manager",                      phone: "+44 7961 030 229", email: "rachel.brown@aqua-pharma.com", image: "/images/wp/team/rachel-brown.png" },
      { name: "Julie Bugge",        role: "Marine Biology Project Manager & Quality Coordinator", phone: "+47 951 62 390", email: "julie.bugge@aqua-pharma.com", image: "/images/wp/team/julie-bugge.png" },
      { name: "Carole Hedges",      role: "Business Coordination, Quality & Logistics Manager", phone: "+44 784 381 7253", email: "carole.hedges@aqua-pharma.com", image: "/images/wp/team/carole-hedges.png" },
      { name: "Álvaro Véjar Zúñiga", role: "Business Coordination, Logistics & Customer Service Manager", phone: "+44 746 857 7063", email: "alvaro.vejar@aquatiq.com", image: "/images/wp/team/alvaro-vejar-zuniga.png" },
      { name: "Peter Coull",        role: "Treatment Supervisor",                               phone: "+44 7286 555447",  email: "peter.coull@aqua-pharma.com" },
    ],
  },
  {
    title: "Business Unit — South-East Asia",
    fallbackLabel: "SEA",
    fallbackSurfaceClassName: "bg-(--brand-blue-soft)",
    fallbackAccentClassName: "bg-(--brand-green)/70",
    members: [
      { name: "Markus Wu",             role: "General Manager, South-East Asia",  phone: "+62 817 819 567",      email: "markus.wu@aqua-pharma.com", image: "/images/wp/team/markus-wu.png" },
      { name: "Atletico Nathanael",    role: "Field Support & Logistics Coordinator", phone: "+62 8787 6811 555", email: "atletico.nathanael@aqua-pharma.com", image: "/images/wp/team/atletico-nathanael.png" },
      { name: "Margareth Famunghui",   role: "Microbiology Lead Researcher",      phone: "+62 81289260861",      email: "margareth.famunghui@aqua-pharma.com", image: "/images/wp/team/margareth-famunghui.png" },
      { name: "Chesa Febrizky",        role: "Microbiology Tech Farm Support",    phone: "+62 81223789878",      email: "chesa.febrizky@aqua-pharma.com" },
      { name: "Hemi Tri Fani",         role: "Aquaculture Laboratory Analyst",   phone: "+62 85712824024",      email: "hemi.trifani@aqua-pharma.com" },
      { name: "Spiridion Adventino",   role: "Technical Coordinator",             phone: "+62 812 3165 8506",    email: "spiridion.adventino@aqua-pharma.com", image: "/images/wp/team/spiridion-adventino.png" },
    ],
  },
  {
    title: "Technical & HSE",
    fallbackLabel: "HSE",
    fallbackSurfaceClassName: "bg-(--brand-blue-soft)",
    fallbackAccentClassName: "bg-(--brand-green)/70",
    members: [
      { name: "Fernando Suardi", role: "Global Technical & HSE Manager", phone: "+55 41 999348329", email: "fernando.suardi@aqua-pharma.com", image: "/images/wp/team/fernando-suardi.png" },
    ],
  },
  {
    title: "Research & Development",
    fallbackLabel: "R&D",
    fallbackSurfaceClassName: "bg-(--brand-blue-soft)",
    fallbackAccentClassName: "bg-(--brand-green)/60",
    members: [
      { name: "Roy Strøm",      role: "Concept Expert & Internal Training",  phone: "+47 948 70 381",  email: "roy.strom@aqua-pharma.com", image: "/images/wp/team/roy-strom.png" },
      { name: "Tom Candy",      role: "Product & Regulatory Expert",         phone: "+44 738 424 2850", email: "tom.candy@aqua-pharma.com", image: "/images/wp/team/tom-candy.png" },
      { name: "Mike Friedman",  role: "Principal Data Scientist & Project Coordinator", phone: "+32 472 07 41 73", email: "mike.friedman@aqua-pharma.com" },
    ],
  },
  {
    title: "Business Services",
    fallbackLabel: "Ops",
    fallbackSurfaceClassName: "bg-(--brand-blue-soft)",
    fallbackAccentClassName: "bg-(--brand-glaucous)/60",
    members: [
      { name: "Julio Doval Garcia", role: "Controller South America",                    phone: "+47 481 29 777",  email: "julio.doval@aquatiq.com", image: "/images/wp/team/julio-doval-garcia.png" },
      { name: "Audrey Campbell",    role: "Spare Parts and Administrative Coordinator",  phone: "+44 7586 289639", email: "audrey.campbell@aqua-pharma.com", image: "/images/wp/team/audrey-campbell.png" },
    ],
  },
];

export default async function TeamPage() {
  const locale = await getRequestLocale();
  const page = getEditorialPagesContent(locale).team;

  return (
    <div className="min-h-screen bg-(--brand-paper)">
      <Navbar />

      {/* ── Hero ── */}
      <section className="relative flex min-h-[62vh] w-full flex-col justify-end overflow-hidden bg-(--brand-blue)">
        <div className="absolute inset-0">
          <Image
            src="/images/wp/team/team-hero.jpg"
            alt={page.hero.imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-38 motion-safe:animate-[zoomOut_12s_ease-out_forwards]"
          />
          <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(38,45,98,0.95)_0%,rgba(38,45,98,0.55)_55%,rgba(38,45,98,0.3)_100%)]" />
          {/* Abstract grid texture */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{ backgroundImage: "repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 0,transparent 50%),repeating-linear-gradient(180deg,#fff 0,#fff 1px,transparent 0,transparent 50%)", backgroundSize: "80px 80px" }}
          />
        </div>
        <ScrollReveal className="relative z-10 px-6 pb-20 pt-40 md:px-12 lg:px-20 lg:pb-28" duration={1.1} yOffset={34}>
          <p className="mb-6 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-white/60">
            {page.hero.kicker}
          </p>
          <h1 className="font-heading text-[clamp(2.6rem,5.5vw,5rem)] font-light leading-[1.05] tracking-wide text-white">
            {page.hero.title.split("\n")[0]}<br />{page.hero.title.split("\n")[1]}
          </h1>
          <p className="mt-8 max-w-xl text-[1.05rem] font-light leading-[1.8] text-white/70">
            {page.hero.description}
          </p>
        </ScrollReveal>
      </section>

      {/* ── Team Departments ── */}
      <section className="px-6 py-24 md:px-12 md:py-32 lg:px-20">
        <div className="mx-auto max-w-7xl">

          {/* Intro row */}
          <ScrollReveal className="mb-20 grid grid-cols-1 gap-10 border-b border-(--brand-blue)/8 pb-16 lg:grid-cols-[1fr_1.4fr] lg:gap-24" duration={0.9} start="top 90%" yOffset={24}>
            <div>
              <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-(--brand-glaucous)">
                {page.intro.kicker}
              </p>
              <h2 className="mt-6 font-heading text-[clamp(1.8rem,3vw,2.8rem)] font-light leading-[1.12] tracking-wide text-(--brand-blue)">
                {page.intro.title}
              </h2>
            </div>
            <p className="flex items-center text-[1.05rem] font-light leading-[1.85] text-(--brand-dark)/70">
              {page.intro.body}
            </p>
          </ScrollReveal>

          {/* Departments */}
          <div className="space-y-0 divide-y divide-(--brand-blue)/8">
            {teamSections.map((section, idx) => (
              <ScrollReveal key={section.title} className="py-16 md:py-20" delay={Math.min(idx * 0.02, 0.1)} duration={0.78} start="top 91%" yOffset={18}>
                <div className="mb-10 flex items-baseline gap-4">
                  <span className="font-heading text-[0.82rem] font-light tabular-nums text-(--brand-blue)/30">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h2 className="font-heading text-[1.3rem] font-light uppercase tracking-[0.12em] text-(--brand-blue)">
                    {page.sectionTitles[section.title] ?? section.title}
                  </h2>
                </div>

                <div className="grid grid-cols-1 gap-px bg-(--brand-blue)/8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {section.members.map((member, memberIdx) => (
                    <div
                      key={memberIdx}
                      className="flex flex-col gap-3 bg-(--brand-paper) p-7 transition-colors hover:bg-(--brand-blue-soft)/40"
                    >
                      <div className="relative h-16 w-16 overflow-hidden bg-(--brand-blue)/8">
                        {member.image ? (
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        ) : (
                          <div className={`relative h-full w-full overflow-hidden ${section.fallbackSurfaceClassName}`}>
                            <div className={`absolute inset-y-0 left-0 w-1.5 ${section.fallbackAccentClassName}`} />
                            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(38,45,98,0)_0%,rgba(38,45,98,0.04)_55%,rgba(38,45,98,0.14)_100%)]" />
                            <span className="absolute right-2 top-2 text-[0.48rem] font-medium uppercase tracking-[0.18em] text-(--brand-blue)/36">
                              {section.fallbackLabel}
                            </span>
                            <span className="absolute bottom-1.5 right-2 font-heading text-[1.25rem] font-light leading-none text-(--brand-blue)">
                              {getInitials(member.name)}
                            </span>
                          </div>
                        )}
                      </div>
                      <div>
                        <p className="font-heading text-[0.98rem] font-light leading-tight text-(--brand-blue)">
                          {member.name}
                        </p>
                        <p className="mt-1 text-[0.72rem] font-medium uppercase tracking-[0.16em] text-(--brand-glaucous)">
                          {member.role}
                        </p>
                        {member.phone && (
                          <a href={`tel:${member.phone}`} className="mt-2 block text-[0.78rem] font-light text-(--brand-dark)/50 transition-colors hover:text-(--brand-blue)">
                            {member.phone}
                          </a>
                        )}
                        {member.email && (
                          <a href={`mailto:${member.email}`} className="block text-[0.78rem] font-light text-(--brand-dark)/50 transition-colors hover:text-(--brand-blue)">
                            {member.email}
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA strip ── */}
      <section className="border-t border-(--brand-blue)/8 bg-(--brand-blue) px-6 py-16 md:px-12 md:py-20 lg:px-20">
        <ScrollReveal className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between" duration={0.88} start="top 91%" staggerChildren yOffset={18}>
          <div>
            <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-white/50">
              {page.cta.kicker}
            </p>
            <h2 className="mt-3 font-heading text-[clamp(1.4rem,2.5vw,2.4rem)] font-light text-white">
              {page.cta.title}
            </h2>
          </div>
          <a
            href="#contact"
            className="shrink-0 border border-white/20 px-8 py-3.5 text-[0.8rem] font-medium uppercase tracking-[0.15em] text-white transition-colors hover:bg-white hover:text-(--brand-blue)"
          >
            {page.cta.button}
          </a>
        </ScrollReveal>
      </section>

      <ContactSection />
      <Footer />
    </div>
  );
}
