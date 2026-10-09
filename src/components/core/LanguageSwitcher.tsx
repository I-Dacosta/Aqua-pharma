"use client";

import { startTransition } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
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
  const currentLabel = content.languageSwitcher.options.find((entry) => entry.locale === locale)?.label ?? locale.toUpperCase();

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

  if (!compact) {
    return (
      <div
        className={`group/language relative ${className ?? ""}`}
        aria-label={content.languageSwitcher.label}
        role="group"
      >
        <button
          type="button"
          className={`flex h-8 items-center gap-1.5 rounded-full px-3 text-[0.864rem] font-normal uppercase tracking-[0.08em] transition-[color,opacity] duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--brand-blue) ${usesPanelTone ? "text-(--brand-blue)" : "text-current drop-shadow-[0_8px_22px_rgba(3,9,27,0.22)]"}`}
          aria-haspopup="menu"
        >
          <span>{currentLabel}</span>
          <ChevronDown
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover/language:rotate-180 group-focus-within/language:rotate-180"
            strokeWidth={2.4}
          />
        </button>

        <div
          role="menu"
          className="invisible absolute right-0 top-full z-40 w-32 translate-y-1 pt-3 opacity-0 transition-[opacity,transform,visibility] duration-200 group-hover/language:visible group-hover/language:translate-y-0 group-hover/language:opacity-100 group-focus-within/language:visible group-focus-within/language:translate-y-0 group-focus-within/language:opacity-100"
        >
          <div className="overflow-hidden rounded-[8px] border border-black/10 bg-white/97 p-1 shadow-[0_24px_70px_rgba(5,12,31,0.22)] backdrop-blur-xl">
            {locales.map((option) => {
              const isActive = option === locale;
              const optionLabel = content.languageSwitcher.options.find((entry) => entry.locale === option)?.label ?? option.toUpperCase();

              return (
                <button
                  key={option}
                  type="button"
                  role="menuitemradio"
                  aria-checked={isActive}
                  onClick={() => handleSelect(option)}
                  className={`block w-full rounded-[5px] px-3 py-2 text-left text-[0.68rem] font-semibold uppercase tracking-[0.18em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-(--brand-blue) ${isActive ? "bg-(--brand-blue-soft)/45 text-(--brand-blue)" : "text-(--brand-blue)/62 hover:bg-(--brand-blue-soft)/30 hover:text-(--brand-blue)"}`}
                >
                  {optionLabel}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className} aria-label={content.languageSwitcher.label} role="group">
      <div className={`inline-flex items-center rounded-full ${usesPanelTone ? "bg-white/88 p-1 shadow-[0_10px_30px_rgba(38,45,98,0.08)]" : "bg-white/10 p-1"}`}>
        {locales.map((option) => {
          const isActive = option === locale;
          const optionLabel = content.languageSwitcher.options.find((entry) => entry.locale === option)?.label ?? option.toUpperCase();

          return (
            <button
              key={option}
              type="button"
              onClick={() => handleSelect(option)}
              className={`rounded-full px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${usesPanelTone ? (isActive ? "bg-(--brand-blue) text-white" : "text-(--brand-blue)/62 hover:text-(--brand-blue)") : (isActive ? "bg-white text-(--brand-blue)" : "text-white/70 hover:text-white")}`}
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
