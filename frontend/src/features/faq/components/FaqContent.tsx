"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Search, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { Input } from "@/components/ui/Input";
import { faqs, faqCategories, type FaqEntry } from "../data/faq-data";

function FaqItem({ faq, index }: { faq: FaqEntry; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: Math.min(index, 8) * 0.05 }}
      className={`overflow-hidden rounded-[24px] border transition-all duration-300 ${
        isOpen
          ? "border-indigo-200 bg-white shadow-lg shadow-indigo-100/30"
          : "border-slate-200/80 bg-white/80 hover:border-indigo-200"
      }`}
    >
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between gap-4 px-7 py-6 text-left"
      >
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-500">
            {faq.category}
          </span>
          <h3 className="mt-1 text-base font-semibold text-slate-900 md:text-lg">
            {faq.question}
          </h3>
        </div>
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
            isOpen
              ? "bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20"
              : "bg-slate-100 text-slate-700"
          }`}
        >
          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-7 pb-6">
              <p className="text-[15px] leading-7 text-slate-600">{faq.answer}</p>
              {faq.source && (
                <Link
                  href={faq.source.href}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  More about {faq.source.label}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export default function FaqContent() {
  const [activeCategory, setActiveCategory] =
    useState<(typeof faqCategories)[number]>("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const byCategory =
      activeCategory === "All"
        ? faqs
        : faqs.filter((faq) => faq.category === activeCategory);

    const q = query.trim().toLowerCase();
    if (!q) return byCategory;

    return byCategory.filter(
      (faq) =>
        faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q)
    );
  }, [activeCategory, query]);

  return (
    <Section id="faq" className="bg-white py-20">
      <Container>
        <div className="mx-auto mb-10 max-w-xl">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search questions..."
              aria-label="Search FAQs"
              className="h-14 rounded-2xl border-slate-200 pl-11"
            />
          </div>
        </div>

        <div className="mb-14 flex flex-wrap items-center justify-center gap-3">
          {faqCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              aria-label={`Filter FAQs by ${category}`}
              aria-pressed={activeCategory === category}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                activeCategory === category
                  ? "border-indigo-600 bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                  : "border-slate-200 bg-white text-slate-600 hover:border-indigo-200 hover:text-indigo-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="mx-auto max-w-3xl space-y-4">
            {filtered.map((faq, index) => (
              <FaqItem key={`${faq.category}-${faq.question}`} faq={faq} index={index} />
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-500">
            No questions match your search yet. Try a different term, or{" "}
            <Link href="/contact" className="font-semibold text-indigo-600 hover:text-indigo-700">
              ask us directly
            </Link>
            .
          </p>
        )}
      </Container>
    </Section>
  );
}
