/** Card for a single featured project in the horizontal carousel. */
"use client";

import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import TiltCard from "@/components/motion/TiltCard";
import CursorSpotlight from "@/components/liquid/CursorSpotlight";
import { getProjectLiveUrlLabel, type FeaturedProject } from "@/lib/projects";
import ProjectConceptIconDisplay from "./ProjectConceptIconDisplay";
import ProjectTrackerProgress from "./ProjectTrackerProgress";

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

  return (
    <article className="h-full w-full">
      <CursorSpotlight className="h-full rounded-2xl">
      <TiltCard
        maxTilt={8}
        className="featured-product-card group flex h-full flex-col overflow-hidden rounded-2xl border border-jade-border bg-card/45 backdrop-blur-md"
        style={{ "--project-accent": project.accent } as React.CSSProperties}
      >
        <div className="featured-card-shine" aria-hidden />
      <Link
        href={detailUrl}
        className="group/screenshot relative block overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-inset"
        aria-label={`View ${project.name} project details`}
      >
        <div className="project-concept-icon-slot relative aspect-[16/10] w-full">
          <ProjectConceptIconDisplay
            icon={project.icon}
            alt={`${project.name} app icon`}
            size="hero"
            priority={priority}
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5 max-md:items-center max-md:text-center">
        <div className="min-w-0 max-md:w-full">
          <h3 className="text-lg font-bold text-cream">{project.name}</h3>
          <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-muted sm:line-clamp-2">
            {project.synopsis}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap gap-1.5 max-md:justify-center">
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

        <ProjectTrackerProgress
          className="mt-4 max-md:w-full max-md:max-w-xs"
          phase={project.trackerPhase}
          progress={project.trackerProgress}
          detail={project.trackerDetail}
          label={project.name}
          size="sm"
          showPercentage={project.status !== "Client Project"}
          centered
        />

        <div className="mt-auto flex items-center justify-between gap-3 pt-4 max-md:flex-col max-md:items-center max-md:justify-center max-md:gap-3">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide uppercase ${statusStyle.badge}`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`}
              aria-hidden
            />
            {project.status}
          </span>
          <div className="flex items-center gap-3 max-md:justify-center">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-jade transition-colors hover:text-jade-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
              >
                <ExternalLink className="btn-icon-shift h-4 w-4" aria-hidden />
                {getProjectLiveUrlLabel(project)}
              </a>
            )}
            <Link
              href={detailUrl}
              className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-jade transition-colors hover:text-jade-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
            >
              Details
              <ArrowUpRight className="btn-icon-shift h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </div>
      </TiltCard>
      </CursorSpotlight>
    </article>
  );
}
