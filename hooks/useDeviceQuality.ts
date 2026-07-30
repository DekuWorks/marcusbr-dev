/**
 * @fileoverview Device capability detection for WebGL quality tiers.
 *
 * Inspects viewport, pointer type, memory, cores, and network to pick
 * low / medium / high settings from `QUALITY_SETTINGS`.
 *
 * @see lib/three/qualitySettings.ts
 */

"use client";

import { useEffect, useState } from "react";
import {
  QUALITY_SETTINGS,
  getReducedQualitySettings,
  type QualitySettings,
  type SceneQuality,
} from "@/lib/three/qualitySettings";

/** Detect quality tier from device signals (viewport, memory, network, pointer). */
function detectQualityTier(): SceneQuality {
  if (typeof window === "undefined") return "medium";

  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean; effectiveType?: string };
  };

  const width = window.innerWidth;
  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const isMobile = width < 768;
  const isTablet = width >= 768 && width < 1025;
  const saveData = nav.connection?.saveData;
  const slowNetwork =
    nav.connection?.effectiveType === "2g" ||
    nav.connection?.effectiveType === "slow-2g";
  const lowMemory = (nav.deviceMemory ?? 8) <= 4;
  const reducedCores = (navigator.hardwareConcurrency ?? 8) <= 4;

  if (saveData || slowNetwork || (lowMemory && reducedCores)) {
    return "low";
  }

  if (coarsePointer || isMobile || isTablet) {
    return "medium";
  }

  if (lowMemory) {
    return "medium";
  }

  return "high";
}

export function useDeviceQuality(reducedEffects = false) {
  const [tier, setTier] = useState<SceneQuality>("medium");

  useEffect(() => {
    const update = () => setTier(detectQualityTier());
    update();

    const mq = window.matchMedia("(pointer: coarse)");
    mq.addEventListener("change", update);
    window.addEventListener("resize", update, { passive: true });

    return () => {
      mq.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const base = QUALITY_SETTINGS[tier];
  const settings: QualitySettings = reducedEffects
    ? getReducedQualitySettings(base)
    : base;

  return { tier, settings };
}
