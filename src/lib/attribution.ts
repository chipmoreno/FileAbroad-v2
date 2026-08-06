'use client';

const STORAGE_KEY = 'fileabroad_attribution_v1';
const MAX_VALUE_LENGTH = 200;

export interface AttributionSnapshot {
  firstLandingPage?: string;
  firstReferrer?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmContent?: string;
  utmTerm?: string;
  capturedAt?: string;
}

function trimValue(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed.slice(0, MAX_VALUE_LENGTH) : undefined;
}

function safePath(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    const url = new URL(value, window.location.origin);
    return trimValue(`${url.origin}${url.pathname}`);
  } catch {
    return undefined;
  }
}

function readSnapshot(): AttributionSnapshot {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as AttributionSnapshot;
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function writeSnapshot(snapshot: AttributionSnapshot): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    // Attribution is helpful but must never block navigation or intake.
  }
}

export function captureAttribution(): AttributionSnapshot {
  if (typeof window === 'undefined') return {};

  const existing = readSnapshot();
  const params = new URLSearchParams(window.location.search);
  const snapshot: AttributionSnapshot = {
    firstLandingPage: existing.firstLandingPage || safePath(window.location.href),
    firstReferrer: existing.firstReferrer || safePath(document.referrer),
    utmSource: existing.utmSource || trimValue(params.get('utm_source') || undefined),
    utmMedium: existing.utmMedium || trimValue(params.get('utm_medium') || undefined),
    utmCampaign: existing.utmCampaign || trimValue(params.get('utm_campaign') || undefined),
    utmContent: existing.utmContent || trimValue(params.get('utm_content') || undefined),
    utmTerm: existing.utmTerm || trimValue(params.get('utm_term') || undefined),
    capturedAt: existing.capturedAt || new Date().toISOString(),
  };

  writeSnapshot(snapshot);
  return snapshot;
}

export function getAttributionSnapshot(): AttributionSnapshot {
  if (typeof window === 'undefined') return {};
  return readSnapshot();
}

export function getAttributionFields(): Record<string, string> {
  const snapshot = getAttributionSnapshot();
  const fields: Record<string, string> = {};
  const values: Array<[string, string | undefined]> = [
    ['Marketing - First Landing Page', snapshot.firstLandingPage],
    ['Marketing - First Referrer', snapshot.firstReferrer],
    ['Marketing - UTM Source', snapshot.utmSource],
    ['Marketing - UTM Medium', snapshot.utmMedium],
    ['Marketing - UTM Campaign', snapshot.utmCampaign],
    ['Marketing - UTM Content', snapshot.utmContent],
    ['Marketing - UTM Term', snapshot.utmTerm],
    ['Marketing - Attribution Captured At', snapshot.capturedAt],
  ];

  for (const [key, value] of values) {
    if (value) fields[key] = value;
  }

  return fields;
}

export function getAttributionProperties(): Record<string, string> {
  const snapshot = getAttributionSnapshot();
  return Object.fromEntries(
    [
      ['first_landing_page', snapshot.firstLandingPage],
      ['first_referrer', snapshot.firstReferrer],
      ['utm_source', snapshot.utmSource],
      ['utm_medium', snapshot.utmMedium],
      ['utm_campaign', snapshot.utmCampaign],
      ['utm_content', snapshot.utmContent],
      ['utm_term', snapshot.utmTerm],
    ].filter(([, value]) => value) as [string, string][]
  );
}
