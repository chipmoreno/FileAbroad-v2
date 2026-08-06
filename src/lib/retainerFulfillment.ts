/**
 * Retainer fulfillment for FileAbroad.
 *
 * Fulfillment routine reserved for a future validated paid-invoice
 * reconciliation flow. Mercury's current official webhooks do not emit
 * `invoice.paid`, and the transparent API proxy does not synthesize it.
 *
 * Steps:
 *   1. Send a payment-received confirmation email to the customer.
 *   2. Notify admin (info@fileabroad.com) so Chip sees the sale in his inbox.
 *
 * Any production caller must provide durable idempotency before invoking this
 * routine; the current webhook route's in-memory set is not durable.
 */

import {
  getServicePricing,
  SERVICE_PRICING,
  type ServiceKey,
} from "@/lib/pricing";
import { sendGa4ServerEvent } from "@/lib/ga4-server";
import {
  sendEmail,
  ADMIN_EMAIL,
  escapeHtml,
} from "@/lib/sendEmail";

const SERVICE_KEYS = Object.keys(SERVICE_PRICING) as ServiceKey[];

export type FulfillmentInput = {
  invoiceId: string;
  invoiceNumber: string;
  amount: number;
  serviceType: ServiceKey;
  customerName: string;
  customerEmail: string;
  year?: number | null;
  paidAt?: string;
  addOns?: ServiceKey[];
  recordingConsent?: "yes" | "no";
  gaClientId?: string;
};

export type FulfillmentResult = {
  emailSent: boolean;
  emailError?: string;
  adminNotified: boolean;
  adminError?: string;
};

function deriveServiceTypeFromMemo(
  memo: string | null | undefined
): ServiceKey | null {
  if (!memo) return null;
  const m = memo.toLowerCase();
  for (const key of SERVICE_KEYS) {
    if (m.includes(`(${key})`)) return key;
    if (m.includes(key)) return key;
  }
  return null;
}

function firstName(name: string): string {
  return name.trim().split(/\s+/)[0] || "there";
}

function safeHttpsUrl(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.toString() : undefined;
  } catch {
    return undefined;
  }
}

function schedulingUrlForService(serviceType: ServiceKey): string | undefined {
  const fallback = process.env.SCHEDULING_URL;
  switch (serviceType) {
    case "consultation30":
      return safeHttpsUrl(process.env.SCHEDULING_URL_30 ?? fallback);
    case "consultation60":
      return safeHttpsUrl(process.env.SCHEDULING_URL_60 ?? fallback);
    case "consultationNonClient":
      return safeHttpsUrl(process.env.SCHEDULING_URL_NONCLIENT ?? fallback);
    default:
      return undefined;
  }
}

function whatHappensNextCopy(
  serviceType: ServiceKey,
  year: number | null | undefined
): string {
  switch (serviceType) {
    case "taxFiling":
    case "complete":
      return year
        ? `I'll follow up within one business day with the document checklist and intake link for your ${year} return.`
        : `I'll follow up within one business day with the document checklist and intake link.`;
    case "fbar":
      return year
        ? `I'll follow up within one business day with the account list I'll need to file your ${year} FBAR.`
        : `I'll follow up within one business day with the account list I'll need to file your FBAR.`;
    case "consultation30":
    case "consultation60":
    case "consultationNonClient":
      return schedulingUrlForService(serviceType)
        ? "Use the private scheduling link below to choose your time."
        : "I'll reach out within one business day with a private scheduling link.";
    case "streamlined":
      return "I'll reach out within one business day to start the streamlined catch-up — usually 3-6 weeks end-to-end once I have your documents.";
    case "amendedReturn":
      return "I'll reach out within one business day to confirm the year and the items we're correcting.";
    default:
      return "I'll follow up within one business day with next steps.";
  }
}

async function sendCustomerConfirmation(
  input: FulfillmentInput
): Promise<{ ok: boolean; error?: string }> {
  const pricing = getServicePricing(input.serviceType);
  const name = firstName(input.customerName);
  const yearLine =
    input.serviceType === "taxFiling" || input.serviceType === "fbar"
      ? input.year
        ? ` (tax year ${input.year})`
        : ""
      : "";

  const subject = `FileAbroad \u2014 payment received for ${pricing.label}`;
  const nextSteps = whatHappensNextCopy(input.serviceType, input.year);
  const contactEmail = "info@fileabroad.com";
  const isConsultation = [
    "consultation30",
    "consultation60",
    "consultationNonClient",
  ].includes(input.serviceType);
  const schedulingUrl = isConsultation
    ? schedulingUrlForService(input.serviceType)
    : undefined;
  const addOnLine = input.addOns?.length
    ? `<p style="margin:0 0 14px"><strong>Add-ons:</strong> ${escapeHtml(
        input.addOns.map((key) => getServicePricing(key).label).join(", ")
      )}</p>`
    : "";
  const recordingLine = isConsultation
    ? `<p style="margin:0 0 14px"><strong>Recording choice:</strong> ${
        input.recordingConsent === "yes"
          ? "Consented to call recording and AI transcription"
          : "No recording or AI transcription"
      }</p>`
    : "";
  const schedulingButton = schedulingUrl
    ? `<p style="margin:20px 0"><a href="${escapeHtml(schedulingUrl)}" style="display:inline-block;background:#d97706;color:#ffffff;text-decoration:none;font-weight:700;padding:12px 18px;border-radius:8px">Choose a consultation time</a></p>`
    : "";

  const html = `
    <div style="margin:0;background:#fdf9f3;padding:32px 16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif">
      <div style="max-width:640px;margin:0 auto;background:#ffffff;border:1px solid #e7dccb;border-radius:12px;overflow:hidden">
        <div style="padding:24px 28px;border-bottom:1px solid #e7dccb;background:#0f172a">
          <p style="margin:0 0 6px;font-size:12px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:#d97706">FileAbroad</p>
          <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:24px;line-height:1.2;color:#ffffff">Payment received</h1>
        </div>
        <div style="padding:24px 28px;color:#1e293b;font-size:15px;line-height:1.65">
          <p style="margin:0 0 14px">Hi ${escapeHtml(name)},</p>
          <p style="margin:0 0 14px">
            Thanks \u2014 I received your payment of
            <strong>$${input.amount.toLocaleString()}</strong>
            for <strong>${escapeHtml(pricing.label)}</strong>${yearLine ? ` <span style="color:#64748b">${escapeHtml(yearLine)}</span>` : ""}.
          </p>
          <p style="margin:0 0 14px">
            <strong>Invoice:</strong> ${escapeHtml(input.invoiceNumber)}
          </p>
          ${addOnLine}
          ${recordingLine}
          <p style="margin:0 0 14px">${escapeHtml(nextSteps)}</p>
          ${schedulingButton}
          <p style="margin:0 0 14px">
            Need to reach me in the meantime? Just reply to this email.
          </p>
          <hr style="border:none;border-top:1px solid #e7dccb;margin:20px 0" />
          <p style="margin:0;font-size:12px;color:#64748b">
            FileAbroad provides U.S. tax return preparation within a written scope. This is a payment confirmation, not legal advice or representation.
          </p>
        </div>
      </div>
    </div>
  `;

  const text = [
    `Hi ${name},`,
    "",
    `Thanks \u2014 I received your payment of $${input.amount.toLocaleString()} for ${pricing.label}${yearLine}.`,
    `Invoice: ${input.invoiceNumber}`,
    input.addOns?.length
      ? `Add-ons: ${input.addOns.map((key) => getServicePricing(key).label).join(", ")}`
      : "",
    isConsultation
      ? `Recording choice: ${input.recordingConsent === "yes" ? "consented" : "no recording or AI transcription"}`
      : "",
    "",
    nextSteps,
    schedulingUrl ? `Schedule: ${schedulingUrl}` : "",
    "",
    "Or just reply to this email.",
    "",
    "FileAbroad provides U.S. tax return preparation within a written scope.",
  ].filter(Boolean).join("\n");

  const result = await sendEmail({
    to: input.customerEmail,
    subject,
    html,
    text,
    replyTo: ADMIN_EMAIL,
    idempotencyKey: `mercury-${input.invoiceId}-fileabroad-client-v1`,
  });

  return result.success ? { ok: true } : { ok: false, error: result.error };
}

async function notifyAdmin(
  input: FulfillmentInput
): Promise<{ ok: boolean; error?: string }> {
  const pricing = getServicePricing(input.serviceType);
  const subject = `\ud83d\udcb0 Paid invoice: ${input.customerEmail} \u2014 ${input.invoiceNumber} ($${input.amount})`;
  const html = `
    <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
      <div style="background: #d97706; color: white; padding: 20px 24px;">
        <h1 style="margin: 0; font-size: 22px;">FileAbroad invoice paid</h1>
      </div>
      <div style="padding: 24px; background: #fdf9f3; border: 1px solid #e7dccb; border-top: 0;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr><td style="padding: 6px 0; color: #64748b; width: 160px;">Customer</td><td style="padding: 6px 0; font-weight: 600;">${escapeHtml(input.customerName)}</td></tr>
          <tr><td style="padding: 6px 0; color: #64748b;">Email</td><td style="padding: 6px 0;"><a href="mailto:${escapeHtml(input.customerEmail)}" style="color: #d97706;">${escapeHtml(input.customerEmail)}</a></td></tr>
          <tr><td style="padding: 6px 0; color: #64748b;">Service</td><td style="padding: 6px 0;">${escapeHtml(pricing.label)}${input.year ? ` (TY${input.year})` : ""}</td></tr>
          <tr><td style="padding: 6px 0; color: #64748b;">Amount</td><td style="padding: 6px 0;">$${input.amount.toLocaleString()}</td></tr>
          ${input.addOns?.length ? `<tr><td style="padding: 6px 0; color: #64748b;">Add-ons</td><td style="padding: 6px 0;">${escapeHtml(input.addOns.map((key) => getServicePricing(key).label).join(", "))}</td></tr>` : ""}
          ${input.recordingConsent ? `<tr><td style="padding: 6px 0; color: #64748b;">Recording</td><td style="padding: 6px 0;">${escapeHtml(input.recordingConsent)}</td></tr>` : ""}
          <tr><td style="padding: 6px 0; color: #64748b;">Mercury invoice</td><td style="padding: 6px 0;">${escapeHtml(input.invoiceNumber)} (${escapeHtml(input.invoiceId)})</td></tr>
          ${input.paidAt ? `<tr><td style="padding: 6px 0; color: #64748b;">Paid at</td><td style="padding: 6px 0;">${escapeHtml(input.paidAt)}</td></tr>` : ""}
        </table>
        <p style="color: #64748b; font-size: 12px; margin-top: 16px;">Customer confirmation email sent.</p>
      </div>
    </div>
  `;
  const text = `FileAbroad invoice paid\n\nCustomer: ${input.customerName}\nEmail: ${input.customerEmail}\nService: ${pricing.label}${input.year ? ` (TY${input.year})` : ""}\nAmount: $${input.amount}\nMercury invoice: ${input.invoiceNumber} (${input.invoiceId})\n\nCustomer confirmation email sent.`;

  const result = await sendEmail({
    to: ADMIN_EMAIL,
    subject,
    html,
    text,
    idempotencyKey: `mercury-${input.invoiceId}-fileabroad-admin-v1`,
  });
  return result.success ? { ok: true } : { ok: false, error: result.error };
}

export async function fulfillRetainerPayment(
  input: FulfillmentInput
): Promise<FulfillmentResult> {
  const [emailResult, adminResult] = await Promise.all([
    sendCustomerConfirmation(input),
    notifyAdmin(input),
  ]);

  const analyticsSent = await sendGa4ServerEvent({
    clientId: input.gaClientId,
    name: "purchase",
    params: {
      transaction_id: input.invoiceId,
      currency: "USD",
      value: input.amount,
      service: input.serviceType,
    },
  }).catch(() => false);

  if (input.gaClientId && !analyticsSent) {
    console.warn(`[fulfillment] GA4 purchase event not sent for ${input.invoiceId}`);
  }

  return {
    emailSent: emailResult.ok,
    emailError: emailResult.error,
    adminNotified: adminResult.ok,
    adminError: adminResult.error,
  };
}

export { deriveServiceTypeFromMemo };
