/**
 * Higgsfield cinematic transitions — prefers short WebM loops, falls back to still crossfade.
 */

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  transitionPoster,
  transitionStills,
  transitionVideo,
  type NeuralTransitionKind,
} from "@/lib/neural/higgsfieldAssets";
import { useMotionEnabled } from "@/hooks/useEffectsPreference";

type NeuralTransitionOverlayProps = {
  kind: NeuralTransitionKind | null;
  label?: string;
  onComplete?: () => void;
  durationMs?: number;
};

export default function NeuralTransitionOverlay({
  kind,
  label,
  onComplete,
  durationMs = 1800,
}: NeuralTransitionOverlayProps) {
  const { motionEnabled } = useMotionEnabled();
  const videoSrc = kind ? transitionVideo(kind) : null;
  const frames = useMemo(
    () => (kind ? transitionStills(kind) : []),
    [kind],
  );
  const [frame, setFrame] = useState(0);
  const [useVideo, setUseVideo] = useState(Boolean(videoSrc));
  const completedRef = useRef(false);

  useEffect(() => {
    completedRef.current = false;
    setFrame(0);
    setUseVideo(Boolean(videoSrc) && motionEnabled);
  }, [kind, videoSrc, motionEnabled]);

  useEffect(() => {
    if (!kind || frames.length === 0) return;
    if (useVideo) return;

    if (!motionEnabled) {
      const t = window.setTimeout(() => {
        if (!completedRef.current) {
          completedRef.current = true;
          onComplete?.();
        }
      }, 120);
      return () => window.clearTimeout(t);
    }

    const step = Math.max(220, Math.floor(durationMs / frames.length));
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      if (i >= frames.length) {
        window.clearInterval(id);
        if (!completedRef.current) {
          completedRef.current = true;
          onComplete?.();
        }
        return;
      }
      setFrame(i);
    }, step);
    return () => window.clearInterval(id);
  }, [kind, frames, durationMs, motionEnabled, onComplete, useVideo]);

  const finish = () => {
    if (completedRef.current) return;
    completedRef.current = true;
    onComplete?.();
  };

  const show = Boolean(kind && (useVideo ? videoSrc : frames[frame]));
  const poster = kind ? transitionPoster(kind) : undefined;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key={kind ?? "none"}
          className="neural-transition-overlay"
          initial={motionEnabled ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: motionEnabled ? 0.28 : 0 }}
          aria-hidden={!label}
          role={label ? "status" : undefined}
          aria-label={label}
        >
          {useVideo && videoSrc ? (
            <video
              key={videoSrc}
              className="neural-transition-overlay__video"
              src={videoSrc}
              poster={poster}
              autoPlay
              muted
              playsInline
              preload="auto"
              onEnded={finish}
              onError={() => setUseVideo(false)}
            />
          ) : (
            <div
              className="neural-transition-overlay__image"
              style={{ backgroundImage: `url(${frames[frame]})` }}
            />
          )}
          <div className="neural-transition-overlay__veil" />
          {label && (
            <p className="neural-transition-overlay__label">{label}</p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
