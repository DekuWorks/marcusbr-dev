"use client";

import { useEffect, useState } from "react";

function detectWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    return Boolean(gl);
  } catch {
    return false;
  }
}

export function useWebGLSupport() {
  const [supported, setSupported] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setSupported(detectWebGL());
    setChecked(true);
  }, []);

  return { webglSupported: supported, webglChecked: checked };
}
