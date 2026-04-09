"use client";

import * as React from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Section } from "./section";
import { PartnerSection } from "./partners-section";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────

type Chapter = {
  id: string;
  subtitle: string;
  titleLines: string[];
  text: string;
  highlight: string;
  image: string;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const chapters: Chapter[] = [
  {
    id: "chapter-1",
    subtitle: "Trygghet",
    titleLines: ["Aquatiqs", "Mattrygghet-", "konsept"],
    text: "Vi dekker alle deler av verdikjeden for matproduksjon. Ved analyserer situasjonen, velger riktig utstyr og kjemi, og gir opplæring i henhold til de høyeste standarder.",
    highlight: "høyeste standarder",
    image: "/images/about/food.png",
  },
  {
    id: "chapter-2",
    subtitle: "Krav",
    titleLines: ["Kravene til", "Mattrygghet"],
    text: "Etter hvert som kravene til mattrygghet og dokumentasjon øker, blir det mer utfordrende å opprettholde konsekvente standarder gjennom hele verdikjeden. Små avvik kan få store konsekvenser.",
    highlight: "konsekvente standarder",
    image: "/images/about/cleaning.png",
  },
  {
    id: "chapter-3",
    subtitle: "Løsning",
    titleLines: ["Aquatiq", "med Bærekraftige", "Løsninger"],
    text: "Våre systemer er designet for å møte de høyeste standardene for sikkerhet og effektivitet. Vi kombinerer banebrytende teknologi med tiår med ekspertise for å levere løsninger som beskytter dine produkter og dine ansatte.",
    highlight: "banebrytende teknologi",
    image: "/images/about/solution.png",
  },
];

// ─── Highlight renderer ───────────────────────────────────────────────────────

function renderHighlightText(text: string, highlight: string) {
  const parts = text.split(highlight);
  if (parts.length === 1) return <>{text}</>;
  return (
    <>
      {parts.map((p, idx) => (
        <React.Fragment key={idx}>
          {p}
          {idx < parts.length - 1 && (
            <span className="text-[#151F6D] font-medium">{highlight}</span>
          )}
        </React.Fragment>
      ))}
    </>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function AboutSection() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".usp-item");

      items.forEach((item, i) => {
        const content = item.querySelector(".usp-content");
        const media = item.querySelector(".usp-media-wrapper > div");
        const isFirst = i === 0;

        // Animation for the text content
        // The text remains fixed but slides vertically based on the list item's scroll position.
        // For the first chapter we keep a smooth scrubbed animation. For later chapters
        // we avoid fade-ins — the text becomes visible immediately when centered and
        // only fades out when leaving.
        if (isFirst) {
          gsap.fromTo(
            content,
            { y: 0, autoAlpha: 1, visibility: "inherit" },
            {
              y: -50,
              autoAlpha: 1,
              visibility: "inherit",
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top 70%",
                end: "bottom 30%",
                scrub: 1.4,
              },
            }
          );
        } else {
          // Vertical motion (scrub-free) so the copy shifts slightly while centering
          gsap.fromTo(
            content,
            { y: 30, visibility: "hidden" },
            {
              y: -30,
              visibility: "inherit",
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top 70%",
                end: "bottom 30%",
                scrub: 0.6,
              },
            }
          );

          // Manage fade visibility with ScrollTrigger callbacks: show instantly on enter,
          // fade out on leave (both forward and backward).
          gsap.set(content, { autoAlpha: 0, visibility: "hidden" });

          ScrollTrigger.create({
            trigger: item,
            start: "top 70%",
            end: "bottom 30%",
            onEnter: () => {
              gsap.set(content, { autoAlpha: 1, visibility: "inherit" });
            },
            onEnterBack: () => {
              gsap.set(content, { autoAlpha: 1, visibility: "inherit" });
            },
            onLeave: () => {
              gsap.to(content, { autoAlpha: 0, duration: 0.28, visibility: "hidden" });
            },
            onLeaveBack: () => {
              gsap.to(content, { autoAlpha: 0, duration: 0.28, visibility: "hidden" });
            },
          });
        }

        // Parallax and slight scale for the image
        if (media) {
          gsap.fromTo(media,
            {
              y: -80,
              scale: 1.1
            },
            {
              y: 80,
              scale: 1.0,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.4,
              }
            }
          );
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section id="about" title="" variant="full-bleed-tight" containerClassName="p-0 border-t border-black/10">
      <section className="relative bg-[#F4F4F6] w-full overflow-clip" ref={containerRef}>

        {/* Decorative borders spanning the entire height, matching godaylight */}
        <div className="absolute top-0 bottom-0 left-[20%] w-px bg-black/5 hidden lg:block z-0 pointer-events-none"></div>
        <div className="absolute top-0 bottom-0 right-[20%] w-px bg-black/5 hidden lg:block z-0 pointer-events-none"></div>

        {/* Global title - simple, fading away as you scroll */}
        <div className="container mx-auto px-4 pt-32 pb-16 text-center lg:text-left z-10 relative">
          <span className="text-[10px] font-bold tracking-[0.25em] text-[#151F6D]/60 uppercase block mb-4">
            02 / Vår Historie
          </span>
        </div>

        <ul className="relative flex flex-col gap-0 pb-64 lg:pt-32 lg:pb-64 z-10 px-[6vw]">
          {chapters.map((chapter, index) => {
            // Alternate image placement: Right, Left, Right
            const imgColStart = index % 2 === 0 ? "lg:col-start-3" : "lg:col-start-1";

            return (
              <li
                key={chapter.id}
                className="usp-item lg:grid lg:grid-cols-[1fr_2fr_1fr] xl:grid-cols-[1fr_1.5fr_1fr] 2xl:grid-cols-[minmax(0,1fr)_800px_minmax(0,1fr)] lg:border-black/10 lg:border-b lg:first:border-t"
              >
                {/* TEXT CONTENT - Fixed in center */}
                <div className="relative py-32 lg:py-64 text-center lg:col-start-2 lg:row-start-1 lg:[clip-path:border-box]">
                  {/* The fixed container. Note `lg:fixed lg:inset-0` locks it in the viewport center */}
                  <div className="usp-content flex flex-col items-center justify-center gap-12 lg:fixed lg:inset-0 pointer-events-none px-4">

                    <p className="overflow-clip font-mono text-xs sm:text-sm text-[#151F6D]/60 uppercase tracking-widest">
                      <span>Kapittel 0{index + 1} &mdash; {chapter.subtitle}</span>
                    </p>

                    <h2 className="py-2 font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#1a1d1d] tracking-tight leading-[1.05] text-balance max-w-3xl">
                      {chapter.titleLines.join(" ")}
                    </h2>

                    <p className="text-base md:text-lg lg:text-[1.15rem] text-gray-600 max-w-xl leading-relaxed text-balance opacity-100 font-light">
                      {renderHighlightText(chapter.text, chapter.highlight)}
                    </p>

                  </div>
                </div>

                {/* MEDIA OUTLET - Alternating left/right wrapping blocks */}
                <figure className={`relative overflow-clip lg:row-start-1 ${imgColStart} border-y lg:border-y-0 border-black/10 flex ${index % 2 === 0 ? "justify-end" : "justify-start"}`}>

                  {/* This wrapper gives the image its aspect ratio and relative sizing boundaries */}
                  <div className="relative h-full w-full max-w-[90%] lg:max-w-[80%] aspect-4/5 lg:aspect-auto lg:h-[80vh] usp-media-wrapper overflow-clip">
                    {/* The div that GSAP animates for parallax */}
                    <div className="w-full h-full will-change-transform scale-110">
                      <Image
                        src={chapter.image}
                        alt={chapter.titleLines.join(" ")}
                        fill
                        sizes="(max-width: 1024px) 75vw, 25vw"
                        className="object-cover"
                        priority={index === 0}
                      />
                    </div>
                  </div>

                </figure>
              </li>
            );
          })}
        </ul>

      </section>

      <div className="bg-transparent pb-32">
        <PartnerSection />
      </div>
    </Section>
  );
}
