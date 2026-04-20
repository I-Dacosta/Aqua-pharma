"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedArrowLink } from "../ui/AnimatedArrowCta";

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
    const containerRef = useRef<HTMLElement>(null);

    const handleExploreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        
        const productsSection = document.getElementById("products");
        if (!productsSection) return;
        const sectionTop = productsSection.getBoundingClientRect().top + window.scrollY;
        
        window.scrollTo({
            top: Math.max(sectionTop - 40, 0),
            behavior: "smooth",
        });
    };

    useGSAP(() => {
        const tl = gsap.timeline({ delay: 0.2 });

        tl.from(".hero-line", {
            yPercent: 110,
            duration: 1.25,
            stagger: 0.14,
            ease: "power4.out",
        })
            .from(".hero-copy", {
                y: 24,
                opacity: 0,
                duration: 0.9,
                ease: "power3.out",
            }, "-=0.85");

        gsap.to(".hero-bg-image", {
            scale: 1.08,
            duration: 18,
            ease: "linear",
            repeat: -1,
            yoyo: true
        });

        gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: true,
            }
        })
            .to(".hero-panel", { yPercent: -6, ease: "none" })
            .to(".hero-content", { yPercent: -12, ease: "none" }, 0);

    }, { scope: containerRef });

    return (
        <section id="hero" ref={containerRef} className="relative min-h-screen overflow-hidden bg-(--brand-paper)">
            <div className="hero-panel relative flex min-h-screen w-full overflow-hidden bg-(--brand-blue)">
                <div className="absolute inset-0 overflow-hidden">
                    <Image
                        src="/images/wp/home/home-hero.jpg"
                        alt="Aqua Pharma treatment operations at sea"
                        fill
                        priority
                        sizes="100vw"
                        className="hero-bg-image object-cover opacity-72"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(21,31,109,0.18)_0%,rgba(21,31,109,0.34)_42%,rgba(10,16,55,0.86)_100%)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,31,109,0.78)_0%,rgba(21,31,109,0.38)_34%,rgba(21,31,109,0.08)_64%,rgba(85,109,90,0.24)_100%)]" />
                </div>

                <div className="hero-content relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-end px-6 pb-16 pt-28 text-white md:px-12 md:pb-20 md:pt-32 lg:px-20 lg:pb-24 lg:pt-36">
                    <div className="grid w-full grid-cols-1 gap-10 lg:grid-cols-[1fr_0.82fr] lg:items-end lg:gap-20">
                        <div className="max-w-4xl">
                            <p className="mb-6 text-[0.72rem] font-medium uppercase tracking-[0.28em] text-white/60">
                                Aqua Pharma
                            </p>
                            <h1 className="font-heading text-[clamp(3rem,6vw,5.5rem)] font-light leading-[1.04] tracking-wide text-white">
                                <span className="block overflow-hidden">
                                    <span className="hero-line block">Welfare</span>
                                </span>
                                <span className="block overflow-hidden">
                                    <span className="hero-line block">Below Water</span>
                                </span>
                            </h1>
                        </div>

                        <div className="hero-copy max-w-xl space-y-7 lg:mb-1">
                            <p className="text-[1rem] font-light leading-[1.8] text-white/82 md:text-[1.06rem]">
                                Science-led prevention and control for aquaculture, combining treatment systems, field support, and operational care.
                            </p>
                            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                                <AnimatedArrowLink
                                    href="#products"
                                    onClick={handleExploreClick}
                                    className="min-h-14 border border-white/10 bg-(--brand-tangerine) px-7 py-3 text-[0.8rem] font-medium uppercase tracking-[0.18em] text-(--brand-dark) transition-colors hover:bg-[#ef9a4e]"
                                >
                                    Explore Solutions
                                </AnimatedArrowLink>
                                <AnimatedArrowLink
                                    href="#contact"
                                    className="text-[0.8rem] font-light uppercase tracking-[0.18em] text-white/88 transition-colors hover:text-white"
                                    iconClassName="h-2.5 w-5"
                                >
                                    Contact Us
                                </AnimatedArrowLink>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hero-brand pointer-events-none absolute bottom-10 right-6 opacity-0 md:bottom-12 md:right-12 lg:bottom-16 lg:right-20">
                    <Image
                        src="/Aqua-Pharma-white.svg"
                        alt="Aqua Pharma"
                        width={243}
                        height={76}
                        priority
                        className="h-auto w-40 sm:w-44 md:w-52 lg:w-56"
                    />
                </div>
            </div>
        </section>
    );
}
