'use client';

import CTASection from "@/components/layout/CTASection";
import LeadMagnetSignup from "@/components/forms/LeadMagnetSignup";
import { Badge } from "@/components/ui/badge";
import { FileText, Shield, CheckCircle2, Download, Users, Clock } from "@/components/icons";

const includedItems = [
  "3-year federal return document list (1040, schedules, credits)",
  "6-year FBAR checklist with maximum balance tracking",
  "Foreign income documentation requirements by type",
  "Proof of non-willfulness statement template",
  "FBAR account aggregation worksheet",
  "FEIE qualification evidence (travel log, lease, employer letter)",
  "State tax termination documents checklist",
  "Streamlined program submission cover sheet template",
];

const trustSignals = [
  { icon: Users, label: "Trusted by 1,200+ expats" },
  { icon: Shield, label: "IRS Streamlined guidance" },
  { icon: Clock, label: "Saves 3+ hours of prep" },
];

export default function StreamlinedChecklistPageContent() {
  return (
    <>
      <div className="mx-auto max-w-4xl px-6 py-12">
        <header className="mb-10 border-b border-border pb-10">
          <Badge className="mb-4 border-0 bg-surface-elevated text-secondary">
            Free PDF Download
          </Badge>
          <h1 className="font-sans text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
            Streamlined Filing Document Checklist
          </h1>
          <p className="mt-5 max-w-3xl text-xl text-muted-foreground">
            The exact documents you need for Streamlined Foreign Offshore filing.
            Download the free checklist and stop guessing what to gather.
          </p>
        </header>

        {/* Top email gate */}
        <LeadMagnetSignup
          title="Download the Streamlined Checklist PDF"
          description="Enter your email and we'll send you the printable checklist with all document templates."
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
            <h3 className="font-sans text-xl font-bold text-foreground">Get the Checklist Now</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Stop guessing which documents you need. Download the exact list used for Streamlined Foreign Offshore submissions.
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
                q: 'What is Streamlined Foreign Offshore?',
                a: 'It is an IRS program for non-willful non-filers living abroad. You file 3 years of delinquent tax returns and 6 years of FBARs, and the IRS waives failure-to-file and failure-to-pay penalties.',
              },
              {
                q: 'Do I qualify for Streamlined?',
                a: 'You must certify that your failure to file was non-willful (an honest mistake, not intentional avoidance). You must also have lived outside the US for at least 330 days in one of the last 3 years or be a bona fide resident of another country.',
              },
              {
                q: 'Will I owe penalties under Streamlined?',
                a: 'The IRS generally waives failure-to-file and failure-to-pay penalties under Streamlined Foreign Offshore. However, you still owe any tax due plus interest. If you owe zero after credits and exclusions, there is typically no payment.',
              },
              {
                q: 'What documents do I need for the 3 years of returns?',
                a: 'You need income documents (W-2s, 1099s, foreign pay stubs), foreign tax documents, bank statements for FBAR maximum balances, proof of FEIE qualification, and a non-willfulness statement. The checklist covers every item.',
              },
              {
                q: 'Can I do Streamlined filing myself?',
                a: 'Some taxpayers do, but Streamlined returns often involve currency conversion, treaty positions, and FEIE calculations. Many expats hire a preparer to avoid errors that could disqualify the penalty waiver.',
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
        title="Ready to File Under Streamlined?"
        description="Chip has guided dozens of expats through Streamlined Foreign Offshore. Start the intake and get a clear plan for your catch-up filing."
        buttonText="Start the 3-Minute Intake"
        buttonHref="/intake"
      />
    </>
  );
}
