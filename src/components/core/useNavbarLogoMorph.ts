import type { RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type LogoMorphRefs = {
    navInnerRef: RefObject<HTMLDivElement | null>;
    logoWrapRef: RefObject<HTMLDivElement | null>;
    burgerButtonRef: RefObject<HTMLButtonElement | null>;
};

export function useNavbarLogoMorph({ navInnerRef, logoWrapRef, burgerButtonRef }: LogoMorphRefs) {
    useGSAP(() => {
        const navLogoWrap = logoWrapRef.current;
        const navInner = navInnerRef.current;
        const burgerButton = burgerButtonRef.current;
        if (!navLogoWrap || !navInner || !burgerButton) return;

        const heroSection = document.getElementById("hero");
        const heroLogoPlaceholder = document.querySelector(".hero-brand") as HTMLElement | null;
        const logoImage = navLogoWrap.querySelector("img");

        if (heroSection && heroLogoPlaceholder && logoImage) {
            let xOffset = 0;
            let yOffset = 0;
            let scaleOffset = 1;

            const calculateBounds = () => {
                const st = navLogoWrap.style;
                const oldT = st.transform;
                st.transform = "none";

                const nRect = navLogoWrap.getBoundingClientRect();
                const hRect = heroLogoPlaceholder.getBoundingClientRect();

                st.transform = oldT;

                if (!nRect.width || !hRect.width) {
                    xOffset = 0;
                    yOffset = 0;
                    scaleOffset = 1;
                    return;
                }

                xOffset = hRect.left - nRect.left;
                yOffset = hRect.top - nRect.top;
                scaleOffset = hRect.width / nRect.width;
            };

            calculateBounds();

            gsap.set(navLogoWrap, {
                autoAlpha: 1,
                x: xOffset,
                y: yOffset,
                scale: scaleOffset,
                pointerEvents: "auto",
                transformOrigin: "top left",
                force3D: true,
                willChange: "transform",
            });
            gsap.set(navInner, { color: "#ffffff" });
            gsap.set(burgerButton, {
                color: "#ffffff",
                backgroundColor: "transparent",
                borderColor: "rgba(255,255,255,0.18)",
                boxShadow: "none",
            });
            gsap.set(logoImage, { filter: "brightness(1) saturate(100%)" });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: heroSection,
                    start: "top top",
                    end: "bottom top",
                    scrub: 0.2,
                    invalidateOnRefresh: true,
                    onRefreshInit: calculateBounds,
                }
            });

            tl.fromTo(navLogoWrap,
                { x: () => xOffset, y: () => yOffset, scale: () => scaleOffset },
                { duration: 1, x: 0, y: 0, scale: 1, ease: "none" },
                0
            )
                .to(navInner, { duration: 0.28, color: "var(--brand-blue)", ease: "none" }, 0.80)
                .to(burgerButton, {
                    duration: 0.24,
                    color: "var(--brand-blue)",
                    ease: "none"
                }, 0.74)
                .to(burgerButton, {
                    duration: 0.28,
                    backgroundColor: "rgba(255,255,255,0.96)",
                    borderColor: "rgba(38,45,98,0.12)",
                    boxShadow: "0 14px 32px rgba(38,45,98,0.12)",
                    ease: "none"
                }, 0.80)
                .to(logoImage, { duration: 0.28, filter: "brightness(0) saturate(100%)", ease: "none" }, 0.74);

            return () => {
                gsap.set(navLogoWrap, { clearProps: "willChange" });
            };
        }

        gsap.to(navLogoWrap, {
            autoAlpha: 1,
            x: 0,
            scale: 1,
            duration: 0.22,
            ease: "power3.out"
        });
        gsap.to(navInner, {
            color: "var(--brand-blue)",
            duration: 0.22,
            ease: "power3.out"
        });
        gsap.to(burgerButton, {
            color: "var(--brand-blue)",
            backgroundColor: "rgba(255,255,255,0.96)",
            borderColor: "rgba(38,45,98,0.12)",
            boxShadow: "0 14px 32px rgba(38,45,98,0.12)",
            duration: 0.22,
            ease: "power3.out"
        });
    }, []);
}

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}
