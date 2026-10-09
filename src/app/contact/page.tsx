import { Navbar } from "@/components/core/Navbar";
import { Footer } from "@/components/core/Footer";
import { ContactSection } from "@/components/core/ContactSection";
import { MapSection } from "@/components/home/MapSection";

export const metadata = { title: "Contact | Aqua Pharma" };
export default function ContactPage() {
    return <main className="min-h-screen bg-(--brand-paper) pt-28"><Navbar /><h1 className="sr-only">Contact Aqua Pharma</h1><ContactSection /><div id="local-experts"><MapSection /></div><Footer /></main>;
}
