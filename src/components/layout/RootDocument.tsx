import type { ReactNode } from 'react';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import StructuredData from '@/components/seo/StructuredData';
import ConversionTracking from '@/components/analytics/ConversionTracking';
import AnalyticsConsent from '@/components/analytics/AnalyticsConsent';
import { LocaleProvider } from '@/components/i18n/LocaleProvider';
import { languages, type Locale } from '@/lib/i18n/config';
import { getDictionary } from '@/lib/i18n/utils';

const geist = Geist({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-geist-sans',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-geist-mono',
  display: 'swap',
});

const themeScript = `(()=>{try{const s=localStorage.getItem('fileabroad-theme');const d=s==='dark'||(s!=='light'&&matchMedia('(prefers-color-scheme: dark)').matches);const r=document.documentElement;r.classList.toggle('dark',d);r.dataset.theme=d?'dark':'light';r.style.colorScheme=d?'dark':'light'}catch{}})()`;

const skipLinkLabels: Record<Locale, string> = {
  en: 'Skip to main content',
  es: 'Saltar al contenido principal',
  pt: 'Ir para o conteúdo principal',
  fr: 'Aller au contenu principal',
  de: 'Zum Hauptinhalt springen',
  it: 'Vai al contenuto principale',
  nl: 'Naar hoofdinhoud',
  ja: 'メインコンテンツへ移動',
  zh: '跳到主要内容',
};

export default function RootDocument({ children, locale }: { children: ReactNode; locale: Locale }) {
  const langConfig = languages[locale];
  const gaMeasurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

  return (
    <html lang={langConfig.htmlLang} dir={langConfig.dir} suppressHydrationWarning className={`scroll-smooth ${geist.variable} ${geistMono.variable}`}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <StructuredData locale={locale} />
        <a className="skip-link" href="#main-content">{skipLinkLabels[locale]}</a>
        <LocaleProvider locale={locale} dictionary={getDictionary(locale)}>
          {children}
          <ConversionTracking />
          <AnalyticsConsent />
        </LocaleProvider>
        {gaMeasurementId && (
          <>
            <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};let c='denied';try{c=localStorage.getItem('fileabroad_analytics_consent')==='granted'?'granted':'denied'}catch{}gtag('consent','default',{analytics_storage:c,ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',wait_for_update:500})` }} />
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`gtag('js',new Date());gtag('config',${JSON.stringify(gaMeasurementId)},{anonymize_ip:true})`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
