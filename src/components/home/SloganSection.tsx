"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSiteLocale } from "@/components/core/SiteLocaleProvider";

gsap.registerPlugin(ScrollTrigger);

/** Full-viewport slogan (Komma Komma style): text rides up with scroll while one word swaps for another. */
export function SloganSection() {
	const { content } = useSiteLocale();
	const { swapOld, swapNew, afterSwap, line2 } = content.home.slogan;
	const sectionRef = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			const media = gsap.matchMedia();

			media.add("(prefers-reduced-motion: no-preference)", () => {
				const timeline = gsap.timeline({
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 88%",
						end: "bottom 55%",
						scrub: 0.6,
					},
				});

				timeline
					.fromTo(".slogan-block", { y: 90 }, { y: 0, ease: "none" }, 0)
					.fromTo(".slogan-old", { yPercent: 0, opacity: 1 }, { yPercent: -105, opacity: 0.35, ease: "power2.inOut" }, 0.15)
					.fromTo(".slogan-new", { yPercent: 105 }, { yPercent: 0, ease: "power2.inOut" }, 0.15)
					.fromTo(".slogan-line2", { opacity: 0.2 }, { opacity: 1, ease: "none" }, 0.3);
			});

			media.add("(prefers-reduced-motion: reduce)", () => {
				gsap.set(".slogan-old", { opacity: 0 });
			});

			return () => media.revert();
		},
		{ scope: sectionRef },
	);

	return (
		<section
			ref={sectionRef}
			aria-label={`${swapNew} ${afterSwap} ${line2}`}
			className="relative flex min-h-[40svh] items-center overflow-hidden bg-white px-6 py-10 text-(--brand-blue) md:px-12 lg:px-20"
		>
			<div className="mx-auto grid w-full max-w-[100rem] grid-cols-1 gap-x-6 lg:grid-cols-12">
				<div className="slogan-block lg:col-span-8 lg:col-start-5 xl:col-span-8 xl:col-start-5">
					<p
						className="text-[clamp(2rem,3.6vw,3.9rem)] font-normal leading-[1] tracking-[-0.04em]"
						aria-hidden="true"
					>
						<span className="block">
							<span className="relative inline-grid overflow-hidden align-top">
								<span className="slogan-old col-start-1 row-start-1 text-(--brand-blue)/40">{swapOld}</span>
								<span className="slogan-new col-start-1 row-start-1">{swapNew}</span>
							</span>{" "}
							{afterSwap}
						</span>
						<span className="slogan-line2 block">{line2}</span>
					</p>
				</div>
			</div>
		</section>
	);
}
