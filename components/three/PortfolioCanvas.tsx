"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import type { SceneQuality } from "@/lib/three/qualitySettings";
import SceneErrorBoundary from "./SceneErrorBoundary";
import SceneFallback from "./SceneFallback";

type PortfolioCanvasProps = {
  children: React.ReactNode;
  quality: SceneQuality;
  className?: string;
  paused?: boolean;
};

export default function PortfolioCanvas({
  children,
  quality,
  className = "",
  paused = false,
}: PortfolioCanvasProps) {
  return (
    <div className={`h-full w-full ${className}`}>
      <SceneErrorBoundary>
        <Canvas
          dpr={quality.dpr}
          gl={{
            antialias: quality.antialias,
            alpha: true,
            powerPreference: "high-performance",
          }}
          camera={{ position: [0, 0.5, 6], fov: 45 }}
          frameloop={paused ? "never" : "always"}
          style={{ background: "transparent" }}
        >
          <Suspense fallback={null}>{children}</Suspense>
        </Canvas>
      </SceneErrorBoundary>
    </div>
  );
}

export { SceneFallback };
