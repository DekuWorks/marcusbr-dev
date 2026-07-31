/** Fade/slide-in on scroll via Framer Motion `whileInView`. */
"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { useMotionEnabled } from "@/hooks/useEffectsPreference";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
};

const directionOffset = {
  up: { y: 28, x: 0 },
  down: { y: -28, x: 0 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
};

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ScrollRevealProps) {
  const { motionEnabled } = useMotionEnabled();
  const offset = directionOffset[direction];

  return (
    <motion.div
      className={className}
      initial={
        motionEnabled ? { opacity: 0, x: offset.x, y: offset.y } : false
      }
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{
        duration: motionEnabled ? 0.4 : 0,
        delay: motionEnabled ? delay : 0,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
