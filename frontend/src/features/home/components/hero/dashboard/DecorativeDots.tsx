import { cn } from "@/lib/utils";

interface DecorativeDotsProps {
  className?: string;
}

export default function DecorativeDots({
  className,
}: DecorativeDotsProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-4 gap-3 opacity-25",
        className
      )}
    >
      {Array.from({ length: 16 }).map((_, index) => (
        <span
          key={index}
          className="h-2.5 w-2.5 rounded-full bg-slate-400"
        />
      ))}
    </div>
  );
}