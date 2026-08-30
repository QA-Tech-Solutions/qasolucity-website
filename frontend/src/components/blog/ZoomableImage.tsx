"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ZoomIn } from "lucide-react";

interface Props {
  src: string;
  alt: string;
  /** "adaptive" sizes the container to the image's own aspect ratio (e.g. the article hero, via next/image width/height), "natural" is a plain <img> for inline content images */
  variant?: "adaptive" | "natural";
  /** Required for "adaptive" - the image's real pixel dimensions, so the box reserves the correct aspect ratio instead of guessing. */
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export default function ZoomableImage({
  src,
  alt,
  variant = "natural",
  width,
  height,
  className,
  priority,
}: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`Zoom into image: ${alt}`}
        className={`group relative block w-full cursor-zoom-in overflow-hidden ${className ?? ""}`}
      >
        {variant === "adaptive" && width && height ? (
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            priority={priority}
            sizes="(max-width: 896px) 100vw, 896px"
            className="h-auto w-full"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} className="w-full rounded-2xl border border-slate-200/80 shadow-sm" />
        )}

        <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-slate-900/0 opacity-0 transition-all duration-300 group-hover:bg-slate-900/30 group-hover:opacity-100">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg">
            <ZoomIn className="h-5 w-5" />
          </span>
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 p-6 backdrop-blur-sm"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close zoomed image"
              className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-300 hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>

            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              src={src}
              alt={alt}
              onClick={(event) => event.stopPropagation()}
              className="max-h-[85vh] max-w-full cursor-zoom-out rounded-2xl object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
