"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import SceneFallback from "./SceneFallback";

type Props = {
  children: ReactNode;
  onError?: () => void;
};

type State = {
  hasError: boolean;
};

export default class SceneErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.warn("[Marcus OS] Scene error:", error, info);
    this.props.onError?.();
  }

  render() {
    if (this.state.hasError) {
      return <SceneFallback variant="error" />;
    }
    return this.props.children;
  }
}
