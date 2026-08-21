"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  label: string;
  value: string;
}

interface SelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  placeholder?: string;
}

export default function Select({
  options,
  placeholder = "Select an option",
  className,
  ...props
}: SelectProps) {
  return (
    <div className="relative w-full">
      <select
        aria-label={placeholder}
        className={cn(
          `
          h-14
          w-full
          appearance-none
          rounded-2xl
          border
          border-slate-200
          bg-white
          px-5
          pr-12
          text-slate-700
          outline-none
          transition-all
          duration-200
          hover:border-slate-300
          focus:border-indigo-500
          focus:ring-4
          focus:ring-indigo-100
          disabled:cursor-not-allowed
          disabled:opacity-50
        `,
          className
        )}
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Custom Arrow Icon */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
        <ChevronDown className="h-5 w-5 text-slate-400 transition-transform duration-200 group-hover:text-slate-600" />
      </div>
    </div>
  );
}