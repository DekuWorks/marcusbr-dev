"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { useMotionEnabled } from "@/hooks/useEffectsPreference";

type SectionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
};

const directionOffset = {
  up: { y: 32, x: 0 },
  down: { y: -24, x: 0 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
};

/**
 * Cinematic scroll reveal — slightly longer ease than ScrollReveal for section beats.
 * Respects reduced-motion via useMotionEnabled.
 */
export default function SectionReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: SectionRevealProps) {
  const { motionEnabled } = useMotionEnabled();
  const offset = directionOffset[direction];

  return (
    <motion.div
      className={className}
      initial={
        motionEnabled ? { opacity: 0, x: offset.x, y: offset.y } : false
      }
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-64px" }}
      transition={{
        duration: motionEnabled ? 0.55 : 0,
        delay: motionEnabled ? delay : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
