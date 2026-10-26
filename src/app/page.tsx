import { Navbar } from "@/components/core/Navbar";
import { Hero } from "@/components/home/Hero";
import { News } from "@/components/home/News";
import { MarketsSnapshot } from "@/components/home/MarketsSnapshot";
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
			<Hero />
			<MarketsSnapshot />
			<QuickNavBlocks />
			<News today={today} />
			<Footer />
		</main>
	);
}
