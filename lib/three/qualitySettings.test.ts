import { describe, expect, it } from "vitest";
import {
  QUALITY_SETTINGS,
  getReducedQualitySettings,
} from "@/lib/three/qualitySettings";

describe("qualitySettings", () => {
  it("defines tiers with expected DPR caps", () => {
    expect(QUALITY_SETTINGS.high.dpr[1]).toBeLessThanOrEqual(2);
    expect(QUALITY_SETTINGS.high.dpr[1]).toBeGreaterThanOrEqual(1.5);
    expect(QUALITY_SETTINGS.low.dpr[1]).toBe(1);
  });

  it("keeps droplet counts modest for a single page canvas", () => {
    expect(QUALITY_SETTINGS.high.dropletCount).toBeLessThanOrEqual(48);
    expect(QUALITY_SETTINGS.medium.dropletCount).toBeLessThan(
      QUALITY_SETTINGS.high.dropletCount,
    );
  });

  it("reduces droplets and bloom for reduced effects", () => {
    const reduced = getReducedQualitySettings(QUALITY_SETTINGS.high);
    expect(reduced.dropletCount).toBeLessThan(QUALITY_SETTINGS.high.dropletCount);
    expect(reduced.bloom).toBe(false);
    expect(reduced.magneticStrength).toBe(0);
  });

  it("keeps droplets visible on low tier for mobile", () => {
    expect(QUALITY_SETTINGS.low.dropletCount).toBeGreaterThan(0);
  });
});
