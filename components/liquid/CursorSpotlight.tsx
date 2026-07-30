"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useLiquidEffects } from "@/hooks/useEffectsPreference";

type CursorSpotlightProps = {
  children: ReactNode;
  className?: string;
};

function useCoarsePointer() {
  const coarseRef = useRef(true);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => {
      coarseRef.current = mq.matches;
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return coarseRef;
}

export default function CursorSpotlight({
  children,
  className = "",
}: CursorSpotlightProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { cursorGlowEnabled } = useLiquidEffects();
  const coarsePointerRef = useCoarsePointer();

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cursorGlowEnabled || coarsePointerRef.current || !ref.current) return;
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
