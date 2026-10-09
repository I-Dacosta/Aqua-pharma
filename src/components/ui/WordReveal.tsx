"use client";

import { useRef, type ElementType } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type WordRevealProps = {
    text: string;
    as?: ElementType;
    className?: string;
    start?: string;
    stagger?: number;
};

/** Olympic-style text effect: each word rises out of its own mask, staggered, once in view. */
export function WordReveal({ text, as: Tag = "p", className, start = "top 82%", stagger = 0.035 }: WordRevealProps) {
    const ref = useRef<HTMLElement>(null);
    const words = text.split(" ");

    useGSAP(
        () => {
            const media = gsap.matchMedia();

            media.add("(prefers-reduced-motion: no-preference)", () => {
                gsap.from(".word-reveal-inner", {
                    yPercent: 115,
                    opacity: 0,
                    duration: 1,
                    stagger,
                    ease: "power3.out",
                    scrollTrigger: { trigger: ref.current, start, toggleActions: "play none none none" },
                });
            });

            return () => media.revert();
        },
        { scope: ref },
    );

    return (
        <Tag ref={ref} className={className}>
            <span className="sr-only">{text}</span>
            {words.map((word, index) => (
                <span key={`${word}-${index}`} aria-hidden="true" className="inline-block overflow-hidden align-top">
                    <span className="word-reveal-inner inline-block">
                        {word}
                        {index < words.length - 1 ? " " : ""}
                    </span>
                </span>
            ))}
        </Tag>
    );
}
