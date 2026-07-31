"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useMotionEnabled } from "@/hooks/useEffectsPreference";
import { HERO_ROLES } from "@/lib/cinematic/roles";

const CYCLE_MS = 2800;

/**
 * Cycles through role titles with a soft crossfade.
 * Falls back to a static joined list when reduced-motion is preferred.
 */
export default function AnimatedRoles({ className = "" }: { className?: string }) {
  const { motionEnabled } = useMotionEnabled();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!motionEnabled) return;
    const id = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_ROLES.length);
    }, CYCLE_MS);
    return () => window.clearInterval(id);
  }, [motionEnabled]);

  if (!motionEnabled) {
    return (
      <p
        className={`inline-flex flex-wrap items-center justify-center gap-2 text-[11px] font-semibold tracking-[0.2em] text-jade uppercase lg:justify-start ${className}`}
      >
        {HERO_ROLES.map((role, i) => (
          <span key={role} className="inline-flex items-center gap-2">
            {i > 0 && (
              <span className="text-jade/40" aria-hidden>
                •
              </span>
            )}
            {role}
          </span>
        ))}
      </p>
    );
  }

  return (
    <p
      className={`relative inline-flex min-h-[1.5rem] items-center justify-center text-[11px] font-semibold tracking-[0.2em] text-jade uppercase lg:justify-start ${className}`}
      aria-live="polite"
    >
      <span className="sr-only">{HERO_ROLES.join(", ")}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={HERO_ROLES[index]}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block"
          aria-hidden
        >
          {HERO_ROLES[index]}
        </motion.span>
      </AnimatePresence>
      <span className="ml-2 hidden text-jade/35 sm:inline" aria-hidden>
        · Portfolio
      </span>
    </p>
  );
}
