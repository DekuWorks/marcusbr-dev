import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Marcus Brown | Senior Full-Stack Developer & AI Engineer",
  description:
    "Marcus Brown — Senior Full-Stack Developer & AI Engineer. Founder of DekuWorks. Building SaaS, mobile, cloud, and AI-powered products.",
  keywords: [
    "Marcus Brown",
    "Full-Stack Developer",
    "AI Engineer",
    "DekuWorks",
    "SaaS",
    "marcusbr.dev",
  ],
  authors: [{ name: "Marcus Brown" }],
  openGraph: {
    title: "Marcus Brown | Senior Full-Stack Developer & AI Engineer",
    description:
      "Building scalable web applications, mobile experiences, and AI-powered products.",
    url: "https://marcusbr.dev",
    siteName: "marcusbr.dev",
    type: "website",
  },
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
      <body className="min-h-full bg-background text-cream">{children}</body>
    </html>
  );
}
