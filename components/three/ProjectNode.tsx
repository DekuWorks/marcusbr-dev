"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";
import { NODE_SIZE } from "@/lib/three/sceneConstants";

type ProjectNodeProps = {
  position: [number, number, number];
  color: string;
  onSelect: () => void;
  animate?: boolean;
};

export default function ProjectNode({
  position,
  color,
  onSelect,
  animate = true,
}: ProjectNodeProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state) => {
    if (!animate || !meshRef.current) return;
    const t = state.clock.elapsedTime;
    meshRef.current.position.y =
      position[1] + Math.sin(t * 1.5 + position[0]) * 0.06;
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onPointerOver={() => {
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        document.body.style.cursor = "auto";
      }}
    >
      <sphereGeometry args={[NODE_SIZE, 16, 16]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.35}
        roughness={0.4}
        metalness={0.5}
      />
      {/* Invisible larger hit area */}
      <mesh visible={false}>
        <sphereGeometry args={[NODE_SIZE * 2, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </mesh>
  );
}
