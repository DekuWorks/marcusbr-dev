"use client";

import type { PortfolioNeuralNode } from "@/lib/neural/portfolioNodes";

type NeuralLabelsProps = {
  nodes: PortfolioNeuralNode[];
  hoveredId?: string | null;
  selectedId?: string | null;
  onActivate: (node: PortfolioNeuralNode) => void;
  disabled?: boolean;
};

/**
 * Accessible HTML tabs mirroring 3D nodes.
 * Critical nav never lives only inside WebGL.
 */
export default function NeuralLabels({
  nodes,
  hoveredId = null,
  selectedId = null,
  onActivate,
  disabled = false,
}: NeuralLabelsProps) {
  const actionable = nodes.filter(
    (n) => n.kind !== "center" || n.id === "journey",
  );

  return (
    <nav className="neural-labels" aria-label="Neural interface destinations">
      <p className="sr-only">
        Select a destination. A cinematic transition plays, then the page
        travels to that section or project.
      </p>
      <ul className="neural-labels__list">
        {actionable.map((node) => {
          const active = node.id === hoveredId || node.id === selectedId;
          return (
            <li key={node.id}>
              <button
                type="button"
                className={`neural-labels__btn ${active ? "is-active" : ""}`}
                onClick={() => onActivate(node)}
                disabled={disabled}
                aria-current={node.id === selectedId ? "true" : undefined}
                aria-label={`${node.label}. ${node.synopsis ?? ""}`}
              >
                <span className="neural-labels__dot" aria-hidden />
                {node.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
