import type { ReactNode } from 'react';

// Service pages share a content-heavy editorial template. Keep them
// indexable at runtime instead of making every service variant compete for a
// constrained static-generation worker during deployment builds.
export const dynamic = 'force-dynamic';

export default function ServicesLayout({ children }: { children: ReactNode }) {
  return children;
}
