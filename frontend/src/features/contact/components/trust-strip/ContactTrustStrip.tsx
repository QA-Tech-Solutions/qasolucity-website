import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

import TrustItem from "./TrustItem";
import { trustItems } from "./trust-data";

export default function ContactTrustStrip() {
  return (
    <Section className="py-20">

      <Container>

        <div className="rounded-[36px] border border-slate-200 bg-white p-10 shadow-lg shadow-slate-200/40">

          <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">

            {trustItems.map((item) => (
              <TrustItem
                key={item.title}
                {...item}
              />
            ))}

          </div>

        </div>

      </Container>

    </Section>
  );
}