"use client";

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useLiquidEffects } from "@/hooks/useEffectsPreference";
import { useDeviceQuality } from "@/hooks/useDeviceQuality";
import { useLiquidInteraction } from "@/hooks/useLiquidInteraction";
import {
  useElementVisibility,
  usePageVisible,
} from "@/hooks/useElementVisibility";
import LiquidBlob from "./LiquidBlob";
import LiquidDroplets from "./LiquidDroplets";
import LiquidGrid from "./LiquidGrid";
import { useWebGLSupport } from "@/hooks/useWebGLSupport";
import SceneFallback from "./SceneFallback";
import SceneErrorBoundary from "./SceneErrorBoundary";

type LiquidHeroCanvasProps = {
  className?: string;
};

function LiquidScene({
  paused,
  bloom,
  dropletCount,
  blobSegments,
  gridDensity,
  deformationSpeed,
  interactionRef,
  onTick,
}: {
  paused: boolean;
  bloom: boolean;
  dropletCount: number;
  blobSegments: number;
  gridDensity: number;
  deformationSpeed: number;
  interactionRef: ReturnType<typeof useLiquidInteraction>["stateRef"];
  onTick: (delta: number) => void;
}) {
  useFrame((_, delta) => {
    if (!paused) onTick(delta);
  });

  return (
    <>
      <color attach="background" args={["#0d1310"]} />
      <ambientLight intensity={0.38} />
      <pointLight position={[3, 4, 2]} intensity={1.35} color="#4ade9a" />
      <pointLight position={[-3, -1, -2]} intensity={0.58} color="#22d3ee" />
      <LiquidGrid
        density={gridDensity}
        speed={deformationSpeed}
        paused={paused}
        interactionRef={interactionRef}
      />
      <LiquidBlob
        segments={blobSegments}
        speed={deformationSpeed}
        paused={paused}
        interactionRef={interactionRef}
      />
      <LiquidDroplets
        count={dropletCount}
        speed={deformationSpeed}
        paused={paused}
        interactionRef={interactionRef}
      />
      {bloom && (
        <EffectComposer multisampling={0}>
          <Bloom
            intensity={0.42}
            luminanceThreshold={0.5}
            luminanceSmoothing={0.88}
            mipmapBlur
          />
        </EffectComposer>
      )}
    </>
  );
}

export default function LiquidHeroCanvas({ className = "" }: LiquidHeroCanvasProps) {
  const [containerRef, inView] = useElementVisibility<HTMLDivElement>();
  const pageVisible = usePageVisible();
  const { stateRef, tick } = useLiquidInteraction();
  const { effectsReduced, bloomEnabled, liquidSpeed, dropletMultiplier } =
    useLiquidEffects();
  const { settings } = useDeviceQuality(effectsReduced);

  const paused = !inView || !pageVisible;
  const dropletCount = Math.floor(settings.dropletCount * dropletMultiplier);
  const tickRef = useRef(tick);
  tickRef.current = tick;

  const dpr = useMemo(
    () => settings.dpr as [number, number],
    [settings.dpr],
  );

  return (
    <div
      ref={containerRef}
      className={`liquid-page-canvas absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
    >
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0.2, 4.2], fov: 42 }}
        gl={{
          alpha: true,
          antialias: true,
          powerPreference: "high-performance",
        }}
        frameloop={paused ? "never" : "always"}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <LiquidScene
            paused={paused}
            bloom={bloomEnabled && settings.bloom}
            dropletCount={dropletCount}
            blobSegments={settings.blobSegments}
            gridDensity={settings.gridDensity}
            deformationSpeed={settings.deformationSpeed * liquidSpeed}
            interactionRef={stateRef}
            onTick={(delta) => tickRef.current(delta)}
          />
        </Suspense>
      </Canvas>
      <div className="liquid-page-canvas__vignette pointer-events-none absolute inset-0" />
    </div>
  );
}

export function LiquidPageBackground() {
  const { showWebGL, showCSSFallback, hydrated, effectsReduced } =
    useLiquidEffects();
  const { webglSupported, webglChecked } = useWebGLSupport();

  const fallbackDroplets = effectsReduced ? 9 : 10;

  if (!hydrated || !webglChecked) {
    return <SceneFallback variant="loading" dropletCount={9} showTertiaryOrb={false} />;
  }

  const useCanvas = showWebGL && webglSupported;

  return (
    <>
      {(showCSSFallback || !useCanvas) && (
        <SceneFallback
          dropletCount={fallbackDroplets}
          showTertiaryOrb
        />
      )}
      {useCanvas && (
        <SceneErrorBoundary label="LiquidPage">
          <LiquidHeroCanvas />
        </SceneErrorBoundary>
      )}
    </>
  );
}

/** @deprecated Use LiquidPageBackground — kept for import compatibility */
export const LiquidHeroBackground = LiquidPageBackground;
