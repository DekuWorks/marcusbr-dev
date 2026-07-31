"use client";

import { NEURAL_ASSETS, NEURAL_VIDEOS } from "@/lib/neural/higgsfieldAssets";
import { useMotionEnabled } from "@/hooks/useEffectsPreference";

type NeuralAtmosphereProps = {
  className?: string;
  /** `page` = fixed full-site backdrop; `hero` = local hero layer */
  variant?: "page" | "hero";
};

/**
 * Soft Higgsfield atmosphere behind the WebGL neural core.
 * Black blends top→bottom so the page never cuts to a flat block.
 */
export default function NeuralAtmosphere({
  className = "",
  variant = "hero",
}: NeuralAtmosphereProps) {
  const { motionEnabled } = useMotionEnabled();

  return (
    <div
      className={`neural-atmosphere neural-atmosphere--${variant} ${className}`}
      aria-hidden
    >
      {motionEnabled && (
        <video
          className="neural-atmosphere__video"
          src={NEURAL_VIDEOS.idle}
          poster={NEURAL_ASSETS.heroCore}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
        />
      )}
      <div
        className="neural-atmosphere__layer neural-atmosphere__layer--core"
        style={{ backgroundImage: `url(${NEURAL_ASSETS.heroCore})` }}
      />
      <div
        className="neural-atmosphere__layer neural-atmosphere__layer--filaments"
        style={{ backgroundImage: `url(${NEURAL_ASSETS.filaments})` }}
      />
      <div
        className="neural-atmosphere__layer neural-atmosphere__layer--energy"
        style={{ backgroundImage: `url(${NEURAL_ASSETS.energyFlow})` }}
      />
      <div className="neural-atmosphere__shade" />
      <div className="neural-atmosphere__blend" />
    </div>
  );
}
