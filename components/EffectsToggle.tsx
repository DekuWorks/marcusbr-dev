"use client";

import { useState } from "react";
import { Sparkles, Gauge, CircleOff } from "lucide-react";
import {
  useEffectsPreference,
  type EffectsPreference,
} from "@/hooks/useEffectsPreference";

const OPTIONS: EffectsPreference[] = ["full", "reduced", "off"];

const LABELS: Record<EffectsPreference, string> = {
  full: "Full motion",
  reduced: "Reduced motion",
  off: "Motion off",
};

const ICONS = {
  full: Sparkles,
  reduced: Gauge,
  off: CircleOff,
} as const;

function nextPreference(current: EffectsPreference): EffectsPreference {
  const index = OPTIONS.indexOf(current);
  return OPTIONS[(index + 1) % OPTIONS.length];
}

type EffectsToggleProps = {
  className?: string;
};

export default function EffectsToggle({ className = "" }: EffectsToggleProps) {
  const { preference, setPreference, hydrated } = useEffectsPreference();
  const [announcement, setAnnouncement] = useState("");
  const Icon = ICONS[preference];

  const cyclePreference = () => {
    const next = nextPreference(preference);
    setPreference(next);
    setAnnouncement(`Visual effects set to ${LABELS[next]}`);
  };

  if (!hydrated) {
    return (
      <span
        className={`inline-flex h-11 w-11 items-center justify-center rounded-lg border border-transparent ${className}`}
        aria-hidden
      />
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={cyclePreference}
        className={`inline-flex h-11 min-w-11 items-center justify-center gap-1.5 rounded-lg border border-jade-border bg-card/40 px-2.5 text-muted transition-colors hover:border-jade/30 hover:text-jade focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:px-3 ${className}`}
        aria-label={`Visual effects: ${LABELS[preference]}. Click to change.`}
        title={LABELS[preference]}
      >
        <Icon className="h-4 w-4 shrink-0" aria-hidden />
        <span className="hidden text-xs font-medium capitalize xl:inline">
          {preference}
        </span>
      </button>
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {announcement}
      </span>
    </>
  );
}
