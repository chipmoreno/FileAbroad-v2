/**
 * Internal, deterministic quoting guardrails.
 *
 * This is deliberately not an AI pricing system. A call transcript may be used
 * to summarize facts only after the client consents; the recorded facts must be
 * entered into this rubric by a human before a quote is sent.
 */

export type QuoteBase = "essential" | "complete" | "streamlined";
export type HighRiskForm = "5471" | "3520" | "8621" | "8865";
export type ReferralFlag =
  | "treaty_position"
  | "willfulness_uncertain"
  | "voluntary_disclosure"
  | "irs_exam_or_appeal"
  | "criminal_exposure"
  | "legal_opinion";

export type QuoteRubricInput = {
  base: QuoteBase;
  marriedFilingJointly?: boolean;
  additionalTaxYears?: number;
  stateReturns?: number;
  amendedReturns?: number;
  highRiskForms?: Partial<Record<HighRiskForm, number>>;
  credentialedReviewerConfirmed?: boolean;
  reviewerCost?: number;
  daysUntilClientDeadline?: number;
  referralFlags?: ReferralFlag[];
};

export type QuoteRubricResult = {
  disposition: "quote" | "reviewer_required" | "refer_out";
  subtotal: number | null;
  minimumQuote: number | null;
  lineItems: Array<{ label: string; amount: number }>;
  reasons: string[];
};

const BASE_FEES: Record<QuoteBase, number | null> = {
  essential: 575,
  complete: null,
  streamlined: null,
};

const HIGH_RISK_FORM_MINIMUMS: Record<HighRiskForm, number> = {
  "5471": 900,
  "3520": 700,
  "8621": 450,
  "8865": 750,
};

const nonNegativeWholeNumber = (value: number | undefined) =>
  Math.max(0, Math.floor(value ?? 0));

export function buildDeterministicQuote(
  input: QuoteRubricInput
): QuoteRubricResult {
  const referralFlags = input.referralFlags ?? [];
  if (referralFlags.length > 0) {
    return {
      disposition: "refer_out",
      subtotal: null,
      minimumQuote: null,
      lineItems: [],
      reasons: referralFlags.map(
        (flag) => `Referral required before engagement: ${flag.replaceAll("_", " ")}.`
      ),
    };
  }

  const formCounts = input.highRiskForms ?? {};
  const hasHighRiskForm = Object.values(formCounts).some(
    (count) => nonNegativeWholeNumber(count) > 0
  );
  if (hasHighRiskForm && !input.credentialedReviewerConfirmed) {
    return {
      disposition: "reviewer_required",
      subtotal: null,
      minimumQuote: null,
      lineItems: [],
      reasons: [
        "A credentialed international-tax reviewer or referral must be confirmed before quoting Forms 5471, 3520, 8621, or 8865.",
      ],
    };
  }

  const baseFee = BASE_FEES[input.base];
  if (baseFee === null) {
    return {
      disposition: "quote",
      subtotal: null,
      minimumQuote: null,
      lineItems: [],
      reasons: [
        "This is a quote-based service with no fixed base fee.",
        "Human scope review is required before the quote is sent.",
        "A consultation fee is credited toward an accepted preparation engagement when the written scope says so.",
      ],
    };
  }

  const lineItems: Array<{ label: string; amount: number }> = [
    { label: `${input.base} base package`, amount: baseFee },
  ];

  if (input.marriedFilingJointly) {
    lineItems.push({ label: "Married filing jointly", amount: 150 });
  }

  const additionalYears = nonNegativeWholeNumber(input.additionalTaxYears);
  if (additionalYears > 0) {
    lineItems.push({
      label: `${additionalYears} additional tax year${additionalYears === 1 ? "" : "s"}`,
      amount: additionalYears * 400,
    });
  }

  const states = nonNegativeWholeNumber(input.stateReturns);
  if (states > 0) {
    lineItems.push({
      label: `${states} state return${states === 1 ? "" : "s"}`,
      amount: states * 175,
    });
  }

  const amendments = nonNegativeWholeNumber(input.amendedReturns);
  if (amendments > 0) {
    lineItems.push({
      label: `${amendments} amended return${amendments === 1 ? "" : "s"}`,
      amount: amendments * 350,
    });
  }

  for (const form of Object.keys(HIGH_RISK_FORM_MINIMUMS) as HighRiskForm[]) {
    const count = nonNegativeWholeNumber(formCounts[form]);
    if (count > 0) {
      lineItems.push({
        label: `Form ${form} (${count}) with credentialed review`,
        amount: count * HIGH_RISK_FORM_MINIMUMS[form],
      });
    }
  }

  const reviewerCost = Math.max(0, input.reviewerCost ?? 0);
  if (reviewerCost > 0) {
    lineItems.push({ label: "Credentialed reviewer", amount: reviewerCost });
  }

  const preUrgencySubtotal = lineItems.reduce((sum, item) => sum + item.amount, 0);
  const deadlineDays = input.daysUntilClientDeadline;
  if (typeof deadlineDays === "number" && deadlineDays >= 0 && deadlineDays <= 14) {
    const urgencyRate = deadlineDays <= 7 ? 0.25 : 0.15;
    lineItems.push({
      label: `${deadlineDays <= 7 ? "7-day" : "14-day"} rush capacity`,
      amount: Math.ceil(preUrgencySubtotal * urgencyRate / 25) * 25,
    });
  }

  const subtotal = lineItems.reduce((sum, item) => sum + item.amount, 0);
  return {
    disposition: "quote",
    subtotal,
    minimumQuote: subtotal,
    lineItems,
    reasons: [
      "Human scope review is required before the quote is sent.",
      "A consultation fee is credited toward an accepted preparation engagement when the written scope says so.",
    ],
  };
}
