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
};

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

export function tickLiquidInteraction(
  state: LiquidInteractionRefs,
  delta: number,
  lerpSpeed = 2.4,
): void {
  const decay = (key: "ripple" | "pulse" | "colorPulse" | "gridBump") => {
    state[key] *= Math.exp(-delta * 3.8);
    if (state[key] < 0.001) state[key] = 0;
  };

  decay("ripple");
  decay("pulse");
  decay("colorPulse");
  decay("gridBump");

  const t = Math.min(1, delta * lerpSpeed);
  state.shiftX += (state.targetShiftX - state.shiftX) * t;
  state.shiftY += (state.targetShiftY - state.shiftY) * t;

  state.targetShiftX *= 1 - t * 0.15;
  state.targetShiftY *= 1 - t * 0.15;
  if (Math.abs(state.targetShiftX) < 0.002) state.targetShiftX = 0;
  if (Math.abs(state.targetShiftY) < 0.002) state.targetShiftY = 0;
}

export function liquidStateToCssVars(state: LiquidInteractionRefs): Record<string, string> {
  return {
    "--liquid-ripple": String(state.ripple),
    "--liquid-pulse": String(state.pulse),
    "--liquid-shift-x": String(state.shiftX),
    "--liquid-shift-y": String(state.shiftY),
    "--liquid-scroll": String(state.scrollProgress),
    "--liquid-color-pulse": String(state.colorPulse),
  };
}
