export type SceneQuality = "low" | "medium" | "high";

export type QualitySettings = {
  dpr: [number, number];
  dropletCount: number;
  blobSegments: number;
  gridDensity: number;
  bloom: boolean;
  deformationSpeed: number;
  maxTilt: number;
  magneticStrength: number;
};

export const QUALITY_SETTINGS: Record<SceneQuality, QualitySettings> = {
  high: {
    dpr: [1, 2],
    dropletCount: 24,
    blobSegments: 64,
    gridDensity: 1,
    bloom: true,
    deformationSpeed: 1,
    maxTilt: 8,
    magneticStrength: 0.3,
  },
  medium: {
    dpr: [1, 1.5],
    dropletCount: 12,
    blobSegments: 48,
    gridDensity: 0.75,
    bloom: false,
    deformationSpeed: 0.6,
    maxTilt: 5,
    magneticStrength: 0.2,
  },
  low: {
    dpr: [1, 1],
    dropletCount: 0,
    blobSegments: 32,
    gridDensity: 0.5,
    bloom: false,
    deformationSpeed: 0.35,
    maxTilt: 3,
    magneticStrength: 0,
  },
};

export function getReducedQualitySettings(
  base: QualitySettings,
): QualitySettings {
  return {
    ...base,
    dropletCount: Math.max(0, Math.floor(base.dropletCount * 0.4)),
    blobSegments: Math.max(24, Math.floor(base.blobSegments * 0.75)),
    bloom: false,
    deformationSpeed: base.deformationSpeed * 0.5,
    maxTilt: Math.min(base.maxTilt, 4),
    magneticStrength: 0,
  };
}
