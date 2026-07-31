"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { motion } from "framer-motion";

import ExpertiseHeader from "./ExpertiseHeader";
import ExpertiseItem from "./ExpertiseItem";
import { expertise } from "./expertise-data";

export default function Expertise() {
  return (
    <Section className="relative overflow-hidden bg-slate-50 py-32">
      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-20 top-1/2 h-[500px] w-[500px] rounded-full bg-violet-100/30 blur-3xl"
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
        <ExpertiseHeader />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
          className="mx-auto mt-16 max-w-7xl lg:mt-24"
        >
          {expertise.map((item) => (
            <ExpertiseItem key={item.title} {...item} />
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}