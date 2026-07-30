"use client";

import { useLiquidEffects } from "@/hooks/useEffectsPreference";

type AnimatedGridProps = {
  className?: string;
  density?: "normal" | "fine";
};

export default function AnimatedGrid({
  className = "",
  density = "normal",
}: AnimatedGridProps) {
  const { animatedGridEnabled } = useLiquidEffects();

  return (
    <div
      className={`animated-grid animated-grid--${density} ${
        animatedGridEnabled ? "animated-grid--active" : ""
      } ${className}`}
      aria-hidden
    />
  );
}
