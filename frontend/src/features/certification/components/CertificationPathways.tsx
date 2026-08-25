import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import PathwayCard from "./PathwayCard";
import { pathways } from "../data/certification-data";
import { getCertificationPricing } from "@/lib/certification-pricing";

const nairaFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

export default async function CertificationPathways() {
  const pricing = await getCertificationPricing();
  const bundlePriceLabel = nairaFormatter.format(pricing.bundlePriceNgn);

  const livePathways = pathways.map((pathway) =>
    pathway.track === "bundle" ? { ...pathway, priceLabel: bundlePriceLabel } : pathway
  );

  return (
    <Section id="pathways" className="bg-white dark:bg-slate-900 py-20 sm:py-28">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">
            Choose your route
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
            Same training. Two ways to handle your exam.
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
            Both routes get you the same live classes, study materials, and mock exams.
            The only difference is who books and pays for your official exam seat.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-8 lg:grid-cols-2 lg:items-start lg:gap-10">
          {livePathways.map((pathway) => (
            <PathwayCard key={pathway.track} pathway={pathway} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
