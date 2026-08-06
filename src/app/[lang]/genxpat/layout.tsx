import { Metadata } from "next";
import { extractLocale } from "@/lib/i18n/metadata";
import { getCanonicalUrl } from "@/lib/i18n/utils";

interface GenXPatLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: Pick<GenXPatLayoutProps, 'params'>): Promise<Metadata> {
  const { lang } = await params;
  const locale = extractLocale({ lang });
  const canonical = getCanonicalUrl('/genxpat', locale);

  return {
    title: "GenXPat Expat Tax Intake",
    description:
      "GenXPat referral intake form for U.S. expat tax filing help from FileAbroad.",
    alternates: { canonical },
    openGraph: {
      title: "GenXPat Expat Tax Intake | FileAbroad",
      description:
        "GenXPat referral intake form for U.S. expat tax filing help from FileAbroad.",
      url: canonical,
    },
    robots: { index: false, follow: true },
  };
}

export default function GenXPatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
