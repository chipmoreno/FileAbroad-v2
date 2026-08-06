import { Locale, defaultLocale, languages } from '@/lib/i18n/config';
import { getDictionary, localizePath } from '@/lib/i18n/utils';

interface StructuredDataProps {
  locale?: Locale;
}

export default function StructuredData({ locale = defaultLocale }: StructuredDataProps) {
  const dict = getDictionary(locale);
  const inLanguage = languages[locale].htmlLang;
  const baseUrl = 'https://fileabroad.com';

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    inLanguage,
    name: dict.schema.orgName,
    description: dict.schema.orgDescription,
    url: baseUrl,
    telephone: '+593-96-284-8410',
    email: 'chip@fileabroad.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'EC',
    },
    founder: {
      '@type': 'Person',
      name: 'Chip Moreno',
    },
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide',
    },
    serviceType: [
      'Expat Tax Preparation',
      'U.S. Tax Filing for Americans Abroad',
      'FBAR Filing',
      'FATCA Compliance',
      'Foreign Earned Income Exclusion',
      'Foreign Tax Credit',
      'International Tax Services',
    ],
    logo: {
      '@type': 'ImageObject',
      url: `${baseUrl}/favicon.svg`,
    },
    image: `${baseUrl}/og-image.jpg`,
    sameAs: [
      'https://www.facebook.com/fileabroad',
      'https://x.com/FileAbroad',
      'https://www.linkedin.com/company/fileabroad',
      'https://ecuapass.com',
      'https://cuencaexpat.com',
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    inLanguage,
    serviceType: dict.schema.serviceType,
    provider: {
      '@type': 'ProfessionalService',
      name: dict.schema.orgName,
      url: baseUrl,
    },
    name: dict.schema.serviceType,
    description: dict.schema.orgDescription,
    areaServed: {
      '@type': 'Place',
      name: 'Worldwide',
    },
    audience: {
      '@type': 'Audience',
      audienceType: dict.schema.audienceType,
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    inLanguage,
    name: dict.schema.orgName,
    url: baseUrl,
    description: dict.schema.websiteDescription,
    publisher: {
      '@type': 'Organization',
      name: dict.schema.orgName,
      url: baseUrl,
    },
  };

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    inLanguage,
    name: 'Chip Moreno',
    jobTitle: dict.schema.personJobTitle,
    worksFor: {
      '@type': 'ProfessionalService',
      name: dict.schema.orgName,
    },
    description: dict.schema.personDescription,
    knowsAbout: [
      'U.S. Expat Taxes',
      'FBAR Filing',
      'FATCA Compliance',
      'Foreign Earned Income Exclusion',
      'Foreign Tax Credit',
      'Streamlined Filing Compliance Procedures',
      'Crypto Tax Reporting for Expats',
      'Self-Employment Tax Abroad',
      'U.S. Expat Tax Return Preparation',
    ],
    url: `${baseUrl}${localizePath('/about', locale)}`,
    sameAs: [
      'https://x.com/FileAbroad',
      'https://www.linkedin.com/in/chipmoreno',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
  );
}
