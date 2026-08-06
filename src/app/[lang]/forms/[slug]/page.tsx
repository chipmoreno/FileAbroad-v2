import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import MarkdownContent from '@/components/blog/MarkdownContent';
import PageShell from '@/components/layout/PageShell';
import Breadcrumbs from '@/components/seo/Breadcrumbs';
import JsonLd from '@/components/seo/JsonLd';
import CTASection from '@/components/layout/CTASection';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Calendar, User } from '@/components/icons';
import {
  getFormBySlug,
  formHasTranslation,
  getFormAvailableLocales,
} from '@/lib/forms';
import { getPostBySlug, formatDate, postHasTranslation } from '@/lib/blog';
import { getGuideBySlug, guideHasTranslation } from '@/lib/guides';
import { buildFAQSchema, buildArticleSchema } from '@/lib/structured-data';
import { extractLocale } from '@/lib/i18n/metadata';
import { getCanonicalUrl, localizePath } from '@/lib/i18n/utils';
import { defaultLocale } from '@/lib/i18n/config';

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, lang } = await params;
  const locale = extractLocale({ lang });
  const form = getFormBySlug(slug, locale);

  if (!form) {
    return { title: 'Form Not Found' };
  }

  const hasLocalizedContent = locale === defaultLocale || formHasTranslation(slug, locale);
  const canonical = getCanonicalUrl(`/forms/${slug}`, hasLocalizedContent ? locale : defaultLocale);
  const languages: Record<string, string> = {};
  for (const availableLocale of getFormAvailableLocales(slug)) {
    languages[availableLocale === defaultLocale ? 'en-us' : availableLocale] = getCanonicalUrl(`/forms/${slug}`, availableLocale);
  }
  languages['x-default'] = getCanonicalUrl(`/forms/${slug}`, defaultLocale);

  return {
    title: form.title,
    description: form.description,
    authors: [{ name: form.author }],
    alternates: { canonical, languages },
    robots: hasLocalizedContent ? { index: true, follow: true } : { index: false, follow: true },
    openGraph: {
      title: form.title,
      description: form.description,
      type: 'article',
      publishedTime: form.lastUpdated,
      authors: [form.author],
      tags: form.tags,
      url: canonical,
    },
  };
}

export default async function FormPage({ params }: Props) {
  const { slug, lang } = await params;
  const locale = extractLocale({ lang });
  const form = getFormBySlug(slug, locale);

  if (!form) {
    notFound();
  }

  const relatedPosts = form.relatedBlogSlugs
    .filter((blogSlug) => locale === defaultLocale || postHasTranslation(blogSlug, locale))
    .map((blogSlug) => getPostBySlug(blogSlug, locale))
    .filter((post) => post && !post.reviewRequired);
  const relatedGuides = form.relatedGuideSlugs
    .filter((guideSlug) => locale === defaultLocale || guideHasTranslation(guideSlug, locale))
    .map((guideSlug) => getGuideBySlug(guideSlug, locale))
    .filter((guide) => guide && !guide.reviewRequired);

  const schemas: Record<string, unknown>[] = [];

  if (form.faqs.length > 0) {
    schemas.push(buildFAQSchema(form.faqs));
  }

  schemas.push(
    buildArticleSchema({
      title: form.title,
      description: form.description,
      author: form.author,
      datePublished: form.lastUpdated,
      url: localizePath(`/forms/${slug}`, locale),
    })
  );

  const l = (path: string) => localizePath(path, locale);
  const labels = locale === 'es'
    ? {
      taxForms: 'Formularios fiscales', updated: 'Actualizado', irsForm: 'Formulario IRS',
      educational: 'Información educativa únicamente — no es asesoramiento fiscal o legal individualizado. Las reglas, umbrales y procedimientos de las agencias pueden cambiar; verifica la guía oficial vigente. El alcance estándar de FileAbroad excluye opiniones legales, determinaciones de voluntad, posiciones basadas en tratados, representación en auditorías y formularios internacionales de alto riesgo sin supervisión.',
      faq: 'Preguntas frecuentes', relatedGuides: 'Guías relacionadas', relatedArticles: 'Artículos relacionados', relatedServices: 'Servicios relacionados',
      needHelp: '¿Necesitas ayuda con este formulario?', needHelpDescription: 'FileAbroad prepara los formularios aceptados dentro de un alcance escrito. Inicia la admisión para hablar sobre tu situación.', startFiling: 'Iniciar mi declaración',
    }
    : locale === 'pt'
      ? {
        taxForms: 'Formulários fiscais', updated: 'Atualizado', irsForm: 'Formulário do IRS',
        educational: 'Informação educativa apenas — não é aconselhamento fiscal ou jurídico individualizado. Regras, limiares e procedimentos das agências podem mudar; confirme a orientação oficial atual. O âmbito padrão da FileAbroad exclui opiniões jurídicas, determinações de intenção, posições baseadas em tratados, representação em auditorias e formulários internacionais de alto risco sem supervisão.',
        faq: 'Perguntas frequentes', relatedGuides: 'Guias relacionados', relatedArticles: 'Artigos relacionados', relatedServices: 'Serviços relacionados',
        needHelp: 'Precisa de ajuda com este formulário?', needHelpDescription: 'A FileAbroad prepara formulários aceites dentro de um âmbito escrito. Comece a admissão para discutir a sua situação.', startFiling: 'Iniciar a minha declaração',
      }
      : {
        taxForms: 'Tax Forms', updated: 'Updated', irsForm: 'IRS Form',
        educational: 'Educational information only—not individualized tax or legal advice. Rules, thresholds, and agency procedures can change after publication; verify current official guidance. FileAbroad\'s standard preparation scope excludes legal opinions, willfulness determinations, treaty-based positions, audit representation, and unsupervised high-risk international forms.',
        faq: 'Frequently Asked Questions', relatedGuides: 'Related Guides', relatedArticles: 'Related Articles', relatedServices: 'Related Services',
      needHelp: 'Need Help With This Form?', needHelpDescription: 'FileAbroad prepares accepted forms within a written scope. Book a consultation to discuss your situation.', startFiling: 'Book a consultation',
      };

  return (
    <PageShell locale={locale}>
      <article className="mx-auto max-w-6xl px-6">
        <Breadcrumbs
          items={[
            { label: labels.taxForms, href: l('/forms') },
            { label: form.formNumber, href: l(`/forms/${slug}`) },
          ]}
        />

        {/* Header */}
        <header className="mb-10 max-w-4xl border-b border-border pb-10">
          <Badge className="mb-4 border-0 bg-accent text-accent-foreground">
            {form.category}
          </Badge>
          <h1 className="font-sans text-3xl font-bold leading-tight text-foreground md:text-4xl lg:text-5xl">
            {form.title}
          </h1>
          <p className="mb-6 mt-4 max-w-3xl text-xl text-muted-foreground">
            {form.description}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <User className="h-5 w-5" />
              {form.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
            {labels.updated} {formatDate(form.lastUpdated, locale)}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              {form.readingTime}
            </span>
          </div>
        </header>

        <aside className="mb-8 max-w-4xl border-l-4 border-secondary bg-surface-elevated p-5 md:p-6">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">
            {labels.irsForm} {form.formNumber}
          </p>
          <p className="mt-2 text-lg font-semibold leading-relaxed text-foreground">
            {form.formName}
          </p>
        </aside>

        <aside className="mb-8 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-relaxed text-amber-950">
          {labels.educational}
        </aside>

        {/* Content */}
        <div className="prose prose-lg prose-fileabroad max-w-none">
          <MarkdownContent source={form.content} locale={locale} />
        </div>

        {/* FAQs */}
        {form.faqs.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-6 font-sans text-2xl font-bold text-foreground">
              {labels.faq}
            </h2>
            <div className="space-y-4">
              {form.faqs.map((faq, i) => (
                <Card key={i} className="border-border">
                  <CardContent className="p-5">
                    <h3 className="mb-2 font-semibold text-foreground">
                      {faq.question}
                    </h3>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Related Guides */}
        {relatedGuides.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-6 font-sans text-2xl font-bold text-foreground">
              {labels.relatedGuides}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedGuides.map((guide) => (
                <Link key={guide!.slug} href={l(`/guides/${guide!.slug}`)} className="group">
                  <Card className="h-full border-border transition-colors hover:border-secondary/50">
                    <CardContent className="p-5">
                      <h3 className="font-semibold leading-snug text-foreground transition-colors group-hover:text-secondary">
                        {guide!.title}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-6 font-sans text-2xl font-bold text-foreground">
              {labels.relatedArticles}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedPosts.map((post) => (
                <Link key={post!.slug} href={l(`/blog/${post!.slug}`)} className="group">
                  <Card className="h-full border-border transition-colors hover:border-secondary/50">
                    <CardContent className="p-5">
                      <p className="mb-2 text-sm text-muted-foreground">
                        {formatDate(post!.date, locale)}
                      </p>
                      <h3 className="font-semibold leading-snug text-foreground transition-colors group-hover:text-secondary">
                        {post!.title}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Service links */}
        {form.relatedServiceSlugs.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-4 font-sans text-2xl font-bold text-foreground">
            {labels.relatedServices}
            </h2>
            <div className="flex flex-wrap gap-3">
              {form.relatedServiceSlugs.map((serviceSlug) => (
                <Link
                  key={serviceSlug}
                  href={l(`/services/${serviceSlug}`)}
                  className="inline-flex items-center gap-2 rounded-lg bg-surface-elevated px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  {serviceSlug
                    .replace(/-/g, ' ')
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      <CTASection
        title={labels.needHelp}
        description={labels.needHelpDescription}
        buttonText={labels.startFiling}
        buttonHref={locale === 'es' || locale === 'pt' ? l('/intake') : l('/consultation')}
      />

      {/* Structured Data */}
      {schemas.map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}
    </PageShell>
  );
}
