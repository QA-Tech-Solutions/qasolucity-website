import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3"
      aria-label="QA Solucity Home"
    >
      {/* SVG goes here */}

      <span className="text-xl font-bold tracking-tight">
        QA Solucity
      </span>
    </Link>
  );
}