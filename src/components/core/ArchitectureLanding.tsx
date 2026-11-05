import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Navbar } from "@/components/core/Navbar";
import { Footer } from "@/components/core/Footer";
import { ContactSection } from "@/components/core/ContactSection";
import type { ArchitecturePage } from "@/data/architecture-pages";
import { DosingSummary, HseBlock, OfferCard, SustainabilityNote, type Offer } from "@/components/core/ConceptBlocks";

const fishOffers: Offer[] = [
    { title: "Sea lice", fields: [{ label: "Use case", value: "Sea lice in salmon farming" }, { label: "Treatment basis", value: "H₂O₂-based veterinary medicine" }, { label: "Application", value: "Tarpaulin or wellboat treatment" }, { label: "Set-up", value: "Automated dosing, SOPs and treatment team support" }, { label: "Status", value: "Used in established salmon markets" }, { label: "Support", value: "Training, treatment planning and on-site or remote follow-up" }] },
    { title: "Amoebic Gill Disease (AGD)", fields: [{ label: "Use case", value: "AGD management in salmon" }, { label: "Treatment basis", value: "H₂O₂-based veterinary medicine" }, { label: "Application", value: "Tarpaulin or wellboat treatment" }, { label: "Set-up", value: "Dosing adapted to site conditions" }, { label: "Support", value: "SOPs, guidance and training" }] },
    { title: "Seabass & seabream", fields: [{ label: "Use case", value: "Parasite treatment in Mediterranean farming" }, { label: "Treatment basis", value: "H₂O₂-based" }, { label: "Application", value: "Controlled cage treatment" }, { label: "Status", value: "Controlled trials and transition planning" }] },
];
const shrimpOffers: Record<string, Offer> = {
    "pond-oxygenation": { title: "SEATRU™ for pond oxygenation", fields: [{ label: "Use case", value: "Increase dissolved oxygen in shrimp ponds" }, { label: "Treatment basis", value: "Food-grade H₂O₂" }, { label: "Application", value: "Controlled pond dosing" }, { label: "Set-up", value: "Dosing integrated with dissolved-oxygen sensors and pond conditions" }] },
    "outbreak-control": { title: "Vibrio management · Asia only", fields: [{ label: "Use case", value: "Pond water conditioning" }, { label: "Treatment basis", value: "PAA-based water treatment" }, { label: "Application", value: "Controlled dosing in ponds" }, { label: "Status", value: "Part of the shrimp platform in Asia" }, { label: "Support", value: "Protocols, training, dosing guidance and follow-up" }] },
};

export function ArchitectureLanding({ page, showContact = true }: { page: ArchitecturePage; showContact?: boolean }) {
    return (
        <main className="bg-(--brand-paper) text-(--brand-dark)">
            <Navbar />
            <header className="relative flex min-h-[70svh] items-end overflow-hidden bg-(--brand-blue) px-6 pb-16 pt-36 text-white md:px-12 lg:px-20">
                <Image src={page.image} alt={page.imageAlt} fill priority sizes="100vw" className="object-cover opacity-65" />
                <div className="absolute inset-0 bg-black/35" />
                <div className="relative mx-auto w-full max-w-[100rem]">
                    <p className="text-[0.8rem] uppercase text-white/80">{page.eyebrow}</p>
                    <h1 className="mt-5 max-w-[15ch] font-heading text-[clamp(3rem,7vw,7rem)] font-light leading-[0.98]">{page.title}</h1>
                    <p className="mt-7 max-w-[44rem] text-[clamp(1rem,1.4vw,1.3rem)] font-light leading-relaxed text-white/90">{page.intro}</p>
                </div>
            </header>

            <nav aria-label="On this page" className="sticky top-(--navbar-height) z-30 overflow-x-auto border-b border-(--brand-blue)/15 bg-(--brand-paper)/95 px-6 backdrop-blur-sm md:px-12 lg:px-20">
                <div className="mx-auto flex w-max max-w-[100rem] gap-7 py-5 text-[0.82rem] text-(--brand-blue) lg:mx-0">
                    {page.sections.map((section) => <a key={section.id} href={`#${section.id}`} className="whitespace-nowrap hover:underline">{section.title}</a>)}
                </div>
            </nav>

            {page.sections.map((section, index) => (
                <section key={section.id} id={section.id} className={`scroll-mt-44 border-b border-(--brand-blue)/10 px-6 py-20 md:scroll-mt-52 md:px-12 lg:px-20 ${index % 2 ? "bg-white" : "bg-(--brand-paper)"}`}>
                    <div className="mx-auto grid max-w-[100rem] gap-8 lg:grid-cols-[minmax(16rem,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
                        <h2 className="max-w-[16ch] font-heading text-[clamp(2rem,3.2vw,3.5rem)] font-light leading-[1.08] text-(--brand-blue)">{section.title}</h2>
                        <div className="max-w-[48rem]">
                            <p className="text-[1.08rem] font-light leading-[1.8] text-(--brand-dark)/75">{section.body}</p>
                            {section.id === "species-applications" && page.title.startsWith("Fish") ? <div className="mt-8 grid gap-8">{fishOffers.map(offer => <OfferCard key={offer.title} offer={offer} />)}</div> : null}
                            {page.title.startsWith("Shrimp") && shrimpOffers[section.id] ? <div className="mt-8"><OfferCard offer={shrimpOffers[section.id]} /></div> : null}
                            {section.points?.length && !(page.title.startsWith("Shrimp") && shrimpOffers[section.id]) ? <ul className="mt-7 space-y-3 border-t border-(--brand-blue)/15 pt-6 text-[0.98rem] leading-relaxed text-(--brand-dark)/75">{section.points.filter(point => !point.startsWith("H₂O₂ breaks down")).map((point) => <li key={point} className="flex gap-3"><span aria-hidden="true" className="text-(--brand-glaucous)">→</span>{point}</li>)}</ul> : null}
                            {(section.id === "bath-treatments" || section.id === "pond-oxygenation") && <SustainabilityNote />}
                            {((section.id === "dosing-systems" && page.title.startsWith("Fish")) || (section.id === "pond-oxygenation" && page.title.startsWith("Shrimp"))) && <DosingSummary />}
                            {section.id === "hse-sds-docs" && <HseBlock sector={page.title.startsWith("Fish") ? "fish" : "shrimp"} />}
                            {"image" in section && section.image ? <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-lg"><Image src={section.image.src} alt={section.image.alt} fill sizes="(max-width: 1023px) 100vw, 50vw" className="object-cover" /></div> : null}
                            {section.link && section.id !== "hse-sds-docs" && !(section.id === "dosing-systems" && page.title.startsWith("Fish")) ? <Link href={section.link.href} className="brand-button mt-8">{section.link.label}<ArrowRight aria-hidden="true" size={16} /></Link> : null}
                        </div>
                    </div>
                </section>
            ))}

            {showContact ? <ContactSection /> : null}
            <Footer />
        </main>
    );
}
