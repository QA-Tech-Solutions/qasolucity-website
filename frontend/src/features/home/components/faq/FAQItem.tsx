"use client";

import { Minus, Plus } from "lucide-react";

import { FAQ } from "./faqs";

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
    <article
      className={`
        overflow-hidden
        rounded-[28px]
        border
        transition-all
        duration-300
        ${
          open
            ? "border-indigo-200 bg-white shadow-xl shadow-indigo-100/20"
            : "border-slate-200 bg-white hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
        }
      `}
    >
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between px-10 py-9 text-left"
      >
        <div className="flex items-center gap-6">
          <span
            className={`
              text-sm
              font-bold
              tracking-[0.25em]
              ${
                open
                  ? "text-indigo-600"
                  : "text-slate-300"
              }
            `}
          >
            {(index + 1).toString().padStart(2, "0")}
          </span>

          <h3 className="text-xl font-semibold text-slate-900">
            {faq.question}
          </h3>
        </div>

        <div
          className={`
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            transition-all
            duration-300
            ${
              open
                ? "bg-indigo-600 text-white"
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

      <div
        className={`grid transition-all duration-300 ${
          open
            ? "grid-rows-[1fr]"
            : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="pl-[92px] pr-24 pb-8">
            <p className="text-[18px] leading-8 text-slate-600">
              {faq.answer}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}