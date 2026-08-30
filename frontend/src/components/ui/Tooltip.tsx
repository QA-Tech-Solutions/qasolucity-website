"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TooltipProps {
  content: ReactNode;
  children: ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  /** Renders the trigger as a plain inline wrapper instead of a `<button>` - use for non-interactive content (badges, status pills) that already has its own semantics. */
  asChild?: boolean;
  className?: string;
}

export default function Tooltip({ content, children, side = "top", asChild, className }: TooltipProps) {
  return (
    <TooltipPrimitive.Provider delay={150}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger
          render={asChild ? <span className="inline-flex" /> : undefined}
        >
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Positioner side={side} sideOffset={8}>
            <TooltipPrimitive.Popup
              className={cn(
                "max-w-[260px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3.5 py-2.5 text-xs font-medium leading-relaxed text-slate-700 dark:text-slate-300 shadow-xl shadow-slate-900/10 dark:shadow-black/40 origin-[var(--transform-origin)] transition-[transform,opacity] duration-150 ease-out data-starting-style:opacity-0 data-starting-style:scale-95 data-ending-style:opacity-0 data-ending-style:scale-95",
                className
              )}
            >
              {content}
            </TooltipPrimitive.Popup>
          </TooltipPrimitive.Positioner>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}
