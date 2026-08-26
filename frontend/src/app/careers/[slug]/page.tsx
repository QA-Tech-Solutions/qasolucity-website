import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";

import JobDetailContent from "@/features/careers/components/JobDetailContent";
import { mdxComponents } from "@/components/mdx/MDXComponents";
import { getJobBySlug, getJobSlugs, getRelatedJobs, isJobOpen } from "@/lib/careers";

interface JobPageProps {
  params: Promise<{ slug: string }>;
}

const EMPLOYMENT_TYPE_SCHEMA: Record<string, string> = {
  "Full-time": "FULL_TIME",
  "Part-time": "PART_TIME",
  Contract: "CONTRACTOR",
  Internship: "INTERN",
};

export async function generateStaticParams() {
  return getJobSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: JobPageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    return {};
  }

  const open = isJobOpen(job);

  return {
    title: open ? job.title : `${job.title} (Closed)`,
    description: job.summary,
    // Closed postings stay reachable (a shared or bookmarked link
    // shouldn't just 404 once a role fills or its deadline passes), but
    // not indexed as if they were still an open listing.
    ...(open
      ? { alternates: { canonical: `/careers/${slug}` } }
      : { robots: { index: false, follow: true } }),
    openGraph: {
      title: job.title,
      description: job.summary,
      type: "article",
      publishedTime: job.postedDate,
    },
  };
}

export default async function JobPage({ params }: JobPageProps) {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  const relatedJobs = getRelatedJobs(job);

  // Google Jobs expects JobPosting markup only for postings actually
  // accepting applications — omit it entirely once a role is closed or
  // its deadline has passed.
  const jsonLd = !isJobOpen(job) ? null : {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.summary,
    datePosted: job.postedDate,
    ...(job.deadline ? { validThrough: job.deadline } : {}),
    employmentType: EMPLOYMENT_TYPE_SCHEMA[job.type] ?? "OTHER",
    hiringOrganization: {
      "@type": "Organization",
      name: "QA Solucity",
      sameAs: "https://qasolucity.com",
      logo: "https://qasolucity.com/images/logos/qa-solucity-logo.png",
    },
    ...(job.workMode === "Remote"
      ? {
          jobLocationType: "TELECOMMUTE",
          applicantLocationRequirements: {
            "@type": "Country",
            name: "Nigeria",
          },
        }
      : {
          jobLocation: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: job.location,
              addressCountry: "NG",
            },
          },
        }),
    directApply: false,
  };

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <JobDetailContent job={job} relatedJobs={relatedJobs}>
        <MDXRemote
          source={job.content}
          components={mdxComponents}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [rehypeSlug],
            },
          }}
        />
      </JobDetailContent>
    </>
  );
}
