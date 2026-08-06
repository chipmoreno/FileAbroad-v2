/**
 * Mercury API client.
 *
 * All requests go through the Cloudflare Worker proxy at MERCURY_PROXY_URL.
 * The worker adds the Mercury bearer token and forwards to api.mercury.com.
 * The Mercury API token NEVER lives in this codebase or in Vercel env vars.
 *
 * Field naming: Mercury uses camelCase in JSON bodies (invoiceDate, dueDate,
 * payerEmail, paymentType, recipientId, customerId). Snake_case returns 400.
 *
 * Base path: /api/v1/ — included in every URL.
 *
 * Required env vars:
 *   MERCURY_PROXY_URL        — Cloudflare Worker URL that proxies api.mercury.com
 *   MERCURY_PROXY_SECRET     — shared secret sent in the X-Proxy-Auth header
 *   MERCURY_DEFAULT_ACCOUNT_ID — UUID of the Mercury account that receives payments
 *
 * Optional (for fulfillment emails):
 *   RESEND_API_KEY
 *   ADMIN_EMAIL              — defaults to chip.moreno@gmail.com
 *   (No messaging numbers required)
 */

import { formatUsd } from "@/lib/pricing";

export type MercuryAccountKind = "checking" | "savings" | "mercury" | "external";
export type MercuryAccountStatus = "active" | "archived" | null;
export type MercuryPaymentType = "achDebit" | "achCredit" | "wire" | "check" | "book";
export type MercuryInvoiceStatus =
  | "draft"
  | "sent"
  | "scheduled"
  | "paid"
  | "past_due"
  | "voided";

export type MercuryAccount = {
  id: string;
  accountNumber: string;
  routingNumber: string;
  name: string;
  status: MercuryAccountStatus;
  type: string;
  kind: MercuryAccountKind;
  createdAt: string;
  availableBalance: number;
  currentBalance: number;
  legalBusinessName: string;
  dashboardLink: string;
};

export type MercuryCustomer = {
  id: string;
  name: string;
  email: string;
  status?: "active" | "archived";
  createdAt?: string;
};

export type MercuryInvoice = {
  id: string;
  invoiceNumber: string;
  amount: number;
  status: MercuryInvoiceStatus | string;
  externalMemo?: string | null;
  internalNote?: string | null;
  payerMemo?: string | null;
  invoiceDate: string;
  dueDate: string;
  payerEmail?: string | null;
  paymentType: MercuryPaymentType | string;
  recipientId?: string;
  customerId: string;
  destinationAccountId?: string;
  slug?: string;
  hostedInvoiceUrl?: string | null;
  createdAt?: string;
  updatedAt?: string;
  ccEmails?: string[];
  creditCardEnabled?: boolean;
  achDebitEnabled?: boolean;
  useRealAccountNumber?: boolean;
  paidAt?: string | null;
  lineItems?: Array<{
    name: string;
    description?: string;
    unitPrice: number;
    quantity: number;
  }>;
};

export type MercuryTransaction = {
  id: string;
  accountId: string;
  amount: number;
  kind: string;
  status: string;
  counterpartyName?: string;
  counterpartyId?: string;
  externalMemo?: string | null;
  postedAt?: string;
  createdAt: string;
};

export type MercuryError = {
  errors: Record<string, string[] | string>;
  debugInfo?: Record<string, unknown>;
  documentationUrl?: string;
};

const REQUIRED_ENV_VARS = [
  "MERCURY_PROXY_URL",
  "MERCURY_PROXY_SECRET",
  "MERCURY_DEFAULT_ACCOUNT_ID",
] as const;

export type MercuryConfig = {
  proxyUrl: string;
  proxySecret: string;
  defaultAccountId: string;
};

export type MercuryClientError = {
  status: number;
  message: string;
  body?: MercuryError | string;
};

function readConfig(): MercuryConfig {
  const proxyUrl = process.env.MERCURY_PROXY_URL?.replace(/\/+$/, "") ?? "";
  const proxySecret = process.env.MERCURY_PROXY_SECRET ?? "";
  const defaultAccountId = process.env.MERCURY_DEFAULT_ACCOUNT_ID ?? "";

  const missing = REQUIRED_ENV_VARS.filter((key) => !process.env[key]);
  if (missing.length > 0) {
    throw new Error(
      `Mercury client is not configured. Missing env vars: ${missing.join(", ")}.`
    );
  }

  return { proxyUrl, proxySecret, defaultAccountId };
}

function trimPath(path: string): string {
  return path.startsWith("/") ? path : `/${path}`;
}

function ensureApiV1(path: string): string {
  const trimmed = trimPath(path);
  if (trimmed.startsWith("/api/v1/")) return trimmed;
  if (trimmed.startsWith("/api/")) return trimmed;
  return `/api/v1${trimmed}`;
}

export async function mercuryRequest<T>({
  path,
  method = "GET",
  body,
  config,
}: {
  path: string;
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: Record<string, unknown>;
  config?: MercuryConfig;
}): Promise<T> {
  const cfg = config ?? readConfig();
  const url = `${cfg.proxyUrl}${ensureApiV1(path)}`;

  const init: RequestInit = {
    method,
    headers: {
      "X-Proxy-Auth": cfg.proxySecret,
      Accept: "application/json",
    },
  };

  if (body !== undefined) {
    init.headers = {
      ...init.headers,
      "Content-Type": "application/json",
    };
    init.body = JSON.stringify(body);
  }

  const res = await fetch(url, init);

  if (!res.ok) {
    let parsed: MercuryError | string | undefined;
    const text = await res.text();
    try {
      parsed = JSON.parse(text) as MercuryError;
    } catch {
      parsed = text;
    }
    const message =
      typeof parsed === "object" && parsed.errors
        ? JSON.stringify(parsed.errors)
        : typeof parsed === "string"
          ? parsed
          : `Mercury request failed: ${res.status}`;
    throw {
      status: res.status,
      message,
      body: parsed,
    } satisfies MercuryClientError;
  }

  if (res.status === 204) {
    return undefined as T;
  }

  return (await res.json()) as T;
}

export function listAccounts(config?: MercuryConfig): Promise<MercuryAccount[]> {
  return mercuryRequest<MercuryAccount[]>({ path: "/accounts", config });
}

export function getAccount(
  accountId: string,
  config?: MercuryConfig
): Promise<MercuryAccount> {
  return mercuryRequest<MercuryAccount>({
    path: `/accounts/${accountId}`,
    config,
  });
}

export function createCustomer(
  input: { name: string; email: string },
  config?: MercuryConfig
): Promise<MercuryCustomer> {
  return mercuryRequest<MercuryCustomer>({
    path: "/ar/customers",
    method: "POST",
    body: input,
    config,
  });
}

export function getCustomer(
  customerId: string,
  config?: MercuryConfig
): Promise<MercuryCustomer> {
  return mercuryRequest<MercuryCustomer>({
    path: `/ar/customers/${customerId}`,
    config,
  });
}

export function listCustomers(config?: MercuryConfig): Promise<MercuryCustomer[]> {
  return mercuryRequest<MercuryCustomer[]>({
    path: "/ar/customers",
    config,
  }).then((data) => {
    if (Array.isArray(data)) return data;
    const wrapped = data as unknown as { customers?: MercuryCustomer[] };
    return Array.isArray(wrapped.customers) ? wrapped.customers : [];
  });
}

export async function getOrCreateCustomer(
  input: { email: string; name?: string },
  config?: MercuryConfig
): Promise<MercuryCustomer> {
  const customers = await listCustomers(config);
  const match = customers.find(
    (c) => c.email?.toLowerCase() === input.email.toLowerCase()
  );
  if (match) return match;
  const name =
    input.name?.trim() || input.email.split("@")[0] || input.email;
  return createCustomer({ name, email: input.email }, config);
}

export function createInvoice(
  input: {
    invoiceNumber: string;
    amount: number;
    externalMemo?: string;
    internalNote?: string;
    payerMemo?: string;
    invoiceDate: string;
    dueDate: string;
    payerEmail: string;
    paymentType: MercuryPaymentType;
    recipientId: string;
    customerId: string;
    ccEmails?: string[];
    lineItems?: Array<{
      name: string;
      description?: string;
      unitPrice: number;
      quantity: number;
    }>;
    useRealAccountNumber?: boolean;
    creditCardEnabled?: boolean;
    achDebitEnabled?: boolean;
  },
  config?: MercuryConfig
): Promise<MercuryInvoice> {
  const body = {
    invoiceNumber: input.invoiceNumber,
    amount: input.amount,
    externalMemo: input.externalMemo,
    internalNote: input.internalNote,
    payerMemo: input.payerMemo ?? input.externalMemo,
    invoiceDate: input.invoiceDate,
    dueDate: input.dueDate,
    payerEmail: input.payerEmail,
    paymentType: input.paymentType,
    destinationAccountId: input.recipientId,
    customerId: input.customerId,
    ccEmails: input.ccEmails ?? [],
    lineItems: input.lineItems ?? [
      {
        name: input.invoiceNumber,
        description: input.externalMemo ?? "FileAbroad service",
        unitPrice: input.amount,
        quantity: 1,
      },
    ],
    useRealAccountNumber: input.useRealAccountNumber ?? false,
    creditCardEnabled: input.creditCardEnabled ?? false,
    achDebitEnabled: input.achDebitEnabled ?? true,
  };
  return mercuryRequest<MercuryInvoice>({
    path: "/ar/invoices",
    method: "POST",
    body,
    config,
  });
}

export function getInvoice(
  invoiceId: string,
  config?: MercuryConfig
): Promise<MercuryInvoice> {
  return mercuryRequest<MercuryInvoice>({
    path: `/ar/invoices/${invoiceId}`,
    config,
  });
}

export function listInvoices(
  input: { recipientId?: string; status?: MercuryInvoiceStatus; limit?: number } = {},
  config?: MercuryConfig
): Promise<MercuryInvoice[]> {
  const params = new URLSearchParams();
  if (input.recipientId) params.set("recipientId", input.recipientId);
  if (input.status) params.set("status", input.status);
  if (input.limit) params.set("limit", String(input.limit));
  const query = params.toString();
  return mercuryRequest<MercuryInvoice[]>({
    path: `/ar/invoices${query ? `?${query}` : ""}`,
    config,
  }).then((data) => {
    if (Array.isArray(data)) return data;
    const wrapped = data as unknown as { invoices?: MercuryInvoice[] };
    return Array.isArray(wrapped.invoices) ? wrapped.invoices : [];
  });
}

export function getTransaction(
  transactionId: string,
  config?: MercuryConfig
): Promise<MercuryTransaction> {
  return mercuryRequest<MercuryTransaction>({
    path: `/transactions/${transactionId}`,
    config,
  });
}

export function listTransactions(
  input: { accountId?: string; limit?: number; start?: string; end?: string } = {},
  config?: MercuryConfig
): Promise<MercuryTransaction[]> {
  const accountId = input.accountId ?? readConfig().defaultAccountId;
  const params = new URLSearchParams();
  params.set("accountId", accountId);
  if (input.limit) params.set("limit", String(input.limit));
  if (input.start) params.set("start", input.start);
  if (input.end) params.set("end", input.end);
  return mercuryRequest<MercuryTransaction[]>({
    path: `/transactions?${params.toString()}`,
    config,
  });
}

const encoder = new TextEncoder();

export async function verifyMercuryWebhookSignature({
  rawBody,
  signatureHeader,
  timestamp,
  secret,
}: {
  rawBody: string;
  signatureHeader: string | null;
  timestamp: string | null;
  secret: string;
}): Promise<boolean> {
  if (!signatureHeader) return false;
  let effectiveTimestamp = timestamp;
  let providedSignature = signatureHeader.trim();

  // The custom invoice proxy historically sent separate Mercury-Signature and
  // Mercury-Timestamp headers. Mercury's current official format combines
  // `t=...` and `v1=...` in Mercury-Signature. Accept both while the live proxy
  // payload is validated; never accept an unsigned fallback.
  if (providedSignature.includes("t=") || providedSignature.includes("v1=")) {
    const parts = Object.fromEntries(
      providedSignature.split(",").map((part) => {
        const [key, ...rest] = part.trim().split("=");
        return [key, rest.join("=")];
      })
    );
    effectiveTimestamp = parts.t ?? effectiveTimestamp;
    providedSignature = parts.v1 ?? "";
  }

  if (!effectiveTimestamp || !providedSignature) return false;
  const signedPayload = `${effectiveTimestamp}.${rawBody}`;
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(signedPayload)
  );
  const computed = Array.from(new Uint8Array(signatureBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  const provided = providedSignature.toLowerCase();
  if (provided.length !== computed.length) return false;
  let mismatch = 0;
  for (let i = 0; i < provided.length; i++) {
    mismatch |= provided.charCodeAt(i) ^ computed.charCodeAt(i);
  }
  return mismatch === 0;
}

export function formatMercuryAmount(amount: number): string {
  return formatUsd(amount);
}

export function getMercuryHostedInvoiceUrl(
  invoice: MercuryInvoice
): string | null {
  return invoice.hostedInvoiceUrl ?? null;
}
