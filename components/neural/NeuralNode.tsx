"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { PortfolioNeuralNode } from "@/lib/neural/portfolioNodes";

type NeuralNodeProps = {
  node: PortfolioNeuralNode;
  radius?: number;
  paused?: boolean;
  selected?: boolean;
  onSelect?: (node: PortfolioNeuralNode) => void;
  onHover?: (node: PortfolioNeuralNode | null) => void;
};

export default function NeuralNode({
  node,
  radius = 1.65,
  paused = false,
  selected = false,
  onSelect,
  onHover,
}: NeuralNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const phase = useRef(Math.random() * Math.PI * 2);

  const position = new THREE.Vector3(...node.position)
    .normalize()
    .multiplyScalar(node.kind === "center" ? 0 : radius);

  const accent = node.accent ?? "#4ade9a";
  const isCenter = node.kind === "center";

  useFrame((state) => {
    if (!meshRef.current || paused || isCenter) return;
    const t = state.clock.elapsedTime;
    const pulse = 1 + Math.sin(t * 1.55 + phase.current) * 0.1;
    const boost = hovered || selected ? 1.35 : 1;
    meshRef.current.scale.setScalar(
      pulse * boost * (node.kind === "project" ? 1.05 : 0.9),
    );
  });

  if (isCenter) return null;

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          onHover?.(node);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          onHover?.(null);
          document.body.style.cursor = "auto";
        }}
        onClick={(e) => {
          e.stopPropagation();
          onSelect?.(node);
        }}
      >
        <sphereGeometry args={[0.095, 20, 20]} />
        <meshStandardMaterial
          color={hovered || selected ? accent : "#d0d8dd"}
          emissive={accent}
          emissiveIntensity={hovered || selected ? 1.1 : 0.38}
          metalness={0.88}
          roughness={0.22}
        />
      </mesh>
      {(hovered || selected) && (
        <mesh scale={1.85}>
          <sphereGeometry args={[0.095, 16, 16]} />
          <meshBasicMaterial
            color={accent}
            transparent
            opacity={0.12}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  );
}
