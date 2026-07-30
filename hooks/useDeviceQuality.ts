"use client";

import { useEffect, useState } from "react";
import {
  QUALITY_SETTINGS,
  getReducedQualitySettings,
  type QualitySettings,
  type SceneQuality,
} from "@/lib/three/qualitySettings";

function detectQualityTier(): SceneQuality {
  if (typeof window === "undefined") return "medium";

  const nav = navigator as Navigator & {
    deviceMemory?: number;
    connection?: { saveData?: boolean; effectiveType?: string };
  };

  const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const smallScreen = window.innerWidth < 768;
  const saveData = nav.connection?.saveData;
  const slowNetwork =
    nav.connection?.effectiveType === "2g" ||
    nav.connection?.effectiveType === "slow-2g";
  const lowMemory = (nav.deviceMemory ?? 8) <= 4;
  const reducedCores = (navigator.hardwareConcurrency ?? 8) <= 4;

  if (saveData || slowNetwork || (lowMemory && reducedCores)) {
    return "low";
  }

  if (coarsePointer || smallScreen || lowMemory) {
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
