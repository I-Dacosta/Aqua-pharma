"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.08,
    });
    lenisRef.current = lenis;

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenisRef.current = null;
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const syncScrollToLocation = () => {
      let id = window.location.hash.slice(1);
      try {
        id = decodeURIComponent(id);
      } catch {
        id = "";
      }
      const target = id ? document.getElementById(id) : null;

      if (target) {
        target.scrollIntoView({ behavior: "instant", block: "start" });
      } else if (!id) {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
      lenisRef.current?.scrollTo(target ? window.scrollY : 0, {
        immediate: true,
        force: true,
      });
      ScrollTrigger.refresh();
    };

    const frameId = window.requestAnimationFrame(syncScrollToLocation);
    const settledId = window.setTimeout(() => {
      if (window.location.hash) syncScrollToLocation();
    }, 200);
    window.addEventListener("hashchange", syncScrollToLocation);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(settledId);
      window.removeEventListener("hashchange", syncScrollToLocation);
    };
  }, [pathname]);

  return <>{children}</>;
}
