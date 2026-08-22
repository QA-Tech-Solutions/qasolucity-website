"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Modal from "@/components/ui/Modal";
import { motion } from "framer-motion";
import { Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const services = [
  { label: "Manual Testing", value: "manual-testing" },
  { label: "Automation Testing", value: "automation-testing" },
  { label: "API Testing", value: "api-testing" },
  { label: "Performance Testing", value: "performance-testing" },
  { label: "QA Consulting", value: "qa-consulting" },
  { label: "Corporate Training", value: "corporate-training" },
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

  const isFormValid = (): boolean => {
    const required = ["firstName", "lastName", "email", "message"];
    const allFilled = required.every(
      (field) => formData[field as keyof typeof formData]?.trim()
    );
    const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`;
    const nameValid = fullName.length >= 3;
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    const messageValid = formData.message.trim().length >= 20;
    return allFilled && nameValid && emailValid && messageValid && Object.keys(errors).length === 0;
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
        className="rounded-[28px] border border-slate-200/80 bg-white p-8 shadow-xl shadow-slate-200/40 transition-all duration-300 hover:shadow-indigo-100/30 md:p-10"
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
                className="rounded-xl border-slate-200 transition-all duration-300 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
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
                className="rounded-xl border-slate-200 transition-all duration-300 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
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
                className="rounded-xl border-slate-200 transition-all duration-300 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
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
                className="rounded-xl border-slate-200 transition-all duration-300 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
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
              className="rounded-xl border-slate-200 transition-all duration-300 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
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
              className="rounded-xl border-slate-200 pr-10 transition-all duration-300 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          <div className="mt-5">
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              onBlur={handleBlur}
              rows={5}
              placeholder="Tell us about your project..."
              required
              className="rounded-xl border-slate-200 transition-all duration-300 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100"
            />
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
              disabled={status === "loading" || !isFormValid()}
              className="group h-14 w-full rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/20 transition-all duration-300 hover:shadow-indigo-500/30 disabled:cursor-not-allowed disabled:opacity-60"
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

          <p className="mt-4 text-center text-xs text-slate-600">
            We'll respond within 24 hours. Your information is kept confidential.
          </p>
        </form>
      </motion.div>

      {/* ----- Success Modal ----- */}
      <Modal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)}>
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
            <CheckCircle2 className="h-8 w-8 text-emerald-600" />
          </div>
          <h4 className="text-xl font-bold text-slate-900">Message Sent! 🎉</h4>
          <p className="mt-2 text-sm text-slate-600">
            Thank you for reaching out to <strong>QA Solucity</strong>.
            <br />
            Our QA specialists will get back to you within 24 hours.
          </p>
          <p className="mt-1 text-sm text-slate-500">
            We've also sent a confirmation to your email.
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