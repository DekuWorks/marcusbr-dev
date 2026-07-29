import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SITE } from "@/lib/site";
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

const description =
  "Marcus Brown is a Senior Full Stack Developer and AI Engineer with 8+ years building SaaS platforms, cross-platform mobile applications, secure APIs, and AI-assisted product experiences with React, TypeScript, Flutter, React Native, .NET, Python, Supabase, Azure, and AWS.";

export const metadata: Metadata = {
  title: "Marcus Brown | Senior Full Stack Developer & AI Engineer",
  description,
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
    description,
    url: SITE.url,
    siteName: "Marcus Brown Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/marcus-brown.jpg",
        width: 576,
        height: 1024,
        alt: "Marcus Brown — Senior Full-Stack Developer & AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marcus Brown | Senior Full Stack Developer & AI Engineer",
    description,
    images: ["/marcus-brown.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  url: SITE.url,
  email: SITE.email,
  jobTitle: SITE.title,
  description,
  sameAs: [SITE.social.github, SITE.social.linkedin, SITE.social.linktree],
  knowsAbout: [
    "Full-Stack Development",
    "AI Engineering",
    "SaaS",
    "React",
    "Next.js",
    "TypeScript",
    ".NET",
    "Azure",
    "React Native",
    "Flutter",
    "Gen AI",
    "Prompts",
  ],
};

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
