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
          "sticky top-0 z-50 transition-all duration-300",
          scrolled
            ? "border-b border-border bg-background/90 backdrop-blur-xl shadow-sm"
            : cn(
                "sticky top-0 z-50 transition-all duration-300",

                scrolled
                ? "border-b border-border bg-background/80 backdrop-blur-xl shadow-md"
                : "bg-transparent"
                )
        )}
      >
        <Container>
          <nav
            role="navigation"
            aria-label="Main navigation"
          >
          <div className="flex h-20 items-center justify-between">
            <Logo />

            <DesktopNav
              openMenu={openMenu}
              open={open}
              close={close}
              toggle={toggle}
            />

            <div className="hidden lg:block">
              <Button>
                Book Consultation
              </Button>
            </div>

            <MobileNav
              onOpen={() => setMobileOpen(true)}
            />
          </div>
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