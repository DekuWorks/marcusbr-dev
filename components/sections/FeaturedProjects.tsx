"use client";

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";
import { useMotionEnabled } from "@/hooks/useEffectsPreference";
import ScrollReveal from "@/components/motion/ScrollReveal";
import { getFeaturedProjects } from "@/lib/projects";
import FeaturedProjectCarouselCard from "@/components/projects/FeaturedProjectCarouselCard";

export default function FeaturedProjects() {
  const projects = getFeaturedProjects();
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const trackId = useId();
  const { motionEnabled } = useMotionEnabled();

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const { scrollLeft, scrollWidth, clientWidth } = track;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
  }, []);

  const scrollByCard = useCallback((direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const cardWidth = track.querySelector("article")?.clientWidth ?? 340;
    const gap = 24;
    track.scrollBy({
      left: direction * (cardWidth + gap),
      behavior: motionEnabled ? "smooth" : "auto",
    });
  }, [motionEnabled]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollByCard(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollByCard(1);
    }
  };

  useEffect(() => {
    updateScrollState();
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(updateScrollState);
    observer.observe(track);
    return () => observer.disconnect();
  }, [updateScrollState]);

  return (
    <section
      id="projects"
      aria-labelledby="featured-projects-heading"
      className="w-full px-4 py-20 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <motion.div
            initial={motionEnabled ? { opacity: 0, y: 20 } : false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: motionEnabled ? 0.45 : 0 }}
          >
            <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-jade uppercase">
              <LayoutGrid className="h-4 w-4" aria-hidden />
              Featured Projects
            </p>
            <h2
              id="featured-projects-heading"
              className="text-3xl font-bold tracking-tight text-cream sm:text-4xl"
            >
              Platforms I&apos;m Building
            </h2>
            <p className="mt-3 max-w-2xl text-muted">
              Productivity, community, security, and financial clarity — selected
              work across mobile and SaaS.
            </p>
          </motion.div>
          <a
            href="#projects"
            className="inline-flex min-h-11 items-center gap-1 text-sm font-medium text-jade transition-colors hover:text-jade-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
          >
            View All Projects
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={!canScrollLeft}
            className="absolute top-1/2 -left-2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-jade-border bg-card/90 text-cream backdrop-blur-sm transition-colors hover:border-jade/40 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade disabled:pointer-events-none disabled:opacity-30 sm:flex lg:-left-5"
            aria-label="Scroll to previous projects"
            aria-controls={trackId}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div
            ref={trackRef}
            id={trackId}
            role="region"
            aria-roledescription="carousel"
            aria-label="Featured projects carousel"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onScroll={updateScrollState}
            className="carousel-track flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl"
          >
            {projects.map((project, index) => (
              <ScrollReveal
                key={project.id}
                delay={index * 0.05}
                className="h-full w-[min(100%,320px)] shrink-0 snap-start sm:w-[340px]"
              >
                <FeaturedProjectCarouselCard
                  project={project}
                  priority={index === 0}
                />
              </ScrollReveal>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={!canScrollRight}
            className="absolute top-1/2 -right-2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-jade-border bg-card/90 text-cream backdrop-blur-sm transition-colors hover:border-jade/40 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade disabled:pointer-events-none disabled:opacity-30 sm:flex lg:-right-5"
            aria-label="Scroll to next projects"
            aria-controls={trackId}
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {canScrollRight && (
            <p className="mt-3 text-center text-xs text-muted sm:hidden">
              Swipe to browse featured projects
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
