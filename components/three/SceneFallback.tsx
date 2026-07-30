type SceneFallbackProps = {
  variant?: "default" | "error" | "loading";
  className?: string;
  dropletCount?: number;
  showTertiaryOrb?: boolean;
};

export default function SceneFallback({
  variant = "default",
  className = "",
  dropletCount = 10,
  showTertiaryOrb = true,
}: SceneFallbackProps) {
  return (
    <div
      className={`liquid-hero-fallback pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden
      data-variant={variant}
    >
      <div className="liquid-hero-fallback__orb liquid-hero-fallback__orb--primary" />
      <div className="liquid-hero-fallback__orb liquid-hero-fallback__orb--secondary" />
      {showTertiaryOrb && (
        <div className="liquid-hero-fallback__orb liquid-hero-fallback__orb--tertiary" />
      )}
      <div className="liquid-hero-fallback__blob" />
      <div className="liquid-hero-fallback__grid" />
      <div className="liquid-hero-fallback__droplets">
        {Array.from({ length: dropletCount }).map((_, index) => (
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
