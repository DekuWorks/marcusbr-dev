"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

type CameraControllerProps = {
  enabled?: boolean;
  intensity?: number;
  /** World-space focus target during cinematic travel (null = idle orbit) */
  focusTarget?: [number, number, number] | null;
  /** 0–1 travel progress; camera eases toward focus */
  travel?: number;
};

/** Idle Xbox-like drift + cinematic push toward a selected node. */
export default function CameraController({
  enabled = true,
  intensity = 1,
  focusTarget = null,
  travel = 0,
}: CameraControllerProps) {
  const { camera } = useThree();
  const base = useRef(new THREE.Vector3(0, 0.25, 5.2));
  const look = useRef(new THREE.Vector3(0, 0, 0));
  const focusPos = useRef(new THREE.Vector3());
  const desiredCam = useRef(new THREE.Vector3());
  const desiredLook = useRef(new THREE.Vector3());

  useFrame((state) => {
    if (!enabled) return;
    const t = state.clock.elapsedTime;
    const amp = 0.14 * intensity;
    const travelAmt = THREE.MathUtils.clamp(travel, 0, 1);
    const ease = travelAmt * travelAmt * (3 - 2 * travelAmt);

    const idleX = base.current.x + Math.sin(t * 0.18) * amp;
    const idleY = base.current.y + Math.cos(t * 0.14) * amp * 0.65;
    const idleZ = base.current.z + Math.sin(t * 0.11) * amp * 0.35;

    desiredCam.current.set(idleX, idleY, idleZ);
    desiredLook.current.copy(look.current);

    if (focusTarget && ease > 0.001) {
      focusPos.current.set(...focusTarget);
      // Push camera toward the node while still looking near the core→node path
      const approach = focusPos.current.clone().multiplyScalar(0.55);
      approach.z += 3.4;
      approach.y += 0.35;
      desiredCam.current.lerp(approach, ease);
      desiredLook.current.lerp(focusPos.current, ease * 0.85);
    }

    camera.position.lerp(desiredCam.current, 0.06 + ease * 0.08);
    camera.lookAt(desiredLook.current);
  });

  return null;
}
