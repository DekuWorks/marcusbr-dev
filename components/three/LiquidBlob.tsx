/**
 * @fileoverview Shader-driven jade liquid-lava metal blob.
 *
 * Chrome/mercury body with molten jade emissive veins. Viscous deformation,
 * strong pointer impulse, scroll/section zone parallax via interaction bus.
 */

"use client";

import { useEffect, useMemo, useRef, type MutableRefObject } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { LiquidInteractionRefs } from "@/lib/liquid/interactionState";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSpeed;
  uniform vec2 uPointer;
  uniform float uRipple;
  uniform float uPulse;
  uniform vec2 uShift;
  uniform float uScroll;
  uniform float uSectionZone;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  varying float vFresnel;
  varying float vLava;

  vec3 displace(vec3 pos, vec3 normal) {
    // Slow viscous molten flow
    float wave = sin(pos.x * 1.45 + uTime * 0.72 * uSpeed) * 0.155;
    wave += cos(pos.y * 1.85 - uTime * 0.58 * uSpeed) * 0.135;
    wave += sin(pos.z * 1.35 + uTime * 0.48 * uSpeed) * 0.118;
    wave += sin(pos.x * 0.7 + pos.y * 0.9 + uTime * 0.32 * uSpeed) * 0.08;

    float pointerDist = length(pos.xy - uPointer * 1.65);
    float pointer = exp(-pointerDist * 1.35) * (0.42 + uRipple * 0.28 + uPulse * 0.12);
    float ripple = sin(length(pos.xy) * 3.2 - uTime * 2.4) * uRipple * 0.22;
    float pulse = uPulse * 0.14;
    vec2 shifted = pos.xy + uShift * 0.55;
    float scrollWave = sin(shifted.x * 1.5 + uScroll * 6.28) * uScroll * 0.12;
    float zoneWave = sin(shifted.y * 2.0 + uSectionZone * 3.14) * uSectionZone * 0.065;
    return pos + normal * (wave + pointer + ripple + pulse + scrollWave + zoneWave);
  }

  void main() {
    vec3 displaced = displace(position, normal);
    vec4 worldPosition = modelMatrix * vec4(displaced, 1.0);
    vec4 mvPosition = viewMatrix * worldPosition;
    vNormal = normalize(normalMatrix * normal);
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vWorldPosition = worldPosition.xyz;
    vViewPosition = -mvPosition.xyz;
    vec3 viewDir = normalize(vViewPosition);
    vFresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 2.6);

    // Lava vein field for fragment (world-space flow)
    float vein = sin(displaced.x * 2.8 + displaced.y * 2.1 + uTime * 0.55 * uSpeed);
    vein *= cos(displaced.z * 2.4 - displaced.y * 1.3 - uTime * 0.38 * uSpeed);
    vLava = smoothstep(0.2, 0.85, vein * 0.5 + 0.5);

    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uColorPulse;
  uniform float uSectionZone;
  uniform float uRipple;
  uniform float uPulse;
  uniform sampler2D uEnvMap;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  varying float vFresnel;
  varying float vLava;

  const float PI = 3.14159265359;

  vec2 equirectUv(vec3 dir) {
    float u = atan(dir.z, dir.x) / (2.0 * PI) + 0.5;
    float v = asin(clamp(dir.y, -1.0, 1.0)) / PI + 0.5;
    return vec2(u, v);
  }

  void main() {
    vec3 viewDir = normalize(vViewPosition);
    vec3 worldNormal = normalize(vWorldNormal);
    vec3 worldViewDir = normalize(cameraPosition - vWorldPosition);
    vec3 reflectDir = reflect(-worldViewDir, worldNormal);

    float swirl = uTime * 0.028;
    float cs = cos(swirl);
    float sn = sin(swirl);
    reflectDir = vec3(
      reflectDir.x * cs - reflectDir.z * sn,
      reflectDir.y,
      reflectDir.x * sn + reflectDir.z * cs
    );

    vec3 env = texture2D(uEnvMap, equirectUv(normalize(reflectDir))).rgb;
    env = pow(env, vec3(0.9));

    // Brand jade (#3eb489 / #4ade9a) molten lava tones
    vec3 jadeDeep = vec3(0.12, 0.42, 0.32);
    vec3 jadeRim = mix(vec3(0.24, 0.71, 0.54), vec3(0.29, 0.87, 0.60), uSectionZone * 0.5);
    vec3 lavaHot = vec3(0.35, 0.95, 0.68);
    vec3 mercury = vec3(0.62, 0.74, 0.70);

    float fresnel = vFresnel;
    float pulse = sin(uTime * 0.55) * 0.5 + 0.5;
    float NdotV = max(dot(normalize(vNormal), viewDir), 0.0);
    float sharpSpec = pow(1.0 - NdotV, 4.8);

    // Chrome body
    vec3 color = mercury * env;
    color = mix(color * 0.42, color, 0.62 + fresnel * 0.32);
    color += env * sharpSpec * (0.52 + uColorPulse * 0.22);

    // Molten jade lava veins flowing through metal
    float lava = vLava * (0.75 + uRipple * 0.35 + uPulse * 0.25 + uColorPulse * 0.2);
    color = mix(color, mix(jadeDeep, jadeRim, pulse), lava * 0.55);
    color += lavaHot * lava * (0.22 + pulse * 0.1 + uColorPulse * 0.18);
    color += jadeRim * fresnel * (0.38 + pulse * 0.14 + uColorPulse * 0.16);
    color += jadeDeep * pow(fresnel, 2.4) * (0.18 + uSectionZone * 0.08);

    float streak = pow(max(dot(worldNormal, normalize(vec3(0.35, 0.88, 0.32))), 0.0), 42.0);
    color += vec3(0.78, 0.98, 0.88) * streak * (0.38 + uColorPulse * 0.16 + lava * 0.12);

    // Soft emissive core so blob reads as molten, not flat chrome
    color += jadeRim * (0.06 + lava * 0.1) * (0.8 + uPulse * 0.3);

    float alpha = 0.78 + fresnel * 0.14 + lava * 0.06;
    gl_FragColor = vec4(color, clamp(alpha, 0.0, 0.94));
  }
`;

type LiquidBlobProps = {
  segments?: number;
  speed?: number;
  scale?: number;
  paused?: boolean;
  interactionRef?: MutableRefObject<LiquidInteractionRefs>;
  /** Equirect reflection map from `useLiquidEnvMap` (asset or fallback). */
  envMap: THREE.Texture;
};

export default function LiquidBlob({
  segments = 64,
  speed = 1,
  scale = 2.55,
  paused = false,
  interactionRef,
  envMap,
}: LiquidBlobProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const smoothInteraction = useRef({
    ripple: 0,
    pulse: 0,
    colorPulse: 0,
    shiftX: 0,
    shiftY: 0,
    scroll: 0,
    sectionZone: 0,
    pointerX: 0.5,
    pointerY: 0.5,
  });
  const pointerVec = useMemo(() => new THREE.Vector2(0, 0), []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSpeed: { value: speed },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uRipple: { value: 0 },
      uPulse: { value: 0 },
      uShift: { value: new THREE.Vector2(0, 0) },
      uScroll: { value: 0 },
      uSectionZone: { value: 0 },
      uColorPulse: { value: 0 },
      uEnvMap: { value: envMap },
    }),
    [speed, envMap],
  );

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uEnvMap.value = envMap;
    }
  }, [envMap]);

  useFrame((state, delta) => {
    if (!materialRef.current) return;
    const smooth = smoothInteraction.current;
    const interaction = interactionRef?.current;

    if (interaction) {
      const t = Math.min(1, delta * 5.2);
      smooth.ripple += (interaction.ripple - smooth.ripple) * t;
      smooth.pulse += (interaction.pulse - smooth.pulse) * t;
      smooth.colorPulse += (interaction.colorPulse - smooth.colorPulse) * t;
      smooth.shiftX += (interaction.shiftX - smooth.shiftX) * t;
      smooth.shiftY += (interaction.shiftY - smooth.shiftY) * t;
      smooth.scroll += (interaction.scrollProgress - smooth.scroll) * t;
      const zone = interaction.activeSectionIndex / 5;
      smooth.sectionZone += (zone - smooth.sectionZone) * t;
      smooth.pointerX += (interaction.pointerX - smooth.pointerX) * t;
      smooth.pointerY += (interaction.pointerY - smooth.pointerY) * t;
    }

    const pointerX = (smooth.pointerX - 0.5) * 2;
    const pointerY = (smooth.pointerY - 0.5) * 2;

    if (!paused) {
      materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
      pointerVec.set(pointerX, pointerY);
      materialRef.current.uniforms.uPointer.value.lerp(pointerVec, 0.14);
      materialRef.current.uniforms.uRipple.value = smooth.ripple;
      materialRef.current.uniforms.uPulse.value = smooth.pulse;
      materialRef.current.uniforms.uColorPulse.value = smooth.colorPulse;
      materialRef.current.uniforms.uShift.value.set(smooth.shiftX, smooth.shiftY);
      materialRef.current.uniforms.uScroll.value = smooth.scroll;
      materialRef.current.uniforms.uSectionZone.value = smooth.sectionZone;
    }
    if (meshRef.current) {
      const scrollTilt = smooth.scroll * 0.55;
      const scrollParallaxY = smooth.scroll * 1.05 - 0.18;
      meshRef.current.rotation.y =
        state.clock.elapsedTime * 0.07 * speed +
        smooth.shiftX * 0.42 +
        pointerX * 0.22 +
        smooth.scroll * 0.38;
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.14 * speed) * 0.12 +
        smooth.shiftY * 0.28 -
        scrollTilt +
        pointerY * 0.16;
      // Local drift only — page bias is handled by the cinematic group
      meshRef.current.position.x =
        smooth.shiftX * 0.28 + pointerX * 0.24 + smooth.scroll * 0.12;
      meshRef.current.position.y =
        smooth.shiftY * 0.22 + scrollParallaxY * 0.35 + pointerY * 0.16;
      const breathe = 1 + smooth.pulse * 0.06 + smooth.ripple * 0.04;
      meshRef.current.scale.setScalar(scale * breathe);
    }
  });

  return (
    <mesh ref={meshRef} scale={scale}>
      <icosahedronGeometry
        args={[1.28, Math.max(1, Math.floor(segments / 14))]}
      />
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
