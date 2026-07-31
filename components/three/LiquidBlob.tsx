/**
 * @fileoverview Shader-driven liquid-metal icosahedron reacting to interaction state.
 *
 * Chrome/mercury fragment shading samples an equirectangular reflection map
 * (loaded via TextureLoader — see `useLiquidEnvMap`). Vertex displacement
 * keeps pointer, ripple, scroll, and section-zone reactions from the liquid
 * interaction bus.
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

  vec3 displace(vec3 pos, vec3 normal) {
    float wave = sin(pos.x * 2.2 + uTime * 1.55 * uSpeed) * 0.12;
    wave += cos(pos.y * 2.8 - uTime * 1.25 * uSpeed) * 0.105;
    wave += sin(pos.z * 2.0 + uTime * 1.05 * uSpeed) * 0.092;
    float pointer = exp(-length(pos.xy - uPointer * 1.45) * 1.85) * 0.22;
    float ripple = sin(length(pos.xy) * 4.0 - uTime * 3.6) * uRipple * 0.15;
    float pulse = uPulse * 0.095;
    vec2 shifted = pos.xy + uShift * 0.42;
    float scrollWave = sin(shifted.x * 1.8 + uScroll * 6.28) * uScroll * 0.085;
    float zoneWave = sin(shifted.y * 2.4 + uSectionZone * 3.14) * uSectionZone * 0.045;
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
    vFresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 2.8);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uColorPulse;
  uniform float uSectionZone;
  uniform sampler2D uEnvMap;
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPosition;
  varying float vFresnel;

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

    // Slight time swirl so reflections feel alive without breaking metal reads
    float swirl = uTime * 0.04;
    float cs = cos(swirl);
    float sn = sin(swirl);
    reflectDir = vec3(
      reflectDir.x * cs - reflectDir.z * sn,
      reflectDir.y,
      reflectDir.x * sn + reflectDir.z * cs
    );

    vec3 env = texture2D(uEnvMap, equirectUv(normalize(reflectDir))).rgb;
    env = pow(env, vec3(0.92));

    vec3 jadeRim = mix(vec3(0.24, 0.71, 0.54), vec3(0.29, 0.87, 0.60), uSectionZone * 0.45);
    vec3 cyanRim = mix(vec3(0.18, 0.62, 0.58), vec3(0.22, 0.78, 0.72), uSectionZone * 0.3);
    vec3 mercury = vec3(0.58, 0.72, 0.66);

    float fresnel = vFresnel;
    float pulse = sin(uTime * 0.8) * 0.5 + 0.5;
    float NdotV = max(dot(normalize(vNormal), viewDir), 0.0);
    float sharpSpec = pow(1.0 - NdotV, 5.0);

    vec3 color = mercury * env;
    color = mix(color * 0.5, color, 0.68 + fresnel * 0.3);
    color += env * sharpSpec * (0.45 + uColorPulse * 0.18);
    color += jadeRim * fresnel * (0.34 + pulse * 0.12 + uColorPulse * 0.14);
    color += cyanRim * pow(fresnel, 3.2) * (0.12 + uColorPulse * 0.06);

    // Soft highlight streak with jade catch light
    float streak = pow(max(dot(worldNormal, normalize(vec3(0.4, 0.85, 0.35))), 0.0), 48.0);
    color += vec3(0.75, 0.95, 0.85) * streak * (0.32 + uColorPulse * 0.14);

    float alpha = 0.88 + fresnel * 0.1;
    gl_FragColor = vec4(color, alpha);
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
  scale = 1.95,
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
      const t = Math.min(1, delta * 4);
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
      materialRef.current.uniforms.uPointer.value.lerp(pointerVec, 0.1);
      materialRef.current.uniforms.uRipple.value = smooth.ripple;
      materialRef.current.uniforms.uPulse.value = smooth.pulse;
      materialRef.current.uniforms.uColorPulse.value = smooth.colorPulse;
      materialRef.current.uniforms.uShift.value.set(smooth.shiftX, smooth.shiftY);
      materialRef.current.uniforms.uScroll.value = smooth.scroll;
      materialRef.current.uniforms.uSectionZone.value = smooth.sectionZone;
    }
    if (meshRef.current) {
      const scrollTilt = smooth.scroll * 0.48;
      const scrollParallaxY = smooth.scroll * 0.95 - 0.22;
      meshRef.current.rotation.y =
        state.clock.elapsedTime * 0.11 * speed +
        smooth.shiftX * 0.36 +
        pointerX * 0.14 +
        smooth.scroll * 0.32;
      meshRef.current.rotation.x =
        Math.sin(state.clock.elapsedTime * 0.2 * speed) * 0.1 +
        smooth.shiftY * 0.24 -
        scrollTilt +
        pointerY * 0.11;
      meshRef.current.position.x =
        smooth.shiftX * 0.3 + pointerX * 0.22 + smooth.scroll * 0.16;
      meshRef.current.position.y =
        smooth.shiftY * 0.2 + scrollParallaxY + pointerY * 0.15;
    }
  });

  return (
    <mesh ref={meshRef} scale={scale}>
      <icosahedronGeometry
        args={[1.18, Math.max(1, Math.floor(segments / 16))]}
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
