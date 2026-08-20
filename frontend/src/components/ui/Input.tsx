import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          "flex h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition-all placeholder:text-muted-foreground focus:border-accent",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };