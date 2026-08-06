export interface GuideResourceLink {
  label: string;
  href: string;
  localized: boolean;
}

const GUIDE_RESOURCE_LINKS: Record<string, GuideResourceLink[]> = {
  'expat-tax-guide': [
    { label: 'FEIE calculator', href: '/tools/feie-calculator', localized: true },
    { label: 'FBAR checker', href: '/tools/fbar-checker', localized: true },
    { label: 'Form 2555 (FEIE)', href: '/forms/2555-feie', localized: true },
    { label: 'Form 1116 (foreign tax credit)', href: '/forms/1116-ftc', localized: true },
    { label: 'Form 8833 treaty disclosure', href: '/forms/8833-treaty-benefits', localized: true },
    { label: 'U.S. tax treaties guide', href: '/guides/tax-treaties-guide', localized: false },
    { label: 'Expat tax checklist', href: '/resources/expat-tax-checklist', localized: true },
    { label: 'Software vs. human preparer', href: '/compare/expat-tax-software-vs-human-preparer', localized: false },
  ],
  'feie-guide': [
    { label: 'FEIE calculator', href: '/tools/feie-calculator', localized: true },
    { label: 'Form 2555 (FEIE)', href: '/forms/2555-feie', localized: true },
    { label: 'FEIE vs. foreign tax credit', href: '/compare/feie-vs-ftc', localized: false },
  ],
  'fbar-guide': [
    { label: 'FBAR checker', href: '/tools/fbar-checker', localized: true },
    { label: 'FinCEN Form 114', href: '/forms/114-fbar', localized: true },
    { label: 'FBAR requirement flowchart', href: '/resources/fbar-flowchart', localized: false },
    { label: 'FBAR vs. Form 8938', href: '/compare/fbar-vs-form-8938', localized: false },
  ],
  'fatca-guide': [
    { label: 'Form 8938 (FATCA)', href: '/forms/8938-fatca', localized: true },
    { label: 'Form 8938 for Americans in Switzerland', href: '/forms/8938/switzerland', localized: false },
    { label: 'FBAR vs. Form 8938', href: '/compare/fbar-vs-form-8938', localized: false },
  ],
  'foreign-tax-credit-guide': [
    { label: 'Tax savings estimator', href: '/tools/tax-savings-estimator', localized: true },
    { label: 'Form 1116 (foreign tax credit)', href: '/forms/1116-ftc', localized: true },
    { label: 'Form 8833 treaty disclosure', href: '/forms/8833-treaty-benefits', localized: true },
    { label: 'U.S. tax treaties guide', href: '/guides/tax-treaties-guide', localized: false },
    { label: 'FEIE vs. foreign tax credit', href: '/compare/feie-vs-ftc', localized: false },
  ],
  'streamlined-filing-guide': [
    { label: 'Catch-up program tool', href: '/tools/catch-up-program', localized: true },
    { label: 'Form 14653 (Streamlined)', href: '/forms/14653-streamlined', localized: true },
    { label: 'Streamlined filing checklist', href: '/resources/streamlined-checklist', localized: false },
    { label: 'Streamlined filing service', href: '/services/streamlined-filing', localized: true },
    { label: 'Streamlined vs. voluntary disclosure', href: '/compare/streamlined-vs-voluntary-disclosure', localized: false },
  ],
  'pfic-guide': [
    { label: 'Form 8621 (PFIC)', href: '/forms/8621-pfic', localized: true },
    { label: 'PFIC comparison guide', href: '/compare/pfic-excess-distribution-vs-mark-to-market', localized: false },
  ],
  'foreign-trusts-guide': [
    { label: 'Form 3520 (foreign gifts)', href: '/forms/3520-foreign-gifts', localized: true },
    { label: 'Form 3520-A (foreign trusts)', href: '/forms/3520-a-foreign-trust', localized: true },
    { label: 'Form 3520 vs. Form 3520-A', href: '/compare/form-3520-vs-3520-a', localized: false },
  ],
  'cfc-guide': [
    { label: 'Form 5471 (foreign corporation)', href: '/forms/5471-foreign-corporation', localized: true },
    { label: 'CFC and GILTI FAQs', href: '/faq/do-i-need-form-5471', localized: false },
  ],
  'exit-tax-guide': [
    { label: 'Form 8854 (expatriation)', href: '/forms/8854-expatriation', localized: true },
    { label: 'Covered expatriate FAQ', href: '/faq/how-to-avoid-covered-expatriate-status', localized: false },
  ],
  'foreign-pensions-guide': [
    { label: 'Foreign pension FAQ', href: '/faq/is-my-foreign-pension-taxable', localized: false },
    { label: 'Canadian RRSP form guide', href: '/forms/8891-rrsp', localized: true },
    { label: 'U.S. tax treaties guide', href: '/guides/tax-treaties-guide', localized: false },
  ],
  'tax-treaties-guide': [
    { label: 'Form 8833 treaty disclosure', href: '/forms/8833-treaty-benefits', localized: true },
    { label: 'Foreign tax credit guide', href: '/guides/foreign-tax-credit-guide', localized: true },
  ],
};

export function getGuideResourceLinks(slug: string): GuideResourceLink[] {
  return GUIDE_RESOURCE_LINKS[slug] || [];
}

export function getRelatedGuidesForPost(tags: string[], limit = 2): GuideMeta[] {
  const normalizedTags = new Set(tags.map((tag) => tag.toLowerCase()));

  return getAllGuides()
    .map((guide) => ({
      guide,
      score: guide.tags.filter((tag) => normalizedTags.has(tag.toLowerCase())).length,
    }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || a.guide.title.localeCompare(b.guide.title))
    .slice(0, limit)
    .map(({ guide }) => guide);
}
import { getAllGuides, GuideMeta } from '@/lib/guides';
