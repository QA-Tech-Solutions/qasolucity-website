"use client";

import { Minus, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQ } from "./faqs-data";

interface Props {
  faq: FAQ;
  index: number;
  open: boolean;
  onClick: () => void;
}

export default function FAQItem({
  faq,
  index,
  open,
  onClick,
}: Props) {
  return (
    <motion.article
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={`
        overflow-hidden
        rounded-[24px]
        border
        transition-all
        duration-300
        ${
          open
            ? "border-indigo-200 bg-white shadow-xl shadow-indigo-100/30"
            : "border-slate-200/80 bg-white/80 hover:border-indigo-200 hover:shadow-lg hover:shadow-indigo-100/10"
        }
      `}
    >
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between px-8 py-7 text-left transition-colors duration-300 hover:bg-slate-50/50"
      >
        <div className="flex items-center gap-6">
          <span
            className={`
              text-sm
              font-bold
              tracking-[0.25em]
              transition-colors
              duration-300
              ${
                open
                  ? "text-indigo-600"
                  : "text-slate-300 group-hover:text-indigo-400"
              }
            `}
          >
            {(index + 1).toString().padStart(2, "0")}
          </span>

          <h3 className="text-lg font-semibold text-slate-900 md:text-xl">
            {faq.question}
          </h3>
        </div>

        <div
          className={`
            flex
            h-11
            w-11
            shrink-0
            items-center
            justify-center
            rounded-full
            transition-all
            duration-300
            ${
              open
                ? "bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/20"
                : "bg-slate-100 text-slate-700 hover:bg-indigo-50 hover:text-indigo-600"
            }
          `}
        >
          {open ? (
            <Minus className="h-5 w-5" />
          ) : (
            <Plus className="h-5 w-5" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="overflow-hidden">
              {/* Top accent bar when open */}
              <div className="mx-8 h-0.5 bg-gradient-to-r from-indigo-500 to-violet-500" />
              
              <div className="px-8 pb-7 pt-5">
                <p className="text-[16px] leading-7 text-slate-600 md:text-[17px] md:leading-8">
                  {faq.answer}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}