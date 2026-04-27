"use client";

import React, { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedArrowLink } from "../ui/AnimatedArrowCta";
import { SplitTextAnimate } from "../ui/SplitTextAnimate";
import { products, type ProductRecord } from "@/data/products";
import { useProductTransition } from "../core/ProductTransitionProvider";

gsap.registerPlugin(ScrollTrigger);

function formatSectionIndex(index: number) {
  return String(index + 1).padStart(3, "0");
}



/** A single product card styled exactly like lovart.ai posters */
/** Card representing a site section (Bath, Conditioning, Dosing) */
function SectionCard({
  section,
  index,
  cardRef,
  imgFrameRef,
  imgRef,
  imgWrapperRef,
  onNavigate,
}: {
  section: ProductRecord;
  index: number;
  cardRef: React.RefCallback<HTMLDivElement>;
  imgFrameRef: React.RefCallback<HTMLDivElement>;
  imgRef: React.RefCallback<HTMLImageElement>;
  imgWrapperRef: React.RefCallback<HTMLDivElement>;
  onNavigate: (event: React.MouseEvent<HTMLAnchorElement>) => void;
}) {
  return (
    <article ref={cardRef} className="lovart-card group group/sectioncard relative will-change-[transform,filter,opacity] max-w-105 w-full mx-auto">
      <Link href={section.href} className="group block" onClick={onNavigate}>
        <div ref={imgFrameRef} className="relative w-full overflow-hidden bg-black/4 h-[28vh] md:h-[36vh] lg:h-[44vh]">
          {/* SplitMedia-style: oversized inner wrapper so the image can parallax/scale without showing gaps */}
          <div ref={imgWrapperRef} className="absolute w-full h-[120%] -top-[10%] will-change-transform">
            <Image
              ref={imgRef}
              src={section.image}
              alt={section.alt}
              fill
              sizes="(max-width: 768px) 45vw, 22vw"
              className="object-cover object-center transition-opacity duration-300 lg:opacity-70 lg:group-hover:opacity-100 will-change-[transform,filter]"
            />
          </div>
        </div>

        <p className="mt-4 text-[0.9rem] text-[#1a1d1d]/48 md:mt-7">
          {formatSectionIndex(index)}
        </p>

        <h3 className="mt-2 border-b border-black/20 pb-4 text-[clamp(1.8rem,2.8vw,3rem)] font-light leading-[1.06] tracking-[-0.03em] text-[#111111] md:mt-4 md:pb-5">
          {section.title}
        </h3>
      </Link>

      <AnimatedArrowLink
        href={section.href}
        onClick={onNavigate}
        className="mt-4 text-[0.95rem] text-(--brand-tangerine) opacity-80 transition-opacity duration-300 hover:opacity-100 group-hover:opacity-100 md:mt-7"
        motionClassName="group-hover/sectioncard:translate-x-0"
        aria-label={`${section.cta}: ${section.description}`}
      >
        {section.cta}
      </AnimatedArrowLink>

    </article>
  );
}

export function ProductSection() {
  const { startProductTransition } = useProductTransition();
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imgFramesRef = useRef<(HTMLDivElement | null)[]>([]);
  const imgsRef = useRef<(HTMLImageElement | null)[]>([]);
  const imgWrappersRef = useRef<(HTMLDivElement | null)[]>([]);

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

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    const imgs = imgsRef.current.filter(Boolean) as HTMLImageElement[];
    const imgWrappers = imgWrappersRef.current.filter(Boolean) as HTMLDivElement[];
    if (cards.length === 0) return;

    const ctx = gsap.context(() => {
      // Set initial states.
      const animatedCards = cards;
      const animatedImgs = imgs;

      // All cards start hidden to animate in after the title
      animatedCards.forEach((card, i) => {
        const img = animatedImgs[i];
        const wrapper = imgWrappers[i];
        gsap.set(card, { opacity: 0, y: 40, filter: "blur(8px)", scale: 0.98 });
        if (img) gsap.set(img, { scale: 1.1, filter: "blur(8px)" });
        if (wrapper) gsap.set(wrapper, { y: "8%" });
      });

      // Pin the section to scroll through the reveals
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 20%",
          end: `+=${window.innerHeight * 1.1}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      const revealDuration = 0.6;
      const revealStagger = 0.4;
      const totalDuration = (animatedCards.length - 1) * revealStagger + revealDuration;

      // Parallax: all image wrappers pan from 10% to -10% across the full scrub
      imgWrappers.forEach((wrapper) => {
        tl.to(
          wrapper,
          { y: "-10%", ease: "none", duration: totalDuration },
          0
        );
      });

      animatedCards.forEach((card, i) => {
        const img = animatedImgs[i];
        const startAt = i * revealStagger;

        tl.to(
          card,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            scale: 1,
            ease: "power2.out",
            duration: revealDuration,
          },
          startAt
        );

        if (img) {
          tl.to(
            img,
            {
              scale: 1,
              filter: "blur(0px)",
              ease: "power2.out",
              duration: revealDuration,
            },
            startAt
          );
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="products"
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col overflow-hidden bg-(--brand-paper) px-8 pb-16"
    >
      {/* ---------- Title — split-text, fires as section enters viewport ---------- */}
      <div className="absolute top-0 left-0 w-full flex justify-center">
        <h2 className="sr-only">Choose your treatment category.</h2>
        <SplitTextAnimate
          text="Choose your treatment category."
          triggerRef={sectionRef}
          once
          className="whitespace-nowrap text-center font-heading text-[clamp(2rem,4vw,3.5rem)] leading-[1.1] tracking-[-0.03em] text-(--brand-blue)"
        />
      </div>

      {/* ---------- Cards grid — independently centred in full height ---------- */}
      <div className="flex-1 flex items-center w-full">
        <div className="w-full">
          <div className="mx-auto grid max-w-315 justify-items-center grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-8 2xl:gap-10">
            {products.map((section, index) => (
              <div key={section.id} className="flex w-full justify-center">
                <SectionCard
                  section={section}
                  index={index}
                  cardRef={(el) => { cardsRef.current[index] = el; }}
                  imgFrameRef={(el) => { imgFramesRef.current[index] = el; }}
                  imgRef={(el) => { imgsRef.current[index] = el; }}
                  imgWrapperRef={(el) => { imgWrappersRef.current[index] = el; }}
                  onNavigate={(event) => {
                    handleProductNavigation(event, section, index);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}