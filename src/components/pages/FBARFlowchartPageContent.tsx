'use client';

import CTASection from "@/components/layout/CTASection";
import LeadMagnetSignup from "@/components/forms/LeadMagnetSignup";
import { Badge } from "@/components/ui/badge";
import { FileText, Shield, CheckCircle2, Download, Users, Clock } from "@/components/icons";

const includedItems = [
  "Simple yes/no decision tree to determine if you must file FBAR",
  "Clear $10,000 aggregate threshold explanation with examples",
  "Joint account, signature authority, and business account rules",
  "FBAR vs. Form 8938 (FATCA) comparison chart",
  "Penalty overview: non-willful vs. willful exposure",
  "Deadlines and e-filing instructions (FinCEN 114)",
  "What to do if you have never filed before",
];

const trustSignals = [
  { icon: Users, label: "Used by 1,200+ expats" },
  { icon: Shield, label: "IRS-compliant guidance" },
  { icon: Clock, label: "5-minute read" },
];

export default function FBARFlowchartPageContent() {
  return (
    <>
      <div className="mx-auto max-w-4xl px-6 py-12">
        <header className="mb-10 border-b border-border pb-10">
          <Badge className="mb-4 border-0 bg-surface-elevated text-secondary">
            Free PDF Download
          </Badge>
          <h1 className="font-sans text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
            FBAR Requirement Flowchart
          </h1>
          <p className="mt-5 max-w-3xl text-xl text-muted-foreground">
            Visual decision tree to determine if you need to file FBAR (FinCEN 114).
            Download the free PDF and know your obligation in under 5 minutes.
          </p>
        </header>

        {/* Top email gate */}
        <LeadMagnetSignup
          title="Download the FBAR Flowchart PDF"
          description="Enter your email and we'll send you the printable flowchart plus filing instructions."
          tagId={process.env.KIT_LEAD_MAGNET_TAG_ID}
        />

        {/* What's included */}
        <div className="mt-12">
          <h2 className="mb-6 flex items-center gap-3 font-sans text-2xl font-bold text-foreground">
            <FileText className="h-6 w-6 text-secondary" />
            What’s Inside
          </h2>
          <div className="space-y-3">
            {includedItems.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border border-border bg-white p-4"
              >
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                <p className="text-foreground">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust signals */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {trustSignals.map((signal, i) => (
            <div key={i} className="flex items-center gap-3 rounded-lg border border-border bg-background p-4">
              <signal.icon className="h-5 w-5 text-secondary" />
              <span className="text-sm font-medium text-foreground">{signal.label}</span>
            </div>
          ))}
        </div>

        {/* Mid-page gate */}
        <div className="mt-12 rounded-xl border border-secondary/30 bg-background p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <Download className="h-6 w-6 text-secondary" />
            <h3 className="font-sans text-xl font-bold text-foreground">Get the Flowchart Now</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Join expats who use this flowchart to stay compliant. No spam. Unsubscribe anytime.
          </p>
          <LeadMagnetSignup
            title=""
            description=""
            compact
            tagId={process.env.KIT_LEAD_MAGNET_TAG_ID}
          />
        </div>

        {/* FAQ */}
        <section className="mt-12">
          <h2 className="font-sans text-2xl font-bold text-foreground mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: 'What is FBAR and who must file it?',
                a: 'FBAR (FinCEN Report 114) is required if you have a financial interest in or signature authority over foreign accounts with an aggregate value exceeding $10,000 at any time during the calendar year.',
              },
              {
                q: 'Does owning one foreign account trigger FBAR?',
                a: 'It depends on the balance. If your single foreign account ever held more than $10,000 during the year, you must file. The threshold is aggregate across all foreign accounts.',
              },
              {
                q: 'What is the difference between FBAR and Form 8938?',
                a: 'FBAR is filed with FinCEN (Treasury) and has a $10,000 threshold. Form 8938 is filed with the IRS (FATCA) and has higher thresholds ($200,000 year-end for single expats). You may need both.',
              },
              {
                q: 'What if I have never filed FBAR before?',
                a: 'If your failure was non-willful, you may qualify for the Streamlined Filing Compliance Procedures or a delinquent FBAR submission. The flowchart includes a recommended next step for non-filers.',
              },
              {
                q: 'Is this flowchart legally binding advice?',
                a: 'No. The flowchart is educational and based on publicly available FinCEN and IRS guidance. For your specific situation, consult a qualified tax professional.',
              },
            ].map((faq, i) => (
              <div key={i} className="rounded-lg border border-border bg-white p-5">
                <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      <CTASection
        title="Still Unsure About Your FBAR Obligation?"
        description="Chip can review your foreign account facts and tell you exactly what needs to be filed. Start the 3-minute intake."
        buttonText="Get Started"
        buttonHref="/intake"
      />
    </>
  );
}
