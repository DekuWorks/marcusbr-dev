/**
 * @fileoverview Interactive technology stack with category tabs and project linking.
 *
 * Skill rows show local tech logos beside each name. Category tabs map to
 * existing `techStack` groups (no invented skills / percentages).
 */

"use client";

import { useCallback, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Layers } from "lucide-react";
import GlassPanel from "@/components/liquid/GlassPanel";
import PortfolioContainer from "@/components/layout/PortfolioContainer";
import ReadableCopy from "@/components/layout/ReadableCopy";
import TechLogo from "@/components/tech/TechLogo";
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

function RelatedProjectsPanel({
  selectedTech,
  relatedProjects,
  motionEnabled,
  onClear,
  className = "",
}: {
  selectedTech: string | null;
  relatedProjects: ReturnType<typeof getProjectsForTechnology>;
  motionEnabled: boolean;
  onClear: () => void;
  className?: string;
}) {
  return (
    <div className={className}>
      <GlassPanel className="rounded-2xl p-4 sm:p-5">
        {selectedTech ? (
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={selectedTech}
              initial={motionEnabled ? { opacity: 0, y: 8 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={motionEnabled ? { opacity: 0, y: -6 } : undefined}
              transition={{ duration: motionEnabled ? 0.25 : 0 }}
              aria-live="polite"
            >
              <div className="mb-3 flex items-start justify-between gap-2">
                <h3 className="text-sm font-semibold text-cream">
                  Projects using{" "}
                  <span className="text-jade-bright">{selectedTech}</span>
                </h3>
                <button
                  type="button"
                  onClick={onClear}
                  aria-label={`Clear ${selectedTech} filter`}
                  className="shrink-0 rounded-sm text-xs text-muted transition-colors hover:text-jade focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  Clear
                </button>
              </div>

              {relatedProjects.length > 0 ? (
                <ul className="space-y-2">
                  {relatedProjects.map((project, index) => (
                    <motion.li
                      key={project.id}
                      initial={motionEnabled ? { opacity: 0, y: 8 } : false}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: motionEnabled ? 0.2 : 0,
                        delay: motionEnabled ? index * 0.04 : 0,
                      }}
                    >
                      <Link
                        href={`/projects/${project.id}/`}
                        className="group flex items-center gap-2.5 rounded-lg border border-jade-border bg-card/45 p-3 backdrop-blur-sm transition-all hover:border-jade/35 hover:bg-card/55 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        style={
                          {
                            "--project-accent": project.accent,
                          } as React.CSSProperties
                        }
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-jade-border bg-jade/10">
                          <Image
                            src={project.icon}
                            alt=""
                            width={36}
                            height={36}
                            className="h-full w-full object-cover"
                            loading="lazy"
                            aria-hidden
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-cream transition-colors group-hover:text-jade-bright">
                            {project.name}
                          </p>
                          <p className="mt-0.5 line-clamp-1 text-xs text-muted">
                            {project.statusLabel}
                          </p>
                        </div>
                        <ArrowUpRight
                          className="h-3.5 w-3.5 shrink-0 text-jade opacity-0 transition-opacity group-hover:opacity-100"
                          aria-hidden
                        />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              ) : (
                <p className="rounded-lg border border-jade-border bg-card/35 px-3 py-2.5 text-xs text-muted backdrop-blur-sm">
                  No featured projects currently list {selectedTech} — check
                  back as the portfolio grows.
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        ) : (
          <p className="text-sm text-muted">
            Select a technology to see related portfolio projects.
          </p>
        )}
      </GlassPanel>
    </div>
  );
}

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

  const handleSkillHover = useCallback(() => {
    emit({ type: "uiHover", source: "skill" });
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

  const categoryTabClass = (isActive: boolean) =>
    `interactive-lift min-h-10 rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:text-sm sm:tracking-[0.12em] ${
      isActive
        ? "border-jade/50 bg-jade/15 text-jade-bright shadow-[0_0_20px_rgba(62,180,137,0.15)]"
        : "border-jade-border bg-card/40 text-muted hover:border-jade/35 hover:text-cream"
    }`;

  const categoryNavClass = (isActive: boolean) =>
    `interactive-lift w-full min-h-10 rounded-lg border px-3 py-2 text-left text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
      isActive
        ? "border-jade/50 bg-jade/15 text-jade-bright shadow-[0_0_20px_rgba(62,180,137,0.12)]"
        : "border-transparent text-muted hover:border-jade-border hover:bg-card/40 hover:text-cream"
    }`;

  return (
    <section
      id="skills"
      aria-labelledby="technology-heading"
      className="relative w-full section-spacing"
    >
      <PortfolioContainer className="relative">
        <motion.div
          initial={motionEnabled ? { opacity: 0, y: 20 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: motionEnabled ? 0.45 : 0 }}
          className="mb-10"
        >
          <p className="mb-2 inline-flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-jade uppercase">
            <Layers className="h-4 w-4" aria-hidden />
            Skills
          </p>
          <h2
            id="technology-heading"
            className="text-3xl font-bold tracking-tight text-cream sm:text-4xl"
          >
            Tools & Technologies
          </h2>
          <ReadableCopy className="mt-3 text-muted">
            <p>
              Filter by category, then select a technology to see related
              projects across the portfolio.
            </p>
          </ReadableCopy>
        </motion.div>

        <div
          id={categoryListId}
          role="tablist"
          aria-label="Technology categories"
          className="mb-6 flex flex-wrap gap-2 sm:gap-2.5 lg:hidden"
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
                onMouseEnter={handleSkillHover}
                onFocus={handleSkillHover}
                onKeyDown={(event) => handleCategoryKeyDown(event, index)}
                className={categoryTabClass(isActive)}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        <div className="relative lg:grid lg:grid-cols-[200px_minmax(0,1fr)_minmax(260px,320px)] lg:items-start lg:gap-6 xl:gap-8">
          {selectedTech && (
            <div
              className="tech-connection-bridge pointer-events-none absolute inset-y-0 right-[min(320px,28%)] z-0 hidden w-8 lg:block xl:right-[320px]"
              aria-hidden
            >
              <span className="tech-connection-bridge__line" />
            </div>
          )}
          <nav
            role="tablist"
            aria-label="Technology categories"
            className="hidden lg:flex lg:flex-col lg:gap-1"
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
                  id={`${categoryListId}-desktop-${filter.id}`}
                  aria-selected={isActive}
                  aria-controls={techGridId}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => handleCategoryChange(filter.id)}
                  onMouseEnter={handleSkillHover}
                  onFocus={handleSkillHover}
                  onKeyDown={(event) => handleCategoryKeyDown(event, index)}
                  className={categoryNavClass(isActive)}
                >
                  {filter.label}
                </button>
              );
            })}
          </nav>

          <div
            id={techGridId}
            role="tabpanel"
            aria-labelledby={`${categoryListId}-${activeCategory}`}
            className="min-w-0"
          >
            <GlassPanel className="skill-glass-panel rounded-2xl p-4 sm:p-5">
              <motion.ul
                key={activeCategory}
                initial={motionEnabled ? { opacity: 0, y: 8 } : false}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: motionEnabled ? 0.25 : 0 }}
                className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3"
              >
                {visibleTechnologies.map((tech, index) => {
                  const isSelected = selectedTech === tech.name;
                  return (
                    <motion.li
                      key={`${tech.category}-${tech.name}`}
                      initial={motionEnabled ? { opacity: 0, y: 6 } : false}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: motionEnabled ? 0.2 : 0,
                        delay: motionEnabled ? index * 0.012 : 0,
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => handleTechSelect(tech.name)}
                        onMouseEnter={handleSkillHover}
                        onFocus={handleSkillHover}
                        aria-pressed={isSelected}
                        aria-label={`${tech.name}${isSelected ? ", selected" : ""}. Show related projects.`}
                        className={`skill-row interactive-lift flex w-full min-h-12 items-center gap-3 rounded-xl border px-3 py-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                          isSelected
                            ? "border-jade/60 bg-jade/20 text-jade-bright shadow-glow-sm"
                            : "border-jade-border bg-background-secondary/70 text-cream/90 hover:border-jade/40 hover:bg-jade/10"
                        }`}
                      >
                        <span className="skill-row__icon flex h-9 w-9 items-center justify-center rounded-lg border border-jade-border bg-card/60">
                          <TechLogo name={tech.name} size={20} />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium">
                            {tech.name}
                          </span>
                          <span className="mt-0.5 block truncate text-[11px] uppercase tracking-[0.12em] text-muted">
                            {tech.category}
                          </span>
                        </span>
                      </button>
                    </motion.li>
                  );
                })}
              </motion.ul>
            </GlassPanel>

            <RelatedProjectsPanel
              selectedTech={selectedTech}
              relatedProjects={relatedProjects}
              motionEnabled={motionEnabled}
              onClear={() => setSelectedTech(null)}
              className="mt-6 lg:hidden"
            />
          </div>

          <RelatedProjectsPanel
            selectedTech={selectedTech}
            relatedProjects={relatedProjects}
            motionEnabled={motionEnabled}
            onClear={() => setSelectedTech(null)}
            className={`hidden lg:block lg:sticky lg:top-28 ${
              selectedTech ? "tech-related-connected" : ""
            }`}
          />
        </div>
      </PortfolioContainer>
    </section>
  );
}
