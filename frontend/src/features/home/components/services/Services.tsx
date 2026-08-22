import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import SectionHeader from "./SectionHeader";
import ServiceGrid from "./ServiceGrid";

export default function Services() {
  return (
    <Section className="relative overflow-hidden bg-[linear-gradient(135deg,_#faf8f4_0%,_#f7f3ff_48%,_#f8fafc_100%)] dark:bg-[linear-gradient(135deg,_#020617_0%,_#0b0f2e_50%,_#1a0e1f_100%)] py-40">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -left-24 -top-24 h-[480px] w-[480px] rounded-full bg-indigo-100/50 dark:bg-indigo-900/25 blur-[140px]" />
        <div className="absolute bottom-[-8%] right-[-4%] h-[520px] w-[520px] rounded-full bg-violet-100/50 dark:bg-violet-900/25 blur-[150px]" />
        <div className="absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/60 dark:bg-slate-800/20 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.035] dark:hidden"
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(250,248,244,0.9)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_30%,rgba(2,6,23,0.5)_100%)]" />
      </div>

      <Container>
        <div className="rounded-[20px] border border-white/70 dark:border-slate-800/70 bg-white/70 dark:bg-slate-900/70 p-6 shadow-[0_20px_4px_-28px_rgba(15,23,42,0.24)] backdrop-blur sm:px-8 sm:py-12">
          <SectionHeader />
          <div className="mt-12">
            <ServiceGrid />
          </div>
        </div>
      </Container>
    </Section>
  );
}