"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import {
  applyLiquidInteraction,
  createLiquidInteractionState,
  hrefToSectionId,
  liquidStateToCssVars,
  tickLiquidInteraction,
  type LiquidInteractionEvent,
  type LiquidInteractionRefs,
} from "@/lib/liquid/interactionState";
import { useLiquidEffects } from "@/hooks/useEffectsPreference";

type LiquidInteractionContextValue = {
  stateRef: React.MutableRefObject<LiquidInteractionRefs>;
  emit: (event: LiquidInteractionEvent) => void;
  emitSectionFromHref: (href: string) => void;
  tick: (delta: number) => void;
  reactionsEnabled: boolean;
};

const LiquidInteractionContext =
  createContext<LiquidInteractionContextValue | null>(null);

export function LiquidInteractionProvider({ children }: { children: ReactNode }) {
  const stateRef = useRef(createLiquidInteractionState());
  const cssTargetRef = useRef<HTMLElement | null>(null);
  const { effectsOff, effectsReduced } = useLiquidEffects();
  const reactionsEnabled = !effectsOff;

  const intensity = effectsReduced ? 0.55 : 1;

  const emit = useCallback(
    (event: LiquidInteractionEvent) => {
      if (!reactionsEnabled) return;
      applyLiquidInteraction(stateRef.current, event, intensity);
    },
    [intensity, reactionsEnabled],
  );

  const emitSectionFromHref = useCallback(
    (href: string) => {
      const section = hrefToSectionId(href);
      if (section) emit({ type: "sectionChange", section });
    },
    [emit],
  );

  const tick = useCallback((delta: number) => {
    tickLiquidInteraction(stateRef.current, delta);
    const target = cssTargetRef.current;
    if (!target) return;
    const vars = liquidStateToCssVars(stateRef.current);
    for (const [key, value] of Object.entries(vars)) {
      target.style.setProperty(key, value);
    }
  }, []);

  useEffect(() => {
    cssTargetRef.current = document.getElementById("home");
  }, []);

  useEffect(() => {
    if (!reactionsEnabled) return;

    let frameId = 0;
    let lastTime = performance.now();

    const loop = (time: number) => {
      const delta = Math.min(0.05, (time - lastTime) / 1000);
      lastTime = time;
      tick(delta);
      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, [reactionsEnabled, tick]);

  useEffect(() => {
    if (!reactionsEnabled) return;

    const updateScroll = () => {
      const hero = document.getElementById("home");
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, -rect.top / Math.max(rect.height, 1)));
      stateRef.current.scrollProgress = progress;
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, [reactionsEnabled]);

  return (
    <LiquidInteractionContext.Provider
      value={{ stateRef, emit, emitSectionFromHref, tick, reactionsEnabled }}
    >
      {children}
    </LiquidInteractionContext.Provider>
  );
}

export function useLiquidInteraction() {
  const context = useContext(LiquidInteractionContext);
  if (!context) {
    throw new Error(
      "useLiquidInteraction must be used within LiquidInteractionProvider",
    );
  }
  return context;
}

export function useLiquidInteractionEmitter() {
  const context = useContext(LiquidInteractionContext);
  return {
    emit: context?.emit ?? (() => {}),
    emitSectionFromHref: context?.emitSectionFromHref ?? (() => {}),
    reactionsEnabled: context?.reactionsEnabled ?? false,
  };
}
