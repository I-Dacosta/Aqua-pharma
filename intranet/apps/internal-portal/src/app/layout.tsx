import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { EntraAuthProvider } from "@platform/auth";
import { loadPlatformConfig } from "@platform/config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Intranett",
  description: "Internal SharePoint and customer workspace portal",
};

const config = loadPlatformConfig();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <EntraAuthProvider
          clientId={config.NEXT_PUBLIC_ENTRA_CLIENT_ID}
          tenantId={config.NEXT_PUBLIC_ENTRA_TENANT_ID}
        >
          {children}
        </EntraAuthProvider>
      </body>
    </html>
  );
}
