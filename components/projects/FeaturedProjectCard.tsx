"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import type { FeaturedProject } from "@/lib/projects";
import Button from "@/components/Button";
import { GitHubIcon } from "@/components/icons/SocialIcons";
import ProjectAppIcon from "./ProjectAppIcon";
import ProjectScreenshotGallery from "./ProjectScreenshotGallery";
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

interface FeaturedProjectCardProps {
  project: FeaturedProject;
  index: number;
}

export default function FeaturedProjectCard({
  project,
  index,
}: FeaturedProjectCardProps) {
  const prefersReducedMotion = useReducedMotion();
  const statusStyle = STATUS_STYLES[project.status];
  const detailUrl = `/projects/${project.id}/`;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.45,
        delay: prefersReducedMotion ? 0 : index * 0.08,
      }}
      whileHover={prefersReducedMotion ? undefined : { y: -6 }}
      className="featured-product-card group relative flex h-full flex-col overflow-hidden rounded-2xl border border-jade-border bg-card/80 p-5 backdrop-blur-sm transition-[border-color,box-shadow] duration-300 hover:border-jade/40 hover:shadow-glow-sm sm:p-6"
      style={
        {
          "--project-accent": project.accent,
        } as React.CSSProperties
      }
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--project-accent)] to-transparent opacity-40"
        aria-hidden
      />

      <div className="flex items-start gap-4">
        <ProjectAppIcon
          src={project.icon}
          alt={`${project.name} app icon`}
          priority={index === 0}
        />

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-bold text-cream sm:text-xl">
              {project.name}
            </h3>
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-semibold tracking-wide uppercase ${statusStyle.badge}`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${statusStyle.dot}`}
                aria-hidden
              />
              {project.status}
            </span>
          </div>
          <p className="mt-1 text-sm font-medium text-jade-bright/90">
            {project.statusLabel}
          </p>
          <p className="mt-0.5 text-xs text-muted">{project.category}</p>
        </div>
      </div>

      <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted sm:line-clamp-none">
        {project.synopsis}
      </p>

      <ProjectTrackerProgress
        className="mt-4"
        phase={project.trackerPhase}
        progress={project.trackerProgress}
        detail={project.trackerDetail}
        label={project.name}
        size="sm"
      />

      <div className="mt-5">
        <ProjectScreenshotGallery
          screenshots={project.screenshots}
          alts={project.screenshotAlts}
          icon={project.icon}
          accent={project.accent}
          conceptUI={project.conceptUI}
          conceptScreenshotIndices={project.conceptScreenshotIndices}
          deviceFrame={project.deviceFrame}
          priority={index === 0}
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-jade-border bg-background-secondary/80 px-2.5 py-1 text-xs text-muted transition-colors group-hover:border-jade/25 group-hover:text-cream/90"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
        <Button
          href={detailUrl}
          variant="primary"
          className="min-h-11 w-full sm:min-w-[140px] sm:flex-1"
        >
          View Details
          <ArrowUpRight className="h-4 w-4" />
        </Button>
        {project.liveUrl && (
          <Button
            href={project.liveUrl}
            variant="secondary"
            className="min-h-11 w-full sm:min-w-[140px] sm:flex-1"
          >
            <ExternalLink className="h-4 w-4" />
            Live Demo
          </Button>
        )}
        {project.repositoryUrl && (
          <Button
            href={project.repositoryUrl}
            variant="secondary"
            className="min-h-11 w-full sm:min-w-[120px] sm:flex-1"
          >
            <GitHubIcon className="h-4 w-4" />
            GitHub
          </Button>
        )}
      </div>
    </motion.article>
  );
}
