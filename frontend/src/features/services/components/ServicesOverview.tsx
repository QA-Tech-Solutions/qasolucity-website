"use client";

import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { motion } from "framer-motion";
import { services, serviceCategories } from "../data/services";
import ServiceCard from "./ServiceCard";

export default function ServicesOverview() {
  return (
    <Section id="services" className="bg-white dark:bg-slate-900 py-28">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">
            Our service portfolio
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-5xl">
            Flexible support for every stage{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
              of quality delivery.
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-400">
            Whether you need a dedicated testing partner, advisory guidance,
            or a training program that lifts your team fast, we design the
            engagement around your goals.
          </p>
        </motion.div>

        <div className="mt-20 space-y-20">
          {serviceCategories.map((category) => {
            const categoryServices = services.filter(
              (service) => service.category === category.name
            );

            return (
              <div
                key={category.name}
                id={category.name.toLowerCase().replace(/\s+/g, "-")}
                className="scroll-mt-28"
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col gap-3 border-b border-slate-200 dark:border-slate-800 pb-6 sm:flex-row sm:items-end sm:justify-between"
                >
                  <div>
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                      {category.name}
                    </h3>
                    <p className="mt-2 max-w-xl text-[15px] leading-7 text-slate-600 dark:text-slate-400">
                      {category.description}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border border-indigo-100 dark:border-indigo-900/60 bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700 dark:text-indigo-300">
                    {categoryServices.length} services
                  </span>
                </motion.div>

                <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {categoryServices.map((service, index) => (
                    <ServiceCard
                      key={service.slug}
                      service={service}
                      delay={index * 0.08}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
