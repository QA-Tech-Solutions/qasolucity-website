"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRef, useEffect, useState } from "react";
import { slugify } from "@/lib/slugify";

// ----- Data -----
const topRow = [
  "Manual Testing",
  "Automation Testing",
  "API Testing",
  "Performance Testing",
  "Accessibility Testing",
  "Security Testing",
  "Regression Testing",
  "Smoke Testing",
  "Sanity Testing",
  "Integration Testing",
  "System Testing",
  "User Acceptance Testing",
  "Unit Testing",
  "Component Testing",
  "End-to-End Testing",
  "Exploratory Testing",
  "Ad-hoc Testing",
  "Compatibility Testing",
  "Localization Testing",
  "Globalization Testing",
  "Reliability Testing",
  "Usability Testing",
];

const bottomRow = [
  "Cross Browser Testing",
  "Mobile Testing",
  "Playwright",
  "Cypress",
  "Selenium",
  "Appium",
  "Postman",
  "JMeter",
  "TestRail",
  "JIRA",
  "QTest",
  "SoapUI",
  "Katalon Studio",
  "TestComplete",
  "LoadRunner",
  "Gatling",
  "NeoLoad",
  "Testim",
  "Mabl",
  "Bugzilla",
  "TestLink",
  "Zephyr",
  "XRay",
];

// ----- Stars Background Component -----
function Stars() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Generate star data once
  const stars = useRef<
    Array<{
      x: number;
      y: number;
      radius: number;
      baseOpacity: number;
      speed: number;
    }>
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (rect) {
        canvas.width = rect.width;
        canvas.height = rect.height;
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    resize();
    window.addEventListener("resize", resize);

    // Generate stars
    const count = 150;
    stars.current = Array.from({ length: count }, () => ({
      x: Math.random(),
      y: Math.random(),
      radius: 0.5 + Math.random() * 1.5,
      baseOpacity: 0.2 + Math.random() * 0.6,
      speed: 0.005 + Math.random() * 0.02,
    }));

    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || dimensions.width === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const draw = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.current.forEach((star) => {
        const x = star.x * canvas.width;
        const y = star.y * canvas.height;
        const opacity =
          star.baseOpacity + 0.2 * Math.sin(time * star.speed * 10);
        const radius = star.radius * (0.8 + 0.2 * Math.sin(time * star.speed * 8));

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationId);
  }, [dimensions]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

// ----- Main Component -----
interface TechMarqueeProps {
  existingSlugs?: string[];
}

export default function TechMarquee({ existingSlugs = [] }: TechMarqueeProps) {
  const duplicate = (arr: string[]) => [...arr, ...arr];
  const slugSet = new Set(existingSlugs);

  return (
    <section className="relative overflow-hidden bg-slate-900 py-10">
      {/* Stars background */}
      <Stars />

      {/* Animated orbs – now behind content but above stars */}
      <motion.div
        className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-indigo-500/30 blur-3xl"
        style={{ zIndex: 1 }}
        animate={{
          x: ["0%", "15%", "0%"],
          y: ["0%", "-15%", "0%"],
          scale: [1, 1.15, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 14,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -right-40 bottom-20 h-96 w-96 rounded-full bg-violet-500/30 blur-3xl"
        style={{ zIndex: 1 }}
        animate={{
          x: ["0%", "-15%", "0%"],
          y: ["0%", "15%", "0%"],
          scale: [1, 1.2, 1],
        }}
        transition={{
          repeat: Infinity,
          duration: 16,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10 flex flex-col gap-8">
        {/* Row 1 – left */}
        <div className="overflow-hidden">
          <div
            className="marquee marquee-left flex w-max gap-6 will-change-transform"
            style={{
              backfaceVisibility: "hidden",
              transformStyle: "preserve-3d",
            }}
          >
            {duplicate(topRow).map((item, idx) => {
              const slug = slugify(item);
              const hasPost = slugSet.has(slug);
              const pillClassName =
                "group relative inline-flex items-center rounded-full bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm ring-1 ring-white/10 transition-all duration-300 hover:bg-white/15 hover:ring-indigo-400/60 hover:shadow-lg hover:shadow-indigo-500/20 overflow-visible";
              const label = (
                <span className="relative">
                  {item}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-indigo-400 to-violet-400 transition-all duration-300 group-hover:w-full" />
                </span>
              );

              return (
                <div key={`${item}-${idx}`} className="flex items-center gap-6 whitespace-nowrap">
                  {hasPost ? (
                    <Link href={`/blogs/${slug}`} className={pillClassName}>
                      {label}
                    </Link>
                  ) : (
                    <span className={pillClassName}>{label}</span>
                  )}
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-400/40" />
                </div>
              );
            })}
          </div>
        </div>

        {/* Row 2 – right */}
        <div className="overflow-hidden">
          <div
            className="marquee marquee-right flex w-max gap-6 will-change-transform"
            style={{
              backfaceVisibility: "hidden",
              transformStyle: "preserve-3d",
            }}
          >
            {duplicate(bottomRow).map((item, idx) => {
              const slug = slugify(item);
              const hasPost = slugSet.has(slug);
              const pillClassName =
                "group relative inline-flex items-center rounded-full bg-white/5 px-6 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white backdrop-blur-sm ring-1 ring-white/10 transition-all duration-300 hover:bg-white/15 hover:ring-violet-400/60 hover:shadow-lg hover:shadow-violet-500/20 overflow-visible";
              const label = (
                <span className="relative">
                  {item}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-violet-400 to-indigo-400 transition-all duration-300 group-hover:w-full" />
                </span>
              );

              return (
                <div key={`${item}-${idx}`} className="flex items-center gap-6 whitespace-nowrap">
                  {hasPost ? (
                    <Link href={`/blogs/${slug}`} className={pillClassName}>
                      {label}
                    </Link>
                  ) : (
                    <span className={pillClassName}>{label}</span>
                  )}
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400/40" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}