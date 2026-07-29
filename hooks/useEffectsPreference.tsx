"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useReducedMotion } from "framer-motion";

export type EffectsPreference = "full" | "reduced" | "off";

const STORAGE_KEY = "portfolio-effects-preference";
const LEGACY_STORAGE_KEYS = [
  "marcus-os-effects-preference",
  "marcus-os-effects",
] as const;

function readStoredPreference(): EffectsPreference | null {
  if (typeof window === "undefined") return null;

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === "full" || stored === "reduced" || stored === "off") {
    return stored;
  }

  for (const legacyKey of LEGACY_STORAGE_KEYS) {
    const legacy = localStorage.getItem(legacyKey);
    if (legacy === "full" || legacy === "reduced" || legacy === "off") {
      localStorage.setItem(STORAGE_KEY, legacy);
      localStorage.removeItem(legacyKey);
      return legacy;
    }
  }

  return null;
}

function getSystemReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type EffectsPreferenceContextValue = {
  preference: EffectsPreference;
  setPreference: (next: EffectsPreference) => void;
  shouldReduceMotion: boolean;
  motionEnabled: boolean;
  hydrated: boolean;
};

const EffectsPreferenceContext =
  createContext<EffectsPreferenceContextValue | null>(null);

export function EffectsPreferenceProvider({ children }: { children: ReactNode }) {
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

  const motionEnabled = hydrated && preference === "full" && !systemReducedMotion;

  return (
    <EffectsPreferenceContext.Provider
      value={{
        preference,
        setPreference,
        shouldReduceMotion,
        motionEnabled,
        hydrated,
      }}
    >
      {children}
    </EffectsPreferenceContext.Provider>
  );
}

export function useEffectsPreference() {
  const context = useContext(EffectsPreferenceContext);
  if (!context) {
    throw new Error(
      "useEffectsPreference must be used within EffectsPreferenceProvider",
    );
  }
  return context;
}

export function useMotionEnabled() {
  const prefersReducedMotion = useReducedMotion();
  const { shouldReduceMotion, motionEnabled, hydrated } = useEffectsPreference();

  return {
    motionEnabled: motionEnabled && !prefersReducedMotion,
    shouldReduceMotion: shouldReduceMotion || !!prefersReducedMotion,
    hydrated,
  };
}
