"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";

import { testimonials, type Testimonial } from "./testimonials-data";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

function Avatar({ testimonial }: { testimonial: Testimonial }) {
  if (testimonial.image) {
    return (
      <Image
        src={testimonial.image}
        alt={testimonial.name}
        width={44}
        height={44}
        className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-white dark:ring-slate-900"
      />
    );
  }

  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-sm font-bold text-white ring-2 ring-white dark:ring-slate-900">
      {getInitials(testimonial.name)}
    </div>
  );
}

export default function TestimonialSlider() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  // The real number of "pages" to scroll through - not the raw testimonial
  // count. At the lg breakpoint 3 cards show at once, so 3 testimonials is
  // one page (nothing to slide to); this also changes on resize as the
  // per-view card count changes across breakpoints, so it's tracked as
  // state and recomputed on every embla reInit, not read once.
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      containScroll: "trimSnaps",
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

  const onReInit = useCallback(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!emblaApi) return;
    // Syncs local state with embla's own current index/snap list right
    // after it mounts, then on every subsequent slide change or re-layout
    // (e.g. a resize crossing a breakpoint) via the listeners below.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync with the just-initialized carousel instance, not a value with its own external subscription yet
    onReInit();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onReInit);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onReInit);
    };
  }, [emblaApi, onSelect, onReInit]);

  const hasMultiplePages = scrollSnaps.length > 1;

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-6 flex">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="min-w-0 flex-[0_0_100%] pl-6 sm:flex-[0_0_50%] lg:flex-[0_0_33.3333%]"
            >
              <div className="group flex h-full flex-col rounded-[28px] border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-7 shadow-[0_18px_60px_-24px_rgba(15,23,42,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 dark:hover:border-indigo-700 hover:shadow-[0_24px_70px_-22px_rgba(79,70,229,0.28)]">
                <div className="flex items-center justify-between">
                  <div className="flex gap-0.5">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="h-8 w-8 text-indigo-100 dark:text-indigo-900/60" strokeWidth={1} />
                </div>

                <p className="mt-5 flex-1 text-[15px] leading-7 text-slate-600 dark:text-slate-400">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>

                <div className="mt-6 flex items-center gap-3 border-t border-slate-100 dark:border-slate-800 pt-5">
                  <Avatar testimonial={testimonial} />
                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-900 dark:text-slate-100">
                      {testimonial.name}
                    </p>
                    <p className="truncate text-sm text-slate-500 dark:text-slate-400">
                      {testimonial.role} &middot; {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {hasMultiplePages && (
        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            onClick={scrollPrev}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-md"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="h-5 w-5 text-slate-700 dark:text-slate-300" />
          </button>

          <div className="flex gap-2.5">
            {scrollSnaps.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-2 rounded-full transition-all duration-500 ${
                  selectedIndex === index
                    ? "w-8 bg-indigo-600"
                    : "w-2 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400"
                }`}
                aria-label={`Go to testimonial page ${index + 1}`}
              />
            ))}
          </div>

          <button
            onClick={scrollNext}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-md"
            aria-label="Next testimonials"
          >
            <ChevronRight className="h-5 w-5 text-slate-700 dark:text-slate-300" />
          </button>
        </div>
      )}
    </div>
  );
}
