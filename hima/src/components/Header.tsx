"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-8 py-6 flex justify-between items-start mix-blend-difference text-white`}
        >
            <div className="flex flex-col gap-6 w-32">
                <div className="text-4xl font-serif tracking-tight font-light cursor-pointer">
                    hima
                </div>
                <div className="flex flex-col gap-2 text-sm uppercase tracking-wider hidden md:flex">
                    <Link href="#" className="hover:text-hima-gold transition-colors">
                        Careers
                    </Link>
                    <Link href="#" className="hover:text-hima-gold transition-colors">
                        News
                    </Link>
                </div>
            </div>

            <div>
                <Link
                    href="#"
                    className="text-sm uppercase tracking-wider hover:text-hima-gold transition-colors"
                >
                    Contact
                </Link>
            </div>
        </header>
    );
}
