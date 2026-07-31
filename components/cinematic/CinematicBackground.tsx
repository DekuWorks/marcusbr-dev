"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { CINEMATIC_ASSETS } from "@/lib/cinematic/assets";
import { useMotionEnabled } from "@/hooks/useEffectsPreference";
import SceneFallback from "@/components/three/SceneFallback";

const CinematicOrbLayer = dynamic(
  () => import("@/components/cinematic/CinematicOrbCanvas"),
  { ssr: false },
);

/**
 * Fixed full-page atmosphere: Higgsfield cinematic layers + interactive
 * WebGL jade liquid-lava metal (single context). `#liquid-backdrop` receives
 * interaction CSS vars. Liquid sits behind vignette/content — never over text.
 *
 * Mobile / reduced-motion: stills + light CSS molten only (no video, no WebGL).
 * Once WebGL is ready, CSS molten is unmounted so it cannot fight the canvas.
 */
export default function CinematicBackground() {
  const { motionEnabled } = useMotionEnabled();
  const [videoReady, setVideoReady] = useState(false);
  const [allowVideo, setAllowVideo] = useState(false);
  const [webglReady, setWebglReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const onWebglReady = useCallback(() => {
    setWebglReady(true);
  }, []);

  useEffect(() => {
    if (!motionEnabled) {
      setAllowVideo(false);
      setWebglReady(false);
      return;
    }
    // Desktop fine-pointer only — avoid video + WebGL stack on phones/tablets
    const mq = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const update = () => setAllowVideo(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [motionEnabled]);

  // Pause ambience when the tab is hidden to save decode/composite cost
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !allowVideo) return;

    const sync = () => {
      if (document.hidden) {
        video.pause();
      } else if (video.paused) {
        void video.play().catch(() => {
          /* autoplay may be blocked — poster still shows */
        });
      }
    };

    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, [allowVideo, videoReady]);

  // Seamless loop: jump early to avoid decoder black-gap at the seam
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !allowVideo || !videoReady) return;

    const onTimeUpdate = () => {
      const { duration, currentTime } = video;
      if (!Number.isFinite(duration) || duration < 1) return;
      // Restart ~120ms before end so the loop does not flash empty frames
      if (currentTime >= duration - 0.12) {
        video.currentTime = 0.04;
      }
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    return () => video.removeEventListener("timeupdate", onTimeUpdate);
  }, [allowVideo, videoReady]);

  return (
    <div
      id="liquid-backdrop"
      className={`cinematic-bg liquid-page-backdrop${webglReady ? " is-webgl-ready" : ""}`}
      aria-hidden
      data-webgl={webglReady ? "ready" : "off"}
    >
      <div className="cinematic-bg__base" />
      <div className="cinematic-bg__grain" />

      {/* Solid poster always under video — covers canplay delay + loop seams */}
      {allowVideo && (
        <div className="cinematic-bg__poster">
          <Image
            src={CINEMATIC_ASSETS.ambiencePoster}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority={false}
            loading="lazy"
          />
        </div>
      )}

      {allowVideo && (
        <video
          ref={videoRef}
          className={`cinematic-bg__video ${videoReady ? "is-ready" : ""}`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={CINEMATIC_ASSETS.ambiencePoster}
          onCanPlay={() => setVideoReady(true)}
          onPlaying={() => setVideoReady(true)}
        >
          <source src={CINEMATIC_ASSETS.ambienceLoopWebm} type="video/webm" />
          <source src={CINEMATIC_ASSETS.ambienceLoop} type="video/mp4" />
        </video>
      )}

      <div className="cinematic-bg__layer cinematic-bg__layer--atmosphere">
        <Image
          src={CINEMATIC_ASSETS.atmosphere}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-40"
          priority={false}
          loading="lazy"
        />
      </div>

      <div className="cinematic-bg__layer cinematic-bg__layer--particles">
        <Image
          src={CINEMATIC_ASSETS.particles}
          alt=""
          fill
          sizes="100vw"
          className={`object-cover opacity-28 mix-blend-soft-light ${motionEnabled ? "cinematic-bg__drift" : ""}`}
          priority={false}
          loading="lazy"
        />
      </div>

      {/* CSS molten — unmounted once WebGL is ready so layers cannot compete */}
      {!webglReady && (
        <div className="cinematic-bg__molten-fallback">
          <SceneFallback
            dropletCount={motionEnabled ? 8 : 5}
            showTertiaryOrb={false}
          />
        </div>
      )}

      {motionEnabled && <CinematicOrbLayer onReady={onWebglReady} />}

      <div className="cinematic-bg__orb cinematic-bg__orb--tl" />
      <div className="cinematic-bg__orb cinematic-bg__orb--br" />
      <div className="cinematic-bg__vignette" />
      <div className="cinematic-bg__readability" />
    </div>
  );
}
