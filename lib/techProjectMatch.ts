import { FEATURED_PROJECTS, type FeaturedProject } from "./projects";

function normalizeTech(value: string): string {
  return value.toLowerCase().trim();
}

export function projectUsesTechnology(
  project: FeaturedProject,
  techName: string,
): boolean {
  const normalized = normalizeTech(techName);
  return project.technologies.some((projectTech) => {
    const candidate = normalizeTech(projectTech);
    return (
      candidate === normalized ||
      candidate.includes(normalized) ||
      normalized.includes(candidate)
    );
  });
}

export function getProjectsForTechnology(techName: string): FeaturedProject[] {
  return FEATURED_PROJECTS.filter((project) =>
    projectUsesTechnology(project, techName),
  );
}
