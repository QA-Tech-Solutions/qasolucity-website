import { Resend } from "resend";
import { NextResponse } from "next/server";
import {
  certificationConfirmationEmail,
  certificationInternalNotificationEmail,
} from "@/lib/email-templates";
import { getCertificationPricing } from "@/lib/certification-pricing";
import { assignVoucherCode } from "@/lib/certification-voucher-store";
import { allCertifications } from "@/features/certification/data/certification-data";

const CONTACT_EMAIL = "hello@qasolucity.com";

interface EnrollPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  certification: string;
  track: "prep" | "bundle";
  notes?: string;
}

function validate(payload: Partial<EnrollPayload>): string | null {
  const fullName = `${payload.firstName?.trim() ?? ""} ${payload.lastName?.trim() ?? ""}`.trim();
  if (fullName.length < 3) return "Full name must be at least 3 characters";
  if (!payload.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return "Please enter a valid email address";
  }
  if (payload.phone && !/^[\+\d\s\-\(\)]{7,20}$/.test(payload.phone)) {
    return "Enter a valid phone number";
  }
  if (payload.track !== "prep" && payload.track !== "bundle") {
    return "Please choose a valid enrollment track";
  }
  if (!payload.certification || !allCertifications.some((item) => item.code === payload.certification)) {
    return "Please choose which certification you're targeting";
  }
  return null;
}

export async function POST(request: Request) {
  const payload = (await request.json()) as Partial<EnrollPayload>;

  const validationError = validate(payload);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const { firstName, lastName, email, phone, certification, track, notes } = payload as EnrollPayload;
  const certificationEntry = allCertifications.find((item) => item.code === certification)!;

  const pricing = await getCertificationPricing();
  const priceNgn = track === "bundle" ? pricing.bundlePriceNgn : pricing.trainingFeeNgn;

  // Route C only: try to hand out a real voucher code from bulk inventory
  // immediately. An empty batch just means an admin assigns one by hand —
  // enrollment still succeeds either way.
  const voucherCode = track === "bundle" ? await assignVoucherCode(certification) : null;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email service is not configured" },
      { status: 500 }
    );
  }

  const resend = new Resend(apiKey);
  const details = {
    firstName,
    lastName,
    email,
    phone,
    track,
    certificationCode: certification,
    certificationName: certificationEntry.name,
    notes,
    priceNgn,
    voucherCode,
  };

  try {
    const internal = certificationInternalNotificationEmail(details);
    const confirmation = certificationConfirmationEmail(details);

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

    return NextResponse.json({
      success: true,
      voucherAssigned: Boolean(voucherCode),
      voucherCode,
      priceNgn,
    });
  } catch (error) {
    console.error("Failed to send certification enrollment email:", error);
    return NextResponse.json(
      { error: "Failed to submit your enrollment. Please try again." },
      { status: 500 }
    );
  }
}
