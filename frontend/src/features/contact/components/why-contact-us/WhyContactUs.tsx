import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import WhyContactCard from "./WhyContactCard";
import { reasons } from "./why-contact-data";

export default function WhyContactUs() {
  return (
    <Section className="bg-slate-50 py-32">

      <Container>

        <div className="mx-auto max-w-3xl text-center">

          <span className="text-sm font-semibold uppercase tracking-[0.28em] text-indigo-600">
            Why Work With Us
          </span>

          <h2 className="mt-5 text-5xl font-bold tracking-tight text-slate-900">
            More than a testing partner.
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-600">
            We help engineering teams build confidence, ship faster
            and deliver exceptional software experiences.
          </p>

        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2">

          {reasons.map((reason) => (
            <WhyContactCard
              key={reason.title}
              {...reason}
            />
          ))}

        </div>

      </Container>

    </Section>
  );
}