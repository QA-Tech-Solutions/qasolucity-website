"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { motion } from "framer-motion";

import ContactFormCard from "./ContactFormCard";
import ContactInfoCard from "./ContactInfoCard";
import FormHeader from "./FormHeader";

export default function ContactForm() {
  return (
    <Section className="relative overflow-hidden bg-[#FCFBF8] dark:bg-[#020617] py-28">
      {/* Background */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-20 top-0 h-[500px] w-[500px] rounded-full bg-indigo-100/40 dark:bg-indigo-900/30 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -left-20 bottom-0 h-[450px] w-[450px] rounded-full bg-violet-100/40 dark:bg-violet-900/25 blur-3xl"
        />
      </div>

      <Container>
        <FormHeader />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mt-16 grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px]"
        >
          <ContactFormCard />
          <ContactInfoCard />
        </motion.div>
      </Container>
    </Section>
  );
}