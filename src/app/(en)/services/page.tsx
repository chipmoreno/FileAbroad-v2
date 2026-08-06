import { Metadata } from 'next';
import Link from 'next/link';
import PageShell from '@/components/layout/PageShell';
import PageHero from '@/components/layout/PageHero';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import CTASection from '@/components/layout/CTASection';
import { Card, CardContent } from '@/components/ui/card';
import {
  FileText,
  Globe,
  Building2,
  Calculator,
  ClipboardCheck,
  Users,
  ShieldCheck,
  ArrowRight,
} from '@/components/icons';
import { generateHreflang } from '@/lib/i18n/utils';
import ServiceDecisionTable from '@/components/services/ServiceDecisionTable';

export const metadata: Metadata = {
  title: 'Expat Tax Services',
  description:
    'U.S. federal filing support for Americans abroad, including individual returns, FBAR, FATCA, Foreign Tax Credit work, and qualifying Streamlined cases.',
  alternates: {
    canonical: 'https://fileabroad.com/services',
    languages: generateHreflang('/services'),
  },
  openGraph: {
    title: 'Expat Tax Services',
    description:
      'Review the filing paths and reporting services that FileAbroad accepts, with scope confirmed before preparation begins.',
    url: 'https://fileabroad.com/services',
  },
};

const mainServices = [
  {
    icon: FileText,
    title: 'Individual Tax Returns',
    slug: '/services/expat-tax-filing',
    description:
      'Federal return preparation with accepted foreign income reporting, credit, and exclusion forms defined in a written scope.',
    features: [
      'Form 1040 preparation',
      'Foreign Earned Income Exclusion (Form 2555)',
      'Foreign Tax Credit (Form 1116)',
      'Schedule C for self-employed expats',
    ],
  },
  {
    icon: Globe,
    title: 'FBAR Filing',
    slug: '/services/fbar-filing',
    description:
      'Report your foreign bank accounts with FinCEN Form 114. Required if your foreign accounts exceed $10,000 at any point during the year.',
    features: [
      'FinCEN Form 114 preparation',
      'Account aggregation calculation',
      'Multi-year catch-up filing',
      'Compliance review',
    ],
  },
  {
    icon: Building2,
    title: 'FATCA Compliance',
    slug: '/services/fatca-compliance',
    description:
      'Form 8938 preparation when filing status, residency, and specified foreign financial assets create a reporting requirement.',
    features: [
      'Form 8938 preparation',
      'Asset valuation guidance',
      'Threshold determination',
      'Coordination with FBAR',
    ],
  },
  {
    icon: ShieldCheck,
    title: 'Streamlined Filing Procedures',
    slug: '/services/streamlined-filing',
    description:
      'FileAbroad prepares qualifying Streamlined Foreign Offshore cases after a focused consultation and written scope review.',
    features: [
      'Return and FBAR periods required by current instructions',
      'Accepted information returns in the written scope',
      'Factual Form 14653 preparation support',
      'Submission-ready federal package',
    ],
  },
];

const additionalServices = [
  {
    icon: Calculator,
    title: 'Foreign Tax Credit Planning',
    description:
      'Form 1116 preparation and analysis of applicable foreign tax credits and carryovers within an accepted scope.',
  },
  {
    icon: ClipboardCheck,
    title: 'FEIE Planning',
    description:
      'Compare the expected FEIE and Foreign Tax Credit treatment when both approaches are available.',
  },
  {
    icon: Users,
    title: 'State Tax Guidance',
    description:
      'Review state-residency questions separately from your federal return. Moving abroad does not, by itself, end a state filing obligation.',
  },
];

export default function ServicesPage() {
  return (
    <PageShell>
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <Breadcrumbs items={[{ label: 'Services', href: '/services' }]} />
      </div>
      <PageHero
        label="Services"
        title="Expat Tax Services"
        description="Based in Cuenca, Ecuador and serving clients internationally, FileAbroad provides personal guidance for Americans managing U.S. tax obligations while living abroad."
      />

      <ServiceDecisionTable />

      {/* Main Services */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {mainServices.map((service) => (
            <Card
              key={service.title}
              className="p-8 hover:border-secondary/30 hover:shadow-xl transition-all duration-300"
            >
              <CardContent className="p-0">
                <div className="w-14 h-14 rounded-lg bg-primary flex items-center justify-center mb-5">
                  <service.icon className="w-7 h-7 text-primary-foreground" />
                </div>

                <h2 className="text-2xl font-bold mb-3 font-sans text-foreground">
                  {service.title}
                </h2>

                <p className="text-base leading-relaxed mb-6 text-muted-foreground">
                  {service.description}
                </p>

                <ul className="space-y-2 mb-6">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-secondary">&#10003;</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                {service.slug && (
                  <Link
                    href={service.slug}
                    className="inline-flex items-center gap-2 font-semibold text-secondary hover:gap-3 transition-all"
                  >
                    Learn more <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Additional Services */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center font-sans text-foreground">
          Additional Services
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {additionalServices.map((service) => (
            <Card key={service.title} className="p-6">
              <CardContent className="p-0">
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4">
                  <service.icon className="w-6 h-6 text-foreground" />
                </div>

                <h3 className="text-xl font-bold mb-2 font-sans text-foreground">
                  {service.title}
                </h3>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <CTASection
        title="Not Sure What You Need?"
        description="Book a consultation and I will point you to the right next step."
        buttonText="Book a consultation"
        buttonHref="/consultation"
      />
    </PageShell>
  );
}
