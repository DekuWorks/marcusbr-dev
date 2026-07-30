import { describe, expect, it } from "vitest";
import {
  applyLiquidInteraction,
  createLiquidInteractionState,
  hrefToSectionId,
  normalizeViewportPointer,
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
});
