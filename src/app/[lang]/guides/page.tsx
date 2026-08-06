import { Metadata } from 'next';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import { generateLocalizedMetadata, extractLocale } from '@/lib/i18n/metadata';
import { getDictionary, localizePath } from '@/lib/i18n/utils';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = extractLocale({ lang });
  return generateLocalizedMetadata({
    pageKey: 'guides',
    path: '/guides',
    locale,
  });
}

export default async function GuidesPage({ params }: Props) {
  const { lang } = await params;
  const locale = extractLocale({ lang });
  const dict = getDictionary(locale);
  const l = (path: string) => localizePath(path, locale);

  return (
    <PageShell locale={locale}>
      <div className="max-w-6xl mx-auto px-6 pt-8">
        <Breadcrumbs items={[{ label: dict.breadcrumbs.guides, href: l('/guides') }]} />
      </div>
      <div className="max-w-6xl mx-auto px-6 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 font-sans text-foreground">
          {dict.guides.pageTitle}
        </h1>
        <p className="text-xl max-w-3xl mx-auto text-muted-foreground">
          {dict.guides.pageDescription}
        </p>
      </div>
      {/* TODO: Extract guides index content into a shared component */}
    </PageShell>
  );
}
