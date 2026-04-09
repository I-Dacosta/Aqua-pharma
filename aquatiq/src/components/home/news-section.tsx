"use client";

import React, { useRef, useState, useMemo, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, Hand } from "lucide-react";
import { Section } from "./section";
import { ThemeContext } from "./ThemeController";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Slide = {
  tag: string;
  title: string;
  description: string;
  image: string;
  href: string;
};

const slides: Slide[] = [
  {
    tag: "EasyX Partnerskap",
    title: "Aquatiq og EasyX inngår partnerskap",
    description:
      "Samarbeidet bringer sammen komplementær ekspertise for landbasert oppdrett.",
    image: "/images/news/easyx.png",
    href: "/news/easyx",
  },
  {
    tag: "ADR Transport",
    title: "ADR og transport av farlig gods",
    description:
      "Transport av kjemikalier krever spesifikk kompetanse og godkjenning.",
    image: "/images/news/ADR.png",
    href: "/news/adr",
  },
  {
    tag: "Matsikkerhet",
    title: "Frank Yiannas og Aquatiq i partnerskap",
    description:
      "Sammen for å fremme global kompetanse i etableringen av matsikkerhet.",
    image: "/images/news/frank.png",
    href: "/news/frank-yiannas",
  },
  {
    tag: "Baiada Partnerskap",
    title: "Aquatiq i partnerskap med Baiada",
    description:
      "Leverer Australias mest avanserte automatiserte rengjøringssystem.",
    image: "/images/news/baida.png",
    href: "/news/baiada",
  },
  {
    tag: "Ekspansjon",
    title: "Aquatiq utvider til Island!",
    description:
      "Oppdag Aquatiqs siste strategiske trekk innen bærekraftig matproduksjon.",
    image: "/images/news/island.png",
    href: "/news/iceland",
  },
];

function TitleWithLogo({
  title,
  isDark,
  imageClassName,
}: {
  title: string;
  isDark: boolean;
  imageClassName: string;
}) {
  if (!title.startsWith("A")) {
    return <>{title}</>;
  }

  return (
    <span className="inline-flex items-baseline gap-[0.4em]">
      <span className={`relative shrink-0 ${imageClassName}`}>
        <Image
          src={isDark ? "/images/logo/white-a-logo.png" : "/images/logo/blue-a-logo.png"}
          alt="A"
          fill
          className="relative object-contain scale-[1.7] translate-y-[0.05em]"
        />
      </span>
      <span>{title.slice(1)}</span>
    </span>
  );
}

type CursorMode = "nav-left" | "nav-right" | "click" | "drag";
const PRELOAD_RADIUS = 2;

export function NewsSection() {
  const { isDark } = useContext(ThemeContext);
  const router = useRouter();

  const extendedSlides = useMemo(
    () => [...slides, ...slides, ...slides, ...slides, ...slides],
    []
  );
  const loopStart = slides.length * 2;
  const loopEnd = slides.length * 3;

  const [activeIndex, setActiveIndex] = useState(loopStart);
  const activeIndexRef = useRef(loopStart);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const viewportRef = useRef<HTMLDivElement | null>(null);
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLDivElement | null>>([]);
  const isScrollingTimeout = useRef<NodeJS.Timeout | undefined>(undefined);

  const [isHover, setIsHover] = useState(false);
  const [cursorMode, setCursorMode] = useState<CursorMode>("nav-right");
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const computeActiveIndex = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const scrollerRect = scroller.getBoundingClientRect();
    const centerX = scrollerRect.left + scrollerRect.width / 2;

    let bestIdx = 0;
    let bestDist = Number.POSITIVE_INFINITY;

    for (let index = 0; index < extendedSlides.length; index += 1) {
      const element = cardRefs.current[index];
      if (!element) continue;

      const rect = element.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = Math.abs(cardCenter - centerX);

      if (distance < bestDist) {
        bestDist = distance;
        bestIdx = index;
      }
    }

    setActiveIndex(bestIdx);
  };

  const scrollToIndex = (idx: number, behavior: ScrollBehavior = "smooth") => {
    const scroller = scrollerRef.current;
    const card = cardRefs.current[idx];
    if (!scroller || !card) return;

    const scrollerRect = scroller.getBoundingClientRect();
    const cardRect = card.getBoundingClientRect();

    const scrollerCenter = scroller.scrollLeft + scrollerRect.width / 2;
    const cardCenter =
      scroller.scrollLeft + (cardRect.left - scrollerRect.left) + cardRect.width / 2;

    scroller.scrollTo({
      left: scroller.scrollLeft + (cardCenter - scrollerCenter),
      behavior,
    });
  };

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    let raf = 0;

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => computeActiveIndex());

      clearTimeout(isScrollingTimeout.current);
      isScrollingTimeout.current = setTimeout(() => {
        const idx = activeIndexRef.current;
        const setLength = slides.length;
        const firstCard = cardRefs.current[setLength];
        const nextSetFirstCard = cardRefs.current[setLength * 2];

        if (firstCard && nextSetFirstCard) {
          const stride = nextSetFirstCard.offsetLeft - firstCard.offsetLeft;

          if (idx < loopStart) {
            scroller.scrollTo({ left: scroller.scrollLeft + stride, behavior: "auto" });
          } else if (idx >= loopEnd) {
            scroller.scrollTo({ left: scroller.scrollLeft - stride, behavior: "auto" });
          }
        }
      }, 150);
    };

    scroller.addEventListener("scroll", onScroll, { passive: true });

    requestAnimationFrame(() => {
      scrollToIndex(loopStart, "auto");
    });

    return () => {
      cancelAnimationFrame(raf);
      scroller.removeEventListener("scroll", onScroll);
      clearTimeout(isScrollingTimeout.current);
    };
  }, [extendedSlides.length, loopEnd, loopStart]);

  useEffect(() => {
    const count = extendedSlides.length;
    if (!count) return;

    const indices = new Set<number>([activeIndex]);

    for (let offset = 1; offset <= PRELOAD_RADIUS; offset += 1) {
      indices.add((activeIndex + offset) % count);
      indices.add((activeIndex - offset + count) % count);
    }

    indices.forEach((idx) => {
      const src = extendedSlides[idx]?.image;
      if (!src) return;
      const img = new window.Image();
      img.src = src;
    });

    indices.forEach((idx) => {
      const href = extendedSlides[idx]?.href;
      if (href) {
        router.prefetch(href);
      }
    });
  }, [activeIndex, extendedSlides, router]);

  const next = () => scrollToIndex(activeIndex + 1);
  const prev = () => scrollToIndex(activeIndex - 1);

  const isDragging = useRef(false);
  const hasDragged = useRef(false);
  const startX = useRef(0);
  const scrollLeftStart = useRef(0);

  const onDragStart = (event: React.PointerEvent) => {
    if (event.button !== 0) return;
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = event.pageX;
    setCursorMode("drag");

    if (scrollerRef.current) {
      scrollLeftStart.current = scrollerRef.current.scrollLeft;
      scrollerRef.current.style.scrollSnapType = "none";
      scrollerRef.current.setPointerCapture(event.pointerId);
    }
  };

  const onDragMove = (event: React.PointerEvent) => {
    if (!isDragging.current || !scrollerRef.current) return;

    setCursorMode("drag");
    const walk = (event.pageX - startX.current) * 2.5;

    if (Math.abs(walk) > 5) {
      hasDragged.current = true;
      event.preventDefault();
      scrollerRef.current.scrollLeft = scrollLeftStart.current - walk;
    }
  };

  const onDragEnd = (event: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;

    if (scrollerRef.current) {
      scrollerRef.current.style.scrollSnapType = "x mandatory";

      if (scrollerRef.current.hasPointerCapture(event.pointerId)) {
        scrollerRef.current.releasePointerCapture(event.pointerId);
      }

      if (hasDragged.current) {
        computeActiveIndex();
        scrollToIndex(activeIndexRef.current);
      }
    }

    if (viewportRef.current) {
      const rect = viewportRef.current.getBoundingClientRect();
      setCursorMode(event.clientX - rect.left < rect.width / 2 ? "nav-left" : "nav-right");
    }
  };

  const onClickCapture = (event: React.MouseEvent) => {
    if (hasDragged.current) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const onMove = (event: PointerEvent) => {
      setCursorPos({ x: event.clientX, y: event.clientY });

      if (isDragging.current) {
        setCursorMode("drag");
        return;
      }

      const rect = viewport.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const target = event.target as HTMLElement | null;
      const card = target?.closest?.("[data-news-card]") as HTMLElement | null;

      if (card && card.getAttribute("data-active") === "true") {
        setCursorMode("click");
        return;
      }

      setCursorMode(x < rect.width / 2 ? "nav-left" : "nav-right");
    };

    viewport.addEventListener("pointermove", onMove);
    return () => viewport.removeEventListener("pointermove", onMove);
  }, []);

  const onViewportClick = (event: React.MouseEvent) => {
    if (hasDragged.current) return;

    const target = event.target as HTMLElement | null;
    const card = target?.closest?.("[data-news-card]") as HTMLElement | null;

    if (card && card.getAttribute("data-active") === "true" && target?.closest?.("a")) {
      return;
    }

    if (cursorMode === "nav-left") {
      prev();
      return;
    }

    next();
  };

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const onWheelNative = (event: WheelEvent) => {
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        event.preventDefault();
        scroller.scrollLeft += event.deltaX * 2.5;
      }
    };

    scroller.addEventListener("wheel", onWheelNative, { passive: false });
    return () => scroller.removeEventListener("wheel", onWheelNative);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".news-header-element", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: viewportRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      const mediaElements = gsap.utils.toArray<HTMLElement>(".news-card-media");
      mediaElements.forEach((element) => {
        const trigger = element.closest(".news-val-card");
        if (!trigger || !scrollerRef.current) return;

        gsap.fromTo(
          element,
          { x: "-10%" },
          {
            x: "10%",
            ease: "none",
            scrollTrigger: {
              trigger,
              start: "left right",
              end: "right left",
              horizontal: true,
              scroller: scrollerRef.current,
              scrub: true,
            },
          }
        );
      });
    }, viewportRef);

    return () => ctx.revert();
  }, []);

  return (
    <Section id="news" title="" variant="full-bleed" containerClassName="p-0">
      <section
        className={`relative w-full overflow-hidden flex flex-col py-12 md:py-16 lg:py-20 border-t transition-colors duration-700 ${
          isDark ? "text-white border-white/10" : "text-[#1a1d1d] border-[#1a1d1d]/10"
        }`}
      >
        <div className="px-[6vw] mb-8 md:mb-10">
          <div className="news-header flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span
                className={`news-header-element block mb-5 text-[10px] font-bold tracking-[0.25em] uppercase transition-colors duration-700 ${
                  isDark ? "text-white/50" : "text-[#1a1d1d]/50"
                }`}
              >
                03 / Nyheter & Innsikt
              </span>
              <h2
                className={`news-header-element text-5xl md:text-7xl lg:text-[86px] font-thin tracking-tighter leading-[0.88] transition-colors duration-700 ${
                  isDark ? "text-white" : "text-[#1a1d1d]"
                }`}
              >
                <TitleWithLogo
                  title="A Papers"
                  isDark={isDark}
                  imageClassName="mr-[0.08em] h-[1.1em] w-[0.78em]"
                />
              </h2>
            </div>
            <div className="max-w-xs flex flex-col gap-5 pointer-events-auto">
              <p
                className={`news-header-element text-sm leading-relaxed transition-colors duration-700 ${
                  isDark ? "text-white/55" : "text-[#1a1d1d]/55"
                }`}
              >
                Siste Nytt
              </p>
              <Link
                href="/shop"
                className={`group inline-flex items-center gap-3 text-xs font-bold uppercase tracking-widest transition-all hover:gap-5 duration-700 ${
                  isDark ? "text-white" : "text-[#1a1d1d]"
                }`}
              >
                finn ut mer
                <div className="flex h-8 w-8 items-center justify-center bg-[#151F6D]/10 group-hover:bg-[#151F6D] group-hover:text-white transition-colors">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div
          ref={viewportRef}
          className="relative w-full overflow-hidden cursor-none"
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onClick={onViewportClick}
        >
          <div
            className={`pointer-events-none fixed top-0 left-0 z-50 flex h-14 w-14 items-center justify-center rounded-full transition-all duration-100 ease-out will-change-transform ${
              isHover ? "scale-100 opacity-100" : "scale-0 opacity-0"
            } ${isDark ? "bg-white text-black" : "bg-[#1a1d1d] text-white"}`}
            style={{
              transform: `translate3d(${cursorPos.x - 28}px, ${cursorPos.y - 28}px, 0)`,
            }}
          >
            {cursorMode === "nav-left" && <ArrowLeft className="h-6 w-6" />}
            {cursorMode === "nav-right" && <ArrowRight className="h-6 w-6" />}
            {cursorMode === "click" && <ArrowRight className="h-6 w-6 -rotate-45" />}
            {cursorMode === "drag" && <Hand className="h-6 w-6" />}
          </div>

          <div
            ref={scrollerRef}
            className="hide-scrollbar flex w-full overflow-x-auto snap-x snap-mandatory py-12 touch-pan-x"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onPointerDown={onDragStart}
            onPointerMove={onDragMove}
            onPointerUp={onDragEnd}
            onPointerLeave={onDragEnd}
            onClickCapture={onClickCapture}
          >
            {extendedSlides.map((slide, idx) => {
              const isActive = idx === activeIndex;

              return (
                <div
                  key={`${idx}-${slide.title}`}
                  data-news-card="true"
                  data-active={isActive ? "true" : "false"}
                  ref={(el) => {
                    cardRefs.current[idx] = el;
                  }}
                  className={`snap-center shrink-0 px-4 md:px-8 flex flex-col justify-end transition-all duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] ${
                    isActive
                      ? "w-[85vw] md:w-[60vw] lg:w-[45vw] scale-100 opacity-100"
                      : "w-[85vw] md:w-[60vw] lg:w-[45vw] scale-[0.98] opacity-40 grayscale"
                  }`}
                >
                  <Link
                    href={slide.href}
                    draggable={false}
                    className={`news-val-card group relative block w-full aspect-4/3 md:aspect-video overflow-hidden border cursor-none select-none transition-colors duration-700 ${
                      isActive ? "" : "pointer-events-none"
                    } ${isDark ? "border-white/10 bg-[#252828]" : "border-[#1a1d1d]/10 bg-[#f6f6f6]"}`}
                  >
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      draggable={false}
                      className="news-card-media pointer-events-none object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent select-none" />

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col justify-end p-6 md:p-10 select-none">
                      <span className="mb-3 text-[10px] font-bold tracking-widest text-[#FDEA10] uppercase">
                        {slide.tag}
                      </span>
                      <h3 className="line-clamp-2 text-2xl md:text-3xl lg:text-4xl font-light tracking-tight leading-tight text-white">
                        {slide.title}
                      </h3>
                      {isActive && (
                        <div className="mt-4 overflow-hidden">
                          <p className="animate-in slide-in-from-bottom-5 fade-in duration-500 line-clamp-2 text-sm md:text-base leading-relaxed text-white/60">
                            {slide.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Section>
  );
}