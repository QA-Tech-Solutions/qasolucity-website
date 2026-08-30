"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, FileText, Mail, UploadCloud, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import Modal from "@/components/ui/Modal";
import { trackEvent, ANALYTICS_EVENTS } from "@/features/analytics/lib/posthog";

interface Props {
  jobTitle: string;
  jobSlug: string;
}

const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx"];

function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function hasAllowedExtension(filename: string): boolean {
  const lower = filename.toLowerCase();
  return ALLOWED_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

const initialFormData = { firstName: "", lastName: "", email: "", phone: "", message: "" };

export default function JobApplicationForm({ jobTitle, jobSlug }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [formData, setFormData] = useState(initialFormData);
  const [resume, setResume] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateResumeFile = (file: File): string => {
    if (file.size > MAX_RESUME_BYTES) return "Resume must be under 5MB";
    if (!hasAllowedExtension(file.name)) return "Resume must be a PDF, DOC, or DOCX file";
    return "";
  };

  const applyResumeFile = (file: File) => {
    const error = validateResumeFile(file);
    if (error) {
      setErrors((prev) => ({ ...prev, resume: error }));
      setResume(null);
      return;
    }
    setErrors((prev) => ({ ...prev, resume: "" }));
    setResume(file);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) applyResumeFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) applyResumeFile(file);
  };

  const clearResume = () => {
    setResume(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
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
    if (!resume) {
      newErrors.resume = "Attach your resume";
    } else {
      const resumeError = validateResumeFile(resume);
      if (resumeError) newErrors.resume = resumeError;
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
    return allFilled && nameValid && emailValid && phoneValid && Boolean(resume) && status !== "loading";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm() || !resume) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const body = new FormData();
      body.append("firstName", formData.firstName);
      body.append("lastName", formData.lastName);
      body.append("email", formData.email);
      body.append("phone", formData.phone);
      body.append("jobSlug", jobSlug);
      body.append("message", formData.message);
      body.append("resume", resume);

      const response = await fetch("/api/careers-apply", {
        method: "POST",
        body,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to submit your application");

      setStatus("idle");
      setShowSuccessModal(true);
      trackEvent(ANALYTICS_EVENTS.CAREER_APPLICATION_SUBMITTED, { jobTitle, jobSlug });
      setFormData(initialFormData);
      clearResume();
      setErrors({});
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to submit your application");
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-[28px] border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-7 shadow-xl shadow-slate-200/40 dark:shadow-black/30 sm:p-8"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-indigo-600 dark:text-indigo-400">
          Apply now
        </p>
        <h3 className="mt-3 text-2xl font-bold text-slate-900 dark:text-slate-100">
          Apply for {jobTitle}.
        </h3>
        <p className="mt-2 text-[15px] leading-7 text-slate-600 dark:text-slate-400">
          Attach your resume and tell us a little about yourself. We read every application
          ourselves.
        </p>

        <form onSubmit={handleSubmit} noValidate className="mt-7">
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
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
              Resume
            </label>
            {resume ? (
              <div className="flex items-center justify-between gap-3 rounded-xl border border-indigo-200 dark:border-indigo-800/60 bg-indigo-50/60 dark:bg-indigo-950/30 px-4 py-3">
                <div className="flex min-w-0 items-center gap-3">
                  <FileText className="h-5 w-5 shrink-0 text-indigo-600 dark:text-indigo-400" />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-800 dark:text-slate-200">
                      {resume.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-500">
                      {formatFileSize(resume.size)}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={clearResume}
                  aria-label="Remove resume"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-white dark:hover:bg-slate-900 hover:text-slate-700 dark:hover:text-slate-300"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-8 text-center transition-colors duration-200 ${
                  dragActive
                    ? "border-indigo-400 bg-indigo-50/60 dark:bg-indigo-950/30"
                    : "border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700"
                }`}
              >
                <UploadCloud className="h-6 w-6 text-slate-400 dark:text-slate-500" />
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  Click to upload, or drag and drop
                </p>
                <p className="text-xs text-slate-400 dark:text-slate-500">PDF, DOC, or DOCX, up to 5MB</p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileInputChange}
              className="hidden"
            />
            {errors.resume && <p className="mt-1 text-xs text-red-500">{errors.resume}</p>}
          </div>

          <div className="mt-5">
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              placeholder="Anything you'd like us to know? (Optional)"
              className="rounded-xl border-slate-200 dark:border-slate-800 transition-all duration-300 focus:border-indigo-300 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-500/20"
            />
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="mt-6">
            <Button
              type="submit"
              disabled={!isFormValid()}
              className="group h-14 w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/20 dark:shadow-indigo-950/40 transition-all duration-300 hover:shadow-indigo-500/30 dark:hover:shadow-indigo-950/50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? "Submitting..." : "Submit Application"}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </motion.div>

          {status === "error" && (
            <p className="mt-4 text-center text-sm font-medium text-red-600">
              ✗ {errorMessage || "Failed to submit. Please try again."}
            </p>
          )}

          <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-500">
            We&apos;ll email you a confirmation, and reach out directly if it looks like a fit.
          </p>
        </form>
      </motion.div>

      <Modal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" />
          </div>
          <h4 className="text-xl font-bold text-slate-900 dark:text-slate-100">Application sent! 🎉</h4>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Thanks for applying for <strong>{jobTitle}</strong>.
          </p>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            We&apos;ve sent a confirmation to your email. Our team reviews every application and will
            reach out if it looks like a fit.
          </p>
          <button
            onClick={() => setShowSuccessModal(false)}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-6 py-2.5 font-semibold text-white transition hover:opacity-90"
          >
            <Mail className="h-4 w-4" />
            Got it, thanks
          </button>
        </div>
      </Modal>
    </>
  );
}
