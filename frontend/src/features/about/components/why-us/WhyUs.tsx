"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { motion } from "framer-motion";

import WhyUsFeature from "./WhyUsFeature";
import WhyUsHeader from "./WhyUsHeader";
import { whyUs } from "./why-us-data";

export default function WhyUs() {
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
          className="absolute -left-20 top-1/2 h-[500px] w-[500px] rounded-full bg-indigo-50/40 blur-3xl"
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
        <WhyUsHeader />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.15, delayChildren: 0.2 }}
          className="mt-16 lg:mt-24"
        >
          {whyUs.map((item) => (
            <WhyUsFeature key={item.number} {...item} />
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}