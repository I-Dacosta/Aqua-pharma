"use client";

import { useRef, ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ImageParallaxProps {
  children: ReactNode;
  className?: string;
  speed?: number; // 0 to 1 scaling, usually negative or positive e.g. 0.1
}

export function ImageParallax({ children, className = "", speed = 0.15 }: ImageParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const imgWrapper = imageWrapperRef.current;
      if (!container || !imgWrapper) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const offset = `${Math.min(Math.max(speed, 0.08), 0.24) * 100}%`;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      tl.fromTo(
        imgWrapper,
        { y: `-${offset}` },
        { y: offset, ease: "none" }
      );
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      <div ref={imageWrapperRef} className="absolute -inset-y-[10%] inset-x-0 h-[120%] w-full will-change-transform">
        {children}
      </div>
    </div>
  );
}
