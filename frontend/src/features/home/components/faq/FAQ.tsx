import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import FAQAccordion from "./FAQAccordion";
import FAQHeader from "./FAQHeader";
import FAQSidebar from "./FAQSidebar";

export default function FAQ() {
  return (
    <Section className="relative overflow-clip bg-[#FCFBF8] dark:bg-[#020617] py-32">
      {/* Background Design */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute -left-40 top-20 h-[500px] w-[500px] rounded-full bg-indigo-100/30 dark:bg-indigo-900/20 blur-[140px]" />
        <div className="absolute -right-40 bottom-0 h-[550px] w-[550px] rounded-full bg-violet-100/30 dark:bg-violet-900/20 blur-[170px]" />
        <div className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-50/40 dark:bg-indigo-900/15 blur-[120px]" />

        {/* Subtle Grid */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:hidden"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0f172a 1px, transparent 1px),
              linear-gradient(to bottom, #0f172a 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />
        <div
          className="absolute inset-0 hidden opacity-[0.05] dark:block"
          style={{
            backgroundImage: `
              linear-gradient(to right, #f1f5f9 1px, transparent 1px),
              linear-gradient(to bottom, #f1f5f9 1px, transparent 1px)
            `,
            backgroundSize: "48px 48px",
          }}
        />

        {/* Radial Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(252,251,248,0.7)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_30%,rgba(2,6,23,0.5)_100%)]" />
      </div>

      <Container>
        <FAQHeader />
        <div className="mt-14 flex flex-col gap-10 lg:mt-20 lg:flex-row lg:gap-20">
          <div className="w-full lg:flex-1">
            <FAQAccordion />
          </div>
          <div className="w-full lg:w-[380px] lg:shrink-0">
            <FAQSidebar />
          </div>
        </div>
      </Container>
    </Section>
  );
}