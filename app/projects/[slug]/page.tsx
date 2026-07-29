import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  FEATURED_PROJECTS,
  getProjectById,
  getProjectMetadata,
} from "@/lib/projects";
import { buildCreativeWorkJsonLd } from "@/lib/seo";
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
    keywords: project.technologies,
    alternates: { canonical: meta.url },
    openGraph: {
      ...meta.openGraph,
      type: "website",
      siteName: "Marcus Brown Portfolio",
    },
    twitter: meta.twitter,
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectById(slug);

  if (!project) notFound();

  const meta = getProjectMetadata(project);

  const jsonLd = buildCreativeWorkJsonLd(project, {
    url: meta.url,
    image: meta.image,
  });

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
