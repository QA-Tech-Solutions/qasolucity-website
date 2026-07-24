"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import {
    Quote,
    Star,
    ChevronLeft,
    ChevronRight,
    BadgeCheck,
} from "lucide-react";

import { testimonials } from "./testimonials";

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
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="min-w-0 flex-[0_0_100%]"
                        >
                            <div className="grid items-center gap-16 lg:grid-cols-2">

                                {/* ===== IMAGE SIDE ===== */}
                                <div className="relative mx-auto flex justify-center">

                                    {/* Glows */}
                                    <div className="absolute -left-16 top-10 h-60 w-60 rounded-full bg-indigo-100/70 blur-3xl" />
                                    <div className="absolute -right-16 bottom-6 h-72 w-72 rounded-full bg-violet-100/70 blur-3xl" />

                                    {/* Quarter-circle decorations */}
                                    <div className="absolute -left-10 -top-10 h-44 w-44 rounded-tl-[120px] border-l-[18px] border-t-[18px] border-indigo-100/60" />
                                    <div className="absolute -right-10 -bottom-10 h-44 w-44 rounded-br-[120px] border-b-[18px] border-r-[18px] border-indigo-100/60" />

                                    {/* Decorative dots */}
                                    <div className="absolute -left-14 bottom-20 grid grid-cols-5 gap-2 opacity-40">
                                        {Array.from({ length: 25 }).map((_, i) => (
                                            <span
                                                key={i}
                                                className="h-1.5 w-1.5 rounded-full bg-indigo-300"
                                            />
                                        ))}
                                    </div>

                                    {/* Image card */}
                                    <div className="relative overflow-hidden rounded-[36px] border border-slate-200/80 bg-white p-4 shadow-[0_35px_90px_rgba(15,23,42,.12)]">
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="h-[580px] w-[450px] rounded-[28px] object-cover transition duration-700 hover:scale-105"
                                        />
                                    </div>

                                    {/* Nav buttons */}
                                    <button
                                        onClick={scrollPrev}
                                        className="absolute left-0 top-1/2 z-20 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/90 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-[55%] hover:scale-105 hover:bg-white"
                                        aria-label="Previous testimonial"
                                    >
                                        <ChevronLeft className="h-5 w-5 text-slate-700" />
                                    </button>

                                    <button
                                        onClick={scrollNext}
                                        className="absolute right-0 top-1/2 z-20 flex h-12 w-12 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-white/90 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-[55%] hover:scale-105 hover:bg-white"
                                        aria-label="Next testimonial"
                                    >
                                        <ChevronRight className="h-5 w-5 text-slate-700" />
                                    </button>
                                </div>

                                {/* ===== CONTENT SIDE ===== */}
                                <div className="relative max-w-xl">

                                    {/* Quote icon — subtle, positioned top-right */}
                                    <Quote
                                        className="absolute -right-4 -top-6 h-28 w-28 text-indigo-100/60 rotate-6"
                                        strokeWidth={0.8}
                                    />

                                    {/* Stars + rating */}
                                    <div className="relative z-10 flex items-center gap-4">
                                        <div className="flex gap-1">
                                            {[...Array(testimonial.rating)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className="h-5 w-5 fill-amber-400 text-amber-400"
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm font-medium text-slate-500">
                                            Rated 5.0 by our clients
                                        </span>
                                    </div>

                                    {/* Quote text — refined typography */}
                                    <blockquote className="relative mt-8 text-[30px] font-serif font-medium leading-[1.45] tracking-tight text-slate-900 lg:text-[38px]">
                                        <span className="relative">
                                            {testimonial.quote}
                                        </span>
                                    </blockquote>

                                    {/* Author & meta */}
                                    <div className="mt-12">
                                        <h4 className="text-2xl font-bold text-slate-900">
                                            {testimonial.name}
                                        </h4>
                                        <p className="mt-1.5 text-[17px] text-slate-500">
                                            {testimonial.role}
                                        </p>
                                        <p className="mt-0.5 font-semibold text-indigo-600">
                                            {testimonial.company}
                                        </p>

                                        {/* Badges */}
                                        <div className="mt-6 flex flex-wrap items-center gap-3">
                                            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3.5 py-1.5 text-xs font-semibold text-green-700 border border-green-100/50">
                                                <BadgeCheck className="h-3.5 w-3.5" />
                                                Verified Client
                                            </span>
                                            <span className="text-sm text-slate-400">
                                                100% Recommended
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ===== DOTS ===== */}
            <div className="mt-20 flex justify-center gap-4">
                {testimonials.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => emblaApi?.scrollTo(index)}
                        className={`h-2 rounded-full transition-all duration-500 ${
                            selectedIndex === index
                                ? "w-12 bg-indigo-600"
                                : "w-6 bg-slate-300 hover:bg-slate-400"
                        }`}
                        aria-label={`Go to testimonial ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}