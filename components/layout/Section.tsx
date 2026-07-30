/** Standard page section wrapper with consistent spacing and container. */
import type { ReactNode } from "react";
import PortfolioContainer from "@/components/layout/PortfolioContainer";

interface SectionProps {
  id?: string;
  "aria-labelledby"?: string;
  variant?: "default" | "compact";
  className?: string;
  containerClassName?: string;
  children: ReactNode;
}

export default function Section({
  id,
  "aria-labelledby": ariaLabelledBy,
  variant = "default",
  className = "",
  containerClassName = "",
  children,
}: SectionProps) {
  const spacingClass =
    variant === "compact" ? "section-spacing-compact" : "section-spacing";

  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={`w-full ${spacingClass} ${className}`.trim()}
    >
      <PortfolioContainer className={containerClassName}>
        {children}
      </PortfolioContainer>
    </section>
  );
}
