'use client';

import { useEffect, useState } from 'react';

const CONSENT_KEY = 'fileabroad_analytics_consent';

export default function AnalyticsConsent() {
  const [visible, setVisible] = useState(false);
  const measurementId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;

  useEffect(() => {
    if (!measurementId) return;
    const timer = window.setTimeout(() => {
      setVisible(!window.localStorage.getItem(CONSENT_KEY));
    }, 1800);
    return () => window.clearTimeout(timer);
  }, [measurementId]);

  if (!visible || !measurementId) return null;

  function choose(granted: boolean) {
    window.localStorage.setItem(CONSENT_KEY, granted ? 'granted' : 'denied');
    window.gtag?.('consent', 'update', {
      analytics_storage: granted ? 'granted' : 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
    });
    setVisible(false);
  }

  return (
    <aside
      aria-label="Analytics preference"
      className="fixed inset-x-0 bottom-0 z-[60] border-t border-border bg-primary px-4 py-3 text-primary-foreground shadow-lg"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <p className="max-w-3xl text-sm text-primary-foreground/80">
        <strong className="text-white">Optional analytics.</strong> We measure page and funnel events; tax answers and contact details are never included.
      </p>
      <div className="flex shrink-0 gap-2">
        <button
          type="button"
          onClick={() => choose(true)}
          className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-primary"
        >
          Accept analytics
        </button>
        <button
          type="button"
          onClick={() => choose(false)}
          className="rounded-md border border-white/40 px-4 py-2 text-sm font-semibold text-white"
        >
          Decline
        </button>
      </div>
      </div>
    </aside>
  );
}
