"use client";

import {
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: ButtonVariant;
  download?: boolean | string;
  className?: string;
  type?: "button" | "submit";
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-jade text-background hover:bg-jade/90 shadow-glow-sm border border-jade/30",
  secondary:
    "glass-card text-cream hover:border-jade/30 hover:shadow-glow-sm",
  ghost:
    "text-muted hover:text-cream hover:bg-white/5 border border-transparent",
};

function useRipple(variant: ButtonVariant) {
  const [ripples, setRipples] = useState<
    { id: number; x: number; y: number }[]
  >([]);

  const createRipple = (event: MouseEvent<HTMLElement>) => {
    if (variant !== "primary") return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const id = Date.now();
    setRipples((prev) => [...prev, { id, x, y }]);
    window.setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== id));
    }, 600);
  };

  return { ripples, createRipple };
}

export default function Button({
  children,
  href,
  onClick,
  variant = "primary",
  download,
  className = "",
  type = "button",
}: ButtonProps) {
  const { ripples, createRipple } = useRipple(variant);
  const baseStyles =
    "btn-liquid inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  const styles = `${baseStyles} ${variantStyles[variant]} ${className}`;

  const rippleElements =
    variant === "primary"
      ? ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="btn-ripple"
            style={{ left: ripple.x, top: ripple.y }}
            aria-hidden
          />
        ))
      : null;

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    createRipple(event);
    onClick?.();
  };

  if (href) {
    return (
      <a
        href={href}
        className={styles}
        download={download}
        target={href.startsWith("http") ? "_blank" : undefined}
        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
        onClick={handleClick}
      >
        {rippleElements}
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={handleClick} className={styles}>
      {rippleElements}
      {children}
    </button>
  );
}
