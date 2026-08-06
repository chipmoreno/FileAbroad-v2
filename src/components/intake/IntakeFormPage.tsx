"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
  Send,
  CheckCircle2,
  AlertTriangle,
  MessageCircle,
  Mail,
  Phone,
} from "@/components/icons";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { trackConversionEvent } from "@/components/analytics/ConversionTracking";
import { captureAttribution, getAttributionFields } from "@/lib/attribution";
import { WHATSAPP_NUMBER, WHATSAPP_DISPLAY } from "@/lib/constants";
import type { Locale } from "@/lib/i18n/config";
import { localizedPageCopy } from "@/lib/i18n/localized-page-copy";

// ── Types ──────────────────────────────────────────────────────────────────────

type FormData = {
  // Step 1
  firstName: string;
  lastName: string;
  email: string;
  whatsapp: string;
  country: string;
  lastState: string;
  citizenStatus: string;
  services: string[];
  // Step 2 — Annual tax return
  taxYear: string;
  primaryIncome: string;
  over130k: string;
  filingJointly: string;
  // Step 2 — FBAR
  fbarOver10k: string;
  fbarAccountCount: string;
  fbarCountries: string;
  // Step 2 — Back-filing
  yearsSinceLastFiled: string;
  streamlinedAware: string;
  irsNotices: string;
  // Step 2 — Amended return
  amendedYear: string;
  amendedCorrection: string;
  // Step 2 — FEIE
  feie330Days: string;
  feiePermanentResidence: string;
  // Step 2 — State tax
  stateWhich: string;
  stateTies: string;
  // Step 2 — Not sure
  notSureSituation: string;
  // Step 3
  filingFor: string;
  deadline: string;
  previousPreparer: string;
  anythingComplicated: string;
  referralSource: string;
  referralSourceOther: string;
};

const SERVICE_OPTIONS = [
  { label: "Annual tax return (1040)", value: "Annual tax return" },
  { label: "FBAR (foreign bank account reporting)", value: "FBAR" },
  { label: "Back-filing / haven't filed in years", value: "Back-filing" },
  { label: "Amended return", value: "Amended return" },
  { label: "FEIE / Foreign Earned Income Exclusion questions", value: "FEIE" },
  { label: "State tax filing", value: "State tax" },
  { label: "Paid consultation / custom quote", value: "Consultation" },
  { label: "Annual compliance plan", value: "Annual plan" },
  { label: "I'm not sure \u2014 I need guidance", value: "Not sure" },
] as const;

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  whatsapp: "",
  country: "",
  lastState: "",
  citizenStatus: "",
  services: [],
  taxYear: "",
  primaryIncome: "",
  over130k: "",
  filingJointly: "",
  fbarOver10k: "",
  fbarAccountCount: "",
  fbarCountries: "",
  yearsSinceLastFiled: "",
  streamlinedAware: "",
  irsNotices: "",
  amendedYear: "",
  amendedCorrection: "",
  feie330Days: "",
  feiePermanentResidence: "",
  stateWhich: "",
  stateTies: "",
  notSureSituation: "",
  filingFor: "",
  deadline: "",
  previousPreparer: "",
  anythingComplicated: "",
  referralSource: "",
  referralSourceOther: "",
};

// ── Reusable Radio ─────────────────────────────────────────────────────────────

function RadioGroup({
  name,
  value,
  options,
  onChange,
}: {
  name: string;
  value: string;
  options: { label: string; value: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="space-y-3">
      {options.map((opt) => (
        <label
          key={opt.value}
          className="flex items-center gap-3 cursor-pointer group"
          style={{ minHeight: "44px" }}
        >
          <span
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
              value === opt.value
                ? "border-accent bg-accent"
                : "border-muted bg-background group-hover:border-accent"
            }`}
          >
            {value === opt.value && (
              <span className="w-2 h-2 rounded-full bg-white" />
            )}
          </span>
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="sr-only"
          />
          <span className="text-foreground">{opt.label}</span>
        </label>
      ))}
    </div>
  );
}

// ── Progress Bar ───────────────────────────────────────────────────────────────

function ProgressBar({ step, copy }: { step: number; copy: ReturnType<typeof localizedPageCopyFor> }) {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {copy.step} {step} {copy.of} 3
        </span>
        <span className="text-xs font-semibold text-accent">
          {Math.round((step / 3) * 100)}%
        </span>
      </div>
      <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-accent rounded-full transition-all duration-300"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

type IntakePageProps = {
  referralPartner?: ReferralPartner;
  locale?: Locale;
};

function localizedPageCopyFor(locale: Locale) {
  return localizedPageCopy[locale].intake;
}

type ReferralPartner = {
  label: string;
  sourceValue: string;
  link: string;
};

const lobosPerezCynthiaReferral: ReferralPartner = {
  label: "Lobos Perez Cynthia",
  sourceValue: "Lobos Perez Cynthia affiliate link",
  link: "fileabroad.com/?ref=lobos-perez-cynthia",
};

function readAffiliateReferralPartner() {
  if (typeof document === "undefined") {
    return undefined;
  }

  const cookie = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith("affiliate_ref="));
  const affiliateRef = cookie
    ? decodeURIComponent(cookie.slice("affiliate_ref=".length))
    : undefined;

  return affiliateRef === "lobos-perez-cynthia"
    ? lobosPerezCynthiaReferral
    : undefined;
}

export default function IntakeFormPage({ referralPartner, locale = "en" }: IntakePageProps) {
  const copy = localizedPageCopyFor(locale);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [storedReferralPartner, setStoredReferralPartner] =
    useState<ReferralPartner>();
  const [formStatus, setFormStatus] = useState<
    "" | "sending" | "success" | "error"
  >("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [botcheck, setBotcheck] = useState("");
  const activeReferralPartner = referralPartner ?? storedReferralPartner;

  useEffect(() => {
    if (referralPartner) return;
    const timer = window.setTimeout(() => {
      setStoredReferralPartner(readAffiliateReferralPartner());
    }, 0);
    return () => window.clearTimeout(timer);
  }, [referralPartner]);

  useEffect(() => {
    captureAttribution();
    trackConversionEvent("intake_view", {
      site: "fileabroad",
      page_path: window.location.pathname,
    });
    const requested = new URLSearchParams(window.location.search).get("service");
    const mapped =
      requested === "annual-compliance"
        ? "Annual plan"
        : requested === "complex-return" || requested === "complete"
          ? "Annual tax return (1040)"
        : requested === "consultation"
          ? "Consultation"
          : requested === "streamlined"
            ? "Back-filing"
            : requested === "referral"
              ? "Not sure"
              : undefined;
    if (mapped) {
      const timer = window.setTimeout(() => {
        setFormData((current) =>
          current.services.includes(mapped)
            ? current
            : { ...current, services: [...current.services, mapped] }
        );
      }, 0);
      return () => window.clearTimeout(timer);
    }
  }, []);

  // ── Helpers ────────────────────────────────────────────────────────────────

  const update = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (validationErrors.length > 0) setValidationErrors([]);
  };

  const toggleService = (service: string) => {
    setFormData((prev) => {
      const current = prev.services;
      const updated = current.includes(service)
        ? current.filter((s) => s !== service)
        : [...current, service];
      return { ...prev, services: updated };
    });
    if (validationErrors.length > 0) setValidationErrors([]);
  };

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // ── Validation ─────────────────────────────────────────────────────────────

  const validateStep1 = (): string[] => {
    const errors: string[] = [];
    if (!formData.firstName.trim()) errors.push("First name is required");
    if (!formData.lastName.trim()) errors.push("Last name is required");
    if (!formData.email.trim()) errors.push("Email is required");
    else if (!validateEmail(formData.email))
      errors.push("Please enter a valid email address");
    if (!formData.country.trim())
      errors.push("Country of residence is required");
    if (!formData.lastState.trim())
      errors.push("U.S. state of last residence is required");
    if (!formData.citizenStatus)
      errors.push("Please select your citizenship status");
    if (formData.services.length === 0)
      errors.push("Please select at least one service");
    return errors;
  };

  const validateStep2 = (): string[] => {
    const errors: string[] = [];
    const svcs = formData.services;

    if (svcs.includes("Annual tax return")) {
      if (!formData.taxYear) errors.push("Please select the tax year");
      if (!formData.primaryIncome)
        errors.push("Please select your primary income source");
      if (!formData.over130k)
        errors.push("Please indicate if you earn over $130,000/year");
      if (!formData.filingJointly)
        errors.push("Please indicate if you're filing jointly");
    }
    if (svcs.includes("FBAR")) {
      if (!formData.fbarOver10k)
        errors.push(
          "Please indicate if your foreign accounts exceeded $10,000"
        );
      if (!formData.fbarAccountCount)
        errors.push("Please indicate how many foreign accounts you have");
      if (!formData.fbarCountries.trim())
        errors.push("Please list the countries where your accounts are held");
    }
    if (svcs.includes("Back-filing")) {
      if (!formData.yearsSinceLastFiled)
        errors.push("Please indicate how many years since you last filed");
      if (!formData.streamlinedAware)
        errors.push(
          "Please indicate if you know about the Streamlined program"
        );
      if (!formData.irsNotices)
        errors.push("Please indicate if you've received IRS notices");
    }
    if (svcs.includes("Amended return")) {
      if (!formData.amendedYear.trim())
        errors.push("Please enter the tax year that needs amending");
    }
    if (svcs.includes("FEIE")) {
      if (!formData.feie330Days)
        errors.push("Please indicate your time outside the US");
      if (!formData.feiePermanentResidence)
        errors.push("Please indicate your foreign residence status");
    }
    if (svcs.includes("State tax")) {
      if (!formData.stateWhich.trim())
        errors.push("Please enter the state");
      if (!formData.stateTies)
        errors.push("Please indicate your ties to the state");
    }
    if (svcs.includes("Not sure")) {
      if (!formData.notSureSituation.trim())
        errors.push("Please describe your situation");
    }

    return errors;
  };

  const validateStep3 = (): string[] => {
    const errors: string[] = [];
    if (!formData.filingFor)
      errors.push("Please select who you're filing for");
    if (!formData.deadline) errors.push("Please select your deadline");
    if (!privacyConsent)
      errors.push("Please accept the intake privacy notice");
    return errors;
  };

  // ── Navigation ─────────────────────────────────────────────────────────────

  const handleNext = () => {
    let errors: string[] = [];
    if (step === 1) {
      errors = validateStep1();
      if (errors.length === 0) {
        const branchable = [
          "Annual tax return",
          "FBAR",
          "Back-filing",
          "Amended return",
          "FEIE",
          "State tax",
          "Not sure",
        ];
        const hasBranchable = formData.services.some((s) =>
          branchable.includes(s)
        );
        if (!hasBranchable) {
          setValidationErrors([]);
          setStep(3);
          trackConversionEvent("intake_step", {
            site: "fileabroad",
            step_completed: 1,
          });
          window.scrollTo({ top: 0, behavior: "smooth" });
          return;
        }
      }
    } else if (step === 2) {
      errors = validateStep2();
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
      trackConversionEvent("intake_validation_error", {
        site: "fileabroad",
        step,
        error_count: errors.length,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setValidationErrors([]);
    setStep((s) => s + 1);
    trackConversionEvent("intake_step", {
      site: "fileabroad",
      step_completed: step,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setValidationErrors([]);
    setStep((s) => s - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Submission ─────────────────────────────────────────────────────────────

  const buildSubmissionData = () => {
    const base: Record<string, string> = {
      "First Name": formData.firstName,
      "Last Name": formData.lastName,
      Email: formData.email,
      "WhatsApp Number": formData.whatsapp,
      "Country of Residence": formData.country,
      "U.S. State of Last Residence": formData.lastState,
      "Citizenship Status": formData.citizenStatus,
      "Services Requested": formData.services.join(", "),
    };

    // Branch-specific fields
    if (formData.services.includes("Annual tax return")) {
      base["Tax Year"] = formData.taxYear;
      base["Primary Income Source"] = formData.primaryIncome;
      base["Earns Over $130,000"] = formData.over130k;
      base["Filing Jointly"] = formData.filingJointly;
    }
    if (formData.services.includes("FBAR")) {
      base["FBAR - Accounts Over $10,000"] = formData.fbarOver10k;
      base["FBAR - Number of Accounts"] = formData.fbarAccountCount;
      base["FBAR - Countries"] = formData.fbarCountries;
    }
    if (formData.services.includes("Back-filing")) {
      base["Back-filing - Years Since Last Filed"] =
        formData.yearsSinceLastFiled;
      base["Back-filing - Aware of Streamlined"] = formData.streamlinedAware;
      base["Back-filing - IRS Notices"] = formData.irsNotices;
    }
    if (formData.services.includes("Amended return")) {
      base["Amended - Tax Year"] = formData.amendedYear;
      if (formData.amendedCorrection)
        base["Amended - What Needs Correction"] = formData.amendedCorrection;
    }
    if (formData.services.includes("FEIE")) {
      base["FEIE - 330 Days Outside US"] = formData.feie330Days;
      base["FEIE - Foreign Residence"] = formData.feiePermanentResidence;
    }
    if (formData.services.includes("State tax")) {
      base["State Tax - Which State"] = formData.stateWhich;
      base["State Tax - Ties to State"] = formData.stateTies;
    }
    if (formData.services.includes("Not sure")) {
      base["Not Sure - Situation"] = formData.notSureSituation;
    }

    // Universal closing
    base["Filing For"] = formData.filingFor;
    base["Deadline"] = formData.deadline;
    base["Previous Preparer"] = formData.previousPreparer;
    if (formData.anythingComplicated)
      base["Anything Complicated"] = formData.anythingComplicated;
    base["Referral Source"] = activeReferralPartner
      ? activeReferralPartner.sourceValue
      : formData.referralSource === "Other" && formData.referralSourceOther
        ? `Other: ${formData.referralSourceOther}`
        : formData.referralSource;

    if (activeReferralPartner) {
      base["Referral Partner"] = activeReferralPartner.label;
      base["Referral Link"] = activeReferralPartner.link;
    }

    Object.assign(base, getAttributionFields());

    return base;
  };

  const handleSubmit = async () => {
    const errors = validateStep3();
    if (errors.length > 0) {
      setValidationErrors(errors);
      trackConversionEvent("intake_validation_error", {
        site: "fileabroad",
        step: 3,
        error_count: errors.length,
      });
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setValidationErrors([]);
    setFormStatus("sending");

    const submissionData = buildSubmissionData();

    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          fields: submissionData,
          privacyConsent,
          botcheck,
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setFormStatus("success");
        trackConversionEvent("intake_submit", {
          site: "fileabroad",
          service_count: formData.services.length,
        });
        trackConversionEvent("generate_lead", {
          site: "fileabroad",
          lead_type: formData.services.includes("Annual plan")
            ? "annual_plan"
            : formData.services.includes("Consultation")
              ? "consultation"
              : "tax_intake",
        });
      } else {
        console.error("Form error:", result);
        setFormStatus("error");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setFormStatus("error");
    }
  };

  // ── Render Helpers ─────────────────────────────────────────────────────────

  const inputClass =
    "w-full px-4 py-3 bg-background border border-muted rounded-lg focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all text-foreground";
  const labelClass = "block text-sm font-semibold text-foreground mb-2";
  const requiredStar = <span className="text-red-500">*</span>;

  // ── Step 1 ─────────────────────────────────────────────────────────────────

  const renderStep1 = () => (
    <div className="space-y-6">
      {/* Name */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className={labelClass}>
            First Name {requiredStar}
          </label>
          <input
            type="text"
            id="firstName"
            value={formData.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            className={inputClass}
            placeholder="John"
          />
        </div>
        <div>
          <label htmlFor="lastName" className={labelClass}>
            Last Name {requiredStar}
          </label>
          <input
            type="text"
            id="lastName"
            value={formData.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            className={inputClass}
            placeholder="Doe"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className={labelClass}>
          Email Address {requiredStar}
        </label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={(e) => update("email", e.target.value)}
          className={inputClass}
          placeholder="john@example.com"
        />
      </div>

      {/* WhatsApp */}
      <div>
        <label htmlFor="whatsapp" className={labelClass}>
          WhatsApp Number <span className="font-normal text-muted-foreground">(optional)</span>
        </label>
        <input
          type="tel"
          id="whatsapp"
          value={formData.whatsapp}
          onChange={(e) => update("whatsapp", e.target.value)}
          className={inputClass}
          placeholder="+1 555 123 4567"
        />
        <p className="text-xs text-muted-foreground mt-1">
          If provided, include the country code (e.g. +1 for US, +593 for Ecuador)
        </p>
      </div>

      {/* Country & State */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="country" className={labelClass}>
            Current Country of Residence {requiredStar}
          </label>
          <input
            type="text"
            id="country"
            value={formData.country}
            onChange={(e) => update("country", e.target.value)}
            className={inputClass}
            placeholder="Ecuador"
          />
        </div>
        <div>
          <label htmlFor="lastState" className={labelClass}>
            U.S. State of Last Residence {requiredStar}
          </label>
          <input
            type="text"
            id="lastState"
            value={formData.lastState}
            onChange={(e) => update("lastState", e.target.value)}
            className={inputClass}
            placeholder="California"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Before moving abroad
          </p>
        </div>
      </div>

      {/* Citizen Status */}
      <div>
        <label className={labelClass}>
          Are you a U.S. citizen or Green Card holder? {requiredStar}
        </label>
        <RadioGroup
          name="citizenStatus"
          value={formData.citizenStatus}
          onChange={(v) => update("citizenStatus", v)}
          options={[
            { label: "Yes, U.S. citizen", value: "U.S. citizen" },
            { label: "Yes, Green Card holder", value: "Green Card holder" },
            { label: "No", value: "No" },
            { label: "Not sure", value: "Not sure" },
          ]}
        />
      </div>

      {/* Service Selection — Checkboxes */}
      <div>
        <label className={labelClass}>
          What do you need help with? Select all that apply. {requiredStar}
        </label>
        <div className="space-y-3">
          {SERVICE_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className="flex items-center gap-3 cursor-pointer group"
              style={{ minHeight: "44px" }}
            >
              <span
                className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                  formData.services.includes(opt.value)
                    ? "border-accent bg-accent"
                    : "border-muted bg-background group-hover:border-accent"
                }`}
              >
                {formData.services.includes(opt.value) && (
                  <svg
                    className="w-3 h-3 text-white"
                    viewBox="0 0 12 12"
                    fill="none"
                  >
                    <path
                      d="M2 6l3 3 5-5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </span>
              <input
                type="checkbox"
                checked={formData.services.includes(opt.value)}
                onChange={() => toggleService(opt.value)}
                className="sr-only"
              />
              <span className="text-foreground">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  // ── Step 2 Branches ────────────────────────────────────────────────────────

  const renderAnnualTaxBranch = () => (
    <div className="space-y-6">
      <div>
        <label className={labelClass}>
          What tax year do you need filed? {requiredStar}
        </label>
        <RadioGroup
          name="taxYear"
          value={formData.taxYear}
          onChange={(v) => update("taxYear", v)}
          options={[
            { label: "2025", value: "2025" },
            { label: "2024", value: "2024" },
            { label: "Multiple years", value: "Multiple years" },
          ]}
        />
      </div>
      <div>
        <label className={labelClass}>
          What is your primary income source? {requiredStar}
        </label>
        <RadioGroup
          name="primaryIncome"
          value={formData.primaryIncome}
          onChange={(v) => update("primaryIncome", v)}
          options={[
            { label: "W-2 employment", value: "W-2 employment" },
            {
              label: "Self-employment (1099/freelance)",
              value: "Self-employment",
            },
            {
              label: "Pension/Social Security",
              value: "Pension/Social Security",
            },
            { label: "Investment income", value: "Investment income" },
            { label: "Rental income", value: "Rental income" },
            { label: "Multiple sources", value: "Multiple sources" },
          ]}
        />
      </div>
      <div>
        <label className={labelClass}>
          Do you earn over $130,000/year? {requiredStar}
        </label>
        <RadioGroup
          name="over130k"
          value={formData.over130k}
          onChange={(v) => update("over130k", v)}
          options={[
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
            { label: "Close to that amount", value: "Close" },
          ]}
        />
      </div>
      <div>
        <label className={labelClass}>
          Are you filing jointly with a spouse? {requiredStar}
        </label>
        <RadioGroup
          name="filingJointly"
          value={formData.filingJointly}
          onChange={(v) => update("filingJointly", v)}
          options={[
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
          ]}
        />
      </div>
    </div>
  );

  const renderFbarBranch = () => (
    <div className="space-y-6">
      <div>
        <label className={labelClass}>
          Do you have foreign bank accounts (outside the US) with a combined
          balance that exceeded $10,000 at any point during the year?{" "}
          {requiredStar}
        </label>
        <RadioGroup
          name="fbarOver10k"
          value={formData.fbarOver10k}
          onChange={(v) => update("fbarOver10k", v)}
          options={[
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
            { label: "Not sure", value: "Not sure" },
          ]}
        />
      </div>
      <div>
        <label className={labelClass}>
          How many foreign accounts do you have? {requiredStar}
        </label>
        <RadioGroup
          name="fbarAccountCount"
          value={formData.fbarAccountCount}
          onChange={(v) => update("fbarAccountCount", v)}
          options={[
            { label: "1-2", value: "1-2" },
            { label: "3-5", value: "3-5" },
            { label: "6+", value: "6+" },
            { label: "Not sure", value: "Not sure" },
          ]}
        />
      </div>
      <div>
        <label htmlFor="fbarCountries" className={labelClass}>
          In which countries are your accounts? {requiredStar}
        </label>
        <input
          type="text"
          id="fbarCountries"
          value={formData.fbarCountries}
          onChange={(e) => update("fbarCountries", e.target.value)}
          className={inputClass}
          placeholder="Ecuador, Colombia, etc."
        />
      </div>
    </div>
  );

  const renderBackFilingBranch = () => (
    <div className="space-y-6">
      <div>
        <label className={labelClass}>
          How many years has it been since you last filed a U.S. tax return?{" "}
          {requiredStar}
        </label>
        <RadioGroup
          name="yearsSinceLastFiled"
          value={formData.yearsSinceLastFiled}
          onChange={(v) => update("yearsSinceLastFiled", v)}
          options={[
            { label: "1-2 years", value: "1-2 years" },
            { label: "3-5 years", value: "3-5 years" },
            { label: "6+ years", value: "6+ years" },
            {
              label: "I've never filed from abroad",
              value: "Never filed from abroad",
            },
          ]}
        />
      </div>
      <div>
        <label className={labelClass}>
          Did you know about the Streamlined Foreign Offshore program?{" "}
          {requiredStar}
        </label>
        <RadioGroup
          name="streamlinedAware"
          value={formData.streamlinedAware}
          onChange={(v) => update("streamlinedAware", v)}
          options={[
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
            { label: "What's that?", value: "What's that?" },
          ]}
        />
      </div>
      <div>
        <label className={labelClass}>
          Have you received any IRS notices or letters? {requiredStar}
        </label>
        <RadioGroup
          name="irsNotices"
          value={formData.irsNotices}
          onChange={(v) => update("irsNotices", v)}
          options={[
            { label: "No", value: "No" },
            { label: "Yes", value: "Yes" },
            { label: "Not sure", value: "Not sure" },
          ]}
        />
      </div>
    </div>
  );

  const renderAmendedBranch = () => (
    <div className="space-y-6">
      <div>
        <label htmlFor="amendedYear" className={labelClass}>
          Which tax year needs amending? {requiredStar}
        </label>
        <input
          type="text"
          id="amendedYear"
          value={formData.amendedYear}
          onChange={(e) => update("amendedYear", e.target.value)}
          className={inputClass}
          placeholder="2024"
        />
      </div>
      <div>
        <label htmlFor="amendedCorrection" className={labelClass}>
          What needs to be corrected?
        </label>
        <textarea
          id="amendedCorrection"
          value={formData.amendedCorrection}
          onChange={(e) => update("amendedCorrection", e.target.value)}
          rows={4}
          className={`${inputClass} resize-none`}
          placeholder="Describe what needs to be changed..."
        />
      </div>
    </div>
  );

  const renderFeieBranch = () => (
    <div className="space-y-6">
      <div>
        <label className={labelClass}>
          Have you been outside the US for at least 330 days in the past 12
          months? {requiredStar}
        </label>
        <RadioGroup
          name="feie330Days"
          value={formData.feie330Days}
          onChange={(v) => update("feie330Days", v)}
          options={[
            { label: "Yes", value: "Yes" },
            { label: "No", value: "No" },
            { label: "Close", value: "Close" },
            { label: "Not sure", value: "Not sure" },
          ]}
        />
      </div>
      <div>
        <label className={labelClass}>
          Do you have a permanent residence in a foreign country? {requiredStar}
        </label>
        <RadioGroup
          name="feiePermanentResidence"
          value={formData.feiePermanentResidence}
          onChange={(v) => update("feiePermanentResidence", v)}
          options={[
            { label: "Yes, I have residency", value: "Yes, have residency" },
            {
              label: "No, I'm on a tourist visa",
              value: "No, tourist visa",
            },
            {
              label: "I'm in the process of getting residency",
              value: "Getting residency",
            },
          ]}
        />
      </div>
    </div>
  );

  const renderStateTaxBranch = () => (
    <div className="space-y-6">
      <div>
        <label htmlFor="stateWhich" className={labelClass}>
          Which state? {requiredStar}
        </label>
        <input
          type="text"
          id="stateWhich"
          value={formData.stateWhich}
          onChange={(e) => update("stateWhich", e.target.value)}
          className={inputClass}
          placeholder="California"
        />
      </div>
      <div>
        <label className={labelClass}>
          Do you still have ties to that state (property, driver&apos;s license,
          voter registration, mailing address)? {requiredStar}
        </label>
        <RadioGroup
          name="stateTies"
          value={formData.stateTies}
          onChange={(v) => update("stateTies", v)}
          options={[
            { label: "Yes, some ties", value: "Yes, some ties" },
            { label: "No, fully cut ties", value: "No, fully cut ties" },
            { label: "Not sure", value: "Not sure" },
          ]}
        />
      </div>
    </div>
  );

  const renderNotSureBranch = () => (
    <div className="space-y-6">
      <div>
        <label htmlFor="notSureSituation" className={labelClass}>
          Tell me about your situation {requiredStar}
        </label>
        <textarea
          id="notSureSituation"
          value={formData.notSureSituation}
          onChange={(e) => update("notSureSituation", e.target.value)}
          rows={5}
          className={`${inputClass} resize-none`}
          placeholder="Describe your tax situation and what you're looking for help with..."
        />
      </div>
    </div>
  );

  const renderStep2 = () => {
    const svcs = formData.services;
    const branches: { title: string; render: () => React.ReactNode }[] = [];

    if (svcs.includes("Annual tax return"))
      branches.push({
        title: "Annual Tax Return",
        render: renderAnnualTaxBranch,
      });
    if (svcs.includes("FBAR"))
      branches.push({ title: "FBAR", render: renderFbarBranch });
    if (svcs.includes("Back-filing"))
      branches.push({ title: "Back-Filing", render: renderBackFilingBranch });
    if (svcs.includes("Amended return"))
      branches.push({ title: "Amended Return", render: renderAmendedBranch });
    if (svcs.includes("FEIE"))
      branches.push({ title: "FEIE", render: renderFeieBranch });
    if (svcs.includes("State tax"))
      branches.push({ title: "State Tax Filing", render: renderStateTaxBranch });
    if (svcs.includes("Not sure"))
      branches.push({
        title: "Tell Me More",
        render: renderNotSureBranch,
      });

    return (
      <div className="space-y-10">
        {branches.map((branch, i) => (
          <div key={branch.title}>
            {branches.length > 1 && (
              <p className="text-sm font-semibold tracking-widest text-accent uppercase mb-4">
                {branch.title}
              </p>
            )}
            {branches.length === 1 && (
              <h3 className="text-2xl font-sans font-bold text-foreground mb-6">
                {branch.title === "Tell Me More"
                  ? branch.title
                  : `${branch.title} Details`}
              </h3>
            )}
            {branch.render()}
            {i < branches.length - 1 && (
              <div className="border-t border-muted mt-10" />
            )}
          </div>
        ))}
      </div>
    );
  };

  // ── Step 3 ─────────────────────────────────────────────────────────────────

  const renderStep3 = () => (
    <div className="space-y-6">
      {/* Filing for */}
      <div>
        <label className={labelClass}>
          Are you filing for yourself only, or also for a spouse? {requiredStar}
        </label>
        <RadioGroup
          name="filingFor"
          value={formData.filingFor}
          onChange={(v) => update("filingFor", v)}
          options={[
            { label: "Just myself", value: "Just myself" },
            { label: "Myself and spouse", value: "Myself and spouse" },
          ]}
        />
      </div>

      {/* Deadline */}
      <div>
        <label className={labelClass}>
          When do you need this completed? {requiredStar}
        </label>
        <RadioGroup
          name="deadline"
          value={formData.deadline}
          onChange={(v) => update("deadline", v)}
          options={[
            {
              label: "Before April 15 (FBAR deadline)",
              value: "Before April 15",
            },
            {
              label: "Before June 15 (expat filing deadline)",
              value: "Before June 15",
            },
            {
              label: "Before October 15 (extension deadline)",
              value: "Before October 15",
            },
            {
              label: "No rush \u2014 I just want to get compliant",
              value: "No rush",
            },
            {
              label: "I need back-filing done",
              value: "Back-filing",
            },
          ]}
        />
      </div>

      {/* Previous preparer */}
      <div>
        <label className={labelClass}>
          Have you worked with a tax preparer for your expat returns before?{" "}
          <span className="font-normal text-muted-foreground">(optional)</span>
        </label>
        <RadioGroup
          name="previousPreparer"
          value={formData.previousPreparer}
          onChange={(v) => update("previousPreparer", v)}
          options={[
            {
              label: "No, this is my first time",
              value: "First time",
            },
            {
              label: "Yes, but I'm looking for someone new",
              value: "Looking for someone new",
            },
            {
              label:
                "Yes, but they didn't handle the expat-specific parts correctly",
              value: "Previous didn't handle expat correctly",
            },
          ]}
        />
      </div>

      {/* Anything complicated */}
      <div>
        <label htmlFor="anythingComplicated" className={labelClass}>
          Is there anything complicated or unusual about your tax situation?
        </label>
        <textarea
          id="anythingComplicated"
          value={formData.anythingComplicated}
          onChange={(e) => update("anythingComplicated", e.target.value)}
          rows={4}
          className={`${inputClass} resize-none`}
          placeholder="Examples: cryptocurrency, foreign business ownership, rental properties in multiple countries, inheritance, large capital gains, foreign pension"
        />
        <p className="text-xs text-muted-foreground mt-1">
          Optional. Do not enter SSNs, account numbers, passport numbers, or other document data.
        </p>
      </div>

      {!activeReferralPartner && (
        <div>
          <label className={labelClass}>
            How did you hear about FileAbroad?{" "}
            <span className="font-normal text-muted-foreground">(optional)</span>
          </label>
          <RadioGroup
            name="referralSource"
            value={formData.referralSource}
            onChange={(v) => {
              update("referralSource", v);
              if (v !== "Other") update("referralSourceOther", "");
            }}
            options={[
              { label: "CuencaExpat.com", value: "CuencaExpat.com" },
              {
                label: "TikTok / YouTube / Facebook video",
                value: "Social media video",
              },
              { label: "Facebook group", value: "Facebook group" },
              {
                label: "Referral from a friend or client",
                value: "Referral",
              },
              {
                label: "Online blog post or article",
                value: "Blog post",
              },
              { label: "Other", value: "Other" },
            ]}
          />
          {formData.referralSource === "Other" && (
            <div className="mt-3">
              <input
                type="text"
                value={formData.referralSourceOther}
                onChange={(e) => update("referralSourceOther", e.target.value)}
                className={inputClass}
                placeholder="Please specify..."
              />
            </div>
          )}
        </div>
      )}

      <div className="bg-surface-elevated border border-muted rounded-lg p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={privacyConsent}
            onChange={(event) => {
              setPrivacyConsent(event.target.checked);
              if (validationErrors.length > 0) setValidationErrors([]);
            }}
            className="mt-1 w-5 h-5"
          />
          <span className="text-sm text-foreground">
            I consent to FileAbroad using this preliminary intake and its named
            service providers to review and respond to my request. I understand
            that I must use the secure Encyro portal—not this form, email, or
            WhatsApp—for SSNs, passports, tax returns, or financial documents. {requiredStar}
          </span>
        </label>
      </div>
    </div>
  );

  // ── Success State ──────────────────────────────────────────────────────────

  const renderSuccess = () => (
    <div className="text-center py-10">
      <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
        <CheckCircle2 className="w-7 h-7 text-green-600" />
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
        Thanks &mdash; intake received.
      </h2>
      <p className="text-base text-muted-foreground max-w-md mx-auto mb-8">
        I review every intake personally and reply within one business day.
        Secure upload instructions come after scope acceptance.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <a
          href={process.env.NEXT_PUBLIC_SECURE_UPLOAD_URL || "https://www.encyro.com/fileabroad"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-foreground text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity px-5 py-3"
        >
          Secure Upload Portal
        </a>
      </div>
    </div>
  );

  // ── Error State ────────────────────────────────────────────────────────────

  const renderError = () => (
    <div className="text-center py-10">
      <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
        <AlertTriangle className="w-7 h-7 text-red-600" />
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">
        Something went wrong
      </h2>
      <p className="text-base text-muted-foreground max-w-md mx-auto mb-6">
        Your form couldn&apos;t be submitted. Please try again, or reach out
        directly:
      </p>
      <div className="space-y-2 mb-8">
        <p className="text-foreground flex items-center justify-center gap-2 text-sm">
          <Phone className="w-4 h-4 text-accent" />
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Chip — I had trouble submitting the intake form. Can we continue here? [FA-GENERAL]")}`}
            target="_blank"
            rel="noopener noreferrer"
            data-cta-location="intake-error"
            data-whatsapp-intent="intake_error_fallback"
            className="text-accent hover:underline font-semibold"
          >
            {WHATSAPP_DISPLAY}
          </a>
        </p>
        <p className="text-foreground flex items-center justify-center gap-2 text-sm">
          <Mail className="w-4 h-4 text-accent" />
          <a
            href="mailto:info@fileabroad.com"
            className="text-accent hover:underline font-semibold"
          >
            info@fileabroad.com
          </a>
        </p>
      </div>
      <button
        onClick={() => setFormStatus("")}
        className="bg-accent hover:opacity-90 text-white rounded-lg font-semibold text-base transition-opacity px-6 py-3"
      >
        Try Again
      </button>
    </div>
  );

  // ── Main Render ────────────────────────────────────────────────────────────

  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1} className="pt-4 pb-16 bg-background">
        <section className="py-6 md:py-8">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Page Header */}
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {copy.eyebrow}
              </p>
              <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
                {copy.title}
              </h1>
              {formStatus !== "success" && formStatus !== "error" && (
                <p className="mt-3 text-base text-muted-foreground max-w-xl">
                  {copy.description}
                </p>
              )}
            </div>

            {/* Form Card */}
            <div
              data-analytics-form="true"
              data-form-name="expat-tax-intake"
              className="bg-surface border border-muted rounded-xl"
              style={{ padding: "28px" }}
            >
              {/* Honeypot */}
              <input
                type="text"
                name="botcheck"
                value={botcheck}
                onChange={(event) => setBotcheck(event.target.value)}
                className="hidden"
                style={{ display: "none" }}
                tabIndex={-1}
                autoComplete="off"
              />

              {formStatus === "success" ? (
                renderSuccess()
              ) : formStatus === "error" ? (
                renderError()
              ) : (
                <>
                  <ProgressBar step={step} copy={copy} />

                  {/* Validation Errors */}
                  {validationErrors.length > 0 && (
                    <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg mb-6 p-4">
                      <p className="font-semibold mb-2 text-sm">
                        Please fix the following:
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {validationErrors.map((err, i) => (
                          <li key={i}>{err}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Steps */}
                  <>
                    {step === 1 && renderStep1()}
                    {step === 2 && renderStep2()}
                    {step === 3 && renderStep3()}
                  </>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between border-t border-muted pt-6 mt-8">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors px-4 py-2.5"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        {copy.back}
                      </button>
                    ) : (
                      <div />
                    )}

                    {step < 3 ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="inline-flex items-center gap-2 bg-accent hover:opacity-90 text-white rounded-lg font-semibold text-base transition-opacity px-6 py-3"
                      >
                        {copy.next}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={formStatus === "sending"}
                        className="inline-flex items-center gap-2 bg-accent hover:opacity-90 text-white rounded-lg font-semibold text-base transition-opacity disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3"
                      >
                        {formStatus === "sending" ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            {copy.submitting}
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            {copy.submit}
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>

            {/* Privacy note */}
            {formStatus !== "success" && formStatus !== "error" && (
              <p className="text-xs text-muted-foreground text-center mt-5 max-w-lg mx-auto">
                {copy.privacy}
              </p>
            )}
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
