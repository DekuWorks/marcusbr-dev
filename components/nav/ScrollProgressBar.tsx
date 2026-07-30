"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

export default function ScrollProgressBar() {
  const prefersReducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      const max = scrollHeight - clientHeight;
      setProgress(max > 0 ? scrollTop / max : 0);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  if (prefersReducedMotion) return null;

  return (
    <div
      className="scroll-progress-track"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      aria-label="Page scroll progress"
    >
      <div
        className="scroll-progress-fill"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
