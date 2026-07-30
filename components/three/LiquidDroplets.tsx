"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type LiquidDropletsProps = {
  count?: number;
  speed?: number;
  paused?: boolean;
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
}: LiquidDropletsProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const { positions, scales, speeds } = useMemo(
    () => createDropletPositions(count),
    [count],
  );

  useFrame((state) => {
    if (!meshRef.current || paused || count === 0) return;
    const time = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const baseX = positions[i * 3];
      const baseY = positions[i * 3 + 1];
      const baseZ = positions[i * 3 + 2];
      const dropletSpeed = speeds[i] * speed;

      dummy.position.set(
        baseX + Math.sin(time * dropletSpeed + i) * 0.08,
        baseY + Math.sin(time * 0.6 * dropletSpeed + i * 0.5) * 0.15,
        baseZ + Math.cos(time * dropletSpeed + i) * 0.08,
      );
      const scale = scales[i] * (1 + Math.sin(time * 2 + i) * 0.15);
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
        emissiveIntensity={0.6}
        transparent
        opacity={0.75}
        roughness={0.15}
        metalness={0.4}
      />
    </instancedMesh>
  );
}
