"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedArrowLink } from "../ui/AnimatedArrowCta";
import { ScrollReveal } from "../ui/ScrollReveal";
import { products, type ProductRecord, type ProductSlug } from "@/data/products";
import { useProductTransition } from "../core/ProductTransitionProvider";

gsap.registerPlugin(ScrollTrigger);

function formatSectionIndex(index: number) {
  return String(index + 1).padStart(3, "0");
}

const storyMeta: Record<ProductSlug, { context: string; statement: string }> = {
  "bath-treatments": {
    context: "Salmon farms / Bath treatments",
    statement: "Treatment systems built for fish welfare in the exact moment parasite pressure rises.",
  },
  "water-conditioning-oxygenation": {
    context: "Shrimp ponds / Water conditioning",
    statement: "Protocols, pond preparation, and oxygen support shaped around fragile aquatic ecosystems.",
  },
  "dosing-units-services": {
    context: "Live operations / Dosing systems",
    statement: "Engineering that turns a prescribed treatment into something safer, calmer, and repeatable in the field.",
  },
};

function MobileStoryCard({
  section,
  index,
  onNavigate,
}: {
  section: ProductRecord;
  index: number;
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <article className="border-t border-white/12 py-8 first:border-t-0">
      <div className="overflow-hidden">
        <Image
          src={section.image}
          alt={section.alt}
          width={1440}
          height={1100}
          className="h-[46vh] w-full object-cover"
        />
      </div>

      <div className="mt-6">
        <p className="text-[0.72rem] font-medium uppercase tracking-[0.22em] text-white/48">
          {formatSectionIndex(index)} / {storyMeta[section.slug].context}
        </p>
        <h3 className="mt-4 font-heading text-[clamp(2rem,7vw,3rem)] font-light leading-[0.98] tracking-[-0.05em] text-white">
          {section.title}
        </h3>
        <p className="mt-5 text-[1rem] font-light leading-[1.8] text-white/72">
          {storyMeta[section.slug].statement}
        </p>
        <p className="mt-5 max-w-2xl text-[0.95rem] font-light leading-[1.75] text-white/58">
          {section.overviewBody}
        </p>
        <AnimatedArrowLink
          href={section.href}
          onClick={onNavigate}
          className="mt-6 text-[0.8rem] font-medium uppercase tracking-[0.18em] text-(--brand-tangerine)"
        >
          Enter Chapter
        </AnimatedArrowLink>
      </div>
    </article>
  );
}

export function ProductSection() {
  const { startProductTransition } = useProductTransition();
  const sectionRef = useRef<HTMLElement>(null);
  const imgFramesRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleProductNavigation = (
    event: React.MouseEvent<HTMLAnchorElement>,
    product: ProductRecord,
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

    const sourceFrame = imgFramesRef.current[index];
    if (!sourceFrame) {
      return;
    }

    event.preventDefault();

    const rect = sourceFrame.getBoundingClientRect();

    startProductTransition({
      href: product.href,
      image: product.image,
      alt: product.alt,
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

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const media = gsap.matchMedia();

      media.add("(min-width: 1024px)", () => {
        let currentIndex = -1;

        const trigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => {
            const nextIndex = Math.min(
              products.length - 1,
              Math.floor(self.progress * products.length),
            );

            if (nextIndex !== currentIndex) {
              currentIndex = nextIndex;
              setActiveIndex(nextIndex);
            }
          },
        });

        return () => trigger.kill();
      });

      return () => media.revert();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="products"
      ref={sectionRef}
      className="bg-[linear-gradient(180deg,#101742_0%,#151f6d_55%,#11183c_100%)] text-white"
    >
      <div className="hidden lg:block h-[310vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="grid h-full grid-cols-[20rem_minmax(0,1fr)]">
            <div className="flex h-full flex-col justify-between border-r border-white/10 px-8 py-14 xl:px-10">
              <ScrollReveal duration={0.78} yOffset={16} start="top 92%">
                <div>
                  <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-white/44">
                    Chapter 03 / Treatment Narratives
                  </p>
                  <h2 className="mt-6 max-w-[10ch] font-heading text-[clamp(2.3rem,3.6vw,4.4rem)] font-light leading-[0.94] tracking-[-0.05em] text-white">
                    Three farm realities. Three treatment stories.
                  </h2>
                  <p className="mt-8 max-w-xs text-[0.98rem] font-light leading-[1.8] text-white/68">
                    Move through the systems as chapters, not cards. Each one begins in a different environment, with different welfare conditions, operational risks, and treatment needs.
                  </p>
                </div>
              </ScrollReveal>

              <div className="space-y-5">
                {products.map((section, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <div
                      key={section.id}
                      className={`border-l pl-4 transition-all duration-500 ${isActive ? "border-(--brand-tangerine) opacity-100" : "border-white/12 opacity-45"}`}
                    >
                      <p className="text-[0.68rem] font-medium uppercase tracking-[0.2em] text-white/56">
                        {formatSectionIndex(index)} / {storyMeta[section.slug].context}
                      </p>
                      <h3 className="mt-2 font-heading text-[1.35rem] font-light text-white">
                        {section.title}
                      </h3>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="relative h-full overflow-hidden">
              {products.map((section, index) => {
                const isActive = index === activeIndex;

                return (
                  <div
                    key={section.id}
                    className={`absolute inset-0 transition-all duration-700 ${isActive ? "opacity-100" : "pointer-events-none opacity-0"}`}
                  >
                    <div className="grid h-full grid-cols-[1.12fr_0.88fr]">
                      <div
                        ref={(element) => {
                          imgFramesRef.current[index] = element;
                        }}
                        className="relative h-full overflow-hidden"
                      >
                        <Image
                          src={section.image}
                          alt={section.alt}
                          fill
                          sizes="(min-width: 1024px) 55vw, 100vw"
                          className={`object-cover object-center transition-transform duration-1000 ${isActive ? "scale-100" : "scale-[1.06]"}`}
                        />
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,31,109,0.08)_0%,rgba(21,31,109,0.44)_100%)]" />
                      </div>

                      <div className="flex h-full flex-col justify-end px-12 pb-16 pt-14 xl:px-16 xl:pb-18">
                        <p className="text-[0.72rem] font-medium uppercase tracking-[0.24em] text-white/48">
                          {storyMeta[section.slug].context}
                        </p>
                        <h3 className="mt-6 max-w-[10ch] font-heading text-[clamp(2.6rem,4.2vw,5rem)] font-light leading-[0.92] tracking-[-0.055em] text-white">
                          {section.title}
                        </h3>
                        <p className="mt-8 max-w-xl text-[1.08rem] font-light leading-[1.85] text-white/76">
                          {storyMeta[section.slug].statement}
                        </p>
                        <p className="mt-8 max-w-xl border-t border-white/12 pt-8 text-[0.98rem] font-light leading-[1.78] text-white/62">
                          {section.overviewBody}
                        </p>
                        <AnimatedArrowLink
                          href={section.href}
                          onClick={(event) => {
                            handleProductNavigation(event, section, index);
                          }}
                          className="mt-10 text-[0.8rem] font-medium uppercase tracking-[0.18em] text-(--brand-tangerine)"
                        >
                          Enter Chapter
                        </AnimatedArrowLink>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-20 md:px-12 lg:hidden">
        <div className="mx-auto max-w-5xl">
          <ScrollReveal duration={0.78} yOffset={16} start="top 92%">
            <div>
              <p className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-white/44">
                Chapter 03 / Treatment Narratives
              </p>
              <h2 className="mt-6 max-w-[12ch] font-heading text-[clamp(2.4rem,8vw,4rem)] font-light leading-[0.96] tracking-[-0.05em] text-white">
                Three farm realities. Three treatment stories.
              </h2>
            </div>
          </ScrollReveal>
          <ScrollReveal className="mt-10" duration={0.74} yOffset={14} staggerChildren staggerAmount={0.05} start="top 93%">
          <div>
            {products.map((section, index) => (
              <MobileStoryCard
                key={section.id}
                section={section}
                index={index}
                onNavigate={(event) => {
                  handleProductNavigation(event, section, index);
                }}
              />
            ))}
          </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
