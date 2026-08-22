"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence } from "framer-motion";

import {
  Quote,
  Star,
  ChevronLeft,
  ChevronRight,
  BadgeCheck,
} from "lucide-react";

import { testimonials } from "./testimonials-data";

export default function TestimonialSlider() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
    },
    [
      Autoplay({
        delay: 6000,
        stopOnInteraction: false,
      }),
    ]
  );

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="min-w-0 flex-[0_0_100%]"
            >
              <div className="grid items-center gap-8 sm:gap-12 lg:gap-16 lg:grid-cols-2">
                {/* ===== IMAGE SIDE ===== */}
                <div className="relative mx-auto flex justify-center">
                  {/* Glows */}
                  <div className="absolute -left-12 top-10 h-48 w-48 rounded-full bg-indigo-100/60 dark:bg-indigo-900/30 blur-3xl" />
                  <div className="absolute -right-12 bottom-10 h-56 w-56 rounded-full bg-violet-100/60 dark:bg-violet-900/30 blur-3xl" />

                  {/* Decorative elements */}
                  <div className="absolute -left-8 -top-8 h-32 w-32 rounded-tl-[80px] border-l-[14px] border-t-[14px] border-indigo-100/50 dark:border-indigo-800/40" />
                  <div className="absolute -right-8 -bottom-8 h-32 w-32 rounded-br-[80px] border-b-[14px] border-r-[14px] border-indigo-100/50 dark:border-indigo-800/40" />

                  {/* Decorative dots - simplified */}
                  <div className="absolute -left-10 bottom-16 grid grid-cols-4 gap-2 opacity-30">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-indigo-300"
                      />
                    ))}
                  </div>

                  {/* Image card - smaller */}
                  <div className="relative overflow-hidden rounded-[28px] border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-3 shadow-[0_25px_60px_rgba(15,23,42,.10)]">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={340}
                      height={400}
                      sizes="340px"
                      priority={index === 0}
                      className="h-[280px] w-full max-w-[340px] rounded-[20px] object-cover transition duration-700 hover:scale-105 sm:h-[340px] lg:h-[400px]"
                    />
                    {/* Gradient overlay for depth */}
                    <div className="absolute inset-3 rounded-[20px] bg-gradient-to-t from-slate-900/10 via-transparent to-transparent pointer-events-none" />
                  </div>

                  {/* Nav buttons */}
                  <button
                    onClick={scrollPrev}
                    className="absolute left-0 top-1/2 z-20 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 dark:border-slate-700/50 bg-white/90 dark:bg-slate-900/90 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-[55%] hover:scale-105 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                  </button>

                  <button
                    onClick={scrollNext}
                    className="absolute right-0 top-1/2 z-20 flex h-11 w-11 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 dark:border-slate-700/50 bg-white/90 dark:bg-slate-900/90 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-[55%] hover:scale-105 hover:bg-white dark:hover:bg-slate-800 hover:shadow-xl"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                  </button>
                </div>

                {/* ===== CONTENT SIDE ===== */}
                <div className="relative max-w-lg">
                  {/* Quote icon */}
                  <Quote
                    className="absolute -right-4 -top-8 h-24 w-24 text-indigo-100/60 dark:text-indigo-900/40 rotate-6"
                    strokeWidth={0.8}
                  />

                  {/* Stars + rating */}
                  <div className="relative z-10 flex items-center gap-3">
                    <div className="flex gap-0.5">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 fill-amber-400 text-amber-400"
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                      Rated 5.0
                    </span>
                  </div>

                  {/* Quote text */}
                  <motion.blockquote
                    key={testimonial.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="relative mt-6 text-[26px] font-serif font-medium leading-[1.45] tracking-tight text-slate-900 dark:text-slate-100 lg:text-[32px]"
                  >
                    "{testimonial.quote}"
                  </motion.blockquote>

                  {/* Author & meta */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="mt-10"
                  >
                    <h4 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {testimonial.name}
                    </h4>
                    <p className="mt-1 text-[16px] text-slate-500 dark:text-slate-400">
                      {testimonial.role}
                    </p>
                    <p className="mt-0.5 font-semibold text-indigo-600 dark:text-indigo-400">
                      {testimonial.company}
                    </p>

                    {/* Badges */}
                    <div className="mt-5 flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 dark:bg-emerald-950/40 px-3.5 py-1.5 text-xs font-semibold text-green-700 dark:text-emerald-300 border border-green-100/50 dark:border-emerald-800/40">
                        <BadgeCheck className="h-3.5 w-3.5" />
                        Verified Client
                      </span>
                      <span className="text-sm text-slate-400 dark:text-slate-500">
                        ★ 100% Recommended
                      </span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== DOTS ===== */}
      <div className="mt-16 flex justify-center gap-3">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-2.5 rounded-full transition-all duration-500 ${
              selectedIndex === index
                ? "w-10 bg-indigo-600"
                : "w-6 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}