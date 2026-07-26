"use client";

import { useState } from "react";

import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";

import DesktopNav from "./DesktopNav";
import Logo from "./Logo";
import MobileDrawer from "./MobileDrawer";
import MobileNav from "./MobileNav";

import { useMegaMenu } from "../hooks/useMegaMenu";
import { useScroll } from "../hooks/useScroll";

import { cn } from "@/lib/utils";

export default function Navbar() {
  const scrolled = useScroll();
  const { openMenu, open, close, toggle } = useMegaMenu();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled
            ? "border-b border-slate-200/70 bg-white/80 shadow-lg backdrop-blur-2xl"
            : "bg-transparent"
        )}
      >
        <Container>
          <nav
            role="navigation"
            aria-label="Main navigation"
            className="flex h-24 items-center justify-between"
          >
            <Logo />

            <DesktopNav
              openMenu={openMenu}
              open={open}
              close={close}
              toggle={toggle}
            />

            <div className="hidden lg:block">
              <Button
                className="rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-500 px-7 py-6 text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/25"
                aria-label="Book a consultation"
              >
                Book Consultation
              </Button>
            </div>

            <MobileNav
              onOpen={() => setMobileOpen(true)}
              aria-label="Open mobile menu"
            />
          </nav>
        </Container>
      </header>

      <MobileDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
    </>
  );
}