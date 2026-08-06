export type ServiceKey =
  | "taxFiling"
  | "complete"
  | "streamlined"
  | "additionalState"
  | "additionalYearStreamlined"
  | "marriedFilingJointly"
  | "consultation30"
  | "consultation60"
  | "consultationNonClient"
  | "fbar"
  | "amendedReturn"
  | "llcPackage"
  | "taxStrategy"
  | "annualCompliance"
  | "complexForms";

export type PaymentMilestone = {
  label: string;
  amount: number;
  timing: string;
};

export type ServicePricing = {
  key: ServiceKey;
  label: string;
  serviceFee: number | null;
  quoteBased?: boolean;
  requiresScreening?: boolean;
  startingAt?: number;
  requiresYear?: boolean;
  defaultYear?: number;
  isAddOn?: boolean;
  availableAddOns?: ServiceKey[];
  description: string;
  milestones: PaymentMilestone[];
};

const TAX_YEAR_OPTIONS = [2025] as const;
export const SUPPORTED_TAX_YEARS = TAX_YEAR_OPTIONS;
export const DEFAULT_TAX_YEAR = 2025;

export const SERVICE_PRICING: Record<ServiceKey, ServicePricing> = {
  taxFiling: {
    key: "taxFiling",
    label: "Annual Expat Return",
    serviceFee: 575,
    requiresYear: true,
    defaultYear: DEFAULT_TAX_YEAR,
    description:
      "Tax year 2025 federal return with in-scope foreign income exclusion, foreign tax credits, FBAR, and WhatsApp support. Prior years require scope review.",
    milestones: [
      {
        label: "Flat fee per year",
        amount: 575,
        timing: "due upfront before preparation begins",
      },
    ],
  },
  complete: {
    key: "complete",
    label: "Complex Expat Return",
    serviceFee: null,
    requiresYear: true,
    defaultYear: DEFAULT_TAX_YEAR,
    quoteBased: true,
    requiresScreening: true,
    description:
      "Additional schedules, foreign reporting, or multi-part filing work quoted after a free intake and preliminary scope review.",
    milestones: [],
  },
  streamlined: {
    key: "streamlined",
    label: "Streamlined Filing Procedures",
    serviceFee: null,
    quoteBased: true,
    requiresScreening: true,
    description:
      "Qualifying Streamlined Foreign Offshore preparation with accepted returns, FBARs, and information returns defined in a written scope after screening.",
    milestones: [],
  },
  additionalState: {
    key: "additionalState",
    label: "Additional State Return",
    serviceFee: 175,
    isAddOn: true,
    description:
      "Add a state return to your filing package (when you have income from more than one state).",
    milestones: [
      {
        label: "Flat fee",
        amount: 175,
        timing: "due before state filing",
      },
    ],
  },
  additionalYearStreamlined: {
    key: "additionalYearStreamlined",
    label: "Additional Year (Streamlined)",
    serviceFee: 400,
    isAddOn: true,
    description:
      "Add a return year when the client's facts or current instructions require work beyond the quoted base scope.",
    milestones: [
      {
        label: "Per additional year",
        amount: 400,
        timing: "due before the additional year is prepared",
      },
    ],
  },
  marriedFilingJointly: {
    key: "marriedFilingJointly",
    label: "Married Filing Jointly Add-On",
    serviceFee: 150,
    isAddOn: true,
    description:
      "Add-on for married couples filing jointly on the same return.",
    milestones: [
      {
        label: "Add-on",
        amount: 150,
        timing: "due with the primary filing fee",
      },
    ],
  },
  consultation30: {
    key: "consultation30",
    label: "30-Minute Case Scope Assessment",
    serviceFee: 100,
    description:
      "Focused case review with a written list of required years and forms, document checklist, key scope flags, and an exact preparation quote.",
    milestones: [
      {
        label: "Flat fee",
        amount: 100,
        timing: "due before the call is scheduled",
      },
    ],
  },
  consultation60: {
    key: "consultation60",
    label: "60-Minute Consultation",
    serviceFee: 175,
    description:
      "Extended one-on-one call for filing planning, document review, or a more involved expat tax question.",
    milestones: [
      {
        label: "Flat fee",
        amount: 175,
        timing: "due before the call is scheduled",
      },
    ],
  },
  consultationNonClient: {
    key: "consultationNonClient",
    label: "Consultation (Non-Client)",
    serviceFee: 225,
    description:
      "Hourly consultation rate for non-clients. $225/hr.",
    milestones: [
      {
        label: "Per hour",
        amount: 225,
        timing: "due before the call is scheduled",
      },
    ],
  },
  fbar: {
    key: "fbar",
    label: "Standalone FBAR Filing",
    serviceFee: 100,
    requiresYear: true,
    defaultYear: DEFAULT_TAX_YEAR,
    description:
      "Tax year 2025 standalone FinCEN Form 114. Prior or delinquent years require paid scope review.",
    milestones: [
      {
        label: "Flat fee per year",
        amount: 100,
        timing: "due upfront before filing",
      },
    ],
  },
  amendedReturn: {
    key: "amendedReturn",
    label: "Amended Tax Return (Form 1040-X)",
    serviceFee: null,
    quoteBased: true,
    description:
      "Form 1040-X to correct a previously filed return. Quoted on a case-by-case basis.",
    milestones: [],
  },
  llcPackage: {
    key: "llcPackage",
    label: "LLC Package",
    serviceFee: 750,
    description:
      "Administrative LLC setup coordination. Tax structuring, legal advice, and financial-account approvals are outside this service.",
    milestones: [
      {
        label: "Flat fee",
        amount: 750,
        timing: "due upfront before setup begins",
      },
    ],
  },
  taxStrategy: {
    key: "taxStrategy",
    label: "Custom Expat Tax Planning",
    serviceFee: null,
    quoteBased: true,
    requiresScreening: true,
    description:
      "Custom filing and planning work quoted after a paid consultation. Legal opinions, treaty positions, and representation are referred out.",
    milestones: [],
  },
  annualCompliance: {
    key: "annualCompliance",
    label: "Annual Expat Compliance Plan",
    serviceFee: null,
    quoteBased: true,
    requiresScreening: true,
    startingAt: 895,
    description:
      "A scoped annual plan for straightforward recurring filings, including a federal return, FEIE or FTC preparation, FBAR, deadline reminders, and one 30-minute planning review.",
    milestones: [],
  },
  complexForms: {
    key: "complexForms",
    label: "Complex International Forms",
    serviceFee: null,
    quoteBased: true,
    requiresScreening: true,
    description:
      "Foreign entity, trust, partnership, and PFIC filings require screening and an appropriate credentialed reviewer or referral. They are not offered as unsupervised add-ons.",
    milestones: [],
  },
};

export const CHECKOUT_SERVICE_KEYS: ServiceKey[] = [
  "consultation30",
  "consultation60",
  "consultationNonClient",
  "fbar",
];

export function isCheckoutService(key: ServiceKey): boolean {
  return CHECKOUT_SERVICE_KEYS.includes(key);
}

export function getServicePricing(key: ServiceKey): ServicePricing {
  return SERVICE_PRICING[key];
}

export function isServiceKey(value: string): value is ServiceKey {
  return Object.prototype.hasOwnProperty.call(SERVICE_PRICING, value);
}

export function getServiceFee(key: ServiceKey): number | null {
  return SERVICE_PRICING[key].serviceFee;
}

export function getServiceFirstMilestoneAmount(key: ServiceKey): number {
  return SERVICE_PRICING[key].milestones[0]?.amount ?? 0;
}

export function getAvailableAddOns(key: ServiceKey): ServiceKey[] {
  return SERVICE_PRICING[key].availableAddOns ?? [];
}

export function computeCheckoutTotal(
  baseKey: ServiceKey,
  addOnKeys: ServiceKey[]
): number {
  const base = getServiceFirstMilestoneAmount(baseKey);
  const addOnTotal = addOnKeys.reduce(
    (sum, k) => sum + getServiceFirstMilestoneAmount(k),
    0
  );
  return base + addOnTotal;
}

export function formatUsd(amount: number | null | undefined): string {
  if (amount === null || amount === undefined) return "Quote-based";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function getServiceCtaPath(
  key: ServiceKey,
  options: { intakeSlug?: string } = {}
): string {
  const pricing = SERVICE_PRICING[key];
  if (pricing.quoteBased || pricing.requiresScreening || !isCheckoutService(key)) {
    const slug = options.intakeSlug ?? key;
    return `/intake?service=${slug}`;
  }
  return `/payment/retainer/${key}`;
}
