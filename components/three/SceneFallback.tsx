type SceneFallbackProps = {
  variant?: "loading" | "static" | "error";
  className?: string;
};

export default function SceneFallback({
  variant = "loading",
  className = "",
}: SceneFallbackProps) {
  const message =
    variant === "error"
      ? "VISUAL SYSTEM OFFLINE"
      : "INITIALIZING VISUAL SYSTEM...";

  return (
    <div
      className={`scene-fallback relative flex h-full w-full items-center justify-center overflow-hidden ${className}`}
      aria-hidden={variant === "loading"}
      role={variant === "error" ? "img" : undefined}
      aria-label={variant === "error" ? "3D scene unavailable" : undefined}
    >
      <div className="scene-fallback-grid absolute inset-0" />
      <div className="scene-fallback-glow absolute inset-0" />

      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="scene-fallback-core" aria-hidden>
          <div className="scene-fallback-core-inner" />
          <div className="scene-fallback-core-ring" />
        </div>

        <p className="font-mono text-[10px] font-semibold tracking-[0.25em] text-jade/70 uppercase sm:text-xs">
          {message}
        </p>

        {variant === "loading" && (
          <div className="flex gap-1" aria-hidden>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="scene-fallback-dot h-1 w-1 rounded-full bg-jade/60"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
