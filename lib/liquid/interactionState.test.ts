import { describe, expect, it } from "vitest";
import {
  applyLiquidInteraction,
  computePageScrollProgress,
  createLiquidInteractionState,
  footerZoneFromScroll,
  hrefToSectionId,
  normalizeViewportPointer,
  sectionZoneFromIndex,
  tickLiquidInteraction,
  tickLiquidPointer,
} from "./interactionState";

describe("interactionState", () => {
  it("maps hash hrefs to section ids", () => {
    expect(hrefToSectionId("#projects")).toBe("projects");
    expect(hrefToSectionId("#invalid")).toBeNull();
  });

  it("applies section change impulses", () => {
    const state = createLiquidInteractionState();
    applyLiquidInteraction(state, { type: "sectionChange", section: "projects" });
    expect(state.ripple).toBeGreaterThan(0);
    expect(state.activeSectionIndex).toBe(2);
    expect(state.targetShiftX).toBeGreaterThan(0);
  });

  it("decays impulses over time", () => {
    const state = createLiquidInteractionState();
    applyLiquidInteraction(state, { type: "pillSelect", tech: "React" });
    const initial = state.pulse;
    tickLiquidInteraction(state, 0.5);
    expect(state.pulse).toBeLessThan(initial);
  });

  it("normalizes viewport pointer coordinates", () => {
    expect(normalizeViewportPointer(100, 200, 400, 800)).toEqual({
      x: 0.25,
      y: 0.25,
    });
    expect(normalizeViewportPointer(500, 900, 400, 800)).toEqual({
      x: 1,
      y: 1,
    });
  });

  it("smooths pointer toward target when active", () => {
    const state = createLiquidInteractionState();
    state.targetPointerX = 0.9;
    state.targetPointerY = 0.1;
    state.pointerActive = true;
    tickLiquidPointer(state, 0.1);
    expect(state.pointerX).toBeGreaterThan(0.5);
    expect(state.pointerY).toBeLessThan(0.5);
  });

  it("drifts pointer toward center when inactive", () => {
    const state = createLiquidInteractionState();
    state.pointerX = 0.9;
    state.pointerY = 0.1;
    state.targetPointerX = 0.9;
    state.targetPointerY = 0.1;
    state.pointerActive = false;
    tickLiquidPointer(state, 0.2);
    expect(state.pointerX).toBeLessThan(0.9);
    expect(state.pointerY).toBeGreaterThan(0.1);
  });

  it("computes page scroll progress from scroll metrics", () => {
    expect(computePageScrollProgress(0, 1000)).toBe(0);
    expect(computePageScrollProgress(500, 1000)).toBe(0.5);
    expect(computePageScrollProgress(1200, 1000)).toBe(1);
    expect(computePageScrollProgress(100, 0)).toBe(0);
  });

  it("maps section index to zone 0–1", () => {
    expect(sectionZoneFromIndex(0)).toBe(0);
    expect(sectionZoneFromIndex(5)).toBe(1);
    expect(sectionZoneFromIndex(2)).toBeCloseTo(0.4);
  });

  it("ramps footer zone in the last portion of scroll", () => {
    expect(footerZoneFromScroll(0)).toBe(0);
    expect(footerZoneFromScroll(0.72)).toBe(0);
    expect(footerZoneFromScroll(1)).toBe(1);
    expect(footerZoneFromScroll(0.86)).toBeCloseTo(0.5);
  });

  it("applies uiHover and navPulse impulses", () => {
    const hover = createLiquidInteractionState();
    applyLiquidInteraction(hover, { type: "uiHover", source: "skill" });
    expect(hover.ripple).toBeGreaterThan(0);
    expect(hover.pulse).toBeGreaterThan(0);
    expect(hover.targetShiftX).toBeLessThan(0);

    const nav = createLiquidInteractionState();
    applyLiquidInteraction(nav, { type: "navPulse" });
    expect(nav.ripple).toBeGreaterThan(0.3);
    expect(nav.colorPulse).toBeGreaterThan(0);
  });
});
