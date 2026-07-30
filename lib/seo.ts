import { SITE } from "@/lib/site";
import type { FeaturedProject } from "@/lib/projects";

export const SITE_DESCRIPTION =
  "Marcus Brown is a Senior Full Stack Developer and AI Engineer with 8+ years building SaaS platforms, cross-platform mobile applications, secure APIs, and AI-assisted product experiences with React, TypeScript, Flutter, React Native, .NET, Python, Supabase, Azure, and AWS.";

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL ?? SITE.url;
}

export function toAbsoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const base = getSiteUrl().replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function buildPersonJsonLd() {
  return {
    "@type": "Person",
    "@id": `${getSiteUrl()}/#person`,
    name: SITE.name,
    url: SITE.url,
    email: SITE.email,
    jobTitle: SITE.title,
    description: SITE_DESCRIPTION,
    image: toAbsoluteUrl("/marcus-brown.jpg"),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Spartanburg",
      addressRegion: "SC",
      addressCountry: "US",
    },
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
      "Prompt Engineering",
    ],
  };
}

export function buildWebSiteJsonLd() {
  return {
    "@type": "WebSite",
    "@id": `${getSiteUrl()}/#website`,
    name: "Marcus Brown Portfolio",
    url: getSiteUrl(),
    description: SITE_DESCRIPTION,
    inLanguage: "en-US",
    author: { "@id": `${getSiteUrl()}/#person` },
    publisher: { "@id": `${getSiteUrl()}/#person` },
  };
}

export function buildRootJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [buildPersonJsonLd(), buildWebSiteJsonLd()],
  };
}

export function buildCreativeWorkJsonLd(
  project: FeaturedProject,
  meta: { url: string; image: string },
) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.synopsis,
    url: meta.url,
    image: toAbsoluteUrl(meta.image),
    genre: project.category,
    keywords: project.technologies.join(", "),
    author: {
      "@type": "Person",
      name: SITE.name,
      url: SITE.url,
    },
    creator: {
      "@type": "Person",
      name: SITE.name,
      url: SITE.url,
    },
  };
}

const DEFAULT_OG_IMAGE = {
  url: "/marcus-brown.jpg",
  width: 576,
  height: 1024,
  alt: "Marcus Brown — Senior Full Stack Developer & AI Engineer",
} as const;

export function buildDefaultOpenGraph(
  title: string,
  description: string,
  url: string,
) {
  return {
    title,
    description,
    url,
    siteName: "Marcus Brown Portfolio",
    locale: "en_US" as const,
    type: "website" as const,
    images: [DEFAULT_OG_IMAGE],
  };
}

export function buildDefaultTwitter(title: string, description: string) {
  return {
    card: "summary_large_image" as const,
    title,
    description,
    images: [DEFAULT_OG_IMAGE.url],
  };
}

export const SHUCHU_OG_IMAGE = {
  url: "/projects/shuchu/icon.webp",
  width: 512,
  height: 512,
  alt: "Shuchu Focus app icon",
} as const;

export const SHUCHU_ROUTES = [
  { path: "/shuchu/", priority: 0.7 },
  { path: "/shuchu/privacy/", priority: 0.4 },
  { path: "/shuchu/support/", priority: 0.4 },
] as const;
