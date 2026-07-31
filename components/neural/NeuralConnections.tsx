"use client";

import { useMemo } from "react";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import type { PortfolioNeuralNode } from "@/lib/neural/portfolioNodes";
import { getNeuralConnections } from "@/lib/neural/portfolioNodes";

type NeuralConnectionsProps = {
  nodes: PortfolioNeuralNode[];
  radius?: number;
  highlightedId?: string | null;
};

function hashUnit(input: string): number {
  let h = 0;
  for (let i = 0; i < input.length; i++) h = (h * 31 + input.charCodeAt(i)) | 0;
  return (Math.abs(h) % 1000) / 1000;
}

export default function NeuralConnections({
  nodes,
  radius = 1.65,
  highlightedId = null,
}: NeuralConnectionsProps) {
  const byId = useMemo(() => {
    const map = new Map<string, PortfolioNeuralNode>();
    nodes.forEach((n) => map.set(n.id, n));
    return map;
  }, [nodes]);

  const lines = useMemo(() => {
    return getNeuralConnections(nodes)
      .map(([fromId, toId]) => {
        const to = byId.get(toId);
        if (!to) return null;

        const start = new THREE.Vector3(0, 0, 0);
        const end = new THREE.Vector3(...to.position)
          .normalize()
          .multiplyScalar(radius);
        const n = hashUnit(`${fromId}-${toId}`);
        const mid = start
          .clone()
          .lerp(end, 0.5)
          .add(
            new THREE.Vector3(
              (n - 0.5) * 0.2,
              (0.7 - n) * 0.15,
              (n - 0.3) * 0.18,
            ),
          );

        const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
        const points = curve.getPoints(24);
        const active = highlightedId === toId || highlightedId === fromId;
        return {
          id: `${fromId}-${toId}`,
          points,
          active,
        };
      })
      .filter(Boolean) as Array<{
      id: string;
      points: THREE.Vector3[];
      active: boolean;
    }>;
  }, [nodes, byId, radius, highlightedId]);

  return (
    <group>
      {lines.map((line) => (
        <Line
          key={line.id}
          points={line.points}
          color={line.active ? "#4ade9a" : "#2f7a5f"}
          transparent
          opacity={line.active ? 0.8 : 0.28}
          lineWidth={1}
        />
      ))}
    </group>
  );
}
