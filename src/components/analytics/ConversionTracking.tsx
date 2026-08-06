'use client';

import { useEffect } from 'react';
import { captureAttribution, getAttributionProperties } from '@/lib/attribution';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

type EventProperties = Record<string, string | number | boolean | undefined>;

export function trackConversionEvent(
  eventName: string,
  properties: EventProperties = {}
) {
  const safeProperties = Object.fromEntries(
    Object.entries(properties).filter(([, value]) => value !== undefined)
  ) as Record<string, string | number | boolean>;
  const enrichedProperties = {
    ...safeProperties,
    ...getAttributionProperties(),
  };
  window.gtag?.('event', eventName, enrichedProperties);
}

export async function getGaClientId(): Promise<string | undefined> {
  const measurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
  if (!measurementId || !window.gtag) return undefined;

  return new Promise((resolve) => {
    const timeout = window.setTimeout(() => resolve(undefined), 400);
    window.gtag?.('get', measurementId, 'client_id', (clientId: unknown) => {
      window.clearTimeout(timeout);
      resolve(typeof clientId === 'string' ? clientId : undefined);
    });
  });
}

function getIntent(pathname: string) {
  if (pathname.includes('fbar')) return 'fbar';
  if (pathname.includes('fatca') || pathname.includes('8938')) return 'fatca';
  if (pathname.includes('streamlined') || pathname.includes('catch-up')) return 'streamlined';
  if (pathname.includes('feie') || pathname.includes('2555')) return 'feie';
  if (pathname.includes('pricing')) return 'pricing';
  return 'general_expat_tax';
}

function getPageCluster(pathname: string) {
  const sourcePath = pathname.replace(/^\/(es|pt|fr|de|it|nl|ja|zh)(?=\/|$)/, '') || '/';
  if (sourcePath.startsWith('/blog/')) return 'blog';
  if (sourcePath.startsWith('/guides')) return 'guide';
  if (sourcePath.startsWith('/forms')) return 'form';
  if (sourcePath.startsWith('/tools/')) return 'tool';
  if (sourcePath.startsWith('/services')) return 'service';
  if (sourcePath.startsWith('/countries')) return 'country';
  if (sourcePath.startsWith('/state-taxes')) return 'state_tax';
  if (sourcePath.startsWith('/personas')) return 'persona';
  if (sourcePath.startsWith('/intake')) return 'intake';
  return 'sitewide';
}

export default function ConversionTracking() {
  useEffect(() => {
    captureAttribution();
    const trackedImpressions = new WeakSet<Element>();

    function getElementProperties(element?: HTMLElement) {
      return {
        site: 'fileabroad',
        page_path: window.location.pathname,
        page_cluster: getPageCluster(window.location.pathname),
        locale: window.location.pathname.match(/^\/(es|pt|fr|de|it|nl|ja|zh)(?:\/|$)/)?.[1] || 'en',
        cta_location: element?.dataset.ctaLocation,
        tool: element?.dataset.tool,
        source_type: element?.dataset.sourceType,
        form_name: element?.dataset.formName,
      };
    }

    function trackMeasuredElement(element: HTMLElement, eventName: string) {
      trackConversionEvent(eventName, getElementProperties(element));
    }

    function handleClick(event: MouseEvent) {
      const element = event.target;
      if (!(element instanceof Element)) return;

      const measuredElement = element.closest<HTMLElement>('[data-analytics-event]');
      if (measuredElement?.dataset.analyticsEvent) {
        trackMeasuredElement(measuredElement, measuredElement.dataset.analyticsEvent);
      }

      const anchor = element.closest('a');
      if (!anchor) return;

      let url: URL;
      try {
        url = new URL(anchor.href);
      } catch {
        return;
      }

      const pagePath = window.location.pathname;
      if (url.origin === window.location.origin && url.pathname.startsWith('/intake')) {
        const intakeProperties = { ...getElementProperties(anchor), cta_location: anchor.dataset.ctaLocation || 'inline' };
        trackConversionEvent('intake_start', intakeProperties);
        if (pagePath.startsWith('/services')) {
          trackConversionEvent('service_view_to_intake', intakeProperties);
        }
        return;
      }

      if (url.origin === window.location.origin && url.pathname.startsWith('/payment/')) {
        const service = url.pathname.split('/').filter(Boolean).at(-1) || 'unknown';
        const checkoutProperties = {
          site: 'fileabroad',
          page_path: pagePath,
          locale: getElementProperties(anchor).locale,
          service,
          currency: 'USD',
        };
        trackConversionEvent('begin_checkout', checkoutProperties);
        return;
      }

      if (
        anchor.dataset.scheduling === 'true' ||
        ['calendly.com', 'cal.com'].some((host) => url.hostname.endsWith(host))
      ) {
        trackConversionEvent('schedule_click', {
          site: 'fileabroad',
          page_path: pagePath,
          locale: getElementProperties(anchor).locale,
          cta_location: anchor.dataset.ctaLocation || 'inline',
        });
        return;
      }

      if (!['wa.me', 'api.whatsapp.com'].includes(url.hostname)) return;

      const properties = {
        site: 'fileabroad',
        page_path: pagePath,
        locale: getElementProperties(anchor).locale,
        cta_location: anchor.dataset.ctaLocation || 'inline',
        intent: anchor.dataset.whatsappIntent || getIntent(pagePath),
      };

      trackConversionEvent('whatsapp_open', properties);
    }

    function handleFocus(event: FocusEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const form = target.closest<HTMLElement>('[data-analytics-form]');
      if (!form || form.dataset.analyticsStarted === 'true') return;
      form.dataset.analyticsStarted = 'true';
      trackMeasuredElement(form, 'form_start');
    }

    function handleSubmit(event: Event) {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const form = target.closest<HTMLElement>('[data-analytics-form]');
      if (!form) return;
      trackMeasuredElement(form, 'form_submit');
    }

    function handleInvalid(event: Event) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const form = target.closest<HTMLElement>('[data-analytics-form]');
      if (!form) return;
      trackMeasuredElement(form, 'form_validation_error');
    }

    const observer = typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver((entries) => {
          for (const entry of entries) {
            if (!entry.isIntersecting || trackedImpressions.has(entry.target)) continue;
            trackedImpressions.add(entry.target);
            const element = entry.target as HTMLElement;
            const eventName = element.dataset.analyticsImpression;
            if (eventName) trackMeasuredElement(element, eventName);
            observer?.unobserve(entry.target);
          }
        }, { threshold: 0.35 })
      : null;

    document.querySelectorAll<HTMLElement>('[data-analytics-impression]').forEach((element) => observer?.observe(element));

    document.addEventListener('click', handleClick, true);
    document.addEventListener('focusin', handleFocus, true);
    document.addEventListener('submit', handleSubmit, true);
    document.addEventListener('invalid', handleInvalid, true);
    return () => {
      document.removeEventListener('click', handleClick, true);
      document.removeEventListener('focusin', handleFocus, true);
      document.removeEventListener('submit', handleSubmit, true);
      document.removeEventListener('invalid', handleInvalid, true);
      observer?.disconnect();
    };
  }, []);

  return null;
}
