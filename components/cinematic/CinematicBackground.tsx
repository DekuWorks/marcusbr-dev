"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
 */
export default function CinematicBackground() {
  const { motionEnabled } = useMotionEnabled();
  const [videoReady, setVideoReady] = useState(false);
  const [allowVideo, setAllowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!motionEnabled) {
      setAllowVideo(false);
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

  return (
    <div
      id="liquid-backdrop"
      className="cinematic-bg liquid-page-backdrop"
      aria-hidden
    >
      <div className="cinematic-bg__base" />
      <div className="cinematic-bg__grain" />

      {allowVideo && (
        <video
          ref={videoRef}
          className={`cinematic-bg__video ${videoReady ? "is-ready" : ""}`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={CINEMATIC_ASSETS.ambiencePoster}
          onCanPlay={() => setVideoReady(true)}
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
          className={`object-cover opacity-28 mix-blend-screen ${motionEnabled ? "cinematic-bg__drift" : ""}`}
          priority={false}
          loading="lazy"
        />
      </div>

      {/* CSS molten underlayer — paused via CSS when WebGL orb mounts */}
      <div className="cinematic-bg__molten-fallback">
        <SceneFallback
          dropletCount={motionEnabled ? 8 : 5}
          showTertiaryOrb={false}
        />
      </div>

      {motionEnabled && <CinematicOrbLayer />}

      <div className="cinematic-bg__orb cinematic-bg__orb--tl" />
      <div className="cinematic-bg__orb cinematic-bg__orb--br" />
      <div className="cinematic-bg__vignette" />
      <div className="cinematic-bg__readability" />
    </div>
  );
}
