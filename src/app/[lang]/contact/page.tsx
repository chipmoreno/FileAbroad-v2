import { Metadata } from 'next';
import ContactPageContent from '@/components/pages/ContactPageContent';
import { extractLocale } from '@/lib/i18n/metadata';

interface Props {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const locale = extractLocale({ lang });
  const baseTitle = locale === 'en' ? 'Contact' : locale === 'es' ? 'Contacto' : locale === 'pt' ? 'Contacto' : locale === 'fr' ? 'Contact' : locale === 'de' ? 'Kontakt' : locale === 'it' ? 'Contatto' : locale === 'nl' ? 'Contact' : locale === 'ja' ? '連絡先' : locale === 'zh' ? '联系方式' : 'Contact';
  return {
    title: baseTitle,
    description: 'Get in touch with FileAbroad. Questions about expat taxes? Send a message and we will reply within one business day.',
    alternates: {
      canonical: `https://fileabroad.com${locale === 'en' ? '' : `/${locale}`}/contact`,
    },
  };
}

export default async function LocalizedContactPage({ params }: Props) {
  const { lang } = await params;
  const locale = extractLocale({ lang });
  return <ContactPageContent locale={locale} />;
}
