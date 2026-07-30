"use client";

import { useCallback, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Layers } from "lucide-react";
import GlassPanel from "@/components/liquid/GlassPanel";
import AnimatedGrid from "@/components/liquid/AnimatedGrid";
import { useMotionEnabled } from "@/hooks/useEffectsPreference";
import { useLiquidInteractionEmitter } from "@/hooks/useLiquidInteraction";
import { getProjectsForTechnology } from "@/lib/techProjectMatch";
import { techStack } from "@/lib/technologies";

type CategoryFilter = "all" | (typeof techStack)[number]["title"];

const categoryFilters: { id: CategoryFilter; label: string }[] = [
  { id: "all", label: "All" },
  ...techStack.map((group) => ({
    id: group.title as CategoryFilter,
    label: group.title,
  })),
];

export default function TechnologySystem() {
  const { motionEnabled } = useMotionEnabled();
  const { emit } = useLiquidInteractionEmitter();
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const categoryListId = useId();
  const techGridId = useId();
  const categoryTabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const visibleTechnologies = useMemo(() => {
    if (activeCategory === "all") {
      return techStack.flatMap((group) =>
        group.items.map((item) => ({ name: item, category: group.title })),
      );
    }
    const group = techStack.find((entry) => entry.title === activeCategory);
    return (group?.items ?? []).map((item) => ({
      name: item,
      category: group!.title,
    }));
  }, [activeCategory]);

  const relatedProjects = useMemo(
    () => (selectedTech ? getProjectsForTechnology(selectedTech) : []),
    [selectedTech],
  );

  const handleCategoryChange = useCallback((category: CategoryFilter) => {
    setActiveCategory(category);
    setSelectedTech(null);
    emit({ type: "tabChange", category });
  }, [emit]);

  const handleTechSelect = useCallback((techName: string) => {
    setSelectedTech((current) => {
      const next = current === techName ? null : techName;
      if (next) emit({ type: "pillSelect", tech: techName });
      return next;
    });
  }, [emit]);

  const focusCategoryTab = useCallback((index: number) => {
    categoryTabRefs.current[index]?.focus();
  }, []);

  const handleCategoryKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
      const lastIndex = categoryFilters.length - 1;
      let nextIndex: number | null = null;

      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          nextIndex = index === lastIndex ? 0 : index + 1;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          nextIndex = index === 0 ? lastIndex : index - 1;
          break;
        case "Home":
          nextIndex = 0;
          break;
        case "End":
          nextIndex = lastIndex;
          break;
        default:
          return;
      }

      event.preventDefault();
      if (nextIndex !== null) {
        handleCategoryChange(categoryFilters[nextIndex].id);
        focusCategoryTab(nextIndex);
      }
    },
    [focusCategoryTab, handleCategoryChange],
  );

  return (
    <section
      id="skills"
      aria-labelledby="technology-heading"
      className="relative w-full px-4 py-20 sm:px-6 sm:py-24"
    >
      <AnimatedGrid className="opacity-20" />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={motionEnabled ? { opacity: 0, y: 20 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: motionEnabled ? 0.45 : 0 }}
          className="mb-10"
        >
          <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-jade uppercase">
            <Layers className="h-4 w-4" aria-hidden />
            Technology Stack
          </p>
          <h2
            id="technology-heading"
            className="text-3xl font-bold tracking-tight text-cream sm:text-4xl"
          >
            Tools & Technologies
          </h2>
          <p className="mt-3 max-w-2xl text-muted">
            Filter by category, then select a technology to see related
            projects across the portfolio.
          </p>
        </motion.div>

        <div
          id={categoryListId}
          role="tablist"
          aria-label="Technology categories"
          className="mb-6 flex flex-wrap gap-2 sm:gap-2.5"
        >
          {categoryFilters.map((filter, index) => {
            const isActive = activeCategory === filter.id;
            return (
              <button
                key={filter.id}
                ref={(element) => {
                  categoryTabRefs.current[index] = element;
                }}
                type="button"
                role="tab"
                id={`${categoryListId}-${filter.id}`}
                aria-selected={isActive}
                aria-controls={techGridId}
                tabIndex={isActive ? 0 : -1}
                onClick={() => handleCategoryChange(filter.id)}
                onKeyDown={(event) => handleCategoryKeyDown(event, index)}
                className={`min-h-10 rounded-full border px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  isActive
                    ? "border-jade/50 bg-jade/15 text-jade-bright"
                    : "border-jade-border bg-card/60 text-muted hover:border-jade/30 hover:text-cream"
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <div
          id={techGridId}
          role="tabpanel"
          aria-labelledby={`${categoryListId}-${activeCategory}`}
        >
        <GlassPanel className="rounded-2xl p-5 sm:p-6">
          <motion.div
            key={activeCategory}
            initial={motionEnabled ? { opacity: 0, y: 8 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionEnabled ? 0.25 : 0 }}
            className="flex flex-wrap gap-2"
          >
            {visibleTechnologies.map((tech, index) => {
              const isSelected = selectedTech === tech.name;
              return (
                <motion.button
                  key={`${tech.category}-${tech.name}`}
                  type="button"
                  initial={motionEnabled ? { opacity: 0, scale: 0.95 } : false}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: motionEnabled ? 0.2 : 0,
                    delay: motionEnabled ? index * 0.015 : 0,
                  }}
                  onClick={() => handleTechSelect(tech.name)}
                  aria-pressed={isSelected}
                  aria-label={`${tech.name}${isSelected ? ", selected" : ""}. Show related projects.`}
                  className={`tech-float-chip rounded-lg border px-3 py-1.5 text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    isSelected
                      ? "border-jade/60 bg-jade/20 text-jade-bright shadow-glow-sm"
                      : "border-jade-border bg-background-secondary/80 text-cream/90 hover:border-jade/35 hover:bg-jade/10"
                  }`}
                >
                  {tech.name}
                </motion.button>
              );
            })}
          </motion.div>
        </GlassPanel>
        </div>

        <AnimatePresence initial={false} mode="wait">
          {selectedTech && (
            <motion.div
              key={selectedTech}
              initial={motionEnabled ? { opacity: 0, y: 12 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={motionEnabled ? { opacity: 0, y: -8 } : undefined}
              transition={{ duration: motionEnabled ? 0.3 : 0 }}
              className="mt-6"
              aria-live="polite"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-cream">
                  Projects using{" "}
                  <span className="text-jade-bright">{selectedTech}</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setSelectedTech(null)}
                  aria-label={`Clear ${selectedTech} filter`}
                  className="text-sm text-muted transition-colors hover:text-jade focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-sm"
                >
                  Clear
                </button>
              </div>

              {relatedProjects.length > 0 ? (
                <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {relatedProjects.map((project, index) => (
                    <motion.li
                      key={project.id}
                      initial={motionEnabled ? { opacity: 0, y: 10 } : false}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: motionEnabled ? 0.25 : 0,
                        delay: motionEnabled ? index * 0.05 : 0,
                      }}
                    >
                      <Link
                        href={`/projects/${project.id}/`}
                        className="group flex items-center gap-3 rounded-xl border border-jade-border bg-card/70 p-4 transition-all hover:border-jade/35 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        style={
                          {
                            "--project-accent": project.accent,
                          } as React.CSSProperties
                        }
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-jade-border bg-jade/10">
                          <Image
                            src={project.icon}
                            alt=""
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                            loading="lazy"
                            aria-hidden
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-cream transition-colors group-hover:text-jade-bright">
                            {project.name}
                          </p>
                          <p className="mt-0.5 line-clamp-1 text-xs text-muted">
                            {project.statusLabel}
                          </p>
                        </div>
                        <ArrowUpRight
                          className="h-4 w-4 shrink-0 text-jade opacity-0 transition-opacity group-hover:opacity-100"
                          aria-hidden
                        />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <p className="rounded-xl border border-jade-border bg-card/50 px-4 py-3 text-sm text-muted">
                  No featured projects currently list {selectedTech} — check
                  back as the portfolio grows.
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
