/**
 * @fileoverview Featured projects horizontal carousel.
 *
 * Scrolls one card width + gap per navigation action. Card width is derived
 * from the first `<article>` or falls back to 340px. Emits liquid carousel
 * events on prev/next.
 */

"use client";

import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, LayoutGrid } from "lucide-react";
import { useMotionEnabled } from "@/hooks/useEffectsPreference";
import { useLiquidInteractionEmitter } from "@/hooks/useLiquidInteraction";
import ScrollReveal from "@/components/motion/ScrollReveal";
import PortfolioContainer from "@/components/layout/PortfolioContainer";
import ReadableCopy from "@/components/layout/ReadableCopy";
import { getFeaturedProjects } from "@/lib/projects";
import FeaturedProjectCarouselCard from "@/components/projects/FeaturedProjectCarouselCard";

export default function FeaturedProjects() {
  const projects = getFeaturedProjects();
  const trackRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const trackId = useId();
  const { motionEnabled } = useMotionEnabled();
  const { emit } = useLiquidInteractionEmitter();

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
    const gap = 24; // matches `gap-6` (1.5rem) on sm+ breakpoints
    track.scrollBy({
      left: direction * (cardWidth + gap),
      behavior: motionEnabled ? "smooth" : "auto",
    });
    emit({ type: "carouselNav", direction, source: "projects" });
  }, [motionEnabled, emit]);

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
      className="w-full section-spacing"
    >
      <PortfolioContainer>
        <div className="mb-10 flex flex-col gap-4 max-md:items-center max-md:text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
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
            <ReadableCopy className="mt-3 text-muted">
              <p>
                Productivity, community, security, and financial clarity — selected
                work across mobile and SaaS.
              </p>
            </ReadableCopy>
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
            className="absolute top-1/2 -left-2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-jade-border bg-card/90 text-cream backdrop-blur-sm transition-colors hover:border-jade/40 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade disabled:pointer-events-none disabled:opacity-30 sm:flex xl:-left-4"
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
            style={
              {
                "--carousel-card-width": "min(calc(100vw - 2.5rem), 320px)",
              } as React.CSSProperties
            }
            className="carousel-track carousel-track-centered flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl sm:gap-6"
          >
            {projects.map((project, index) => (
              <ScrollReveal
                key={project.id}
                delay={index * 0.05}
                className="carousel-card-centered h-full shrink-0 sm:w-[340px] sm:snap-start lg:w-[min(100%,380px)] xl:w-[min(100%,400px)]"
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
            className="absolute top-1/2 -right-2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-jade-border bg-card/90 text-cream backdrop-blur-sm transition-colors hover:border-jade/40 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade disabled:pointer-events-none disabled:opacity-30 sm:flex xl:-right-4"
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
      </PortfolioContainer>
    </section>
  );
}
