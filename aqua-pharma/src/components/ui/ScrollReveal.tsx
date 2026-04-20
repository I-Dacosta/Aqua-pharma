"use client";

import { useRef, ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  start?: string;
  yOffset?: number;
  staggerChildren?: boolean;
  staggerAmount?: number;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  duration = 1,
  start = "top 88%",
  yOffset = 32,
  staggerChildren = false,
  staggerAmount = 0.12,
}: ScrollRevealProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = wrapperRef.current;
      if (!el) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(staggerChildren ? el.children : el, { autoAlpha: 1, y: 0 });
        return;
      }

      if (staggerChildren) {
        const childrenNodes = el.children;
        gsap.fromTo(
          childrenNodes,
          { autoAlpha: 0, y: yOffset },
          {
            autoAlpha: 1,
            y: 0,
            duration: duration,
            ease: "power3.out",
            delay,
            stagger: staggerAmount,
            scrollTrigger: {
              trigger: el,
              start,
              toggleActions: "play none none none",
            },
          }
        );
      } else {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: yOffset },
          {
            autoAlpha: 1,
            y: 0,
            duration: duration,
            ease: "power3.out",
            delay,
            scrollTrigger: {
              trigger: el,
              start,
              toggleActions: "play none none none",
            },
          }
        );
      }
    },
    { scope: wrapperRef }
  );

  return (
    <div ref={wrapperRef} className={`will-change-[transform,opacity] ${className}`}>
      {children}
    </div>
  );
}
