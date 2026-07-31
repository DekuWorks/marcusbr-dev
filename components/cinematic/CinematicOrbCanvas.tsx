/**
 * @fileoverview Page-wide interactive jade liquid-lava metal WebGL layer.
 *
 * Single R3F context: molten blob + droplets (no EffectComposer bloom —
 * bloom on a transparent canvas flashes black). Reacts to pointer/scroll/UI
 * emitters via LiquidInteractionProvider. Sits behind vignette/content —
 * never over the hero face. CSS cinematic stills remain when WebGL is
 * unavailable or reduced-motion is on.
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
import type { Group } from "three";
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
  dropletCount: number;
  blobSegments: number;
  blobScale: number;
  deformationSpeed: number;
  interactionRef: MutableRefObject<LiquidInteractionRefs>;
  onFirstFrame?: () => void;
};

/** Configure transparent clear once — avoid per-frame clear fights with bloom. */
function TransparentClearOnce() {
  const { gl } = useThree();
  useEffect(() => {
    gl.setClearColor(0x000000, 0);
    gl.setClearAlpha(0);
  }, [gl]);
  return null;
}

/** Fire once after the first successful rendered frame (scene is visible). */
function FirstFrameSignal({ onReady }: { onReady?: () => void }) {
  const fired = useRef(false);
  useFrame(() => {
    if (fired.current || !onReady) return;
    fired.current = true;
    onReady();
  });
  return null;
}

function LavaScene({
  paused,
  dropletCount,
  blobSegments,
  blobScale,
  deformationSpeed,
  interactionRef,
  onFirstFrame,
}: LavaSceneProps) {
  const envMap = useLiquidEnvMap();
  const groupRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (paused) return;
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
      <TransparentClearOnce />
      <FirstFrameSignal onReady={onFirstFrame} />
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
    </>
  );
}

type CanvasInnerProps = {
  onReady?: () => void;
};

function CinematicLiquidCanvasInner({ onReady }: CanvasInnerProps) {
  const [containerRef, inView] = useElementVisibility<HTMLDivElement>();
  const pageVisible = usePageVisible();
  const { stateRef } = useLiquidInteraction();
  const { effectsReduced, liquidSpeed, dropletMultiplier } = useLiquidEffects();
  const { settings } = useDeviceQuality(effectsReduced);
  const [canvasReady, setCanvasReady] = useState(false);

  const paused = !inView || !pageVisible;
  const dropletCount = Math.floor(settings.dropletCount * dropletMultiplier);

  // Stabilize DPR tuple identity across renders
  const dprMin = settings.dpr[0];
  const dprMax = settings.dpr[1];
  const dpr = useMemo(
    () => [dprMin, dprMax] as [number, number],
    [dprMin, dprMax],
  );

  const handleFirstFrame = useMemo(
    () => () => {
      setCanvasReady(true);
      onReady?.();
    },
    [onReady],
  );

  return (
    <div
      ref={containerRef}
      className={`cinematic-bg__orb-canvas cinematic-bg__liquid${canvasReady ? " is-ready" : ""}`}
      aria-hidden
    >
      <Canvas
        dpr={dpr}
        camera={{ position: [0.1, 0.12, 4.5], fov: 40 }}
        gl={{
          alpha: true,
          antialias: false,
          // Straight alpha from LiquidBlob shader — matches CSS normal blend
          premultipliedAlpha: false,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
          // Preserve last frame when paused — avoids black clear flashes on resume
          preserveDrawingBuffer: true,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0);
          gl.setClearAlpha(0);
        }}
        // Keep frameloop always while mounted; scene skips work when paused.
        // Toggling never↔always causes a transparent/black flash.
        frameloop={paused ? "demand" : "always"}
        style={{ width: "100%", height: "100%", background: "transparent" }}
      >
        <Suspense fallback={null}>
          <LavaScene
            paused={paused}
            dropletCount={dropletCount}
            blobSegments={settings.blobSegments}
            blobScale={settings.blobScale}
            deformationSpeed={settings.deformationSpeed * liquidSpeed}
            interactionRef={stateRef}
            onFirstFrame={handleFirstFrame}
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

type CinematicOrbLayerProps = {
  /** Called once after the first WebGL frame — parent can drop CSS molten. */
  onReady?: () => void;
};

/**
 * Interactive liquid lava metal. Desktop / large landscape only — phones keep
 * CSS molten + stills for FPS. Skips WebGL on reduced-motion.
 */
export default function CinematicOrbLayer({ onReady }: CinematicOrbLayerProps) {
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
      <CinematicLiquidCanvasInner onReady={onReady} />
    </OrbErrorBoundary>
  );
}
