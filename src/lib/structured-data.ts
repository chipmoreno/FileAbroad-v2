const BASE_URL = 'https://fileabroad.com';

function absoluteUrl(value: string) {
  try {
    return new URL(value, BASE_URL).toString();
  } catch {
    throw new Error(`Invalid structured-data URL: ${value}`);
  }
}

interface BreadcrumbItem {
  name: string;
  href: string;
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  const normalizedItems = items.filter((item) => item.name.trim() && item.href.trim());

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: normalizedItems.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

interface FAQItem {
  question: string;
  answer: string;
}

export function buildFAQSchema(faqs: FAQItem[]) {
  const validFaqs = faqs.filter(
    (faq) => faq.question.trim().length > 0 && faq.answer.trim().length > 0,
  );

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: validFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

interface ArticleSchemaInput {
  title: string;
  description: string;
  author?: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  image?: string;
  inLanguage?: string;
}

export function buildArticleSchema(input: ArticleSchemaInput) {
  const url = absoluteUrl(input.url);

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: input.title,
    description: input.description,
    author: {
      '@type': 'Person',
      name: input.author || 'Chip Moreno',
      url: 'https://fileabroad.com/about',
    },
    datePublished: input.datePublished,
    ...(input.dateModified && { dateModified: input.dateModified }),
    url,
    ...(input.inLanguage && { inLanguage: input.inLanguage }),
    ...(input.image && { image: absoluteUrl(input.image) }),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    publisher: {
      '@type': 'Organization',
      name: 'FileAbroad',
      url: BASE_URL,
    },
  };
}

interface HowToStep {
  name: string;
  text: string;
}

interface HowToSchemaInput {
  name: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string;
}

export function buildHowToSchema(input: HowToSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: input.name,
    description: input.description,
    ...(input.totalTime && { totalTime: input.totalTime }),
    step: input.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  };
}

interface ServiceSchemaInput {
  name: string;
  description: string;
  url: string;
}

export function buildServiceSchema(input: ServiceSchemaInput) {
  const url = absoluteUrl(input.url);
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: input.name,
    description: input.description,
    url,
    provider: {
      '@type': 'ProfessionalService',
      name: 'FileAbroad',
      url: BASE_URL,
    },
    areaServed: { '@type': 'Place', name: 'Worldwide' },
  };
}

interface SoftwareAppInput {
  name: string;
  description: string;
  url: string;
  applicationCategory?: string;
  operatingSystem?: string;
  featureList?: string[];
}

export function buildSoftwareApplicationSchema(input: SoftwareAppInput) {
  const url = absoluteUrl(input.url);

  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: input.name,
    description: input.description,
    url,
    applicationCategory: input.applicationCategory || 'FinanceApplication',
    operatingSystem: input.operatingSystem || 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    ...(input.featureList && { featureList: input.featureList }),
    author: {
      '@type': 'Organization',
      name: 'FileAbroad',
      url: BASE_URL,
    },
  };
}
