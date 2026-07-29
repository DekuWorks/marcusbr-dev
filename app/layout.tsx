import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SITE } from "@/lib/site";
import { buildRootJsonLd, SITE_DESCRIPTION } from "@/lib/seo";
import { EffectsPreferenceProvider } from "@/hooks/useEffectsPreference";
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
      <body className="min-h-full bg-background text-cream">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <EffectsPreferenceProvider>{children}</EffectsPreferenceProvider>
      </body>
    </html>
  );
}
