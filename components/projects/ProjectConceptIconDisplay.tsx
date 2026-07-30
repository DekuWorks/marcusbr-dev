import Image from "next/image";

type ProjectConceptIconSize = "card" | "hero" | "gallery" | "lightbox";

const SIZE_CLASSES: Record<ProjectConceptIconSize, string> = {
  card: "h-[52px] w-[52px] sm:h-16 sm:w-16",
  hero: "h-[100px] w-[100px] sm:h-[150px] sm:w-[150px]",
  gallery: "h-24 w-24 sm:h-28 sm:w-28",
  lightbox: "h-32 w-32 sm:h-40 sm:w-40",
};

const DIMENSIONS: Record<ProjectConceptIconSize, number> = {
  card: 64,
  hero: 150,
  gallery: 112,
  lightbox: 160,
};

interface ProjectConceptIconDisplayProps {
  icon: string;
  alt: string;
  size?: ProjectConceptIconSize;
  className?: string;
  priority?: boolean;
}

export default function ProjectConceptIconDisplay({
  icon,
  alt,
  size = "gallery",
  className = "",
  priority = false,
}: ProjectConceptIconDisplayProps) {
  const dimension = DIMENSIONS[size];
  const needsTightCrop = icon.includes("/daypilot/");

  return (
    <div
      className={`flex h-full w-full items-center justify-center ${className}`.trim()}
    >
      <div className="project-concept-icon-glow">
        <Image
          src={icon}
          alt={alt}
          width={dimension}
          height={dimension}
          className={`project-concept-icon ${SIZE_CLASSES[size]} ${
            needsTightCrop ? "project-concept-icon--tight-crop" : ""
          }`}
          priority={priority}
          loading={priority ? "eager" : "lazy"}
        />
      </div>
    </div>
  );
}
