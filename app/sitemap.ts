import type { MetadataRoute } from "next";
import { FEATURED_PROJECTS } from "@/lib/projects";
import { getSiteUrl, SHUCHU_ROUTES } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();

  return [
    {
      url: base,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...FEATURED_PROJECTS.map((project) => ({
      url: `${base}/projects/${project.id}/`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...SHUCHU_ROUTES.map((route) => ({
      url: `${base}${route.path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route.priority,
    })),
  ];
}
