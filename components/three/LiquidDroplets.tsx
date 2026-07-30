"use client";

import { useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { LiquidInteractionRefs } from "@/lib/liquid/interactionState";

type LiquidDropletsProps = {
  count?: number;
  speed?: number;
  paused?: boolean;
  interactionRef?: MutableRefObject<LiquidInteractionRefs>;
};

function createDropletPositions(count: number) {
  const positions = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const speeds = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2;
    const radius = 1.4 + Math.random() * 1.2;
    positions[i * 3] = Math.cos(theta) * radius;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 2.4;
    positions[i * 3 + 2] = Math.sin(theta) * radius;
    scales[i] = 0.02 + Math.random() * 0.04;
    speeds[i] = 0.4 + Math.random() * 0.8;
  }

  return { positions, scales, speeds };
}

export default function LiquidDroplets({
  count = 24,
  speed = 1,
  paused = false,
  interactionRef,
}: LiquidDropletsProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const rippleRef = useRef(0);
  const { positions, scales, speeds } = useMemo(
    () => createDropletPositions(count),
    [count],
  );

  useFrame((state, delta) => {
    if (!meshRef.current || paused || count === 0) return;
    const time = state.clock.elapsedTime;
    const interaction = interactionRef?.current;
    if (interaction) {
      rippleRef.current +=
        (interaction.ripple + interaction.pulse * 0.5 - rippleRef.current) *
        Math.min(1, delta * 4);
    }
    const ripple = rippleRef.current;
    const pointerX = interaction ? (interaction.pointerX - 0.5) * 2 : 0;
    const pointerY = interaction ? (interaction.pointerY - 0.5) * 2 : 0;
    const scrollDrift = interaction ? interaction.scrollProgress : 0;
    const scrollDirection = interaction
      ? (interaction.activeSectionIndex % 2 === 0 ? 1 : -1)
      : 1;

    for (let i = 0; i < count; i++) {
      const baseX = positions[i * 3];
      const baseY = positions[i * 3 + 1];
      const baseZ = positions[i * 3 + 2];
      const dropletSpeed = speeds[i] * speed;
      const rippleOffset = Math.sin(time * 4 + i) * ripple * 0.12;
      const scrollOffset =
        scrollDrift * (0.35 + (i % 5) * 0.04) * scrollDirection;

      dummy.position.set(
        baseX + Math.sin(time * dropletSpeed + i) * (0.08 + ripple * 0.04) + pointerX * 0.04 + scrollDrift * 0.06,
        baseY +
          Math.sin(time * 0.6 * dropletSpeed + i * 0.5) * (0.15 + ripple * 0.06) +
          rippleOffset +
          pointerY * 0.03 -
          scrollOffset,
        baseZ + Math.cos(time * dropletSpeed + i) * (0.08 + ripple * 0.04) - pointerX * 0.02,
      );
      const scale = scales[i] * (1 + Math.sin(time * 2 + i) * 0.15 + ripple * 0.08);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  if (count === 0) return null;

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial
        color="#4ade9a"
        emissive="#3eb489"
        emissiveIntensity={0.72}
        transparent
        opacity={0.8}
        roughness={0.12}
        metalness={0.45}
      />
    </instancedMesh>
  );
}
