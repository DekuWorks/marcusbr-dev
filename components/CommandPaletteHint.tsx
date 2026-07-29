"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useCommandPalette } from "@/hooks/useCommandPalette";

type CommandPaletteHintProps = {
  /** Show on all breakpoints (e.g. footer); default hides below lg. */
  alwaysVisible?: boolean;
};

export default function CommandPaletteHint({
  alwaysVisible = false,
}: CommandPaletteHintProps) {
  const { open } = useCommandPalette();
  const [shortcutLabel, setShortcutLabel] = useState("Ctrl+K");

  useEffect(() => {
    const isApple =
      /Mac|iPhone|iPad|iPod/.test(navigator.platform) ||
      navigator.userAgent.includes("Mac");
    setShortcutLabel(isApple ? "⌘K" : "Ctrl+K");
  }, []);

  return (
    <button
      type="button"
      onClick={open}
      aria-label="Open command palette"
      className={`${alwaysVisible ? "inline-flex" : "hidden lg:inline-flex"} items-center gap-2 rounded-lg border border-jade-border bg-card/60 px-2.5 py-1.5 text-xs text-muted transition-colors hover:border-jade/30 hover:bg-jade/10 hover:text-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
    >
      <Search className="h-3.5 w-3.5 text-jade" aria-hidden />
      <kbd className="font-mono text-[11px] tracking-wide text-jade/90">
        {shortcutLabel}
      </kbd>
    </button>
  );
}
