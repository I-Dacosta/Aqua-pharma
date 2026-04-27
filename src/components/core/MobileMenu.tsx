"use client";

import { useState, type RefObject } from "react";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/core/LanguageSwitcher";
import type { NavigationLink } from "@/i18n/site-content";

type NavDropdown = "salmon" | "shrimp" | "about" | null;

type MobileMenuProps = {
    overlayRef: RefObject<HTMLDivElement | null>;
    onClose: () => void;
    intro: string;
    description: string;
    contactLabel: string;
    links: NavigationLink[];
};

export function MobileMenu({ overlayRef, onClose, intro, description, contactLabel, links }: MobileMenuProps) {
    const [activeDropdown, setActiveDropdown] = useState<NavDropdown>(null);

    const handleClose = () => {
        setActiveDropdown(null);
        onClose();
    };

    return (
        <div
            ref={overlayRef}
            role="button"
            tabIndex={-1}
            aria-label="Close navigation"
            className="pointer-events-none fixed inset-0 z-40 translate-x-full bg-[rgba(38,45,98,0.18)] opacity-0"
            onClick={handleClose}
            onKeyDown={(e) => { if (e.key === 'Escape' || e.key === 'Enter') handleClose(); }}
        >
            <div
                role="none"
                className="ml-auto flex h-full w-full max-w-xl flex-col bg-(--brand-paper) px-6 pb-10 pt-24 text-(--brand-blue) shadow-[-18px_0_60px_rgba(38,45,98,0.18)] md:px-8"
                onClick={(event) => event.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <div className="mb-12 border-b border-(--brand-border) pb-8">
                    <p className="text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-(--brand-glaucous)">
                        {intro}
                    </p>
                    <p className="mt-4 max-w-sm text-[1.55rem] leading-[1.15] tracking-[-0.04em] text-(--brand-blue) md:text-[1.9rem]">
                        {description}
                    </p>
                    <LanguageSwitcher className="mt-6" compact onSelect={handleClose} />
                </div>

                <div className="flex flex-1 flex-col justify-between">
                    <div className="space-y-2">
                        {links.map((link) => (
                            <div key={link.name}>
                                {link.href ? (
                                    <Link
                                        href={link.href}
                                        className="block rounded-full px-4 py-3 text-[0.95rem] font-medium tracking-[-0.02em] transition-colors hover:bg-(--brand-blue-soft)"
                                        onClick={handleClose}
                                    >
                                        {link.name}
                                    </Link>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => {
                                                if ('dropdown' in link && link.dropdown) {
                                                    setActiveDropdown(activeDropdown === link.dropdown ? null : link.dropdown);
                                                }
                                            }}
                                            className="flex w-full items-center justify-between rounded-full px-4 py-3 text-left text-[0.95rem] font-medium tracking-[-0.02em] transition-colors hover:bg-(--brand-blue-soft)"
                                        >
                                            {link.name}
                                            <span className={`transition-transform ${activeDropdown === ('dropdown' in link ? link.dropdown : null) ? "rotate-180" : ""}`}>
                                                ▼
                                            </span>
                                        </button>
                                        {'dropdown' in link && activeDropdown === link.dropdown && (
                                            <div className="ml-4 space-y-1 rounded-lg bg-(--brand-blue-soft)/55 py-2">
                                                {link.subLinks?.map((subLink) => (
                                                    <Link
                                                        key={subLink.name}
                                                        href={subLink.href}
                                                        className="block px-4 py-2 text-[0.9rem] font-medium tracking-[-0.02em] text-(--brand-ink-muted) transition-colors hover:text-(--brand-blue)"
                                                        onClick={handleClose}
                                                    >
                                                        {subLink.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 space-y-5 border-t border-(--brand-border) pt-8">
                        <Link
                            href="#contact"
                            className="inline-flex min-h-13 items-center rounded-full bg-(--brand-tangerine) px-6 py-3 text-[0.8rem] font-semibold uppercase tracking-[0.18em] text-(--brand-dark) transition-colors hover:bg-(--brand-tangerine)/85"
                            onClick={handleClose}
                        >
                            {contactLabel}
                        </Link>
                        <p className="max-w-sm text-sm leading-6 text-(--brand-ink-muted)">
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
