"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { NavigationItem } from "../types/navigation";
import { cn } from "@/lib/utils";

import { AnimatePresence, motion } from "framer-motion";

interface MobileMenuItemProps {
  item: NavigationItem;
  onClose: () => void;
}

export default function MobileMenuItem({
  item,
  onClose,
}: MobileMenuItemProps) {
  const [expanded, setExpanded] = useState(false);

  const hasMegaMenu =
    item.megaMenu &&
    item.sections &&
    item.sections.length > 0;

  if (!hasMegaMenu) {
    return (
      <Link
        href={item.href}
        onClick={onClose}
        className="block py-4 text-base font-medium transition-colors hover:text-accent"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="border-b border-border py-2">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between py-2 text-left text-base font-medium"
        aria-expanded={expanded}
      >
        {item.label}

        <ChevronDown
          className={cn(
            "h-5 w-5 transition-transform duration-300",
            expanded && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="ml-4 mt-3 space-y-3 border-l border-border pl-4">
              {item.sections!.flatMap((section) =>
                section.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className="block text-sm text-muted-foreground transition hover:text-accent"
                  >
                    {link.label}
                  </Link>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}