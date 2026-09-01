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
        className="block py-3 text-base font-medium text-slate-800 dark:text-slate-200 transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between py-3 text-left text-base font-medium text-slate-800 dark:text-slate-200"
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
            <div className="ml-3 mt-3 space-y-3 border-l border-slate-200 dark:border-slate-800 pl-4 pb-2">
              {item.sections!.flatMap((section) =>
                section.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={onClose}
                    className="block py-1 text-sm text-slate-600 dark:text-slate-400 transition hover:text-indigo-600 dark:hover:text-indigo-400"
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