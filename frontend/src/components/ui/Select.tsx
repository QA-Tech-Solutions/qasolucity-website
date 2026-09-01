"use client";

import * as React from "react";
import { Select as SelectPrimitive } from "@base-ui/react/select";
import { Check, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps {
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
  options: SelectOption[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  "aria-invalid"?: boolean;
  "aria-label"?: string;
}

/**
 * A fully custom-styled dropdown (Base UI's headless Select underneath) so
 * it matches the design system instead of the browser's native <select>
 * chrome. Exposes the same name/value/onChange/onBlur contract as a plain
 * <select>, synthesizing a minimal ChangeEvent-shaped object on selection
 * so existing controlled-form handlers (built for native form elements)
 * work unchanged.
 */
export default function Select({
  name,
  value,
  onChange,
  onBlur,
  options,
  placeholder = "Select an option",
  className,
  disabled,
  required,
  ...rest
}: SelectProps) {
  // Tracks whether a selection was actually made during the current
  // open/close cycle. Base UI fires onValueChange and onOpenChange(false)
  // back-to-back for the same "pick an item" interaction, but this
  // component's onOpenChange closes over the `value` prop from the render
  // *before* that selection's state update lands - so reading `value`
  // there is stale and would report "empty" for a split second even
  // though a real choice was just made. Tracking the selection directly
  // sidesteps that instead of relying on prop freshness.
  const madeSelectionRef = React.useRef(false);

  const handleValueChange = (newValue: string | null) => {
    madeSelectionRef.current = true;
    onChange?.({ target: { name, value: newValue ?? "" } } as unknown as React.ChangeEvent<HTMLSelectElement>);
  };

  // Opening the popup moves focus off the trigger button, which would fire
  // a native onBlur immediately on click, before the user has actually
  // made or abandoned a choice. "Blur" for a select should mean "the
  // popup was opened and then closed without picking anything" - so
  // validate on close, and only when nothing was actually selected.
  const handleOpenChange = (open: boolean) => {
    if (open) {
      madeSelectionRef.current = false;
      return;
    }
    if (!madeSelectionRef.current) {
      onBlur?.({ target: { name, value: value ?? "" } } as unknown as React.FocusEvent<HTMLSelectElement>);
    }
  };

  return (
    <SelectPrimitive.Root
      name={name}
      value={value || null}
      onValueChange={handleValueChange}
      onOpenChange={handleOpenChange}
      disabled={disabled}
      required={required}
    >
      <SelectPrimitive.Trigger
        aria-label={rest["aria-label"] ?? placeholder}
        aria-invalid={rest["aria-invalid"]}
        className={cn(
          "group flex h-14 w-full items-center justify-between gap-2 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-5 text-left text-[15px] text-slate-700 dark:text-slate-300 outline-none transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-600 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-500/20 data-popup-open:border-indigo-500 data-popup-open:ring-4 data-popup-open:ring-indigo-100 dark:data-popup-open:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-red-400 dark:aria-invalid:border-red-500",
          className
        )}
      >
        <SelectPrimitive.Value className="truncate data-placeholder:text-slate-600 dark:data-placeholder:text-slate-500">
          {(v: string | null) => options.find((o) => o.value === v)?.label ?? placeholder}
        </SelectPrimitive.Value>
        <SelectPrimitive.Icon className="flex shrink-0 items-center">
          <ChevronDown className="h-5 w-5 text-slate-400 dark:text-slate-500 transition-transform duration-200 group-data-popup-open:rotate-180" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Positioner sideOffset={8} className="z-50 outline-none">
          <SelectPrimitive.Popup
            className="max-h-72 w-[var(--anchor-width)] overflow-y-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-1.5 shadow-2xl shadow-slate-900/10 dark:shadow-black/40 outline-none origin-[var(--transform-origin)] transition-[transform,opacity] duration-150 ease-out data-starting-style:opacity-0 data-starting-style:scale-95 data-ending-style:opacity-0 data-ending-style:scale-95 [scrollbar-width:thin] [scrollbar-color:#cbd5e1_transparent] dark:[scrollbar-color:#334155_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-slate-300 dark:[&::-webkit-scrollbar-thumb]:bg-slate-700"
          >
            <SelectPrimitive.List>
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  className="flex cursor-pointer items-center justify-between gap-2 rounded-xl px-3.5 py-2.5 text-sm text-slate-700 dark:text-slate-300 outline-none data-highlighted:bg-indigo-50 dark:data-highlighted:bg-indigo-950/40 data-highlighted:text-indigo-700 dark:data-highlighted:text-indigo-300"
                >
                  <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator className="flex shrink-0 items-center text-indigo-600 dark:text-indigo-400">
                    <Check className="h-4 w-4" />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.List>
          </SelectPrimitive.Popup>
        </SelectPrimitive.Positioner>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
