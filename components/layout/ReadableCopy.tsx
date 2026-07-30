import type { ReactNode } from "react";

interface ReadableCopyProps {
  children: ReactNode;
  className?: string;
}

export default function ReadableCopy({
  children,
  className = "",
}: ReadableCopyProps) {
  return (
    <div className={`readable-copy ${className}`.trim()}>{children}</div>
  );
}
