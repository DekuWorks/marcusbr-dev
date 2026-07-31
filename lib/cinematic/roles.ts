/** Animated hero role titles — same labels as the pre-neural portfolio. */
export const HERO_ROLES = [
  "Senior Developer",
  "AI Engineer",
  "Mobile Developer",
] as const;

export type HeroRole = (typeof HERO_ROLES)[number];
