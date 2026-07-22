"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { FeaturedProject } from "@/lib/projects";
import { isConceptScreenshot } from "@/lib/projects";
import ProjectConceptIconDisplay from "./ProjectConceptIconDisplay";

const STATUS_STYLES: Record<
  FeaturedProject["status"],
  { badge: string; dot: string }
> = {
  Planning: {
    badge: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    dot: "bg-amber-400",
  },
  "In Development": {
    badge: "bg-jade/15 text-jade-bright border-jade/30",
    dot: "bg-jade-bright",
  },
  Active: {
    badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    dot: "bg-emerald-400",
  },
  "Client Project": {
    badge: "bg-sky-500/15 text-sky-300 border-sky-500/30",
    dot: "bg-sky-400",
  },
};

interface FeaturedProjectCarouselCardProps {
  project: FeaturedProject;
  priority?: boolean;
}

export default function FeaturedProjectCarouselCard({
  project,
  priority = false,
}: FeaturedProjectCarouselCardProps) {
  const statusStyle = STATUS_STYLES[project.status];
  const detailUrl = `/projects/${project.id}/`;
  const heroIsConcept = isConceptScreenshot(project, 0);
  const heroScreenshot = project.screenshots[0];
  const heroAlt = project.screenshotAlts[0];

  return (
    <article
      className="featured-product-card group flex h-full w-[min(100%,320px)] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-jade-border bg-card/80 sm:w-[340px]"
      style={{ "--project-accent": project.accent } as React.CSSProperties}
    >
      <Link
        href={detailUrl}
        className="group/screenshot relative block overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-inset"
        aria-label={`View ${project.name} project details`}
      >
        <div
          className={`relative aspect-[16/10] w-full ${heroIsConcept ? "bg-card" : `bg-gradient-to-br from-background-secondary to-card ${project.deviceFrame ? "flex items-center justify-center bg-[#0a0f0c] py-4" : ""}`}`}
        >
          {heroIsConcept ? (
            <ProjectConceptIconDisplay
              icon={project.icon}
              alt={heroAlt}
              size="card"
              className="group-hover:shadow-none"
            />
          ) : (
            <Image
              src={heroScreenshot}
              alt={heroAlt}
              width={project.deviceFrame ? 390 : 1280}
              height={project.deviceFrame ? 844 : 800}
              className={
                project.deviceFrame
                  ? "mx-auto h-full w-[68%] rounded-[1.5rem] border border-white/10 object-cover object-top shadow-xl"
                  : "h-full w-full object-cover object-top"
              }
              priority={priority}
            />
          )}
          {(project.conceptUI || heroIsConcept) && (
            <span className="absolute top-3 left-3 rounded-full border border-jade/30 bg-jade/15 px-2.5 py-0.5 text-[10px] font-semibold tracking-wide text-jade-bright uppercase">
              Concept UI
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-lg font-bold text-cream">{project.name}</h3>
            <p className="mt-1 line-clamp-2 text-sm text-muted">
              {project.synopsis}
            </p>
          </div>
          <Image
            src={project.icon}
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-xl object-cover"
            aria-hidden
          />
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-jade-border bg-background-secondary/80 px-2 py-0.5 text-[11px] text-muted"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="rounded-md border border-jade-border bg-background-secondary/80 px-2 py-0.5 text-[11px] text-muted">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide uppercase ${statusStyle.badge}`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`}
              aria-hidden
            />
            {project.status}
          </span>
          <div className="flex items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-jade transition-colors hover:text-jade-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
              >
                <ExternalLink className="h-4 w-4" aria-hidden />
                Live Demo
              </a>
            )}
            <Link
              href={detailUrl}
              className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-jade transition-colors hover:text-jade-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
            >
              Details
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
