import { Navbar } from "@/components/core/Navbar";
import { Hero } from "@/components/home/Hero";
import { WhatWeDo } from "@/components/home/WhatWeDo";
import { ProductSection } from "@/components/home/product-section";
import { News } from "@/components/home/News";
import { MapSection } from "@/components/home/MapSection";
import { ContactSection } from "@/components/core/ContactSection";
import { Footer } from "@/components/core/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-(--brand-paper) text-(--brand-dark)">
      <Navbar />

      {/* 1. Hero Section */}
      <Hero />

      {/* 2. WHAT WE DO */}
      <WhatWeDo />

      {/* 3. Product / Service highlights (Bath, Conditioning, Dosing) */}
      <ProductSection />

      {/* 5. News */}
      <News />

      {/* 6. Map section (We operate around the world) */}
      <MapSection />

      {/* 7. get in touch (Contact us) */}
      <ContactSection />

      {/* Footer */}
      <Footer />
    </main>
  );
}
