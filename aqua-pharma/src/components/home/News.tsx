"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { AnimatedArrowLink } from "../ui/AnimatedArrowCta";
import { SectionDivider } from "../ui/SectionDivider";

const featuredNews = {
    category: "PARTNERSHIP & INNOVATION",
    title: "Monagold Farm — Advancing Aquaculture Technology",
    description: "The Monagold farm in Australia is pioneering next-generation aquaculture practices by trialing new feeding and water monitoring technology from AQ1, and collaborating with BioMar on an ongoing feed trial during the current cultivation. This partnership represents our commitment to sustainable, data-driven farming practices.",
    videoUrl: "/VIDEO-2025-10-15-09-56-06.mp4",
    link: "#"
};

const newsItems = [
    {
        category: "BEST PRACTICES",
        title: "Chile Releases Best Practices Manual for Paramove®",
        description: "Aqua Pharma Chile has released a comprehensive Best Practices Manual for using Paramove® in immersion treatments to control Caligus rogercresseyi in salmon farming.",
        image: "/news1.png",
        link: "#"
    },
    {
        category: "RESEARCH & DEVELOPMENT",
        title: "First Cultivation Successfully Concluded",
        description: "On January 31st, 2024, our research facility achieved its first successful harvest, reaching our target DOC 90 with survival rates exceeding 80% in some ponds.",
        image: "/news2.png",
        link: "#"
    },
    {
        category: "SAFETY & OPERATIONS",
        title: "Emergency Simulation Exercise Completed",
        description: "The Aqua Pharma Chile team successfully conducted a comprehensive emergency simulation on November 14, 2025, testing coordination with emergency responders and local authorities.",
        image: "/news3.png",
        link: "#"
    },
];

export function News() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Filter out nulls from refs (just in case)
            const validCards = cardsRef.current.filter(Boolean);

            // Staggered fade up for all article items
            gsap.fromTo(
                validCards,
                {
                    y: 80,
                    opacity: 0,
                },
                {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    },
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    stagger: 0.15,
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className="relative z-10 w-full">
            <section ref={sectionRef} className="bg-(--brand-paper) py-32 px-8">
            <div className="max-w-350 mx-auto">
                <div className="flex justify-between items-end mb-16">
                    <h2 className="text-sm font-semibold uppercase tracking-widest text-(--brand-glaucous)">
                        News
                    </h2>
                    <AnimatedArrowLink href="#" className="text-sm font-medium text-(--brand-tangerine) transition-opacity hover:opacity-80">
                        All news
                    </AnimatedArrowLink>
                </div>

                {/* Featured Article — Video */}
                <div
                    ref={(el) => { cardsRef.current[0] = el; }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-24 items-center group"
                >
                    <div className="lg:col-span-7 relative h-[60vh] w-full overflow-hidden bg-black/10">
                        <video
                            src={featuredNews.videoUrl}
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="lg:col-span-5 flex flex-col justify-center">
                        <span className="mb-6 text-xs font-semibold uppercase tracking-widest text-(--brand-glaucous)">
                            {featuredNews.category}
                        </span>
                        <h3 className="mb-6 text-3xl font-light leading-tight text-(--brand-blue) md:text-4xl">
                            {featuredNews.title}
                        </h3>
                        <SectionDivider className="mb-6 max-w-36" />
                        <p className="mb-10 text-base font-light leading-relaxed text-[rgba(51,51,51,0.76)] md:text-lg">
                            {featuredNews.description}
                        </p>
                        <AnimatedArrowLink href={featuredNews.link} className="mt-1 text-sm text-(--brand-tangerine) transition-opacity hover:opacity-80">
                            Read more
                        </AnimatedArrowLink>
                    </div>
                </div>

                {/* Grid Articles */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {newsItems.map((item, index) => (
                        <div
                            key={index}
                            ref={(el) => {
                                cardsRef.current[index + 1] = el; // Offset by 1 for featured card
                            }}
                            className="group cursor-pointer flex flex-col gap-6"
                        >
                            <div className="w-full h-[40vh] relative overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <span className="text-xs font-semibold uppercase tracking-widest text-(--brand-glaucous)">
                                    {item.category}
                                </span>
                                <h3 className="text-xl font-light leading-tight text-(--brand-blue) transition-colors group-hover:text-(--brand-tangerine)">
                                    {item.title}
                                </h3>
                                <p className="mt-2 line-clamp-4 text-sm font-light leading-relaxed text-[rgba(51,51,51,0.7)]">
                                    {item.description}
                                </p>
                                <AnimatedArrowLink href={item.link} className="mt-2 text-sm text-(--brand-tangerine) transition-opacity hover:opacity-80">
                                    Read more
                                </AnimatedArrowLink>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            </section>
        </div>
    );
}
