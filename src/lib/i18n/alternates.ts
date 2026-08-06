import localeAvailability from '../../../content/locale-availability.json';

const localizedStaticPaths = new Set(localeAvailability.localizedStaticPaths);
const localizedToolSlugs = new Set(localeAvailability.localizedToolSlugs);

export function hasCompleteLocalizedFamily(pathname: string): boolean {
  const normalized = pathname.replace(/\/$/, '') || '/';
  if (localizedStaticPaths.has(normalized)) return true;

  const toolMatch = normalized.match(/^\/tools\/([^/]+)$/);
  return Boolean(toolMatch && localizedToolSlugs.has(toolMatch[1]));
}
