import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { Heading } from "@/components/ui/Heading";
import { Text } from "@/components/ui/Text";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { resourceCategories } from "../data/resources";

export default function ResourcesOverview() {
  return (
    <Section id="resources" className="bg-white py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600">Resource library</p>
          <Heading as="h2" level="h2" className="mt-4 text-slate-900">
            A richer way to keep quality knowledge close at hand.
          </Heading>
          <Text className="mt-6 text-lg text-slate-600">
            Each resource is designed to help teams move from idea to action with practical structure and useful next steps.
          </Text>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {resourceCategories.map((resource) => {
            const Icon = resource.icon;

            return (
              <Link
                key={resource.slug}
                href={`/resources/${resource.slug}`}
                className="group rounded-[32px] border border-slate-200/80 bg-gradient-to-br from-white via-white to-slate-50 p-8 shadow-[0_18px_60px_-24px_rgba(15,23,42,0.28)] transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-[0_24px_70px_-22px_rgba(79,70,229,0.28)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/20">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-indigo-700">
                    {resource.eyebrow}
                  </span>
                </div>

                <div className="mt-6">
                  <h3 className="text-2xl font-semibold text-slate-900">{resource.title}</h3>
                  <p className="mt-3 text-base leading-7 text-slate-600">{resource.summary}</p>
                </div>

                <div className="mt-8 flex items-center text-sm font-semibold text-indigo-600">
                  Open resource
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
