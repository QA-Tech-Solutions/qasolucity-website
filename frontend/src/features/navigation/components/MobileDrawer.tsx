"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { navigation } from "../constants/navigation";
import MobileMenuItem from "./MobileMenuItem";
import { Button } from "@/components/ui/Button";

import Link from "next/link";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileDrawer({
  open,
  onClose,
}: MobileDrawerProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (open) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence initial={false}>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-[min(92vw,24rem)] flex-col bg-white shadow-2xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-menu-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200/80 px-5 py-4 sm:px-6 sm:py-5">
              <h2
                id="mobile-menu-title"
                className="text-base font-semibold tracking-tight text-slate-900"
              >
                QA Solucity
              </h2>

              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav
              className="flex-1 overflow-y-auto px-5 py-4 sm:px-6 sm:py-6"
              aria-labelledby="mobile-menu-title"
            >
              {navigation.map((item) => (
                <MobileMenuItem
                  key={item.label}
                  item={item}
                  onClose={onClose}
                />
              ))}
            </nav>

            {/* Footer */}
            <div className="border-t border-slate-200/80 px-5 py-4 sm:px-6 sm:py-5">
              <Link href="/contact" onClick={onClose} className="block">
                <Button className="h-12 w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-500 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20">
                  Book Consultation
                </Button>
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}