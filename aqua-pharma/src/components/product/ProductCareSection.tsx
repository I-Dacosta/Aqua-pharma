"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatedArrowLink } from "@/components/ui/AnimatedArrowCta";
import { useProductTransition } from "@/components/core/ProductTransitionProvider";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { ProductRecord } from "@/data/products";

type ProductCareSectionProps = {
  product: ProductRecord;
  relatedProducts: ProductRecord[];
};

export function ProductCareSection({ product, relatedProducts }: ProductCareSectionProps) {
  const { startProductTransition } = useProductTransition();
  const relatedImageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleRelatedNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
    entry: ProductRecord,
    index: number,
  ) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const sourceFrame = relatedImageRefs.current[index];
    if (!sourceFrame) {
      return;
    }

    event.preventDefault();
    const rect = sourceFrame.getBoundingClientRect();

    startProductTransition({
      href: entry.href,
      image: entry.image,
      alt: entry.alt,
      sourceRect: {
        top: rect.top,
        left: rect.left,
        right: rect.right,
        bottom: rect.bottom,
        width: rect.width,
        height: rect.height,
      },
    });
  };

  return (
    <section
      id="product-care"
      className="overflow-hidden bg-[linear-gradient(180deg,#101742_0%,#151f6d_48%,#1d2358_100%)] px-8 py-24 text-white md:px-12 lg:px-16 lg:py-32"
    >
      <div className="mx-auto w-full max-w-400">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[0.74fr_1.26fr] lg:gap-20">
          <ScrollReveal duration={0.78} yOffset={16} start="top 92%">
            <div>
              <p className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.28em] text-white/44">
                03 / Care
              </p>
              <h2 className="mt-6 max-w-[11ch] text-[clamp(2.3rem,4.2vw,5rem)] font-heading leading-[0.92] tracking-[-0.06em] text-white">
                {product.description}
              </h2>
              <p className="mt-8 max-w-lg text-base leading-[1.8] text-white/70 md:text-[1.05rem]">
                {product.heroSummary}
              </p>

              <AnimatedArrowLink
                href="/"
                className="mt-10 text-sm font-medium uppercase tracking-[0.18em] text-(--brand-tangerine)"
              >
                Back to home
              </AnimatedArrowLink>
            </div>
          </ScrollReveal>

          <ScrollReveal className="grid gap-5 md:grid-cols-3" duration={0.7} yOffset={14} staggerChildren staggerAmount={0.05} start="top 94%">
            {product.principles.map((principle, index) => (
              <article
                key={principle}
                className="border border-white/9 bg-[linear-gradient(180deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.05)_100%)] p-7 backdrop-blur-sm md:min-h-[18rem]"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/36">
                  Care {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-10 text-[1.04rem] leading-[1.72] text-white/86">
                  {principle}
                </p>
              </article>
            ))}
          </ScrollReveal>
        </div>

        <div className="mt-20 border-t border-white/10 pt-12">
          {product.downloads?.length ? (
            <div id="product-downloads" className="mb-20 border-b border-white/10 pb-12">
              <ScrollReveal duration={0.74} yOffset={14} start="top 92%">
                <div className="flex items-end justify-between gap-8">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/44">
                      Download Library
                    </p>
                    <h3 className="mt-4 text-[clamp(1.9rem,3vw,3.3rem)] font-heading leading-[0.95] tracking-[-0.05em] text-white">
                      Product collateral from the original site.
                    </h3>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3" duration={0.7} yOffset={14} staggerChildren staggerAmount={0.05} start="top 94%">
                {product.downloads.map((asset) => (
                  <a
                    key={asset.title}
                    href={asset.href}
                    target={asset.external ? "_blank" : undefined}
                    rel={asset.external ? "noopener noreferrer" : undefined}
                    download={asset.download ? "" : undefined}
                    className="group block overflow-hidden border border-white/9 bg-[linear-gradient(180deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.05)_100%)] transition-colors hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0.08)_100%)]"
                  >
                    <div className="relative h-48 overflow-hidden bg-white/8">
                      <Image
                        src={asset.asset}
                        alt={asset.title}
                        fill
                        sizes="(max-width: 1280px) 100vw, 30vw"
                        className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,31,109,0.06)_0%,rgba(21,31,109,0.52)_100%)]" />
                    </div>

                    <div className="p-6">
                      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/48">
                        {asset.eyebrow}
                      </p>
                      <h4 className="mt-4 text-[1.4rem] font-heading leading-[1.02] tracking-[-0.04em] text-white transition-colors group-hover:text-(--brand-tangerine)">
                        {asset.title}
                      </h4>
                      <p className="mt-4 text-[0.95rem] leading-[1.7] text-white/68">
                        {asset.description}
                      </p>
                      <p className="mt-6 text-[0.72rem] font-medium uppercase tracking-[0.18em] text-(--brand-tangerine)">
                        {asset.external ? "Open resource" : asset.download ? "Download asset" : "View asset"} →
                      </p>
                    </div>
                  </a>
                ))}
              </ScrollReveal>
            </div>
          ) : null}

          <ScrollReveal duration={0.74} yOffset={14} start="top 92%">
            <div className="flex items-end justify-between gap-8">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/44">
                  Continue through the system
                </p>
                <h3 className="mt-4 text-[clamp(1.9rem,3vw,3.3rem)] font-heading leading-[0.95] tracking-[-0.05em] text-white">
                  Related product paths.
                </h3>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2" duration={0.72} yOffset={14} staggerChildren staggerAmount={0.05} start="top 94%">
            {relatedProducts.map((entry, index) => (
              <Link
                key={entry.slug}
                href={entry.href}
                onClick={(event) => {
                  handleRelatedNavigation(event, entry, index);
                }}
                className="group block"
              >
                <div
                  ref={(element) => {
                    relatedImageRefs.current[index] = element;
                  }}
                  className="relative h-[34vh] overflow-hidden bg-white/8 md:h-[42vh]"
                >
                  <div className="absolute inset-0 scale-[1.06] transition-transform duration-700 ease-out group-hover:scale-100">
                    <Image
                      src={entry.image}
                      alt={entry.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,31,109,0.06)_0%,rgba(21,31,109,0.52)_100%)]" />
                  </div>
                </div>

                <div className="pt-6">
                  <p className="text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-white/52">
                    {entry.eyebrow}
                  </p>
                  <h4 className="mt-4 text-[clamp(1.7rem,2.6vw,2.9rem)] font-heading leading-[0.97] tracking-[-0.05em] text-white transition-colors group-hover:text-(--brand-tangerine)">
                    {entry.title}
                  </h4>
                  <p className="mt-4 max-w-xl text-base leading-[1.72] text-white/68">
                    {entry.description}
                  </p>
                </div>
              </Link>
            ))}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}