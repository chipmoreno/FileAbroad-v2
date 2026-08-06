'use client';

import { useEffect, useRef, useState } from 'react';
import { trackConversionEvent } from '@/components/analytics/ConversionTracking';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const milestones = useRef(new Set<number>());

  useEffect(() => {
    const update = () => {
      const article = document.querySelector('article');
      if (!article) return;
      const rect = article.getBoundingClientRect();
      const readable = Math.max(1, article.scrollHeight - window.innerHeight);
      const nextProgress = Math.min(100, Math.max(0, (-rect.top / readable) * 100));
      setProgress(nextProgress);
      for (const depth of [50, 90]) {
        if (nextProgress >= depth && !milestones.current.has(depth)) {
          milestones.current.add(depth);
          trackConversionEvent('article_scroll', {
            page_path: window.location.pathname,
            depth,
          });
        }
      }
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-x-0 top-[73px] z-30 h-0.5 bg-transparent">
      <div className="h-full bg-secondary" style={{ width: `${progress}%` }} />
    </div>
  );
}
