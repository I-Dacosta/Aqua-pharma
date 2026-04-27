"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";

type TransitionRect = {
  top: number;
  left: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
};

type ProductTransitionPayload = {
  href: string;
  image: string;
  alt: string;
  sourceRect: TransitionRect;
};

type ProductTransitionContextValue = {
  startProductTransition: (payload: ProductTransitionPayload) => void;
};

const ProductTransitionContext = createContext<ProductTransitionContextValue | null>(null);

export function useProductTransition() {
  const context = useContext(ProductTransitionContext);

  if (!context) {
    throw new Error("useProductTransition must be used within ProductTransitionProvider");
  }

  return context;
}

export function ProductTransitionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const isTransitioningRef = useRef(false);
  const navigateRef = useRef<(() => void) | null>(null);
  const [transition, setTransition] = useState<ProductTransitionPayload | null>(null);

  const startProductTransition = useCallback((payload: ProductTransitionPayload) => {
    if (isTransitioningRef.current) {
      return;
    }

    isTransitioningRef.current = true;
    navigateRef.current = () => router.push(payload.href);
    setTransition(payload);
  }, [router]);

  useLayoutEffect(() => {
    if (!transition || !overlayRef.current || !maskRef.current || !frameRef.current || !innerRef.current) {
      return;
    }

    const overlay = overlayRef.current;
    const mask = maskRef.current;
    const frame = frameRef.current;
    const inner = innerRef.current;
    const { sourceRect } = transition;
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const clipTop = Math.max(sourceRect.top, 0);
    const clipRight = Math.max(viewportWidth - sourceRect.right, 0);
    const clipBottom = Math.max(viewportHeight - sourceRect.bottom, 0);
    const clipLeft = Math.max(sourceRect.left, 0);

    gsap.killTweensOf([overlay, mask, frame, inner]);
    gsap.set(overlay, { autoAlpha: 1 });
    gsap.set(mask, {
      clipPath: `inset(${clipTop}px ${clipRight}px ${clipBottom}px ${clipLeft}px)`,
    });
    gsap.set(frame, {
      x: sourceRect.left,
      y: sourceRect.top,
      width: sourceRect.width,
      height: sourceRect.height,
    });
    gsap.set(inner, { xPercent: -6, scale: 1.14 });

    const animation = gsap.timeline();

    animation
      .to(
        mask,
        {
          clipPath: "inset(0px 0px 0px 0px)",
          duration: 0.9,
          ease: "power3.inOut",
        },
        0,
      )
      .to(
        frame,
        {
          x: 0,
          y: 0,
          width: viewportWidth,
          height: viewportHeight,
          duration: 0.9,
          ease: "power3.inOut",
        },
        0,
      )
      .to(
        inner,
        {
          xPercent: 0,
          scale: 1.02,
          duration: 0.9,
          ease: "power3.inOut",
        },
        0,
      )
      .add(() => {
        const navigate = navigateRef.current;
        if (navigate) navigate();
      }, 0.42);

    return () => {
      animation.kill();
    };
  }, [transition]);

  useEffect(() => {
    if (!transition || pathname !== transition.href || !overlayRef.current) {
      return;
    }

    const overlay = overlayRef.current;
    const clearTransition = () => {
      setTransition(null);
      isTransitioningRef.current = false;
      gsap.set([overlayRef.current, maskRef.current, frameRef.current, innerRef.current], {
        clearProps: "all",
      });
    };

    const animation = gsap.timeline({ onComplete: clearTransition });
    animation.to(overlay, {
      autoAlpha: 0,
      duration: 0.35,
      ease: "power2.out",
      delay: 0.18,
    });

    return () => {
      animation.kill();
    };
  }, [pathname, transition]);

  const contextValue = useMemo(
    () => ({ startProductTransition }),
    [startProductTransition],
  );

  return (
    <ProductTransitionContext.Provider value={contextValue}>
      {children}

      <div ref={overlayRef} className="pointer-events-none fixed inset-0 z-120 opacity-0">
        <div ref={maskRef} className="absolute inset-0 overflow-hidden bg-(--brand-paper)">
          {transition ? (
            <div ref={frameRef} className="absolute left-0 top-0 overflow-hidden bg-(--brand-paper)">
              <div ref={innerRef} className="absolute inset-0 will-change-transform">
                <Image
                  src={transition.image}
                  alt={transition.alt}
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-black/8" />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </ProductTransitionContext.Provider>
  );
}