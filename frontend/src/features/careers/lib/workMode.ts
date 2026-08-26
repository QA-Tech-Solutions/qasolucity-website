import { Globe2, Shuffle, Building2, type LucideIcon } from "lucide-react";
import type { WorkMode } from "@/lib/careers";

export const WORK_MODE_STYLE: Record<
  WorkMode,
  { icon: LucideIcon; badgeClass: string }
> = {
  Remote: {
    icon: Globe2,
    badgeClass:
      "border-indigo-200 dark:border-indigo-800/60 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300",
  },
  Hybrid: {
    icon: Shuffle,
    badgeClass:
      "border-violet-200 dark:border-violet-800/60 bg-violet-50 dark:bg-violet-950/40 text-violet-700 dark:text-violet-300",
  },
  Onsite: {
    icon: Building2,
    badgeClass:
      "border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300",
  },
};

const deadlineFormatter = new Intl.DateTimeFormat("en-NG", {
  dateStyle: "medium",
  timeZone: "Africa/Lagos",
});

export function formatDeadline(deadline?: string): string | null {
  if (!deadline) return null;
  const date = new Date(deadline);
  if (Number.isNaN(date.getTime())) return null;
  return deadlineFormatter.format(date);
}

export function isDeadlineSoon(deadline?: string, withinDays = 7): boolean {
  if (!deadline) return false;
  const date = new Date(deadline);
  if (Number.isNaN(date.getTime())) return false;
  const daysLeft = (date.getTime() - Date.now()) / (1000 * 60 * 60 * 24);
  return daysLeft >= 0 && daysLeft <= withinDays;
}
