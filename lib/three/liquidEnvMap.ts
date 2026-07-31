/**
 * Equirectangular chrome studio map for liquid-metal reflections.
 *
 * Important: do NOT pass this `.webp` to drei `<Environment files=… />`.
 * drei routes `.webp` through GainMapLoader (UltraHDR), which fetches
 * sidecar paths like `/i/` and 404s for a plain equirect texture.
 * Load with THREE.TextureLoader and pass `map={texture}` instead.
 */

import * as THREE from "three";

export const LIQUID_ENV_MAP_URL = "/liquid/env-metal.webp";

/** Jade/mercury procedural equirect used when the asset fails to load. */
export function createFallbackEnvTexture(): THREE.DataTexture {
  const size = 64;
  const data = new Uint8Array(size * size * 4);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;
      const u = x / size;
      const v = y / size;
      const highlight = Math.pow(Math.max(0, Math.sin(u * Math.PI * 2) * 0.5 + 0.5), 3);
      data[i] = Math.floor(36 + v * 70 + highlight * 90);
      data[i + 1] = Math.floor(110 + v * 90 + highlight * 70);
      data[i + 2] = Math.floor(88 + v * 60 + highlight * 50);
      data[i + 3] = 255;
    }
  }

  const texture = new THREE.DataTexture(data, size, size, THREE.RGBAFormat);
  configureEnvTexture(texture);
  return texture;
}

export function configureEnvTexture(texture: THREE.Texture): THREE.Texture {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
  return texture;
}
