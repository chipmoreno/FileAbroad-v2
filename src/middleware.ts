import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { locales, defaultLocale, isValidLocale } from '@/lib/i18n/config';

// ── Affiliate tracking ──────────────────────────────────────────────────────
const AFFILIATE_PARTNER_CODE = 'lobos-perez-cynthia';
const AFFILIATE_COOKIE_MAX_AGE = 60 * 60 * 24 * 90; // 90 days

function setAffiliateCookie(request: NextRequest, response: NextResponse): void {
  const ref = request.nextUrl.searchParams.get('ref');
  if (ref === AFFILIATE_PARTNER_CODE) {
    response.cookies.set('affiliate_ref', AFFILIATE_PARTNER_CODE, {
      maxAge: AFFILIATE_COOKIE_MAX_AGE,
      path: '/',
      sameSite: 'lax',
      secure: true,
    });
  }
}

function nextWithLocale(request: NextRequest, locale: string): NextResponse {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-locale', locale);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);
  requestHeaders.set('content-language', locale === 'zh' ? 'zh-Hans' : locale);
  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set('x-locale', locale);
  response.headers.set('content-language', locale === 'zh' ? 'zh-Hans' : locale);
  return response;
}

// ── Locale routing ──────────────────────────────────────────────────────────

const PUBLIC_FILE = /\.(.*)$/;
const EXCLUDED_PATHS = [
  '/api/',
  '/_next/',
  '/favicon',
  '/robots.txt',
  '/sitemap',
  '/og-image',
  '/headshot',
  '/logo',
  '/social/',
];

function isExcludedPath(pathname: string): boolean {
  if (PUBLIC_FILE.test(pathname)) return true;
  return EXCLUDED_PATHS.some((p) => pathname.startsWith(p));
}

function getLocaleFromCookie(request: NextRequest): string | undefined {
  const cookie = request.cookies.get('NEXT_LOCALE');
  return cookie?.value;
}

function getLocaleFromAcceptLanguage(request: NextRequest): string | undefined {
  const acceptLang = request.headers.get('accept-language');
  if (!acceptLang) return undefined;

  const preferred = acceptLang
    .split(',')
    .map((lang) => {
      const [code] = lang.split(';');
      return code.trim().toLowerCase().split('-')[0];
    });

  for (const pref of preferred) {
    const match = locales.find((l) => l === pref);
    if (match) return match;
  }
  return undefined;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip excluded paths
  if (isExcludedPath(pathname)) {
    const response = NextResponse.next();
    setAffiliateCookie(request, response);
    return response;
  }

  // Check if URL already has a locale prefix
  const pathSegments = pathname.split('/').filter(Boolean);
  const firstSegment = pathSegments[0];

  if (firstSegment && isValidLocale(firstSegment)) {
    // Valid locale already in path — set header and continue
    const response = nextWithLocale(request, firstSegment);
    setAffiliateCookie(request, response);
    return response;
  }

  // No locale in path — this is the root (English) or an invalid path
  // We do NOT redirect for crawlers/bots to preserve existing SEO
  const userAgent = request.headers.get('user-agent')?.toLowerCase() || '';
  const isBot = /bot|crawl|spider|googlebot|bingbot|yandex|duckduckgo|slurp/.test(userAgent);

  if (isBot) {
    // For bots, serve the English root as-is (x-default)
    const response = nextWithLocale(request, defaultLocale);
    setAffiliateCookie(request, response);
    return response;
  }

  // For human users, detect preferred locale
  const cookieLocale = getLocaleFromCookie(request);
  const acceptLocale = getLocaleFromAcceptLanguage(request);
  const preferredLocale = cookieLocale && isValidLocale(cookieLocale)
    ? cookieLocale
    : acceptLocale && isValidLocale(acceptLocale)
      ? acceptLocale
      : defaultLocale;

  if (preferredLocale !== defaultLocale) {
    // Redirect to localized version
    const newUrl = new URL(
      `/${preferredLocale}${pathname === '/' ? '' : pathname}`,
      request.url
    );
    const response = NextResponse.redirect(newUrl);
    setAffiliateCookie(request, response);
    return response;
  }

  // Default locale — serve root as English
  const response = nextWithLocale(request, defaultLocale);
  setAffiliateCookie(request, response);
  return response;
}

export const config = {
  matcher: [
    // Skip all internal paths
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
