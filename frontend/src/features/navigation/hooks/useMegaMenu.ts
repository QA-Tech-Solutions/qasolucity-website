"use client";

import { useCallback, useEffect, useState } from "react";

export function useMegaMenu() {
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const open = useCallback((menu: string) => {
    setOpenMenu(menu);
  }, []);

  const close = useCallback(() => {
    setOpenMenu(null);
  }, []);

  const toggle = useCallback((menu: string) => {
    setOpenMenu((current) =>
      current === menu ? null : menu
    );
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        close();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [close]);

  return {
    openMenu,
    open,
    close,
    toggle,
  };
}