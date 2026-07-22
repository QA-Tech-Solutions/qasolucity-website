import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import TechGrid from "./TechGrid";

export default function TrustedBy() {
  return (
    <Section className="py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-indigo-100 bg-indigo-50 px-5 py-2 text-sm font-semibold text-indigo-700">
            Modern QA Ecosystem
          </span>

          <h2 className="mt-8 text-5xl font-bold tracking-tight text-slate-900">
            Built for Modern Software Teams
          </h2>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-slate-600">
            We leverage industry-leading testing frameworks, automation
            platforms, and quality engineering tools to help teams ship
            reliable software faster.
          </p>
        </div>

        <TechGrid />
      </Container>
    </Section>
  );
}