"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { ProductRecord } from "@/data/products";

type ProductHeroSectionProps = {
  product: ProductRecord;
};

export function ProductHeroSection({ product }: ProductHeroSectionProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (
        !imageRef.current ||
        !gradientRef.current ||
        !eyebrowRef.current ||
        !titleRef.current ||
        !descriptionRef.current
      ) {
        return;
      }

      const titleWords = titleRef.current.querySelectorAll("span");
      const timeline = gsap.timeline();

      timeline
        .from(
          imageRef.current,
          {
            scale: 0.95,
            opacity: 0,
            duration: 0.9,
            ease: "power2.out",
          },
          0,
        )
        .from(
          gradientRef.current,
          {
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          },
          0.35,
        )
        .from(
          eyebrowRef.current,
          {
            y: 18,
            opacity: 0,
            duration: 0.55,
            ease: "power3.out",
          },
          0.75,
        )
        .from(
          titleWords.length > 0 ? titleWords : titleRef.current,
          {
            y: 30,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: titleWords.length > 0 ? 0.08 : 0,
          },
          0.92,
        )
        .from(
          descriptionRef.current,
          {
            y: 24,
            opacity: 0,
            duration: 0.65,
            ease: "power3.out",
          },
          1.12,
        );
    },
    { scope: heroRef },
  );

  const words = product.title.split(" ");

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen overflow-hidden bg-(--brand-blue) text-white"
    >
      <div ref={imageRef} className="absolute inset-0">
        <Image
          src={product.image}
          alt={product.alt}
          fill
          preload
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>

      <div
        ref={gradientRef}
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,31,109,0.14)_0%,rgba(21,31,109,0.3)_34%,rgba(13,18,55,0.82)_100%)]"
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(246,175,110,0.16)_0%,rgba(246,175,110,0)_24%),linear-gradient(90deg,rgba(245,243,234,0.05)_0%,rgba(245,243,234,0)_30%)]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-400 items-end px-8 pb-14 pt-32 md:px-12 md:pb-18 lg:px-16 lg:pb-20">
        <div className="max-w-[72rem]">
          <p
            ref={eyebrowRef}
            className="text-[0.76rem] font-semibold uppercase tracking-[0.24em] text-white/70"
          >
            {product.eyebrow}
          </p>

          <div className="mt-5 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(22rem,0.52fr)] lg:items-end lg:gap-14">
            <h1
              ref={titleRef}
              className="text-[clamp(3.2rem,7.6vw,7.3rem)] font-heading leading-[0.88] tracking-[-0.06em] text-white"
            >
              {words.map((word, index) => (
                <span key={`${product.slug}-${word}-${index}`} className="inline-block">
                  {word}
                  {index < words.length - 1 && "\u00A0"}
                </span>
              ))}
            </h1>

            <div className="max-w-xl border-t border-white/14 pt-5 lg:mb-2">
              <p
                ref={descriptionRef}
                className="text-[1.02rem] leading-[1.65] text-white/76 md:text-[1.1rem]"
              >
                {product.heroSummary}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}