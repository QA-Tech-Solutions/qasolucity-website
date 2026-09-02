"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check, Bug, MousePointer2 } from "lucide-react";
import type { ServiceVisualChecklistItem } from "../../data/services";

interface Props {
  checklist: ServiceVisualChecklistItem[];
}

const ROW_CYCLE = 1.6; // seconds per checklist row in the traveling spotlight

/**
 * "Live Test Run" - a browser window mid-test, animated on a continuous
 * loop rather than a static entrance: a scan sweeps the panel, the
 * flagged element pulses, the cursor clicks it, and a spotlight travels
 * down the checklist as if a run is always in progress. The browser
 * mockup stays generic (it stands in for "the product" on any service
 * page); the checklist is what makes each page's scene specific.
 */
export default function ServiceVisual({ checklist }: Props) {
  const reduceMotion = useReducedMotion();
  const loopDuration = ROW_CYCLE * checklist.length;

  return (
    <div className="relative mx-auto h-[440px] w-full max-w-3xl overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 shadow-[0_24px_70px_-26px_rgba(15,23,42,0.5)] sm:h-[300px] md:h-[320px]">
      {/* Ambient glow - slow breathing */}
      <motion.div
        className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-indigo-500/20 blur-[100px]"
        animate={reduceMotion ? undefined : { opacity: [0.5, 0.9, 0.5], scale: [1, 1.12, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-violet-500/20 blur-[100px]"
        animate={reduceMotion ? undefined : { opacity: [0.4, 0.8, 0.4], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Fine grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Scan sweep - a faint band drifting down the whole panel, like an
          automated run is continuously in progress */}
      {!reduceMotion && (
        <motion.div
          className="pointer-events-none absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-white/[0.06] to-transparent"
          initial={{ top: "-15%" }}
          animate={{ top: "110%" }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
        />
      )}

      {/* Browser mockup */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="absolute left-1/2 top-[6%] w-[88%] -translate-x-1/2 sm:left-[5%] sm:top-1/2 sm:w-[45%] sm:-translate-x-0 sm:-translate-y-1/2"
      >
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          className="overflow-hidden rounded-2xl bg-slate-50 shadow-[0_20px_40px_-18px_rgba(0,0,0,0.45)]"
        >
          {/* Chrome bar */}
          <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-100 px-3 py-2.5">
            <span className="h-2 w-2 rounded-full bg-red-400" />
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="ml-2 h-3 flex-1 rounded-full bg-slate-200" />
          </div>

          {/* Body */}
          <div className="flex flex-col gap-2.5 px-4 py-4">
            <span className="h-2 w-2/5 rounded-full bg-slate-200" />

            <div className="flex h-8 items-center rounded-lg bg-emerald-50 px-2.5">
              <span className="h-2 w-3/5 rounded-full bg-emerald-200" />
              <motion.span
                animate={reduceMotion ? undefined : { scale: [1, 1.18, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                className="ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500 shadow"
              >
                <Check className="h-3 w-3 text-white" strokeWidth={3.5} />
              </motion.span>
            </div>

            <div className="relative flex h-8 items-center rounded-lg bg-amber-50 px-2.5">
              <motion.div
                className="absolute inset-0 rounded-lg outline outline-2 outline-offset-2 outline-amber-400"
                animate={reduceMotion ? undefined : { opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="h-2 w-[46%] rounded-full bg-amber-200" />
              <span className="ml-auto flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-500 shadow">
                <Bug className="h-3 w-3 text-white" strokeWidth={2.5} />
              </span>

              {/* Cursor with a repeating click ripple */}
              <div className="absolute -bottom-2 -right-4">
                {!reduceMotion && (
                  <motion.span
                    className="absolute inset-0 -m-1.5 rounded-full border-2 border-white/70"
                    initial={{ scale: 0.4, opacity: 0.8 }}
                    animate={{ scale: [0.4, 1.6], opacity: [0.8, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut", repeatDelay: 0.4 }}
                  />
                )}
                <MousePointer2
                  className="relative h-4 w-4 fill-slate-900 text-white drop-shadow-md"
                  strokeWidth={1}
                />
              </div>
            </div>

            <div className="flex h-8 items-center rounded-lg bg-slate-100 px-2.5">
              <span className="h-2 w-[70%] rounded-full bg-slate-200" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Checklist card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="absolute bottom-[5%] left-1/2 w-[82%] -translate-x-1/2 rounded-2xl border border-white/15 bg-white/10 px-4 py-3.5 backdrop-blur-md sm:bottom-auto sm:left-auto sm:right-[5%] sm:top-1/2 sm:w-[38%] sm:-translate-x-0 sm:-translate-y-1/2"
      >
        <p className="mb-2.5 flex items-center gap-2 text-[10.5px] font-bold uppercase tracking-[0.15em] text-white/55">
          <span className="relative flex h-1.5 w-1.5">
            {!reduceMotion && (
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            )}
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          Test checklist
        </p>
        <ul className="space-y-2">
          {checklist.map((item, index) => {
            const isFlag = item.status === "flag";
            const isDone = item.status === "done";
            const isPending = item.status === "pending";
            const spotlightDelay = index * ROW_CYCLE;

            return (
              <li
                key={item.label}
                className={`relative flex items-start gap-2 overflow-hidden rounded-lg text-[12.5px] leading-snug ${
                  isFlag ? "text-amber-200" : isDone ? "text-white/90" : "text-white/40"
                }`}
              >
                {/* Traveling spotlight - a soft highlight that visits each
                    row in turn, as if a run is working down the list */}
                {!reduceMotion && (
                  <motion.span
                    className="pointer-events-none absolute inset-0 -mx-1.5 rounded-lg bg-white/10"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0, 0.9, 0] }}
                    transition={{
                      duration: loopDuration,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: spotlightDelay,
                      times: [0, 0.02, 0.16, 0.34],
                    }}
                  />
                )}

                <motion.span
                  animate={
                    reduceMotion
                      ? undefined
                      : { scale: [1, 1, 1.35, 1] }
                  }
                  transition={{
                    duration: loopDuration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: spotlightDelay,
                    times: [0, 0.02, 0.16, 0.34],
                  }}
                  className={`relative mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                    isDone
                      ? "bg-emerald-500"
                      : isFlag
                      ? "bg-amber-500"
                      : "border border-white/30"
                  }`}
                >
                  {isDone && <Check className="h-2.5 w-2.5 text-white" strokeWidth={3.5} />}
                  {isFlag && <Bug className="h-2.5 w-2.5 text-white" strokeWidth={2.5} />}
                  {isPending && !reduceMotion && (
                    <motion.span
                      className="absolute inset-0 rounded-full border border-white/40"
                      animate={{ scale: [1, 1.8], opacity: [0.6, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                </motion.span>
                <span className="relative">{item.label}</span>
              </li>
            );
          })}
        </ul>
      </motion.div>

      {/* Screen-reader summary - the visual above is decorative dressing
          around content already described in the surrounding sections,
          but the flagged checklist item is worth surfacing as real text. */}
      {(() => {
        const flagged = checklist.find((item) => item.status === "flag");
        return flagged ? (
          <span className="sr-only">
            Illustration: a live test run catching an issue in {flagged.label}.
          </span>
        ) : null;
      })()}
    </div>
  );
}
