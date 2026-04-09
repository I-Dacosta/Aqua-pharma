"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export function MediaCards() {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        // Parallax effect for arrays of images
        const parallaxImages = gsap.utils.toArray('.media-img');
        parallaxImages.forEach((img: any) => {
            gsap.fromTo(img,
                { y: "-10%", scale: 1.1 },
                {
                    y: "10%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: img.parentElement,
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    }
                }
            );
        });

        // Staggered text reveals when the split media section enters
        ScrollTrigger.create({
            trigger: ".split-media-trigger",
            start: "top 80%",
            animation: gsap.from(".split-text-element", {
                y: 30,
                opacity: 0,
                duration: 1,
                stagger: 0.15,
                ease: "power3.out"
            }),
            toggleActions: "play reverse play reverse"
        });

        // Second Pinning Card Stacking logic.
        // We ensure MediaCards section is relative z-10 so it slides over the pinned hero.
        // If we want the first media card to pin and the second card to slide over it, we can do it here.
        ScrollTrigger.create({
            trigger: ".first-card",
            start: "top top",
            end: "+=100%", // pin it for 100% of height
            pin: true,
            pinSpacing: false,
        });

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative w-full z-10 selection:bg-[#282A22] selection:text-[#E7E7E6]">

            {/* Large Edge-to-Edge Media Block (Pins) */}
            <div className="first-card relative w-full h-screen bg-[#E7E7E6] flex items-center justify-center pt-24 pb-12 z-10">
                <div className="w-full h-full px-6 md:px-12 lg:px-24 max-w-[1800px] mx-auto pb-12">
                    <div className="relative w-full h-full overflow-hidden rounded-sm bg-[#282A22] shadow-2xl">
                        <img
                            src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=2940" // Generic tech/nature placeholder
                            alt="Triodelab Technology"
                            className="media-img absolute inset-0 w-full h-full object-cover opacity-80 scale-110"
                        />
                        {/* Overlay Text */}
                        <div className="absolute inset-0 p-8 md:p-16 flex flex-col justify-between">
                            <div className="self-end">
                                <button className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 transition-colors border border-white/20 group">
                                    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1 group-hover:scale-110 transition-transform" />
                                </button>
                            </div>
                            <div className="max-w-xl">
                                <h3 className="text-white text-3xl md:text-5xl font-light leading-tight mb-4">
                                    Precision at scale.
                                </h3>
                                <p className="text-white/70 font-light text-lg">
                                    Discover how our agentic frameworks integrate seamlessly into your existing operations.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Split Media Block (slides over the pinned first card) */}
            <div className="split-media-trigger relative w-full min-h-screen bg-[#E7E7E6] py-24 md:py-48 flex items-center justify-center z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.05)]">
                <div className="w-full px-6 md:px-12 lg:px-24 max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
                    <div className="flex flex-col gap-8 order-2 md:order-1">
                        <p className="split-text-element text-xs uppercase tracking-[0.2em] text-[#282A22]/50 font-bold">
                            Bærekraftig Innovasjon
                        </p>
                        <h2 className="split-text-element text-3xl md:text-5xl font-light text-[#282A22] leading-tight max-w-md">
                            Data-driven decisions for a complex world.
                        </h2>
                        <p className="split-text-element text-[#282A22]/70 font-light text-lg max-w-md leading-relaxed">
                            By leveraging advanced machine learning models, we provide unprecedented visibility into structural inefficiencies, allowing companies to adapt faster than ever before.
                        </p>
                        <a href="#" className="split-text-element inline-flex max-w-max items-center justify-between border-b border-[#282A22] pb-1 text-sm uppercase tracking-widest font-medium hover:opacity-60 transition-opacity mt-4 group">
                            Les mer <span className="ml-8 group-hover:translate-x-1 transition-transform font-light">→</span>
                        </a>
                    </div>

                    <div className="relative aspect-[4/5] overflow-hidden order-1 md:order-2">
                        <img
                            src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2940" // Tech abstract
                            alt="Data Analytics"
                            className="media-img absolute inset-0 w-full h-full object-cover grayscale-[20%] scale-110"
                        />
                    </div>
                </div>
            </div>

        </section>
    );
}
