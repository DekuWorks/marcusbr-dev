import Image from "next/image";

type ProjectConceptIconSize = "card" | "gallery" | "lightbox";

const SIZE_CLASSES: Record<ProjectConceptIconSize, string> = {
  card: "h-[52px] w-[52px] rounded-[14px] sm:h-16 sm:w-16 sm:rounded-2xl",
  gallery: "h-24 w-24 rounded-2xl sm:h-28 sm:w-28",
  lightbox: "h-32 w-32 rounded-3xl sm:h-40 sm:w-40",
};

interface ProjectConceptIconDisplayProps {
  icon: string;
  alt: string;
  size?: ProjectConceptIconSize;
  className?: string;
}

export default function ProjectConceptIconDisplay({
  icon,
  alt,
  size = "gallery",
  className = "",
}: ProjectConceptIconDisplayProps) {
  const dimension = size === "lightbox" ? 160 : size === "gallery" ? 112 : 64;

  return (
    <div
      className={`flex h-full w-full items-center justify-center bg-card ${className}`}
    >
      <div className="rounded-2xl border border-jade/15 bg-background-secondary p-1 transition-shadow duration-300 motion-safe:group-hover/screenshot:shadow-[0_0_32px_rgba(62,180,137,0.35)]">
        <Image
          src={icon}
          alt={alt}
          width={dimension}
          height={dimension}
          className={`${SIZE_CLASSES[size]} object-contain`}
        />
      </div>
    </div>
  );
}
