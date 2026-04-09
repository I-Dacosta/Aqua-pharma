import Link from "next/link";

export function Footer() {
    return (
        <footer className="border-t border-(--brand-border) bg-(--brand-blue) px-8 py-16 text-white/72 lg:px-16">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="text-sm font-medium tracking-wide">
                    Copyright © 2025 Aqua Pharma
                </div>

                <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
                    <Link href="/wp-content/uploads/2024/09/Aqua-Pharma-Privacy-statement-and-cookie-policy_-Aug-2024.pdf" className="transition-colors hover:text-(--brand-tangerine)">
                        Privacy Notice and Cookie Policy
                    </Link>
                    <Link href="/terms-and-conditions/" className="transition-colors hover:text-(--brand-tangerine)">
                        Terms and Conditions
                    </Link>
                    <Link href="/transparency-act/" className="transition-colors hover:text-(--brand-tangerine)">
                        Transparency Act
                    </Link>
                    <Link href="/wp-content/uploads/2025/03/English-APG-Supplier-Code-of-Conduct-June-2024.pdf" className="flex items-center gap-2 transition-colors hover:text-(--brand-tangerine)">
                        <span>🇬🇧</span> APG Supplier Code of Conduct (EN)
                    </Link>
                    <Link href="/wp-content/uploads/2025/03/Spanish-APG-Supplier-Code-of-Conduct-June-2024.pdf" className="flex items-center gap-2 transition-colors hover:text-(--brand-tangerine)">
                        <span>🇪🇸</span> APG Supplier Code of Conduct (ES)
                    </Link>
                </div>

                <div className="flex items-center gap-4">
                    <a href="https://www.linkedin.com/company/aqua-pharma/" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold uppercase tracking-widest transition-colors hover:text-(--brand-tangerine)">
                        LinkedIn
                    </a>
                </div>
            </div>
        </footer>
    );
}
