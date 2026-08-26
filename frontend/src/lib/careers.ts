import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { isJobOpen, type JobStatus } from "./careers-status";

export type { JobStatus };
export { isJobOpen };

const CAREERS_DIR = path.join(process.cwd(), "content", "careers");

export type WorkMode = "Remote" | "Hybrid" | "Onsite";
export type EmploymentType = "Full-time" | "Part-time" | "Contract" | "Internship";

export interface CareerFrontmatter {
  title: string;
  department: string;
  type: EmploymentType;
  workMode: WorkMode;
  location: string;
  /** Free text, e.g. "₦450,000 – ₦700,000 / month". Omit if not disclosed. */
  salaryLabel?: string;
  /** ISO date. Omit for "open until filled" / rolling applications. */
  deadline?: string;
  postedDate: string;
  status: JobStatus;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave?: string[];
  hiringProcess: string[];
}

export interface CareerPosting extends CareerFrontmatter {
  slug: string;
  content: string;
}

function readJobFile(filename: string): CareerPosting {
  const slug = filename.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(CAREERS_DIR, filename), "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as CareerFrontmatter;

  return {
    ...frontmatter,
    slug,
    content,
  };
}

function listJobFiles(): string[] {
  if (!fs.existsSync(CAREERS_DIR)) {
    return [];
  }
  // README.md documents the frontmatter shape for whoever adds a posting —
  // it lives alongside the postings for discoverability, but isn't one.
  return fs
    .readdirSync(CAREERS_DIR)
    .filter((file) => file.endsWith(".md") && file.toLowerCase() !== "readme.md");
}

/** Every posting regardless of status, newest first. */
export function getAllJobs(): CareerPosting[] {
  return listJobFiles()
    .map(readJobFile)
    .sort((a, b) => (a.postedDate < b.postedDate ? 1 : -1));
}

/** Only postings currently accepting applications. This is what the public careers page shows. */
export function getOpenJobs(): CareerPosting[] {
  return getAllJobs().filter(isJobOpen);
}

export function getJobSlugs(): string[] {
  return listJobFiles().map((file) => file.replace(/\.md$/, ""));
}

export function getJobBySlug(slug: string): CareerPosting | undefined {
  const filePath = path.join(CAREERS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) {
    return undefined;
  }
  return readJobFile(`${slug}.md`);
}

export function getRelatedJobs(job: CareerPosting, limit = 3): CareerPosting[] {
  const openOthers = getOpenJobs().filter((item) => item.slug !== job.slug);
  const sameDepartment = openOthers.filter((item) => item.department === job.department);
  const rest = openOthers.filter((item) => item.department !== job.department);
  return [...sameDepartment, ...rest].slice(0, limit);
}
