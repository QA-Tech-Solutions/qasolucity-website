"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { motion } from "framer-motion";
import { resourceCategories } from "../data/resources";
import ResourceCard from "./ResourceCard";

export default function ResourcesOverview() {
  return (
    <Section id="resources" className="bg-white dark:bg-slate-900 py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">
            Resource library
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-5xl">
            A richer way to keep{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
              quality knowledge close at hand.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
            Each resource is designed to help teams move from idea to action
            with practical structure and useful next steps.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {resourceCategories.map((resource, index) => (
            <ResourceCard key={resource.slug} resource={resource} delay={index * 0.08} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
