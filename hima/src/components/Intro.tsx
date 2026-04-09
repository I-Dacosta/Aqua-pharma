"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function Intro() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const floatImg1Ref = useRef<HTMLDivElement>(null);
    const floatImg2Ref = useRef<HTMLDivElement>(null);
    const capRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Fade and slide up text
            gsap.fromTo(
                textRef.current,
                {
                    y: 50,
                    opacity: 0,
                },
                {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        end: "top 50%",
                        scrub: 1,
                    },
                    y: 0,
                    opacity: 1,
                }
            );

            // Slight scale effect on main image container
            gsap.fromTo(
                imageRef.current,
                { scale: 0.9, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 80%",
                        end: "top 30%",
                        scrub: 1,
                    },
                    scale: 1,
                    opacity: 1,
                }
            );

            // Parallax for floating images
            gsap.to(floatImg1Ref.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                },
                y: -150,
            });

            gsap.to(floatImg2Ref.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                },
                y: 200,
            });

            // The visual "mist" cap is now a fixed-height, CSS-driven element (556px)
            // We no longer animate its height with GSAP to avoid pixel stretching/banding.
            // A lightweight scroll listener (below) toggles its opacity when the Intro
            // begins to scroll into view so the effect only appears as you start scrolling.


        }, sectionRef);

        // Map scroll progress to cap opacity over 556px of scroll using rAF.
        // This makes the fade gradual and begins immediately as soon as the
        // user starts scrolling (first trigger).
        const CAP_HEIGHT = 556;
        let ticking = false;

        const update = () => {
            const sec = sectionRef.current;
            const cap = capRef.current;
            if (!sec || !cap) return;
            const rectTop = sec.getBoundingClientRect().top;
            const start = window.innerHeight; // when section top hits bottom of viewport
            const progress = (start - rectTop) / CAP_HEIGHT;
            const clamped = Math.min(Math.max(progress, 0), 1);
            cap.style.opacity = String(clamped);
        };

        const onScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(() => {
                    update();
                    ticking = false;
                });
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", update);
        // initial evaluation so tiny scroll still shows effect immediately
        update();

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", update);
            ctx.revert();
        };
    }, []);

    const mistGradient = `linear-gradient(to top, 
        rgba(208, 210, 210, 1) 0%, 
        rgba(208, 210, 210, 0.84) 19%, 
        rgba(208, 210, 210, 0.64) 34%, 
        rgba(208, 210, 210, 0.38) 47%, 
        rgba(208, 210, 210, 0.28) 56.5%, 
        rgba(208, 210, 210, 0.192) 65%, 
        rgba(208, 210, 210, 0.125) 73%, 
        rgba(208, 210, 210, 0.075) 80.2%, 
        rgba(208, 210, 210, 0.043) 86.1%, 
        rgba(208, 210, 210, 0.02) 91%, 
        rgba(208, 210, 210, 0.008) 95.2%, 
        rgba(208, 210, 210, 0.004) 98.2%, 
        rgba(208, 210, 210, 0) 100%
    )`;

    return (
        <div className="relative z-10 w-full">
            <section
                ref={sectionRef}
                className="bg-hima-light min-h-screen py-32 px-8 flex flex-col items-center justify-center relative overflow-visible"
            >
                {/* Soft top blend cap attached to the Intro section */}
                <div
                    ref={capRef}
                        className="absolute left-0 w-full pointer-events-none z-40 opacity-0"
                        style={{ backgroundImage: mistGradient, height: "556px", top: "-556px", willChange: "opacity" }}
                    aria-hidden="true"
                />

                {/* Floating Decorative Image 1 */}
                <div
                    ref={floatImg1Ref}
                    className="absolute top-20 left-[10%] w-48 h-64 overflow-hidden hidden md:block opacity-60 mix-blend-multiply"
                >
                    <Image
                        src="https://images.unsplash.com/photo-1544551763-46a01391307b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        alt="Water texture"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Floating Decorative Image 2 */}
                <div
                    ref={floatImg2Ref}
                    className="absolute bottom-32 -right-16 w-64 h-80 overflow-hidden hidden md:block opacity-40 mix-blend-multiply"
                >
                    <Image
                        src="https://images.unsplash.com/photo-1596706915017-f27eb66fc7bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        alt="Fish texture"
                        fill
                        className="object-cover"
                    />
                </div>

                <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-16 relative z-10">
                    <div
                        ref={textRef}
                        className="w-full md:w-1/2 flex flex-col items-start gap-8"
                    >
                        <h2 className="text-4xl md:text-6xl font-serif text-hima-text max-w-lg leading-tight">
                            Join us in making a sustainable change
                        </h2>
                        <p className="text-hima-text/80 text-lg max-w-md font-sans">
                            We are committed to building a sustainable future. Our superior trout
                            is harvested with care, ensuring the highest quality while respecting
                            the environment.
                        </p>
                        <a
                            href="#"
                            className="text-hima-gold uppercase tracking-widest text-sm font-semibold hover:opacity-80 transition-opacity"
                        >
                            Apply here &rarr;
                        </a>
                    </div>

                    <div ref={imageRef} className="w-full md:w-1/2 h-[60vh] relative overflow-hidden">
                        <Image
                            src="https://images.unsplash.com/photo-1549488344-c6b758da4a67?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                            alt="Sustainable Change"
                            fill
                            className="object-cover"
                        />
                    </div>
                </div>
            </section>
        </div>
    );
}
