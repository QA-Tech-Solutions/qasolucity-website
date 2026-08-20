"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import ContactFAQItem from "./ContactFAQItem";
import { contactFaqs } from "./contact-faq-data";

export default function ContactFAQAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
      className="mx-auto mt-12 max-w-4xl space-y-5"
    >
      {contactFaqs.map((faq, index) => (
        <motion.div
          key={faq.question}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.08 }}
        >
          <ContactFAQItem
            faq={faq}
            index={index}
            open={open === index}
            onClick={() => setOpen(open === index ? -1 : index)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}