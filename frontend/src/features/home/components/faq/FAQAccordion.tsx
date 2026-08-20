"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { faqs } from "./faqs-data";
import FAQItem from "./FAQItem";

export default function FAQAccordion() {
  const [open, setOpen] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
      className="space-y-5"
    >
      {faqs.map((faq, index) => (
        <motion.div
          key={faq.question}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.08 }}
        >
          <FAQItem
            index={index}
            faq={faq}
            open={open === index}
            onClick={() => setOpen(open === index ? -1 : index)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}