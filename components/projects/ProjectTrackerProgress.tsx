"use client";

import { motion, useReducedMotion } from "framer-motion";

interface ProjectTrackerProgressProps {
  phase: string;
  progress: number;
  detail?: string;
  label?: string;
  size?: "sm" | "md";
  showPercentage?: boolean;
  className?: string;
}

export default function ProjectTrackerProgress({
  phase,
  progress,
  detail,
  label,
  size = "md",
  showPercentage = true,
  className = "",
}: ProjectTrackerProgressProps) {
  const prefersReducedMotion = useReducedMotion();
  const clampedProgress = Math.min(100, Math.max(0, progress));
  const barHeight = size === "sm" ? "h-1.5" : "h-2";
  const ariaLabel = label ? `${label} progress` : "Project progress";

  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-semibold tracking-wide text-jade-bright uppercase">
          {phase}
        </p>
        {showPercentage && (
          <span className="shrink-0 text-xs font-medium text-muted tabular-nums">
            {clampedProgress}%
          </span>
        )}
      </div>

      <div
        className={`mt-2 overflow-hidden rounded-full bg-white/10 ${barHeight}`}
        role="progressbar"
        aria-valuenow={clampedProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={ariaLabel}
      >
        <motion.div
          className={`${barHeight} rounded-full bg-gradient-to-r from-jade to-jade-bright`}
          initial={
            prefersReducedMotion
              ? { width: `${clampedProgress}%` }
              : { width: 0 }
          }
          whileInView={{ width: `${clampedProgress}%` }}
          viewport={{ once: true }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.8, ease: "easeOut" }
          }
        />
      </div>

      {detail && (
        <p className="mt-2 text-xs leading-relaxed text-muted">{detail}</p>
      )}
    </div>
  );
}
