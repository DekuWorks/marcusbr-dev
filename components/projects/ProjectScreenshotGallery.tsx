"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ProjectScreenshotGalleryProps {
  screenshots: string[];
  alts: string[];
  accent?: string;
  conceptUI?: boolean;
  deviceFrame?: boolean;
  priority?: boolean;
  className?: string;
}

export default function ProjectScreenshotGallery({
  screenshots,
  alts,
  accent = "#3EB489",
  conceptUI = false,
  deviceFrame = false,
  priority = false,
  className = "",
}: ProjectScreenshotGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const galleryId = useId();
  const lightboxRef = useRef<HTMLDivElement>(null);

  const count = screenshots.length;

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex(((index % count) + count) % count);
    },
    [count],
  );

  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);
  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);

  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    lightboxRef.current?.focus();

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxOpen, goPrev, goNext]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 48) {
      if (delta > 0) goPrev();
      else goNext();
    }
    touchStartX.current = null;
  };

  const handleGalleryKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goPrev();
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goNext();
    }
  };

  const imageClasses = deviceFrame
    ? "mx-auto w-[72%] rounded-[2rem] border border-white/10 shadow-2xl"
    : "w-full rounded-xl";

  const renderImage = (
    src: string,
    alt: string,
    index: number,
    isPriority: boolean,
    onClick?: () => void,
  ) => (
    <button
      type="button"
      onClick={onClick}
      className={`group/screenshot relative block w-full overflow-hidden rounded-xl border border-jade/15 bg-background-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-background ${onClick ? "cursor-zoom-in" : "cursor-default"}`}
      aria-label={onClick ? `Open ${alt} in lightbox` : undefined}
      tabIndex={onClick ? 0 : -1}
    >
      <div
        className={`relative aspect-[16/10] w-full bg-gradient-to-br from-background-secondary to-card ${deviceFrame ? "flex items-center justify-center bg-[#0a0f0c] py-6" : ""}`}
      >
        <Image
          src={src}
          alt={alt}
          width={deviceFrame ? 390 : 1280}
          height={deviceFrame ? 844 : 800}
          className={`${imageClasses} transition-transform duration-300 motion-safe:group-hover/screenshot:scale-[1.03]`}
          priority={isPriority}
          loading={isPriority ? "eager" : "lazy"}
        />
        {conceptUI && index === activeIndex && (
          <span
            className="absolute top-3 left-3 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase"
            style={{
              borderColor: `${accent}44`,
              backgroundColor: `${accent}22`,
              color: accent,
            }}
          >
            Concept UI
          </span>
        )}
      </div>
    </button>
  );

  return (
    <>
      <div
        className={`relative ${className}`}
        role="region"
        aria-roledescription="carousel"
        aria-label="Project screenshots"
        onKeyDown={handleGalleryKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {renderImage(
          screenshots[activeIndex],
          alts[activeIndex],
          activeIndex,
          priority,
          () => setLightboxOpen(true),
        )}

        {count > 1 && (
          <>
            <button
              type="button"
              onClick={goPrev}
              className="absolute top-1/2 left-2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-jade/25 bg-background/80 text-cream backdrop-blur-sm transition-colors hover:border-jade/50 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade motion-safe:max-sm:hidden"
              aria-label="Previous screenshot"
              aria-controls={galleryId}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="absolute top-1/2 right-2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-jade/25 bg-background/80 text-cream backdrop-blur-sm transition-colors hover:border-jade/50 hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade motion-safe:max-sm:hidden"
              aria-label="Next screenshot"
              aria-controls={galleryId}
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <div
              id={galleryId}
              className="mt-3 flex items-center justify-center gap-2"
              role="tablist"
              aria-label="Screenshot navigation"
            >
              {screenshots.map((_, index) => (
                <button
                  key={screenshots[index]}
                  type="button"
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-label={`View screenshot ${index + 1} of ${count}`}
                  onClick={() => goTo(index)}
                  className={`h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade ${
                    index === activeIndex
                      ? "w-6 bg-jade"
                      : "w-2.5 bg-jade/30 hover:bg-jade/50"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {lightboxOpen && (
        <div
          ref={lightboxRef}
          role="dialog"
          aria-modal="true"
          aria-label="Screenshot lightbox"
          tabIndex={-1}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-jade/30 bg-card text-cream hover:border-jade/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade"
            aria-label="Close lightbox"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute top-1/2 left-4 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-jade/30 bg-card text-cream hover:border-jade/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade"
            aria-label="Previous screenshot"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div
            className="relative max-h-[85vh] max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={screenshots[activeIndex]}
              alt={alts[activeIndex]}
              width={1280}
              height={800}
              className="max-h-[85vh] w-auto rounded-xl object-contain"
            />
            <p className="mt-3 text-center text-sm text-muted">
              {alts[activeIndex]} ({activeIndex + 1} of {count})
            </p>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute top-1/2 right-4 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-jade/30 bg-card text-cream hover:border-jade/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade"
            aria-label="Next screenshot"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </>
  );
}
