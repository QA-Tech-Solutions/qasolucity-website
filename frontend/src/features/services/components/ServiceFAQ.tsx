"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import type { ServiceFAQ as ServiceFAQType } from "../data/services";

interface Props {
  faqs: ServiceFAQType[];
}

export default function ServiceFAQ({ faqs }: Props) {
  const [open, setOpen] = useState(0);

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = open === index;

        return (
          <motion.article
            key={faq.question}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className={`overflow-hidden rounded-[24px] border transition-all duration-300 ${
              isOpen
                ? "border-indigo-200 bg-white shadow-lg shadow-indigo-100/30"
                : "border-slate-200/80 bg-white/80 hover:border-indigo-200"
            }`}
          >
            <button
              onClick={() => setOpen(isOpen ? -1 : index)}
              className="flex w-full items-center justify-between gap-4 px-7 py-6 text-left"
            >
              <h4 className="text-base font-semibold text-slate-900 md:text-lg">
                {faq.question}
              </h4>
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
                    <p className="text-[15px] leading-7 text-slate-600">
                      {faq.answer}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.article>
        );
      })}
    </div>
  );
}
