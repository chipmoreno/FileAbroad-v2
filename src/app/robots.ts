import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/payment/', '/genxpat'],
    },
    sitemap: 'https://fileabroad.com/sitemap.xml',
  };
}
