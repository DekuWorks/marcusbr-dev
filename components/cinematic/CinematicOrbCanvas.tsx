/**
 * @fileoverview Page-wide interactive jade liquid-lava metal WebGL layer.
 *
 * Single R3F context: molten blob + droplets + optional bloom. Reacts to
 * pointer/scroll/UI emitters via LiquidInteractionProvider. Sits behind
 * vignette/content — never over the hero face. CSS cinematic stills remain
 * when WebGL is unavailable or reduced-motion is on.
 *
 * Interaction ticking stays in LiquidInteractionProvider (one rAF) — this
 * canvas only reads the shared state ref to avoid double-decay jank.
 */

"use client";

import {
  Component,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ErrorInfo,
  type MutableRefObject,
  type ReactNode,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { useLiquidEffects } from "@/hooks/useEffectsPreference";
import { useDeviceQuality } from "@/hooks/useDeviceQuality";
import { useLiquidInteraction } from "@/hooks/useLiquidInteraction";
import {
  useElementVisibility,
  usePageVisible,
} from "@/hooks/useElementVisibility";
import LiquidBlob from "@/components/three/LiquidBlob";
import LiquidDroplets from "@/components/three/LiquidDroplets";
import LiquidEnvironment, {
  useLiquidEnvMap,
} from "@/components/three/LiquidEnvironment";
import { useWebGLSupport } from "@/hooks/useWebGLSupport";
import type { LiquidInteractionRefs } from "@/lib/liquid/interactionState";

type LavaSceneProps = {
  paused: boolean;
  bloom: boolean;
  dropletCount: number;
  blobSegments: number;
  blobScale: number;
  deformationSpeed: number;
  interactionRef: MutableRefObject<LiquidInteractionRefs>;
};

function TransparentClear() {
  const { gl } = useThree();
  useFrame(() => {
    gl.setClearColor(0x000000, 0);
  }, -1);
  return null;
}

function LavaScene({
  paused,
  bloom,
  dropletCount,
  blobSegments,
  blobScale,
  deformationSpeed,
  interactionRef,
}: LavaSceneProps) {
  const envMap = useLiquidEnvMap();
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    const group = groupRef.current;
    const interaction = interactionRef.current;
    if (!group || !interaction) return;

    const px = (interaction.pointerX - 0.5) * 2;
    const py = (interaction.pointerY - 0.5) * 2;
    const scroll = interaction.scrollProgress;
    const ripple = interaction.ripple;
    const t = Math.min(1, delta * 3.6);

    // Bias toward portrait/glow side; strong pointer + scroll reactions
    const targetX = 0.55 + px * 0.42 + scroll * 0.18 + interaction.shiftX * 0.5;
    const targetY =
      0.02 + py * 0.28 - scroll * 0.85 + interaction.shiftY * 0.35 + ripple * 0.08;
    group.position.x += (targetX - group.position.x) * t;
    group.position.y += (targetY - group.position.y) * t;
  });

  return (
    <>
      <TransparentClear />
      <LiquidEnvironment map={envMap} intensity={0.85} />
      <ambientLight intensity={0.22} />
      <pointLight position={[3.4, 4.4, 2.6]} intensity={1.45} color="#d8f5e8" />
      <pointLight position={[-3.2, -0.2, -2.0]} intensity={0.55} color="#3eb489" />
      <pointLight position={[1.0, 2.2, -2.4]} intensity={0.95} color="#4ade9a" />
      <group ref={groupRef} position={[0.55, 0.02, 0]}>
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
      </group>
      {bloom && (
        <EffectComposer multisampling={0} enableNormalPass={false}>
          <Bloom
            intensity={0.42}
            luminanceThreshold={0.55}
            luminanceSmoothing={0.72}
            mipmapBlur
          />
        </EffectComposer>
      )}
    </>
  );
}

function CinematicLiquidCanvasInner() {
  const [containerRef, inView] = useElementVisibility<HTMLDivElement>();
  const pageVisible = usePageVisible();
  const { stateRef } = useLiquidInteraction();
  const { effectsReduced, bloomEnabled, liquidSpeed, dropletMultiplier } =
    useLiquidEffects();
  const { settings } = useDeviceQuality(effectsReduced);

  const paused = !inView || !pageVisible;
  const dropletCount = Math.floor(settings.dropletCount * dropletMultiplier);

  const dpr = useMemo(
    () => settings.dpr as [number, number],
    [settings.dpr],
  );

  return (
    <div
      ref={containerRef}
      className="cinematic-bg__orb-canvas cinematic-bg__liquid"
      aria-hidden
    >
      <Canvas
        dpr={dpr}
        camera={{ position: [0.1, 0.12, 4.5], fov: 40 }}
        gl={{
          alpha: true,
          antialias: settings.bloom,
          premultipliedAlpha: false,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
        frameloop={paused ? "never" : "always"}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      >
        <Suspense fallback={null}>
          <LavaScene
            paused={paused}
            bloom={bloomEnabled && settings.bloom}
            dropletCount={dropletCount}
            blobSegments={settings.blobSegments}
            blobScale={settings.blobScale}
            deformationSpeed={settings.deformationSpeed * liquidSpeed}
            interactionRef={stateRef}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

/** Silent boundary — cinematic stills remain if WebGL fails. */
class OrbErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (process.env.NODE_ENV === "development") {
      console.error("[OrbErrorBoundary]", error, info);
    }
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

/**
 * Interactive liquid lava metal. Desktop / large landscape only — phones keep
 * CSS molten + stills for FPS. Skips WebGL on reduced-motion.
 */
export default function CinematicOrbLayer() {
  const { showWebGL, hydrated, effectsReduced } = useLiquidEffects();
  const { webglSupported, webglChecked } = useWebGLSupport();
  const [allowWebGL, setAllowWebGL] = useState(false);

  useEffect(() => {
    // Desktop / large tablet landscape — avoid heavy WebGL on phones
    const mq = window.matchMedia(
      "(min-width: 768px) and (pointer: fine), (min-width: 900px) and (orientation: landscape)",
    );
    const update = () => setAllowWebGL(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!hydrated || !webglChecked) return null;
  if (!allowWebGL) return null;
  if (!showWebGL || !webglSupported || effectsReduced) return null;

  return (
    <OrbErrorBoundary>
      <CinematicLiquidCanvasInner />
    </OrbErrorBoundary>
  );
}
