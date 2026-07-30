"use client";

import dynamic from "next/dynamic";
import SceneFallback from "@/components/three/SceneFallback";

const LiquidPageBackground = dynamic(
  () =>
    import("@/components/three/LiquidHeroCanvas").then(
      (mod) => mod.LiquidPageBackground,
    ),
  {
    ssr: false,
    loading: () => <SceneFallback variant="loading" />,
  },
);

export default function LiquidPageBackdrop() {
  return (
    <div
      id="liquid-backdrop"
      className="liquid-interactive liquid-page-backdrop"
      aria-hidden
    >
      <LiquidPageBackground />
    </div>
  );
}
