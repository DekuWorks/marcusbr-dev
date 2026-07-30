"use client";

import { useReducedMotion as useFramerReducedMotion } from "framer-motion";
import { useEffectsPreference } from "@/hooks/useEffectsPreference";

export function useReducedMotion() {
  const prefersReduced = useFramerReducedMotion();
  const { shouldReduceMotion } = useEffectsPreference();

  return {
    prefersReducedMotion: Boolean(prefersReduced) || shouldReduceMotion,
    effectsOff: false,
    effectsReduced: shouldReduceMotion || Boolean(prefersReduced),
  };
}
