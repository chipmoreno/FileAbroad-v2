export const DEFAULT_FROM =
  process.env.RESEND_FROM_EMAIL || "FileAbroad <noreply@ecuapass.com>";
export const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "chip.moreno@gmail.com";
export const CHIP_WHATSAPP_NUMBER =
  process.env.CHIP_WHATSAPP_NUMBER || "+593962848410";

export type Attachment = {
  filename: string;
  content: string;
};

export type SendEmailOptions = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  from?: string;
  replyTo?: string;
  attachments?: Attachment[];
  idempotencyKey?: string;
};

export type SendEmailResult = {
  success: boolean;
  data?: { id: string };
  error?: string;
};

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendEmail(
  options: SendEmailOptions
): Promise<SendEmailResult> {
  const {
    to,
    subject,
    html,
    text,
    from = DEFAULT_FROM,
    replyTo,
    attachments,
    idempotencyKey,
  } = options;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Ordinary local previews may log email, but payment fulfillment must never
    // mark an invoice complete without an actual transactional delivery.
    if (process.env.NODE_ENV !== "production" && !idempotencyKey) {
      console.log("[sendEmail] RESEND_API_KEY not set — logging email instead");
      console.log({
        from,
        to,
        subject,
        replyTo,
        preview: text ?? html.slice(0, 200),
      });
      return { success: true, data: { id: "dev-log" } };
    }
    return {
      success: false,
      error: "RESEND_API_KEY is not configured in this environment.",
    };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        ...(idempotencyKey ? { "Idempotency-Key": idempotencyKey } : {}),
      },
      body: JSON.stringify({
        from,
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
        text,
        reply_to: replyTo,
        attachments,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[sendEmail] Resend error:", errText);
      return { success: false, error: errText };
    }

    const data = (await res.json()) as { id?: string };
    return { success: true, data: { id: data.id ?? "unknown" } };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown email error";
    console.error("[sendEmail] exception:", err);
    return { success: false, error: message };
  }
}
