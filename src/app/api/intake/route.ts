import { NextRequest, NextResponse } from 'next/server';
import { ADMIN_EMAIL, escapeHtml, sendEmail } from '@/lib/sendEmail';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const attempts = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 8;

function clientIp(request: NextRequest) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'
  );
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const current = attempts.get(ip);
  if (!current || now >= current.resetAt) {
    attempts.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > MAX_ATTEMPTS;
}

function cleanFields(value: unknown): Record<string, string> | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const entries = Object.entries(value as Record<string, unknown>);
  if (entries.length === 0 || entries.length > 60) return null;

  const cleaned: Record<string, string> = {};
  for (const [rawKey, rawValue] of entries) {
    if (typeof rawValue !== 'string') continue;
    const key = rawKey.trim().slice(0, 100);
    const fieldValue = rawValue.trim().slice(0, 4000);
    if (key && fieldValue) cleaned[key] = fieldValue;
  }
  return cleaned;
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: NextRequest) {
  if (isRateLimited(clientIp(request))) {
    return NextResponse.json(
      { success: false, error: 'Too many submissions. Please try again later.' },
      { status: 429 }
    );
  }

  let body: {
    fields?: unknown;
    privacyConsent?: unknown;
    botcheck?: unknown;
  };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body.' },
      { status: 400 }
    );
  }

  // Quietly accept honeypot submissions so bots receive no useful signal.
  if (typeof body.botcheck === 'string' && body.botcheck.trim()) {
    return NextResponse.json({ success: true });
  }
  if (body.privacyConsent !== true) {
    return NextResponse.json(
      { success: false, error: 'Please accept the intake privacy notice.' },
      { status: 400 }
    );
  }

  const fields = cleanFields(body.fields);
  const email = fields?.Email ?? '';
  const firstName = fields?.['First Name'] ?? '';
  const lastName = fields?.['Last Name'] ?? '';
  if (!fields || !firstName || !lastName || !validEmail(email)) {
    return NextResponse.json(
      { success: false, error: 'Required intake details are missing.' },
      { status: 400 }
    );
  }

  const submissionId = crypto.randomUUID();
  const rows = Object.entries(fields)
    .map(
      ([key, value]) =>
        `<tr><th style="text-align:left;vertical-align:top;padding:7px 12px 7px 0;color:#64748b">${escapeHtml(key)}</th><td style="padding:7px 0">${escapeHtml(value).replaceAll('\n', '<br />')}</td></tr>`
    )
    .join('');
  const requested = fields['Services Requested'] || 'intake review';

  const secureUploadUrl =
    process.env.NEXT_PUBLIC_SECURE_UPLOAD_URL || 'https://www.encyro.com/fileabroad';

  // Admin notification — this is the critical delivery.
  const adminResult = await sendEmail({
    to: ADMIN_EMAIL,
    replyTo: email,
    subject: `New FileAbroad intake: ${firstName} ${lastName} — ${requested}`,
    html: `<div style="font-family:system-ui,sans-serif;max-width:760px;margin:auto;color:#1e293b"><h1>New FileAbroad intake</h1><p><strong>Submission:</strong> ${escapeHtml(submissionId)}</p><table style="border-collapse:collapse;width:100%">${rows}</table><p style="margin-top:24px;color:#64748b;font-size:12px">The client was instructed not to submit tax documents, SSNs, passports, or account numbers through this intake.</p></div>`,
    text: [
      `New FileAbroad intake (${submissionId})`,
      '',
      ...Object.entries(fields).map(([key, value]) => `${key}: ${value}`),
    ].join('\n'),
  });

  if (!adminResult.success) {
    console.error(`[intake] admin delivery failed for ${submissionId}: ${adminResult.error}`);
    // Still return success to the user — we have the data and can follow up manually.
    // Log the full payload for recovery.
    console.error('[intake] recovery payload:', JSON.stringify({ submissionId, fields }));
  }

  // Client acknowledgement — best-effort.
  const acknowledgement = await sendEmail({
    to: email,
    replyTo: ADMIN_EMAIL,
    subject: 'FileAbroad received your intake',
    html: `<div style="font-family:system-ui,sans-serif;max-width:640px;margin:auto;color:#1e293b"><h1>Thanks, ${escapeHtml(firstName)}.</h1><p>I received your preliminary intake and will review it before recommending a scope. I personally review every intake and reply within one business day.</p><p><strong>Do not reply with Social Security numbers, passports, tax returns, or financial statements.</strong> When documents are needed, use the secure FileAbroad upload portal:</p><p><a href="${escapeHtml(secureUploadUrl)}">${escapeHtml(secureUploadUrl)}</a></p><p>Your submission reference is ${escapeHtml(submissionId)}.</p></div>`,
    text: `Thanks, ${firstName}. I received your preliminary intake and will review it before recommending a scope. I personally review every intake and reply within one business day. Do not email sensitive tax documents. Secure upload: ${secureUploadUrl}\n\nReference: ${submissionId}`,
  });
  if (!acknowledgement.success) {
    console.warn(`[intake] acknowledgement failed for ${submissionId}: ${acknowledgement.error}`);
  }

  return NextResponse.json({ success: true, submissionId });
}
