/**
 * Renders a local tech logo from `public/tech/`.
 * Decorative when the skill name is shown beside it (alt="" / aria-hidden).
 */

import Image from "next/image";
import { getTechIcon } from "@/lib/techIcons";

interface TechIconProps {
  name: string;
  size?: number;
  className?: string;
}

export default function TechIcon({
  name,
  size = 20,
  className = "",
}: TechIconProps) {
  const icon = getTechIcon(name);

  return (
    <Image
      src={icon.src}
      alt=""
      width={size}
      height={size}
      className={`shrink-0 object-contain ${className}`.trim()}
      aria-hidden
      loading="lazy"
    />
  );
}
