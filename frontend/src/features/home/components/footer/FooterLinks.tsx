// src/features/home/components/footer/FooterLinks.tsx
import Link from "next/link";
import { footerLinks } from "./footer-data";

export default function FooterLinks() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {/* Services */}
      <div>
        <h4 className="mb-6 font-semibold">Services</h4>
        <ul className="space-y-4 text-slate-400">
          {footerLinks.services.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="transition hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Company */}
      <div>
        <h4 className="mb-6 font-semibold">Company</h4>
        <ul className="space-y-4 text-slate-400">
          {footerLinks.company.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="transition hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Resources */}
      <div>
        <h4 className="mb-6 font-semibold">Resources</h4>
        <ul className="space-y-4 text-slate-400">
          {footerLinks.resources.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="transition hover:text-white"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}