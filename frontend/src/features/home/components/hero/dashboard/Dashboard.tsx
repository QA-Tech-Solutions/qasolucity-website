"use client";

import { CheckCircle2, ShieldCheck, Bug, Activity } from "lucide-react";

import DecorativeDots from "./DecorativeDots";
import FloatingCard from "./FloatingCard";
import MainMonitor from "./MainMonitor";

export default function Dashboard() {
  return (
    <div className="relative mx-auto h-[640px] w-[560px]">

      <div className="absolute left-16 top-12 z-20">
        <MainMonitor />
      </div>

      <FloatingCard
        title="Automation"
        value="94%"
        subtitle="Coverage"
        rotate="-rotate-12"
        duration={6}
        className="absolute left-8 top-8 z-30 w-40"
        icon={<Activity className="h-5 w-5 text-indigo-600" />}
      />

      <FloatingCard
        title="Critical Bugs"
        value="03"
        subtitle="High Priority"
        rotate="-rotate-6"
        duration={5}
        className="absolute left-0 top-280 z-30 w-36"
        icon={<Bug className="h-5 w-5 text-red-500" />}
      />

      <FloatingCard
        title="API Health"
        value="Healthy"
        subtitle="All Services"
        rotate="rotate-6"
        duration={7}
        className="absolute right-2 top-20 z-30 w-40"
        icon={<ShieldCheck className="h-5 w-5 text-emerald-500" />}
      />

      <FloatingCard
        title="Regression"
        value="Passed"
        subtitle="Release Ready"
        rotate="-rotate-6"
        duration={5.5}
        className="absolute left-14 bottom-28 z-30 w-40"
        icon={<CheckCircle2 className="h-5 w-5 text-emerald-500" />}
      />

      <FloatingCard
        title="Tests"
        value="2,548"
        subtitle="Current Sprint"
        rotate="rotate-6"
        duration={6.5}
        className="absolute right-0 bottom-20 z-30 w-40"
        icon={<Activity className="h-5 w-5 text-indigo-600" />}
      />

      <DecorativeDots className="absolute right-20 top-52" />
      <DecorativeDots className="absolute left-40 bottom-28 scale-75" />
    </div>
  );
}