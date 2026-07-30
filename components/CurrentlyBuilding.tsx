"use client";

import Link from "next/link";
import { ArrowRight, Zap } from "lucide-react";
import Image from "next/image";
import TiltCard from "@/components/motion/TiltCard";
import ScrollReveal from "@/components/motion/ScrollReveal";
import PortfolioContainer from "@/components/layout/PortfolioContainer";
import ReadableCopy from "@/components/layout/ReadableCopy";
import { getCurrentlyBuildingProjects } from "@/lib/projects";
import ProjectTrackerProgress from "@/components/projects/ProjectTrackerProgress";

export default function CurrentlyBuilding() {
  const projects = getCurrentlyBuildingProjects();

  return (
    <section
      id="building"
      aria-labelledby="building-heading"
      className="w-full section-spacing-compact"
    >
      <PortfolioContainer>
        <ScrollReveal className="mb-8 flex flex-col gap-4 max-md:items-center max-md:text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
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
            <ReadableCopy className="mt-2 text-sm text-muted">
              <p>
                In-flight products and platforms — progress tracked from real
                development milestones.
              </p>
            </ReadableCopy>
          </div>
          <a
            href="#projects"
            className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-jade transition-colors hover:text-jade-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
          >
            View All Projects
            <ArrowRight className="btn-icon-shift h-4 w-4" aria-hidden />
          </a>
        </ScrollReveal>

        <div
          style={
            {
              "--carousel-card-width": "min(calc(100vw - 2.5rem), 280px)",
            } as React.CSSProperties
          }
          className="carousel-track carousel-track-centered flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 lg:grid lg:grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] lg:snap-none lg:overflow-visible lg:gap-4"
          role="list"
          aria-label="Projects currently in development"
        >
          {projects.map((project, index) => (
            <ScrollReveal
              key={project.id}
              delay={index * 0.06}
              className="carousel-card-centered h-full shrink-0 sm:w-[300px] sm:snap-start lg:w-auto lg:shrink"
            >
              <article role="listitem" className="h-full">
                <TiltCard maxTilt={5} className="h-full">
                  <Link
                    href={`/projects/${project.id}/`}
                    className="active-build-card glass-card group flex h-full flex-col rounded-xl p-4 transition-all hover:border-jade/25"
                    style={
                      { "--project-accent": project.accent } as React.CSSProperties
                    }
                    aria-label={`View ${project.name} project details`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="active-build-icon flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-jade-border bg-jade/10 transition-colors group-hover:border-[color-mix(in_srgb,var(--project-accent)_35%,transparent)]">
                        <Image
                          src={project.icon}
                          alt={`${project.name} icon`}
                          width={40}
                          height={40}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                          aria-hidden
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-cream transition-colors group-hover:text-jade-bright">
                          {project.name}
                        </h3>
                        <p className="mt-0.5 text-xs text-muted">
                          {project.statusLabel}
                        </p>
                      </div>
                    </div>

                    <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted sm:line-clamp-2 sm:text-xs">
                      {project.developmentFocus}
                    </p>

                    <div className="mt-2.5 flex flex-wrap gap-1">
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
                      className="mt-3"
                      phase={project.trackerPhase}
                      progress={project.trackerProgress}
                      detail={project.trackerDetail}
                      label={project.name}
                      size="sm"
                      showPercentage={project.status !== "Client Project"}
                    />

                    <span className="mt-3 inline-flex min-h-9 items-center gap-1 text-xs font-medium text-jade opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                      View details
                      <ArrowRight className="btn-icon-shift h-3.5 w-3.5" aria-hidden />
                    </span>
                  </Link>
                </TiltCard>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </PortfolioContainer>
    </section>
  );
}
