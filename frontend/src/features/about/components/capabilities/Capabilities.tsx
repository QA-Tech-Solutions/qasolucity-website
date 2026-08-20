"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { motion } from "framer-motion";

import CapabilitiesHeader from "./CapabilitiesHeader";
import CapabilityGroup from "./CapabilityGroup";
import { capabilityGroups } from "./capabilities-data";

export default function Capabilities() {
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
        <CapabilitiesHeader />

        <div className="mx-auto mt-16 grid max-w-5xl gap-8 lg:mt-24 lg:grid-cols-2">
          {capabilityGroups.map((group, index) => (
            <CapabilityGroup
              key={group.audience}
              {...group}
              delay={index * 0.15}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
