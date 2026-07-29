"use client";

import {
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
  type CSSProperties,
} from "react";
import { useReducedMotion } from "framer-motion";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  style?: CSSProperties;
};

export default function TiltCard({
  children,
  className = "",
  maxTilt = 6,
  style,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [transform, setTransform] = useState(
    "perspective(800px) rotateX(0deg) rotateY(0deg)",
  );

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTransform(
      `perspective(800px) rotateX(${-y * maxTilt}deg) rotateY(${x * maxTilt}deg)`,
    );
  };

  const handleMouseLeave = () => {
    setTransform("perspective(800px) rotateX(0deg) rotateY(0deg)");
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...style, transform, transition: "transform 0.15s ease-out" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}
