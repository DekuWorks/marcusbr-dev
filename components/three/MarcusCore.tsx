"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import type { Mesh } from "three";
import { CORE_ROTATION_SPEED } from "@/lib/three/sceneConstants";

type MarcusCoreProps = {
  animate?: boolean;
};

export default function MarcusCore({ animate = true }: MarcusCoreProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!animate || !meshRef.current) return;
    meshRef.current.rotation.y += delta * CORE_ROTATION_SPEED;
    meshRef.current.rotation.x += delta * CORE_ROTATION_SPEED * 0.3;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[0.65, 1]} />
      <MeshDistortMaterial
        color="#3eb489"
        emissive="#1a5c42"
        emissiveIntensity={0.4}
        roughness={0.35}
        metalness={0.6}
        distort={0.15}
        speed={1.5}
      />
    </mesh>
  );
}
