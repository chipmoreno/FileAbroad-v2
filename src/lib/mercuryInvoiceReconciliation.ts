import { del, get, put } from '@vercel/blob';
import {
  getCustomer,
  listInvoices,
  type MercuryInvoice,
} from "@/lib/mercury";
import {
  getMercuryInvoiceMemoField,
  hasFileAbroadReconciliationOrigin,
} from "@/lib/mercuryInvoiceOrigin";
import { isServiceKey, type ServiceKey } from "@/lib/pricing";
import { fulfillRetainerPayment } from "@/lib/retainerFulfillment";

const PAID_INVOICE_PAGE_LIMIT = 10;
const LEDGER_PREFIX = "mercury-reconciliation/fileabroad.com";

type LedgerRecord = {
  status: "processing" | "completed";
  invoiceId: string;
  invoiceNumber: string;
  claimedAt: string;
  completedAt?: string;
};

export type InvoiceReconciliationOutcome = {
  invoiceId: string;
  invoiceNumber: string;
  outcome:
    | "fulfilled"
    | "partial"
    | "skipped"
    | "retryable_error"
    | "manual_review";
  detail: string;
};

export type MercuryReconciliationSummary = {
  pageLimit: number;
  invoicesReturned: number;
  fulfilled: number;
  partial: number;
  skipped: number;
  retryableErrors: number;
  manualReview: number;
  outcomes: InvoiceReconciliationOutcome[];
};

function ledgerPath(invoiceId: string): string {
  const safeId = invoiceId.replace(/[^a-z0-9-]/gi, "_");
  return `${LEDGER_PREFIX}/${safeId}.json`;
}

async function readLedger(pathname: string): Promise<LedgerRecord | null> {
  const result = await get(pathname, { access: 'private', useCache: false });
  if (!result?.stream) return null;
  const raw = await new Response(result.stream).text();
  const parsed = JSON.parse(raw) as Partial<LedgerRecord>;
  if (
    (parsed.status !== "processing" && parsed.status !== "completed") ||
    typeof parsed.invoiceId !== "string"
  ) {
    throw new Error(`Invalid reconciliation ledger at ${pathname}`);
  }
  return parsed as LedgerRecord;
}

async function claimInvoice(invoice: MercuryInvoice): Promise<{
  claimed: boolean;
  existingStatus?: LedgerRecord["status"];
}> {
  const pathname = ledgerPath(invoice.id);
  const record: LedgerRecord = {
    status: "processing",
    invoiceId: invoice.id,
    invoiceNumber: invoice.invoiceNumber,
    claimedAt: new Date().toISOString(),
  };

  try {
    await put(pathname, JSON.stringify(record), {
      access: 'private',
      addRandomSuffix: false,
      allowOverwrite: false,
      contentType: 'application/json',
    });
    return { claimed: true };
  } catch (error) {
    const existing = await readLedger(pathname).catch(() => null);
    if (existing) return { claimed: false, existingStatus: existing.status };
    throw error;
  }
}

async function releaseInvoiceClaim(invoice: MercuryInvoice): Promise<void> {
  await del(ledgerPath(invoice.id));
}

async function completeInvoiceClaim(invoice: MercuryInvoice): Promise<void> {
  const pathname = ledgerPath(invoice.id);
  const existing = await readLedger(pathname);
  if (!existing || existing.invoiceId !== invoice.id) {
    throw new Error("Reconciliation claim disappeared before completion");
  }
  await put(
    pathname,
    JSON.stringify({
      ...existing,
      status: "completed",
      completedAt: new Date().toISOString(),
    } satisfies LedgerRecord),
    {
      access: 'private',
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: 'application/json',
    }
  );
}

function validEmail(value: string | null | undefined): value is string {
  return Boolean(value && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value));
}

function parseYear(invoice: MercuryInvoice): number | null {
  const raw = getMercuryInvoiceMemoField(invoice, "year");
  if (!raw || !/^\d{4}$/.test(raw)) return null;
  const year = Number.parseInt(raw, 10);
  return year >= 1900 && year <= 2100 ? year : null;
}

function parseAddOns(invoice: MercuryInvoice): ServiceKey[] {
  const raw = getMercuryInvoiceMemoField(invoice, "addons");
  if (!raw) return [];
  return raw
    .split(",")
    .map((value) => value.trim())
    .filter((value): value is ServiceKey => isServiceKey(value));
}

function parseRecordingConsent(
  invoice: MercuryInvoice
): "yes" | "no" | undefined {
  const raw = getMercuryInvoiceMemoField(invoice, "recordingConsent")?.toLowerCase();
  return raw === "yes" || raw === "no" ? raw : undefined;
}

async function reconcileOne(invoice: MercuryInvoice): Promise<InvoiceReconciliationOutcome> {
  const base = { invoiceId: invoice.id, invoiceNumber: invoice.invoiceNumber };

  if (invoice.status !== "paid") {
    return { ...base, outcome: "skipped", detail: "status_not_exactly_paid" };
  }
  if (!hasFileAbroadReconciliationOrigin(invoice)) {
    return { ...base, outcome: "skipped", detail: "site_origin_marker_missing" };
  }
  if (!Number.isFinite(invoice.amount) || invoice.amount <= 0) {
    return { ...base, outcome: "skipped", detail: "invalid_mercury_amount" };
  }
  if (getMercuryInvoiceMemoField(invoice, "kind")?.toLowerCase() !== "service") {
    return { ...base, outcome: "skipped", detail: "unsupported_kind_marker" };
  }

  const serviceRaw = getMercuryInvoiceMemoField(invoice, "service");
  const serviceType = serviceRaw && isServiceKey(serviceRaw) ? serviceRaw : null;
  if (!serviceType) {
    return { ...base, outcome: "skipped", detail: "unsupported_service_metadata" };
  }

  const customer = await getCustomer(invoice.customerId).catch(() => null);
  if (!customer || !validEmail(customer.email)) {
    return { ...base, outcome: "manual_review", detail: "mercury_customer_unavailable" };
  }
  if (
    invoice.payerEmail &&
    invoice.payerEmail.trim().toLowerCase() !== customer.email.trim().toLowerCase()
  ) {
    return { ...base, outcome: "manual_review", detail: "mercury_email_mismatch" };
  }

  const claim = await claimInvoice(invoice);
  if (!claim.claimed) {
    return {
      ...base,
      outcome: "skipped",
      detail: `durable_ledger_${claim.existingStatus ?? "exists"}`,
    };
  }

  try {
    const result = await fulfillRetainerPayment({
      invoiceId: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
      amount: invoice.amount,
      serviceType,
      customerName: customer.name?.trim() || customer.email.split("@")[0] || "Customer",
      customerEmail: customer.email,
      year: parseYear(invoice),
      paidAt: invoice.paidAt ?? invoice.updatedAt ?? invoice.createdAt,
      addOns: parseAddOns(invoice),
      recordingConsent: parseRecordingConsent(invoice),
      gaClientId: getMercuryInvoiceMemoField(invoice, "gaClientId") ?? undefined,
    });

    if (!result.emailSent) {
      await releaseInvoiceClaim(invoice);
      return { ...base, outcome: "retryable_error", detail: "client_delivery_failed" };
    }

    try {
      await completeInvoiceClaim(invoice);
    } catch (error) {
      console.error("[mercury-reconciliation] completion ledger write failed", error);
      return { ...base, outcome: "manual_review", detail: "delivery_sent_ledger_finalize_failed" };
    }

    return result.adminNotified
      ? { ...base, outcome: "fulfilled", detail: "client_and_admin_delivered" }
      : { ...base, outcome: "partial", detail: "client_delivered_admin_failed" };
  } catch (error) {
    try {
      await releaseInvoiceClaim(invoice);
    } catch (releaseError) {
      console.error("[mercury-reconciliation] claim release failed", releaseError);
      return { ...base, outcome: "manual_review", detail: "fulfillment_failed_claim_still_held" };
    }
    console.error("[mercury-reconciliation] fulfillment failed", error);
    return { ...base, outcome: "retryable_error", detail: "fulfillment_exception" };
  }
}

export async function reconcilePaidMercuryInvoices(): Promise<MercuryReconciliationSummary> {
  const recipientId = process.env.MERCURY_DEFAULT_ACCOUNT_ID?.trim();
  if (!recipientId) throw new Error("MERCURY_DEFAULT_ACCOUNT_ID is not configured");

  // Mercury returns one bounded page. We deliberately do not follow pagination:
  // each cron execution inspects only the most recent paid-invoice page.
  const invoices = await listInvoices({
    recipientId,
    status: "paid",
    limit: PAID_INVOICE_PAGE_LIMIT,
  });

  const outcomes: InvoiceReconciliationOutcome[] = [];
  for (const invoice of invoices.slice(0, PAID_INVOICE_PAGE_LIMIT)) {
    try {
      outcomes.push(await reconcileOne(invoice));
    } catch (error) {
      console.error("[mercury-reconciliation] invoice failed closed", error);
      outcomes.push({
        invoiceId: invoice.id,
        invoiceNumber: invoice.invoiceNumber,
        outcome: "manual_review",
        detail: "durable_idempotency_unavailable",
      });
    }
  }

  return {
    pageLimit: PAID_INVOICE_PAGE_LIMIT,
    invoicesReturned: invoices.length,
    fulfilled: outcomes.filter((item) => item.outcome === "fulfilled").length,
    partial: outcomes.filter((item) => item.outcome === "partial").length,
    skipped: outcomes.filter((item) => item.outcome === "skipped").length,
    retryableErrors: outcomes.filter((item) => item.outcome === "retryable_error").length,
    manualReview: outcomes.filter((item) => item.outcome === "manual_review").length,
    outcomes,
  };
}
