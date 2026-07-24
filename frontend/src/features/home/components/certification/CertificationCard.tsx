import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/Button";

interface Props {
  title: string;
  description: string;
  button: string;
  variant: "primary" | "secondary";
}

export default function CertificationCard({
  title,
  description,
  button,
  variant,
}: Props) {
  return (
    <article
      className="
        group
        relative
        overflow-visible
        rounded-[34px]
        border
        border-slate-200
        bg-gradient-to-br
        from-white
        via-white
        to-indigo-50/40
        px-10
        pb-10
        pt-14
        text-center
        transition-all
        duration-500
        hover:-translate-y-2
        hover:border-indigo-200
        hover:shadow-[0_35px_80px_rgba(79,70,229,.12)]
      "
    >
      {/* Glow */}
      <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-indigo-200/20 blur-3xl" />

      {/* Badge */}
      <div className="absolute -top-7 left-10 z-20">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-xl ring-8 ring-[#FCFBF8]">
          <Image
            src="/icons/badge.svg"
            alt="Badge"
            width={38}
            height={38}
          />
        </div>
      </div>

      <div className="relative z-10">
        <h3 className="whitespace-pre-line mx-auto max-w-[240px] sm:max-w-xs md:max-w-sm text-[38px] font-bold leading-tight tracking-tight text-slate-900">
          {title}
        </h3>

        <p className="mx-auto mt-6 max-w-md text-[19px] leading-8 text-slate-500">
          {description}
        </p>

        <Button
          className={`mt-10 h-14 rounded-2xl px-8 text-[15px] font-semibold transition-all duration-300 ${
            variant === "primary"
              ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white hover:from-indigo-700 hover:to-violet-700"
              : "bg-white border border-indigo-200 text-indigo-600 hover:bg-indigo-50"
          }`}
        >
          {button}

          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </article>
  );
}