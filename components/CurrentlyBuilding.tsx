"use client";

import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import Image from "next/image";
import TiltCard from "@/components/motion/TiltCard";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { getCurrentlyBuildingProjects } from "@/lib/projects";
import ProjectTrackerProgress from "@/components/projects/ProjectTrackerProgress";

export default function CurrentlyBuilding() {
  const projects = getCurrentlyBuildingProjects();

  return (
    <section
      id="building"
      aria-labelledby="building-heading"
      className="w-full px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <ScrollReveal className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-jade uppercase">
              <Zap className="h-4 w-4" aria-hidden />
              Currently Building
            </p>
            <h2
              id="building-heading"
              className="text-2xl font-bold text-cream sm:text-3xl"
            >
              Active Focus Areas
            </h2>
            <p className="mt-2 max-w-xl text-sm text-muted">
              In-flight products and platforms — progress tracked from real
              development milestones.
            </p>
          </div>
          <a
            href="#projects"
            className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-jade transition-colors hover:text-jade-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
          >
            View All Projects
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </ScrollReveal>

        <div
          className="carousel-track flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
          role="list"
          aria-label="Projects currently in development"
        >
          {projects.map((project, index) => (
            <ScrollReveal
              key={project.id}
              delay={index * 0.06}
              className="h-full w-[min(100%,280px)] shrink-0 snap-start sm:w-[300px]"
            >
              <article role="listitem" className="h-full">
              <TiltCard maxTilt={5} className="h-full">
                <Link
                  href={`/projects/${project.id}/`}
                  className="active-build-card glass-card group flex h-full flex-col rounded-xl p-5 transition-all hover:border-jade/25"
                  style={
                    { "--project-accent": project.accent } as React.CSSProperties
                  }
                  aria-label={`View ${project.name} project details`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-jade-border bg-jade/10 transition-colors group-hover:border-[color-mix(in_srgb,var(--project-accent)_35%,transparent)]">
                      <Image
                        src={project.icon}
                        alt=""
                        width={44}
                        height={44}
                        className="h-full w-full object-cover"
                        aria-hidden
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-cream transition-colors group-hover:text-jade-bright">
                        {project.name}
                      </h3>
                      <p className="mt-1 text-sm text-muted">
                        {project.statusLabel}
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
                    {project.developmentFocus}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-jade-border bg-background-secondary/80 px-2 py-0.5 text-[10px] text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <ProjectTrackerProgress
                    className="mt-4"
                    phase={project.trackerPhase}
                    progress={project.trackerProgress}
                    detail={project.trackerDetail}
                    label={project.name}
                    size="sm"
                    showPercentage={project.status !== "Client Project"}
                  />

                  <span className="mt-4 inline-flex min-h-10 items-center gap-1 text-sm font-medium text-jade opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                    View details
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </Link>
              </TiltCard>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
