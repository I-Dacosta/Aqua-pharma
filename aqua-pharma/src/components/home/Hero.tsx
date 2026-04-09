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
            <div className="hero-panel relative mx-auto flex min-h-screen w-full overflow-hidden bg-(--brand-blue) md:min-h-screen">
                <div className="absolute inset-0 overflow-hidden">
                    <Image
                        src="/hero.jpg"
                        alt="Aquaculture operations"
                        fill
                        priority
                        sizes="100vw"
                        className="hero-bg-image object-cover opacity-70"
                    />
                    <div className="absolute inset-0 bg-[rgba(21,31,109,0.34)]" />
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,31,109,0.82)_0%,rgba(78,96,173,0.48)_28%,rgba(78,96,173,0.12)_58%,rgba(85,109,90,0.34)_100%)]" />
                </div>

                <div className="hero-content relative z-10 flex w-full items-center min-h-screen px-6 py-14 text-white md:px-10 md:py-18 lg:px-16 lg:py-20 xl:px-20">
                    <div className="grid w-full grid-cols-1 gap-10 md:min-h-[72vh] md:grid-cols-12 md:items-center">
                        <div className="md:col-span-8 lg:col-span-9">
                            <div className="max-w-5xl">
                                <h1 className="font-heading text-[clamp(2.8rem,4.8vw,5.6rem)] font-light leading-[1.1] tracking-[0.01em] text-white">
                                    <div className="overflow-hidden"><div className="hero-line">Welfare below water</div></div>
                                </h1>
                            </div>

                            <div className="hero-copy relative mt-8 max-w-xl space-y-8 md:mt-10 ml-[15%] md:ml-[15%] lg:ml-[22%] xl:ml-[22%]">
                                <p className="text-[1.02rem] font-light leading-[1.6] text-white/88 md:text-[1.08rem] lg:text-[1.14rem]">
                                    Prevention and Control of Disease in Aquaculture
                                    Our solutions combine scientific research with sustainable practices
                                    to protect animal welfare and ensure high-quality yields.
                                </p>
                                <div className="flex flex-wrap items-center gap-x-10 gap-y-5">
                                    <AnimatedArrowLink
                                        href="#products"
                                        className="min-h-14 border border-white/10 bg-(--brand-tangerine) px-7 py-3 text-[0.82rem] font-medium uppercase tracking-[0.18em] text-(--brand-dark) transition-colors hover:bg-[#ef9a4e]"
                                    >
                                        Explore Solutions
                                    </AnimatedArrowLink>
                                    <AnimatedArrowLink
                                        href="#contact"
                                        className="text-[0.84rem] font-light uppercase tracking-[0.18em] text-white/92 transition-colors hover:text-white"
                                        iconClassName="h-2.5 w-5"
                                    >
                                        Contact Us
                                    </AnimatedArrowLink>
                                </div>
                            </div>
                        </div>

                        <div className="hero-brand opacity-0 pointer-events-none self-end justify-self-end pb-1 md:col-span-4 md:pb-2 lg:col-span-3 lg:pb-4">
                            <Image
                                src="/Aqua-Pharma-white.svg"
                                alt="Aqua Pharma"
                                width={243}
                                height={76}
                                priority
                                className="h-auto w-40 opacity-95 sm:w-44 md:w-52 lg:w-64"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
