"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedArrowLink } from "../ui/AnimatedArrowCta";
import { ScrollReveal } from "../ui/ScrollReveal";
import { useSiteLocale } from "@/components/core/SiteLocaleProvider";

gsap.registerPlugin(ScrollTrigger);

export function News() {
    const { content } = useSiteLocale();
    const featuredNews = {
        ...content.home.news.featured,
        videoUrl: "/VIDEO-2025-10-15-09-56-06.mp4",
        link: "#",
    };
    const newsItems = content.home.news.items.map((item, index) => ({
        ...item,
        image: ["/news1.png", "/news2.png", "/news3.png"][index] ?? "/news1.png",
        link: "#",
    }));
    const sectionRef = useRef<HTMLElement>(null);
    const featuredMediaRef = useRef<HTMLDivElement>(null);
    const cardMediaRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [activeNewsIndex, setActiveNewsIndex] = useState<number | null>(null);

    useLayoutEffect(() => {
        if (!sectionRef.current) {
            return;
        }

        const media = gsap.matchMedia();
        const context = gsap.context(() => {
            media.add("(prefers-reduced-motion: reduce)", () => {
                if (featuredMediaRef.current) {
                    gsap.set(featuredMediaRef.current, { clearProps: "all" });
                }

                cardMediaRefs.current.filter(Boolean).forEach((mediaElement) => {
                    if (mediaElement) {
                        gsap.set(mediaElement, { clearProps: "transform" });
                    }
                });
            });

            media.add("(prefers-reduced-motion: no-preference)", () => {
                if (featuredMediaRef.current) {
                    gsap.fromTo(
                        featuredMediaRef.current,
                        { clipPath: "inset(10% 0% 10% 0%)", yPercent: -8, scale: 1.08 },
                        {
                            clipPath: "inset(0% 0% 0% 0%)",
                            yPercent: 0,
                            scale: 1,
                            duration: 1.1,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: featuredMediaRef.current,
                                start: "top 86%",
                            },
                        }
                    );
                }

                cardMediaRefs.current.filter(Boolean).forEach((mediaElement) => {
                    if (!mediaElement) {
                        return;
                    }

                    gsap.fromTo(
                        mediaElement,
                        { yPercent: -6, scale: 1.06 },
                        {
                            yPercent: 6,
                            scale: 1,
                            ease: "none",
                            scrollTrigger: {
                                trigger: mediaElement,
                                start: "top bottom",
                                end: "bottom top",
                                scrub: true,
                            },
                        }
                    );
                });
            });
        }, sectionRef);

        return () => {
            media.revert();
            context.revert();
        };
    }, []);

    return (
        <div className="relative z-10 w-full">
            <section ref={sectionRef} className="bg-(--brand-paper) px-6 py-32 md:px-12 lg:px-20">
            <div className="mx-auto max-w-[100rem]">
                <ScrollReveal className="mb-16 md:mb-24" duration={0.76} yOffset={14} start="top 92%">
                    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <h2 className="font-heading text-[clamp(2.5rem,4vw,3.5rem)] font-light uppercase tracking-wide text-(--brand-blue)">
                            {content.home.news.title}
                        </h2>
                        <AnimatedArrowLink href="/about/media" className="text-[0.8rem] font-medium tracking-[0.15em] uppercase text-(--brand-blue)/80 transition-colors hover:text-(--brand-blue)">
                            {content.home.news.viewAll}
                        </AnimatedArrowLink>
                    </div>
                </ScrollReveal>

                <ScrollReveal className="mb-24" duration={0.8} yOffset={16} start="top 92%">
                    <div className="group/news-card flex flex-col items-center gap-12 overflow-hidden bg-white/70 p-5 backdrop-blur-sm transition-transform duration-500 hover:-translate-y-1 hover:scale-[1.015] focus-within:scale-[1.015] md:p-7 lg:flex-row lg:gap-20">
                        <div ref={featuredMediaRef} className="news-featured-media relative h-[50vh] w-full overflow-hidden bg-black/5 md:h-[65vh] lg:w-[60%]">
                            <video
                                src={featuredNews.videoUrl}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="h-full w-full object-cover transition-transform duration-[1.5s] ease-out group-hover/news-card:scale-105"
                            />
                        </div>
                        <div className="flex flex-col justify-center py-4 lg:w-[40%]">
                            <span className="mb-6 text-[0.65rem] font-medium uppercase tracking-[0.35em] text-(--brand-blue)/50">
                                {featuredNews.category}
                            </span>
                            <h3 className="mb-8 text-[clamp(1.8rem,2.5vw,2.8rem)] font-light leading-[1.15] tracking-wide text-(--brand-blue) transition-colors duration-500">
                                {featuredNews.title}
                            </h3>
                            <div className="mb-8 h-px w-12 bg-(--brand-blue)/20" />
                            <p className="mb-10 text-[1.15rem] font-light leading-[1.8] text-(--brand-dark)/70 md:text-[1.15rem]">
                                {featuredNews.description}
                            </p>
                            <AnimatedArrowLink
                                href={featuredNews.link}
                                className="mt-2 text-[0.8rem] font-medium uppercase tracking-[0.15em] text-(--brand-tangerine)"
                                motionClassName="group-hover/news-card:translate-x-0 group-focus-within/news-card:translate-x-0"
                            >
                                {content.home.news.readStory}
                            </AnimatedArrowLink>
                        </div>
                    </div>
                </ScrollReveal>

                <ScrollReveal duration={0.72} yOffset={14} staggerChildren staggerAmount={0.05} start="top 93%">
                <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-3">
                    {newsItems.map((item, index) => (
                        <article
                            key={item.title}
                            onMouseEnter={() => setActiveNewsIndex(index)}
                            onMouseLeave={() => setActiveNewsIndex(null)}
                            onFocus={() => setActiveNewsIndex(index)}
                            onBlur={() => setActiveNewsIndex(null)}
                            className={`group/news-card flex flex-col gap-6 overflow-hidden bg-white/70 p-5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:scale-[1.015] focus-within:scale-[1.015] md:p-6 ${activeNewsIndex !== null && activeNewsIndex !== index ? "scale-[0.985] opacity-55" : "opacity-100"}`}
                        >
                            <div
                                ref={(element) => {
                                    cardMediaRefs.current[index] = element;
                                }}
                                className="relative aspect-[4/3] w-full overflow-hidden bg-black/5"
                            >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover transition-transform duration-[1.5s] ease-out group-hover/news-card:scale-105"
                                />
                                <div className="absolute inset-x-0 top-0 h-px bg-white/40" />
                            </div>
                            <div className="flex flex-col gap-4">
                                <span className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-(--brand-blue)/50">
                                    {item.category}
                                </span>
                                <h3 className="text-[1.3rem] md:text-[1.4rem] font-light leading-[1.25] tracking-wide text-(--brand-blue)">
                                    {item.title}
                                </h3>
                                <div className={`h-px bg-(--brand-blue)/18 transition-all duration-300 ${activeNewsIndex === index ? "w-18" : "w-10"}`} />
                                <p className="mt-2 line-clamp-3 text-[0.95rem] font-light leading-[1.7] text-(--brand-dark)/60">
                                    {item.description}
                                </p>
                                <AnimatedArrowLink
                                    href={item.link}
                                    className="mt-4 text-[0.75rem] font-medium uppercase tracking-[0.15em] text-(--brand-tangerine)"
                                    motionClassName="group-hover/news-card:translate-x-0 group-focus-within/news-card:translate-x-0"
                                >
                                    {content.home.news.readArticle}
                                </AnimatedArrowLink>
                            </div>
                        </article>
                    ))}
                </div>
                </ScrollReveal>
            </div>
            </section>
        </div>
    );
}
