/**
 * @fileoverview WebGL scene quality tiers.
 *
 * Maps device capability (low / medium / high) to concrete rendering settings
 * used by `useDeviceQuality`. Reduced-effects mode further scales counts via
 * `getReducedQualitySettings` when `prefers-reduced-motion` is active.
 *
 * @see hooks/useDeviceQuality.ts
 * @see components/three/LiquidHeroCanvas.tsx
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
    dpr: [1, 2],
    dropletCount: 48,
    blobSegments: 64,
    blobScale: 1.95,
    gridDensity: 1,
    bloom: true,
    deformationSpeed: 1.35,
    maxTilt: 8,
    magneticStrength: 0.35,
  },
  medium: {
    dpr: [1, 1.5],
    dropletCount: 26,
    blobSegments: 48,
    blobScale: 1.7,
    gridDensity: 0.75,
    bloom: false,
    deformationSpeed: 0.85,
    maxTilt: 5,
    magneticStrength: 0.25,
  },
  low: {
    dpr: [1, 1],
    dropletCount: 14,
    blobSegments: 32,
    blobScale: 1.45,
    gridDensity: 0.5,
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
    dropletCount: Math.max(0, Math.floor(base.dropletCount * 0.4)),
    blobSegments: Math.max(24, Math.floor(base.blobSegments * 0.75)),
    blobScale: Math.min(base.blobScale, 1.4),
    bloom: false,
    deformationSpeed: base.deformationSpeed * 0.5,
    maxTilt: Math.min(base.maxTilt, 4),
    magneticStrength: 0,
  };
}
