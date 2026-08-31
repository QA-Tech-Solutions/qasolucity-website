import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { ElementType, ReactNode } from "react";

const headingVariants = cva("font-bold tracking-tight text-foreground", {
  variants: {
    level: {
      h1: "text-4xl md:text-5xl lg:text-6xl",
      h2: "text-4xl lg:text-5xl",
      h3: "text-3xl lg:text-4xl",
      h4: "text-2xl lg:text-3xl",
      h5: "text-xl lg:text-2xl",
      h6: "text-lg lg:text-xl",
    },
  },
  defaultVariants: {
    level: "h2",
  },
});

interface HeadingProps
  extends VariantProps<typeof headingVariants> {
  as?: ElementType;
  children: ReactNode;
  className?: string;
}

export function Heading({
  as,
  level,
  children,
  className,
}: HeadingProps) {
  const Component = as ?? level ?? "h2";

  return (
    <Component
      className={cn(
        headingVariants({ level }),
        className
      )}
    >
      {children}
    </Component>
  );
}