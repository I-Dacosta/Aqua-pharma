import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { Navbar } from "@/components/core/Navbar";
import { Footer } from "@/components/core/Footer";
import { HseBlock } from "@/components/core/ConceptBlocks";

export const metadata = { title: "Systems & Services | Aqua Pharma" };

const units = [
    { unit: "S", kind: "Medium-capacity", capacity: "2,500 Lpm", notes: "Doses pharmaceutical-grade 50% H₂O₂ and alternative medicines; can draw water samples back to the container." },
    { unit: "N", kind: "High-capacity", capacity: "6,000 Lpm", notes: "As S, plus pre-dilution for operator safety and fish welfare during high-volume dosing." },
    { unit: "W", kind: "Low-capacity · Wellboat", capacity: "750 Lpm", notes: "Doses pharmaceutical-grade 50% H₂O₂ and alternative medicines into vessel wells." },
];
const highlights = ["Fully automated dosing", "PLC controlled and monitored", "Self-regulating dosing at up to 2,500 Lpm", "Alternative-medicine capacity", "Compatible with central dispersal systems", "Housed in an insulated ISO 10 ft shipping container", "Dosing accuracy in a user-friendly package", "Remote control and data logging"];
const sections = [["dosing-systems", "Dosing Systems"], ["protocols", "Protocols"], ["on-site-support", "On-Site Support"], ["hse-product-stewardship", "HSE & Product Stewardship"]];
const wrap = "mx-auto w-full max-w-[100rem] px-6 md:px-12 lg:px-20";
const title = "font-heading text-[clamp(2rem,3.2vw,3.5rem)] font-light leading-[1.08] text-(--brand-blue)";
const text = "max-w-3xl text-[1.08rem] font-light leading-[1.8] text-(--brand-dark)/80";

export default function SystemsServicesPage() {
    return <main className="bg-(--brand-paper) text-(--brand-dark)">
        <Navbar />
        <header className="relative flex min-h-[70svh] items-end overflow-hidden bg-(--brand-blue) pb-16 pt-36 text-white">
            <Image src="/images/wp/products/dosing-hero.jpg" alt="Aqua Pharma automated dosing equipment" fill priority sizes="100vw" className="object-cover opacity-65" />
            <div className="absolute inset-0 bg-black/35" />
            <div className={`relative ${wrap}`}><p className="text-sm uppercase text-white/80">Integrated equipment and expertise</p><h1 className="mt-5 max-w-[15ch] font-heading text-6xl font-light">Systems & Services</h1><p className="mt-7 max-w-3xl text-lg font-light leading-relaxed">We provide integrated equipment and services that combine advanced technology with practical support, including automated dosing systems, treatment protocols, operator training, application assistance and HSE guidance. Our solutions support fish and shrimp health concepts across sea cage and pond aquaculture operations.</p></div>
        </header>
        <nav aria-label="On this page" className="sticky top-(--navbar-height) z-30 overflow-x-auto border-b border-(--brand-blue)/15 bg-(--brand-paper)/95 px-6 backdrop-blur-sm md:px-12 lg:px-20"><div className="mx-auto flex w-max max-w-[100rem] gap-7 py-5 text-sm text-(--brand-blue)">{sections.map(([id, label]) => <a key={id} href={`#${id}`} className="whitespace-nowrap hover:underline">{label}</a>)}</div></nav>
        <section id="dosing-systems" className="scroll-mt-52 py-20"><div className={wrap}>
            <h2 className={title}>Dosing Systems</h2><p className={`${text} mt-6`}>Compare the S, N and W units for controlled application in sea cages and wellboats.</p>
            <div className="mt-10 grid gap-6 md:grid-cols-3">{units.map(item => <article key={item.unit} className="border-t-2 border-(--brand-cyan) pt-5"><h3 className="font-heading text-4xl text-(--brand-blue)">Unit {item.unit}</h3><p className="mt-3 text-sm font-semibold uppercase text-(--brand-ink-muted)">{item.kind}</p><p className="mt-3 text-2xl text-(--brand-blue)">{item.capacity}</p><p className="mt-4 leading-7">{item.notes}</p></article>)}</div>
            <h3 className="mt-14 text-2xl text-(--brand-blue)">Equipment comparison</h3><div className="mt-5 overflow-x-auto"><table className="w-full min-w-[42rem] border-collapse text-left"><caption className="sr-only">Comparison of dosing units S, N and W</caption><thead><tr className="border-b border-(--brand-blue)/25 text-sm text-(--brand-blue)"><th className="p-3">Unit</th><th className="p-3">Class</th><th className="p-3">Capacity</th><th className="p-3">Notes</th></tr></thead><tbody>{units.map(item => <tr key={item.unit} className="border-b border-(--brand-blue)/15 align-top"><th scope="row" className="p-3">{item.unit}</th><td className="p-3">{item.kind}</td><td className="whitespace-nowrap p-3">{item.capacity}</td><td className="p-3">{item.notes}</td></tr>)}</tbody></table></div>
            <a className="brand-button mt-8" href="/downloads/wp/dosing/dosing-flyer.pdf" download>Download equipment factsheet <Download aria-hidden="true" size={16} /></a>
            <h3 className="mt-14 text-2xl text-(--brand-blue)">Equipment Highlights</h3><ul className="mt-6 grid gap-4 md:grid-cols-2">{highlights.map(item => <li key={item} className="border-t border-(--brand-blue)/15 pt-3">{item}</li>)}</ul>
        </div></section>
        <section id="protocols" className="scroll-mt-52 bg-white py-20"><div className={wrap}><h2 className={title}>Protocols</h2><p className={`${text} mt-6`}>We provide treatment SOPs (standard operating procedures) for each use case: sea lice, AGD, seabass and seabream, pond oxygenation and Vibrio management, so treatments are applied consistently, safely and to a documented standard.</p></div></section>
        <section id="on-site-support" className="scroll-mt-52 py-20"><div className={wrap}><h2 className={title}>On-Site Support</h2><p className={`${text} mt-6`}>Our experts assist on site or remotely with treatment planning and follow-up.</p><div className="mt-8 flex flex-wrap gap-3"><Link className="brand-button" href="/concepts/fish#field-support">Fish <ArrowRight aria-hidden="true" size={16}/></Link><Link className="brand-button" href="/concepts/shrimp#field-support">Shrimp <ArrowRight aria-hidden="true" size={16}/></Link></div></div></section>
        <section id="hse-product-stewardship" className="scroll-mt-52 bg-white py-20"><div className={wrap}><h2 className={title}>HSE & Product Stewardship</h2><p className={`${text} mt-6`}>Safety comes first in everything we do. Because working with H₂O₂ demands rigour, we support treatments with best-practice guidance, hands-on drills and training with local or specialised HSE companies. Through product stewardship and Responsible Care®, we help protect people, fish and the environment.</p><h3 id="safety-guides" className="mt-10 scroll-mt-52 text-2xl text-(--brand-blue)">Safety guides</h3><p className="mt-4 max-w-3xl leading-7">SEATRU™ 35FG (Asia only), 50FG and 20V, and the Paramove® Best Practice Manual.</p><HseBlock sector="systems" /></div></section>
        <Footer />
    </main>;
}
