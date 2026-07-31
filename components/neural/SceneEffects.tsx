"use client";

import { EffectComposer, Bloom } from "@react-three/postprocessing";

type SceneEffectsProps = {
  enabled?: boolean;
};

export default function SceneEffects({ enabled = true }: SceneEffectsProps) {
  if (!enabled) return null;

  return (
    <EffectComposer multisampling={0}>
      <Bloom
        intensity={0.42}
        luminanceThreshold={0.48}
        luminanceSmoothing={0.7}
        mipmapBlur
      />
    </EffectComposer>
  );
}
