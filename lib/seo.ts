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
