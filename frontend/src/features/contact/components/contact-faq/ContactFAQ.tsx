"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { motion } from "framer-motion";

import ContactFAQAccordion from "./ContactFAQAccordion";
import ContactFAQHeader from "./ContactFAQHeader";

export default function ContactFAQ() {
  return (
    <Section className="relative overflow-hidden bg-[#FCFBF8] py-28">
      {/* Background Design */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-indigo-100/40 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -right-40 bottom-0 h-[450px] w-[450px] rounded-full bg-violet-100/40 blur-3xl"
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0f172a 1px, transparent 1px),
              linear-gradient(to bottom, #0f172a 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <Container>
        <ContactFAQHeader />
        <ContactFAQAccordion />
      </Container>
    </Section>
  );
}