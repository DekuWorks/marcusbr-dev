/**
 * @fileoverview Subtle magnetic pull on nav links (fine pointer only).
 *
 * Translates the wrapper toward the cursor on hover, clamped to ±4px.
 */

"use client";

import {
  useRef,
  useState,
  useEffect,
  type MouseEvent,
  type ReactNode,
} from "react";
import { useLiquidEffects } from "@/hooks/useEffectsPreference";

type NavMagneticLinkProps = {
  children: ReactNode;
  className?: string;
};

export default function NavMagneticLink({
  children,
  className = "",
}: NavMagneticLinkProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { magneticEnabled, effectsReduced } = useLiquidEffects();
  const coarseRef = useRef(true);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const update = () => {
      coarseRef.current = mq.matches;
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!magneticEnabled || effectsReduced || coarseRef.current || !ref.current)
      return;
    const rect = ref.current.getBoundingClientRect();
    const strength = 0.06;
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    const clamp = (value: number) => Math.max(-4, Math.min(4, value));
    setOffset({ x: clamp(x), y: clamp(y) });
  };

  const handleMouseLeave = () => setOffset({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
