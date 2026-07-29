"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";

const CommandPalette = dynamic(() => import("@/components/CommandPalette"), {
  ssr: false,
});

export default function CommandPaletteRoot() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      setOpen((previous) => !previous);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!mounted || !open) return null;

  return <CommandPalette open={open} onOpenChange={setOpen} />;
}
