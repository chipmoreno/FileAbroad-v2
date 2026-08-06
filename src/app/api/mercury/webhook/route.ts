import { NextRequest, NextResponse } from "next/server";
import { verifyMercuryWebhookSignature } from "@/lib/mercury";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function jsonError(error: string, status: number) {
  return NextResponse.json({ error }, { status });
}

function signatureTimestamp(signatureHeader: string | null): string {
  return signatureHeader?.match(/(?:^|,)\s*t=([^,]+)/)?.[1]?.trim() || "";
}

/**
 * Mercury's official webhook contract reports account and transaction changes,
 * not invoice.paid. This endpoint validates and observes those events only.
 * Paid-invoice fulfillment is exclusively handled by the protected, durable
 * reconciliation endpoint.
 */
export async function POST(request: NextRequest) {
  const secret = process.env.MERCURY_WEBHOOK_SECRET;
  if (!secret) return jsonError("Webhook not configured", 503);

  const rawBody = await request.text();
  const signatureHeader = request.headers.get("mercury-signature");
  const legacyTimestamp = request.headers.get("mercury-timestamp");
  const valid = await verifyMercuryWebhookSignature({
    rawBody,
    signatureHeader,
    timestamp: legacyTimestamp || signatureTimestamp(signatureHeader),
    secret,
  });
  if (!valid) return jsonError("Invalid signature", 400);

  let event: Record<string, unknown>;
  try {
    event = JSON.parse(rawBody) as Record<string, unknown>;
  } catch {
    return jsonError("Invalid JSON", 400);
  }

  const resourceType =
    typeof event.resourceType === "string" ? event.resourceType : "unknown";
  const resourceId =
    typeof event.resourceId === "string" ? event.resourceId : "unknown";
  console.log(
    `[mercury-webhook] observed resourceType=${resourceType} resourceId=${resourceId}; no fulfillment attempted`
  );

  return NextResponse.json({
    received: true,
    processed: false,
    fulfillmentAuthority: "paid-invoice-reconciliation",
  });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    message:
      "Mercury event observer only. Paid invoices are fulfilled by the protected reconciliation endpoint.",
  });
}
