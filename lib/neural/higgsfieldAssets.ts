/**
 * Higgsfield-generated neural atmosphere, transitions, and motion loops.
 * Stills: public/neural/*.webp — Videos: public/neural/*.webm
 */

export const NEURAL_ASSETS = {
  /** Full-frame neuro face used as the site backdrop */
  neuroFace: "/neural/neuro-face.webp",
  heroCore: "/neural/hero-core.webp",
  filaments: "/neural/filaments.webp",
  energyFlow: "/neural/energy-flow.webp",
  hoverNode: "/neural/hover-node.webp",
  journeyTimeline: "/neural/journey-timeline.webp",
  selectTransition: "/neural/select-transition.webp",
  returnCore: "/neural/return-core.webp",
} as const;

/** Optimized Kling loops (VP9 WebM). Journey video not generated yet. */
export const NEURAL_VIDEOS = {
  idle: "/neural/idle-core.webm",
  select: "/neural/select-transition.webm",
  return: "/neural/return-core.webm",
} as const;

export type NeuralTransitionKind =
  | "idle"
  | "hover"
  | "select"
  | "return"
  | "journey";

/** Ordered stills used for cinematic crossfade when video is unavailable. */
export const NEURAL_TRANSITION_SEQUENCE: Record<
  NeuralTransitionKind,
  readonly string[]
> = {
  idle: [NEURAL_ASSETS.neuroFace, NEURAL_ASSETS.heroCore],
  hover: [NEURAL_ASSETS.hoverNode, NEURAL_ASSETS.neuroFace],
  select: [
    NEURAL_ASSETS.selectTransition,
    NEURAL_ASSETS.neuroFace,
  ],
  return: [NEURAL_ASSETS.returnCore, NEURAL_ASSETS.neuroFace],
  journey: [
    NEURAL_ASSETS.journeyTimeline,
    NEURAL_ASSETS.neuroFace,
  ],
};

export function transitionStills(kind: NeuralTransitionKind): string[] {
  return NEURAL_TRANSITION_SEQUENCE[kind].filter(Boolean);
}

export function transitionVideo(kind: NeuralTransitionKind): string | null {
  if (kind === "idle") return NEURAL_VIDEOS.idle;
  if (kind === "select") return NEURAL_VIDEOS.select;
  if (kind === "return") return NEURAL_VIDEOS.return;
  return null;
}

export function transitionPoster(kind: NeuralTransitionKind): string {
  const stills = transitionStills(kind);
  return stills[0] ?? NEURAL_ASSETS.neuroFace;
}
