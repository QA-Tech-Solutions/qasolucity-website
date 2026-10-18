"use client";

import Image from "next/image";
import { motion } from "framer-motion";

// Shown whenever a navigation hits a dynamic route segment that has to
// render on the server per-request (/careers, /certification/enroll,
// /dashboard/*, /resources/[slug] - see next.config.ts's build output
// for the full "ƒ Dynamic" list) and takes long enough to suspend.
// Static pages resolve from their prerendered HTML before this ever has
// a chance to paint, so this is purely upside: no regression risk for
// the pages that already loaded instantly.
//
// Three rings recreate the logo's own concentric-circle motif rather
// than reusing it as a flat spinning image - each rotates at its own
// speed and direction, which is what makes it read as "layers of
// activity" instead of one spinning sticker. The actual logo sits still
// at the center so it's always legible mid-animation.
const RINGS = [
  { radius: 76, color: "#4F46E5", dasharray: "260 238", duration: 3.2, direction: 1 },
  { radius: 58, color: "#818CF8", dasharray: "205 159", duration: 4.4, direction: -1 },
  { radius: 40, color: "#A78BFA", dasharray: "145 106", duration: 2.6, direction: 1 },
];

export default function Loading() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8 bg-background"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative flex h-44 w-44 items-center justify-center"
      >
        <svg viewBox="0 0 176 176" className="absolute inset-0 h-full w-full motion-reduce:hidden">
          {RINGS.map((ring) => (
            <motion.circle
              key={ring.radius}
              cx="88"
              cy="88"
              r={ring.radius}
              fill="none"
              stroke={ring.color}
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={ring.dasharray}
              style={{ transformOrigin: "88px 88px" }}
              animate={{ rotate: 360 * ring.direction }}
              transition={{ duration: ring.duration, repeat: Infinity, ease: "linear" }}
            />
          ))}
        </svg>

        {/* A static, evenly-spaced version for anyone who's asked their OS
            to reduce motion - still reads as a mark, just not a spinner. */}
        <svg viewBox="0 0 176 176" className="absolute inset-0 hidden h-full w-full motion-reduce:block">
          {RINGS.map((ring) => (
            <circle
              key={ring.radius}
              cx="88"
              cy="88"
              r={ring.radius}
              fill="none"
              stroke={ring.color}
              strokeWidth="5"
              strokeLinecap="round"
              strokeOpacity="0.5"
            />
          ))}
        </svg>

        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="relative h-16 w-16 motion-reduce:animate-none"
        >
          <Image
            src="/images/logos/qa-solucity-logo.png"
            alt="QA Solucity"
            fill
            sizes="64px"
            className="object-contain drop-shadow-[0_8px_20px_rgba(79,70,229,0.35)]"
            priority
          />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="flex flex-col items-center gap-2"
      >
        <span className="text-sm font-semibold tracking-tight text-foreground">QA Solucity</span>
        <span className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 motion-reduce:opacity-60"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2, ease: "easeInOut" }}
            />
          ))}
        </span>
      </motion.div>
    </div>
  );
}
