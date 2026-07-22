"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function NavLink({
  href,
  children,
  className,
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

      "text-sm font-medium transition-colors",

      active
      ? "text-accent"
      : "text-foreground hover:text-accent"

      )}
      aria-current={active ? "page" : undefined}
    >
      {children}
    </Link>
  );
}