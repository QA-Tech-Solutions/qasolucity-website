"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Ticket } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import { certificationCatalog, type Pathway } from "../data/certification-data";

interface Props {
  initialTrack: Pathway["track"];
  trainingFeeNgn: number;
  bundlePriceNgn: number;
}

const certificationOptions = certificationCatalog.flatMap((group) =>
  group.items.map((item) => ({ label: `${item.name} (${item.code})`, value: item.code }))
);

const nairaFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

const TRACK_COPY: Record<Pathway["track"], { title: string; description: string; cta: string }> = {
  prep: {
    title: "Self-Starter Prep Track",
    description: "Training only — you'll book and pay for your official exam yourself, later.",
    cta: "Confirm Prep Enrollment",
  },
  bundle: {
    title: "All-Inclusive Certification Bundle",
    description: "Training plus a prepaid official exam voucher, bundled into one price.",
    cta: "Confirm Bundle Enrollment",
  },
};

export default function EnrollmentForm({ initialTrack, trainingFeeNgn, bundlePriceNgn }: Props) {
  const router = useRouter();
  const [track, setTrack] = useState<Pathway["track"]>(initialTrack);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    certification: "",
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const price = track === "bundle" ? bundlePriceNgn : trainingFeeNgn;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim();
    if (fullName.length < 3) {
      newErrors.firstName = "Full name must be at least 3 characters";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (formData.phone && !/^[\+\d\s\-\(\)]{7,20}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid phone number";
    }
    if (!formData.certification) {
      newErrors.certification = "Choose which certification you're targeting";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/certification-enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, track }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      sessionStorage.setItem(
        "qas-certification-enrollment",
        JSON.stringify({
          firstName: formData.firstName,
          track,
          priceNgn: data.priceNgn,
          voucherAssigned: Boolean(data.voucherAssigned),
          voucherCode: data.voucherCode ?? null,
        })
      );

      router.push(`/certification/enroll/confirmation?track=${track}`);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to submit enrollment");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-[28px] border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-8 shadow-xl shadow-slate-200/40 dark:shadow-black/30 md:p-10"
    >
      <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">
        Enroll now
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
        Reserve your seat.
      </h1>
      <p className="mt-3 text-[15px] leading-7 text-slate-600 dark:text-slate-400">
        Tell us a bit about you and pick your route — we&apos;ll follow up by email with payment and onboarding
        details.
      </p>

      {/* Track toggle */}
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {(["prep", "bundle"] as const).map((option) => {
          const copy = TRACK_COPY[option];
          const active = track === option;
          const Icon = option === "bundle" ? Ticket : GraduationCap;
          return (
            <button
              key={option}
              type="button"
              onClick={() => setTrack(option)}
              aria-pressed={active}
              className={`flex flex-col items-start gap-2 rounded-2xl border p-5 text-left transition-all duration-300 ${
                active
                  ? "border-indigo-400 dark:border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/30 shadow-md shadow-indigo-100/50 dark:shadow-black/30"
                  : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-xl ${
                  active
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                }`}
              >
                <Icon className="h-4 w-4" />
              </span>
              <span className="text-[15px] font-semibold text-slate-900 dark:text-slate-100">{copy.title}</span>
              <span className="text-xs leading-5 text-slate-500 dark:text-slate-400">{copy.description}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 flex items-baseline justify-between rounded-2xl bg-slate-50 dark:bg-slate-800/60 px-5 py-4">
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Total due</span>
        <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">{nairaFormatter.format(price)}</span>
      </div>

      <form onSubmit={handleSubmit} noValidate className="mt-8">
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <Input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
              className="rounded-xl border-slate-200 dark:border-slate-800 transition-all duration-300 focus:border-indigo-300 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-500/20"
            />
            {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>}
          </div>
          <div>
            <Input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              required
              className="rounded-xl border-slate-200 dark:border-slate-800 transition-all duration-300 focus:border-indigo-300 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-500/20"
            />
            {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>}
          </div>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <div>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
              className="rounded-xl border-slate-200 dark:border-slate-800 transition-all duration-300 focus:border-indigo-300 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-500/20"
            />
            {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
          </div>
          <div>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number (Optional)"
              className="rounded-xl border-slate-200 dark:border-slate-800 transition-all duration-300 focus:border-indigo-300 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-500/20"
            />
            {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
          </div>
        </div>

        <div className="mt-5">
          <Select
            name="certification"
            value={formData.certification}
            onChange={handleChange}
            placeholder="Which certification are you targeting?"
            options={certificationOptions}
            className="rounded-xl border-slate-200 dark:border-slate-800 pr-10 transition-all duration-300 focus:border-indigo-300 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-500/20"
          />
          {errors.certification && <p className="mt-1 text-xs text-red-500">{errors.certification}</p>}
        </div>

        <div className="mt-5">
          <Textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            placeholder="Anything we should know? (Optional)"
            className="rounded-xl border-slate-200 dark:border-slate-800 transition-all duration-300 focus:border-indigo-300 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-500/20"
          />
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-6">
          <Button
            type="submit"
            disabled={status === "loading"}
            className="group h-14 w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/20 dark:shadow-indigo-950/40 transition-all duration-300 hover:shadow-indigo-500/30 dark:hover:shadow-indigo-950/50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "loading" ? "Submitting..." : TRACK_COPY[track].cta}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </motion.div>

        {status === "error" && (
          <p className="mt-4 text-center text-sm font-medium text-red-600">
            ✗ {errorMessage || "Failed to submit. Please try again."}
          </p>
        )}

        <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-500">
          We&apos;ll email you payment instructions and confirm your total before anything is charged.
        </p>
      </form>
    </motion.div>
  );
}
