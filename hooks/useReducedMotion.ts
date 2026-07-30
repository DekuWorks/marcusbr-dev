/**
 * @fileoverview Combined reduced-motion check.
 *
 * Merges Framer Motion's `useReducedMotion` with system preference from
 * `useEffectsPreference`. Prefer `useMotionEnabled` for most components.
 */

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
