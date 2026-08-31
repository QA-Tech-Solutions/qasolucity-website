import Container from "@/components/layout/Container";
import { Heart } from "lucide-react";
import Link from "next/link";

import FooterBrand from "./FooterBrand";
import FooterLinks from "./FooterLinks";
import FooterNewsletter from "./FooterNewsletter";

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 text-white overflow-hidden">
      {/* Subtle glow at the top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <Container>
        {/* Main Footer Grid */}
        <div className="grid gap-12 border-b border-white/10 py-16 md:py-20 lg:grid-cols-[1.4fr_2fr_1fr] lg:gap-20 lg:py-24">
          <FooterBrand />
          <FooterLinks />
          <FooterNewsletter />
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-6 py-6 text-sm text-slate-400 lg:flex-row">
          {/* Left - Copyright */}
          <p className="text-center lg:text-left">
            © {new Date().getFullYear()} QA Solucity. All rights reserved. RC 9818417.
          </p>
          
          {/* Center - Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link
              href="/privacy"
              className="transition-colors duration-300 hover:text-indigo-400"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="transition-colors duration-300 hover:text-indigo-400"
            >
              Terms
            </Link>
            <Link
              href="/cookies"
              className="transition-colors duration-300 hover:text-indigo-400"
            >
              Cookies
            </Link>
          </div>
          
          {/* Right - Credit */}
          <div className="flex items-center justify-center gap-1.5 text-xs lg:text-sm">
            Made with
            <Heart className="h-3.5 w-3.5 fill-red-400 text-red-400 animate-pulse" />
            by
            <a
              href="https://share.google/tmE18uFeHUGnieQXY"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-indigo-400 transition-all duration-300 hover:text-indigo-300 hover:underline hover:underline-offset-2"
            >
              John Adeniyi
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}