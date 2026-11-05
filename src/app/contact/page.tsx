import { Navbar } from "@/components/core/Navbar";
import { Footer } from "@/components/core/Footer";
import { ContactSection } from "@/components/core/ContactSection";
import { MapSection } from "@/components/home/MapSection";

export const metadata = { title: "Contact | Aqua Pharma" };
export default function ContactPage() {
    const markets = ["Australia", "Belgium", "Canada", "Chile", "Ecuador", "Greece", "Indonesia", "Norway", "Scotland"];
    return <main className="min-h-screen bg-(--brand-paper) pt-28"><Navbar /><h1 className="sr-only">Contact Aqua Pharma</h1><ContactSection /><section id="local-experts" className="scroll-mt-32 px-6 py-20 md:px-12 lg:px-20"><div className="mx-auto max-w-[100rem]"><h2 className="font-heading text-4xl text-(--brand-blue)">Find a local expert</h2><p className="mt-5">Contact us about your market and we will connect you with the appropriate team.</p><div className="mt-10 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">{markets.map(market => <a key={market} className="border-t border-(--brand-blue)/20 py-5 text-(--brand-blue) hover:underline" href={`mailto:contact@aqua-pharma.com?subject=${encodeURIComponent(`Sales enquiry: ${market}`)}`}>{market} →</a>)}</div><h3 className="mt-12 text-2xl text-(--brand-blue)">HSE & Product Stewardship</h3><a className="brand-button mt-5" href="mailto:fernando.suardi@aqua-pharma.com?subject=HSE%20enquiry">Contact our Global HSE manager →</a></div></section><MapSection id="contact-map" titleMode="global-presence" /><Footer /></main>;
}
