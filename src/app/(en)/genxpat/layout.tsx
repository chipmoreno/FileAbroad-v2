import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GenXPat Expat Tax Intake",
  description:
    "GenXPat referral intake form for U.S. expat tax filing help from FileAbroad.",
  alternates: {
    canonical: "https://fileabroad.com/genxpat",
  },
  openGraph: {
    title: "GenXPat Expat Tax Intake",
    description:
      "GenXPat referral intake form for U.S. expat tax filing help from FileAbroad.",
    url: "https://fileabroad.com/genxpat",
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function GenXPatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
