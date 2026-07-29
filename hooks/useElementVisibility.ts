"use client";

import { useEffect, useRef, useState } from "react";

type UseElementVisibilityOptions = {
  threshold?: number;
  rootMargin?: string;
};

export function useElementVisibility<T extends HTMLElement = HTMLDivElement>(
  options: UseElementVisibilityOptions = {},
) {
  const { threshold = 0.1, rootMargin = "0px" } = options;
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}
