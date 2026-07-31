/** Brand mark for a technology name (static asset under `/public/tech`). */

import TechIcon from "@/components/icons/TechIcon";

type TechLogoProps = {
  name: string;
  size?: number;
  className?: string;
};

export default function TechLogo({
  name,
  size = 18,
  className = "",
}: TechLogoProps) {
  return <TechIcon name={name} size={size} className={className} />;
}
