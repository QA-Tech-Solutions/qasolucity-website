"use client";

import NavItem from "./NavItem";
import { navigation } from "../constants/navigation";

interface DesktopNavProps {
  openMenu: string | null;
  open: (menu: string) => void;
  close: () => void;
  toggle: (menu: string) => void;
}

export default function DesktopNav({
  openMenu,
  open,
  close,
  toggle,
}: DesktopNavProps) {
  return (
    <nav
      aria-label="Primary"
      className="hidden items-center gap-6 xl:flex">
      {navigation.map((item) => (
        <NavItem
          key={item.label}
          item={item}
          openMenu={openMenu}
          open={open}
          close={close}
          toggle={toggle}
        />
      ))}
    </nav>
  );
}