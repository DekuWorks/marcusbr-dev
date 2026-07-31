/**
 * @fileoverview Instanced floating molten-jade droplets orbiting the liquid blob.
 *
 * Mercury/jade beads react to ripple, pulse, pointer, and scroll from the
 * shared interaction ref.
 */

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
    const radius = 1.55 + Math.random() * 1.85;
    positions[i * 3] = Math.cos(theta) * radius + 0.3;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 3.2;
    positions[i * 3 + 2] = Math.sin(theta) * radius * 0.85;
    scales[i] = 0.028 + Math.random() * 0.062;
    speeds[i] = 0.28 + Math.random() * 0.7;
  }

  return { positions, scales, speeds };
}

export default function LiquidDroplets({
  count = 40,
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
        (interaction.ripple + interaction.pulse * 0.55 - rippleRef.current) *
        Math.min(1, delta * 4.5);
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
      const rippleOffset = Math.sin(time * 3.2 + i) * ripple * 0.18;
      const scrollOffset =
        scrollDrift * (0.42 + (i % 5) * 0.05) * scrollDirection;

      dummy.position.set(
        baseX +
          Math.sin(time * dropletSpeed + i) * (0.14 + ripple * 0.08) +
          pointerX * 0.12 +
          scrollDrift * 0.14,
        baseY +
          Math.sin(time * 0.45 * dropletSpeed + i * 0.5) *
            (0.22 + ripple * 0.12) +
          rippleOffset +
          pointerY * 0.1 -
          scrollOffset,
        baseZ +
          Math.cos(time * dropletSpeed + i) * (0.14 + ripple * 0.08) -
          pointerX * 0.05,
      );
      const scale =
        scales[i] * (1 + Math.sin(time * 1.6 + i) * 0.18 + ripple * 0.14);
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  if (count === 0) return null;

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} frustumCulled>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial
        color="#8ad9b8"
        emissive="#3eb489"
        emissiveIntensity={0.38}
        transparent
        opacity={0.9}
        roughness={0.12}
        metalness={0.88}
        envMapIntensity={1.2}
      />
    </instancedMesh>
  );
}
