import type { Metadata, Viewport } from 'next';

export const rootViewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#faf9f7' },
    { media: '(prefers-color-scheme: dark)', color: '#0c0a09' },
  ],
};

export const rootMetadata: Metadata = {
  metadataBase: new URL('https://fileabroad.com'),
  title: { default: 'US Expat Tax Filing | FileAbroad', template: '%s | FileAbroad' },
  description: 'Personal U.S. expat tax preparation from Ecuador, with clear scope, careful review, and secure filing support.',
  keywords: ['expat taxes', 'US tax filing abroad', 'FBAR filing', 'FATCA compliance', 'foreign earned income exclusion', 'foreign tax credit', 'streamlined filing procedures'],
  authors: [{ name: 'Chip Moreno' }],
  creator: 'FileAbroad',
  publisher: 'FileAbroad',
  category: 'Tax Services',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: '/apple-icon.png',
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fileabroad.com',
    siteName: 'FileAbroad',
    title: 'Tax filing for Americans living abroad. | FileAbroad',
    description: 'Personal U.S. expat tax preparation with clear scope, careful review, and secure filing support.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'FileAbroad — tax filing for Americans living abroad' }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@FileAbroad',
    creator: '@FileAbroad',
    title: 'Tax filing for Americans living abroad. | FileAbroad',
    description: 'Personal U.S. expat tax preparation with clear scope, careful review, and secure filing support.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  alternates: { canonical: 'https://fileabroad.com' },
};
