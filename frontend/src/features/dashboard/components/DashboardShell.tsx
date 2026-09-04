"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PlayCircle,
  Bug,
  BarChart3,
  FlaskConical,
  ShieldCheck,
  ShieldAlert,
  Lock,
  Sparkles,
  ArrowRight,
  type LucideIcon,
} from "lucide-react";

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  /** Requires the admin access code - shown with a lock so the sidebar is upfront about which one item that's true for. */
  gated?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/executions", label: "Executions", icon: PlayCircle },
  { href: "/dashboard/failures", label: "Failures", icon: Bug },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/explorer", label: "Test Explorer", icon: FlaskConical },
  { href: "/dashboard/admin", label: "Admin", icon: ShieldAlert, gated: true },
];

function isActive(pathname: string, href: string): boolean {
  return href === "/dashboard" ? pathname === href : pathname.startsWith(href);
}

function NavLink({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className={`flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors duration-200 ${
        active
          ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-slate-200"
      }`}
    >
      <Icon className="h-4 w-4 shrink-0" />
      <span className="flex-1">{item.label}</span>
      {item.gated && <Lock className="h-3 w-3 shrink-0 text-slate-400 dark:text-slate-600" />}
    </Link>
  );
}

export default function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-white pt-20 text-slate-900 dark:bg-slate-950 dark:text-white sm:pt-24">
      {/* Mobile: horizontal scrollable nav, no sidebar real estate to spare. */}
      <div className="border-b border-slate-200 dark:border-white/5 lg:hidden">
        <nav className="flex gap-1 overflow-x-auto px-4 py-3">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                isActive(pathname, item.href)
                  ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200"
              }`}
            >
              <item.icon className="h-3.5 w-3.5" />
              {item.label}
              {item.gated && <Lock className="h-3 w-3 text-slate-400 dark:text-slate-600" />}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mx-auto flex max-w-[1400px] gap-8 px-4 pb-16 sm:px-6 lg:px-8">
        {/* Desktop sidebar */}
        <aside className="hidden w-64 shrink-0 pt-8 lg:block">
          <div className="sticky top-28 flex flex-col gap-6">
            <div className="flex items-center gap-2.5 px-1">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-500/20">
                <ShieldCheck className="h-4.5 w-4.5 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Quality Dashboard</p>
                <p className="text-xs text-slate-500">qasolucity.com</p>
              </div>
            </div>

            <nav className="flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <NavLink key={item.href} item={item} active={isActive(pathname, item.href)} />
              ))}
            </nav>

            <p className="px-3.5 text-xs leading-5 text-slate-500 dark:text-slate-600">
              Everything here is public except Admin, which covers the suite
              testing the app and requires the team login.
            </p>

            <Link
              href="/contact"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 p-4 text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:shadow-indigo-500/30"
            >
              <div className="absolute -right-4 -top-4 h-16 w-16 rounded-full bg-white/10 blur-xl" />
              <Sparkles className="h-4 w-4 text-white/80" />
              <p className="relative mt-2.5 text-sm font-semibold leading-snug">
                Want a dashboard like this for your own product?
              </p>
              <p className="relative mt-1.5 text-xs leading-5 text-white/70">
                We build and run this exact quality automation setup for teams, customized to your stack.
              </p>
              <span className="relative mt-3 flex items-center gap-1 text-xs font-semibold">
                Talk to us
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </aside>

        <main className="min-w-0 flex-1 pt-8">{children}</main>
      </div>
    </div>
  );
}
