/**
 * @fileoverview Scene environment map for liquid-metal materials.
 *
 * Loads `/liquid/env-metal.webp` with THREE.TextureLoader (not drei's
 * GainMapLoader) and applies it via `<Environment map={…} />`. Falls
 * back to a procedural jade/mercury equirect if the fetch fails.
 */

"use client";

import { useEffect, useMemo, useState } from "react";
import { Environment } from "@react-three/drei";
import * as THREE from "three";
import {
  LIQUID_ENV_MAP_URL,
  configureEnvTexture,
  createFallbackEnvTexture,
} from "@/lib/three/liquidEnvMap";

type LiquidEnvironmentProps = {
  map: THREE.Texture;
  intensity?: number;
};

/**
 * Loads the liquid equirect once per mount tree. Safe on failure — returns
 * a procedural jade/mercury fallback instead of throwing.
 */
export function useLiquidEnvMap(): THREE.Texture {
  const fallback = useMemo(() => createFallbackEnvTexture(), []);
  const [texture, setTexture] = useState<THREE.Texture>(fallback);

  useEffect(() => {
    let cancelled = false;
    let loaded: THREE.Texture | null = null;
    const loader = new THREE.TextureLoader();

    loader.load(
      LIQUID_ENV_MAP_URL,
      (tex) => {
        if (cancelled) {
          tex.dispose();
          return;
        }
        configureEnvTexture(tex);
        loaded = tex;
        setTexture(tex);
      },
      undefined,
      (error) => {
        if (cancelled) return;
        if (process.env.NODE_ENV === "development") {
          console.warn(
            `[LiquidEnvironment] Failed to load ${LIQUID_ENV_MAP_URL}; using procedural fallback.`,
            error,
          );
        }
        setTexture(fallback);
      },
    );

    return () => {
      cancelled = true;
      loaded?.dispose();
    };
  }, [fallback]);

  return texture;
}

export default function LiquidEnvironment({
  map,
  intensity = 0.7,
}: LiquidEnvironmentProps) {
  return (
    <Environment
      map={map}
      environmentIntensity={intensity}
      background={false}
    />
  );
}
