export type LiquidSectionId =
  | "home"
  | "about"
  | "projects"
  | "skills"
  | "experience"
  | "contact";

export type LiquidInteractionEvent =
  | { type: "sectionChange"; section: LiquidSectionId }
  | { type: "tabChange"; category: string }
  | { type: "pillSelect"; tech: string }
  | { type: "experienceToggle"; expanded: boolean }
  | { type: "carouselNav"; direction: -1 | 1; source: "projects" | "experience" };

export type LiquidInteractionRefs = {
  ripple: number;
  pulse: number;
  colorPulse: number;
  shiftX: number;
  shiftY: number;
  targetShiftX: number;
  targetShiftY: number;
  scrollProgress: number;
  activeSectionIndex: number;
  gridBump: number;
  /** Smoothed viewport pointer X (0–1). */
  pointerX: number;
  /** Smoothed viewport pointer Y (0–1). */
  pointerY: number;
  /** Raw target from last pointer event (0–1). */
  targetPointerX: number;
  targetPointerY: number;
  /** True while pointer is actively tracked (mouse in viewport or touch down). */
  pointerActive: boolean;
};

export type TickLiquidInteractionOptions = {
  lerpSpeed?: number;
  pointerStrength?: number;
  pointerCoarse?: boolean;
};

export function normalizeViewportPointer(
  clientX: number,
  clientY: number,
  width = 1,
  height = 1,
): { x: number; y: number } {
  return {
    x: width > 0 ? Math.min(1, Math.max(0, clientX / width)) : 0.5,
    y: height > 0 ? Math.min(1, Math.max(0, clientY / height)) : 0.5,
  };
}

export function pointerOffset(state: LiquidInteractionRefs): { x: number; y: number } {
  return {
    x: (state.pointerX - 0.5) * 2,
    y: (state.pointerY - 0.5) * 2,
  };
}

export const SECTION_TARGETS: Record<
  LiquidSectionId,
  { index: number; shiftX: number; shiftY: number }
> = {
  home: { index: 0, shiftX: 0, shiftY: 0 },
  about: { index: 1, shiftX: -0.12, shiftY: 0.06 },
  projects: { index: 2, shiftX: 0.18, shiftY: 0.04 },
  skills: { index: 3, shiftX: -0.08, shiftY: -0.04 },
  experience: { index: 4, shiftX: 0.14, shiftY: -0.06 },
  contact: { index: 5, shiftX: 0, shiftY: -0.1 },
};

export function hrefToSectionId(href: string): LiquidSectionId | null {
  const id = href.replace(/^#/, "") as LiquidSectionId;
  return id in SECTION_TARGETS ? id : null;
}

export function footerZoneFromScroll(scrollProgress: number): number {
  return Math.min(1, Math.max(0, (scrollProgress - 0.72) / 0.28));
}

export function computePageScrollProgress(
  scrollY = typeof window !== "undefined" ? window.scrollY : 0,
  scrollHeight = typeof document !== "undefined"
    ? document.documentElement.scrollHeight -
      (typeof window !== "undefined" ? window.innerHeight : 0)
    : 0,
): number {
  if (scrollHeight <= 0) return 0;
  return Math.min(1, Math.max(0, scrollY / scrollHeight));
}

export function sectionZoneFromIndex(index: number): number {
  return Math.min(1, Math.max(0, index / 5));
}

export function createLiquidInteractionState(): LiquidInteractionRefs {
  return {
    ripple: 0,
    pulse: 0,
    colorPulse: 0,
    shiftX: 0,
    shiftY: 0,
    targetShiftX: 0,
    targetShiftY: 0,
    scrollProgress: 0,
    activeSectionIndex: 0,
    gridBump: 0,
    pointerX: 0.5,
    pointerY: 0.5,
    targetPointerX: 0.5,
    targetPointerY: 0.5,
    pointerActive: false,
  };
}

export function applyLiquidInteraction(
  state: LiquidInteractionRefs,
  event: LiquidInteractionEvent,
  intensity = 1,
): void {
  switch (event.type) {
    case "sectionChange": {
      const target = SECTION_TARGETS[event.section];
      state.activeSectionIndex = target.index;
      state.targetShiftX = target.shiftX;
      state.targetShiftY = target.shiftY;
      state.ripple = Math.min(1, state.ripple + 0.32 * intensity);
      state.pulse = Math.min(1, state.pulse + 0.22 * intensity);
      state.colorPulse = Math.min(1, state.colorPulse + 0.18 * intensity);
      state.gridBump = Math.min(1, state.gridBump + 0.2 * intensity);
      break;
    }
    case "tabChange":
      state.pulse = Math.min(1, state.pulse + 0.18 * intensity);
      state.colorPulse = Math.min(1, state.colorPulse + 0.12 * intensity);
      state.targetShiftX += 0.06 * intensity;
      break;
    case "pillSelect":
      state.pulse = Math.min(1, state.pulse + 0.1 * intensity);
      state.ripple = Math.min(1, state.ripple + 0.08 * intensity);
      break;
    case "experienceToggle":
      state.ripple = Math.min(1, state.ripple + 0.16 * intensity);
      state.pulse = Math.min(1, state.pulse + 0.14 * intensity);
      state.targetShiftY += event.expanded ? -0.05 : 0.05;
      break;
    case "carouselNav":
      state.ripple = Math.min(1, state.ripple + 0.14 * intensity);
      state.targetShiftX += event.direction * 0.08 * intensity;
      state.gridBump = Math.min(1, state.gridBump + 0.12 * intensity);
      break;
  }
}

export function tickLiquidPointer(
  state: LiquidInteractionRefs,
  delta: number,
  options: TickLiquidInteractionOptions = {},
): void {
  const { pointerStrength = 1, pointerCoarse = false } = options;
  if (pointerStrength <= 0) return;

  if (!state.pointerActive) {
    const centerT = Math.min(1, delta * 0.65);
    state.targetPointerX += (0.5 - state.targetPointerX) * centerT;
    state.targetPointerY += (0.5 - state.targetPointerY) * centerT;
  }

  const activeLerp = pointerCoarse ? 3.6 : 5.2;
  const idleLerp = pointerCoarse ? 2.0 : 2.4;
  const lerpRate = state.pointerActive ? activeLerp : idleLerp;
  const t = Math.min(1, delta * lerpRate * pointerStrength);

  state.pointerX += (state.targetPointerX - state.pointerX) * t;
  state.pointerY += (state.targetPointerY - state.pointerY) * t;
}

export function tickLiquidInteraction(
  state: LiquidInteractionRefs,
  delta: number,
  options: TickLiquidInteractionOptions = {},
): void {
  const lerpSpeed = options.lerpSpeed ?? 2.4;

  const decay = (key: "ripple" | "pulse" | "colorPulse" | "gridBump") => {
    state[key] *= Math.exp(-delta * 3.8);
    if (state[key] < 0.001) state[key] = 0;
  };

  decay("ripple");
  decay("pulse");
  decay("colorPulse");
  decay("gridBump");

  tickLiquidPointer(state, delta, options);

  const t = Math.min(1, delta * lerpSpeed);
  state.shiftX += (state.targetShiftX - state.shiftX) * t;
  state.shiftY += (state.targetShiftY - state.shiftY) * t;

  state.targetShiftX *= 1 - t * 0.15;
  state.targetShiftY *= 1 - t * 0.15;
  if (Math.abs(state.targetShiftX) < 0.002) state.targetShiftX = 0;
  if (Math.abs(state.targetShiftY) < 0.002) state.targetShiftY = 0;
}

export function liquidStateToCssVars(state: LiquidInteractionRefs): Record<string, string> {
  const { x: pointerX, y: pointerY } = pointerOffset(state);
  const sectionZone = sectionZoneFromIndex(state.activeSectionIndex);
  const footerZone = footerZoneFromScroll(state.scrollProgress);
  return {
    "--liquid-ripple": String(state.ripple),
    "--liquid-pulse": String(state.pulse),
    "--liquid-shift-x": String(state.shiftX),
    "--liquid-shift-y": String(state.shiftY),
    "--liquid-scroll": String(state.scrollProgress),
    "--liquid-scroll-progress": String(state.scrollProgress),
    "--liquid-section-zone": String(sectionZone),
    "--liquid-footer-zone": String(footerZone),
    "--liquid-color-pulse": String(state.colorPulse),
    "--liquid-pointer-x": String(pointerX),
    "--liquid-pointer-y": String(pointerY),
  };
}
