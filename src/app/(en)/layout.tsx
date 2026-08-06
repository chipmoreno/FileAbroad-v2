import '../globals.css';
import RootDocument from '@/components/layout/RootDocument';
import { rootMetadata, rootViewport } from '@/lib/root-metadata';

export const metadata = rootMetadata;
export const viewport = rootViewport;

export default function EnglishRootLayout({ children }: { children: React.ReactNode }) {
  return <RootDocument locale="en">{children}</RootDocument>;
}
