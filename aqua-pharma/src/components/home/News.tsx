"use client";

import Image from "next/image";
import { AnimatedArrowLink } from "../ui/AnimatedArrowCta";
import { ScrollReveal } from "../ui/ScrollReveal";

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
    return (
        <div className="relative z-10 w-full">
            <section className="bg-(--brand-paper) py-32 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <ScrollReveal className="mb-16 md:mb-24" duration={0.76} yOffset={14} start="top 92%">
                    <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <h2 className="font-heading text-[clamp(2.5rem,4vw,3.5rem)] font-light uppercase tracking-wide text-(--brand-blue)">
                            LATEST NEWS
                        </h2>
                        <AnimatedArrowLink href="#" className="text-[0.8rem] font-medium tracking-[0.15em] uppercase text-(--brand-blue)/80 transition-colors hover:text-(--brand-blue)">
                            VIEW ALL NEWS
                        </AnimatedArrowLink>
                    </div>
                </ScrollReveal>

                {/* Featured Article — Video */}
                <ScrollReveal className="mb-24" duration={0.8} yOffset={16} start="top 92%">
                    <div className="group flex cursor-pointer flex-col items-center gap-12 lg:flex-row lg:gap-20">
                        <div className="relative h-[50vh] w-full overflow-hidden bg-black/5 lg:w-[60%] md:h-[65vh]">
                            <video
                                src={featuredNews.videoUrl}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="h-full w-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                            />
                        </div>
                        <div className="flex flex-col justify-center py-4 lg:w-[40%]">
                            <span className="mb-6 text-[0.75rem] font-medium uppercase tracking-[0.2em] text-(--brand-blue)/50">
                                {featuredNews.category}
                            </span>
                            <h3 className="mb-8 text-[clamp(1.8rem,2.5vw,2.8rem)] font-light leading-[1.15] tracking-wide text-(--brand-blue) transition-colors duration-500">
                                {featuredNews.title}
                            </h3>
                            <div className="mb-8 h-px w-12 bg-(--brand-blue)/20" />
                            <p className="mb-10 text-[1.05rem] font-light leading-[1.8] text-(--brand-dark)/70 md:text-[1.15rem]">
                                {featuredNews.description}
                            </p>
                            <AnimatedArrowLink href={featuredNews.link} className="mt-2 text-[0.8rem] font-medium uppercase tracking-[0.15em] text-(--brand-tangerine)">
                                Read Full Story
                            </AnimatedArrowLink>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Grid Articles */}
                <ScrollReveal duration={0.72} yOffset={14} staggerChildren staggerAmount={0.05} start="top 93%">
                <div className="grid grid-cols-1 gap-x-12 gap-y-16 md:grid-cols-3">
                    {newsItems.map((item, index) => (
                        <div
                            key={index}
                            className="group flex cursor-pointer flex-col gap-6"
                        >
                            <div className="w-full aspect-[4/3] relative overflow-hidden bg-black/5">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 33vw"
                                    className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105"
                                />
                            </div>
                            <div className="flex flex-col gap-4">
                                <span className="text-[0.7rem] font-medium uppercase tracking-[0.2em] text-(--brand-blue)/50">
                                    {item.category}
                                </span>
                                <h3 className="text-[1.3rem] md:text-[1.4rem] font-light leading-[1.25] tracking-wide text-(--brand-blue)">
                                    {item.title}
                                </h3>
                                <p className="mt-2 line-clamp-3 text-[0.95rem] font-light leading-[1.7] text-(--brand-dark)/60">
                                    {item.description}
                                </p>
                                <AnimatedArrowLink href={item.link} className="mt-4 text-[0.75rem] font-medium uppercase tracking-[0.15em] text-(--brand-tangerine)">
                                    Read Article
                                </AnimatedArrowLink>
                            </div>
                        </div>
                    ))}
                </div>
                </ScrollReveal>
            </div>
            </section>
        </div>
    );
}
