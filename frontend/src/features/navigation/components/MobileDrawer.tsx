"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import { navigation } from "../constants/navigation";
import MobileMenuItem from "./MobileMenuItem";
import { Button } from "@/components/ui/Button";

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
            className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-sm flex-col bg-background shadow-2xl"
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
            <div className="flex items-center justify-between border-b border-border p-6">
              <h2 
                id= "mobile-menu-title"
                className="text-lg font-semibold">
                QA Solucity
              </h2>

              <button
                type="button"
                onClick={onClose}
                className="rounded-lg p-2 transition-colors hover:bg-muted"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Navigation */}
            <nav
              className="flex-1 overflow-y-auto p-6"
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
            <div className="border-t border-border p-6">
              <Button className="w-full">
                Book Consultation
              </Button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}