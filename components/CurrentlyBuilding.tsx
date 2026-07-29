"use client";

import { motion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import Image from "next/image";
import { useMotionEnabled } from "@/hooks/useEffectsPreference";
import { getCurrentlyBuildingProjects } from "@/lib/projects";
import ProjectTrackerProgress from "@/components/projects/ProjectTrackerProgress";

export default function CurrentlyBuilding() {
  const { motionEnabled } = useMotionEnabled();
  const projects = getCurrentlyBuildingProjects();

  return (
    <section
      id="building"
      aria-labelledby="building-heading"
      className="w-full px-4 py-16 sm:px-6 sm:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
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
          </div>
          <a
            href="#projects"
            className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-jade transition-colors hover:text-jade-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
          >
            View All Projects
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </div>

        <div
          className="carousel-track flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
          role="list"
          aria-label="Projects currently in development"
        >
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={motionEnabled ? { opacity: 0, y: 16 } : false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: motionEnabled ? 0.35 : 0,
                delay: motionEnabled ? index * 0.06 : 0,
              }}
              role="listitem"
              className="glass-card w-[min(100%,280px)] shrink-0 snap-start rounded-xl p-5 transition-all hover:border-jade/25 hover:shadow-glow-sm sm:w-[300px]"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-jade-border bg-jade/10">
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
                  <h3 className="font-semibold text-cream">{project.name}</h3>
                  <p className="mt-1 text-sm text-muted">{project.statusLabel}</p>
                </div>
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
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
