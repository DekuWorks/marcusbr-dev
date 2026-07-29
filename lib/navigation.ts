import { SITE } from "./site";

/**
 * Section anchors on the home page — keep in sync with section `id` attributes
 * in Hero, AboutStatsTech, FeaturedProjects, TechnologySystem, Experience, Footer.
 */
export const PAGE_SECTIONS = [
  {
    id: "home",
    label: "Home",
    href: "#home",
    keywords: ["hero", "top"],
  },
  {
    id: "about",
    label: "About",
    href: "#about",
    keywords: ["stats", "bio"],
  },
  {
    id: "projects",
    label: "Projects",
    href: "#projects",
    keywords: ["work", "featured", "portfolio"],
  },
  {
    id: "skills",
    label: "Skills",
    href: "#skills",
    keywords: ["tech", "technology", "stack"],
  },
  {
    id: "experience",
    label: "Experience",
    href: "#experience",
    keywords: ["career", "jobs", "timeline", "journey"],
  },
  {
    id: "contact",
    label: "Contact",
    href: "#contact",
    keywords: ["email", "reach", "footer", "connect"],
  },
] as const;

export const ACTION_COMMANDS = [
  {
    id: "resume",
    label: "Download Resume",
    href: SITE.resumePath,
    download: SITE.resumeFilename,
    keywords: ["cv", "pdf"],
  },
  {
    id: "email",
    label: "Email Marcus",
    href: `mailto:${SITE.email}`,
    keywords: ["contact", "reach", "message"],
  },
] as const;
