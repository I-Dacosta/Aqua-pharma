"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { AnimatedArrowLink } from "../ui/AnimatedArrowCta";
import { useSiteLocale } from "@/components/core/SiteLocaleProvider";
import { WordReveal } from "../ui/WordReveal";

gsap.registerPlugin(ScrollTrigger);

export function WhatWeDo() {
	const { content } = useSiteLocale();
	const containerRef = useRef<HTMLElement>(null);
	const tabs = content.home.whatWeDo.tabbed.tabs;
	const [activeTabId, setActiveTabId] = useState(tabs[0]?.id ?? null);

	const activeTab = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0];

	useGSAP(
		() => {
			const media = gsap.matchMedia();

			media.add("(prefers-reduced-motion: no-preference)", () => {
				gsap.fromTo(
					".whatwedo-label",
					{ opacity: 0, y: 10 },
					{
						opacity: 1,
						y: 0,
						duration: 0.7,
						stagger: 0.12,
						ease: "power2.out",
						scrollTrigger: {
							trigger: ".whatwedo-label",
							start: "top 85%",
							toggleActions: "play none none none",
						},
					},
				);

				// Ode-style image: rounded frame unmasks while the picture drifts with scroll.
				gsap.fromTo(
					".whatwedo-frame",
					{ clipPath: "inset(14% 6% 14% 6% round 8px)" },
					{
						clipPath: "inset(0% 0% 0% 0% round 8px)",
						duration: 1.2,
						ease: "power3.out",
						scrollTrigger: {
							trigger: ".whatwedo-frame",
							start: "top 85%",
							toggleActions: "play none none none",
						},
					},
				);
				// Ode's picture is a looping video; ours drifts like slow camera motion.
				gsap.fromTo(
					".whatwedo-kb",
					{ scale: 1.06, xPercent: 1.5, yPercent: 1 },
					{
						scale: 1.16,
						xPercent: -2,
						yPercent: -1.5,
						duration: 14,
						ease: "sine.inOut",
						yoyo: true,
						repeat: -1,
					},
				);
				gsap.fromTo(
					".whatwedo-image",
					{ y: "-6%", scale: 1.08 },
					{
						y: "6%",
						ease: "none",
						scrollTrigger: {
							trigger: ".whatwedo-image",
							start: "top bottom",
							end: "bottom top",
							scrub: true,
						},
					},
				);
			});

			media.add("(prefers-reduced-motion: reduce)", () => {
				gsap.set(".whatwedo-image", { clearProps: "transform" });
			});

			return () => {
				media.revert();
			};
		},
		{ scope: containerRef },
	);

	return (
		<section
			id="what-we-do"
			ref={containerRef}
			className="relative flex min-h-[60svh] items-center overflow-hidden bg-white px-6 py-10 text-[rgb(30,34,38)] md:px-12 lg:px-20"
		>
			<div className="mx-auto w-full max-w-[100rem]">
				<div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.66fr_1.34fr] lg:items-center lg:gap-12">
					<div className="relative z-10 max-w-xl">
						<div
							role="tablist"
							aria-label={content.home.whatWeDo.title}
							className="flex max-w-full flex-wrap items-end gap-8"
						>
							{tabs.map((tab) => {
								const isActive = tab.id === activeTabId;

								return (
									<button
										key={tab.id}
										id={`what-we-do-tab-${tab.id}`}
										type="button"
										role="tab"
										aria-controls="what-we-do-panel"
										aria-selected={isActive}
										onClick={() => setActiveTabId(tab.id)}
										className={`whatwedo-label min-h-11 border-b-2 px-1 pb-2 text-[0.8rem] font-medium uppercase tracking-[0.07em] transition-colors duration-200 focus-visible:relative focus-visible:z-10 focus-visible:outline-3 focus-visible:outline-offset-[-3px] focus-visible:outline-(--brand-blue) ${
											isActive
												? "border-(--brand-blue) text-(--brand-blue)"
												: "border-transparent text-(--brand-ink-muted) hover:border-(--brand-blue)/45 hover:text-(--brand-blue)"
										}`}
									>
										{tab.label}
									</button>
								);
							})}
						</div>

						<div
							id="what-we-do-panel"
							role="tabpanel"
							aria-labelledby={activeTab ? `what-we-do-tab-${activeTab.id}` : undefined}
						>
							<WordReveal
								as="h2"
								text={content.home.whatWeDo.title}
								className="mt-7 text-[clamp(2.2rem,3.8vw,3.4rem)] font-normal leading-[1.05] tracking-[-0.02em] text-(--brand-blue)"
							/>

							<WordReveal
								key={activeTab?.id}
								text={activeTab?.body ?? ""}
								start="top 95%"
								stagger={0.012}
								className="type-body mt-8 font-light text-[rgb(30,34,38)]/80"
							/>

							<AnimatedArrowLink
								href="#products"
								className="brand-button mt-9"
								motionClassName="!translate-x-0"
							>
								<span>
									{content.home.whatWeDo.cta}
								</span>
							</AnimatedArrowLink>
						</div>
					</div>

					<div className="flex w-full justify-end">
						<div className="whatwedo-frame relative h-[min(30rem,calc(60svh-5rem))] w-full max-w-[48rem] overflow-hidden rounded-[8px]">
							<div className="whatwedo-image absolute inset-0">
								<div className="whatwedo-kb absolute inset-0">
									{tabs.map((tab) => (
										<Image
											key={tab.id}
											src={tab.image}
											alt={tab.imageAlt}
											fill
											sizes="(max-width: 1280px) 100vw, 48vw"
											className={`object-cover transition-opacity duration-700 ease-out ${
												tab.id === activeTabId ? "opacity-100" : "opacity-0"
											}`}
										/>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
