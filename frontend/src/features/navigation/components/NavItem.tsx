"use client";

import { useRef } from "react";
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

  const hasMegaMenu =
    item.megaMenu &&
    item.sections &&
    item.sections.length > 0;

  const menuRef = useRef<HTMLDivElement>(null);

  useOutsideClick(menuRef, close);

  return (
    <div
      ref={menuRef}
      className="relative"
      onMouseEnter={() => hasMegaMenu && open(item.label)}
      onMouseLeave={close}
    >
      <button
        type="button"
        className="flex items-center gap-1"
        onClick={() =>
          hasMegaMenu && toggle(item.label)
        }
        aria-expanded={hasMegaMenu ? isOpen : undefined}
        aria-haspopup={hasMegaMenu ? "menu" : undefined}
        aria-controls={
        hasMegaMenu
            ? `mega-menu-${item.label}`
            : undefined
        }
      >
        <NavLink href={item.href}>
          {item.label}
        </NavLink>

        {hasMegaMenu && (
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        )}
      </button>

      <AnimatePresence>
        {hasMegaMenu && isOpen && (
          <motion.div
            id={`mega-menu-${item.label}`}
            initial={{
              opacity: 0,
              y: 10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 10,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            <MegaMenu
              sections={item.sections!}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}