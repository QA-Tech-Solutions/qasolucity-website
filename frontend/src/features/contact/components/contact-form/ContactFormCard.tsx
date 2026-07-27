import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";

const services = [
  {
    label: "Manual Testing",
    value: "manual-testing",
  },
  {
    label: "Automation Testing",
    value: "automation-testing",
  },
  {
    label: "API Testing",
    value: "api-testing",
  },
  {
    label: "Performance Testing",
    value: "performance-testing",
  },
  {
    label: "QA Consulting",
    value: "qa-consulting",
  },
  {
    label: "Corporate Training",
    value: "corporate-training",
  },
];

export default function ContactFormCard() {
  return (
    <div className="rounded-[36px] border border-slate-200 bg-white p-10 shadow-xl shadow-slate-200/40">

      <div className="grid gap-6 md:grid-cols-2">

        <Input placeholder="First Name" />

        <Input placeholder="Last Name" />

      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">

        <Input
          type="email"
          placeholder="Work Email"
        />

        <Input placeholder="Company" />

      </div>

      <div className="mt-6">

        <Input placeholder="Phone Number" />

      </div>

      <div className="mt-6">

        <Select
          name="service"
          defaultValue=""
          placeholder="Select a Service"
          options={services}
        />

      </div>

      <div className="mt-6">

        <Textarea
          rows={6}
          placeholder="Tell us about your project..."
        />

      </div>

      <Button
        className="
          mt-8
          h-14
          w-full
          rounded-2xl
          bg-gradient-to-r
          from-indigo-600
          to-violet-600
          text-white
        "
      >
        Send Enquiry
      </Button>

    </div>
  );
}