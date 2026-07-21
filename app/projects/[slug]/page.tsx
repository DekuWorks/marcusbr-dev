import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  FEATURED_PROJECTS,
  getProjectById,
  getProjectMetadata,
} from "@/lib/projects";
import ProjectDetailContent from "@/components/projects/ProjectDetailContent";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return FEATURED_PROJECTS.map((project) => ({ slug: project.id }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectById(slug);
  if (!project) return {};

  const meta = getProjectMetadata(project);

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: meta.url },
    openGraph: {
      ...meta.openGraph,
      type: "website",
      siteName: "Marcus Brown Portfolio",
    },
    twitter: meta.twitter,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectById(slug);

  if (!project) notFound();

  const meta = getProjectMetadata(project);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: project.name,
    description: project.synopsis,
    applicationCategory: project.category,
    operatingSystem: project.filters.includes("mobile")
      ? "iOS, Android"
      : "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Person",
      name: "Marcus Brown",
      url: "https://marcusbr.dev",
    },
    image: meta.image,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProjectDetailContent project={project} />
    </>
  );
}
