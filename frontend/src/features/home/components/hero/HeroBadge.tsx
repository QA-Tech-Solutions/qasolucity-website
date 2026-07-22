import { Badge } from "@/components/ui/Badge";
import { ShieldCheck } from "lucide-react";

export default function HeroBadge() {
  return (
    <Badge className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-5 py-3 shadow-sm backdrop-blur-md">
     <ShieldCheck className="h-4 w-4 text-indigo-600" />
   
     <span className="font-medium text-slate-800">
       Trusted Quality Assurance Partner
     </span>
   </Badge>
  );
}