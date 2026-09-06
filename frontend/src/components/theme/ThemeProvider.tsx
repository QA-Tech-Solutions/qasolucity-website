"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

/**
 * attribute="class" toggles a `.dark` class on <html>, which globals.css
 * uses to swap the semantic color tokens (see @custom-variant dark and
 * the :root/.dark blocks). defaultTheme="system" means a first-time
 * visitor (nothing in localStorage yet) sees whatever their OS is set
 * to - ThemeToggle.tsx only ever writes an explicit "light"/"dark" once
 * clicked, which is what makes a chosen theme stick on later visits;
 * "system" itself is never a state that toggle exposes or cycles back to.
 */
export default function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
