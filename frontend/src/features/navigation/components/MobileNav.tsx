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
    <div className="lg:hidden">
      <Button
        variant="ghost"
        size="sm"
        onClick={onOpen}
        aria-label="Open navigation menu"
        aria-haspopup="dialog"
      >
        <Menu className="h-6 w-6" />
      </Button>
    </div>
  );
}