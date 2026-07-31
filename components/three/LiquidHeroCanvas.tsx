/**
 * @fileoverview WebGL liquid hero scene and page background orchestrator.
 *
 * `LiquidHeroCanvas` — R3F canvas with blob, droplets, grid, optional bloom.
 * `LiquidPageBackground` — chooses WebGL vs CSS fallback based on support
 * and effects preference. Pauses rendering when off-screen or tab hidden.
 *
 * @see hooks/useDeviceQuality.ts — quality tier settings
 * @see hooks/useLiquidInteraction.tsx — shared interaction ref
 */

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
import LiquidEnvironment, { useLiquidEnvMap } from "./LiquidEnvironment";
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
  blobScale,
  gridDensity,
  deformationSpeed,
  interactionRef,
  onTick,
}: {
  paused: boolean;
  bloom: boolean;
  dropletCount: number;
  blobSegments: number;
  blobScale: number;
  gridDensity: number;
  deformationSpeed: number;
  interactionRef: ReturnType<typeof useLiquidInteraction>["stateRef"];
  onTick: (delta: number) => void;
}) {
  const envMap = useLiquidEnvMap();

  useFrame((_, delta) => {
    if (!paused) onTick(delta);
  });

  return (
    <>
      <color attach="background" args={["#0d1310"]} />
      {/* TextureLoader + map= — never files= on .webp (drei GainMapLoader → /i/ 404) */}
      <LiquidEnvironment map={envMap} intensity={0.7} />
      <ambientLight intensity={0.3} />
      <pointLight position={[3.2, 4.2, 2.4]} intensity={1.35} color="#d8f5e8" />
      <pointLight position={[-3.4, -0.6, -2.2]} intensity={0.65} color="#22d3ee" />
      <pointLight position={[0.6, 2.8, -2.8]} intensity={0.75} color="#4ade9a" />
      <LiquidGrid
        density={gridDensity}
        speed={deformationSpeed}
        paused={paused}
        interactionRef={interactionRef}
      />
      <LiquidBlob
        segments={blobSegments}
        speed={deformationSpeed}
        scale={blobScale}
        paused={paused}
        interactionRef={interactionRef}
        envMap={envMap}
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
            luminanceThreshold={0.62}
            luminanceSmoothing={0.72}
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
            blobScale={settings.blobScale}
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

  const fallbackDroplets = effectsReduced ? 12 : 16;

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
