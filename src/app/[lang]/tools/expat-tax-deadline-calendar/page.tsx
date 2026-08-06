import { Metadata } from 'next';
import PageShell from '@/components/layout/PageShell';
import ToolLayout from '@/components/tools/ToolLayout';
import DeadlineCalendar from '@/components/tools/DeadlineCalendar';
import { extractLocale } from '@/lib/i18n/metadata';
import { localizePath, getCanonicalUrl, generateHreflang } from '@/lib/i18n/utils';
import { getLocalizedToolCopy } from '@/lib/i18n/localized-tool-copy';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = extractLocale({ lang });
  const copy = getLocalizedToolCopy(locale, 'expat-tax-deadline-calendar');
  return {
    title: copy.title,
    description: copy.description,
    keywords: ['expat tax deadlines 2026', 'FBAR deadline', 'expat filing deadline', 'tax extension dates abroad'],
    alternates: {
      canonical: getCanonicalUrl('/tools/expat-tax-deadline-calendar', locale),
      languages: generateHreflang('/tools/expat-tax-deadline-calendar'),
    },
  };
}

export default async function DeadlineCalendarPage({ params }: Props) {
  const { lang } = await params;
  const locale = extractLocale({ lang });
  const copy = getLocalizedToolCopy(locale, 'expat-tax-deadline-calendar');
  const l = (path: string) => localizePath(path, locale);

  return (
    <PageShell locale={locale}>
      <ToolLayout
        title={copy.title}
        description={copy.description}
        breadcrumbLabel={copy.breadcrumb}
        breadcrumbHref={l('/tools/expat-tax-deadline-calendar')}
      >
        <DeadlineCalendar />
      </ToolLayout>
    </PageShell>
  );
}
