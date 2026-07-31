"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type NeuralCoreProps = {
  speed?: number;
  paused?: boolean;
  /** 0–1 surge during cinematic node travel */
  surge?: number;
};

const coreVertex = /* glsl */ `
  uniform float uTime;
  uniform float uSpeed;
  uniform float uSurge;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying float vPulse;
  varying float vRipple;

  void main() {
    float t = uTime * uSpeed;
    float pulse = sin(t * 0.85) * 0.5 + 0.5;
    float surge = uSurge;

    float wave = sin(position.x * 3.4 + t * 1.35) * 0.055;
    wave += cos(position.y * 2.9 - t * 1.05) * 0.048;
    wave += sin(position.z * 2.5 + t * 0.92) * 0.042;
    wave += sin(position.x * 6.2 + position.y * 5.1 - t * 1.8) * 0.018;
    wave += cos(length(position.xy) * 4.0 - t * 1.4) * 0.022;

    float displace = wave + pulse * 0.032 + surge * 0.06;
    vec3 displaced = position + normal * displace;

    vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewPosition = -mvPosition.xyz;
    vPulse = pulse;
    vRipple = wave * 8.0 + surge;
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const coreFragment = /* glsl */ `
  uniform float uTime;
  uniform float uSurge;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying float vPulse;
  varying float vRipple;

  void main() {
    vec3 viewDir = normalize(vViewPosition);
    vec3 n = normalize(vNormal);
    float fresnel = pow(1.0 - max(dot(viewDir, n), 0.0), 2.4);

    vec3 jade = vec3(0.243, 0.706, 0.537);
    vec3 jadeBright = vec3(0.29, 0.87, 0.604);
    vec3 chrome = vec3(0.72, 0.78, 0.8);
    vec3 graphite = vec3(0.06, 0.09, 0.08);

    float metalMix = smoothstep(0.15, 0.85, fresnel);
    vec3 color = mix(graphite, chrome * 0.55, metalMix);
    color = mix(color, chrome * 0.85, pow(fresnel, 1.6) * 0.45);

    float flow = sin(vRipple * 2.2 + uTime * 1.6) * 0.5 + 0.5;
    color += jade * fresnel * (0.42 + vPulse * 0.28 + uSurge * 0.35);
    color += jadeBright * pow(fresnel, 2.8) * (0.28 + flow * 0.18 + uSurge * 0.25);

    float streak = pow(max(dot(n, normalize(vec3(0.25, 0.92, 0.35))), 0.0), 48.0);
    color += vec3(0.9, 0.97, 0.94) * streak * (0.32 + uSurge * 0.2);

    float rim = pow(fresnel, 4.5);
    color += jadeBright * rim * (0.2 + uSurge * 0.35);

    float alpha = 0.86 + fresnel * 0.12 + uSurge * 0.04;
    gl_FragColor = vec4(color, alpha);
  }
`;

export default function NeuralCore({
  speed = 1,
  paused = false,
  surge = 0,
}: NeuralCoreProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const filamentRefs = useRef<THREE.Mesh[]>([]);
  const glowRef = useRef<THREE.Mesh>(null);
  const surgeSmooth = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSpeed: { value: speed },
      uSurge: { value: 0 },
    }),
    [speed],
  );

  const filaments = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2;
        const curve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, 0, 0),
          new THREE.Vector3(
            Math.cos(a) * 0.45,
            Math.sin(a * 1.3) * 0.35,
            Math.sin(a) * 0.45,
          ),
          new THREE.Vector3(
            Math.cos(a + 0.4) * 0.95,
            Math.sin(a * 0.9 + 0.5) * 0.7,
            Math.sin(a + 0.35) * 0.95,
          ),
          new THREE.Vector3(
            Math.cos(a + 0.9) * 1.35,
            Math.sin(a * 0.7 + 1.1) * 0.95,
            Math.sin(a + 0.8) * 1.25,
          ),
        ]);
        return curve;
      }),
    [],
  );

  useFrame((state) => {
    if (paused) return;
    const t = state.clock.elapsedTime;
    surgeSmooth.current += (surge - surgeSmooth.current) * 0.08;

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = t;
      materialRef.current.uniforms.uSpeed.value = speed;
      materialRef.current.uniforms.uSurge.value = surgeSmooth.current;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.12 * speed;
      meshRef.current.rotation.x = Math.sin(t * 0.16 * speed) * 0.12;
      meshRef.current.rotation.z = Math.cos(t * 0.1 * speed) * 0.06;
      const s = 0.78 + Math.sin(t * 0.7 * speed) * 0.02 + surgeSmooth.current * 0.06;
      meshRef.current.scale.setScalar(s);
    }
    if (glowRef.current) {
      const g = 1.12 + Math.sin(t * 0.9 * speed) * 0.04 + surgeSmooth.current * 0.1;
      glowRef.current.scale.setScalar(g);
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.05 + surgeSmooth.current * 0.08;
    }
    filamentRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      mesh.rotation.y = t * (0.08 + i * 0.012) * speed;
      mesh.rotation.z = Math.sin(t * 0.28 + i) * 0.12;
      mesh.rotation.x = Math.cos(t * 0.22 + i * 0.4) * 0.08;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.45 + (i % 3) * 0.1 + surgeSmooth.current * 0.55;
    });
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1, 5]} />
        <shaderMaterial
          ref={materialRef}
          uniforms={uniforms}
          vertexShader={coreVertex}
          fragmentShader={coreFragment}
          transparent
          depthWrite={false}
        />
      </mesh>

      {filaments.map((curve, i) => (
        <mesh
          key={i}
          ref={(el) => {
            if (el) filamentRefs.current[i] = el;
          }}
        >
          <tubeGeometry args={[curve, 64, 0.01 + (i % 3) * 0.004, 8, false]} />
          <meshStandardMaterial
            color="#b8c4ca"
            emissive="#3eb489"
            emissiveIntensity={0.45}
            metalness={0.92}
            roughness={0.18}
            transparent
            opacity={0.78}
          />
        </mesh>
      ))}

      <mesh ref={glowRef}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#4ade9a"
          transparent
          opacity={0.05}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
