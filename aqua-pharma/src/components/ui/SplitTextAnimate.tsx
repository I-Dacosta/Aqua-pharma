"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface SplitTextAnimateProps {
  text: string;
  className?: string;
  triggerRef?: React.RefObject<HTMLElement | null>;
  once?: boolean;
}

export function SplitTextAnimate({
  text,
  className = "",
  triggerRef,
  once = false,
}: SplitTextAnimateProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Split text into words and characters
  const splitText = (str: string) => {
    return str.split(" ").map((word, wordIdx) => ({
      word,
      wordIdx,
      chars: word.split(""),
    }));
  };

  const words = splitText(text);
  const totalChars = text.replace(/\s/g, "").length;
  const wordOffsets = words.map((_, i) =>
    words.slice(0, i).reduce((sum, w) => sum + w.chars.length, 0)
  );

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const chars = containerRef.current.querySelectorAll("[data-char]");

      // Create animation for each character
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef?.current || containerRef.current,
          start: "top 80%",
          toggleActions: once ? "play none none none" : "play reverse play reverse",
        },
      });

      chars.forEach((char, index) => {
        tl.from(
          char,
          {
            opacity: 0,
            y: 20,
            duration: 0.4,
            ease: "power2.out",
          },
          index * 0.03 // Stagger each character by 30ms
        );
      });
    },
    { scope: containerRef, dependencies: [text, triggerRef] }
  );

  return (
    <div
      ref={containerRef}
      className={`c-split-text anim-text-balance ${className}`}
      style={{ "--total-chars": totalChars } as React.CSSProperties}
      aria-hidden="true"
    >
      {words.map((wordData, wordRenderIdx) => (
        <span key={wordData.wordIdx}>
          <span
            style={{ whiteSpace: "nowrap" }}
            data-word=""
          >
            {wordData.chars.map((char, charIdx) => (
              <span
                key={`${wordData.wordIdx}-${charIdx}`}
                style={{ "--char-index": wordOffsets[wordData.wordIdx] + charIdx } as React.CSSProperties}
                data-char=""
              >
                {char}
              </span>
            ))}
          </span>
          {wordRenderIdx < words.length - 1 ? " " : null}
        </span>
      ))}
    </div>
  );
}
