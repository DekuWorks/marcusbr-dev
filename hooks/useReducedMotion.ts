"use client";

import { useReducedMotion as useFramerReducedMotion } from "framer-motion";
import { useEffectsPreference } from "@/hooks/useEffectsPreference";

export function useReducedMotion() {
  const prefersReduced = useFramerReducedMotion();
  const { shouldReduceMotion, preference } = useEffectsPreference();

  return {
    prefersReducedMotion: Boolean(prefersReduced) || shouldReduceMotion,
    effectsOff: preference === "off",
    effectsReduced: preference === "reduced" || shouldReduceMotion,
  };
}
