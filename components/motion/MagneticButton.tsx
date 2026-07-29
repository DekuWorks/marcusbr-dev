"use client";

import {
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
  type ReactNode,
} from "react";
import { useMotionEnabled } from "@/hooks/useEffectsPreference";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
  style?: CSSProperties;
};

export default function MagneticButton({
  children,
  className = "",
  strength = 0.25,
  style,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { motionEnabled } = useMotionEnabled();
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!motionEnabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * strength;
    const y = (e.clientY - rect.top - rect.height / 2) * strength;
    setOffset({ x, y });
  };

  const handleMouseLeave = () => setOffset({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: "transform 0.2s ease-out",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
