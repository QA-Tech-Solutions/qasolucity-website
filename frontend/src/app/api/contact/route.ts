import { Resend } from "resend";
import { NextResponse } from "next/server";
import { confirmationEmail, internalNotificationEmail } from "@/lib/email-templates";

const CONTACT_EMAIL = "hello@qasolucity.com";

interface ContactPayload {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  message: string;
}

function validate(payload: Partial<ContactPayload>): string | null {
  const fullName = `${payload.firstName?.trim() ?? ""} ${payload.lastName?.trim() ?? ""}`.trim();
  if (fullName.length < 3) return "Full name must be at least 3 characters";
  if (!payload.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return "Please enter a valid email address";
  }
  if (payload.phone && !/^[\+\d\s\-\(\)]{7,20}$/.test(payload.phone)) {
    return "Enter a valid phone number";
  }
  if (!payload.message || payload.message.trim().length < 20) {
    return "Message must be at least 20 characters";
  }
  return null;
}

export async function POST(request: Request) {
  const payload = (await request.json()) as Partial<ContactPayload>;

  const validationError = validate(payload);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const { firstName, lastName, email, company, phone, service, message } = payload as ContactPayload;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email service is not configured" },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);
  const details = { firstName, lastName, email, company, phone, service, message };

  try {
    const internal = internalNotificationEmail(details);
    const confirmation = confirmationEmail(details);

    await Promise.all([
      resend.emails.send({
        from: "QA Solucity Website <onboarding@resend.dev>",
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
    console.error("Failed to send contact email:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
