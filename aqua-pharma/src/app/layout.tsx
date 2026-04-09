import type { Metadata } from "next";
import { Nunito_Sans, Outfit } from "next/font/google";
import "maplibre-gl/dist/maplibre-gl.css";
import "./globals.css";
import { ProductTransitionProvider } from "@/components/core/ProductTransitionProvider";
import { SmoothScrollProvider } from "@/components/core/SmoothScrollProvider";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aqua Pharma | Welfare Below Water",
  description: "Prevention and Control of Disease in Aquaculture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${nunitoSans.variable} ${outfit.variable} font-sans antialiased`}
      >
        <SmoothScrollProvider>
          <ProductTransitionProvider>{children}</ProductTransitionProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
