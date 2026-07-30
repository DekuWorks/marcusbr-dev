import { describe, expect, it } from "vitest";
import {
  applyLiquidInteraction,
  createLiquidInteractionState,
  hrefToSectionId,
  tickLiquidInteraction,
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
});
