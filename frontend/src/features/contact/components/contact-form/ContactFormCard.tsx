"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

const services = [
  { label: "Manual Testing", value: "manual-testing" },
  { label: "Automation Testing", value: "automation-testing" },
  { label: "API Testing", value: "api-testing" },
  { label: "Performance Testing", value: "performance-testing" },
  { label: "QA Consulting", value: "qa-consulting" },
  { label: "Corporate Training", value: "corporate-training" },
];

export default function ContactFormCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="rounded-[28px] border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-200/40 transition-all duration-300 hover:shadow-indigo-100/30 md:p-10"
    >
      <form>
        <div className="grid gap-5 md:grid-cols-2">
          <Input
            placeholder="First Name"
            className="rounded-xl border-slate-200 transition-all duration-300 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
          />
          <Input
            placeholder="Last Name"
            className="rounded-xl border-slate-200 transition-all duration-300 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <Input
            type="email"
            placeholder="Work Email"
            className="rounded-xl border-slate-200 transition-all duration-300 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
          />
          <Input
            placeholder="Company"
            className="rounded-xl border-slate-200 transition-all duration-300 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div className="mt-5">
          <Input
            placeholder="Phone Number"
            className="rounded-xl border-slate-200 transition-all duration-300 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div className="mt-5">
          <Select
            name="service"
            defaultValue=""
            placeholder="Select a Service"
            options={services}
            className="rounded-xl border-slate-200 pr-10 transition-all duration-300 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <div className="mt-5">
          <Textarea
            rows={5}
            placeholder="Tell us about your project..."
            className="rounded-xl border-slate-200 transition-all duration-300 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="mt-6"
        >
          <Button
            type="submit"
            className="group h-14 w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:shadow-indigo-500/30"
          >
            Send Enquiry
            <Send className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </motion.div>

        <p className="mt-4 text-center text-xs text-slate-400">
          We'll respond within 24 hours. Your information is kept confidential.
        </p>
      </form>
    </motion.div>
  );
}