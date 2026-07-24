"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
}

export default function NavLink({
  href,
  children,
}: NavLinkProps) {
  const pathname = usePathname();

  const active =
    href === "/"
      ? pathname === "/"
      : pathname.startsWith(href);

  return (
    <Link
      href={href}
      className={cn(
        "relative py-2 text-[15px] font-medium transition-all duration-300",

        active
          ? "text-indigo-600"
          : "text-slate-700 hover:text-indigo-600"
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