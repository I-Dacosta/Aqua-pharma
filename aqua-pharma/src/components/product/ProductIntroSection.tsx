"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedArrowLink } from "@/components/ui/AnimatedArrowCta";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import type { ProductRecord } from "@/data/products";

gsap.registerPlugin(ScrollTrigger);

type ProductIntroSectionProps = {
  product: ProductRecord;
};

export function ProductIntroSection({ product }: ProductIntroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mediaImages = gsap.utils.toArray<HTMLElement>(".product-intro-media-img");

      mediaImages.forEach((image) => {
        gsap.fromTo(
          image,
          { y: "-12%", scale: 1.12 },
          {
            y: "12%",
            ease: "none",
            scrollTrigger: {
              trigger: image.closest(".product-intro-media-wrap") as Element,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="product-intro"
      ref={sectionRef}
      className="w-full overflow-hidden bg-(--brand-paper-warm) py-24 text-(--brand-dark) lg:py-32"
    >
      <div className="product-intro-trigger px-8 md:px-12 lg:px-16">
        <ScrollReveal duration={0.78} yOffset={16} start="top 92%">
          <div className="mx-auto grid w-full max-w-400 grid-cols-1 gap-y-6 gap-x-8 border-b border-(--brand-blue)/8 pb-12 md:grid-cols-[12rem_minmax(0,1fr)] md:pb-14">
            <div className="whitespace-nowrap pt-1 text-[11px] font-semibold uppercase tracking-[0.28em] text-(--brand-blue)/52">
              01 / Context
            </div>

            <h2 className="max-w-[18ch] text-[clamp(2.3rem,4.1vw,4.8rem)] font-heading font-light leading-[0.96] tracking-[-0.055em] text-(--brand-blue)">
              {product.overviewTitle}
            </h2>
          </div>
        </ScrollReveal>
      </div>

      <div
        className="mx-auto mt-12 grid w-full max-w-400 grid-cols-1 items-start gap-12 px-8 md:mt-16 md:grid-cols-[minmax(0,1fr)_minmax(19rem,0.56fr)] md:px-12 lg:px-16"
        style={{ columnGap: "11%" }}
      >
        <ScrollReveal duration={0.82} yOffset={18} start="top 92%">
          <div className="product-intro-media-wrap relative overflow-hidden bg-(--brand-blue)">
            <Image
              src={product.image}
              alt={product.alt}
              width={1600}
              height={1200}
              sizes="(max-width: 768px) 100vw, 58vw"
              className="product-intro-media-img h-[58vh] w-full object-cover object-center md:h-[72vh]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,31,109,0.08)_0%,rgba(21,31,109,0.42)_100%)]" />
            <p className="absolute left-6 top-6 z-10 text-[0.68rem] font-medium uppercase tracking-[0.22em] text-white/70 md:left-8 md:top-8">
              {product.eyebrow}
            </p>
          </div>
        </ScrollReveal>

        <div className="flex flex-col justify-between gap-10 md:pt-4">
          <ScrollReveal duration={0.78} yOffset={16} start="top 92%">
            <div>
              <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-(--brand-glaucous)">
                Editorial Overview
              </p>
              <h3 className="mt-5 max-w-[11ch] text-[clamp(2.1rem,3.2vw,4.2rem)] font-heading font-light leading-[0.96] tracking-[-0.055em] text-(--brand-blue)">
                {product.processTitle}
              </h3>

              <p className="mt-8 max-w-[34rem] text-[15px] leading-[1.82] text-[var(--brand-ink-muted)] md:text-[1rem]">
                {product.overviewBody}
              </p>

              <p className="mt-8 border-l border-(--brand-blue)/16 pl-5 font-heading text-[1.2rem] font-light leading-[1.5] text-(--brand-blue)/82">
                {product.principles[0]}
              </p>

              <AnimatedArrowLink
                href="#product-info"
                className="mt-8 text-sm font-medium uppercase tracking-[0.18em] text-(--brand-tangerine)"
              >
                Continue the chapter
              </AnimatedArrowLink>
            </div>
          </ScrollReveal>

          <ScrollReveal duration={0.7} yOffset={14} staggerChildren staggerAmount={0.05} start="top 94%">
            <div className="divide-y divide-(--brand-blue)/10 border-y border-(--brand-blue)/10">
              {product.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="grid grid-cols-[7.5rem_minmax(0,1fr)] items-center gap-6 bg-white/48 py-5 md:grid-cols-[8.5rem_minmax(0,1fr)] md:py-6"
                >
                  <p className="font-heading text-[clamp(2rem,2.4vw,2.8rem)] font-light leading-none text-(--brand-blue)">
                    {stat.value}
                  </p>
                  <p className="max-w-[16rem] text-[0.82rem] font-medium uppercase leading-[1.55] tracking-[0.16em] text-(--brand-glaucous)">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
