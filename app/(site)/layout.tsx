/**
 * @fileoverview Portfolio shell — home + project detail deep links.
 *
 * Mounts a single persistent `CinematicBackground` so navigating between `/`
 * and `/projects/[slug]/` does not remount WebGL / video / CSS molten
 * (avoids hero flicker on deep links and client transitions).
 *
 * Shuchu marketing pages stay outside this group (light, no cinematic stack).
 */

import CinematicBackground from "@/components/cinematic/CinematicBackground";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen overflow-x-hidden pb-[env(safe-area-inset-bottom,0px)]">
      <CinematicBackground />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
