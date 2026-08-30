"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Modal from "@/components/ui/Modal";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, Sparkles, ArrowRight, Mic, MicOff } from "lucide-react";
import { useState } from "react";
import { services as serviceCatalog } from "@/features/services/data/services";
import { useSpeechToText } from "../../hooks/useSpeechToText";
import { trackEvent, ANALYTICS_EVENTS } from "@/features/analytics/lib/posthog";

// Sourced from the actual /services catalog so this list can't drift out
// of sync with the services we offer; "Other" covers anything not yet
// listed there.
const services = [
  ...serviceCatalog.map((service) => ({ label: service.title, value: service.slug })),
  { label: "Other / Not sure", value: "other" },
];

// Services with their own dedicated landing page (pricing, enrollment/apply
// flow) rather than just a generic /services/[slug] detail page - see
// ServiceDetail.href in features/services/data/services.ts. Picking one of
// these routes the visitor there directly instead of through this form.
const DEDICATED_PAGE_SERVICES: Record<string, { title: string; href: string; ctaLabel: string }> = {
  "istqb-certification": {
    title: "ISTQB Certification Prep",
    href: "/certification",
    ctaLabel: "Go to the certification page",
  },
  "qa-career-launchpad": {
    title: "QA Career Launchpad",
    href: "/qa-career-launchpad",
    ctaLabel: "Go to the QA Career Launchpad",
  },
};

// A small pool of phrasings for the dedicated-page suggestion, so it reads
// as a live recommendation rather than the same static banner every time.
// {title} is swapped for the selected service's display name.
const SUGGESTION_INTROS = [
  "Looks like {title} is what you're after. It has its own page with full pricing and a direct way to get started.",
  "Good news: {title} already has a dedicated page, complete details, pricing, and a direct sign-up, ready to go.",
  "For {title}, skip the wait on a reply. There's a page with everything you need and a direct way to register.",
  "{title} has its own home on the site, with full details and a direct enrollment flow.",
  "Good choice! {title} actually has its own home on our site with transparent pricing and an easy setup guide.",
  "To save you some time, we've put all the details, rates, and registration steps for {title} on one convenient page.",
  "Want to get started fast? The {title} page features upfront pricing and a direct enrollment flow.",
  "We've got you covered. All the details and pricing for {title} are live on its main page right now.",
];

export default function ContactFormCard() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    message: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [suggestionIntro, setSuggestionIntro] = useState("");
  const dedicatedPageSuggestion = DEDICATED_PAGE_SERVICES[formData.service];

  const { isListening, isSupported: speechSupported, toggle: toggleListening } = useSpeechToText(
    (transcript) => {
      setFormData((prev) => ({
        ...prev,
        message: prev.message.trim() ? `${prev.message.trim()} ${transcript}` : transcript,
      }));
      setErrors((prev) => ({ ...prev, message: "" }));
    }
  );

  // ---------- Validation functions ----------
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
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Please enter a valid email address";
        return "";
      }
      case "phone": {
        if (value && !/^[\+\d\s\-\(\)]{7,20}$/.test(value)) {
          return "Enter a valid phone number (e.g., +1 555 123 4567)";
        }
        return "";
      }
      case "message": {
        if (value.trim().length < 20) return "Message must be at least 20 characters";
        return "";
      }
      default:
        return "";
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Roll a fresh suggestion phrasing here, in the event handler, rather
    // than during render (e.g. in useMemo) - Math.random() during render
    // is an impure call React explicitly disallows.
    if (name === "service") {
      const suggestion = DEDICATED_PAGE_SERVICES[value];
      if (suggestion) {
        const pick = SUGGESTION_INTROS[Math.floor(Math.random() * SUGGESTION_INTROS.length)];
        setSuggestionIntro(pick.replace("{title}", suggestion.title));
      } else {
        setSuggestionIntro("");
      }
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    const fields = ["firstName", "lastName", "email", "phone", "message"];
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

  // Derived purely from formData, not from `errors` - `errors` only tracks
  // blur-time messages and can retain stale keys after a field is
  // corrected (handleChange clears a message to "" rather than deleting
  // the key), which would otherwise leave this permanently false once any
  // field had ever failed validation once, regardless of fill order.
  const isFormValid = (): boolean => {
    const required = ["firstName", "lastName", "email", "message"];
    const allFilled = required.every(
      (field) => formData[field as keyof typeof formData]?.trim()
    );
    const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`;
    const nameValid = fullName.length >= 3;
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const messageValid = formData.message.trim().length >= 20;
    const phoneValid = !formData.phone.trim() || /^[\+\d\s\-\(\)]{7,20}$/.test(formData.phone);
    return allFilled && nameValid && emailValid && messageValid && phoneValid;
  };

  // ---------- Submit handler ----------
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setShowSuccessModal(true); // ✅ Open modal on success
      trackEvent(ANALYTICS_EVENTS.CONTACT_FORM_SUBMITTED, { service: formData.service || undefined });

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        company: "",
        phone: "",
        service: "",
        message: "",
      });
      setErrors({});
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to send message");
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-[28px] border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-8 shadow-xl shadow-slate-200/40 dark:shadow-black/30 transition-all duration-300 hover:shadow-indigo-100/30 dark:hover:shadow-black/40 md:p-10"
      >
        <form onSubmit={handleSubmit} noValidate>
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
              {errors.firstName && (
                <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
              )}
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
              {errors.lastName && (
                <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
              )}
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
                placeholder="Work Email"
                required
                className="rounded-xl border-slate-200 dark:border-slate-800 transition-all duration-300 focus:border-indigo-300 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-500/20"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500">{errors.email}</p>
              )}
            </div>
            <div>
              <Input
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company (Optional)"
                className="rounded-xl border-slate-200 dark:border-slate-800 transition-all duration-300 focus:border-indigo-300 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-500/20"
              />
            </div>
          </div>

          <div className="mt-5">
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Phone Number (Optional)"
              className="rounded-xl border-slate-200 dark:border-slate-800 transition-all duration-300 focus:border-indigo-300 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-500/20"
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-500">{errors.phone}</p>
            )}
          </div>

          <div className="mt-5">
            <Select
              name="service"
              value={formData.service}
              onChange={handleChange}
              placeholder="Select a Service"
              options={services}
              className="rounded-xl border-slate-200 dark:border-slate-800 transition-all duration-300 focus:border-indigo-300 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-500/20"
            />
            <AnimatePresence>
              {dedicatedPageSuggestion && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginTop: 0 }}
                  animate={{ opacity: 1, height: "auto", marginTop: 12 }}
                  exit={{ opacity: 0, height: 0, marginTop: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden"
                >
                  <div className="relative overflow-hidden rounded-2xl border border-indigo-200 dark:border-indigo-800/60 bg-gradient-to-br from-indigo-50 dark:from-indigo-950/40 via-white dark:via-slate-900 to-violet-50/60 dark:to-violet-950/20 p-4">
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-sm shadow-indigo-500/30">
                        <Sparkles className="h-3.5 w-3.5" />
                      </span>
                      <div className="text-sm">
                        <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-indigo-600 dark:text-indigo-400">
                          Suggested for you
                        </p>
                        <p className="mt-1 text-slate-700 dark:text-slate-300">{suggestionIntro}</p>
                        <Link
                          href={dedicatedPageSuggestion.href}
                          className="group/link mt-3 inline-flex h-10 items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 text-[13px] font-semibold text-white shadow-sm shadow-indigo-500/20 transition-all duration-300 hover:shadow-indigo-500/30"
                        >
                          {dedicatedPageSuggestion.ctaLabel}
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-5">
            <div className="relative">
              <Textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                rows={5}
                placeholder="Tell us about your project..."
                required
                className={`rounded-xl border-slate-200 dark:border-slate-800 transition-all duration-300 focus:border-indigo-300 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-500/20 ${
                  speechSupported ? "pr-12" : ""
                }`}
              />
              {speechSupported && (
                <button
                  type="button"
                  onClick={toggleListening}
                  aria-label={isListening ? "Stop dictating" : "Dictate your message"}
                  aria-pressed={isListening}
                  className={`absolute right-3 bottom-3 flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-300 ${
                    isListening
                      ? "bg-red-500 text-white"
                      : "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 dark:hover:bg-indigo-900/50"
                  }`}
                >
                  {isListening ? (
                    <MicOff className="h-4 w-4" />
                  ) : (
                    <Mic className="h-4 w-4" />
                  )}
                  {isListening && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-60" />
                  )}
                </button>
              )}
            </div>
            {isListening && (
              <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-500 dark:text-red-400">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
                </span>
                Listening... speak now
              </p>
            )}
            {errors.message && (
              <p className="mt-1 text-xs text-red-500">{errors.message}</p>
            )}
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="mt-6"
          >
            <Button
              type="submit"
              disabled={status === "loading" || !isFormValid() || Boolean(dedicatedPageSuggestion)}
              className="group h-14 w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/20 dark:shadow-indigo-950/40 transition-all duration-300 hover:shadow-indigo-500/30 dark:hover:shadow-indigo-950/50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? "Sending..." : "Send Enquiry"}
              <Send className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </motion.div>

          {status === "error" && (
            <p className="mt-4 text-center text-sm font-medium text-red-600">
              ✗ {errorMessage || "Failed to send. Please try again."}
            </p>
          )}

          <p className="mt-4 text-center text-xs text-slate-600 dark:text-slate-400">
            {dedicatedPageSuggestion
              ? `This one's best handled from its own page, use the button above to continue.`
              : "We'll respond within 24 hours. Your information is kept confidential."}
          </p>
        </form>
      </motion.div>

      {/* ----- Success Modal ----- */}
      <Modal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" />
          </div>
          <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100">Message Sent! 🎉</h4>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Thank you for reaching out to <strong>QA Solucity</strong>.
            <br />
            Our QA specialists will get back to you within 24 hours.
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            We&apos;ve also sent a confirmation to your email.
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