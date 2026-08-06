import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/webp'],
  },

  // Consolidate cannibalized content clusters. Existing backlinks keep working
  // via 301 redirects; link equity flows to the canonical page.
  async redirects() {
    return [
      // Pricing is intentionally not a public acquisition page. Preserve old
      // links while moving visitors into the consultation-first funnel.
      {
        source: '/pricing',
        destination: '/consultation',
        permanent: true,
      },
      {
        source: '/consultations',
        destination: '/consultation',
        permanent: true,
      },
      ...['es', 'pt', 'fr', 'de', 'it', 'nl', 'ja', 'zh'].flatMap((lang) => [
        {
          source: `/${lang}/pricing`,
          destination: `/${lang}/consultation`,
          permanent: true,
        },
        {
          source: `/${lang}/consultations`,
          destination: `/${lang}/consultation`,
          permanent: true,
        },
      ]),
      // Ecuador territorial/pension — canonical: retiring-to-ecuador-tax-benefits
      {
        source: '/blog/ecuador-foreign-pension-tax-guide',
        destination: '/blog/retiring-to-ecuador-tax-benefits',
        permanent: true,
      },
      {
        source: '/blog/ecuador-territorial-tax-system-americans',
        destination: '/blog/retiring-to-ecuador-tax-benefits',
        permanent: true,
      },
      {
        source: '/topics/ecuador-tax-on-foreign-pensions-for-residents',
        destination: '/blog/retiring-to-ecuador-tax-benefits',
        permanent: true,
      },
      {
        source: '/topics/are-foreign-pensions-taxed-in-ecuador',
        destination: '/blog/retiring-to-ecuador-tax-benefits',
        permanent: true,
      },
      // Ecuador FBAR — canonical: fbar-ecuador-cds-property-sales (superset)
      {
        source: '/blog/fbar-ecuador-banks-pichincha-austro',
        destination: '/blog/fbar-ecuador-cds-property-sales',
        permanent: true,
      },
      // FBAR catch-up thin post — canonical: /services/streamlined-filing
      {
        source: '/blog/havent-filed-us-taxes-abroad',
        destination: '/services/streamlined-filing',
        permanent: true,
      },
      // FBAR "amnesty" — merged into the reasonable-cause post
      {
        source: '/blog/fbar-amnesty-program',
        destination: '/blog/fbar-late-filing-reasonable-cause',
        permanent: true,
      },
      // Original strategy targets with equivalent canonical pages.
      {
        source: '/guides/foreign-pensions-us-tax',
        destination: '/guides/foreign-pensions-guide',
        permanent: true,
      },
      {
        source: '/blog/pfic-what-is-simple-explanation',
        destination: '/blog/what-is-a-pfic-expats',
        permanent: true,
      },
      {
        source: '/blog/pfic-form-8621-filing',
        destination: '/forms/8621-pfic',
        permanent: true,
      },
      {
        source: '/blog/form-3520-foreign-gifts-reporting',
        destination: '/forms/3520-foreign-gifts',
        permanent: true,
      },
      {
        source: '/blog/form-5471-foreign-corporation',
        destination: '/forms/5471-foreign-corporation',
        permanent: true,
      },
      {
        source: '/blog/gilti-tax-small-business-owners',
        destination: '/guides/cfc-guide',
        permanent: true,
      },
      {
        source: '/blog/exit-tax-renouncing-citizenship',
        destination: '/blog/renouncing-us-citizenship-tax-consequences',
        permanent: true,
      },
      {
        source: '/blog/form-8854-expatriation-guide',
        destination: '/forms/8854-expatriation',
        permanent: true,
      },
      {
        source: '/blog/covered-expatriate-definition',
        destination: '/guides/exit-tax-guide',
        permanent: true,
      },
      {
        source: '/blog/fbar-signature-authority-business',
        destination: '/blog/fbar-signature-authority-business-accounts',
        permanent: true,
      },
      {
        source: '/blog/fbar-penalties-bittner-case',
        destination: '/blog/fbar-penalties-bittner-case-explained',
        permanent: true,
      },
      {
        source: '/blog/fbar-cryptocurrency-exchanges',
        destination: '/blog/fbar-cryptocurrency-foreign-exchanges',
        permanent: true,
      },
      {
        source: '/blog/streamlined-foreign-offshore-eligibility',
        destination: '/guides/streamlined-filing-guide',
        permanent: true,
      },
      {
        source: '/blog/streamlined-non-willful-statement',
        destination: '/forms/14653-streamlined',
        permanent: true,
      },
      {
        source: '/blog/streamlined-document-checklist',
        destination: '/guides/streamlined-filing-guide',
        permanent: true,
      },
      {
        source: '/blog/years-unfiled-how-many-back',
        destination: '/guides/streamlined-filing-guide',
        permanent: true,
      },
      {
        source: '/blog/state-tax-obligations-california-expats',
        destination: '/blog/state-tax-obligations-americans-abroad',
        permanent: true,
      },
      {
        source: '/blog/how-to-terminate-california-residency',
        destination: '/blog/how-to-terminate-state-residency',
        permanent: true,
      },
      {
        source: '/blog/social-security-abroad-taxation',
        destination: '/guides/retirement-abroad-tax-guide',
        permanent: true,
      },
      {
        source: '/blog/medicare-abroad-options',
        destination: '/guides/retirement-abroad-tax-guide',
        permanent: true,
      },
      {
        source: '/blog/ira-rmd-abroad',
        destination: '/guides/retirement-abroad-tax-guide',
        permanent: true,
      },
      {
        source: '/blog/uk-sipp-us-tax-reporting',
        destination: '/blog/uk-sipp-us-taxpayers-guide',
        permanent: true,
      },
      {
        source: '/blog/canadian-rrsp-us-tax-deferral',
        destination: '/blog/canadian-rrsp-tfsa-us-taxpayers',
        permanent: true,
      },
      {
        source: '/blog/australian-superannuation-us-tax',
        destination: '/blog/australian-superannuation-us-taxpayers',
        permanent: true,
      },
      {
        source: '/blog/german-pension-riester-rurup',
        destination: '/guides/foreign-pensions-guide',
        permanent: true,
      },
      {
        source: '/blog/crypto-fbar-reporting',
        destination: '/blog/fbar-cryptocurrency-foreign-exchanges',
        permanent: true,
      },
      {
        source: '/blog/us-tax-treaties-complete-list',
        destination: '/guides/tax-treaties-guide',
        permanent: true,
      },
      {
        source: '/blog/tax-treaty-savings-clause',
        destination: '/guides/tax-treaties-guide',
        permanent: true,
      },
      {
        source: '/blog/treaty-benefits-form-8833',
        destination: '/forms/8833-treaty-benefits',
        permanent: true,
      },
      // Long-tail aliases that intentionally consolidate into the canonical
      // comparison or form page instead of creating duplicate intent.
      {
        source: '/compare/fbar-vs-fatca',
        destination: '/compare/fbar-vs-form-8938',
        permanent: true,
      },
      {
        source: '/compare/fatca-vs-fbar',
        destination: '/compare/fbar-vs-form-8938',
        permanent: true,
      },
      {
        source: '/compare/feie-vs-foreign-tax-credit',
        destination: '/compare/feie-vs-ftc',
        permanent: true,
      },
      {
        source: '/compare/feie-vs-ftc-calculator',
        destination: '/compare/feie-vs-ftc',
        permanent: true,
      },
      {
        source: '/compare/ftc-vs-feie',
        destination: '/compare/feie-vs-ftc',
        permanent: true,
      },
      {
        source: '/compare/streamlined-vs-delinquent-fbar',
        destination: '/blog/streamlined-vs-delinquent-fbar-procedures',
        permanent: true,
      },
      {
        source: '/compare/ira-vs-foreign-pension',
        destination: '/guides/foreign-pensions-guide',
        permanent: true,
      },
      {
        source: '/forms/1116-foreign-tax-credit',
        destination: '/forms/1116-ftc',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
