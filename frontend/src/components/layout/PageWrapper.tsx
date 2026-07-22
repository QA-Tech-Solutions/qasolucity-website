import { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
}

export default function PageWrapper({
  children,
}: PageWrapperProps) {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {children}
    </main>
  );
}