"use client";

import PageHero from "@/components/layout/PageHero";
import { SiteDictionary } from "@/lib/i18n/types";

interface Props {
  dict: SiteDictionary;
}

export default function PrivacyPageContent({ dict }: Props) {
  const d = dict.privacy;

  return (
    <>
      <PageHero
        label={d.heroLabel}
        title={d.heroTitle}
        description={d.heroDescription}
      />

      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="prose prose-lg max-w-none text-muted-foreground space-y-8">
          <div>
            <h2 className="text-2xl font-bold font-sans text-foreground mb-3">
              {d.sectionWhoWeAre}
            </h2>
            <p>{d.sectionWhoWeAreContent}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold font-sans text-foreground mb-3">
              {d.sectionInfoCollect}
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              {d.sectionInfoCollectItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 not-prose">
            <h2 className="text-xl font-bold text-amber-900 mb-2">
              {d.sectionDocumentsWarning}
            </h2>
            <p className="text-amber-800">{d.sectionDocumentsWarningContent}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold font-sans text-foreground mb-3">
              {d.sectionHowUse}
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              {d.sectionHowUseItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold font-sans text-foreground mb-3">
              {d.sectionProviders}
            </h2>
            <p>{d.sectionProvidersContent}</p>
            <ul className="list-disc pl-6 space-y-2 mt-3">
              {d.sectionProvidersList.map(([name, purpose]) => (
                <li key={name}>
                  <strong className="text-foreground">{name}</strong> — {purpose}.
                </li>
              ))}
            </ul>
            <p className="mt-3">{d.sectionProvidersTax}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold font-sans text-foreground mb-3">
              {d.sectionAi}
            </h2>
            <p>{d.sectionAiContent}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold font-sans text-foreground mb-3">
              {d.sectionAnalytics}
            </h2>
            <p>{d.sectionAnalyticsContent}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold font-sans text-foreground mb-3">
              {d.sectionRetention}
            </h2>
            <p>{d.sectionRetentionContent}</p>
          </div>

          <div>
            <h2 className="text-2xl font-bold font-sans text-foreground mb-3">
              {d.sectionChoices}
            </h2>
            <p>{d.sectionChoicesContent}</p>
          </div>
        </div>
      </section>
    </>
  );
}
