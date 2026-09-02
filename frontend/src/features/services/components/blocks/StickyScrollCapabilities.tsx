"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export interface StickyScrollItem {
  icon: LucideIcon;
  title: string;
  description: string;
  bullets?: string[];
}

interface Props {
  eyebrow: string;
  heading: string;
  intro?: string;
  items: StickyScrollItem[];
}

// A left-hand scrolling list of items paired with a right-hand panel
// (sticky on large screens) that swaps to reflect whichever item is
// currently in view. Falls back to a plain stacked layout below `lg`,
// where a sticky panel has nowhere meaningful to stick.
export default function StickyScrollCapabilities({
  eyebrow,
  heading,
  intro,
  items,
}: Props) {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const visibleRatios = useRef<Map<number, number>>(new Map());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"));
          visibleRatios.current.set(index, entry.isIntersecting ? entry.intersectionRatio : 0);
        });

        let bestIndex = activeIndex;
        let bestRatio = -1;
        visibleRatios.current.forEach((ratio, index) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestIndex = index;
          }
        });
        if (bestRatio > 0) {
          setActiveIndex(bestIndex);
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: "-15% 0px -45% 0px",
      }
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length]);

  const activeItem = useMemo(() => items[activeIndex] ?? items[0], [items, activeIndex]);
  const ActiveIcon = activeItem.icon;

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">
          {eyebrow}
        </p>
        <h3 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-3xl">
          {heading}
        </h3>
        {intro && (
          <p className="mt-4 text-base leading-7 text-slate-600 dark:text-slate-400">
            {intro}
          </p>
        )}
      </motion.div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_400px] lg:items-start lg:gap-16">
        {/* Left: full scrolling content - the authoritative, always-in-DOM copy */}
        <div className="space-y-16 lg:space-y-24">
          {items.map((item, index) => {
            const Icon = item.icon;
            const isActive = index === activeIndex;
            return (
              <div
                key={item.title}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                data-index={index}
                className="scroll-mt-32"
              >
                <div className="flex items-center gap-3 lg:hidden">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-md shadow-indigo-500/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500 dark:text-indigo-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h4
                  className={`mt-4 text-xl font-bold transition-colors duration-300 lg:mt-0 md:text-2xl ${
                    isActive
                      ? "text-slate-900 dark:text-slate-100"
                      : "text-slate-400 dark:text-slate-600"
                  }`}
                >
                  {item.title}
                </h4>
                <p
                  className={`mt-3 max-w-xl text-[15px] leading-7 transition-colors duration-300 ${
                    isActive
                      ? "text-slate-600 dark:text-slate-400"
                      : "text-slate-400 dark:text-slate-600"
                  }`}
                >
                  {item.description}
                </p>
                {item.bullets && item.bullets.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {item.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className={`flex items-start gap-2.5 text-sm leading-6 transition-colors duration-300 ${
                          isActive
                            ? "text-slate-600 dark:text-slate-400"
                            : "text-slate-400 dark:text-slate-600"
                        }`}
                      >
                        <span
                          className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-300 ${
                            isActive ? "bg-indigo-500" : "bg-slate-300 dark:bg-slate-700"
                          }`}
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        {/* Right: sticky visual summary - desktop only, supplementary */}
        <div className="hidden lg:sticky lg:top-32 lg:block" aria-hidden="true">
          <div className="relative overflow-hidden rounded-[32px] border border-slate-200/80 dark:border-slate-800/80 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 p-8 text-white shadow-[0_24px_70px_-26px_rgba(15,23,42,0.4)]">
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl" />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="relative z-10"
              >
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-300">
                  {String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
                </span>
                <div className="mt-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm">
                  <ActiveIcon className="h-7 w-7" />
                </div>
                <h4 className="mt-6 text-xl font-bold leading-snug">{activeItem.title}</h4>
                <p className="mt-3 text-sm leading-7 text-slate-300">{activeItem.description}</p>
              </motion.div>
            </AnimatePresence>

            {/* Progress dots */}
            <div className="relative z-10 mt-8 flex gap-1.5">
              {items.map((item, index) => (
                <span
                  key={item.title}
                  className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                    index === activeIndex ? "bg-white" : "bg-white/15"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
