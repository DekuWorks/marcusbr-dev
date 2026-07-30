import type { ReactNode } from "react";

interface PortfolioContainerProps {
  children: ReactNode;
  className?: string;
}

export default function PortfolioContainer({
  children,
  className = "",
}: PortfolioContainerProps) {
  return (
    <div className={`portfolio-container ${className}`.trim()}>
      {children}
    </div>
  );
}
