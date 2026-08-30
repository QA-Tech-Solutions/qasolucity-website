"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Tooltip } from "@base-ui/react/tooltip";
import { Sun, Moon, Monitor, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ThemeSetting = "light" | "dark" | "system";

const ORDER: ThemeSetting[] = ["light", "dark", "system"];

const ICONS: Record<ThemeSetting, LucideIcon> = {
  light: Sun,
  dark: Moon,
  system: Monitor,
};

const LABELS: Record<ThemeSetting, string> = {
  light: "Light",
  dark: "Dark",
  system: "System",
};

/**
 * One button, three states, cycled in a fixed order (light -> dark ->
 * system -> light...) rather than a dropdown - the ask was specifically
 * "one button that when clicked it goes to the next". The icon shown is
 * always the *setting* that's currently selected, not the resolved
 * light/dark appearance, so "system" reliably shows the monitor icon
 * even when the OS happens to be in dark mode.
 */
export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // The selected theme is unknown on the server (it lives in
  // localStorage), so rendering it before mount would mismatch
  // hydration. A neutral placeholder avoids a flash of the wrong icon.
  // This is next-themes' own documented mount-detection pattern.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const current = (theme as ThemeSetting | undefined) ?? "light";
  const Icon = ICONS[current];

  const cycle = () => {
    const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];
    setTheme(next);
  };

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle color theme"
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground",
          className
        )}
      >
        <Sun className="h-[18px] w-[18px]" />
      </button>
    );
  }

  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger
          onClick={cycle}
          aria-label={`Theme: ${LABELS[current]}. Click to switch.`}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-full text-muted-foreground transition-colors duration-300 hover:bg-muted hover:text-foreground",
            className
          )}
        >
          <Icon className="h-[18px] w-[18px]" />
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner sideOffset={8}>
            <Tooltip.Popup className="rounded-lg border border-border bg-surface px-2.5 py-1.5 text-xs font-medium text-foreground shadow-lg origin-[var(--transform-origin)] transition-[transform,opacity] duration-100 ease-out data-ending-style:opacity-0 data-starting-style:opacity-0">
              {LABELS[current]}
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
