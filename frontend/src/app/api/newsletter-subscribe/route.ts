import { Resend } from "resend";
import { NextResponse } from "next/server";
import { newsletterInternalNotificationEmail, newsletterConfirmationEmail } from "@/lib/email-templates";
import { upsertSubscriber, getSubscribersCsv } from "@/lib/newsletter-store";

const CONTACT_EMAIL = process.env.CONTACT_NOTIFICATION_EMAIL || "hello@qasolucity.com";

interface SubscribePayload {
  name: string;
  email: string;
}

function validate(payload: Partial<SubscribePayload>): string | null {
  if (!payload.name?.trim() || payload.name.trim().length < 2) {
    return "Please enter your name";
  }
  if (!payload.email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return "Please enter a valid email address";
  }
  return null;
}

export async function POST(request: Request) {
  const payload = (await request.json()) as Partial<SubscribePayload>;

  const validationError = validate(payload);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const { name, email } = payload as SubscribePayload;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email service is not configured" }, { status: 500 });
  }

  try {
    const isNew = await upsertSubscriber({ name, email });

    const resend = new Resend(apiKey);
    const confirmation = newsletterConfirmationEmail({ name, email, alreadySubscribed: !isNew });

    const emailsToSend = [
      resend.emails.send({
        from: "QA Solucity <noreply@qasolucity.com>",
        to: email,
        replyTo: CONTACT_EMAIL,
        subject: confirmation.subject,
        html: confirmation.html,
        text: confirmation.text,
      }),
    ];

    // Only notify the admin for a genuinely new subscriber - a repeat
    // signup from the same email shouldn't send the CSV again.
    if (isNew) {
      const csv = await getSubscribersCsv();
      const internal = newsletterInternalNotificationEmail({ name, email });

      emailsToSend.push(
        resend.emails.send({
          from: "QA Solucity Newsletter <noreply@qasolucity.com>",
          to: CONTACT_EMAIL,
          replyTo: email,
          subject: internal.subject,
          html: internal.html,
          text: internal.text,
          attachments: [
            {
              filename: "newsletter-subscribers.csv",
              content: Buffer.from(csv, "utf-8"),
            },
          ],
        })
      );
    }

    await Promise.all(emailsToSend);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to process newsletter subscription:", error);
    return NextResponse.json(
      { error: "Failed to subscribe. Please try again." },
      { status: 500 }
    );
  }
}
