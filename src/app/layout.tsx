import type { Metadata } from "next";
import { Inter } from "next/font/google";
import * as React from "react";

import "@/styles/globals.css";

import { siteConfig } from "@/config/site"
import { SiteHeader } from "@/components/site-header";
import { TopLevelProviders } from "@/components/top-level-providers";
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name}`,
    template: `%s - ${siteConfig.name}`,
  },
  metadataBase: new URL(siteConfig.url),
  description: siteConfig.description,
  icons: {
    icon: [
      "/icon/favicon.svg",
      "/icon/favicon.ico",
      "/icon/favicon-16x16.png",
      "/icon/favicon-32x32.png",
    ],
    shortcut: ["/icon/favicon-16x16.png", "/icon/favicon-32x32.png"],
    apple: "/favicon/apple-touch-180x180.png",
    other: [{
      rel: "mask-icon",
      url: "/icon/safari-pinned-tab.svg",
      color: "#000"
    }]
  },
  manifest: `/site.webmanifest.json`,
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      { url: siteConfig.opengraphImage, },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body className={cn(inter.className, "min-h-screen antialiased bg-background")}>
        <TopLevelProviders>
          <div className="relative flex min-h-screen flex-col bg-background">
            <SiteHeader />
            {children}
            <footer />
          </div>
        </TopLevelProviders>
      </body>
    </html>
  );
}
