"use client";

import { Menu } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface MobileNavProps {
  onOpen: () => void;
}

export default function MobileNav({
  onOpen,
}: MobileNavProps) {
  return (
    <div className="xl:hidden">
      <Button
        variant="ghost"
        size="sm"
        onClick={onOpen}
        aria-label="Open navigation menu"
        aria-haspopup="dialog"
        className="rounded-full p-2.5"
      >
        <Menu className="h-6 w-6" />
      </Button>
    </div>
  );
}