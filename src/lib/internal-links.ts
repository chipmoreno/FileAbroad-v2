/**
 * Internal Links Audit Script
 * Run with: npx tsx src/lib/internal-links.ts
 *
 * Finds orphan pages (pages with few/no incoming links) and suggests cross-links.
 */

import fs from 'fs';
import path from 'path';
import { getAllPosts, getAllSlugs, getRelatedPosts } from './blog';
import { getAllGuides, getGuideBySlug } from './guides';
import { getAllForms, getFormByNumber, getFormBySlug } from './forms';
import { getAllCountries, getCountryBySlug, getRelatedCountries } from './countries';
import { getAllPersonas } from './personas';
import { getAllStates } from './state-taxes';
import { FAQ_PAGES } from './faq-pages';
import { COMPARISON_PAGES } from './compare-data';
import { getAllFormCountrySlugs, getAllVisaSlugs, getAllVisas } from './programmatic-seo';
import { getGuideResourceLinks, getRelatedGuidesForPost } from './guide-resource-links';
import { consultationPathways } from './consultation';
import { locales } from './i18n/config';
import {
  getRelatedCountriesForPost,
  getRelatedFaqsForPost,
  getRelatedPersonasForGuide,
  getRelatedPersonasForPost,
  getRelatedVisasForCountry,
} from './content-relationships';
import { getMatrixFormCountryParams, getPersonaCountryParams, getStateServiceParams } from './programmatic-matrix';

const CONTENT_DIR = path.join(process.cwd(), 'content');
const APP_DIR = path.join(process.cwd(), 'src/app');
const COMPONENTS_DIR = path.join(process.cwd(), 'src/components');
const NON_SEO_ROUTES = new Set([
  '/genxpat',
  '/payment/retainer/success',
  '/terms',
  '/privacy',
  '/editorial-policy',
]);

function findAllRoutes(): string[] {
  const routes: string[] = [];

  function scanDir(dir: string, prefix: string) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (entry.name.startsWith('[')) continue;
        if (entry.name === 'api') continue;
        scanDir(path.join(dir, entry.name), `${prefix}/${entry.name}`);
      } else if (entry.name === 'page.tsx') {
        routes.push(prefix || '/');
      }
    }
  }

  scanDir(APP_DIR, '');
  return routes;
}

function findLinksInFile(filePath: string): string[] {
  const content = fs.readFileSync(filePath, 'utf8');
  const links: string[] = [];

  // Match href="/..." patterns
  const hrefPattern = /href=["']\/([^"'#?]+)/g;
  for (const match of content.matchAll(hrefPattern)) {
    links.push('/' + match[1].replace(/\/$/, ''));
  }

  // Match data-driven link objects such as { label: 'Blog', href: '/blog' }.
  const hrefPropertyPattern = /\bhref:\s*["']\/([^"'#?]+)/g;
  for (const match of content.matchAll(hrefPropertyPattern)) {
    links.push('/' + match[1].replace(/\/$/, ''));
  }

  // Match MDX links [text](/path)
  const mdxLinkPattern = /\]\(\/([^)#?]+)/g;
  for (const match of content.matchAll(mdxLinkPattern)) {
    links.push('/' + match[1].replace(/\/$/, ''));
  }

  return [...new Set(links)];
}

function scanContentLinks(): Map<string, string[]> {
  const linkMap = new Map<string, string[]>();

  // Scan blog posts
  const blogDir = path.join(CONTENT_DIR, 'blog');
  if (fs.existsSync(blogDir)) {
    for (const file of fs.readdirSync(blogDir).filter(f => f.endsWith('.mdx'))) {
      const slug = file.replace('.mdx', '');
      const links = findLinksInFile(path.join(blogDir, file));
      linkMap.set(`/blog/${slug}`, links);
    }
  }

  // Scan guide files
  const guidesDir = path.join(CONTENT_DIR, 'guides');
  if (fs.existsSync(guidesDir)) {
    for (const file of fs.readdirSync(guidesDir).filter(f => f.endsWith('.mdx'))) {
      const slug = file.replace('.mdx', '');
      const links = findLinksInFile(path.join(guidesDir, file));
      linkMap.set(`/guides/${slug}`, links);
    }
  }

  // Scan form content as well; form pages often link to related disclosures
  // and companion forms in MDX rather than in the frontmatter relationships.
  const formsDir = path.join(CONTENT_DIR, 'forms');
  if (fs.existsSync(formsDir)) {
    for (const file of fs.readdirSync(formsDir).filter(f => f.endsWith('.mdx'))) {
      const slug = file.replace('.mdx', '');
      const links = findLinksInFile(path.join(formsDir, file));
      linkMap.set(`/forms/${slug}`, links);
    }
  }

  // Scan app pages
  function scanAppDir(dir: string, prefix: string) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      if (entry.isDirectory() && !entry.name.startsWith('[') && entry.name !== 'api') {
        scanAppDir(path.join(dir, entry.name), `${prefix}/${entry.name}`);
      } else if (entry.name === 'page.tsx') {
        const links = findLinksInFile(path.join(dir, entry.name));
        linkMap.set(prefix || '/', links);
      }
    }
  }

  scanAppDir(APP_DIR, '');

  // Shared navigation, footer, and reusable content components contribute
  // incoming links on every page, so include their destinations once.
  const sharedLinks = new Set<string>();
  function scanComponents(dir: string) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const filePath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanComponents(filePath);
      } else if (entry.name.endsWith('.tsx')) {
        for (const link of findLinksInFile(filePath)) sharedLinks.add(link);
      }
    }
  }
  scanComponents(COMPONENTS_DIR);
  linkMap.set('__shared__', [...sharedLinks]);

  addGeneratedContentLinks(linkMap);

  return linkMap;
}

function appendLinks(linkMap: Map<string, string[]>, route: string, links: string[]) {
  const current = linkMap.get(route) || [];
  linkMap.set(route, [...new Set([...current, ...links])]);
}

function getKnownRoutes(staticRoutes: string[]): Set<string> {
  const routes = new Set(staticRoutes);

  // Dynamic route directories are intentionally omitted by the filesystem
  // scanner above. Add their generated paths here so the audit validates the
  // URLs Next actually emits rather than flagging valid dynamic links.
  for (const pathway of consultationPathways.filter((item) => item.slug !== 'general')) {
    routes.add(`/consultation/${pathway.slug}`);
  }
  for (const locale of locales) {
    routes.add(`/${locale}/forms`);
    routes.add(`/${locale}/intake`);
  }

  for (const slug of getAllSlugs()) routes.add(`/blog/${slug}`);
  for (const guide of getAllGuides()) routes.add(`/guides/${guide.slug}`);
  for (const form of getAllForms()) routes.add(`/forms/${form.slug}`);
  for (const country of getAllCountries()) routes.add(`/countries/${country.slug}`);
  for (const persona of getAllPersonas()) routes.add(`/personas/${persona.slug}`);
  for (const state of getAllStates()) routes.add(`/state-taxes/${state.slug}`);
  for (const page of FAQ_PAGES) routes.add(`/faq/${page.slug}`);
  for (const page of COMPARISON_PAGES) routes.add(`/compare/${page.slug}`);
  for (const { formSlug, countrySlug } of getAllFormCountrySlugs()) {
    routes.add(`/forms/${formSlug}/${countrySlug}`);
  }
  for (const slug of getAllVisaSlugs()) routes.add(`/visas/${slug}`);
  for (const { country, form } of getMatrixFormCountryParams()) routes.add(`/countries/${country}/${form}`);
  for (const { slug, country } of getPersonaCountryParams()) routes.add(`/personas/${slug}/countries/${country}`);
  for (const { state, service } of getStateServiceParams()) routes.add(`/state-taxes/${state}/services/${service}`);

  for (const serviceType of ['consultation30', 'consultation60', 'consultationNonClient', 'fbar', 'fatca']) {
    routes.add(`/payment/retainer/${serviceType}`);
  }

  return routes;
}

/**
 * Count links produced from content/data objects. Source regex cannot see
 * these because the hrefs are assembled while the page is rendered.
 */
function addGeneratedContentLinks(linkMap: Map<string, string[]>) {
  const posts = getAllPosts();
  const guides = getAllGuides();
  const forms = getAllForms();
  const countries = getAllCountries();
  const personas = getAllPersonas();
  const states = getAllStates();
  const formCountrySlugs = getAllFormCountrySlugs();
  const visaSlugs = getAllVisaSlugs();
  const matrixFormCountryParams = getMatrixFormCountryParams();
  const personaCountryParams = getPersonaCountryParams();
  const stateServiceParams = getStateServiceParams();

  appendLinks(linkMap, '/blog', posts.map((post) => `/blog/${post.slug}`));
  appendLinks(linkMap, '/guides', guides.map((guide) => `/guides/${guide.slug}`));
  appendLinks(linkMap, '/forms', forms.map((form) => `/forms/${form.slug}`));
  appendLinks(linkMap, '/countries', countries.map((country) => `/countries/${country.slug}`));
  appendLinks(linkMap, '/personas', personas.map((persona) => `/personas/${persona.slug}`));
  appendLinks(linkMap, '/state-taxes', states.map((state) => `/state-taxes/${state.slug}`));
  appendLinks(linkMap, '/faq', FAQ_PAGES.map((page) => `/faq/${page.slug}`));
  appendLinks(linkMap, '/compare', COMPARISON_PAGES.map((page) => `/compare/${page.slug}`));
  appendLinks(linkMap, '/visas', visaSlugs.map((slug) => `/visas/${slug}`));
  appendLinks(linkMap, '/tools', [
    '/tools/feie-calculator',
    '/tools/fbar-checker',
    '/tools/catch-up-program',
    '/tools/expat-tax-deadline-calendar',
    '/tools/tax-savings-estimator',
    '/tools/fee-estimator',
    '/tools/state-tax-residency-analyzer',
    '/tools/quarterly-tax-calculator',
  ]);
  appendLinks(linkMap, '/', ['/blog', '/forms', '/personas']);
  appendLinks(linkMap, '/countries/form-matrix', matrixFormCountryParams.map(({ country, form }) => `/countries/${country}/${form}`));
  appendLinks(linkMap, '/personas/country-matrix', personaCountryParams.map(({ slug, country }) => `/personas/${slug}/countries/${country}`));
  appendLinks(linkMap, '/state-taxes/service-matrix', stateServiceParams.map(({ state, service }) => `/state-taxes/${state}/services/${service}`));

  for (const { country, form } of matrixFormCountryParams) {
    const formPage = getFormByNumber(form.replace(/^form-/, ''));
    appendLinks(linkMap, `/countries/${country}/${form}`, [
      getCountryBySlug(country) ? `/countries/${country}` : '/countries',
      formPage ? `/forms/${formPage.slug}` : '/forms',
      '/consultation',
    ]);
  }
  for (const { slug, country } of personaCountryParams) {
    appendLinks(linkMap, `/personas/${slug}/countries/${country}`, [
      `/personas/${slug}`,
      getCountryBySlug(country) ? `/countries/${country}` : '/countries',
      '/tools/feie-calculator',
      '/consultation',
    ]);
  }
  for (const { state, service } of stateServiceParams) {
    appendLinks(linkMap, `/state-taxes/${state}/services/${service}`, [
      `/state-taxes/${state}`,
      '/guides/state-taxes-abroad',
      '/consultation',
    ]);
  }

  for (const post of getAllPosts()) {
    appendLinks(
      linkMap,
      `/blog/${post.slug}`,
      [
        ...getRelatedPosts(post.slug, post.category, post.tags, 3).map((related) => `/blog/${related.slug}`),
        ...getRelatedGuidesForPost(post.tags).map((guide) => `/guides/${guide.slug}`),
        ...getRelatedCountriesForPost(post.slug).map((country) => `/countries/${country.slug}`),
        ...getRelatedPersonasForPost(post.slug).map((persona) => `/personas/${persona.slug}`),
        ...getRelatedFaqsForPost(post.slug).map((page) => `/faq/${page.slug}`),
      ]
    );
  }

  for (const stateTaxPostSlug of ['state-tax-obligations-americans-abroad', 'best-state-domicile-expats']) {
    if (posts.some((post) => post.slug === stateTaxPostSlug)) {
      appendLinks(linkMap, `/blog/${stateTaxPostSlug}`, states.map((state) => `/state-taxes/${state.slug}`));
    }
  }

  if (posts.some((post) => post.slug === 'feie-vs-foreign-tax-credit')) {
    appendLinks(linkMap, '/blog/feie-vs-foreign-tax-credit', countries.map((country) => `/countries/${country.slug}`));
  }

  for (const guide of getAllGuides()) {
    const relatedGuide = getGuideBySlug(guide.slug);
    if (!relatedGuide) continue;

    appendLinks(linkMap, `/guides/${guide.slug}`, [
      ...guide.relatedBlogSlugs.map((slug) => `/blog/${slug}`),
      ...guide.relatedServiceSlugs.map((slug) => `/services/${slug}`),
      ...getGuideResourceLinks(guide.slug).map((resource) => resource.href),
      ...getRelatedPersonasForGuide(guide.slug, guide.slug === 'expat-tax-guide' ? 12 : 3)
        .map((persona) => `/personas/${persona.slug}`),
    ]);
  }

  for (const form of getAllForms()) {
    const formPage = getFormBySlug(form.slug);
    if (!formPage) continue;

    appendLinks(linkMap, `/forms/${form.slug}`, [
      ...formPage.relatedBlogSlugs.map((slug) => `/blog/${slug}`),
      ...formPage.relatedGuideSlugs.map((slug) => `/guides/${slug}`),
      ...formPage.relatedServiceSlugs.map((slug) => `/services/${slug}`),
    ]);
  }

  for (const country of getAllCountries()) {
    appendLinks(linkMap, `/countries/${country.slug}`, [
      ...country.relatedBlogSlugs
        .filter((slug) => getAllSlugs().includes(slug))
        .map((slug) => `/blog/${slug}`),
      ...getRelatedVisasForCountry(country.slug).map((visa) => `/visas/${visa.slug}`),
      ...getRelatedCountries(country.slug, 4).map((related) => `/countries/${related.slug}`),
    ]);
  }

  for (const persona of getAllPersonas()) {
    appendLinks(linkMap, `/personas/${persona.slug}`, [
      ...persona.relevantContent.map((item) => item.href),
      ...persona.relevantTools.map((item) => item.href),
    ]);
  }

  for (const state of getAllStates()) {
    appendLinks(linkMap, `/state-taxes/${state.slug}`, ['/state-taxes']);
  }

  for (const page of FAQ_PAGES) {
    appendLinks(linkMap, `/faq/${page.slug}`, [
      ...page.relatedBlogSlugs.map((slug) => `/blog/${slug}`),
      ...page.relatedGuideSlugs.map((slug) => `/guides/${slug}`),
      ...page.relatedServiceSlugs.map((slug) => `/services/${slug}`),
      ...page.relatedFaqs.map((faq) => `/faq/${faq.slug}`),
    ]);
  }

  for (const page of COMPARISON_PAGES) {
    appendLinks(linkMap, `/compare/${page.slug}`, [
      ...page.relatedBlogSlugs.map((slug) => `/blog/${slug}`),
      ...page.relatedGuideSlugs.map((slug) => `/guides/${slug}`),
      ...page.relatedServiceSlugs.map((slug) => `/services/${slug}`),
    ]);
  }

  for (const { formSlug, countrySlug } of formCountrySlugs) {
    const formPage = getFormByNumber(formSlug);
    const formHref = formPage ? `/forms/${formPage.slug}` : `/forms/${formSlug}`;
    const countryExists = countries.some((country) => country.slug === countrySlug);
    appendLinks(linkMap, `/forms/${formSlug}/${countrySlug}`, [
      formHref,
      ...(countryExists ? [`/countries/${countrySlug}`] : []),
    ]);
    appendLinks(linkMap, formHref, [`/forms/${formSlug}/${countrySlug}`]);
    if (countryExists) {
      appendLinks(linkMap, `/countries/${countrySlug}`, [`/forms/${formSlug}/${countrySlug}`]);
    }
  }

  for (const slug of visaSlugs) {
    const visa = getAllVisas().find((entry) => entry.slug === slug);
    appendLinks(linkMap, `/visas/${slug}`, [
      '/visas',
      ...(visa?.countrySlugs || [])
        .filter((countrySlug) => countries.some((country) => country.slug === countrySlug))
        .map((countrySlug) => `/countries/${countrySlug}`),
    ]);
  }
}

function audit() {
  console.log('=== FileAbroad Internal Links Audit ===\n');

  const staticRoutes = findAllRoutes();
  const linkMap = scanContentLinks();
  const knownRoutes = getKnownRoutes(staticRoutes);

  const brokenLinks = new Set<string>();
  for (const links of linkMap.values()) {
    for (const link of links) {
      if (
        link.startsWith('/') &&
        !link.startsWith('//') &&
        !link.startsWith('/api/') &&
        !knownRoutes.has(link)
      ) {
        brokenLinks.add(link);
      }
    }
  }

  console.log(`Broken internal links: ${brokenLinks.size}`);
  if (brokenLinks.size > 0) {
    for (const link of [...brokenLinks].sort()) console.log(`  ! ${link}`);
  }

  // Count incoming links for each route
  const incomingCount = new Map<string, number>();
  for (const route of staticRoutes) {
    incomingCount.set(route, 0);
  }

  // Add blog posts
  const posts = getAllPosts();
  for (const post of posts) {
    incomingCount.set(`/blog/${post.slug}`, 0);
  }

  for (const guide of getAllGuides()) incomingCount.set(`/guides/${guide.slug}`, 0);
  for (const form of getAllForms()) incomingCount.set(`/forms/${form.slug}`, 0);
  for (const country of getAllCountries()) incomingCount.set(`/countries/${country.slug}`, 0);
  for (const persona of getAllPersonas()) incomingCount.set(`/personas/${persona.slug}`, 0);
  for (const state of getAllStates()) incomingCount.set(`/state-taxes/${state.slug}`, 0);
  for (const page of FAQ_PAGES) incomingCount.set(`/faq/${page.slug}`, 0);
  for (const page of COMPARISON_PAGES) incomingCount.set(`/compare/${page.slug}`, 0);
  for (const { formSlug, countrySlug } of getAllFormCountrySlugs()) {
    incomingCount.set(`/forms/${formSlug}/${countrySlug}`, 0);
  }
  for (const { country, form } of getMatrixFormCountryParams()) incomingCount.set(`/countries/${country}/${form}`, 0);
  for (const { slug, country } of getPersonaCountryParams()) incomingCount.set(`/personas/${slug}/countries/${country}`, 0);
  for (const { state, service } of getStateServiceParams()) incomingCount.set(`/state-taxes/${state}/services/${service}`, 0);
  for (const slug of getAllVisaSlugs()) incomingCount.set(`/visas/${slug}`, 0);

  for (const [, links] of linkMap) {
    for (const link of links) {
      const current = incomingCount.get(link);
      if (current !== undefined) {
        incomingCount.set(link, current + 1);
      }
    }
  }

  // Find orphan pages (0-1 incoming links)
  const orphans: [string, number][] = [];
  for (const [route, count] of incomingCount) {
    if (count <= 1 && route !== '/' && !NON_SEO_ROUTES.has(route)) {
      orphans.push([route, count]);
    }
  }

  orphans.sort((a, b) => a[1] - b[1]);

  console.log(`Total pages tracked: ${incomingCount.size}`);
  console.log(`Pages with 0-1 incoming links: ${orphans.length}\n`);

  if (orphans.length > 0) {
    console.log('--- Orphan Pages (need more internal links) ---');
    for (const [route, count] of orphans) {
      console.log(`  ${count === 0 ? '!' : ' '} ${route} (${count} incoming links)`);
    }
  }

  // Summary stats
  console.log('\n--- Link Density ---');
  const totalLinks = Array.from(linkMap.values()).reduce((sum, links) => sum + links.length, 0);
  console.log(`  Total internal links found: ${totalLinks}`);
  console.log(`  Average links per page: ${(totalLinks / linkMap.size).toFixed(1)}`);

  console.log('\n--- Pages with most outgoing links ---');
  const sorted = Array.from(linkMap.entries()).sort((a, b) => b[1].length - a[1].length);
  for (const [page, links] of sorted.slice(0, 10)) {
    console.log(`  ${page}: ${links.length} links`);
  }

  console.log('\nAudit complete.');
}

audit();
