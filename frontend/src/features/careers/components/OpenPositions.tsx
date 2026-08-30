import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import { getAllJobs, isJobOpen } from "@/lib/careers";
import JobCard from "./JobCard";
import CareersEmptyState from "./CareersEmptyState";
import PitchYourselfCTA from "./PitchYourselfCTA";

export default function OpenPositions() {
  const jobs = getAllJobs();
  const openCount = jobs.filter(isJobOpen).length;

  const departments = Array.from(new Set(jobs.map((job) => job.department)));

  return (
    <Section id="open-roles" className="bg-slate-50 dark:bg-slate-950 py-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">
            Roles
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
            {openCount > 0 ? "Find your next role." : "Nothing open right now."}
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">
            {openCount > 0
              ? "Browse our current openings below and apply directly. We read every application ourselves."
              : "That changes fast around here. Here's how to stay on our radar."}
          </p>
        </div>

        {jobs.length === 0 ? (
          <div className="mt-14">
            <CareersEmptyState />
          </div>
        ) : (
          <>
            <div className="mt-14 space-y-14">
              {departments.map((department) => {
                const departmentJobs = jobs
                  .filter((job) => job.department === department)
                  .sort((a, b) => Number(isJobOpen(b)) - Number(isJobOpen(a)));
                const departmentOpenCount = departmentJobs.filter(isJobOpen).length;
                return (
                  <div key={department}>
                    <div className="flex items-center gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                        {department}
                      </h3>
                      <span className="rounded-full border border-indigo-100 dark:border-indigo-900/60 bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-indigo-700 dark:text-indigo-300">
                        {departmentOpenCount} open
                      </span>
                      {departmentJobs.length > departmentOpenCount && (
                        <span className="rounded-full border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
                          {departmentJobs.length - departmentOpenCount} closed
                        </span>
                      )}
                    </div>
                    <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {departmentJobs.map((job, index) => (
                        <JobCard key={job.slug} job={job} delay={index * 0.06} />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            <PitchYourselfCTA />
          </>
        )}
      </Container>
    </Section>
  );
}
