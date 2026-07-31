"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import NavLink from "./NavLink";
import MegaMenu from "./MegaMenu";
import { NavigationItem } from "../types/navigation";
import { cn } from "@/lib/utils";
import { useOutsideClick } from "../hooks/useOutsideClick";

interface NavItemProps {
  item: NavigationItem;
  openMenu: string | null;
  open: (menu: string) => void;
  close: () => void;
  toggle: (menu: string) => void;
}

export default function NavItem({
  item,
  openMenu,
  open,
  close,
  toggle,
}: NavItemProps) {
  const isOpen = openMenu === item.label;
  const hasMegaMenu = item.megaMenu && item.sections && item.sections.length > 0;
  const menuRef = useRef<HTMLDivElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isMenuHovered, setIsMenuHovered] = useState(false);

  useOutsideClick(menuRef, close);

  const handleMouseEnter = useCallback(() => {
    if (!hasMegaMenu) return;

    // Clear any pending close
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }

    // Open instantly
    open(item.label);
  }, [hasMegaMenu, open, item.label]);

  const handleMouseLeave = useCallback(() => {
    if (!hasMegaMenu) return;

    // If menu is hovered, don't close
    if (isMenuHovered) return;

    // Close after a short delay to allow moving to menu
    closeTimeoutRef.current = setTimeout(() => {
      close();
    }, 150);
  }, [hasMegaMenu, isMenuHovered, close]);

  const handleMenuHover = useCallback((hovered: boolean) => {
    setIsMenuHovered(hovered);
    if (hovered) {
      // Clear any pending close
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
    } else {
      // If leaving the menu, schedule close
      closeTimeoutRef.current = setTimeout(() => {
        close();
      }, 150);
    }
  }, [close]);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={menuRef}
      className="group relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        className="flex items-center gap-1 rounded-xl px-2 py-2 transition-colors"
        onClick={() => hasMegaMenu && toggle(item.label)}
        aria-expanded={hasMegaMenu ? isOpen : undefined}
        aria-haspopup={hasMegaMenu ? "menu" : undefined}
        aria-controls={hasMegaMenu ? `mega-menu-${item.label}` : undefined}
      >
        <NavLink href={item.href}>{item.label}</NavLink>

        {hasMegaMenu && (
          <ChevronDown
            className={cn(
              "h-4 w-4 text-slate-400 transition-all duration-300",
              isOpen && "rotate-180"
            )}
          />
        )}
      </button>

      <AnimatePresence>
        {hasMegaMenu && isOpen && (
          <motion.div
            id={`mega-menu-${item.label}`}
            className="fixed left-1/2 top-20 z-50 -translate-x-1/2"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            onMouseEnter={() => handleMenuHover(true)}
            onMouseLeave={() => handleMenuHover(false)}
          >
            <MegaMenu sections={item.sections!} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}