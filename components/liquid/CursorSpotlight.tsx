"use client";

import { useRef, type ReactNode } from "react";
import { useLiquidEffects } from "@/hooks/useEffectsPreference";

type CursorSpotlightProps = {
  children: ReactNode;
  className?: string;
};

export default function CursorSpotlight({
  children,
  className = "",
}: CursorSpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { cursorGlowEnabled } = useLiquidEffects();

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cursorGlowEnabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    ref.current.style.setProperty("--spotlight-x", `${x}%`);
    ref.current.style.setProperty("--spotlight-y", `${y}%`);
  };

  return (
    <div
      ref={ref}
      className={`cursor-spotlight ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={() => {
        if (!ref.current) return;
        ref.current.style.setProperty("--spotlight-x", "50%");
        ref.current.style.setProperty("--spotlight-y", "50%");
      }}
    >
      {children}
    </div>
  );
}
