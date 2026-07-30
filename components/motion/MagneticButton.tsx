/** Button wrapper with magnetic cursor pull; strength from quality settings. */
"use client";

import {
  useRef,
  useState,
  useEffect,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
import { useLiquidEffects } from "@/hooks/useEffectsPreference";
import { useDeviceQuality } from "@/hooks/useDeviceQuality";

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

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
  style?: CSSProperties;
};

export default function MagneticButton({
  children,
  className = "",
  strength,
  style,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { magneticEnabled, effectsReduced } = useLiquidEffects();
  const { settings } = useDeviceQuality(effectsReduced);
  const coarsePointerRef = useCoarsePointer();
  const effectiveStrength = strength ?? settings.magneticStrength;
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!magneticEnabled || coarsePointerRef.current || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * effectiveStrength;
    const y = (e.clientY - rect.top - rect.height / 2) * effectiveStrength;
    const clamp = (value: number) => Math.max(-8, Math.min(8, value));
    setOffset({ x: clamp(x), y: clamp(y) });
  };

  const handleMouseLeave = () => setOffset({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: "transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
