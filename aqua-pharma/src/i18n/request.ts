import { cookies } from "next/headers";
import { defaultLocale, isLocale, type Locale, localeCookieName } from "@/i18n/config";

export async function getRequestLocale(): Promise<Locale> {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(localeCookieName)?.value;

  return isLocale(cookieLocale) ? cookieLocale : defaultLocale;
}