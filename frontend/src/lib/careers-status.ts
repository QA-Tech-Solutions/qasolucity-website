export type JobStatus = "open" | "closed";

/**
 * Whether a posting is actually still accepting applications — `status`
 * says "open", *and* its deadline (if it has one) hasn't passed. Nobody
 * has to remember to come back and flip `status` to `"closed"` by hand
 * once the date arrives; it just stops counting as open on its own.
 * Deadlines are whole dates with no time component, so a posting stays
 * open through the *end* of its deadline day in QA Solucity's own
 * timezone (Lagos, WAT), not until midnight UTC.
 *
 * Deliberately pure and dependency-free: lib/careers.ts (which this same
 * check also powers) touches Node's fs/path to load postings from disk,
 * so importing *that* from a Client Component (like JobDetailContent,
 * which needs this check to decide whether to show the application form)
 * would pull the filesystem code into the browser bundle and break it.
 * Importing this file instead avoids that entirely.
 */
export function isJobOpen(job: { status: JobStatus; deadline?: string }): boolean {
  if (job.status !== "open") return false;
  if (!job.deadline) return true;

  const endOfDeadlineDay = new Date(`${job.deadline}T23:59:59+01:00`);
  if (Number.isNaN(endOfDeadlineDay.getTime())) return true;

  return Date.now() <= endOfDeadlineDay.getTime();
}
