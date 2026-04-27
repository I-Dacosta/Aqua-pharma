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

    // Video modal removed: always show poster image for hero media.

    const handleExploreClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();

        const productsSection = document.getElementById("products") || document.getElementById("what-we-do");
        if (!productsSection) {
            return;
        }

        const sectionTop = productsSection.getBoundingClientRect().top + window.scrollY;

        window.scrollTo({
            top: Math.max(sectionTop - 40, 0),
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        });
    };

    useGSAP(() => {
        const media = gsap.matchMedia();

        media.add("(prefers-reduced-motion: no-preference)", () => {
            const revealTimeline = gsap.timeline({ delay: 0.2 });

            revealTimeline
                .from(".hero-kicker", {
                    y: 18,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                })
                .from(".hero-line", {
                    yPercent: 110,
                    duration: 1.25,
                    stagger: 0.14,
                    ease: "power4.out",
                }, "-=0.25")
                .from(
                    ".hero-copy",
                    {
                        y: 24,
                        opacity: 0,
                        duration: 0.9,
                        ease: "power3.out",
                    },
                    "-=0.85"
                )
                .from(
                    ".hero-scroll-cue",
                    {
                        y: 18,
                        opacity: 0,
                        duration: 0.8,
                        ease: "power3.out",
                    },
                    "-=0.55"
                );

            gsap.to(".hero-backdrop", {
                scale: 1.06,
                duration: 18,
                ease: "linear",
                repeat: -1,
                yoyo: true,
            });

            const scrollTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                },
            });

            scrollTimeline
                .to(".hero-panel", { yPercent: -4, ease: "none" })
                .to(".hero-content", { yPercent: -10, ease: "none" }, 0)
                .to(".hero-atmosphere", { yPercent: -8, ease: "none" }, 0)
                .to(".hero-scroll-cue", { y: 28, opacity: 0, ease: "none" }, 0);

            const panel = containerRef.current?.querySelector<HTMLElement>(".hero-panel");
            const supportsFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

            if (!panel || !supportsFinePointer) {
                return undefined;
            }

            const handlePointerMove = (event: PointerEvent) => {
                const rect = panel.getBoundingClientRect();
                const offsetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
                const offsetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;

                gsap.to(".hero-copy", {
                    x: offsetX * 16,
                    y: offsetY * 10,
                    duration: 1.1,
                    ease: "power3.out",
                    overwrite: "auto",
                });
                gsap.to(".hero-atmosphere", {
                    x: offsetX * 24,
                    y: offsetY * 18,
                    duration: 1.4,
                    ease: "power3.out",
                    overwrite: "auto",
                });
            };

            const handlePointerLeave = () => {
                gsap.to([".hero-copy", ".hero-atmosphere"], {
                    x: 0,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out",
                    overwrite: "auto",
                });
            };

            panel.addEventListener("pointermove", handlePointerMove);
            panel.addEventListener("pointerleave", handlePointerLeave);

            return () => {
                panel.removeEventListener("pointermove", handlePointerMove);
                panel.removeEventListener("pointerleave", handlePointerLeave);
            };
        });

        return () => {
            media.revert();
        };
    }, { scope: containerRef });

    return (
        <section
            id="hero"
            ref={containerRef}
            className="relative min-h-screen overflow-hidden bg-(--brand-blue-dark)"
        >
            <div className="hero-panel premium-ink-surface relative mx-auto flex min-h-screen w-full overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <Image
                        src="/images/generated/home-hero-premium.png"
                        alt="Aerial view of aquaculture treatment operations at dusk"
                        fill
                        priority
                        sizes="100vw"
                        className="hero-backdrop object-cover opacity-[0.72]"
                    />
                    <div className="hero-atmosphere absolute inset-0 z-[1] bg-[radial-gradient(circle_at_78%_18%,rgba(164,205,224,0.16)_0%,rgba(164,205,224,0)_24%),radial-gradient(circle_at_22%_82%,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_22%)]" />
                    <div className="absolute inset-0 z-[2] bg-[linear-gradient(96deg,rgba(7,16,44,0.9)_0%,rgba(10,22,64,0.68)_34%,rgba(10,22,64,0.28)_64%,rgba(10,22,64,0.78)_100%)]" />
                    <div className="premium-ink-grid absolute inset-0 z-[3] opacity-[0.18]" />
                </div>

                <div className="hero-content relative z-10 flex min-h-screen w-full items-center px-6 py-16 text-white md:px-10 lg:px-16 lg:py-20 xl:px-20">
                    <div className="mx-auto grid w-full max-w-[96rem] grid-cols-1 gap-12 lg:grid-cols-1 lg:items-center lg:gap-14 xl:gap-[4.5rem]">
                        <div className="max-w-4xl">
                            <p className="hero-kicker mb-5 text-[0.68rem] font-medium uppercase tracking-[0.34em] text-white/62 md:mb-7">
                                Chapter 01 / Welfare systems at sea
                            </p>

                            <h1 className="font-heading text-[clamp(3rem,5.5vw,6.4rem)] font-light leading-[0.95] tracking-[-0.05em] text-white">
                                <div className="overflow-hidden"><div className="hero-line">Welfare</div></div>
                                <div className="overflow-hidden"><div className="hero-line">below water.</div></div>
                            </h1>

                            <div className="hero-copy mt-8 grid max-w-2xl gap-6 md:mt-10 md:grid-cols-[4.5rem_minmax(0,1fr)] md:items-start md:gap-7">
                                <span className="mt-[0.9rem] hidden h-px w-[4.5rem] bg-white/24 md:block" />

                                <div className="space-y-8">
                                    <p className="text-[1rem] font-light leading-[1.8] text-white/84 md:text-[1.06rem] lg:text-[1.1rem]">
                                        Aqua Pharma combines field treatment systems, scientific precision,
                                        and welfare-first execution to help aquaculture teams operate with
                                        more control and less stress on stock.
                                    </p>

                                    <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                                        <AnimatedArrowLink
                                            href="#products"
                                            onClick={handleExploreClick}
                                            className="min-h-14 border border-white/14 bg-white/96 px-7 py-3 text-[0.78rem] font-medium uppercase tracking-[0.2em] text-(--brand-blue) transition-colors hover:bg-white"
                                        >
                                            Explore Solutions
                                        </AnimatedArrowLink>

                                        <AnimatedArrowLink
                                            href="#contact"
                                            className="text-[0.82rem] font-light uppercase tracking-[0.18em] text-white/90 transition-colors hover:text-white"
                                            iconClassName="h-2.5 w-5"
                                        >
                                            Contact Us
                                        </AnimatedArrowLink>
                                    </div>
                                </div>
                            </div>
                        </div>

                        
                    </div>
                </div>

                {/* Hero logo placeholder for Navbar animation */}
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
