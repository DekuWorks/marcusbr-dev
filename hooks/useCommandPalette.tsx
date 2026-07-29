"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";

const CommandPalette = dynamic(() => import("@/components/CommandPalette"), {
  ssr: false,
});

type CommandPaletteContextValue = {
  open: () => void;
  toggle: () => void;
};

const CommandPaletteContext =
  createContext<CommandPaletteContextValue | null>(null);

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
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

  const value = useMemo(
    () => ({
      open: () => setOpen(true),
      toggle: () => setOpen((previous) => !previous),
    }),
    [],
  );

  return (
    <CommandPaletteContext.Provider value={value}>
      {children}
      {mounted && open ? (
        <CommandPalette open={open} onOpenChange={setOpen} />
      ) : null}
    </CommandPaletteContext.Provider>
  );
}

export function useCommandPalette() {
  const context = useContext(CommandPaletteContext);
  if (!context) {
    throw new Error(
      "useCommandPalette must be used within CommandPaletteProvider",
    );
  }
  return context;
}
