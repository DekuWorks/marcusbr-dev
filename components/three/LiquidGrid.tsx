/**
 * @fileoverview Ground grid plane with scroll-driven rotation and bump reactions.
 *
 * Grid density scales with quality tier. Responds to `gridBump` impulses from
 * section changes and carousel navigation.
 */

"use client";

import { useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { LiquidInteractionRefs } from "@/lib/liquid/interactionState";

type LiquidGridProps = {
  density?: number;
  speed?: number;
  paused?: boolean;
  interactionRef?: MutableRefObject<LiquidInteractionRefs>;
};

export default function LiquidGrid({
  density = 1,
  speed = 1,
  paused = false,
  interactionRef,
}: LiquidGridProps) {
  const groupRef = useRef<THREE.Group>(null);
  const bumpRef = useRef(0);
  const scrollRef = useRef(0);
  const lines = useMemo(() => {
    const size = 6 * density;
    const divisions = Math.floor(20 * density);
    const geometry = new THREE.GridHelper(size, divisions, "#3a5a58", "#1c2e2c");
    geometry.position.y = -1.8;
    return geometry;
  }, [density]);

  useFrame((_, delta) => {
    if (paused || !groupRef.current) return;
    const interaction = interactionRef?.current;
    if (interaction) {
      bumpRef.current += (interaction.gridBump - bumpRef.current) * Math.min(1, delta * 5);
      scrollRef.current +=
        (interaction.scrollProgress - scrollRef.current) * Math.min(1, delta * 3);
    }
    const bump = bumpRef.current;
    const scroll = scrollRef.current;
    groupRef.current.rotation.y += delta * (0.04 + bump * 0.06) * speed;
    groupRef.current.rotation.x = scroll * 0.18;
    groupRef.current.position.y = -scroll * 0.48;
    groupRef.current.position.x = Math.sin(scroll * Math.PI * 2) * 0.12;
  });

  return (
    <group ref={groupRef}>
      <primitive object={lines} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.81, 0]}>
        <planeGeometry args={[6 * density, 6 * density]} />
        <meshBasicMaterial
          color="#0d1310"
          transparent
          opacity={0.48}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
