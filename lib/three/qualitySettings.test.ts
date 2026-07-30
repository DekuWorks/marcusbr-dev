import { describe, expect, it } from "vitest";
import {
  QUALITY_SETTINGS,
  getReducedQualitySettings,
} from "@/lib/three/qualitySettings";

describe("qualitySettings", () => {
  it("defines tiers with expected DPR caps", () => {
    expect(QUALITY_SETTINGS.high.dpr[1]).toBe(2);
    expect(QUALITY_SETTINGS.low.dpr[1]).toBe(1);
  });

  it("reduces droplets and bloom for reduced effects", () => {
    const reduced = getReducedQualitySettings(QUALITY_SETTINGS.high);
    expect(reduced.dropletCount).toBeLessThan(QUALITY_SETTINGS.high.dropletCount);
    expect(reduced.bloom).toBe(false);
    expect(reduced.magneticStrength).toBe(0);
  });
});
