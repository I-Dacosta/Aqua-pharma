"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);
    const floatImgRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const ctx = gsap.context(() => {
            gsap.to(floatImgRef.current, {
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top bottom",
                    end: "bottom bottom",
                    scrub: 1,
                },
                y: -150,
            });
        }, footerRef);

        return () => ctx.revert();
    }, []);

    return (
        <footer ref={footerRef} className="bg-hima-dark pt-32 pb-12 px-8 flex flex-col items-center justify-center min-h-[50vh] relative z-20 overflow-hidden">
            {/* Floating Decorative Image */}
            <div
                ref={floatImgRef}
                className="absolute top-20 left-10 w-64 h-48 overflow-hidden hidden md:block opacity-30 mix-blend-screen pointer-events-none"
            >
                <Image
                    src="https://images.unsplash.com/photo-1518118227690-3cb83e58da00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    alt="Water ripples"
                    fill
                    className="object-cover"
                />
            </div>

            <div className="flex flex-col items-center gap-12 text-center group cursor-pointer mb-24 relative z-10">
                <h2 className="text-white text-5xl md:text-8xl font-serif tracking-tight group-hover:text-hima-gold transition-colors duration-500">
                    Go to contact
                </h2>

                {/* Animated Arrow */}
                <div className="w-16 h-16 md:w-24 md:h-24 rounded-full border border-white/20 flex items-center justify-center group-hover:border-hima-gold group-hover:bg-hima-gold transition-all duration-500">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 md:h-12 md:w-12 text-white transform group-hover:translate-x-2 transition-transform duration-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </div>
            </div>

            <div className="w-full flex justify-between items-end text-white/50 text-sm mt-auto relative z-10">
                <div className="text-hima-gold text-2xl font-serif tracking-tight">
                    hima
                </div>
                <div className="flex gap-4">
                    <a href="#" className="hover:text-white transition-colors">Privacy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms</a>
                </div>
            </div>
        </footer>
    );
}
