/**
 * Data-driven neural interface nodes.
 * Targets map to existing hash sections or project routes.
 */

import { FEATURED_PROJECTS } from "@/lib/projects";

export type NeuralNodeKind = "center" | "project" | "section";

export type PortfolioNeuralNode = {
  id: string;
  label: string;
  kind: NeuralNodeKind;
  /** Normalized orbit position around core (before radius scale). */
  position: [number, number, number];
  /** Hash or path for navigation / deep link. */
  href: string;
  accent?: string;
  synopsis?: string;
};

const PROJECT_ORBIT: Record<string, [number, number, number]> = {
  shuchu: [1.15, 0.35, 0.2],
  daypilot: [0.55, 0.85, -0.75],
  rigscout: [0.95, -0.25, 0.7],
  "241runners": [-0.9, 0.45, -0.35],
  bookmarked: [-0.7, 0.65, -0.7],
  avryo: [-1.15, 0.15, 0.25],
  gridlock: [-0.35, -0.75, 0.85],
};

export const SECTION_NODES: PortfolioNeuralNode[] = [
  {
    id: "journey",
    label: "Professional Journey",
    kind: "center",
    position: [0, 0, 0],
    href: "#experience",
    synopsis: "Career progression, roles, and milestones.",
  },
  {
    id: "skills",
    label: "Skills",
    kind: "section",
    position: [0.9, -0.55, -0.55],
    href: "#skills",
    synopsis: "Tools and technologies across the portfolio.",
  },
  {
    id: "about",
    label: "About Marcus",
    kind: "section",
    position: [0.25, -0.9, -0.35],
    href: "#about",
    synopsis: "Background, focus, and how Marcus builds products.",
  },
  {
    id: "contact",
    label: "Contact",
    kind: "section",
    position: [0.75, 0.15, 0.95],
    href: "#contact",
    synopsis: "Email, resume, and collaboration.",
  },
];

export function buildProjectNodes(): PortfolioNeuralNode[] {
  return FEATURED_PROJECTS.map((project) => ({
    id: project.id,
    label: project.name,
    kind: "project" as const,
    position: PROJECT_ORBIT[project.id] ?? [1, 0, 0],
    href: `/projects/${project.id}/`,
    accent: project.accent,
    synopsis: project.synopsis,
  }));
}

export function getPortfolioNeuralNodes(): PortfolioNeuralNode[] {
  return [...SECTION_NODES, ...buildProjectNodes()];
}

/** Edges as [fromId, toId] — all satellites connect to journey center. */
export function getNeuralConnections(
  nodes: PortfolioNeuralNode[] = getPortfolioNeuralNodes(),
): Array<[string, string]> {
  const center = nodes.find((n) => n.kind === "center");
  if (!center) return [];
  return nodes
    .filter((n) => n.id !== center.id)
    .map((n) => [center.id, n.id] as [string, string]);
}
