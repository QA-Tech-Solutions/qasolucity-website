"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import Modal from "@/components/ui/Modal";

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  notes: "",
};

const nairaFormatter = new Intl.NumberFormat("en-NG", {
  style: "currency",
  currency: "NGN",
  maximumFractionDigits: 0,
});

interface Props {
  feeNgn: number;
  duration: string;
}

export default function LaunchpadEnrollmentForm({ feeNgn, duration }: Props) {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "firstName":
      case "lastName": {
        const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`;
        if (fullName.length < 3 && formData.firstName && formData.lastName) {
          return "Full name must be at least 3 characters";
        }
        if (!value.trim()) return "This field is required";
        return "";
      }
      case "email": {
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address";
        return "";
      }
      case "phone": {
        if (!value.trim()) return "Phone number is required";
        if (!/^[\+\d\s\-\(\)]{7,20}$/.test(value)) {
          return "Enter a valid phone number (e.g., +234 801 234 5678)";
        }
        return "";
      }
      default:
        return "";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    ["firstName", "lastName", "email", "phone"].forEach((field) => {
      const value = formData[field as keyof typeof formData];
      const error = validateField(field, value);
      if (error) newErrors[field] = error;
    });
    const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`;
    if (fullName.length < 3) {
      newErrors.firstName = "Full name must be at least 3 characters";
      newErrors.lastName = "Full name must be at least 3 characters";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = (): boolean => {
    const required = ["firstName", "lastName", "email", "phone"];
    const allFilled = required.every((field) => formData[field as keyof typeof formData]?.trim());
    const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`;
    const nameValid = fullName.length >= 3;
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const phoneValid = /^[\+\d\s\-\(\)]{7,20}$/.test(formData.phone);
    return allFilled && nameValid && emailValid && phoneValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/qa-career-launchpad-enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("idle");
      setShowSuccessModal(true);
      setFormData(initialFormData);
      setErrors({});
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to submit application");
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-[28px] border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-8 shadow-xl shadow-slate-200/40 dark:shadow-black/30 md:p-10"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">
          Apply now
        </p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-3xl">
          Reserve your spot.
        </h2>
        <p className="mt-3 text-[15px] leading-7 text-slate-600 dark:text-slate-400">
          Tell us a bit about yourself. A mentor will follow up by email to confirm your spot, the cohort
          schedule, and payment details.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-8">
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <Input
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
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
                onBlur={handleBlur}
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
                onBlur={handleBlur}
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
                onBlur={handleBlur}
                placeholder="Phone Number"
                required
                className="rounded-xl border-slate-200 dark:border-slate-800 transition-all duration-300 focus:border-indigo-300 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-500/20"
              />
              {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
            </div>
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

          <div className="mt-8 rounded-2xl bg-slate-50 dark:bg-slate-800/60 px-5 py-4">
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Program fee</span>
              <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {nairaFormatter.format(feeNgn)}
              </span>
            </div>
            <p className="mt-1 text-right text-xs text-slate-500 dark:text-slate-500">
              one-time · {duration} · indicative price, confirmed when you enroll · payment plans available
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-4">
            <Button
              type="submit"
              disabled={status === "loading" || !isFormValid()}
              className="group h-14 w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/20 dark:shadow-indigo-950/40 transition-all duration-300 hover:shadow-indigo-500/30 dark:hover:shadow-indigo-950/50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? "Submitting..." : "Apply to the Launchpad"}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </motion.div>

          {status === "error" && (
            <p className="mt-4 text-center text-sm font-medium text-red-600">
              ✗ {errorMessage || "Failed to submit. Please try again."}
            </p>
          )}

          <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-500">
            We&apos;ll email you to confirm your spot and walk you through payment. Nothing is charged yet.
          </p>
        </form>
      </motion.div>

      <Modal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" />
          </div>
          <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100">You&apos;re in! 🎉</h4>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Thanks for applying to the <strong>QA Career Launchpad</strong>.
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            A mentor will reach out by email within 24 hours to confirm your spot and next steps.
          </p>
          <button
            onClick={() => setShowSuccessModal(false)}
            className="mt-6 inline-flex items-center rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-2.5 font-semibold text-white transition hover:opacity-90"
          >
            Got it, thanks
          </button>
        </div>
      </Modal>
    </>
  );
}
