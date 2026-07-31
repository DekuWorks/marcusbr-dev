/**
 * Fixed full-page Higgsfield atmosphere from hero through footer.
 * Keeps `#liquid-backdrop` for interaction CSS vars on :root / emitters.
 */

"use client";

import NeuralAtmosphere from "./NeuralAtmosphere";

export default function NeuralPageBackdrop() {
  return (
    <div
      id="liquid-backdrop"
      className="neural-page-backdrop"
      aria-hidden
    >
      <NeuralAtmosphere variant="page" />
    </div>
  );
}
