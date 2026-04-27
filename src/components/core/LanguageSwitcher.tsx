"use client";

import { startTransition } from "react";
import { useRouter } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import { writeLocaleCookie } from "@/i18n/locale-cookie";
import { useSiteLocale } from "@/components/core/SiteLocaleProvider";

type LanguageSwitcherProps = {
  className?: string;
  compact?: boolean;
  onSelect?: () => void;
  tone?: "overlay" | "panel";
};

export function LanguageSwitcher({ className, compact = false, onSelect, tone = "overlay" }: LanguageSwitcherProps) {
  const router = useRouter();
  const { locale, content } = useSiteLocale();

  const usesPanelTone = compact || tone === "panel";

  const handleSelect = (nextLocale: Locale) => {
    if (nextLocale === locale) {
      onSelect?.();
      return;
    }

    writeLocaleCookie(nextLocale);

    onSelect?.();
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div className={className} aria-label={content.languageSwitcher.label} role="group">
      <div className={`inline-flex items-center rounded-full border ${usesPanelTone ? "border-(--brand-blue)/14 bg-white/88 p-1 shadow-[0_10px_30px_rgba(38,45,98,0.08)]" : "border-white/18 bg-white/10 p-1"}`}>
        {locales.map((option) => {
          const isActive = option === locale;
          const optionLabel = content.languageSwitcher.options.find((entry) => entry.locale === option)?.label ?? option.toUpperCase();

          return (
            <button
              key={option}
              type="button"
              onClick={() => handleSelect(option)}
              className={`rounded-full px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] transition-colors ${usesPanelTone ? (isActive ? "bg-(--brand-blue) text-white" : "text-(--brand-blue)/62 hover:text-(--brand-blue)") : (isActive ? "bg-white text-(--brand-blue)" : "text-white/70 hover:text-white")}`}
              aria-pressed={isActive}
            >
              {optionLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
}