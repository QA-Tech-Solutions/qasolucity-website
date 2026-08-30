import { Resend } from "resend";
import { NextResponse } from "next/server";
import {
  launchpadConfirmationEmail,
  launchpadInternalNotificationEmail,
} from "@/lib/email-templates";

const CONTACT_EMAIL = process.env.CONTACT_NOTIFICATION_EMAIL || "hello@qasolucity.com";

interface EnrollPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  notes?: string;
}

function validate(payload: Partial<EnrollPayload>): string | null {
  const fullName = `${payload.firstName?.trim() ?? ""} ${payload.lastName?.trim() ?? ""}`.trim();
  if (fullName.length < 3) return "Full name must be at least 3 characters";
  if (!payload.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return "Please enter a valid email address";
  }
  if (!payload.phone?.trim()) return "Phone number is required";
  if (!/^[\+\d\s\-\(\)]{7,20}$/.test(payload.phone)) {
    return "Enter a valid phone number";
  }
  return null;
}

export async function POST(request: Request) {
  const payload = (await request.json()) as Partial<EnrollPayload>;

  const validationError = validate(payload);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const { firstName, lastName, email, phone, notes } = payload as EnrollPayload;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email service is not configured" },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);
  const details = { firstName, lastName, email, phone, notes };

  try {
    const internal = launchpadInternalNotificationEmail(details);
    const confirmation = launchpadConfirmationEmail(details);

    await Promise.all([
      resend.emails.send({
        from: "QA Solucity <onboarding@resend.dev>",
        to: CONTACT_EMAIL,
        replyTo: email,
        subject: internal.subject,
        html: internal.html,
        text: internal.text,
      }),
      resend.emails.send({
        from: "QA Solucity <onboarding@resend.dev>",
        to: email,
        subject: confirmation.subject,
        html: confirmation.html,
        text: confirmation.text,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send QA Career Launchpad application email:", error);
    return NextResponse.json(
      { error: "Failed to submit your application. Please try again." },
      { status: 500 }
    );
  }
}
