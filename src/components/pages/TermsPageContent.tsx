import { SiteDictionary } from "@/lib/i18n/types";

interface Props {
  dict: SiteDictionary;
}

export default function TermsPageContent({ dict }: Props) {
  const d = dict.terms;

  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-2 font-sans text-foreground">
        {d.heroTitle}
      </h1>
      <p className="text-sm text-muted-foreground mb-10">
        {d.lastUpdated}
      </p>

      <div className="prose prose-lg max-w-none space-y-8 text-muted-foreground">
        <div>
          <h2 className="text-2xl font-bold font-sans text-foreground mb-3">
            {d.sectionAgreement}
          </h2>
          <p>{d.sectionAgreementContent}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold font-sans text-foreground mb-3">
            {d.sectionServices}
          </h2>
          <p>{d.sectionServicesContent}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold font-sans text-foreground mb-3">
            {d.sectionDisclaimers}
          </h2>
          <p className="mb-3">{d.sectionDisclaimersContent}</p>
          <ul className="list-disc pl-6 space-y-2">
            {d.sectionDisclaimersItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold font-sans text-foreground mb-3">
            {d.sectionPayment}
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            {d.sectionPaymentItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold font-sans text-foreground mb-3">
            {d.sectionConsultations}
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            {d.sectionConsultationsItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-bold font-sans text-foreground mb-3">
            {d.sectionAnnualPlan}
          </h2>
          <p>{d.sectionAnnualPlanContent}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold font-sans text-foreground mb-3">
            {d.sectionLiability}
          </h2>
          <p>{d.sectionLiabilityContent}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold font-sans text-foreground mb-3">
            {d.sectionIp}
          </h2>
          <p>{d.sectionIpContent}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold font-sans text-foreground mb-3">
            {d.sectionGoverningLaw}
          </h2>
          <p>{d.sectionGoverningLawContent}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold font-sans text-foreground mb-3">
            {d.sectionChanges}
          </h2>
          <p>{d.sectionChangesContent}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold font-sans text-foreground mb-3">
            {d.sectionContact}
          </h2>
          <p>{d.sectionContactContent}</p>
        </div>
      </div>
    </section>
  );
}
