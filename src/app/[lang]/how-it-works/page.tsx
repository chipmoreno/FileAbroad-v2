import { Metadata } from 'next';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import HowItWorksPageContent from '@/components/pages/HowItWorksPageContent';
import { generateLocalizedMetadata, extractLocale } from '@/lib/i18n/metadata';
import { getDictionary, localizePath } from '@/lib/i18n/utils';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = extractLocale({ lang });
  return generateLocalizedMetadata({
    pageKey: 'howItWorks',
    path: '/how-it-works',
    locale,
  });
}

export default async function HowItWorksPage({ params }: Props) {
  const { lang } = await params;
  const locale = extractLocale({ lang });
  const dict = getDictionary(locale);
  const l = (path: string) => localizePath(path, locale);

  return (
    <PageShell locale={locale}>
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <Breadcrumbs items={[{ label: dict.breadcrumbs.howItWorks, href: l('/how-it-works') }]} />
      </div>
      <HowItWorksPageContent dict={dict} locale={locale} />
    </PageShell>
  );
}
