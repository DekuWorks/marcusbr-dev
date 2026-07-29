"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Object3D } from "three";
import type { InstancedMesh } from "three";

type ParticleFieldProps = {
  count?: number;
  animate?: boolean;
};

export default function ParticleField({
  count = 80,
  animate = true,
}: ParticleFieldProps) {
  const meshRef = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);

  const particles = useMemo(() => {
    const data: { x: number; y: number; z: number; speed: number }[] = [];
    for (let i = 0; i < count; i++) {
      data.push({
        x: (Math.random() - 0.5) * 12,
        y: (Math.random() - 0.5) * 8,
        z: (Math.random() - 0.5) * 12,
        speed: 0.2 + Math.random() * 0.5,
      });
    }
    return data;
  }, [count]);

  useFrame((state) => {
    if (!animate || !meshRef.current) return;
    const t = state.clock.elapsedTime;

    particles.forEach((p, i) => {
      dummy.position.set(
        p.x,
        p.y + Math.sin(t * p.speed + i) * 0.15,
        p.z,
      );
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  if (count === 0) return null;

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.02, 6, 6]} />
      <meshBasicMaterial color="#4ade9a" transparent opacity={0.5} />
    </instancedMesh>
  );
}
