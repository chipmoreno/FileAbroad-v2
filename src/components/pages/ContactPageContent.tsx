"use client";

import { useState } from "react";
import { Send, CheckCircle2, Mail } from "@/components/icons";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { trackConversionEvent } from "@/components/analytics/ConversionTracking";
import type { Locale } from "@/lib/i18n/config";

const WEB3FORMS_KEY = "8c93c84e-bab1-46bf-8500-06e7fd5c053c";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

type FormStatus = "" | "sending" | "success" | "error";

function Field({
  label,
  children,
  required,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
}) {
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

export default function ContactPageContent({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("");
  const [errorMessage, setErrorMessage] = useState("");
  const [botcheck, setBotcheck] = useState("");

  const inputClass =
    "w-full px-3 py-2 bg-background border border-muted rounded-md focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all text-foreground text-sm";

  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setErrorMessage("Please fill in all required fields.");
      setStatus("error");
      return;
    }
    if (!validateEmail(email)) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setErrorMessage("");
    setStatus("sending");

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `FileAbroad Contact: ${subject}`,
          from_name: name,
          email,
          replyto: email,
          message,
          _source: "fileabroad-contact",
          botcheck,
        }),
      });
      const result = (await response.json()) as {
        success?: boolean;
        message?: string;
      };
      if (response.ok && result.success) {
        setStatus("success");
        trackConversionEvent("contact_submit", { site: "fileabroad" });
      } else {
        setErrorMessage(
          result.message || "Message could not be sent. Please try again or email us directly."
        );
        setStatus("error");
      }
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1} className="pt-2 pb-8 bg-background">
        <section className="py-4 md:py-6">
          <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                Contact
              </p>
              <h1 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                Get in touch
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Questions about expat taxes? Send a message and we will reply within one business day.
              </p>
            </div>

            <input
              type="text"
              name="botcheck"
              value={botcheck}
              onChange={(e) => setBotcheck(e.target.value)}
              className="hidden"
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />

            {status === "success" ? (
              <div className="text-center py-10">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-7 h-7 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight text-foreground mb-3">
                  Message sent
                </h2>
                <p className="text-base text-muted-foreground max-w-md mx-auto mb-8">
                  Thanks for reaching out. We will get back to you within one business day.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {status === "error" && errorMessage && (
                  <div className="bg-red-50 border border-red-200 text-red-800 rounded-md p-3">
                    <p className="font-semibold text-xs mb-1">Error</p>
                    <p className="text-xs">{errorMessage}</p>
                  </div>
                )}

                <Field label="Name" required>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                    placeholder="Your name"
                  />
                </Field>

                <Field label="Email" required>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                    placeholder="you@example.com"
                  />
                </Field>

                <Field label="Subject" required>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className={inputClass}
                    placeholder="How can we help?"
                  />
                </Field>

                <Field label="Message" required>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`${inputClass} min-h-[120px] resize-y`}
                    placeholder="Tell us about your situation..."
                  />
                </Field>

                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <p className="text-xs text-muted-foreground">
                    Do not include SSNs, passport numbers, or tax documents in this message.
                  </p>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={status === "sending"}
                    className="inline-flex items-center gap-2 bg-accent hover:opacity-90 text-white rounded-lg font-semibold text-sm transition-opacity disabled:opacity-50 disabled:cursor-not-allowed px-5 py-2.5"
                  >
                    {status === "sending" ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </div>

                <div className="border-t border-muted pt-4 mt-4">
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4 text-accent" />
                    Prefer email?{" "}
                    <a
                      href="mailto:info@fileabroad.com"
                      className="text-accent hover:underline font-semibold"
                    >
                      info@fileabroad.com
                    </a>
                  </p>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </>
  );
}
