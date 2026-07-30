/** Frosted-glass panel wrapper using the `glass-panel` utility class. */
"use client";

import { type ReactNode } from "react";

type GlassPanelProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "article";
};

export default function GlassPanel({
  children,
  className = "",
  as: Tag = "div",
}: GlassPanelProps) {
  return <Tag className={`glass-panel ${className}`}>{children}</Tag>;
}
