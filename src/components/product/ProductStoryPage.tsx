import { ContactSection } from "@/components/core/ContactSection";
import { Footer } from "@/components/core/Footer";
import { Navbar } from "@/components/core/Navbar";
import { ProductCareSection } from "@/components/product/ProductCareSection";
import { ProductHeroSection } from "@/components/product/ProductHeroSection";
import { ProductInfoSection } from "@/components/product/ProductInfoSection";
import { ProductIntroSection } from "@/components/product/ProductIntroSection";
import type { ProductRecord } from "@/data/products";

type ProductStoryPageProps = {
  product: ProductRecord;
  relatedProducts: ProductRecord[];
};

export function ProductStoryPage({ product, relatedProducts }: ProductStoryPageProps) {
  return (
    <main className="product-paper-surface min-h-screen text-(--brand-dark)">
      <Navbar />
      <ProductHeroSection product={product} />
      <ProductIntroSection product={product} />
      <ProductInfoSection product={product} />
      <ProductCareSection product={product} relatedProducts={relatedProducts} />
      <ContactSection />
      <Footer />
    </main>
  );
}