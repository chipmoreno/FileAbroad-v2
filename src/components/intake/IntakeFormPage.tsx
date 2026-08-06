"use client";

import { useEffect, useState } from "react";
import {
  Send,
  CheckCircle2,
  AlertTriangle,
  Mail,
} from "@/components/icons";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { trackConversionEvent } from "@/components/analytics/ConversionTracking";
import { captureAttribution, getAttributionFields } from "@/lib/attribution";

import type { Locale } from "@/lib/i18n/config";
import { localizedPageCopy } from "@/lib/i18n/localized-page-copy";

// ── Types ──────────────────────────────────────────────────────────────────────

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  lastState: string;
  citizenStatus: string;
  services: string[];
  taxYear: string;
  primaryIncome: string;
  over130k: string;
  filingJointly: string;
  fbarOver10k: string;
  fbarAccountCount: string;
  fbarCountries: string;
  yearsSinceLastFiled: string;
  streamlinedAware: string;
  irsNotices: string;
  amendedYear: string;
  amendedCorrection: string;
  feie330Days: string;
  feiePermanentResidence: string;
  stateWhich: string;
  stateTies: string;
  notSureSituation: string;
  filingFor: string;
  deadline: string;
  previousPreparer: string;
  anythingComplicated: string;
  referralSource: string;
  referralSourceOther: string;
};

const SERVICE_OPTIONS = [
  { label: "Annual return", value: "Annual tax return" },
  { label: "FBAR", value: "FBAR" },
  { label: "Back-filing", value: "Back-filing" },
  { label: "Amended", value: "Amended return" },
  { label: "FEIE", value: "FEIE" },
  { label: "State tax", value: "State tax" },
  { label: "Consultation", value: "Consultation" },
  { label: "Annual plan", value: "Annual plan" },
  { label: "Not sure", value: "Not sure" },
] as const;

const initialFormData: FormData = {
  firstName: "",
  lastName: "",
  email: "",
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

// ── Reusable Components ─────────────────────────────────────────────────────────

function RadioPills({
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
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-all ${
            value === opt.value
              ? "border-accent bg-accent text-white"
              : "border-muted bg-background text-muted-foreground hover:border-accent/50 hover:text-foreground"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

type IntakePageProps = {
  referralPartner?: ReferralPartner;
  locale?: Locale;
};

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
  if (typeof document === "undefined") return undefined;
  const cookie = document.cookie.split("; ").find((entry) => entry.startsWith("affiliate_ref="));
  const affiliateRef = cookie ? decodeURIComponent(cookie.slice("affiliate_ref=".length)) : undefined;
  return affiliateRef === "lobos-perez-cynthia" ? lobosPerezCynthiaReferral : undefined;
}

export default function IntakeFormPage({ referralPartner, locale = "en" }: IntakePageProps) {
  const copy = localizedPageCopy[locale].intake;
  const [formData, setFormData] = useState<FormData>(() => {
    try {
      const saved = localStorage.getItem('fa-intake-draft');
      if (saved) return { ...initialFormData, ...JSON.parse(saved) };
    } catch {}
    return initialFormData;
  });
  const [storedReferralPartner, setStoredReferralPartner] = useState<ReferralPartner>();
  const [formStatus, setFormStatus] = useState<"" | "sending" | "success" | "error">("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [botcheck, setBotcheck] = useState("");
  const activeReferralPartner = referralPartner ?? storedReferralPartner;

  useEffect(() => {
    if (referralPartner) return;
    const timer = window.setTimeout(() => setStoredReferralPartner(readAffiliateReferralPartner()), 0);
    return () => window.clearTimeout(timer);
  }, [referralPartner]);

  useEffect(() => {
    captureAttribution();
    trackConversionEvent("intake_view", { site: "fileabroad", page_path: window.location.pathname });
    const requested = new URLSearchParams(window.location.search).get("service");
    const mapped =
      requested === "annual-compliance"
        ? "Annual plan"
        : requested === "complex-return" || requested === "complete"
          ? "Annual tax return"
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
          current.services.includes(mapped) ? current : { ...current, services: [...current.services, mapped] }
        );
      }, 0);
      return () => window.clearTimeout(timer);
    }
  }, []);

  const update = (field: keyof FormData, value: string) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      try { localStorage.setItem('fa-intake-draft', JSON.stringify(next)); } catch {}
      return next;
    });
    if (validationErrors.length > 0) setValidationErrors([]);
  };

  const toggleService = (service: string) => {
    setFormData((prev) => {
      const current = prev.services;
      const updated = current.includes(service) ? current.filter((s) => s !== service) : [...current, service];
      const next = { ...prev, services: updated };
      try { localStorage.setItem('fa-intake-draft', JSON.stringify(next)); } catch {}
      return next;
    });
    if (validationErrors.length > 0) setValidationErrors([]);
  };

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validate = (): string[] => {
    const errors: string[] = [];
    if (!formData.firstName.trim()) errors.push("First name is required");
    if (!formData.lastName.trim()) errors.push("Last name is required");
    if (!formData.email.trim()) errors.push("Email is required");
    else if (!validateEmail(formData.email)) errors.push("Please enter a valid email address");
    if (!formData.country.trim()) errors.push("Country of residence is required");
    if (!formData.lastState.trim()) errors.push("U.S. state of last residence is required");
    if (!formData.citizenStatus) errors.push("Please select your citizenship status");
    if (formData.services.length === 0) errors.push("Please select at least one service");

    const svcs = formData.services;
    if (svcs.includes("Annual tax return")) {
      if (!formData.taxYear) errors.push("Please select the tax year");
      if (!formData.primaryIncome) errors.push("Please select your primary income source");
      if (!formData.over130k) errors.push("Please indicate if you earn over $130,000/year");
      if (!formData.filingJointly) errors.push("Please indicate if you're filing jointly");
    }
    if (svcs.includes("FBAR")) {
      if (!formData.fbarOver10k) errors.push("Please indicate if your foreign accounts exceeded $10,000");
      if (!formData.fbarAccountCount) errors.push("Please indicate how many foreign accounts you have");
      if (!formData.fbarCountries.trim()) errors.push("Please list the countries where your accounts are held");
    }
    if (svcs.includes("Back-filing")) {
      if (!formData.yearsSinceLastFiled) errors.push("Please indicate how many years since you last filed");
      if (!formData.streamlinedAware) errors.push("Please indicate if you know about the Streamlined program");
      if (!formData.irsNotices) errors.push("Please indicate if you've received IRS notices");
    }
    if (svcs.includes("Amended return")) {
      if (!formData.amendedYear.trim()) errors.push("Please enter the tax year that needs amending");
    }
    if (svcs.includes("FEIE")) {
      if (!formData.feie330Days) errors.push("Please indicate your time outside the US");
      if (!formData.feiePermanentResidence) errors.push("Please indicate your foreign residence status");
    }
    if (svcs.includes("State tax")) {
      if (!formData.stateWhich.trim()) errors.push("Please enter the state");
      if (!formData.stateTies) errors.push("Please indicate your ties to the state");
    }
    if (svcs.includes("Not sure")) {
      if (!formData.notSureSituation.trim()) errors.push("Please describe your situation");
    }

    if (!formData.filingFor) errors.push("Please select who you're filing for");
    if (!formData.deadline) errors.push("Please select your deadline");
    if (!privacyConsent) errors.push("Please accept the intake privacy notice");
    return errors;
  };

  const buildSubmissionData = () => {
    const base: Record<string, string> = {
      "First Name": formData.firstName,
      "Last Name": formData.lastName,
      Email: formData.email,
      "Country of Residence": formData.country,
      "U.S. State of Last Residence": formData.lastState,
      "Citizenship Status": formData.citizenStatus,
      "Services Requested": formData.services.join(", "),
    };
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
      base["Back-filing - Years Since Last Filed"] = formData.yearsSinceLastFiled;
      base["Back-filing - Aware of Streamlined"] = formData.streamlinedAware;
      base["Back-filing - IRS Notices"] = formData.irsNotices;
    }
    if (formData.services.includes("Amended return")) {
      base["Amended - Tax Year"] = formData.amendedYear;
      if (formData.amendedCorrection) base["Amended - What Needs Correction"] = formData.amendedCorrection;
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
    base["Filing For"] = formData.filingFor;
    base["Deadline"] = formData.deadline;
    base["Previous Preparer"] = formData.previousPreparer;
    if (formData.anythingComplicated) base["Anything Complicated"] = formData.anythingComplicated;
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
    const errors = validate();
    if (errors.length > 0) {
      setValidationErrors(errors);
      trackConversionEvent("intake_validation_error", { site: "fileabroad", error_count: errors.length });
      return;
    }
    setValidationErrors([]);
    setErrorMessage("");
    setFormStatus("sending");
    const submissionData = buildSubmissionData();
    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ fields: submissionData, privacyConsent, botcheck }),
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setFormStatus("success");
        try { localStorage.removeItem('fa-intake-draft'); } catch {}
        trackConversionEvent("intake_submit", { site: "fileabroad", service_count: formData.services.length });
        trackConversionEvent("generate_lead", {
          site: "fileabroad",
          lead_type: formData.services.includes("Annual plan") ? "annual_plan" : formData.services.includes("Consultation") ? "consultation" : "tax_intake",
        });
      } else {
        console.error("Form error:", result);
        setErrorMessage(result.error || "Server returned an error. Please try again.");
        setFormStatus("error");
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setErrorMessage("Network error. Please check your connection and try again.");
      setFormStatus("error");
    }
  };

  const inputClass = "w-full px-3 py-2 bg-background border border-muted rounded-md focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all text-foreground text-sm";

  const renderSuccess = () => (
    <div className="text-center py-10">
      <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
        <CheckCircle2 className="w-7 h-7 text-green-600" />
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">Thanks &mdash; intake received.</h2>
      <p className="text-base text-muted-foreground max-w-md mx-auto mb-8">I review every intake personally and reply within one business day. Secure upload instructions come after scope acceptance.</p>
      <a href={process.env.NEXT_PUBLIC_SECURE_UPLOAD_URL || "https://www.encyro.com/fileabroad"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-foreground text-white rounded-lg font-semibold text-sm hover:opacity-90 transition-opacity px-5 py-3">Secure Upload Portal</a>
    </div>
  );

  const renderError = () => (
    <div className="text-center py-10">
      <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-5">
        <AlertTriangle className="w-7 h-7 text-red-600" />
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-3">Something went wrong</h2>
      <p className="text-base text-muted-foreground max-w-md mx-auto mb-2">Your form couldn&apos;t be submitted.</p>
      {errorMessage && (
        <p className="text-sm text-red-600 max-w-md mx-auto mb-4 bg-red-50 rounded-md px-3 py-2">{errorMessage}</p>
      )}
      <p className="text-base text-muted-foreground max-w-md mx-auto mb-6">Please try again, or reach out directly:</p>
      <div className="space-y-2 mb-8">
        <p className="text-foreground flex items-center justify-center gap-2 text-sm">
          <Mail className="w-4 h-4 text-accent" />
          <a href="mailto:info@fileabroad.com" className="text-accent hover:underline font-semibold">info@fileabroad.com</a>
        </p>
        <p className="text-sm text-muted-foreground">We typically reply within one business day.</p>
      </div>
      <button onClick={() => { setFormStatus(""); setErrorMessage(""); }} className="bg-accent hover:opacity-90 text-white rounded-lg font-semibold text-base transition-opacity px-6 py-3">Try Again</button>
    </div>
  );

  const svcs = formData.services;
  const hasBranchable = svcs.some((s) => ["Annual tax return", "FBAR", "Back-filing", "Amended return", "FEIE", "State tax", "Not sure"].includes(s));

  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1} className="pt-2 pb-8 bg-background">
        <section className="py-4 md:py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{copy.eyebrow}</p>
              <h1 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-foreground">{copy.title}</h1>
              {formStatus !== "success" && formStatus !== "error" && (
                <p className="mt-1 text-sm text-muted-foreground max-w-xl">{copy.description}</p>
              )}
            </div>

            {/* Form */}
            <div data-analytics-form="true" data-form-name="expat-tax-intake">
              <input type="text" name="botcheck" value={botcheck} onChange={(e) => setBotcheck(e.target.value)} className="hidden" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

              {formStatus === "success" ? renderSuccess() : formStatus === "error" ? renderError() : (
                <div className="space-y-4">
                  {/* Errors */}
                  {validationErrors.length > 0 && (
                    <div className="bg-red-50 border border-red-200 text-red-800 rounded-md mb-3 p-3">
                      <p className="font-semibold mb-1 text-xs">Please fix the following:</p>
                      <ul className="list-disc list-inside space-y-0.5 text-xs">{validationErrors.map((err, i) => <li key={i}>{err}</li>)}</ul>
                    </div>
                  )}

                  {/* Identity Block */}
                  <div className="grid md:grid-cols-2 gap-3">
                    <Field label="First Name" required><input type="text" value={formData.firstName} onChange={(e) => update("firstName", e.target.value)} className={inputClass} placeholder="John" /></Field>
                    <Field label="Last Name" required><input type="text" value={formData.lastName} onChange={(e) => update("lastName", e.target.value)} className={inputClass} placeholder="Doe" /></Field>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <Field label="Email" required><input type="email" value={formData.email} onChange={(e) => update("email", e.target.value)} className={inputClass} placeholder="john@example.com" /></Field>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <Field label="Country" required><input type="text" value={formData.country} onChange={(e) => update("country", e.target.value)} className={inputClass} placeholder="Ecuador" /></Field>
                    <Field label="Last U.S. State" required><input type="text" value={formData.lastState} onChange={(e) => update("lastState", e.target.value)} className={inputClass} placeholder="California" /></Field>
                  </div>
                  <Field label="Citizenship Status" required>
                    <RadioPills name="citizenStatus" value={formData.citizenStatus} onChange={(v) => update("citizenStatus", v)} options={[
                      { label: "U.S. citizen", value: "U.S. citizen" },
                      { label: "Green Card", value: "Green Card holder" },
                      { label: "No", value: "No" },
                      { label: "Not sure", value: "Not sure" },
                    ]} />
                  </Field>

                  {/* Services */}
                  <Field label="Services" required>
                    <div className="flex flex-wrap gap-2">
                      {SERVICE_OPTIONS.map((opt) => (
                        <button key={opt.value} type="button" onClick={() => toggleService(opt.value)} className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-all ${svcs.includes(opt.value) ? "border-accent bg-accent text-white" : "border-muted bg-background text-muted-foreground hover:border-accent/50 hover:text-foreground"}`}>
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </Field>

                  {/* Branches */}
                  {hasBranchable && (
                    <div className="border-t border-muted pt-3 space-y-3">
                      {svcs.includes("Annual tax return") && (
                        <div className="grid md:grid-cols-2 gap-3">
                          <Field label="Tax Year" required><RadioPills name="taxYear" value={formData.taxYear} onChange={(v) => update("taxYear", v)} options={[{ label: "2025", value: "2025" }, { label: "2024", value: "2024" }, { label: "Multiple", value: "Multiple years" }]} /></Field>
                          <Field label="Income Source" required><RadioPills name="primaryIncome" value={formData.primaryIncome} onChange={(v) => update("primaryIncome", v)} options={[{ label: "W-2", value: "W-2 employment" }, { label: "1099", value: "Self-employment" }, { label: "Pension", value: "Pension/Social Security" }, { label: "Investments", value: "Investment income" }, { label: "Multiple", value: "Multiple sources" }]} /></Field>
                          <Field label="Over $130k?" required><RadioPills name="over130k" value={formData.over130k} onChange={(v) => update("over130k", v)} options={[{ label: "Yes", value: "Yes" }, { label: "No", value: "No" }, { label: "Close", value: "Close" }]} /></Field>
                          <Field label="Filing Jointly?" required><RadioPills name="filingJointly" value={formData.filingJointly} onChange={(v) => update("filingJointly", v)} options={[{ label: "Yes", value: "Yes" }, { label: "No", value: "No" }]} /></Field>
                        </div>
                      )}
                      {svcs.includes("FBAR") && (
                        <div className="grid md:grid-cols-2 gap-3">
                          <Field label="Accounts >$10k?" required><RadioPills name="fbarOver10k" value={formData.fbarOver10k} onChange={(v) => update("fbarOver10k", v)} options={[{ label: "Yes", value: "Yes" }, { label: "No", value: "No" }, { label: "Not sure", value: "Not sure" }]} /></Field>
                          <Field label="Account Count" required><RadioPills name="fbarAccountCount" value={formData.fbarAccountCount} onChange={(v) => update("fbarAccountCount", v)} options={[{ label: "1-2", value: "1-2" }, { label: "3-5", value: "3-5" }, { label: "6+", value: "6+" }, { label: "Not sure", value: "Not sure" }]} /></Field>
                          <Field label="Countries" required><input type="text" value={formData.fbarCountries} onChange={(e) => update("fbarCountries", e.target.value)} className={inputClass} placeholder="Ecuador, Colombia, etc." /></Field>
                        </div>
                      )}
                      {svcs.includes("Back-filing") && (
                        <div className="grid md:grid-cols-2 gap-3">
                          <Field label="Years Since Filed" required><RadioPills name="yearsSinceLastFiled" value={formData.yearsSinceLastFiled} onChange={(v) => update("yearsSinceLastFiled", v)} options={[{ label: "1-2", value: "1-2 years" }, { label: "3-5", value: "3-5 years" }, { label: "6+", value: "6+ years" }, { label: "Never", value: "Never filed from abroad" }]} /></Field>
                          <Field label="Know Streamlined?" required><RadioPills name="streamlinedAware" value={formData.streamlinedAware} onChange={(v) => update("streamlinedAware", v)} options={[{ label: "Yes", value: "Yes" }, { label: "No", value: "No" }, { label: "What's that?", value: "What's that?" }]} /></Field>
                          <Field label="IRS Notices?" required><RadioPills name="irsNotices" value={formData.irsNotices} onChange={(v) => update("irsNotices", v)} options={[{ label: "No", value: "No" }, { label: "Yes", value: "Yes" }, { label: "Not sure", value: "Not sure" }]} /></Field>
                        </div>
                      )}
                      {svcs.includes("Amended return") && (
                        <div className="grid md:grid-cols-2 gap-3">
                          <Field label="Amended Year" required><input type="text" value={formData.amendedYear} onChange={(e) => update("amendedYear", e.target.value)} className={inputClass} placeholder="2024" /></Field>
                          <Field label="Correction"><input type="text" value={formData.amendedCorrection} onChange={(e) => update("amendedCorrection", e.target.value)} className={inputClass} placeholder="What needs changing..." /></Field>
                        </div>
                      )}
                      {svcs.includes("FEIE") && (
                        <div className="grid md:grid-cols-2 gap-3">
                          <Field label="330+ days abroad?" required><RadioPills name="feie330Days" value={formData.feie330Days} onChange={(v) => update("feie330Days", v)} options={[{ label: "Yes", value: "Yes" }, { label: "No", value: "No" }, { label: "Close", value: "Close" }, { label: "Not sure", value: "Not sure" }]} /></Field>
                          <Field label="Permanent Residence?" required><RadioPills name="feiePermanentResidence" value={formData.feiePermanentResidence} onChange={(v) => update("feiePermanentResidence", v)} options={[{ label: "Yes", value: "Yes" }, { label: "No", value: "No" }, { label: "Not sure", value: "Not sure" }]} /></Field>
                        </div>
                      )}
                      {svcs.includes("State tax") && (
                        <div className="grid md:grid-cols-2 gap-3">
                          <Field label="Which State" required><input type="text" value={formData.stateWhich} onChange={(e) => update("stateWhich", e.target.value)} className={inputClass} placeholder="California" /></Field>
                          <Field label="Ties to State?" required><RadioPills name="stateTies" value={formData.stateTies} onChange={(v) => update("stateTies", v)} options={[{ label: "Property", value: "Property" }, { label: "Voting", value: "Voting" }, { label: "Family", value: "Family" }, { label: "None", value: "None" }, { label: "Other", value: "Other" }]} /></Field>
                        </div>
                      )}
                      {svcs.includes("Not sure") && (
                        <Field label="Describe Your Situation" required>
                          <input type="text" value={formData.notSureSituation} onChange={(e) => update("notSureSituation", e.target.value)} className={inputClass} placeholder="Brief description..." />
                        </Field>
                      )}
                    </div>
                  )}

                  {/* Final Block */}
                  <div className="border-t border-muted pt-3 space-y-3">
                    <div className="grid md:grid-cols-2 gap-3">
                      <Field label="Filing For" required><RadioPills name="filingFor" value={formData.filingFor} onChange={(v) => update("filingFor", v)} options={[{ label: "Just me", value: "Just myself" }, { label: "Spouse too", value: "Myself and spouse" }]} /></Field>
                      <Field label="Deadline" required><RadioPills name="deadline" value={formData.deadline} onChange={(v) => update("deadline", v)} options={[{ label: "April 15", value: "Before April 15" }, { label: "June 15", value: "Before June 15" }, { label: "Oct 15", value: "Before October 15" }, { label: "No rush", value: "No rush" }]} /></Field>
                    </div>
                    <Field label="Previous Preparer"><RadioPills name="previousPreparer" value={formData.previousPreparer} onChange={(v) => update("previousPreparer", v)} options={[{ label: "First time", value: "First time" }, { label: "Looking for new", value: "Looking for someone new" }, { label: "Previous was wrong", value: "Previous didn't handle expat correctly" }]} /></Field>
                    <Field label="Anything Complicated?"><input type="text" value={formData.anythingComplicated} onChange={(e) => update("anythingComplicated", e.target.value)} className={inputClass} placeholder="Crypto, foreign business, rentals, inheritance..." /></Field>
                    {!activeReferralPartner && (
                      <Field label="How did you hear about us?">
                        <RadioPills name="referralSource" value={formData.referralSource} onChange={(v) => { update("referralSource", v); if (v !== "Other") update("referralSourceOther", ""); }} options={[
                          { label: "CuencaExpat", value: "CuencaExpat.com" },
                          { label: "Social media", value: "Social media video" },
                          { label: "Facebook group", value: "Facebook group" },
                          { label: "Referral", value: "Referral" },
                          { label: "Blog", value: "Blog post" },
                          { label: "Other", value: "Other" },
                        ]} />
                        {formData.referralSource === "Other" && <input type="text" value={formData.referralSourceOther} onChange={(e) => update("referralSourceOther", e.target.value)} className={`${inputClass} mt-2`} placeholder="Please specify..." />}
                      </Field>
                    )}
                  </div>

                  {/* Privacy & Submit */}
                  <div className="border-t border-muted pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <label className="flex items-center gap-2 cursor-pointer text-xs text-muted-foreground">
                      <input type="checkbox" checked={privacyConsent} onChange={(e) => setPrivacyConsent(e.target.checked)} className="rounded border-muted text-accent focus:ring-accent" />
                      I agree to the intake privacy terms
                    </label>
                    <button type="button" onClick={handleSubmit} disabled={formStatus === "sending"} className="inline-flex items-center gap-2 bg-accent hover:opacity-90 text-white rounded-lg font-semibold text-sm transition-opacity disabled:opacity-50 disabled:cursor-not-allowed px-5 py-2.5">
                      {formStatus === "sending" ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Sending...</> : <><Send className="w-4 h-4" />Submit Intake</>}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {formStatus !== "success" && formStatus !== "error" && (
              <p className="text-xs text-muted-foreground text-center mt-4 max-w-lg mx-auto">{copy.privacy}</p>
            )}
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
