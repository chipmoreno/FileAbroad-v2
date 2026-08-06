import Header from './Header';
import Footer from './Footer';
import StickyCTABar from './StickyCTABar';
import { Locale, defaultLocale } from '@/lib/i18n/config';

interface PageShellProps {
  children: React.ReactNode;
  locale?: Locale;
}

export default function PageShell({ children, locale = defaultLocale }: PageShellProps) {
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1} className="pt-24 pb-16 bg-background">
        {children}
      </main>
      <Footer locale={locale} />
      <StickyCTABar />
    </>
  );
}
