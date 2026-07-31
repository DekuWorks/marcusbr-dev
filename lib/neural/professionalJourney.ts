/**
 * Journey milestones derived from existing experience data.
 * Used by Phase 5 timeline; safe to import in Phase 3 stubs.
 */

import { experiences, type ExperienceEntry } from "@/lib/experience";

export type JourneyMilestone = {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  description: string;
  highlights: readonly string[];
};

export function experienceToMilestone(
  entry: ExperienceEntry,
  index: number,
): JourneyMilestone {
  return {
    id: `journey-${index}-${entry.company.toLowerCase().replace(/\s+/g, "-")}`,
    title: entry.role,
    subtitle: entry.company,
    period: entry.period,
    description: entry.description,
    highlights: entry.highlights,
  };
}

export function getJourneyMilestones(): JourneyMilestone[] {
  return experiences.map(experienceToMilestone);
}
