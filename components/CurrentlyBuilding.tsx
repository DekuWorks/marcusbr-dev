"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import Image from "next/image";

const building = [
  {
    name: "DayPilot",
    description: "AI scheduling SaaS",
    status: "75% Complete",
    progress: 75,
    icon: "/projects/daypilot/icon.webp",
  },
  {
    name: "Shuchu",
    description: "Focus and productivity platform",
    status: "In Development",
    progress: null,
    icon: "/projects/shuchu/icon.webp",
  },
  {
    name: "Avryo",
    description: "AI financial command center",
    status: "Planning",
    progress: null,
    icon: "/projects/avryo/icon.webp",
  },
  {
    name: "Gridlock",
    description: "Secure firearm inventory management",
    status: "Planning",
    progress: null,
    icon: "/projects/gridlock/icon.webp",
  },
  {
    name: "Bookmarked",
    description: "Social reading platform",
    status: "Active Client",
    progress: null,
    icon: "/projects/bookmarked/icon.webp",
  },
] as const;

export default function CurrentlyBuilding() {
  const prefersReducedMotion = useReducedMotion();

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
          {building.map((item, index) => (
            <motion.article
              key={item.name}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.35,
                delay: prefersReducedMotion ? 0 : index * 0.06,
              }}
              role="listitem"
              className="glass-card w-[min(100%,280px)] shrink-0 snap-start rounded-xl p-5 transition-all hover:border-jade/25 hover:shadow-glow-sm sm:w-[300px]"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-jade-border bg-jade/10">
                  {item.icon ? (
                    <Image
                      src={item.icon}
                      alt=""
                      width={44}
                      height={44}
                      className="h-full w-full object-cover"
                      aria-hidden
                    />
                  ) : (
                    <Zap className="h-5 w-5 text-jade" aria-hidden />
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-cream">{item.name}</h3>
                  <p className="mt-1 text-sm text-muted">{item.description}</p>
                </div>
              </div>
              {item.progress !== null ? (
                <div className="mt-4">
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="text-muted">{item.status}</span>
                    <span className="font-medium text-jade-bright">
                      {item.progress}%
                    </span>
                  </div>
                  <div
                    className="h-1.5 overflow-hidden rounded-full bg-jade/10"
                    role="progressbar"
                    aria-valuenow={item.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${item.name} progress`}
                  >
                    <div
                      className="h-full rounded-full bg-jade"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
              ) : (
                <p className="mt-4 text-xs font-semibold tracking-wide text-jade-bright uppercase">
                  {item.status}
                </p>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
