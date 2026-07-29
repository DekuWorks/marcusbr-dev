"use client";

import { useMemo } from "react";
import PortfolioCanvas from "./PortfolioCanvas";
import MarcusCore from "./MarcusCore";
import ProjectOrbit from "./ProjectOrbit";
import ParticleField from "./ParticleField";
import { getSceneQuality } from "@/lib/three/qualitySettings";
import type { PerformanceTier } from "@/lib/three/qualitySettings";
import { useElementVisibility } from "@/hooks/useElementVisibility";

type PortfolioHeroSceneProps = {
  tier?: PerformanceTier;
  animate?: boolean;
};

export default function PortfolioHeroScene({
  tier = "medium",
  animate = true,
}: PortfolioHeroSceneProps) {
  const quality = useMemo(() => getSceneQuality(tier), [tier]);
  const { ref, isVisible } = useElementVisibility<HTMLDivElement>({
    threshold: 0.05,
    rootMargin: "100px",
  });

  const shouldAnimate = animate && quality.enableOrbitAnimation && isVisible;

  return (
    <div ref={ref} className="h-full w-full">
      <PortfolioCanvas quality={quality} paused={!isVisible}>
        <ambientLight intensity={0.4} />
        <pointLight position={[4, 4, 4]} intensity={1.2} color="#4ade9a" />
        <pointLight position={[-3, -2, 2]} intensity={0.5} color="#818cf8" />
        <MarcusCore animate={shouldAnimate} />
        <ProjectOrbit animate={shouldAnimate} />
        {quality.enableParticles && (
          <ParticleField
            count={quality.particleCount}
            animate={shouldAnimate}
          />
        )}
      </PortfolioCanvas>
    </div>
  );
}
