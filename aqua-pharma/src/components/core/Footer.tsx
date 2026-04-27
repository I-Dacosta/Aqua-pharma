"use client";

import Link from "next/link";
import { useSiteLocale } from "@/components/core/SiteLocaleProvider";

export function Footer() {
    const { content } = useSiteLocale();

    return (
        <footer className="border-t border-(--brand-border) bg-(--brand-blue) px-8 py-16 text-white/72 lg:px-16">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="text-sm font-medium tracking-wide">
                    {content.footer.copyright}
                </div>

                <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
                    <Link href="/wp-content/uploads/2024/09/Aqua-Pharma-Privacy-statement-and-cookie-policy_-Aug-2024.pdf" className="transition-colors hover:text-(--brand-tangerine)">
                        {content.footer.privacy}
                    </Link>
                    <Link href="/terms-and-conditions/" className="transition-colors hover:text-(--brand-tangerine)">
                        {content.footer.terms}
                    </Link>
                    <Link href="/transparency-act/" className="transition-colors hover:text-(--brand-tangerine)">
                        {content.footer.transparency}
                    </Link>
                    <Link href="/wp-content/uploads/2025/03/English-APG-Supplier-Code-of-Conduct-June-2024.pdf" className="flex items-center gap-2 transition-colors hover:text-(--brand-tangerine)">
                        <span>🇬🇧</span> {content.footer.supplierCodeEn}
                    </Link>
                    <Link href="/wp-content/uploads/2025/03/Spanish-APG-Supplier-Code-of-Conduct-June-2024.pdf" className="flex items-center gap-2 transition-colors hover:text-(--brand-tangerine)">
                        <span>🇪🇸</span> {content.footer.supplierCodeEs}
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <a href="https://www.linkedin.com/company/aqua-pharma/" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold uppercase tracking-widest transition-colors hover:text-(--brand-tangerine)">
                        {content.footer.linkedin}
                    </a>
                </div>
            </div>
        </footer>
    );
}
