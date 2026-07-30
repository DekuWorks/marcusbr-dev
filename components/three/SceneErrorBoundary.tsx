"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import SceneFallback from "./SceneFallback";

type SceneErrorBoundaryProps = {
  children: ReactNode;
  label?: string;
};

type SceneErrorBoundaryState = {
  hasError: boolean;
};

export default class SceneErrorBoundary extends Component<
  SceneErrorBoundaryProps,
  SceneErrorBoundaryState
> {
  state: SceneErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): SceneErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    if (process.env.NODE_ENV === "development") {
      console.error(
        `[SceneErrorBoundary${this.props.label ? `: ${this.props.label}` : ""}]`,
        error,
        info,
      );
    }
  }

  render() {
    if (this.state.hasError) {
      return <SceneFallback variant="error" />;
    }

    return this.props.children;
  }
}
