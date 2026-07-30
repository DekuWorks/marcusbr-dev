/**
 * @fileoverview Motion and effects preference provider.
 *
 * Reads system `prefers-reduced-motion` and exposes derived flags for Framer
 * Motion and liquid/WebGL intensity. Legacy localStorage keys are cleared on
 * mount — effects are now system-driven only (no manual toggle).
 *
 * @see hooks/useLiquidEffects — WebGL/CSS intensity derived from this context
 */

"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useReducedMotion } from "framer-motion";

const STORAGE_KEY = "portfolio-effects-preference";
const LEGACY_STORAGE_KEYS = [
  "marcus-os-effects-preference",
  "marcus-os-effects",
] as const;

function getSystemReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function clearStoredPreferences() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
  for (const legacyKey of LEGACY_STORAGE_KEYS) {
    localStorage.removeItem(legacyKey);
  }
}

type EffectsPreferenceContextValue = {
  shouldReduceMotion: boolean;
  motionEnabled: boolean;
  hydrated: boolean;
};

const EffectsPreferenceContext =
  createContext<EffectsPreferenceContextValue | null>(null);

export function EffectsPreferenceProvider({ children }: { children: ReactNode }) {
  const [systemReducedMotion, setSystemReducedMotion] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    clearStoredPreferences();
    setSystemReducedMotion(getSystemReducedMotion());
    setHydrated(true);

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (event: MediaQueryListEvent) => {
      setSystemReducedMotion(event.matches);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const shouldReduceMotion = systemReducedMotion;
  const motionEnabled = hydrated && !systemReducedMotion;

  return (
    <EffectsPreferenceContext.Provider
      value={{
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

/** Derived flags for liquid backdrop and WebGL scene intensity. */
export function useLiquidEffects() {
  const prefersReducedMotion = useReducedMotion();
  const { shouldReduceMotion, motionEnabled, hydrated } = useEffectsPreference();

  const systemReduced = shouldReduceMotion || Boolean(prefersReducedMotion);
  const reduced = systemReduced;

  return {
    hydrated,
    effectsOff: false,
    effectsReduced: reduced,
    effectsFull: !reduced && motionEnabled,
    showWebGL: hydrated && !systemReduced,
    showCSSFallback: !hydrated || systemReduced,
    magneticEnabled: hydrated && !systemReduced && motionEnabled,
    tiltEnabled: reduced ? 4 : 8,
    cursorGlowEnabled: hydrated && !systemReduced && motionEnabled,
    parallaxEnabled: hydrated && !systemReduced && motionEnabled,
    animatedGridEnabled: hydrated && !systemReduced,
    bloomEnabled: hydrated && !systemReduced && motionEnabled,
    liquidSpeed: reduced ? 0.45 : 1,
    dropletMultiplier: reduced ? 0.35 : 1,
  };
}
