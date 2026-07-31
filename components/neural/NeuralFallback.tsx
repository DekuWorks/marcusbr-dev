/** CSS fallback when WebGL is unavailable or reduced-motion prefers static. */

import { NEURAL_ASSETS } from "@/lib/neural/higgsfieldAssets";

type NeuralFallbackProps = {
  className?: string;
  variant?: "default" | "loading" | "error";
};

export default function NeuralFallback({
  className = "",
  variant = "default",
}: NeuralFallbackProps) {
  return (
    <div
      className={`neural-fallback ${className}`}
      data-variant={variant}
      aria-hidden
    >
      <div
        className="neural-fallback__photo"
        style={{ backgroundImage: `url(${NEURAL_ASSETS.heroCore})` }}
      />
      <div className="neural-fallback__fog" />
      <div className="neural-fallback__core" />
      <div className="neural-fallback__ring neural-fallback__ring--a" />
      <div className="neural-fallback__ring neural-fallback__ring--b" />
      <div className="neural-fallback__filament neural-fallback__filament--1" />
      <div className="neural-fallback__filament neural-fallback__filament--2" />
      <div className="neural-fallback__filament neural-fallback__filament--3" />
    </div>
  );
}
