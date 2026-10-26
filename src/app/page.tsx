import { Navbar } from "@/components/core/Navbar";
import { News } from "@/components/home/News";
import { MapSection } from "@/components/home/MapSection";
import { QuickNavBlocks } from "@/components/home/QuickNavBlocks";
import { Footer } from "@/components/core/Footer";

export const metadata = {
	title: "Aqua Pharma | Aquaculture Health Concepts",
	description:
		"Aquaculture health concepts for fish parasite control and shrimp pond health, supported by dosing systems, services and applied research.",
};

export default function Home() {
	const today = new Date().toISOString().slice(0, 10);
	return (
		<main className="min-h-screen bg-(--brand-paper) text-(--brand-dark)">
			<Navbar />
			<h1 className="sr-only">Aqua Pharma</h1>
			<MapSection />
			<QuickNavBlocks />
			<News today={today} />
			<Footer />
		</main>
	);
}
