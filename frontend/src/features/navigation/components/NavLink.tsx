"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  active: boolean;
  children: React.ReactNode;
}

export default function NavLink({
  href,
  active,
  children,
}: NavLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "relative py-2 text-[15px] font-medium transition-all duration-300",

        active
          ? "text-indigo-600 dark:text-indigo-400"
          : "text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400"
      )}
    >
      {children}

      <span
        className={cn(
          "absolute bottom-0 left-0 h-0.5 rounded-full bg-indigo-600 transition-all duration-300",

          active ? "w-full" : "w-0 group-hover:w-full"
        )}
      />
    </Link>
  );
}