"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { motion } from "framer-motion";

import TrustItem from "./TrustItem";
import { trustItems } from "./trust-data";

export default function ContactTrustStrip() {
  return (
    <Section className="py-20 bg-white dark:bg-slate-900">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-[32px] border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-8 shadow-lg shadow-slate-200/40 md:p-10"
        >
          {/* Decorative glows */}
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-100/20 dark:bg-indigo-900/20 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-violet-100/20 dark:bg-violet-900/15 blur-3xl pointer-events-none" />

          <div className="relative grid gap-8 md:grid-cols-2 xl:grid-cols-4 xl:divide-x xl:divide-slate-200/70">
            {trustItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <TrustItem {...item} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}