/**
 * Mercury order domain logic for FileAbroad services.
 *
 * Wraps the typed Mercury client with the order-management concerns specific
 * to FileAbroad:
 *   - look up or create a Mercury customer by email
 *   - create an AR invoice for a given service (with optional tax-year memo)
 *   - look up an existing order's payment status
 *
 * Each service is paid in full at invoice creation; there are no follow-up
 * milestones. Tax-year-requiring services (taxFiling, fbar) append the year
 * to the invoice `externalMemo` so the year is visible in the Mercury
 * dashboard and downstream emails.
 */

import {
  formatUsd,
  getServicePricing,
  getServiceFirstMilestoneAmount,
  type ServiceKey,
} from "@/lib/pricing";
import {
  createCustomer,
  createInvoice,
  getCustomer,
  getInvoice,
  getMercuryHostedInvoiceUrl,
  listCustomers,
  listInvoices,
  type MercuryCustomer,
  type MercuryInvoice,
  type MercuryConfig,
} from "@/lib/mercury";
import { buildReconciliableMercuryMemo } from "@/lib/mercuryInvoiceOrigin";

export const RETAINER_INVOICE_DUE_DAYS = 14;

export type RetainerOrderInput = {
  email: string;
  serviceType: ServiceKey;
  customerName?: string;
  year?: number;
  amount?: number;
  addOns?: ServiceKey[];
  agreementAcceptedAt?: string;
  recordingConsent?: "yes" | "no";
  gaClientId?: string;
};

export type RetainerOrderResult = {
  customer: MercuryCustomer;
  invoice: MercuryInvoice;
  amount: number;
  invoiceNumber: string;
  hostedInvoiceUrl: string | null;
  year: number | null;
  addOns: ServiceKey[];
};

export type RetainerStatus = {
  invoice: MercuryInvoice;
  status: MercuryInvoice["status"];
  isPaid: boolean;
  paidAt: string | null;
};

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

function dueDateIso(daysAhead: number): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() + daysAhead);
  return d.toISOString().slice(0, 10);
}

function generateInvoiceNumber(
  serviceType: ServiceKey,
  customerName?: string
): string {
  const ts = Date.now().toString(36).toUpperCase();
  const suffix = ts.slice(-6);
  const code = serviceType.toUpperCase().slice(0, 6);
  const lastName = (customerName ?? "CLIENT")
    .trim()
    .split(/\s+/)
    .pop()
    ?.toUpperCase()
    .replace(/[^A-Z0-9]/g, "") || "CLIENT";
  return `${lastName.slice(0, 12)}-${code}-${suffix}`;
}

function deriveNameFromEmail(email: string): string {
  const local = email.split("@")[0] ?? "";
  const cleaned = local.replace(/[._-]+/g, " ").trim();
  if (!cleaned) return email;
  return cleaned
    .split(/\s+/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function emailMatchesCustomer(
  customer: MercuryCustomer,
  email: string
): boolean {
  return customer.email?.trim().toLowerCase() === email.trim().toLowerCase();
}

export async function getOrCreateCustomer(
  input: { email: string; name?: string },
  config?: MercuryConfig
): Promise<MercuryCustomer> {
  const email = input.email.trim();
  const name = (input.name?.trim() || deriveNameFromEmail(email)).trim();

  try {
    const existing = await listCustomers(config);
    const match = existing.find((c) => emailMatchesCustomer(c, email));
    if (match) return match;
  } catch (err) {
    console.error(
      "[mercuryOrders] listCustomers failed; falling through to create:",
      err
    );
  }

  try {
    return await createCustomer({ email, name }, config);
  } catch (err) {
    const error = err as {
      status?: number;
      body?: { errors?: Record<string, string[]> };
    };
    if (error?.status === 400 && error.body?.errors?.email) {
      try {
        const all = await listCustomers(config);
        const match = all.find((c) => emailMatchesCustomer(c, email));
        if (match) return match;
      } catch {
        // fall through
      }
    }
    throw err;
  }
}

export async function getCustomerById(
  customerId: string,
  config?: MercuryConfig
): Promise<MercuryCustomer | null> {
  try {
    return await getCustomer(customerId, config);
  } catch (err) {
    const error = err as { status?: number };
    if (error?.status === 404) return null;
    throw err;
  }
}

export async function createRetainerOrder(
  input: RetainerOrderInput,
  config?: MercuryConfig
): Promise<RetainerOrderResult> {
  const pricing = getServicePricing(input.serviceType);
  if (pricing.quoteBased || pricing.serviceFee === null) {
    throw new Error(
      `Cannot create a Mercury invoice for ${input.serviceType} — pricing is quote-based.`
    );
  }

  const amount =
    input.amount ?? getServiceFirstMilestoneAmount(input.serviceType);
  if (!amount) {
    throw new Error(`No price configured for ${input.serviceType}.`);
  }

  const year =
    pricing.requiresYear
      ? input.year ?? pricing.defaultYear ?? null
      : null;

  const customer = await getOrCreateCustomer(
    { email: input.email, name: input.customerName },
    config
  );

  const recipientId =
    config?.defaultAccountId ??
    process.env.MERCURY_DEFAULT_ACCOUNT_ID ??
    "";
  if (!recipientId) {
    throw new Error("MERCURY_DEFAULT_ACCOUNT_ID is not set.");
  }

  const memoBase = `FileAbroad ${pricing.label}`;
  const externalMemo = buildReconciliableMercuryMemo(
    year ? `${memoBase} \u2014 TY${year}` : memoBase,
    { kind: "service", service: input.serviceType }
  );
  const addOns = input.addOns ?? [];
  const internalNote = [
    "fileabroad-order-v1",
    "site-origin=fileabroad.com",
    "reconcile-v=1",
    "kind=service",
    `service=${input.serviceType}`,
    year ? `year=${year}` : "",
    addOns.length ? `addons=${addOns.join(",")}` : "",
    input.agreementAcceptedAt
      ? `agreementAcceptedAt=${input.agreementAcceptedAt}`
      : "",
    input.recordingConsent
      ? `recordingConsent=${input.recordingConsent}`
      : "",
    input.gaClientId ? `gaClientId=${input.gaClientId}` : "",
  ]
    .filter(Boolean)
    .join(";");
  const baseAmount = getServiceFirstMilestoneAmount(input.serviceType);
  const lineItems = [
    {
      name: pricing.label,
      description: year ? `Tax year ${year}` : pricing.description,
      unitPrice: baseAmount,
      quantity: 1,
    },
    ...addOns.map((key) => {
      const addOn = getServicePricing(key);
      return {
        name: addOn.label,
        description: addOn.description,
        unitPrice: getServiceFirstMilestoneAmount(key),
        quantity: 1,
      };
    }),
  ];

  const invoice = await createInvoice(
    {
      invoiceNumber: generateInvoiceNumber(
        input.serviceType,
        input.customerName
      ),
      amount,
      externalMemo,
      payerMemo: externalMemo,
      internalNote,
      invoiceDate: todayIso(),
      dueDate: dueDateIso(RETAINER_INVOICE_DUE_DAYS),
      payerEmail: customer.email,
      paymentType: "achDebit",
      recipientId,
      customerId: customer.id,
      lineItems,
    },
    config
  );

  return {
    customer,
    invoice,
    amount,
    invoiceNumber: invoice.invoiceNumber,
    hostedInvoiceUrl: getMercuryHostedInvoiceUrl(invoice),
    year,
    addOns,
  };
}

export async function getRetainerStatus(
  invoiceId: string,
  config?: MercuryConfig
): Promise<RetainerStatus> {
  const invoice = await getInvoice(invoiceId, config);
  return {
    invoice,
    status: invoice.status,
    isPaid: invoice.status === "paid",
    paidAt: invoice.paidAt ?? null,
  };
}

export async function findInvoicesForEmail(
  email: string,
  config?: MercuryConfig
): Promise<MercuryInvoice[]> {
  const customer = await getOrCreateCustomer({ email }, config).catch(
    () => null
  );
  if (!customer) return [];
  try {
    const recipientId =
      config?.defaultAccountId ??
      process.env.MERCURY_DEFAULT_ACCOUNT_ID ??
      "";
    if (!recipientId) return [];
    const invoices = await listInvoices({ recipientId, limit: 50 }, config);
    return invoices.filter((inv) => inv.customerId === customer.id);
  } catch {
    return [];
  }
}

export function describeService(serviceType: ServiceKey): {
  serviceType: ServiceKey;
  label: string;
  firstMilestone: { amount: number; timing: string; formatted: string };
  total: { amount: number | null; formatted: string };
  quoteBased: boolean;
  requiresYear: boolean;
} {
  const pricing = getServicePricing(serviceType);
  const first = pricing.milestones[0];
  return {
    serviceType: pricing.key,
    label: pricing.label,
    firstMilestone: {
      amount: first?.amount ?? 0,
      timing: first?.timing ?? "due upfront",
      formatted: formatUsd(first?.amount ?? 0),
    },
    total: {
      amount: pricing.serviceFee,
      formatted:
        pricing.serviceFee === null
          ? "Quote-based"
          : formatUsd(pricing.serviceFee),
    },
    quoteBased: Boolean(pricing.quoteBased),
    requiresYear: Boolean(pricing.requiresYear),
  };
}
