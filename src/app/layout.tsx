import type { Metadata } from "next";
import "maplibre-gl/dist/maplibre-gl.css";
import "./globals.css";
import { SiteLocaleProvider } from "@/components/core/SiteLocaleProvider";
import { ProductTransitionProvider } from "@/components/core/ProductTransitionProvider";
import { SmoothScrollProvider } from "@/components/core/SmoothScrollProvider";
import { getRequestLocale } from "@/i18n/request";
import { getSiteContent } from "@/i18n/site-content";

export const metadata: Metadata = {
  title: "Aqua Pharma | Welfare Below Water",
  description: "Prevention and Control of Disease in Aquaculture",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getRequestLocale();
  const content = getSiteContent(locale);

  return (
    <html lang={locale} className="scroll-smooth">
      <body className="antialiased">
        <SiteLocaleProvider locale={locale} content={content}>
          <SmoothScrollProvider>
            <ProductTransitionProvider>{children}</ProductTransitionProvider>
          </SmoothScrollProvider>
        </SiteLocaleProvider>
      </body>
    </html>
  );
}
