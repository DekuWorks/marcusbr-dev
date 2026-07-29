"use client";

import { useEffect, useState } from "react";
import {
  detectPerformanceTier,
  type PerformanceTier,
} from "@/lib/three/qualitySettings";

export function useDevicePerformance() {
  const [tier, setTier] = useState<PerformanceTier>("medium");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setTier(detectPerformanceTier());
    setHydrated(true);
  }, []);

  return { tier, hydrated, isMobile: tier === "low" };
}
