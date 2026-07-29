"use client";

import { useMotionEnabled } from "@/hooks/useEffectsPreference";

type SkeletonBlockProps = {
  className?: string;
};

export default function SkeletonBlock({ className = "" }: SkeletonBlockProps) {
  const { shouldReduceMotion } = useMotionEnabled();

  return (
    <div
      className={`rounded-lg border border-jade/10 bg-jade/10 ${
        shouldReduceMotion ? "opacity-60" : "skeleton-pulse"
      } ${className}`}
      aria-hidden
    />
  );
}
