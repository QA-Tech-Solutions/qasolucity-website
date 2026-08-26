import { Resend } from "resend";
import { NextResponse } from "next/server";
import { isAdminSessionValid } from "@/lib/admin-auth";
import { isVoucherAvailable, markVoucherUsed } from "@/lib/certification-voucher-store";
import { appendVoucherLogEntry } from "@/lib/certification-voucher-log-store";
import { allCertifications } from "@/features/certification/data/certification-data";
import { voucherAssignmentConfirmedEmail, voucherDeliveryEmail } from "@/lib/email-templates";

const CONTACT_EMAIL = process.env.CONTACT_NOTIFICATION_EMAIL || "hello@qasolucity.com";

interface AssignPayload {
  certification: string;
  code: string;
  customerName: string;
  customerEmail: string;
  paymentConfirmed: boolean;
  codeVerifiedUnused: boolean;
}

export async function POST(request: Request) {
  if (!(await isAdminSessionValid())) {
    return NextResponse.json({ error: "Not authorized" }, { status: 401 });
  }

  const payload = (await request.json()) as Partial<AssignPayload>;
  const { certification, code, customerName, customerEmail, paymentConfirmed, codeVerifiedUnused } = payload;

  const certificationEntry = allCertifications.find((item) => item.code === certification);
  if (!certificationEntry) {
    return NextResponse.json({ error: "Unknown certification" }, { status: 400 });
  }
  if (!code?.trim()) {
    return NextResponse.json({ error: "Enter a voucher code" }, { status: 400 });
  }
  if (!customerEmail?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
    return NextResponse.json({ error: "Missing or invalid customer email" }, { status: 400 });
  }
  // The checklist is enforced here too, not just as a disabled button on
  // the client — a request that skips the client entirely must still be
  // unable to send a voucher without both confirmations.
  if (!paymentConfirmed || !codeVerifiedUnused) {
    return NextResponse.json(
      { error: "Both checklist items must be confirmed before a voucher can be sent" },
      { status: 400 }
    );
  }

  const available = await isVoucherAvailable(certification!, code);
  if (!available) {
    return NextResponse.json(
      { error: "This code isn't in the available pool for this certification. Check for typos, or whether it's already been used." },
      { status: 409 }
    );
  }

  const marked = await markVoucherUsed(certification!, code);
  if (!marked) {
    // Someone else claimed it between the check above and now (rare, but
    // possible with two admins working at once) — fail rather than send
    // a code that's no longer actually reserved for this customer.
    return NextResponse.json(
      { error: "This code was just claimed elsewhere. Refresh and pick a different one." },
      { status: 409 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Email service is not configured" }, { status: 500 });
  }

  try {
    const resend = new Resend(apiKey);
    const email = voucherDeliveryEmail({
      firstName: customerName?.trim().split(" ")[0] || "there",
      certificationName: certificationEntry.name,
      voucherCode: code,
    });

    await resend.emails.send({
      from: "QA Solucity <onboarding@resend.dev>",
      to: customerEmail,
      subject: email.subject,
      html: email.html,
      text: email.text,
    });

    // Audit trail — append-only, never overwritten. Best-effort: a logging
    // failure here shouldn't undo or fail an assignment that already went
    // out to the customer.
    await appendVoucherLogEntry({
      timestamp: new Date().toISOString(),
      certificationCode: certification!,
      certificationName: certificationEntry.name,
      voucherCode: code,
      customerName: customerName?.trim() || "",
      customerEmail,
    });

    // Confirms to the admin, in writing, that this went out — separate
    // from the in-browser success screen, with a link to the running log.
    try {
      const confirmation = voucherAssignmentConfirmedEmail({
        certificationName: certificationEntry.name,
        voucherCode: code,
        customerName: customerName?.trim() || "the customer",
        customerEmail,
      });
      await resend.emails.send({
        from: "QA Solucity Website <onboarding@resend.dev>",
        to: CONTACT_EMAIL,
        subject: confirmation.subject,
        html: confirmation.html,
        text: confirmation.text,
      });
    } catch (confirmationError) {
      // Non-fatal — the customer already has their voucher; this is just
      // a courtesy notification on top of that.
      console.error("Failed to send admin voucher-assignment confirmation email:", confirmationError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    // The code is already marked used at this point — an email failure
    // here needs a human to notice and resend by hand, not a silent retry
    // that could double-send or leave the pool permanently short by one.
    console.error(
      `Failed to email voucher ${code} (${certification}) to ${customerEmail} — code is already marked used:`,
      error
    );
    return NextResponse.json(
      {
        error:
          "The code was marked used, but the email failed to send. Copy it down and email it manually: " +
          code,
      },
      { status: 500 }
    );
  }
}
