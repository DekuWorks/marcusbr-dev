export type PerformanceTier = "low" | "medium" | "high";

export type SceneQuality = {
  tier: PerformanceTier;
  dpr: [number, number];
  particleCount: number;
  enableParticles: boolean;
  enableOrbitAnimation: boolean;
  antialias: boolean;
};

const QUALITY_PRESETS: Record<PerformanceTier, SceneQuality> = {
  low: {
    tier: "low",
    dpr: [1, 1],
    particleCount: 0,
    enableParticles: false,
    enableOrbitAnimation: false,
    antialias: false,
  },
  medium: {
    tier: "medium",
    dpr: [1, 1.5],
    particleCount: 40,
    enableParticles: true,
    enableOrbitAnimation: true,
    antialias: true,
  },
  high: {
    tier: "high",
    dpr: [1, 2],
    particleCount: 120,
    enableParticles: true,
    enableOrbitAnimation: true,
    antialias: true,
  },
};

export function getSceneQuality(tier: PerformanceTier): SceneQuality {
  return QUALITY_PRESETS[tier];
}

export function detectPerformanceTier(): PerformanceTier {
  if (typeof window === "undefined") return "medium";

  const isMobile =
    /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent) ||
    window.matchMedia("(max-width: 768px)").matches;

  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = (navigator as Navigator & { deviceMemory?: number })
    .deviceMemory;

  if (isMobile || cores <= 4 || (memory !== undefined && memory < 4)) {
    return "low";
  }

  if (cores >= 8 && (memory === undefined || memory >= 8)) {
    return "high";
  }

  return "medium";
}
