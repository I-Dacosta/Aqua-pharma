"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function Hero() {
    const heroRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const floatImgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            // Fade out and translate text slightly up on scroll
            gsap.to(textRef.current, {
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
                y: -100,
                opacity: 0,
            });

            // Parallax effect for the background
            gsap.to(".hero-bg", {
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
                y: 200,
            });

            // Parallax effect for floating image
            gsap.to(floatImgRef.current, {
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
                y: -150,
            });
        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={heroRef}
            className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-black z-0"
        >
            {/* Background Video/Image Placeholder */}
            <div className="hero-bg absolute inset-0 z-0">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1549488344-c6b758da4a67?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                    alt="Trout"
                    className="w-full h-full object-cover"
                />
            </div>



            {/* Floating Decorative Image */}
            <div
                ref={floatImgRef}
                className="absolute top-1/4 right-[15%] w-48 h-64 overflow-hidden hidden md:block opacity-40 mix-blend-screen pointer-events-none z-10"
            >
                <Image
                    src="https://images.unsplash.com/photo-1623916298642-89574da9db29?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Water texture"
                    fill
                    className="object-cover"
                />
            </div>

            <div ref={textRef} className="relative z-20 text-center flex flex-col items-center">
                <h1 className="text-white text-7xl md:text-9xl font-serif font-light tracking-tight mix-blend-difference text-balance max-w-5xl">
                    Superior Trout
                </h1>
            </div>
        </section>
    );
}
