import { Resend } from "resend";
import { NextResponse } from "next/server";
import {
  jobApplicationConfirmationEmail,
  jobApplicationInternalEmail,
} from "@/lib/email-templates";
import { getJobBySlug } from "@/lib/careers";

const CONTACT_EMAIL = process.env.CONTACT_NOTIFICATION_EMAIL || "hello@qasolucity.com";

const MAX_RESUME_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_RESUME_TYPES = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);
const ALLOWED_RESUME_EXTENSIONS = [".pdf", ".doc", ".docx"];

function hasAllowedExtension(filename: string): boolean {
  const lower = filename.toLowerCase();
  return ALLOWED_RESUME_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

export async function POST(request: Request) {
  const formData = await request.formData();

  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const jobSlug = String(formData.get("jobSlug") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const resume = formData.get("resume");

  const fullName = `${firstName} ${lastName}`.trim();
  if (fullName.length < 3) {
    return NextResponse.json({ error: "Full name must be at least 3 characters" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
  }
  if (!phone) {
    return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
  }
  if (!/^[\+\d\s\-\(\)]{7,20}$/.test(phone)) {
    return NextResponse.json({ error: "Enter a valid phone number" }, { status: 400 });
  }

  const job = getJobBySlug(jobSlug);
  if (!job || job.status !== "open") {
    return NextResponse.json(
      { error: "This role is no longer accepting applications" },
      { status: 400 }
    );
  }

  if (!(resume instanceof File) || resume.size === 0) {
    return NextResponse.json({ error: "Attach your resume (PDF, DOC, or DOCX)" }, { status: 400 });
  }
  if (resume.size > MAX_RESUME_BYTES) {
    return NextResponse.json({ error: "Resume must be under 5MB" }, { status: 400 });
  }
  const typeAllowed =
    ALLOWED_RESUME_TYPES.has(resume.type) || hasAllowedExtension(resume.name);
  if (!typeAllowed) {
    return NextResponse.json(
      { error: "Resume must be a PDF, DOC, or DOCX file" },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email service is not configured" }, { status: 500 });
  }

  try {
    const resend = new Resend(apiKey);
    const resumeBuffer = Buffer.from(await resume.arrayBuffer());

    const details = {
      firstName,
      lastName,
      email,
      phone,
      jobTitle: job.title,
      jobSlug,
      message: message || undefined,
      resumeFilename: resume.name,
    };

    const internal = jobApplicationInternalEmail(details);
    const confirmation = jobApplicationConfirmationEmail(details);

    await Promise.all([
      resend.emails.send({
        from: "QA Solucity Careers <onboarding@resend.dev>",
        to: CONTACT_EMAIL,
        replyTo: email,
        subject: internal.subject,
        html: internal.html,
        text: internal.text,
        attachments: [
          {
            filename: resume.name,
            content: resumeBuffer,
          },
        ],
      }),
      resend.emails.send({
        from: "QA Solucity Careers <onboarding@resend.dev>",
        to: email,
        subject: confirmation.subject,
        html: confirmation.html,
        text: confirmation.text,
      }),
    ]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send job application email:", error);
    return NextResponse.json(
      { error: "Failed to submit your application. Please try again." },
      { status: 500 }
    );
  }
}
