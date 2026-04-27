import { localeCookieName, type Locale } from "@/i18n/config";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export function writeLocaleCookie(nextLocale: Locale) {
  document.cookie = `${localeCookieName}=${nextLocale}; path=/; max-age=${ONE_YEAR_SECONDS}; samesite=lax`;
}
