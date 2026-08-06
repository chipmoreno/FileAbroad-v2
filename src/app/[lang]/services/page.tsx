import { Metadata } from 'next';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import ServicesPage from '@/components/pages/ServicesPage';
import { generateLocalizedMetadata, extractLocale } from '@/lib/i18n/metadata';
import { getDictionary } from '@/lib/i18n/utils';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = extractLocale({ lang });
  return generateLocalizedMetadata({
    pageKey: 'services',
    path: '/services',
    locale,
  });
}

export default async function Services({ params }: Props) {
  const { lang } = await params;
  const locale = extractLocale({ lang });
  const dict = getDictionary(locale);

  return (
    <PageShell locale={locale}>
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <Breadcrumbs items={[{ label: dict.breadcrumbs.services, href: '/services' }]} />
      </div>
      <ServicesPage />
    </PageShell>
  );
}
