"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Tooltip } from "@base-ui/react/tooltip";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

type Appearance = "light" | "dark";

const ICONS: Record<Appearance, typeof Sun> = { light: Sun, dark: Moon };
const LABELS: Record<Appearance, string> = { light: "Light", dark: "Dark" };

/**
 * One button, two states. A first-time visitor's initial appearance
 * still follows their OS preference (see ThemeProvider's
 * defaultTheme="system" + enableSystem) - this toggle just never exposes
 * "System" as something to click through or land back on. It reads
 * `resolvedTheme` (the actual light/dark appearance on screen) rather
 * than the raw `theme` setting, so it shows the right icon/label even
 * before anyone has made an explicit choice; clicking always sets an
 * explicit "light" or "dark" via next-themes, which is what persists it
 * to localStorage for future visits.
 */
export default function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // The resolved appearance is unknown on the server (it depends on
  // localStorage and/or the OS setting), so rendering it before mount
  // would mismatch hydration. A neutral placeholder avoids a flash of
  // the wrong icon. This is next-themes' own documented mount-detection
  // pattern.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  const current: Appearance = mounted && resolvedTheme === "dark" ? "dark" : "light";
  const Icon = ICONS[current];

  const cycle = () => {
    setTheme(current === "dark" ? "light" : "dark");
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
