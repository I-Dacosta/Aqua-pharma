import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductStoryPage } from "@/components/product/ProductStoryPage";
import { getProductBySlug, getProducts, products } from "@/data/products";
import { getRequestLocale } from "@/i18n/request";

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getRequestLocale();
  const product = getProductBySlug(slug, locale);

  if (!product) {
    return {
      title: "Aqua Pharma",
    };
  }

  return {
    title: `${product.title} | Aqua Pharma`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const locale = await getRequestLocale();
  const product = getProductBySlug(slug, locale);

  if (!product) {
    notFound();
  }

  const relatedProducts = getProducts(locale).filter((entry) => entry.slug !== product.slug);

  return <ProductStoryPage product={product} relatedProducts={relatedProducts} />;
}