import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  isScrollSpyPaused,
  pauseScrollSpy,
  SCROLL_SPY_PAUSE_MS,
} from "@/lib/scrollToSection";

describe("scroll spy pause", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-01-01T00:00:00.000Z"));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("is not paused by default", () => {
    expect(isScrollSpyPaused()).toBe(false);
  });

  it("pauses scroll spy for the default duration", () => {
    pauseScrollSpy();
    expect(isScrollSpyPaused()).toBe(true);

    vi.advanceTimersByTime(SCROLL_SPY_PAUSE_MS - 1);
    expect(isScrollSpyPaused()).toBe(true);

    vi.advanceTimersByTime(1);
    expect(isScrollSpyPaused()).toBe(false);
  });

  it("extends pause when called again", () => {
    pauseScrollSpy(500);
    vi.advanceTimersByTime(400);
    pauseScrollSpy(500);

    vi.advanceTimersByTime(400);
    expect(isScrollSpyPaused()).toBe(true);

    vi.advanceTimersByTime(100);
    expect(isScrollSpyPaused()).toBe(false);
  });
});
