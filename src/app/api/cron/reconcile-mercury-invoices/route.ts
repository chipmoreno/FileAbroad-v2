import { timingSafeEqual } from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { reconcilePaidMercuryInvoices } from "@/lib/mercuryInvoiceReconciliation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const maxDuration = 60;

function constantTimeMatch(provided: string, expected: string): boolean {
  const providedBytes = Buffer.from(provided);
  const expectedBytes = Buffer.from(expected);
  return (
    providedBytes.length === expectedBytes.length &&
    timingSafeEqual(providedBytes, expectedBytes)
  );
}

async function handleReconciliation(request: NextRequest) {
  const cronSecret = process.env.CRON_SECRET?.trim();
  if (!cronSecret) {
    return NextResponse.json({ ok: false, error: "Reconciliation is not configured" }, { status: 503 });
  }

  const authorization = request.headers.get("authorization") ?? "";
  const provided = authorization.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length)
    : "";
  if (!provided || !constantTimeMatch(provided, cronSecret)) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }

  if (process.env.MERCURY_INVOICE_RECONCILIATION_ENABLED !== "true") {
    return NextResponse.json({ ok: true, enabled: false, processed: false });
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN?.trim()) {
    return NextResponse.json(
      { ok: false, error: "Durable reconciliation ledger is not configured" },
      { status: 503 }
    );
  }

  try {
    const summary = await reconcilePaidMercuryInvoices();
    const requiresRetry = summary.retryableErrors > 0;
    const requiresManualReview = summary.manualReview > 0;
    return NextResponse.json(
      {
        ok: !requiresRetry && !requiresManualReview,
        enabled: true,
        processed: true,
        summary,
      },
      { status: requiresRetry || requiresManualReview ? 502 : 200 }
    );
  } catch (error) {
    console.error("[mercury-reconciliation] run failed", error);
    return NextResponse.json({ ok: false, error: "Reconciliation failed closed" }, { status: 502 });
  }
}

export const GET = handleReconciliation;
export const POST = handleReconciliation;
