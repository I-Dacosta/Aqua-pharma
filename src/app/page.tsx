import { Navbar } from "@/components/core/Navbar";
import { Hero } from "@/components/home/Hero";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { ProductSectionV2 } from "@/components/home/ProductSectionV2";
import { News } from "@/components/home/News";
import { MapSection } from "@/components/home/MapSection";
import { ContactSection } from "@/components/core/ContactSection";
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

			{/* 1. Hero Section */}
			<Hero />

			<MapSection />

			{/* 3. WHAT WE DO */}
			<WhatWeDo />

			{/* 3. Product / Service highlights (Bath, Conditioning, Dosing) */}
			<ProductSectionV2 />

			{/* 5. News */}
			<News today={today} />

			{/* 7. get in touch (Contact us) */}
			<ContactSection />

			{/* Footer */}
			<Footer />
		</main>
	);
}
