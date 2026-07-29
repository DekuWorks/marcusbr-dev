"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Briefcase,
  Download,
  FolderOpen,
  Home,
  LayoutGrid,
  Mail,
  MessageSquare,
  Search,
  User,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { getFeaturedProjects } from "@/lib/projects";
import { ACTION_COMMANDS, PAGE_SECTIONS } from "@/lib/navigation";
import { useMotionEnabled } from "@/hooks/useEffectsPreference";

type CommandGroup = "Navigate" | "Actions" | "Projects";

type CommandItem = {
  id: string;
  label: string;
  href: string;
  download?: string;
  group: CommandGroup;
  keywords: string[];
  icon: LucideIcon;
};

const SECTION_ICONS: Record<string, LucideIcon> = {
  home: Home,
  about: User,
  projects: LayoutGrid,
  skills: Wrench,
  experience: Briefcase,
  contact: MessageSquare,
};

const GROUP_ORDER: CommandGroup[] = ["Navigate", "Actions", "Projects"];

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CommandPalette({
  open,
  onOpenChange,
}: CommandPaletteProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const titleId = useId();
  const descId = useId();
  const { motionEnabled } = useMotionEnabled();
  const router = useRouter();

  const allCommands = useMemo<CommandItem[]>(() => {
    const sections: CommandItem[] = PAGE_SECTIONS.map((section) => ({
      id: `section-${section.id}`,
      label: section.label,
      href: section.href,
      group: "Navigate",
      keywords: [...section.keywords],
      icon: SECTION_ICONS[section.id] ?? Home,
    }));

    const actions: CommandItem[] = ACTION_COMMANDS.map((action) => ({
      id: `action-${action.id}`,
      label: action.label,
      href: action.href,
      download: "download" in action ? action.download : undefined,
      group: "Actions",
      keywords: [...action.keywords],
      icon: action.id === "resume" ? Download : Mail,
    }));

    const projects: CommandItem[] = getFeaturedProjects().map((project) => ({
      id: `project-${project.id}`,
      label: project.name,
      href: `/projects/${project.id}/`,
      group: "Projects",
      keywords: [project.category, project.statusLabel, ...project.technologies],
      icon: FolderOpen,
    }));

    return [...sections, ...actions, ...projects];
  }, []);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return allCommands;

    return allCommands.filter((command) => {
      const haystack = [
        command.label,
        command.group,
        ...command.keywords,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalized);
    });
  }, [allCommands, query]);

  const close = useCallback(() => {
    onOpenChange(false);
    setQuery("");
    setActiveIndex(0);
  }, [onOpenChange]);

  const execute = useCallback(
    (command: CommandItem) => {
      close();

      if (command.href.startsWith("#")) {
        const target = document.querySelector(command.href);
        target?.scrollIntoView({
          behavior: motionEnabled ? "smooth" : "auto",
        });
        if (target instanceof HTMLElement) {
          target.focus({ preventScroll: true });
        }
        return;
      }

      if (command.download) {
        const anchor = document.createElement("a");
        anchor.href = command.href;
        anchor.download = command.download;
        anchor.click();
        return;
      }

      if (command.href.startsWith("mailto:")) {
        window.location.href = command.href;
        return;
      }

      router.push(command.href);
    },
    [close, motionEnabled, router],
  );

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) dialog.showModal();
      requestAnimationFrame(() => inputRef.current?.focus());
    } else if (dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const onCancel = (event: Event) => {
      event.preventDefault();
      close();
    };

    dialog.addEventListener("cancel", onCancel);
    return () => dialog.removeEventListener("cancel", onCancel);
  }, [close]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const onClick = (event: MouseEvent) => {
      if (event.target === dialog) close();
    };

    dialog.addEventListener("click", onClick);
    return () => dialog.removeEventListener("click", onClick);
  }, [close]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const activeItem = list.querySelector(`[data-index="${activeIndex}"]`);
    activeItem?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, filtered.length - 1));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    } else if (event.key === "Enter" && filtered[activeIndex]) {
      event.preventDefault();
      execute(filtered[activeIndex]);
    } else if (event.key === "Home") {
      event.preventDefault();
      setActiveIndex(0);
    } else if (event.key === "End") {
      event.preventDefault();
      setActiveIndex(Math.max(filtered.length - 1, 0));
    }
  };

  const indexedCommands = useMemo(
    () => filtered.map((command, index) => ({ command, index })),
    [filtered],
  );

  const groupedCommands = GROUP_ORDER.map((group) => ({
    group,
    items: indexedCommands.filter(({ command }) => command.group === group),
  })).filter((entry) => entry.items.length > 0);

  return (
    <dialog
      ref={dialogRef}
      className="command-palette-dialog fixed inset-0 z-[100] m-0 h-full max-h-none w-full max-w-none bg-transparent p-4 sm:p-6"
      aria-labelledby={titleId}
      aria-describedby={descId}
      aria-modal="true"
      role="dialog"
    >
      <motion.div
        initial={motionEnabled ? { opacity: 0, scale: 0.98, y: -8 } : false}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: motionEnabled ? 0.18 : 0 }}
        className="command-palette-panel mx-auto mt-[12vh] w-full max-w-lg overflow-hidden rounded-xl border border-jade-border bg-card/95 shadow-glow backdrop-blur-md"
      >
        <div className="flex items-center gap-3 border-b border-jade/10 px-4 py-3">
          <Search className="h-4 w-4 shrink-0 text-jade" aria-hidden />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search pages, projects, actions…"
            className="min-w-0 flex-1 bg-transparent text-sm text-cream placeholder:text-muted focus:outline-none"
            aria-label="Search commands"
            aria-controls="command-palette-list"
            aria-activedescendant={
              filtered[activeIndex]
                ? `command-item-${filtered[activeIndex].id}`
                : undefined
            }
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
          />
          <kbd className="hidden rounded border border-jade-border bg-background-secondary/80 px-1.5 py-0.5 text-[10px] font-medium text-muted sm:inline">
            Esc
          </kbd>
        </div>

        <h2 id={titleId} className="sr-only">
          Command palette
        </h2>
        <p id={descId} className="sr-only">
          Search and jump to site sections, projects, or quick actions. Use arrow
          keys to navigate and Enter to select.
        </p>

        <ul
          ref={listRef}
          id="command-palette-list"
          role="listbox"
          aria-label="Commands"
          className="command-palette-list max-h-[min(50vh,360px)] overflow-y-auto p-2"
        >
          {filtered.length === 0 ? (
            <li className="px-3 py-6 text-center text-sm text-muted">
              No commands found for &ldquo;{query}&rdquo;
            </li>
          ) : (
            groupedCommands.map(({ group, items }) => (
              <li key={group} role="presentation">
                <p className="px-3 pt-2 pb-1 text-[10px] font-semibold tracking-[0.15em] text-jade uppercase">
                  {group}
                </p>
                <ul role="group" aria-label={group}>
                  {items.map(({ command, index: currentIndex }) => {
                    const isActive = currentIndex === activeIndex;
                    const Icon = command.icon;

                    return (
                      <li key={command.id} role="presentation">
                        <button
                          type="button"
                          id={`command-item-${command.id}`}
                          data-index={currentIndex}
                          role="option"
                          aria-selected={isActive}
                          onClick={() => execute(command)}
                          onMouseEnter={() => setActiveIndex(currentIndex)}
                          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-jade focus-visible:ring-offset-2 focus-visible:ring-offset-card ${
                            isActive
                              ? "border border-jade/30 bg-jade/15 text-jade-bright"
                              : "border border-transparent text-cream hover:bg-jade/10 hover:text-jade-bright"
                          }`}
                        >
                          <span
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${
                              isActive
                                ? "border-jade/40 bg-jade/20 text-jade-bright"
                                : "border-jade-border bg-background-secondary/80 text-jade"
                            }`}
                            aria-hidden
                          >
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="min-w-0 flex-1 truncate font-medium">
                            {command.label}
                          </span>
                          {command.group === "Navigate" && (
                            <span className="shrink-0 text-xs text-muted">
                              {command.href}
                            </span>
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))
          )}
        </ul>

        <div className="flex items-center justify-between gap-4 border-t border-jade/10 px-4 py-2.5 text-[11px] text-muted">
          <span className="flex items-center gap-3">
            <span>
              <kbd className="rounded border border-jade-border bg-background-secondary/80 px-1 py-0.5">
                ↑↓
              </kbd>{" "}
              navigate
            </span>
            <span>
              <kbd className="rounded border border-jade-border bg-background-secondary/80 px-1 py-0.5">
                ↵
              </kbd>{" "}
              select
            </span>
          </span>
          <span>
            <kbd className="rounded border border-jade-border bg-background-secondary/80 px-1 py-0.5">
              ⌘K
            </kbd>{" "}
            toggle
          </span>
        </div>
      </motion.div>
    </dialog>
  );
}
