/**
 * @fileoverview Legacy liquid canvas entry — redirected to the single
 * cinematic WebGL path so callers cannot mount a second R3F context.
 *
 * Prefer `CinematicBackground` / `CinematicOrbCanvas` directly.
 */

"use client";

export { default } from "@/components/cinematic/CinematicOrbCanvas";

/** @deprecated Use CinematicBackground — single page atmosphere + liquid. */
export { default as LiquidPageBackground } from "@/components/cinematic/CinematicBackground";

/** @deprecated Use LiquidPageBackground / CinematicBackground */
export { default as LiquidHeroBackground } from "@/components/cinematic/CinematicBackground";
