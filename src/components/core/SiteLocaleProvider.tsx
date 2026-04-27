"use client";

import { createContext, useContext } from "react";
import type { Locale } from "@/i18n/config";
import type { SiteContent } from "@/i18n/site-content";

type SiteLocaleContextValue = {
  locale: Locale;
  content: SiteContent;
};

const SiteLocaleContext = createContext<SiteLocaleContextValue | null>(null);

export function SiteLocaleProvider({
  locale,
  content,
  children,
}: Readonly<SiteLocaleContextValue & { children: React.ReactNode }>) {
  return (
    <SiteLocaleContext.Provider value={{ locale, content }}>
      {children}
    </SiteLocaleContext.Provider>
  );
}

export function useSiteLocale() {
  const context = useContext(SiteLocaleContext);

  if (!context) {
    throw new Error("useSiteLocale must be used within SiteLocaleProvider");
  }

  return context;
}