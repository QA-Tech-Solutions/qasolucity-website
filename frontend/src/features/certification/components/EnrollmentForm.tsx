"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Clock, GraduationCap, Ticket } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Modal from "@/components/ui/Modal";
import { allCertifications, certificationCatalog, type Pathway } from "../data/certification-data";

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
    description: "Training only. You'll book and pay for your official exam yourself, later.",
    cta: "Confirm Prep Enrollment",
  },
  bundle: {
    title: "All-Inclusive Certification Bundle",
    description: "Training plus a prepaid official exam voucher, bundled into one price.",
    cta: "Confirm Bundle Enrollment",
  },
};

export default function EnrollmentForm({ initialTrack, trainingFeeNgn, bundlePriceNgn }: Props) {
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
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [enrolledTrack, setEnrolledTrack] = useState<Pathway["track"]>(initialTrack);

  // Both the training fee and the Bundle's exam voucher cost depend on
  // which certification is picked (Advanced Level costs more than
  // Foundation Level), so pricing starts at the server-rendered default
  // (Foundation Level) and refetches once the buyer picks a certification.
  const [pricing, setPricing] = useState({ trainingFeeNgn, bundlePriceNgn });
  const [pricingLoading, setPricingLoading] = useState(false);

  useEffect(() => {
    if (!formData.certification) return;

    let cancelled = false;
    // Marks the fetch as in-flight so the price can dim while it resolves.
    // eslint-disable-next-line react-hooks/set-state-in-effect -- kicking off a fetch is exactly what this effect exists to do; the result itself is applied from the .then() callback below, not synchronously here
    setPricingLoading(true);

    fetch(`/api/certification-pricing?certification=${encodeURIComponent(formData.certification)}`)
      .then((res) => res.json())
      .then((data: { trainingFeeNgn?: number; bundlePriceNgn?: number }) => {
        if (!cancelled && typeof data.trainingFeeNgn === "number" && typeof data.bundlePriceNgn === "number") {
          setPricing({ trainingFeeNgn: data.trainingFeeNgn, bundlePriceNgn: data.bundlePriceNgn });
        }
      })
      .catch(() => {
        // Keep whatever price was already showing - better a slightly
        // stale number than a broken checkout.
      })
      .finally(() => {
        if (!cancelled) setPricingLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [formData.certification]);

  const price = track === "bundle" ? pricing.bundlePriceNgn : pricing.trainingFeeNgn;
  const selectedCertification = allCertifications.find((item) => item.code === formData.certification);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // ---------- Validation functions (mirrors the contact form's pattern) ----------
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
          return "Enter a valid phone number (e.g., +1 555 123 4567)";
        }
        return "";
      }
      case "certification": {
        if (!value) return "Choose which certification you're targeting";
        return "";
      }
      default:
        return "";
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    const fields = ["firstName", "lastName", "email", "phone", "certification"];
    fields.forEach((field) => {
      const value = formData[field as keyof typeof formData] as string;
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

  // Derived purely from formData so it can't get stuck false after a field
  // is corrected post-blur (see ContactFormCard for the same reasoning).
  const isFormValid = (): boolean => {
    const required = ["firstName", "lastName", "email", "phone", "certification"];
    const allFilled = required.every(
      (field) => formData[field as keyof typeof formData]?.trim()
    );
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
      const response = await fetch("/api/certification-enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, track }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setEnrolledTrack(track);
      setStatus("idle");
      setShowSuccessModal(true);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to submit enrollment");
    }
  };

  return (
    <>
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
        Tell us a bit about you and pick your route, and we&apos;ll follow up by email with payment and onboarding
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

      <div className="mt-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 px-5 py-4">
        <div className="flex items-baseline justify-between">
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Total due</span>
          <span
            className={`text-2xl font-bold text-slate-900 dark:text-slate-100 transition-opacity ${pricingLoading ? "opacity-50" : ""}`}
          >
            {nairaFormatter.format(price)}
          </span>
        </div>
        {!formData.certification ? (
          <p className="mt-1 text-right text-xs text-slate-500 dark:text-slate-500">
            Starting price shown. Pick a certification below for your exact total.
          </p>
        ) : (
          selectedCertification && (
            <p className="mt-1 flex items-center justify-end gap-1.5 text-right text-xs text-slate-500 dark:text-slate-500">
              <Clock className="h-3 w-3" />
              {selectedCertification.duration} of training for {selectedCertification.code}
            </p>
          )
        )}
      </div>

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
          <Select
            name="certification"
            value={formData.certification}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(errors.certification)}
            placeholder="Which certification are you targeting?"
            options={certificationOptions}
            className="rounded-xl border-slate-200 dark:border-slate-800 transition-all duration-300 focus:border-indigo-300 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-500/20"
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
            disabled={status === "loading" || !isFormValid()}
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

    <Modal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <CheckCircle2 className="h-8 w-8 text-emerald-600" />
        </div>
        <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100">You&apos;re enrolled! 🎉</h4>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Thanks for enrolling in the <strong>{TRACK_COPY[enrolledTrack].title}</strong>.
        </p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          We&apos;ve sent a confirmation to your email. Our team will reach out shortly with next steps.
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
