/**
 * @fileoverview WebGL scene quality tiers.
 *
 * Maps device capability (low / medium / high) to concrete rendering settings
 * used by `useDeviceQuality`. Reduced-effects mode further scales counts via
 * `getReducedQualitySettings` when `prefers-reduced-motion` is active.
 *
 * Tuned for a single page-wide cinematic liquid canvas (not dual WebGL).
 *
 * @see hooks/useDeviceQuality.ts
 * @see components/cinematic/CinematicOrbCanvas.tsx
 */

export type SceneQuality = "low" | "medium" | "high";

export type QualitySettings = {
  dpr: [number, number];
  dropletCount: number;
  blobSegments: number;
  blobScale: number;
  gridDensity: number;
  bloom: boolean;
  deformationSpeed: number;
  maxTilt: number;
  magneticStrength: number;
};

export const QUALITY_SETTINGS: Record<SceneQuality, QualitySettings> = {
  high: {
    dpr: [1, 1.75],
    dropletCount: 36,
    blobSegments: 64,
    blobScale: 2.55,
    gridDensity: 0,
    bloom: true,
    deformationSpeed: 0.9,
    maxTilt: 8,
    magneticStrength: 0.35,
  },
  medium: {
    dpr: [1, 1.35],
    dropletCount: 22,
    blobSegments: 48,
    blobScale: 2.25,
    gridDensity: 0,
    bloom: false,
    deformationSpeed: 0.72,
    maxTilt: 5,
    magneticStrength: 0.25,
  },
  low: {
    dpr: [1, 1],
    dropletCount: 12,
    blobSegments: 32,
    blobScale: 1.95,
    gridDensity: 0,
    bloom: false,
    deformationSpeed: 0.5,
    maxTilt: 3,
    magneticStrength: 0,
  },
};

/** Further reduce counts and disable bloom for reduced-motion / low-power mode. */
export function getReducedQualitySettings(
  base: QualitySettings,
): QualitySettings {
  return {
    ...base,
    dropletCount: Math.max(0, Math.floor(base.dropletCount * 0.35)),
    blobSegments: Math.max(24, Math.floor(base.blobSegments * 0.7)),
    blobScale: Math.min(base.blobScale, 1.55),
    bloom: false,
    deformationSpeed: base.deformationSpeed * 0.45,
    maxTilt: Math.min(base.maxTilt, 4),
    magneticStrength: 0,
  };
}
