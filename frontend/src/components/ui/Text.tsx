import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ElementType, ReactNode } from "react";

const textVariants = cva("text-muted-foreground", {
  variants: {
    variant: {
      body: "text-base leading-7",
      small: "text-sm leading-6",
      caption: "text-xs",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

interface TextProps
  extends VariantProps<typeof textVariants> {
  as?: ElementType;
  children: ReactNode;
  className?: string;
}

export function Text({
  as: Component = "p",
  variant,
  children,
  className,
}: TextProps) {
  return (
    <Component
      className={cn(
        textVariants({ variant }),
        className
      )}
    >
      {children}
    </Component>
  );
}