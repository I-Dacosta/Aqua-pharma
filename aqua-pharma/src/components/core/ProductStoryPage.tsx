"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ContactSection } from "@/components/core/ContactSection";
import { Footer } from "@/components/core/Footer";
import { Navbar } from "@/components/core/Navbar";
import { useProductTransition } from "@/components/core/ProductTransitionProvider";
import { ProductHeroAnimated } from "@/components/core/ProductHeroAnimated";
import type { ProductRecord } from "@/data/products";

gsap.registerPlugin(ScrollTrigger);

type ProductStoryPageProps = {
  product: ProductRecord;
  relatedProducts: ProductRecord[];
};

export function ProductStoryPage({ product, relatedProducts }: ProductStoryPageProps) {
  const { startProductTransition } = useProductTransition();
  const storyRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const mediaImageRef = useRef<HTMLDivElement>(null);
  const chapterRefs = useRef<(HTMLDivElement | null)[]>([]);
  const relatedImageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeChapter, setActiveChapter] = useState(0);

  useGSAP(
    () => {
      const storyElement = storyRef.current;
      const mediaElement = mediaRef.current;
      const mediaImageElement = mediaImageRef.current;
      const chapters = chapterRefs.current.filter(Boolean) as HTMLDivElement[];

      if (!storyElement || !mediaElement || !mediaImageElement || chapters.length === 0) {
        return;
      }

      gsap.set(mediaImageElement, { scale: 1.08, yPercent: 8 });

      chapters.forEach((chapter, index) => {
        ScrollTrigger.create({
          trigger: chapter,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveChapter(index),
          onEnterBack: () => setActiveChapter(index),
        });

        const contentNodes = chapter.querySelectorAll("[data-story-content]");
        gsap.from(contentNodes, {
          y: 36,
          opacity: 0,
          filter: "blur(10px)",
          duration: 0.95,
          ease: "power3.out",
          stagger: 0.12,
          scrollTrigger: {
            trigger: chapter,
            start: "top 72%",
            toggleActions: "play none none reverse",
          },
        });
      });

      ScrollTrigger.create({
        trigger: storyElement,
        start: "top top",
        end: "bottom bottom",
        pin: mediaElement,
        pinSpacing: false,
      });

      const imageTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: storyElement,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      imageTimeline
        .to(mediaImageElement, { yPercent: 2, scale: 1.03, ease: "none", duration: 1 })
        .to(mediaImageElement, { yPercent: -4, scale: 1, ease: "none", duration: 1 })
        .to(mediaImageElement, { yPercent: -10, scale: 0.97, ease: "none", duration: 1 });
    },
    { scope: storyRef },
  );

  useEffect(() => {
    const storyElement = storyRef.current;
    const mediaImageElement = mediaImageRef.current;

    if (!storyElement || !mediaImageElement) {
      return;
    }

    const chapterStates = [0, 5, 10];
    const overlayLines = gsap.utils.toArray<HTMLElement>("[data-story-line]", storyElement);

    overlayLines.forEach((line, index) => {
      gsap.to(line, {
        opacity: activeChapter === index ? 1 : 0.26,
        duration: 0.35,
        ease: "power2.out",
        overwrite: true,
      });
    });

    gsap.to(mediaImageElement, {
      xPercent: chapterStates[activeChapter] ?? 0,
      duration: 0.6,
      ease: "power3.out",
      overwrite: true,
    });
  }, [activeChapter]);

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
    <main className="min-h-screen bg-(--brand-paper) text-(--brand-dark)">
      <Navbar />

      <ProductHeroAnimated product={product} />

      <section className="border-b border-(--brand-border) bg-(--brand-paper) px-8 py-18 md:px-12 lg:px-16 lg:py-24">
        <div className="mx-auto grid w-full max-w-370 grid-cols-1 gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:gap-24">
          <div>
            <p className="text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-(--brand-glaucous)">
              Overview
            </p>
            <h2 className="mt-4 max-w-4xl text-[clamp(2rem,4.4vw,4.8rem)] font-heading leading-[0.94] tracking-[-0.05em] text-(--brand-blue)">
              {product.overviewTitle}
            </h2>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-[rgba(51,51,51,0.74)] md:text-[1.18rem]">
              {product.overviewBody}
            </p>
          </div>

          <div className="grid gap-10 border-t border-(--brand-border) pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
            {product.stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-[2.6rem] font-heading leading-none tracking-[-0.06em] text-(--brand-blue) md:text-[3.4rem]">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-medium uppercase tracking-[0.16em] text-(--brand-glaucous)">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section ref={storyRef} className="relative bg-(--brand-blue-soft) px-8 py-12 md:px-12 lg:px-16 lg:py-16">
        <div className="mx-auto grid w-full max-w-400 grid-cols-1 gap-12 lg:grid-cols-[1fr_0.88fr] lg:gap-18">
          <div ref={mediaRef} className="relative h-[65vh] overflow-hidden rounded-4xl lg:top-24 lg:h-[78vh]">
            <div className="absolute inset-0 overflow-hidden bg-(--brand-blue)">
              <div ref={mediaImageRef} className="absolute inset-0 will-change-transform">
                <Image
                  src={product.image}
                  alt={product.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 52vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,31,109,0.12)_0%,rgba(78,96,173,0.18)_42%,rgba(21,31,109,0.62)_100%)]" />
              </div>
            </div>

            <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 pt-6 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-white/78 md:px-8 md:pt-8">
              <span>{product.eyebrow}</span>
              <span>{String(activeChapter + 1).padStart(2, "0")}</span>
            </div>

            <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-6 md:px-8 md:pb-8">
              <div className="space-y-2">
                {product.chapters.map((chapter, index) => (
                  <div
                    key={chapter.id}
                    data-story-line
                    className={`h-px w-full origin-left bg-(--brand-tangerine) transition-opacity duration-300 ${activeChapter === index ? "opacity-100" : "opacity-25"}`}
                  />
                ))}
              </div>
              <p className="mt-5 max-w-md text-base leading-relaxed text-white/78 md:text-lg">
                {product.chapters[activeChapter]?.kicker}
              </p>
            </div>
          </div>

          <div className="relative">
            {product.chapters.map((chapter, index) => (
              <div
                key={chapter.id}
                ref={(element) => { chapterRefs.current[index] = element; }}
                className="flex min-h-[78vh] items-center border-b border-(--brand-border) py-14 last:border-b-0"
              >
                <div className={`max-w-2xl transition-opacity duration-500 ${activeChapter === index ? "opacity-100" : "opacity-42"}`}>
                  <p data-story-content className="text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-(--brand-glaucous)">
                    {chapter.eyebrow}
                  </p>
                  <h2 data-story-content className="mt-4 text-[clamp(2rem,4vw,4.8rem)] font-heading leading-[0.94] tracking-[-0.05em] text-(--brand-blue)">
                    {chapter.title}
                  </h2>
                  <p data-story-content className="mt-7 max-w-xl text-lg leading-relaxed text-[rgba(51,51,51,0.74)] md:text-[1.16rem]">
                    {chapter.body}
                  </p>

                  <div data-story-content className="mt-10 border-t border-(--brand-border) pt-8">
                    <p className="text-sm font-medium uppercase tracking-[0.16em] text-(--brand-tangerine)">
                      {chapter.kicker}
                    </p>
                    <div className="mt-5 grid gap-4">
                      {product.principles.map((principle) => (
                        <div key={`${chapter.id}-${principle}`} className="flex items-start gap-4 border-b border-(--brand-border) pb-4">
                          <span className="mt-1 block h-2.5 w-2.5 rounded-full bg-(--brand-tangerine)" />
                          <p className="text-base leading-relaxed text-[rgba(51,51,51,0.76)] md:text-lg">
                            {principle}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-(--brand-border) bg-(--brand-paper) px-8 py-18 md:px-12 lg:px-16 lg:py-24">
        <div className="mx-auto w-full max-w-400">
          <div className="flex items-end justify-between gap-8">
            <div>
              <p className="text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-(--brand-glaucous)">
                Related products
              </p>
              <h2 className="mt-4 text-[clamp(1.8rem,3vw,3.2rem)] font-heading leading-[0.95] tracking-[-0.04em] text-(--brand-blue)">
                Continue through the Aqua Pharma system.
              </h2>
            </div>
            <Link href="/" className="hidden text-sm font-medium uppercase tracking-[0.18em] text-(--brand-tangerine) transition-colors hover:text-(--brand-blue) md:block">
              Back to home
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
            {relatedProducts.map((entry, index) => (
              <Link
                key={entry.slug}
                href={entry.href}
                onClick={(event) => {
                  handleRelatedNavigation(event, entry, index);
                }}
                className="group block"
              >
                <div ref={(element) => { relatedImageRefs.current[index] = element; }} className="relative h-[36vh] overflow-hidden bg-(--brand-blue-soft) md:h-[44vh]">
                  <div className="absolute inset-0 scale-[1.06] transition-transform duration-700 ease-out group-hover:scale-100">
                    <Image
                      src={entry.image}
                      alt={entry.alt}
                      fill
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,31,109,0.04)_0%,rgba(21,31,109,0.32)_100%)]" />
                  </div>
                </div>

                <div className="border-t border-(--brand-border) pt-6">
                  <p className="text-[0.76rem] font-semibold uppercase tracking-[0.18em] text-(--brand-glaucous)">
                    {entry.eyebrow}
                  </p>
                  <h3 className="mt-4 text-[clamp(1.7rem,2.8vw,3rem)] font-heading leading-[0.98] tracking-[-0.04em] text-(--brand-blue) transition-colors group-hover:text-(--brand-tangerine)">
                    {entry.title}
                  </h3>
                  <p className="mt-4 max-w-xl text-base leading-relaxed text-[rgba(51,51,51,0.68)]">
                    {entry.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ContactSection />
      <Footer />
    </main>
  );
}