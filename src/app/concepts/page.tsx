import { Navbar } from "@/components/core/Navbar";
import { Footer } from "@/components/core/Footer";
import { ProductSectionV2 } from "@/components/home/ProductSectionV2";

export const metadata = { title: "Aquaculture Health Concepts | Aqua Pharma" };
export default function ConceptsPage() {
    return <main className="min-h-screen bg-(--brand-paper)"><Navbar /><ProductSectionV2 asPage /><Footer /></main>;
}
