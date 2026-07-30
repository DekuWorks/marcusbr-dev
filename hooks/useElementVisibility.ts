"use client";

import { useEffect, useRef, useState, type RefObject } from "react";

type UseElementVisibilityOptions = {
  threshold?: number;
  rootMargin?: string;
};

export function useElementVisibility<T extends Element>(
  options: UseElementVisibilityOptions = {},
): [RefObject<T | null>, boolean] {
  const { threshold = 0.05, rootMargin = "80px" } = options;
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold, rootMargin },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return [ref, visible];
}

export function usePageVisible() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onVisibility = () => setVisible(document.visibilityState === "visible");
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return visible;
}
