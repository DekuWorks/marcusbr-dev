import Image from "next/image";

type ProjectAppIconSize = "sm" | "md" | "lg";

const SIZE_MAP: Record<
  ProjectAppIconSize,
  { box: string; image: string; dimension: number }
> = {
  sm: {
    box: "h-10 w-10 rounded-[11px]",
    image: "h-10 w-10 rounded-[11px]",
    dimension: 40,
  },
  md: {
    box: "h-11 w-11 rounded-[14px] sm:h-14 sm:w-14 sm:rounded-[18px]",
    image: "h-11 w-11 rounded-[14px] sm:h-14 sm:w-14 sm:rounded-[18px]",
    dimension: 56,
  },
  lg: {
    box: "h-16 w-16 rounded-[18px] sm:h-20 sm:w-20 sm:rounded-[22px]",
    image: "h-16 w-16 rounded-[18px] sm:h-20 sm:w-20 sm:rounded-[22px]",
    dimension: 80,
  },
};

interface ProjectAppIconProps {
  src: string;
  alt: string;
  size?: ProjectAppIconSize;
  priority?: boolean;
  className?: string;
  hoverGlow?: boolean;
}

export default function ProjectAppIcon({
  src,
  alt,
  size = "md",
  priority = false,
  className = "",
  hoverGlow = true,
}: ProjectAppIconProps) {
  const { box, image, dimension } = SIZE_MAP[size];

  return (
    <div
      className={`project-app-icon-frame ${box} ${hoverGlow ? "project-app-icon-frame--hover" : ""} ${className}`.trim()}
    >
      <Image
        src={src}
        alt={alt}
        width={dimension}
        height={dimension}
        className={`project-app-icon ${image}`}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        aria-hidden={alt === "" ? true : undefined}
      />
    </div>
  );
}
