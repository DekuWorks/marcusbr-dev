import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Analytics from "@/components/Analytics";
import { SITE } from "@/lib/site";
import { buildRootJsonLd, SITE_DESCRIPTION } from "@/lib/seo";
import { EffectsPreferenceProvider } from "@/hooks/useEffectsPreference";
import { LiquidInteractionProvider } from "@/hooks/useLiquidInteraction";
import { CommandPaletteProvider } from "@/hooks/useCommandPalette";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: {
    default: "Marcus Brown | Senior Full Stack Developer & AI Engineer",
    template: "%s | Marcus Brown",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Marcus Brown",
    "Senior Full-Stack Developer",
    "AI Engineer",
    "SaaS Developer",
    "React Developer",
    "Next.js Developer",
    "Flutter Developer",
    "Mobile Application Developer",
    "React Native Developer",
    "Supabase",
    "Gen AI",
    "Prompt Engineering",
    ".NET Developer",
    "DekuWorks",
    "marcusbr.dev",
    "Available for hire",
  ],
  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  metadataBase: new URL(SITE.url),
  alternates: {
    canonical: SITE.url,
  },
  openGraph: {
    title: "Marcus Brown | Senior Full Stack Developer & AI Engineer",
    description: SITE_DESCRIPTION,
    url: SITE.url,
    siteName: "Marcus Brown Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/marcus-brown.jpg",
        width: 576,
        height: 1024,
        alt: "Marcus Brown — Senior Full Stack Developer & AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marcus Brown | Senior Full Stack Developer & AI Engineer",
    description: SITE_DESCRIPTION,
    images: ["/marcus-brown.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = buildRootJsonLd();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        <meta name="theme-color" content="#0d1310" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body className="min-h-full bg-transparent text-cream">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Analytics />
        <EffectsPreferenceProvider>
          <LiquidInteractionProvider>
            <CommandPaletteProvider>{children}</CommandPaletteProvider>
          </LiquidInteractionProvider>
        </EffectsPreferenceProvider>
      </body>
    </html>
  );
}
