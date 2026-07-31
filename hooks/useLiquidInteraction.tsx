/**
 * @fileoverview Global liquid interaction provider.
 *
 * Owns the liquid state ref, document-level pointer listeners, scroll progress,
 * and a requestAnimationFrame loop that writes CSS variables to
 * `#liquid-backdrop` and `:root`. Child components emit events via `emit` or
 * `useLiquidInteractionEmitter` (safe outside the provider tree).
 *
 * @see lib/liquid/interactionState.ts — state machine
 * @see hooks/useEffectsPreference.tsx — intensity gating
 */

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
  computePageScrollProgress,
  createLiquidInteractionState,
  hrefToSectionId,
  liquidStateToCssVars,
  normalizeViewportPointer,
  tickLiquidInteraction,
  type LiquidInteractionEvent,
  type LiquidInteractionRefs,
  type TickLiquidInteractionOptions,
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

/** Provides liquid state, emitters, and the per-frame tick to the component tree. */
export function LiquidInteractionProvider({ children }: { children: ReactNode }) {
  const stateRef = useRef(createLiquidInteractionState());
  const cssTargetRef = useRef<HTMLElement | null>(null);
  const pointerCoarseRef = useRef(false);
  const { effectsOff, effectsReduced } = useLiquidEffects();
  const reactionsEnabled = !effectsOff;

  const intensity = effectsReduced ? 0.55 : 1;
  const tickOptionsRef = useRef<TickLiquidInteractionOptions>({
    pointerStrength: intensity,
    pointerCoarse: false,
  });
  tickOptionsRef.current = {
    pointerStrength: intensity * (pointerCoarseRef.current ? 1.45 : 1),
    pointerCoarse: pointerCoarseRef.current,
  };

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
    tickLiquidInteraction(stateRef.current, delta, tickOptionsRef.current);
    const vars = liquidStateToCssVars(stateRef.current);
    const targets = [
      cssTargetRef.current,
      document.documentElement,
    ].filter((target): target is HTMLElement => Boolean(target));

    for (const target of targets) {
      for (const [key, value] of Object.entries(vars)) {
        target.style.setProperty(key, value);
      }
    }
  }, []);

  useEffect(() => {
    cssTargetRef.current = document.getElementById("liquid-backdrop");
  }, []);

  /* --- Document pointer tracking (batched via rAF) --- */
  useEffect(() => {
    if (!reactionsEnabled) return;

    const coarseMq = window.matchMedia("(pointer: coarse)");
    const syncCoarse = () => {
      pointerCoarseRef.current = coarseMq.matches;
    };
    syncCoarse();
    coarseMq.addEventListener("change", syncCoarse);

    let frameId = 0;
    let pendingX = 0.5;
    let pendingY = 0.5;
    let pendingActive = false;

    const flushPointer = () => {
      frameId = 0;
      const state = stateRef.current;
      state.targetPointerX = pendingX;
      state.targetPointerY = pendingY;
      state.pointerActive = pendingActive;
    };

    const schedulePointerFlush = () => {
      if (frameId) return;
      frameId = requestAnimationFrame(flushPointer);
    };

    const setPointerFromClient = (clientX: number, clientY: number, active: boolean) => {
      const { x, y } = normalizeViewportPointer(
        clientX,
        clientY,
        window.innerWidth,
        window.innerHeight,
      );
      pendingX = x;
      pendingY = y;
      pendingActive = active;
      schedulePointerFlush();
    };

    const onPointerMove = (event: PointerEvent) => {
      if (document.hidden) return;
      setPointerFromClient(event.clientX, event.clientY, true);
    };

    const onPointerDown = (event: PointerEvent) => {
      if (document.hidden) return;
      setPointerFromClient(event.clientX, event.clientY, true);
    };

    const onPointerUp = () => {
      if (pointerCoarseRef.current) {
        pendingActive = false;
        schedulePointerFlush();
      }
    };

    const onPointerLeave = (event: PointerEvent) => {
      if (event.pointerType === "mouse") {
        pendingActive = false;
        schedulePointerFlush();
      }
    };

    const onVisibilityChange = () => {
      if (document.hidden) {
        pendingActive = false;
        schedulePointerFlush();
      }
    };

    const onTouchMove = (event: TouchEvent) => {
      if (document.hidden) return;
      const touch = event.touches[0];
      if (!touch) return;
      setPointerFromClient(touch.clientX, touch.clientY, true);
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("pointerup", onPointerUp, { passive: true });
    document.addEventListener("pointerleave", onPointerLeave, { passive: true });
    document.addEventListener("touchmove", onTouchMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      coarseMq.removeEventListener("change", syncCoarse);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("touchmove", onTouchMove);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [reactionsEnabled]);

  /* --- rAF tick loop: decay impulses and publish CSS vars (sole tick owner) --- */
  useEffect(() => {
    if (!reactionsEnabled) return;

    let frameId = 0;
    let lastTime = performance.now();
    let running = true;

    const loop = (time: number) => {
      if (!running) return;
      if (document.hidden) {
        frameId = requestAnimationFrame(loop);
        return;
      }
      const delta = Math.min(0.05, (time - lastTime) / 1000);
      lastTime = time;
      tick(delta);
      frameId = requestAnimationFrame(loop);
    };

    const onVisibility = () => {
      if (!document.hidden) {
        lastTime = performance.now();
      }
    };

    document.addEventListener("visibilitychange", onVisibility);
    frameId = requestAnimationFrame(loop);
    return () => {
      running = false;
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(frameId);
    };
  }, [reactionsEnabled, tick]);

  /* --- Scroll progress for footer zone and parallax --- */
  useEffect(() => {
    if (!reactionsEnabled) return;

    const updateScroll = () => {
      stateRef.current.scrollProgress = computePageScrollProgress();
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

/** Full liquid context — throws if used outside the provider. */
export function useLiquidInteraction() {
  const context = useContext(LiquidInteractionContext);
  if (!context) {
    throw new Error(
      "useLiquidInteraction must be used within LiquidInteractionProvider",
    );
  }
  return context;
}

/**
 * Safe emitter for components that may render outside the provider (e.g. Navbar).
 * Returns no-op functions when context is absent.
 */
export function useLiquidInteractionEmitter() {
  const context = useContext(LiquidInteractionContext);
  return {
    emit: context?.emit ?? (() => {}),
    emitSectionFromHref: context?.emitSectionFromHref ?? (() => {}),
    reactionsEnabled: context?.reactionsEnabled ?? false,
  };
}
