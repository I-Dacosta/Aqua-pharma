"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SplitMediaProps {
    title: string;
    description: string;
    imageSrc: string;
    reversed?: boolean;
}

export function SplitMedia({ title, description, imageSrc, reversed = false }: SplitMediaProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        // Parallax effect for the image
        const img = containerRef.current?.querySelector('.media-img');
        if (img) {
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
        }

        // Staggered text reveals when the split media section enters
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top 80%",
            animation: gsap.from(gsap.utils.toArray('.split-text-element'), {
                y: 40,
                opacity: 0,
                filter: "blur(12px)",
                duration: 1.2,
                stagger: 0.2,
                ease: "power3.out"
            }),
            toggleActions: "play reverse play reverse"
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative w-full py-24 md:py-40 bg-[#E8E8E8] text-[#0A181F] overflow-hidden">
            <div className={`w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 lg:gap-32 items-center ${reversed ? 'md:flex-row-reverse' : ''}`}>

                {/* Text Content Block */}
                <div className={`flex flex-col space-y-8 ${reversed ? 'md:order-2 md:pl-10 lg:pl-20' : 'md:pr-10 lg:pr-20'}`}>
                    <h2 className="split-text-element text-[clamp(2.5rem,5vw,4rem)] font-bold leading-[0.95] tracking-tight">
                        {title}
                    </h2>
                    <p className="split-text-element text-lg md:text-xl text-[#0A181F]/70 leading-relaxed font-medium">
                        {description}
                    </p>
                    <div className="split-text-element pt-4">
                        <button className="px-8 py-3.5 bg-[#C71E37] text-white text-[13px] font-bold uppercase tracking-widest hover:bg-[#a5192e] transition-colors w-max">
                            Read more
                        </button>
                    </div>
                </div>

                {/* Media Block: Exact mpsystempack offset styling */}
                <div className={`relative h-[60vh] md:h-[75vh] w-full rounded-none overflow-hidden ${reversed ? 'md:order-1' : ''}`}>
                    <div className="absolute inset-0 bg-black/5 z-10 point-events-none"></div>
                    <img
                        src={imageSrc}
                        alt={title}
                        className="media-img absolute inset-0 w-full h-[120%] object-cover object-center -top-[10%]"
                    />
                </div>
            </div>
        </section>
    );
}
