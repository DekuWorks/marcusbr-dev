/**
 * Cinematic neural interface hero layer:
 * liquid-metal WebGL core + tabs + Higgsfield travel transitions.
 */

"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useWebGLSupport } from "@/hooks/useWebGLSupport";
import {
  useLiquidEffects,
  useMotionEnabled,
} from "@/hooks/useEffectsPreference";
import {
  getPortfolioNeuralNodes,
  type PortfolioNeuralNode,
} from "@/lib/neural/portfolioNodes";
import type { NeuralTransitionKind } from "@/lib/neural/higgsfieldAssets";
import { scrollToSection } from "@/lib/scrollToSection";
import SceneErrorBoundary from "@/components/three/SceneErrorBoundary";
import NeuralFallback from "./NeuralFallback";
import NeuralLabels from "./NeuralLabels";
import NeuralTransitionOverlay from "./NeuralTransitionOverlay";

const NeuralScene = dynamic(() => import("./NeuralScene"), {
  ssr: false,
  loading: () => <NeuralFallback variant="loading" />,
});

const NODE_RADIUS = 1.65;

function nodeWorldPosition(
  node: PortfolioNeuralNode,
): [number, number, number] {
  if (node.kind === "center") return [0, 0, 0];
  const len = Math.hypot(...node.position) || 1;
  return [
    (node.position[0] / len) * NODE_RADIUS,
    (node.position[1] / len) * NODE_RADIUS,
    (node.position[2] / len) * NODE_RADIUS,
  ];
}

function transitionKindFor(node: PortfolioNeuralNode): NeuralTransitionKind {
  if (node.id === "journey") return "journey";
  return "select";
}

type NeuralHeroBackdropProps = {
  className?: string;
};

export default function NeuralHeroBackdrop({
  className = "",
}: NeuralHeroBackdropProps) {
  const { webglSupported, webglChecked } = useWebGLSupport();
  const { showWebGL, hydrated, effectsReduced } = useLiquidEffects();
  const { motionEnabled } = useMotionEnabled();
  const nodes = useMemo(() => getPortfolioNeuralNodes(), []);
  const [hovered, setHovered] = useState<PortfolioNeuralNode | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [travel, setTravel] = useState(0);
  const [focusTarget, setFocusTarget] = useState<
    [number, number, number] | null
  >(null);
  const [transition, setTransition] = useState<{
    kind: NeuralTransitionKind;
    label: string;
    href: string;
  } | null>(null);

  // Ease travel progress while a cinematic transition is active
  useEffect(() => {
    if (!transition) {
      setTravel(0);
      return;
    }
    if (!motionEnabled) {
      setTravel(1);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 1600;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      setTravel(p);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [transition, motionEnabled]);

  const finishTransition = useCallback(() => {
    if (!transition) return;
    const { href } = transition;
    setTransition(null);
    setFocusTarget(null);
    setTravel(0);
    if (href.startsWith("#")) {
      scrollToSection(href, motionEnabled);
      window.history.pushState(null, "", href);
      return;
    }
    window.location.href = href;
  }, [transition, motionEnabled]);

  const activateNode = useCallback((node: PortfolioNeuralNode) => {
    if (transition) return;
    setSelectedId(node.id);
    setFocusTarget(nodeWorldPosition(node));
    setTransition({
      kind: transitionKindFor(node),
      label: node.label,
      href: node.href,
    });
  }, [transition]);

  if (!hydrated || !webglChecked) {
    return (
      <div className={`neural-hero-backdrop ${className}`}>
        <NeuralFallback variant="loading" />
      </div>
    );
  }

  const useCanvas = showWebGL && webglSupported && !effectsReduced;

  return (
    <div className={`neural-hero-backdrop ${className}`}>
      {useCanvas ? (
        <SceneErrorBoundary label="NeuralHero">
          <NeuralScene
            selectedId={selectedId}
            focusTarget={focusTarget}
            travel={travel}
            onNodeHover={setHovered}
            onNodeSelect={activateNode}
          />
        </SceneErrorBoundary>
      ) : (
        <NeuralFallback />
      )}

      <NeuralTransitionOverlay
        kind={transition?.kind ?? null}
        label={transition?.label}
        onComplete={finishTransition}
        durationMs={motionEnabled ? 1800 : 120}
      />

      {(hovered || selectedId) && !transition && (
        <div className="neural-hover-card" role="status">
          <p className="neural-hover-card__label">
            {hovered?.label ??
              nodes.find((n) => n.id === selectedId)?.label ??
              "Selected"}
          </p>
          {(hovered?.synopsis ||
            nodes.find((n) => n.id === selectedId)?.synopsis) && (
            <p className="neural-hover-card__synopsis">
              {hovered?.synopsis ??
                nodes.find((n) => n.id === selectedId)?.synopsis}
            </p>
          )}
        </div>
      )}

      <NeuralLabels
        nodes={nodes}
        hoveredId={hovered?.id ?? null}
        selectedId={selectedId}
        onActivate={activateNode}
        disabled={Boolean(transition)}
      />
    </div>
  );
}
