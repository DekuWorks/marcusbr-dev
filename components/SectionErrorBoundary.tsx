"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";

type SectionErrorBoundaryProps = {
  children: ReactNode;
  sectionLabel?: string;
};

type SectionErrorBoundaryState = {
  hasError: boolean;
};

export default class SectionErrorBoundary extends Component<
  SectionErrorBoundaryProps,
  SectionErrorBoundaryState
> {
  state: SectionErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): SectionErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error(
      `Section failed to load${this.props.sectionLabel ? `: ${this.props.sectionLabel}` : ""}`,
      error,
      errorInfo,
    );
  }

  render() {
    if (this.state.hasError) {
      return (
        <section
          className="w-full px-4 py-20 sm:px-6 sm:py-24"
          role="alert"
          aria-live="polite"
        >
          <div className="mx-auto max-w-6xl">
            <div className="rounded-xl border border-jade-border bg-card/50 px-6 py-10 text-center">
              <p className="text-sm text-muted">
                {this.props.sectionLabel
                  ? `The ${this.props.sectionLabel} section couldn't load.`
                  : "This section couldn't load."}{" "}
                Refresh the page to try again.
              </p>
            </div>
          </div>
        </section>
      );
    }

    return this.props.children;
  }
}
