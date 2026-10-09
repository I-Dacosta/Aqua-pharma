"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSiteLocale } from "@/components/core/SiteLocaleProvider";

gsap.registerPlugin(ScrollTrigger);

const VIDEO_SRC = "/VIDEO-2025-10-15-09-56-06.mp4";

/** Triodelab-style panel: a full-height video frame that widens from ~47vw to full bleed as it scrolls in. */
export function VideoExpand() {
	const { content } = useSiteLocale();
	const { kicker, subtitle } = content.home.productSection;
	const caption = content.home.whatWeDo.imageNote;
	const sectionRef = useRef<HTMLElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);

	useGSAP(
		() => {
			const media = gsap.matchMedia();

			// Video only plays while the panel is near the viewport (the file is large).
			ScrollTrigger.create({
				trigger: sectionRef.current,
				start: "top bottom+=200",
				end: "bottom top-=200",
				onToggle: (self) => {
					const video = videoRef.current;
					if (!video) return;
					if (self.isActive && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
						void video.play().catch(() => undefined);
					} else {
						video.pause();
					}
				},
			});

			media.add("(min-width: 761px) and (prefers-reduced-motion: no-preference)", () => {
				gsap.fromTo(
					".video-expand-frame",
					{ width: "47vw" },
					{
						width: "100vw",
						ease: "none",
						scrollTrigger: {
							trigger: sectionRef.current,
							start: "top bottom",
							end: "top top",
							scrub: true,
						},
					},
				);
				gsap.fromTo(
					".video-expand-media",
					{ scale: 1.18 },
					{
						scale: 1,
						ease: "none",
						scrollTrigger: {
							trigger: sectionRef.current,
							start: "top bottom",
							end: "top top",
							scrub: true,
						},
					},
				);
			});

			return () => media.revert();
		},
		{ scope: sectionRef },
	);

	return (
		<section
			ref={sectionRef}
			aria-label={subtitle}
			className="relative flex justify-center overflow-x-clip bg-white pb-[8vw] pt-[4vw] max-[760px]:py-10"
		>
			<div className="video-expand-frame relative h-[100svh] w-[100vw] overflow-hidden bg-(--brand-blue) shadow-[0_24px_80px_rgba(38,45,98,0.18)] max-[760px]:!w-full">
				<div className="video-expand-media absolute inset-0">
					<video
						ref={videoRef}
						className="h-full w-full object-cover"
						src={VIDEO_SRC}
						muted
						loop
						playsInline
						preload="none"
						aria-hidden="true"
					/>
				</div>
				<div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(38,45,98,0.72),rgba(38,45,98,0.2)_48%,rgba(20,26,66,0.74))]" />

				<div className="absolute left-[clamp(24px,5vw,80px)] top-[clamp(88px,9vw,132px)] text-white">
					<p
						className="text-[0.72rem] font-normal uppercase tracking-[0.08em] text-white/75"
					>
						{kicker}
					</p>
					<h2
						className="mt-6 max-w-[14ch] text-[clamp(2.8rem,6vw,6.2rem)] font-light leading-[0.95] tracking-[-0.04em]"
					>
						{subtitle}
					</h2>
				</div>

				<p className="absolute inset-x-[clamp(24px,5vw,80px)] bottom-[clamp(24px,5vw,72px)] max-w-md text-[1.05rem] font-light leading-[1.5] text-white/85">
					{caption}
				</p>
			</div>
		</section>
	);
}
