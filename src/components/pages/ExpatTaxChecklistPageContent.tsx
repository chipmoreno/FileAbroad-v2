"use client";

import CTASection from "@/components/layout/CTASection";
import LeadMagnetSignup from "@/components/forms/LeadMagnetSignup";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, FileText, Printer } from "@/components/icons";
import type { Locale } from "@/lib/i18n/config";
import { localizePath } from "@/lib/i18n/utils";
import { localizedResourceCopy } from "@/lib/i18n/localized-resource-copy";

const sections = [
  {
    title: "Before You Leave the U.S.",
    items: [
      'File a final state tax return marking it as "final" for your departure year.',
      "Surrender your state driver's license or update it to a no-tax state if possible.",
      "Change voter registration to your new location or unregister from your former state.",
      "Close or re-register bank accounts to eliminate state tax nexus.",
      "Update your mailing address with the USPS, IRS (Form 8822), and all financial institutions.",
      "Cancel club memberships, gym memberships, and recurring local subscriptions.",
      "Document the sale or lease of your U.S. home with dates and contracts.",
      "Request a certificate of coverage if a Totalization Agreement applies to your employment.",
      "Consult a tax preparer about FEIE vs. FTC strategy for your destination country.",
    ],
  },
  {
    title: "First 90 Days Abroad",
    items: [
      "Obtain your foreign residence permit, visa stamp, or cédula and keep copies.",
      "Open local bank accounts—and immediately add them to your FBAR tracking list.",
      "Register with the local tax authority if required (e.g., SRI in Ecuador, SAT in Mexico).",
      "Begin tracking every day in and out of the U.S. for the Physical Presence Test.",
      "Set up a travel log spreadsheet with dates, destinations, and transit details.",
      "Notify your U.S. employer or clients of your foreign address for 1099/W-2 delivery.",
      "Confirm your foreign health insurance meets local requirements and understand U.S. deduction rules.",
      "Review whether your foreign pension or investment accounts trigger FATCA/FBAR reporting.",
    ],
  },
  {
    title: "Ongoing Annual Obligations",
    items: [
      "File U.S. federal tax return by June 15 (automatic 2-month extension for taxpayers abroad).",
      "Request an additional extension to October 15 via Form 4868 if needed.",
      "File FBAR (FinCEN 114) by April 15 (automatic extension to October 15).",
      "Report foreign financial assets on Form 8938 if you meet the threshold ($200K+ for single expats).",
      "Claim the FEIE on Form 2555 if you qualify, or the Foreign Tax Credit on Form 1116.",
      "Make quarterly estimated tax payments if you are self-employed or have non-wage income.",
      "Update your FBAR tracking spreadsheet with year-end maximum balances for all foreign accounts.",
      "Review any changes in foreign tax laws, treaty updates, or IRS guidance that affect your filing.",
    ],
  },
  {
    title: "If You Are Behind on Filings",
    items: [
      "Gather your last filed U.S. tax return and all foreign income documents.",
      "List all foreign bank accounts and their maximum balances for each unfiled year.",
      "Determine whether the Streamlined Foreign Offshore Procedures fit your situation.",
      "Review whether your failure to file was non-willful (honest mistake vs. intentional avoidance).",
      "Consult a preparer before contacting the IRS—know your options before you act.",
      "Do NOT file current-year returns only; address prior years through the appropriate program.",
    ],
  },
];

const bonusItems = [
  "Ecuador-specific addendum: IESS registration, SRI enrollment, and cooperativa FBAR rules.",
  "FEIE 330-day tracking calendar (printable monthly grid).",
  "State tax termination template letter for California, Virginia, and New York.",
  "FBAR account aggregation worksheet (Excel/Google Sheets).",
  "2026 deadline calendar with all expat-specific dates highlighted.",
];

export default function ExpatTaxChecklistPageContent({ locale = "en" }: { locale?: Locale }) {
  const copy = localizedResourceCopy[locale];
  return (
    <>
      <div className="mx-auto max-w-4xl px-6 py-12">
        <header className="mb-10 border-b border-border pb-10">
          <Badge className="mb-4 border-0 bg-surface-elevated text-secondary">
            {copy.badge}
          </Badge>
          <h1 className="font-sans text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
            {copy.title}
          </h1>
          <p className="mt-5 max-w-3xl text-xl text-muted-foreground">
            {copy.description}
          </p>
        </header>

        {/* Lead Magnet CTA — top */}
        <LeadMagnetSignup
          title={copy.leadTitle}
          description={copy.leadDescription}
          tagId={process.env.KIT_LEAD_MAGNET_TAG_ID}
        />

        {/* Checklist content */}
        <div className="mt-12 space-y-12">
          {sections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-6 flex items-center gap-3 font-sans text-2xl font-bold text-foreground">
                <FileText className="h-6 w-6 text-secondary" />
                {section.title}
              </h2>
              <div className="space-y-3">
                {section.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-lg border border-border bg-white p-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-secondary" />
                    <p className="text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Bonus section (gated teaser) */}
        <Card className="mt-12 border-secondary/30 bg-background">
          <CardContent className="p-6 md:p-8">
            <h2 className="mb-4 flex items-center gap-3 font-sans text-2xl font-bold text-foreground">
              <Printer className="h-6 w-6 text-secondary" />
              {copy.bonusTitle}
            </h2>
            <p className="mb-5 text-muted-foreground">
              The printable PDF includes these additional resources not shown on
              this web page:
            </p>
            <div className="space-y-3">
              {bonusItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-lg border border-dashed border-secondary/30 bg-white p-4"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-elevated text-xs font-bold text-secondary">
                    {i + 1}
                  </span>
                  <p className="text-foreground">{item}</p>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <LeadMagnetSignup
                title="Send Me the Full PDF"
                description="Enter your email and we'll deliver the printable checklist with all bonus items."
                compact
                tagId={process.env.KIT_LEAD_MAGNET_TAG_ID}
              />
            </div>
          </CardContent>
        </Card>

        {/* Print hint */}
        <aside className="mt-10 rounded-lg border border-border bg-muted/30 p-5 text-center text-sm text-muted-foreground">
          <p>
            Prefer to print this page directly? Use your browser&apos;s print function
            (Ctrl+P / Cmd+P). For the best layout, use the PDF version above.
          </p>
        </aside>
      </div>

      {/* FAQ Section */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <h2 className="font-sans text-2xl font-bold text-foreground mb-8">{copy.faqTitle}</h2>
        <div className="space-y-4">
          {[
            {
              q: 'What is included in the Expat Tax Checklist PDF?',
              a: 'The PDF includes pre-move, mid-year, and post-move tax tasks, plus bonus items: an Ecuador-specific addendum, a 330-day FEIE tracking calendar, state termination template letters, an FBAR worksheet, and a 2026 deadline calendar.',
            },
            {
              q: 'Is the checklist really free?',
              a: 'Yes. Enter your email and we will send you a download link to the printable PDF. You will also receive occasional filing updates; you can unsubscribe anytime.',
            },
            {
              q: 'Does the checklist replace a tax preparer?',
              a: 'No. The checklist is a planning and organization tool. Every expat situation is different, and a qualified tax professional should review your specific facts before filing.',
            },
            {
              q: 'Which countries does the checklist cover?',
              a: 'The checklist is designed for Americans living in any foreign country. It includes general rules plus an Ecuador-specific addendum. If you need guidance for another country, book a consultation.',
            },
          ].map((faq, i) => (
            <div key={i} className="rounded-lg border border-border bg-white p-5">
              <h3 className="font-semibold text-foreground mb-2">{faq.q}</h3>
              <p className="text-sm text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      <CTASection
        title={copy.ctaTitle}
        description={copy.ctaDescription}
        buttonText={copy.ctaButton}
        buttonHref={localizePath('/intake', locale)}
      />
    </>
  );
}
