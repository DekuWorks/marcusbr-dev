"use client";

import { type ReactNode } from "react";

type LiquidBorderProps = {
  children: ReactNode;
  className?: string;
  accent?: string;
  style?: React.CSSProperties;
};

export default function LiquidBorder({
  children,
  className = "",
  accent = "#3eb489",
  style,
}: LiquidBorderProps) {
  return (
    <div
      className={`liquid-border ${className}`}
      style={
        {
          ...style,
          "--liquid-accent": accent,
        } as React.CSSProperties
      }
    >
      <div className="liquid-border__glow" aria-hidden />
      <div className="liquid-border__content">{children}</div>
    </div>
  );
}
