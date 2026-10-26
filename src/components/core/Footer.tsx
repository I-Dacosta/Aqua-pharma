"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useSiteLocale } from "@/components/core/SiteLocaleProvider";

const privacyPolicyUrl = "https://aqua-pharma.com/wp-content/uploads/2024/09/Aqua-Pharma-Privacy-statement-and-cookie-policy_-Aug-2024.pdf";
const legalNoticeUrl = "https://aqua-pharma.com/terms-and-conditions/";
const linkedInUrl = "https://www.linkedin.com/company/aqua-pharma/";
const utilityLinkClass = "text-[0.82rem] font-medium leading-5 text-white/78 transition-colors hover:text-(--brand-cyan-light) focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white";

type CookieSettingsDialogProps = {
    closeLabel: string;
    description: string;
    isOpen: boolean;
    title: string;
    onClose: () => void;
};

function CookieSettingsDialog({ closeLabel, description, isOpen, title, onClose }: CookieSettingsDialogProps) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-(--brand-blue-dark)/72 p-6" onClick={onClose}>
            <section
                aria-labelledby="cookie-settings-title"
                aria-modal="true"
                className="relative w-full max-w-[32rem] border border-white/20 bg-(--brand-blue-dark) p-7 text-white shadow-2xl md:p-9"
                role="dialog"
                onClick={(event) => event.stopPropagation()}
            >
                <button
                    aria-label={closeLabel}
                    className="absolute right-4 top-4 inline-flex size-10 items-center justify-center text-white/80 transition-colors hover:text-(--brand-cyan-light) focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    onClick={onClose}
                    type="button"
                >
                    <X aria-hidden="true" size={20} strokeWidth={1.8} />
                </button>
                <h2 id="cookie-settings-title" className="pr-12 font-heading text-[2rem] font-light leading-none text-white">
                    {title}
                </h2>
                <p className="mt-5 max-w-[26rem] text-[1rem] font-light leading-7 text-white/76">{description}</p>
                <button className="brand-button mt-8" onClick={onClose} type="button">
                    {closeLabel}
                </button>
            </section>
        </div>
    );
}

export function Footer() {
    const { content } = useSiteLocale();
    const [isCookieSettingsOpen, setIsCookieSettingsOpen] = useState(false);
    const footer = content.footer;

    return (
        <footer className="border-t border-white/14 bg-(--brand-blue-dark) px-6 py-5 text-white md:px-12 lg:px-20">
            <div className="mx-auto flex max-w-[100rem] flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <span className="shrink-0 text-[0.78rem] font-medium uppercase tracking-[0.08em] text-white/62">{footer.copyright}</span>
                <nav aria-label={footer.navigationLabel} className="flex flex-wrap items-center gap-x-5 gap-y-3 md:justify-end">
                    <Link className={utilityLinkClass} href="/contact">{footer.contact}</Link>
                    <Link className={utilityLinkClass} href="/contact#local-experts">{footer.findLocalExpert}</Link>
                    <a className={utilityLinkClass} href={linkedInUrl} rel="noopener noreferrer" target="_blank">{footer.linkedin}</a>
                    <a className={utilityLinkClass} href={privacyPolicyUrl} rel="noopener noreferrer" target="_blank">{footer.privacyPolicy}</a>
                    <a className={utilityLinkClass} href={legalNoticeUrl} rel="noopener noreferrer" target="_blank">{footer.legalNotice}</a>
                    <button className={utilityLinkClass} onClick={() => setIsCookieSettingsOpen(true)} type="button">{footer.cookieSettings}</button>
                </nav>
            </div>
            <CookieSettingsDialog
                closeLabel={footer.closeCookieSettings}
                description={footer.cookieSettingsDescription}
                isOpen={isCookieSettingsOpen}
                onClose={() => setIsCookieSettingsOpen(false)}
                title={footer.cookieSettings}
            />
        </footer>
    );
}
