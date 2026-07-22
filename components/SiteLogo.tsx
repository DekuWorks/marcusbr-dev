import Image from "next/image";

type SiteLogoProps = {
  className?: string;
  priority?: boolean;
};

export default function SiteLogo({
  className = "h-9 w-auto",
  priority = false,
}: SiteLogoProps) {
  return (
    <Image
      src="/logo.webp"
      alt="Marcus Brown logo"
      width={633}
      height={346}
      className={`object-contain ${className}`}
      priority={priority}
    />
  );
}
