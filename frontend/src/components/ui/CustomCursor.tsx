"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [trailPos, setTrailPos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const hide = () => setIsVisible(false);
    const show = () => setIsVisible(true);

    // Track hover state for interactive elements
    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest("a, button, input, select, textarea"));
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", hide);
    window.addEventListener("mouseenter", show);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", hide);
      window.removeEventListener("mouseenter", show);
      window.removeEventListener("mouseover", handleHover);
      if (frameRef.current !== null) {
          cancelAnimationFrame(frameRef.current);
          frameRef.current = null;
      }
    };
  }, []);

  // Smooth trailing effect using requestAnimationFrame
  useEffect(() => {
    if (!isVisible) return;

    let lastTime = performance.now();

    const animate = () => {
      const now = performance.now();
      const delta = Math.min((now - lastTime) / 16, 1);
      lastTime = now;

      setTrailPos((prev) => ({
        x: prev.x + (mousePos.x - prev.x) * 0.15 * delta,
        y: prev.y + (mousePos.y - prev.y) * 0.15 * delta,
      }));

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
    if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
    }
    };
  }, [isVisible, mousePos]);

  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return null;
  }

  return (
    <>
      {/* Main Dot – fast, snappy */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[999]"
        animate={{
          x: mousePos.x - 8,
          y: mousePos.y - 8,
          opacity: isVisible ? 1 : 0,
          scale: isHovering ? 1.6 : 1,
        }}
        transition={{
          duration: 0.08,
          ease: "linear",
        }}
        style={{
          willChange: "transform",
          transform: "translate3d(0,0,0)",
        }}
      >
        <div
          className={`
            h-4 w-4 rounded-full
            transition-colors duration-200
            ${isHovering
              ? "bg-indigo-500/40 border-indigo-500 shadow-[0_0_20px_rgba(79,70,229,0.3)]"
              : "bg-indigo-500/20 border-2 border-indigo-500/60 shadow-lg shadow-indigo-500/10"
            }
          `}
          style={{
            willChange: "transform",
            transform: "translate3d(0,0,0)",
          }}
        />
      </motion.div>

      {/* Trail Dot – smooth follow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[999]"
        animate={{
          x: trailPos.x - 4,
          y: trailPos.y - 4,
          opacity: isVisible ? 0.5 : 0,
        }}
        transition={{ duration: 0 }}
        style={{
          willChange: "transform",
          transform: "translate3d(0,0,0)",
        }}
      >
        <div className="h-2 w-2 rounded-full bg-indigo-400/40 blur-[2px]" />
      </motion.div>

      {/* Outer Glow Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[998]"
        animate={{
          x: mousePos.x - 24,
          y: mousePos.y - 24,
          opacity: isVisible ? 0.6 : 0,
          scale: isHovering ? 1.4 : 1,
        }}
        transition={{
          duration: 0.12,
          ease: "easeOut",
        }}
        style={{
          willChange: "transform",
          transform: "translate3d(0,0,0)",
        }}
      >
        <div className="h-12 w-12 rounded-full border border-indigo-400/20 shadow-[0_0_60px_rgba(79,70,229,0.08)]" />
      </motion.div>
    </>
  );
}