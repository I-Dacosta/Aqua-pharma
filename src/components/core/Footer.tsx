"use client";

import type { ReactNode } from "react";
import Link from "next/link";

const footerGroups = [
    {
        title: "Salmon Farming",
        links: [
            { label: "Bath treatments", href: "/products/bath-treatments" },
            { label: "Dosing units and services", href: "/products/dosing-units-services" },
        ],
    },
    {
        title: "Shrimp Farming",
        links: [
            { label: "Water conditioning and oxygenation", href: "/products/water-conditioning-oxygenation" },
            { label: "Sustainability", href: "/sustainability" },
        ],
    },
    {
        title: "About",
        links: [
            { label: "About us", href: "/about" },
            { label: "Team", href: "/about/team" },
            { label: "Pioneering", href: "/about/pioneering" },
            { label: "Media", href: "/about/media" },
        ],
    },
];

const legalLinks = [
    { label: "Privacy Notice and Cookie Policy", href: "/wp-content/uploads/2024/09/Aqua-Pharma-Privacy-statement-and-cookie-policy_-Aug-2024.pdf" },
    { label: "Terms and Conditions", href: "/terms-and-conditions/" },
    { label: "Transparency Act", href: "/transparency-act/" },
    { label: "🇬🇧 APG Supplier Code of Conduct", href: "/wp-content/uploads/2025/03/English-APG-Supplier-Code-of-Conduct-June-2024.pdf" },
    { label: "🇪🇸 APG Supplier Code of Conduct", href: "/wp-content/uploads/2025/03/Spanish-APG-Supplier-Code-of-Conduct-June-2024.pdf" },
];

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
    return (
        <Link
            href={href}
            className="block w-fit text-[0.95rem] font-light leading-7 text-white/72 transition-colors hover:text-(--brand-cyan-light) focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
        >
            {children}
        </Link>
    );
}

export function Footer() {
    return (
        <footer className="bg-(--brand-blue-dark) px-6 py-16 text-white md:px-12 lg:px-20 lg:py-20">
            <div className="mx-auto max-w-[100rem]">
                <div className="grid gap-10 border-b border-white/18 pb-14 md:grid-cols-2 lg:grid-cols-[0.85fr_0.9fr_0.75fr_1.05fr_1fr] lg:gap-14">
                    {footerGroups.map((group) => (
                        <section key={group.title}>
                            <Link
                                href={group.links[0]?.href ?? "/"}
                                className="mb-5 block w-fit text-[1rem] font-semibold leading-6 text-white transition-colors hover:text-(--brand-cyan-light) focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                            >
                                {group.title}
                            </Link>
                            <div className="space-y-1">
                                {group.links.map((link) => (
                                    <FooterLink key={link.label} href={link.href}>
                                        {link.label}
                                    </FooterLink>
                                ))}
                            </div>
                        </section>
                    ))}

                    <section>
                        <Link
                            href="/#contact"
                            className="mb-5 block w-fit text-[1rem] font-semibold leading-6 text-white transition-colors hover:text-(--brand-cyan-light) focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                        >
                            Contact
                        </Link>
                        <p className="text-[1rem] font-semibold leading-6 text-white">Aqua Pharma</p>
                        <div className="mt-4 space-y-2 text-[0.95rem] font-light leading-7 text-white/72">
                            <p>Phone: +47 61 24 70 10</p>
                            <p>
                                E-mail:{" "}
                                <a href="mailto:contact@aqua-pharma.com" className="transition-colors hover:text-(--brand-cyan-light)">
                                    contact@aqua-pharma.com
                                </a>
                            </p>
                        </div>
                        <a
                            href="https://www.linkedin.com/company/aqua-pharma/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-7 block w-fit text-[0.95rem] font-light text-white/72 transition-colors hover:text-(--brand-cyan-light) focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                        >
                            Find us on Linkedin
                        </a>
                    </section>

                    <section>
                        <p className="mb-5 text-[1rem] font-semibold leading-6 text-white">Headquarters</p>
                        <address className="not-italic text-[0.95rem] font-light leading-7 text-white/72">
                            Hovemoveien 1<br />
                            2624 Lillehammer<br />
                            Norway
                        </address>
                        <a
                            href="https://www.google.no/maps/place/Aqua+Pharma+AS"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-7 block w-fit text-[0.95rem] font-light text-white/72 transition-colors hover:text-(--brand-cyan-light) focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                        >
                            Directions at Google maps
                        </a>
                    </section>
                </div>

                <div className="flex flex-col gap-5 pt-8 text-[0.82rem] font-light leading-6 text-white/58 lg:flex-row lg:flex-wrap lg:items-center lg:gap-x-8">
                    <span>Copyright © 2025 Aqua Pharma</span>
                    {legalLinks.map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="w-fit transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );
}
