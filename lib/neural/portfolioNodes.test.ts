import { describe, expect, it } from "vitest";
import {
  getNeuralConnections,
  getPortfolioNeuralNodes,
} from "./portfolioNodes";

describe("portfolioNodes", () => {
  it("includes journey center and featured projects", () => {
    const nodes = getPortfolioNeuralNodes();
    expect(nodes.some((n) => n.id === "journey" && n.kind === "center")).toBe(
      true,
    );
    expect(nodes.some((n) => n.id === "gridlock")).toBe(true);
    expect(nodes.some((n) => n.id === "shuchu")).toBe(true);
    expect(nodes.some((n) => n.id === "rigscout")).toBe(true);
    expect(nodes.some((n) => n.id === "241runners")).toBe(true);
    expect(nodes.every((n) => n.href.length > 0)).toBe(true);
  });

  it("connects satellites to the journey center", () => {
    const edges = getNeuralConnections();
    expect(edges.length).toBeGreaterThan(0);
    expect(edges.every(([from]) => from === "journey")).toBe(true);
  });
});
