"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { ProductRecord } from "@/data/products";

type ProductHeroAnimatedProps = {
  product: ProductRecord;
};

export function ProductHeroAnimated({ product }: ProductHeroAnimatedProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (
      !imageRef.current ||
      !gradientRef.current ||
      !contentRef.current ||
      !eyebrowRef.current ||
      !titleRef.current ||
      !descriptionRef.current
    ) {
      return;
    }

    const masterTimeline = gsap.timeline();

    // Step 1: Image zoom in (0s - 0.9s)
    masterTimeline.from(
      imageRef.current,
      {
        scale: 0.95,
        opacity: 0,
        duration: 0.9,
        ease: "power2.out",
      },
      0,
    );

    // Step 2: Gradient effects fade in (0.4s - 1.2s, overlaps with zoom)
    masterTimeline.from(
      gradientRef.current,
      {
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      0.4,
    );

    // Step 3: Text appears animated (0.8s - end, after image settles)
    // Eyebrow
    masterTimeline.from(
      eyebrowRef.current,
      {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      },
      0.8,
    );

    // Title (split into words for stagger)
    const titleWords = titleRef.current.querySelectorAll("span");
    if (titleWords.length > 0) {
      masterTimeline.from(
        titleWords,
        {
          y: 32,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.08,
        },
        0.95,
      );
    } else {
      // Fallback if words aren't wrapped
      masterTimeline.from(
        titleRef.current,
        {
          y: 32,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        0.95,
      );
    }

    // Description
    masterTimeline.from(
      descriptionRef.current,
      {
        y: 24,
        opacity: 0,
        duration: 0.65,
        ease: "power3.out",
      },
      1.15,
    );
  }, { scope: heroRef });

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-(--brand-blue) text-white"
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0"
      >
        <Image
          src={product.image}
          alt={product.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      {/* Gradient Overlay Effects */}
      <div
        ref={gradientRef}
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,31,109,0.24)_0%,rgba(78,96,173,0.32)_30%,rgba(21,31,109,0.78)_100%)]"
      />

      {/* Content */}
      <div className="relative mx-auto flex min-h-screen w-full max-w-400 items-end px-8 pb-16 pt-32 md:px-12 md:pb-20 lg:px-16">
        <div ref={contentRef} className="max-w-4xl">
          <p
            ref={eyebrowRef}
            className="text-[0.78rem] font-semibold uppercase tracking-[0.2em] text-white/72"
          >
            {product.eyebrow}
          </p>

          <h1
            ref={titleRef}
            className="mt-5 text-[clamp(3rem,7vw,7rem)] font-heading leading-[0.9] tracking-[-0.05em] text-white"
          >
            {product.title.split(" ").map((word, idx) => (
              <span key={idx} className="inline-block">
                {word}
                {idx < product.title.split(" ").length - 1 && "\u00A0"}
              </span>
            ))}
          </h1>

          <p
            ref={descriptionRef}
            className="mt-6 max-w-2xl text-base leading-relaxed text-white/78 md:text-xl"
          >
            {product.heroSummary}
          </p>
        </div>
      </div>
    </section>
  );
}
