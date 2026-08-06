import { NextRequest, NextResponse } from "next/server";
import {
  CHECKOUT_SERVICE_KEYS,
  DEFAULT_TAX_YEAR,
  SERVICE_PRICING,
  computeCheckoutTotal,
  getAvailableAddOns,
  type ServiceKey,
} from "@/lib/pricing";
import { createRetainerOrder } from "@/lib/mercuryOrders";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function jsonError(error: string, status: number) {
  return NextResponse.json({ success: false, error }, { status });
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function deriveNameFromEmail(email: string): string {
  const local = email.split("@")[0] ?? "";
  const cleaned = local.replace(/[._-]+/g, " ").trim();
  if (!cleaned) return email;
  return cleaned
    .split(/\s+/)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

export async function POST(request: NextRequest) {
  let body: {
    serviceType?: unknown;
    email?: unknown;
    name?: unknown;
    year?: unknown;
    addOns?: unknown;
    agreed?: unknown;
    gaClientId?: unknown;
  } = {};
  try {
    body = await request.json();
  } catch {
    return jsonError("Invalid request body. Expected JSON.", 400);
  }

  const serviceTypeRaw =
    typeof body.serviceType === "string" ? body.serviceType.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const yearRaw =
    typeof body.year === "number"
      ? String(body.year)
      : typeof body.year === "string"
        ? body.year.trim()
        : "";
  const addOnsRaw = Array.isArray(body.addOns)
    ? (body.addOns.filter((v): v is string => typeof v === "string"))
    : [];

  if (!serviceTypeRaw) {
    return jsonError("Please choose a service.", 400);
  }
  if (!CHECKOUT_SERVICE_KEYS.includes(serviceTypeRaw as ServiceKey)) {
    return jsonError(
      `Online checkout is not available for ${serviceTypeRaw}. Please use the intake form for a custom quote.`,
      400
    );
  }
  if (!email || !isValidEmail(email)) {
    return jsonError("Please enter a valid email address.", 400);
  }
  if (body.agreed !== true) {
    return jsonError("You must agree to the service terms before continuing.", 400);
  }

  const serviceType = serviceTypeRaw as ServiceKey;
  const pricing = SERVICE_PRICING[serviceType];
  if (pricing.quoteBased || pricing.serviceFee === null) {
    return jsonError(
      `${pricing.label} is quote-based. Please use the intake form for a custom quote.`,
      400
    );
  }

  const consultationKeys: ServiceKey[] = [
    "consultation30",
    "consultation60",
    "consultationNonClient",
  ];
  const recordingConsent = consultationKeys.includes(serviceType)
    ? ("no" as const)
    : undefined;

  const gaClientId =
    typeof body.gaClientId === "string" && /^\d+\.\d+$/.test(body.gaClientId)
      ? body.gaClientId
      : undefined;

  const availableAddOns = getAvailableAddOns(serviceType);
  const validAddOns: ServiceKey[] = [];
  for (const key of addOnsRaw) {
    if (!availableAddOns.includes(key as ServiceKey)) {
      return jsonError(
        `Add-on ${key} is not available for ${pricing.label}.`,
        400
      );
    }
    validAddOns.push(key as ServiceKey);
  }

  let year: number | undefined;
  if (pricing.requiresYear) {
    if (yearRaw) {
      const parsed = Number.parseInt(yearRaw, 10);
      if (
        Number.isNaN(parsed) ||
        parsed !== DEFAULT_TAX_YEAR
      ) {
        return jsonError(
          "Direct checkout is limited to tax year 2025. Prior or delinquent years require a paid scope consultation.",
          400
        );
      }
      year = parsed;
    } else {
      year = pricing.defaultYear ?? DEFAULT_TAX_YEAR;
    }
  }

  const customerName = name || deriveNameFromEmail(email);
  const totalAmount = computeCheckoutTotal(serviceType, validAddOns);

  try {
    const order = await createRetainerOrder({
      email,
      serviceType,
      customerName,
      year,
      amount: totalAmount,
      addOns: validAddOns,
      agreementAcceptedAt: new Date().toISOString(),
      recordingConsent,
      gaClientId,
    });

    return NextResponse.json({
      success: true,
      invoiceId: order.invoice.id,
      invoiceNumber: order.invoiceNumber,
      amount: order.amount,
      dueDate: order.invoice.dueDate,
      hostedInvoiceUrl: order.hostedInvoiceUrl,
      customerId: order.customer.id,
      serviceType,
      year: order.year,
      addOns: validAddOns,
    });
  } catch (err) {
    const error = err as { status?: number; message?: string };
    console.error("[retainer/create] Mercury error:", error);
    if (error?.status === 400) {
      return jsonError(
        `Mercury rejected the order: ${error.message || "check the service and customer details"}.`,
        502
      );
    }
    return jsonError(
      "We couldn't create your invoice right now. Please try again or email info@fileabroad.com.",
      500
    );
  }
}
