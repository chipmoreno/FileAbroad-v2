import Link from 'next/link';

import NewsletterSignup from '@/components/forms/NewsletterSignup';
import { getDictionary, localizePath } from '@/lib/i18n/utils';
import { type Locale, defaultLocale } from '@/lib/i18n/config';

export default function Footer({ locale = defaultLocale }: { locale?: Locale }) {
  const dict = getDictionary(locale);
  const local = (path: string) => localizePath(path, locale);
  const linkClass = 'text-sm text-[#faf9f7]/75 transition-colors hover:text-[#faf9f7]';
  const services = [
    [dict.home.serviceAnnualTitle, '/services/tax-filing'],
    [dict.services.fbarFiling, '/services/fbar-filing'],
    [dict.services.fatcaCompliance, '/services/fatca-compliance'],
    [dict.home.serviceStreamlinedTitle, '/services/streamlined-filing'],
  ];
  const company = [
    [dict.nav.about, '/about'],
    [dict.nav.howItWorks, '/how-it-works'],
    [dict.nav.guides, '/guides'],
    [dict.nav.faq, '/faq'],
    [dict.nav.contact, '/contact'],
  ];

  return (
    <footer className="bg-[#1c1917] text-[#faf9f7]">
      <div className="mx-auto max-w-7xl px-6 pt-16 lg:px-8">
        <NewsletterSignup />
      </div>
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="inline-flex items-end text-lg font-semibold tracking-tight">
              FileAbroad<span aria-hidden="true" className="mb-1 ml-1 h-2 w-2 rounded-full bg-accent" />
            </p>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-[#faf9f7]/75">{dict.about.pageDescription}</p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#faf9f7]/65">{dict.nav.services}</p>
            <nav className="mt-5 flex flex-col gap-3" aria-label={`${dict.footer.quickLinks}: ${dict.nav.services}`}>
              {services.map(([label, href]) => <Link key={href} href={local(href)} className={linkClass}>{label}</Link>)}
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#faf9f7]/65">{dict.footer.quickLinks}</p>
            <nav className="mt-5 flex flex-col gap-3" aria-label={dict.footer.quickLinks}>
              {company.map(([label, href]) => <Link key={href} href={local(href)} className={linkClass}>{label}</Link>)}
              <Link href={local('/privacy')} className={linkClass}>{dict.footer.privacyPolicy}</Link>
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#faf9f7]/65">{dict.footer.contact}</p>
            <div className="mt-5 flex flex-col gap-3">
              <a className={linkClass} href="mailto:info@fileabroad.com">info@fileabroad.com</a>
              <span className="text-sm text-[#faf9f7]/75">Cuenca, Ecuador</span>
              <Link href={local('/consultation')} className="mt-2 inline-flex w-fit rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground">{dict.home.aboutCtaIntake}</Link>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-[#faf9f7]/20 pt-8 text-sm text-[#faf9f7]/70 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} FileAbroad. {dict.footer.allRightsReserved}</p>
          <div className="flex gap-5">
            <a className="transition-colors hover:text-[#faf9f7]" href="https://www.linkedin.com/company/fileabroad" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className="transition-colors hover:text-[#faf9f7]" href="https://x.com/FileAbroad" target="_blank" rel="noopener noreferrer">X</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
