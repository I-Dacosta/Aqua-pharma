import type { RefObject } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type NavbarSurfaceRefs = {
    navShellRef: RefObject<HTMLElement | null>;
    navInnerRef: RefObject<HTMLDivElement | null>;
    burgerButtonRef: RefObject<HTMLButtonElement | null>;
};

function parseRgb(color: string) {
    const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);

    if (!match) {
        return null;
    }

    const alpha = match[4] === undefined ? 1 : Number(match[4]);

    if (alpha < 0.25) {
        return null;
    }

    return {
        r: Number(match[1]),
        g: Number(match[2]),
        b: Number(match[3]),
    };
}

function hasDarkNavbarSurface(element: Element | null) {
    let current: Element | null = element;

    while (current) {
        const className = typeof current.getAttribute === "function" ? current.getAttribute("class") ?? "" : "";

        if (
            current.id === "hero" ||
            current.tagName.toLowerCase() === "footer" ||
            className.includes("premium-ink-surface") ||
            className.includes("bg-(--brand-blue)") ||
            className.includes("bg-(--brand-blue-dark)")
        ) {
            return true;
        }

        current = current.parentElement;
    }

    return false;
}

function getEffectiveBackgroundColor(element: Element | null) {
    let current: Element | null = element;

    while (current) {
        const color = parseRgb(window.getComputedStyle(current).backgroundColor);

        if (color) {
            return color;
        }

        current = current.parentElement;
    }

    return { r: 255, g: 255, b: 255 };
}

function isLightColor({ r, g, b }: { r: number; g: number; b: number }) {
    return (r * 0.299 + g * 0.587 + b * 0.114) > 168;
}

export function shouldUseBlueNavbarForeground(navShell: HTMLElement) {
    const navHeight = navShell.getBoundingClientRect().height;
    const sampleY = Math.min(window.innerHeight - 1, Math.max(0, navHeight + 8));
    const sampleXs = [window.innerWidth * 0.24, window.innerWidth * 0.5, window.innerWidth * 0.76];
    const lightSamples = sampleXs.filter((sampleX) => {
        const element = document.elementFromPoint(sampleX, sampleY);

        if (hasDarkNavbarSurface(element)) {
            return false;
        }

        return isLightColor(getEffectiveBackgroundColor(element));
    }).length;

    return lightSamples >= 2;
}

export function useNavbarSurfaceColor({ navShellRef, navInnerRef, burgerButtonRef }: NavbarSurfaceRefs) {
    useGSAP(() => {
        const navShell = navShellRef.current;
        const navInner = navInnerRef.current;
        const burgerButton = burgerButtonRef.current;

        if (!navShell || !navInner || !burgerButton) {
            return;
        }

        let lastUsesBlueForeground: boolean | null = null;

        const syncNavSurface = () => {
            const usesBlueForeground = shouldUseBlueNavbarForeground(navShell);

            if (usesBlueForeground === lastUsesBlueForeground) {
                return;
            }

            lastUsesBlueForeground = usesBlueForeground;

            gsap.to(navShell, {
                duration: 0.24,
                backgroundColor: "transparent",
                boxShadow: "none",
                ease: "power3.out",
            });

            gsap.to(navInner, {
                duration: 0.24,
                color: usesBlueForeground ? "var(--brand-blue)" : "#ffffff",
                ease: "power3.out",
            });

            gsap.to(burgerButton, {
                duration: 0.24,
                color: usesBlueForeground ? "var(--brand-blue)" : "#ffffff",
                backgroundColor: "transparent",
                borderColor: "transparent",
                boxShadow: "none",
                ease: "power3.out",
            });
        };

        syncNavSurface();
        window.addEventListener("scroll", syncNavSurface, { passive: true });
        window.addEventListener("resize", syncNavSurface);

        return () => {
            window.removeEventListener("scroll", syncNavSurface);
            window.removeEventListener("resize", syncNavSurface);
        };
    }, []);
}
