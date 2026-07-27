"use client";

import { useState } from "react";

import ContactFAQItem from "./ContactFAQItem";
import { contactFaqs } from "./contact-faq-data";

export default function ContactFAQAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <div className="mx-auto mt-16 max-w-4xl space-y-6">

      {contactFaqs.map((faq, index) => (
        <ContactFAQItem
          key={faq.question}
          faq={faq}
          index={index}
          open={open === index}
          onClick={() =>
            setOpen(open === index ? -1 : index)
          }
        />
      ))}

    </div>
  );
}