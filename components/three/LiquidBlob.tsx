"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSpeed;
  uniform vec2 uPointer;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying float vFresnel;

  vec3 displace(vec3 pos, vec3 normal) {
    float wave = sin(pos.x * 2.2 + uTime * 1.4 * uSpeed) * 0.08;
    wave += cos(pos.y * 2.8 - uTime * 1.1 * uSpeed) * 0.07;
    wave += sin(pos.z * 2.0 + uTime * 0.9 * uSpeed) * 0.06;
    float pointer = exp(-length(pos.xy - uPointer * 1.2) * 2.2) * 0.12;
    return pos + normal * (wave + pointer);
  }

  void main() {
    vec3 displaced = displace(position, normal);
    vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewPosition = -mvPosition.xyz;
    vec3 viewDir = normalize(vViewPosition);
    vFresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 2.5);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying float vFresnel;

  void main() {
    vec3 jade = vec3(0.243, 0.706, 0.537);
    vec3 jadeBright = vec3(0.29, 0.87, 0.60);
    vec3 cyan = vec3(0.22, 0.78, 0.72);
    vec3 base = vec3(0.04, 0.07, 0.06);

    vec3 viewDir = normalize(vViewPosition);
    float fresnel = vFresnel;
    float pulse = sin(uTime * 0.8) * 0.5 + 0.5;

    vec3 color = mix(base, jade * 0.35, fresnel * 0.85);
    color += jadeBright * fresnel * (0.35 + pulse * 0.15);
    color += cyan * pow(fresnel, 3.0) * 0.2;

    float alpha = 0.72 + fresnel * 0.22;
    gl_FragColor = vec4(color, alpha);
  }
`;

type LiquidBlobProps = {
  segments?: number;
  speed?: number;
  paused?: boolean;
};

export default function LiquidBlob({
  segments = 64,
  speed = 1,
  paused = false,
}: LiquidBlobProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { pointer } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSpeed: { value: speed },
      uPointer: { value: new THREE.Vector2(0, 0) },
    }),
    [speed],
  );

  useFrame((state) => {
    if (!materialRef.current) return;
    if (!paused) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      materialRef.current.uniforms.uPointer.value.lerp(pointer, 0.08);
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.08 * speed;
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.15 * speed) * 0.08;
    }
  });

  return (
    <mesh ref={meshRef} scale={1.35}>
      <icosahedronGeometry args={[1.1, Math.max(1, Math.floor(segments / 16))]} />
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}
