"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

/**
 * attribute="class" toggles a `.dark` class on <html>, which globals.css
 * uses to swap the semantic color tokens (see @custom-variant dark and
 * the :root/.dark blocks). defaultTheme="light" means a first-time
 * visitor sees light mode regardless of their OS setting — "system"
 * only takes effect once someone explicitly picks it via the toggle.
 */
export default function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
