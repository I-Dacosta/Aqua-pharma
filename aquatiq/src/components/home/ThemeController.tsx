"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import { Monitor, Sun, Moon } from "lucide-react";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

type ThemeMode = 'system' | 'light' | 'dark';

export const ThemeContext = createContext<{
    isDark: boolean;
    setIsDark: (val: boolean) => void;
    mode: ThemeMode;
    setMode: (mode: ThemeMode, event?: React.MouseEvent) => void;
}>({
    isDark: false,
    setIsDark: () => { },
    mode: 'system',
    setMode: () => { },
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [mode, setModeState] = useState<ThemeMode>('system'); // Default to system so scroll takes over
    const [isDark, setIsDark] = useState(true);

    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [isDark]);

    const setMode = (newMode: ThemeMode, event?: React.MouseEvent) => {
        setModeState(newMode);

        let nextIsDark = false;
        if (newMode === 'system') {
            nextIsDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        } else {
            nextIsDark = newMode === 'dark';
        }

        if (nextIsDark === isDark) return;

        // Standard toggle fallback if View Transitions API is not supported
        if (!document.startViewTransition || !event) {
            setIsDark(nextIsDark);
            return;
        }

        // View Transitions implementation
        const x = event.clientX;
        const y = event.clientY;
        const endRadius = Math.hypot(
            Math.max(x, innerWidth - x),
            Math.max(y, innerHeight - y)
        );

        const transition = document.startViewTransition(() => {
            setIsDark(nextIsDark);
        });

        transition.ready.then(() => {
            const clipPath = [
                `circle(0px at ${x}px ${y}px)`,
                `circle(${endRadius}px at ${x}px ${y}px)`,
            ];

            document.documentElement.animate(
                {
                    clipPath: nextIsDark ? clipPath : [...clipPath].reverse(),
                },
                {
                    duration: 700,
                    easing: "cubic-bezier(0.76, 0, 0.24, 1)",
                    pseudoElement: nextIsDark
                        ? "::view-transition-new(root)"
                        : "::view-transition-old(root)",
                }
            );
        });
    };

    return (
        <ThemeContext.Provider value={{ isDark, setIsDark, mode, setMode }}>
            <div className="min-h-screen font-sans selection:bg-blue-600 selection:text-white transition-colors duration-200">
                {children}
            </div>
        </ThemeContext.Provider>
    );
}

export function ThemeMarker({ isDarkTheme, children, className }: { isDarkTheme: boolean, children?: React.ReactNode, className?: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { margin: "-20% 0px -55% 0px" });
    const { setIsDark } = useContext(ThemeContext);

    useEffect(() => {
        if (isInView) {
            setIsDark(isDarkTheme);
        }
    }, [isInView, isDarkTheme, setIsDark]);

    return (
        <div ref={ref} className={className}>
            {children}
        </div>
    );
}

export function ThemeToggle() {
    const { mode, setMode } = useContext(ThemeContext);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-1 p-1 rounded-full bg-white/90 dark:bg-[#1a1d1d] backdrop-blur-md shadow-[0_8px_32px_rgba(0,0,0,0.12)] border border-gray-200/50 dark:border-white/10">
            <button
                onClick={(e) => setMode('system', e)}
                className={cn(
                    "relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300",
                    mode === 'system'
                        ? "text-black dark:text-white bg-gray-100 dark:bg-white/10 shadow-sm"
                        : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
                )}
                aria-label="System Theme"
            >
                <Monitor className="w-[18px] h-[18px]" strokeWidth={2} />
            </button>
            <button
                onClick={(e) => setMode('light', e)}
                className={cn(
                    "relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300",
                    mode === 'light'
                        ? "text-black dark:text-white bg-gray-100 dark:bg-white/10 shadow-sm"
                        : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
                )}
                aria-label="Light Theme"
            >
                <Sun className="w-[18px] h-[18px]" strokeWidth={2.5} />
            </button>
            <button
                onClick={(e) => setMode('dark', e)}
                className={cn(
                    "relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300",
                    mode === 'dark'
                        ? "text-black dark:text-white bg-gray-100 dark:bg-white/10 shadow-sm"
                        : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
                )}
                aria-label="Dark Theme"
            >
                <Moon className="w-[18px] h-[18px]" strokeWidth={2} />
            </button>
        </div>
    );
}
