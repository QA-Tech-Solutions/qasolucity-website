"use client";

import { useState } from "react";

import { faqs } from "./faqs";
import FAQItem from "./FAQItem";

export default function FAQAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <div className="space-y-7">
      {faqs.map((faq, index) => (
        <FAQItem
          key={faq.question}
          index={index}
          faq={faq}
          open={open === index}
          onClick={() => setOpen(open === index ? -1 : index)}
        />
      ))}
    </div>
  );
}