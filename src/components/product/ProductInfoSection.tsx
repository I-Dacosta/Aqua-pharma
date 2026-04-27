"use client";

import Image from "next/image";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { useSiteLocale } from "@/components/core/SiteLocaleProvider";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { ProductRecord } from "@/data/products";

type ProductInfoSectionProps = {
  product: ProductRecord;
};

export function ProductInfoSection({ product }: ProductInfoSectionProps) {
  const { content } = useSiteLocale();

  return (
    <section
      id="product-info"
      className="border-t border-[rgba(38,45,98,0.08)] bg-(--brand-paper) px-8 py-24 md:px-12 lg:px-16 lg:py-32"
    >
      <div className="mx-auto grid w-full max-w-400 grid-cols-1 gap-16 lg:grid-cols-[minmax(18rem,0.8fr)_minmax(0,1.2fr)] lg:gap-22">
        <ScrollReveal className="lg:sticky lg:top-24 lg:self-start" duration={0.78} yOffset={16} start="top 92%">
          <div>
            <p className="whitespace-nowrap text-[11px] font-semibold uppercase tracking-[0.28em] text-(--brand-blue)/55">
              {content.productsUi.fieldStoryLabel}
            </p>

            <h2 className="mt-6 max-w-[10ch] text-[clamp(2.4rem,4.6vw,5.4rem)] font-heading leading-[0.9] tracking-[-0.06em] text-(--brand-blue)">
              {product.processTitle}
            </h2>

            <SectionDivider className="mt-8 max-w-48" />

            <p className="mt-8 max-w-md text-base leading-[1.8] text-[var(--brand-ink-muted)] md:text-[1.05rem]">
              {product.processBody}
            </p>
          </div>
        </ScrollReveal>

        <div className="divide-y divide-(--brand-blue)/8 border-t border-(--brand-blue)/8">
          {product.chapters.map((chapter, index) => (
            <ScrollReveal
              key={chapter.id}
              duration={0.7}
              yOffset={14}
              start="top 94%"
            >
              <article className="grid grid-cols-1 gap-8 py-10 md:py-12 lg:grid-cols-[5rem_minmax(0,1fr)_18rem] lg:gap-10">
                <div>
                  <span className="font-heading text-[2.6rem] font-light leading-none tracking-[-0.08em] text-(--brand-tangerine)/70 md:text-[4rem]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-(--brand-blue)/42">
                      {chapter.eyebrow}
                    </p>
                    <h3 className="mt-5 max-w-[16ch] text-[clamp(1.7rem,2.7vw,3rem)] font-heading font-light leading-[0.98] tracking-[-0.05em] text-(--brand-blue)">
                      {chapter.title}
                    </h3>
                  </div>

                  <p className="mt-8 max-w-[42rem] text-base leading-[1.82] text-[var(--brand-ink-muted)] md:text-[1.03rem]">
                    {chapter.body}
                  </p>
                </div>

                <div className="border-l border-(--brand-blue)/10 pl-5 lg:mt-1">
                  <div className="relative mb-5 aspect-[4/3] overflow-hidden bg-(--brand-blue)/5">
                    <Image
                      src={product.chapterImages[index]?.src ?? product.detailImage ?? product.image}
                      alt={product.chapterImages[index]?.alt ?? chapter.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 18rem"
                      className="object-cover"
                    />
                  </div>
                  <p className="text-[0.72rem] font-medium uppercase tracking-[0.2em] text-(--brand-glaucous)">
                    {content.productsUi.whyItMatters}
                  </p>
                  <p className="mt-4 text-[0.92rem] font-light leading-[1.75] text-(--brand-dark)/66">
                    {chapter.kicker}
                  </p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}