"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { motion } from "framer-motion";
import { solutions } from "../data/solutions";
import SolutionCard from "./SolutionCard";

export default function SolutionsOverview() {
  return (
    <Section id="solutions" className="bg-white py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">
            Solution areas
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Quality strategies built{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
              around your context.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            We align our approach to your product stage, delivery model, and
            team maturity so the solution feels practical rather than
            generic.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution, index) => (
            <SolutionCard key={solution.slug} solution={solution} delay={index * 0.06} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
