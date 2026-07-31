/**
 * React Three Fiber neural interface — liquid-metal core + orbit nodes.
 */

"use client";

import { Suspense, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useDeviceQuality } from "@/hooks/useDeviceQuality";
import { useLiquidEffects } from "@/hooks/useEffectsPreference";
import {
  useElementVisibility,
  usePageVisible,
} from "@/hooks/useElementVisibility";
import {
  getPortfolioNeuralNodes,
  type PortfolioNeuralNode,
} from "@/lib/neural/portfolioNodes";
import NeuralCore from "./NeuralCore";
import NeuralNode from "./NeuralNode";
import NeuralConnections from "./NeuralConnections";
import CameraController from "./CameraController";
import SceneLighting from "./SceneLighting";
import SceneEffects from "./SceneEffects";

type NeuralSceneProps = {
  className?: string;
  onNodeSelect?: (node: PortfolioNeuralNode) => void;
  onNodeHover?: (node: PortfolioNeuralNode | null) => void;
  selectedId?: string | null;
  /** World position to cinematic-travel toward */
  focusTarget?: [number, number, number] | null;
  /** 0–1 camera travel / core surge */
  travel?: number;
};

function ParticleField({ count }: { count: number }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, [count]);

  return (
    <Points positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#4ade9a"
        size={0.018}
        sizeAttenuation
        depthWrite={false}
        opacity={0.5}
      />
    </Points>
  );
}

function NeuralWorld({
  paused,
  bloom,
  particleCount,
  speed,
  selectedId,
  onNodeSelect,
  onNodeHover,
  focusTarget,
  travel,
}: {
  paused: boolean;
  bloom: boolean;
  particleCount: number;
  speed: number;
  selectedId?: string | null;
  onNodeSelect?: (node: PortfolioNeuralNode) => void;
  onNodeHover?: (node: PortfolioNeuralNode | null) => void;
  focusTarget?: [number, number, number] | null;
  travel: number;
}) {
  const nodes = useMemo(() => getPortfolioNeuralNodes(), []);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <>
      <SceneLighting />
      <CameraController
        enabled={!paused}
        intensity={1}
        focusTarget={focusTarget}
        travel={travel}
      />
      <NeuralCore speed={speed} paused={paused} surge={travel} />
      <NeuralConnections
        nodes={nodes}
        highlightedId={hoveredId ?? selectedId ?? null}
      />
      {nodes.map((node) => (
        <NeuralNode
          key={node.id}
          node={node}
          paused={paused}
          selected={selectedId === node.id}
          onHover={(n) => {
            setHoveredId(n?.id ?? null);
            onNodeHover?.(n);
          }}
          onSelect={onNodeSelect}
        />
      ))}
      {particleCount > 0 && <ParticleField count={particleCount} />}
      <SceneEffects enabled={bloom && !paused} />
    </>
  );
}

export default function NeuralScene({
  className = "",
  onNodeSelect,
  onNodeHover,
  selectedId = null,
  focusTarget = null,
  travel = 0,
}: NeuralSceneProps) {
  const [containerRef, inView] = useElementVisibility<HTMLDivElement>();
  const pageVisible = usePageVisible();
  const { effectsReduced, bloomEnabled, liquidSpeed } = useLiquidEffects();
  const { settings, tier } = useDeviceQuality(effectsReduced);

  const paused = !inView || !pageVisible;
  const particleCount =
    tier === "high" ? 160 : tier === "medium" ? 80 : 32;

  const dpr = useMemo(
    () => settings.dpr as [number, number],
    [settings.dpr],
  );

  return (
    <div
      ref={containerRef}
      className={`neural-scene ${className}`}
      aria-hidden
    >
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0.25, 5.2], fov: 42 }}
        gl={{
          alpha: true,
          antialias: tier !== "low",
          powerPreference: "high-performance",
        }}
        frameloop={paused ? "never" : "always"}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color("#070b09"), 0);
        }}
        style={{ width: "100%", height: "100%" }}
      >
        <Suspense fallback={null}>
          <NeuralWorld
            paused={paused}
            bloom={bloomEnabled && settings.bloom}
            particleCount={effectsReduced ? 0 : particleCount}
            speed={settings.deformationSpeed * liquidSpeed * 0.95}
            selectedId={selectedId}
            onNodeSelect={onNodeSelect}
            onNodeHover={onNodeHover}
            focusTarget={focusTarget}
            travel={travel}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
