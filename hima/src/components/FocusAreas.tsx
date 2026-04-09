"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

const focusSlides = [
    {
        title: "Focus Area 01",
        image: "https://images.unsplash.com/photo-1544551763-46a01391307b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        description: "Pioneering sustainable aquaculture facilities.",
    },
    {
        title: "Focus Area 02",
        image: "https://images.unsplash.com/photo-1596706915017-f27eb66fc7bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        description: "Premium quality trout, raised in pristine waters.",
    },
    {
        title: "Focus Area 03",
        image: "https://images.unsplash.com/photo-1518118227690-3cb83e58da00?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
        description: "Zero compromise on animal welfare and health.",
    },
];

export default function FocusAreas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const slidesRef = useRef<(HTMLDivElement | null)[]>([]);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Use a single timeline for the entire pinned section
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: `+=${(focusSlides.length - 1) * 100}%`, // Scroll distance based on number of extra slides
                    scrub: true,
                    pin: true,
                }
            });

            // Animate slides fading/sliding in
            slidesRef.current.forEach((slide, index) => {
                if (index === 0) return; // First slide is visible by default

                // 1. Reveal the slide by animating clipPath from bottom to top
                tl.fromTo(
                    slide,
                    { clipPath: "inset(100% 0% 0% 0%)" },
                    { clipPath: "inset(0% 0% 0% 0%)", ease: "none", duration: 1 }
                );

                // 2. Animate text slightly after the slide starts to reveal
                const textElements = slide?.querySelector(".slide-text")?.children;
                if (textElements) {
                    tl.fromTo(
                        textElements,
                        { y: 30, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            stagger: 0.1,
                            duration: 0.5,
                            ease: "power2.out",
                        },
                        "<0.5" // Start this animation halfway through the previous clipPath animation
                    );
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative h-screen w-full bg-black overflow-hidden">
            {focusSlides.map((slide, index) => (
                <div
                    key={index}
                    ref={(el) => {
                        slidesRef.current[index] = el;
                    }}
                    className="absolute inset-0 w-full h-full flex items-center justify-center p-8 z-10"
                    style={{ zIndex: index + 1 }}
                >
                    {/* Background Image */}
                    <div className="absolute inset-0 -z-10">
                        <div className="absolute inset-0 bg-black/50" />
                        <Image
                            src={slide.image}
                            alt={slide.title}
                            fill
                            className="object-cover"
                        />
                    </div>

                    {/* Content */}
                    <div className="slide-text flex flex-col items-center text-center gap-6 max-w-2xl text-white">
                        <span className="text-hima-gold text-lg tracking-widest font-mono">
                            0{index + 1}
                        </span>
                        <h2 className="text-5xl md:text-7xl font-serif">
                            {slide.title}
                        </h2>
                        <p className="text-lg text-white/80 font-sans">
                            {slide.description}
                        </p>
                    </div>
                </div>
            ))}
        </section>
    );
}
