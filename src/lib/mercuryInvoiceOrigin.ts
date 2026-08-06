import type { MercuryInvoice } from "@/lib/mercury";

export const MERCURY_SITE_ORIGIN = "fileabroad.com";
export const MERCURY_RECONCILIATION_VERSION = "1";

const ORIGIN_TOKEN = `site-origin=${MERCURY_SITE_ORIGIN}`;
const VERSION_TOKEN = `reconcile-v=${MERCURY_RECONCILIATION_VERSION}`;

function memoTokens(value: string | null | undefined): string[] {
  return (value ?? "")
    .split(";")
    .map((token) => token.trim())
    .filter(Boolean);
}

/** Add the exact markers required before an invoice may be auto-fulfilled. */
export function buildReconciliableMercuryMemo(
  description: string,
  fields: Record<string, string>
): string {
  const metadata = Object.entries(fields).map(([key, value]) => `${key}=${value}`);
  return [description, ORIGIN_TOKEN, VERSION_TOKEN, ...metadata].join(";");
}

export function getMercuryInvoiceMemoTokens(invoice: MercuryInvoice): string[] {
  return [
    ...memoTokens(invoice.internalNote),
    ...memoTokens(invoice.externalMemo),
  ];
}

export function hasFileAbroadReconciliationOrigin(invoice: MercuryInvoice): boolean {
  const tokens = getMercuryInvoiceMemoTokens(invoice).map((token) =>
    token.toLowerCase()
  );
  const origins = new Set(tokens.filter((token) => token.startsWith("site-origin=")));
  const versions = new Set(tokens.filter((token) => token.startsWith("reconcile-v=")));
  return (
    origins.size === 1 &&
    versions.size === 1 &&
    origins.has(ORIGIN_TOKEN) &&
    versions.has(VERSION_TOKEN)
  );
}

export function getMercuryInvoiceMemoField(
  invoice: MercuryInvoice,
  field: string
): string | null {
  const prefix = `${field.toLowerCase()}=`;
  const matches = getMercuryInvoiceMemoTokens(invoice)
    .filter((candidate) => candidate.toLowerCase().startsWith(prefix))
    .map((candidate) => candidate.slice(prefix.length).trim())
    .filter(Boolean);
  const distinct = new Set(matches.map((value) => value.toLowerCase()));
  return distinct.size === 1 ? matches[0] : null;
}
