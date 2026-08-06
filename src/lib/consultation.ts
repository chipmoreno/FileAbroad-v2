export type ConsultationPathway = 'general' | 'pfic' | 'streamlined' | 'business-abroad';

export interface ConsultationPathwayData {
  slug: ConsultationPathway;
  label: string;
  title: string;
  description: string;
  questions: string[];
}

export const consultationPathways: ConsultationPathwayData[] = [
  {
    slug: 'general',
    label: 'General consultation',
    title: 'Get a written scope for your U.S. expat tax situation',
    description: 'Start with a focused consultation when your income, accounts, filing history, or move makes the next step difficult to identify.',
    questions: [
      'Which years and returns may need attention?',
      'Which forms, accounts, or income sources should be reviewed?',
      'Is FileAbroad the right fit, or is another professional needed?',
    ],
  },
  {
    slug: 'pfic',
    label: 'PFIC consultation',
    title: 'Review foreign funds before PFIC reporting becomes a surprise',
    description: 'Use this path if you hold foreign mutual funds, ETFs, unit trusts, insurance products, or pension investments and need to map the Form 8621 questions.',
    questions: [
      'Which holdings may be PFICs and how are they owned?',
      'Are annual information statements available for an election?',
      'Which years and transactions need to be gathered before a scope can be written?',
    ],
  },
  {
    slug: 'streamlined',
    label: 'Streamlined consultation',
    title: 'Map your catch-up filing path before preparing anything',
    description: 'Use this path when you may need Streamlined Foreign Offshore Procedures, prior returns, FBARs, or a careful review of facts that FileAbroad cannot decide for you.',
    questions: [
      'Which filing years and FBAR periods are potentially incomplete?',
      'What facts and records are available for the required certification?',
      'Is a tax attorney or other representative needed before filing?',
    ],
  },
  {
    slug: 'business-abroad',
    label: 'Business abroad consultation',
    title: 'Scope foreign business and entity reporting before filing',
    description: 'Use this path if you own or operate a foreign company, partnership, online business, or investment vehicle and need to identify the reporting questions first.',
    questions: [
      'What entity classification and ownership facts need to be documented?',
      'Could Forms 5471, 8858, 8865, 8992, or related schedules be involved?',
      'Which accounting records and translated statements are available?',
    ],
  },
];

export function getConsultationPathway(slug?: string): ConsultationPathwayData {
  return consultationPathways.find((pathway) => pathway.slug === slug) || consultationPathways[0];
}

export function getConsultationBookingHref(pathway: ConsultationPathway = 'general'): string {
  const configuredUrl = process.env.NEXT_PUBLIC_CONSULTATION_BOOKING_URL;
  if (configuredUrl) {
    const url = new URL(configuredUrl);
    url.searchParams.set('pathway', pathway);
    return url.toString();
  }
  return `/intake?service=consultation&pathway=${pathway}`;
}
