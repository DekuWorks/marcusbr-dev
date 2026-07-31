"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CINEMATIC_ASSETS } from "@/lib/cinematic/assets";
import { useMotionEnabled } from "@/hooks/useEffectsPreference";

/**
 * Fixed full-page cinematic atmosphere — deep black base, jade ambient layers,
 * and locally stored Higgsfield textures. No WebGL / neural scene.
 * Optional webm loop plays only when motion is enabled and the viewport is wide enough.
 */
export default function CinematicBackground() {
  const { motionEnabled } = useMotionEnabled();
  const [videoReady, setVideoReady] = useState(false);
  const [allowVideo, setAllowVideo] = useState(false);

  useEffect(() => {
    if (!motionEnabled) {
      setAllowVideo(false);
      return;
    }
    const mq = window.matchMedia("(min-width: 768px) and (pointer: fine)");
    const update = () => setAllowVideo(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [motionEnabled]);

  return (
    <div className="cinematic-bg" aria-hidden>
      <div className="cinematic-bg__base" />
      <div className="cinematic-bg__grain" />

      {allowVideo && (
        <video
          className={`cinematic-bg__video ${videoReady ? "opacity-[0.22]" : "opacity-0"}`}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={CINEMATIC_ASSETS.ambiencePoster}
          onCanPlay={() => setVideoReady(true)}
        >
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
          className={`object-cover opacity-30 mix-blend-screen ${motionEnabled ? "cinematic-bg__drift" : ""}`}
          priority={false}
          loading="lazy"
        />
      </div>

      <div className="cinematic-bg__orb cinematic-bg__orb--tl" />
      <div className="cinematic-bg__orb cinematic-bg__orb--br" />
      <div className="cinematic-bg__vignette" />
    </div>
  );
}
