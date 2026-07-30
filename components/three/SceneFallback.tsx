type SceneFallbackProps = {
  variant?: "default" | "error" | "loading";
  className?: string;
};

export default function SceneFallback({
  variant = "default",
  className = "",
}: SceneFallbackProps) {
  return (
    <div
      className={`liquid-hero-fallback pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
      data-variant={variant}
    >
      <div className="liquid-hero-fallback__orb liquid-hero-fallback__orb--primary" />
      <div className="liquid-hero-fallback__orb liquid-hero-fallback__orb--secondary" />
      <div className="liquid-hero-fallback__blob" />
      <div className="liquid-hero-fallback__grid" />
      <div className="liquid-hero-fallback__droplets">
        {Array.from({ length: 8 }).map((_, index) => (
          <span
            key={index}
            className="liquid-hero-fallback__droplet"
            style={{ "--i": index } as React.CSSProperties}
          />
        ))}
      </div>
    </div>
  );
}
