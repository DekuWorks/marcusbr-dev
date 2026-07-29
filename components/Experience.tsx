"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useMotionEnabled } from "@/hooks/useEffectsPreference";
import { experiences } from "@/lib/experience";

function ExperienceSummaryCard({
  exp,
  index,
  motionEnabled,
}: {
  exp: (typeof experiences)[number];
  index: number;
  motionEnabled: boolean;
}) {
  return (
    <motion.li
      initial={motionEnabled ? { opacity: 0, y: 20 } : false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: motionEnabled ? 0.4 : 0,
        delay: motionEnabled ? index * 0.08 : 0,
      }}
      className="relative w-[min(100%,320px)] shrink-0 snap-start sm:w-[min(100%,300px)] lg:w-[min(100%,280px)]"
    >
      <div className="mb-4 hidden lg:flex lg:justify-center">
        <span
          className="relative z-10 flex h-4 w-4 items-center justify-center rounded-full border-2 border-jade bg-background"
          aria-hidden
        >
          <span className="h-1.5 w-1.5 rounded-full bg-jade-bright" />
        </span>
      </div>
      <article className="glass-card h-full rounded-xl p-5 transition-all hover:border-jade/25 hover:shadow-glow-sm sm:p-6">
        <h3 className="text-base font-bold text-cream sm:text-lg">{exp.company}</h3>
        <p className="mt-1 text-sm font-medium text-jade">{exp.role}</p>
        <p className="mt-1 text-xs font-medium tracking-wide text-muted uppercase">
          {exp.period}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{exp.description}</p>
      </article>
    </motion.li>
  );
}

function ExperienceDetailEntry({
  exp,
  index,
  isLast,
  motionEnabled,
}: {
  exp: (typeof experiences)[number];
  index: number;
  isLast: boolean;
  motionEnabled: boolean;
}) {
  return (
    <motion.li
      initial={motionEnabled ? { opacity: 0, y: 16 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: motionEnabled ? 0.35 : 0,
        delay: motionEnabled ? index * 0.06 : 0,
      }}
      className="relative pl-8 sm:pl-10"
    >
      <span
        className="absolute top-1.5 left-0 z-10 flex h-4 w-4 items-center justify-center rounded-full border-2 border-jade bg-background"
        aria-hidden
      >
        <span className="h-1.5 w-1.5 rounded-full bg-jade-bright" />
      </span>
      {!isLast && (
        <span
          className="absolute top-5 left-[7px] h-[calc(100%+1.5rem)] w-px bg-gradient-to-b from-jade/40 to-jade/10"
          aria-hidden
        />
      )}
      <article className="glass-card rounded-xl p-5 sm:p-6">
        <div className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:justify-between sm:gap-3">
          <h3 className="text-lg font-bold text-cream">{exp.company}</h3>
          <p className="text-xs font-medium tracking-wide text-muted uppercase">
            {exp.period}
          </p>
        </div>
        <p className="mt-1 text-sm font-medium text-jade">{exp.role}</p>
        <p className="mt-3 text-sm leading-relaxed text-muted">{exp.description}</p>
        <ul className="mt-4 space-y-2.5" aria-label={`${exp.company} highlights`}>
          {exp.highlights.map((item) => (
            <li key={item} className="flex gap-2.5 text-sm text-cream/90">
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-jade"
                aria-hidden
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </article>
    </motion.li>
  );
}

export default function Experience() {
  const { motionEnabled } = useMotionEnabled();
  const [showFullTimeline, setShowFullTimeline] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const fullTimelineRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const trackId = useId();
  const fullTimelineId = useId();

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const { scrollLeft, scrollWidth, clientWidth } = track;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 4);
  }, []);

  const scrollByCard = useCallback(
    (direction: -1 | 1) => {
      const track = trackRef.current;
      if (!track) return;
      const cardWidth =
        track.querySelector("li")?.clientWidth ?? 300;
      const gap = 24;
      track.scrollBy({
        left: direction * (cardWidth + gap),
        behavior: motionEnabled ? "smooth" : "auto",
      });
    },
    [motionEnabled],
  );

  const handleTrackKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollByCard(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollByCard(1);
    }
  };

  const toggleFullTimeline = useCallback(() => {
    setShowFullTimeline((prev) => {
      const next = !prev;
      if (next) {
        requestAnimationFrame(() => {
          fullTimelineRef.current?.scrollIntoView({
            behavior: motionEnabled ? "smooth" : "auto",
            block: "nearest",
          });
        });
      }
      return next;
    });
  }, [motionEnabled]);

  useEffect(() => {
    updateScrollState();
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(updateScrollState);
    observer.observe(track);
    return () => observer.disconnect();
  }, [updateScrollState, showFullTimeline]);

  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="w-full px-4 py-20 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-jade uppercase">
              <Briefcase className="h-4 w-4" aria-hidden />
              Experience Timeline
            </p>
            <h2
              id="experience-heading"
              className="text-3xl font-bold tracking-tight text-cream sm:text-4xl"
            >
              Professional Journey
            </h2>
          </div>
          <button
            type="button"
            onClick={toggleFullTimeline}
            aria-expanded={showFullTimeline}
            aria-controls={fullTimelineId}
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-medium text-jade transition-colors hover:text-jade-bright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
          >
            {showFullTimeline ? "Show Less" : "View Full Timeline"}
            {showFullTimeline ? (
              <ChevronDown className="h-4 w-4 rotate-180" aria-hidden />
            ) : (
              <ArrowRight className="h-4 w-4" aria-hidden />
            )}
          </button>
        </div>

        <div className="relative">
          <div
            className="absolute top-8 right-0 left-0 hidden h-px bg-gradient-to-r from-transparent via-jade/30 to-transparent lg:block"
            aria-hidden
          />

          {canScrollLeft && (
            <div
              className="pointer-events-none absolute top-12 bottom-2 left-0 z-[1] w-10 bg-gradient-to-r from-background to-transparent sm:w-14"
              aria-hidden
            />
          )}
          {canScrollRight && (
            <div
              className="pointer-events-none absolute top-12 right-0 bottom-2 z-[1] w-10 bg-gradient-to-l from-background to-transparent sm:w-14"
              aria-hidden
            />
          )}

          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            disabled={!canScrollLeft}
            className="absolute top-1/2 -left-2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-jade-border bg-card/90 text-cream backdrop-blur-sm transition-colors hover:border-jade/40 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade disabled:pointer-events-none disabled:opacity-30 sm:flex lg:-left-5"
            aria-label="Scroll to earlier experience"
            aria-controls={trackId}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div
            ref={trackRef}
            id={trackId}
            role="region"
            aria-roledescription="carousel"
            aria-label="Experience timeline overview"
            tabIndex={0}
            onKeyDown={handleTrackKeyDown}
            onScroll={updateScrollState}
            className="carousel-track flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-xl lg:pt-0"
          >
            <ol className="flex min-w-full gap-6">
              {experiences.map((exp, index) => (
                <ExperienceSummaryCard
                  key={exp.company}
                  exp={exp}
                  index={index}
                  motionEnabled={motionEnabled}
                />
              ))}
            </ol>
          </div>

          <button
            type="button"
            onClick={() => scrollByCard(1)}
            disabled={!canScrollRight}
            className="absolute top-1/2 -right-2 z-10 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-jade-border bg-card/90 text-cream backdrop-blur-sm transition-colors hover:border-jade/40 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade disabled:pointer-events-none disabled:opacity-30 sm:flex lg:-right-5"
            aria-label="Scroll to later experience"
            aria-controls={trackId}
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {canScrollRight && (
            <p className="mt-3 text-center text-xs text-muted sm:hidden">
              Swipe to explore the full timeline
            </p>
          )}
        </div>

        <AnimatePresence initial={false}>
          {showFullTimeline && (
            <motion.div
              ref={fullTimelineRef}
              id={fullTimelineId}
              initial={motionEnabled ? { opacity: 0, height: 0 } : false}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{
                duration: motionEnabled ? 0.35 : 0,
                ease: [0.4, 0, 0.2, 1],
              }}
              className="overflow-hidden"
            >
              <div className="mt-10 border-t border-jade/10 pt-10">
                <h3 className="mb-8 text-lg font-semibold text-cream">
                  Complete Experience Timeline
                </h3>
                <ol className="space-y-8">
                  {experiences.map((exp, index) => (
                    <ExperienceDetailEntry
                      key={exp.company}
                      exp={exp}
                      index={index}
                      isLast={index === experiences.length - 1}
                      motionEnabled={motionEnabled}
                    />
                  ))}
                </ol>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
