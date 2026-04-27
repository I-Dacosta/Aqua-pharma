import type { RefObject } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type UseMapScrollAnimationsParams = {
    sectionRef: RefObject<HTMLElement | null>;
    isMapReady: boolean;
    applyOverviewCameraRef: RefObject<((animate: boolean) => void) | null>;
    activeIsoRef: RefObject<string | null>;
};

export function useMapScrollAnimations({
    sectionRef,
    isMapReady,
    applyOverviewCameraRef,
    activeIsoRef,
}: UseMapScrollAnimationsParams) {
    useGSAP(() => {
        if (!isMapReady || !sectionRef.current || !applyOverviewCameraRef.current) {
            return;
        }

        const trigger = ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top 85%',
            end: 'top 15%',
            onEnter: () => {
                if (!activeIsoRef.current) {
                    applyOverviewCameraRef.current?.(true);
                }
            },
            onEnterBack: () => {
                if (!activeIsoRef.current) {
                    applyOverviewCameraRef.current?.(true);
                }
            }
        });

        gsap.from('.map-section__panel', {
            y: 28,
            opacity: 0,
            duration: 0.95,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 82%',
            }
        });

        gsap.from('.map-section__hud', {
            y: -20,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 78%',
            }
        });

        gsap.to('.map-section__map-shell', {
            yPercent: -3,
            ease: 'none',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            }
        });

        return () => {
            trigger.kill();
        };
    }, { dependencies: [isMapReady], scope: sectionRef });
}
