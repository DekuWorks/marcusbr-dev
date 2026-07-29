"use client";

import { useCallback, useEffect, useState } from "react";

export type EffectsPreference = "full" | "reduced" | "off";

const STORAGE_KEY = "marcus-os-effects-preference";

function readStoredPreference(): EffectsPreference | null {
  if (typeof window === "undefined") return null;
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "full" || stored === "reduced" || stored === "off") {
    return stored;
  }
  return null;
}

function getSystemReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useReducedMotionPreference() {
  const [preference, setPreferenceState] = useState<EffectsPreference>("full");
  const [systemReducedMotion, setSystemReducedMotion] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = readStoredPreference();
    const systemReduced = getSystemReducedMotion();
    setSystemReducedMotion(systemReduced);
    setPreferenceState(stored ?? (systemReduced ? "reduced" : "full"));
    setHydrated(true);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (event: MediaQueryListEvent) => {
      setSystemReducedMotion(event.matches);
      if (!readStoredPreference()) {
        setPreferenceState(event.matches ? "reduced" : "full");
      }
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const setPreference = useCallback((next: EffectsPreference) => {
    setPreferenceState(next);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const shouldReduceMotion =
    preference === "off" ||
    preference === "reduced" ||
    (preference === "full" && systemReducedMotion);

  const webglEnabled = preference !== "off" && !shouldReduceMotion;

  return {
    preference,
    setPreference,
    shouldReduceMotion,
    webglEnabled,
    systemReducedMotion,
    hydrated,
  };
}
