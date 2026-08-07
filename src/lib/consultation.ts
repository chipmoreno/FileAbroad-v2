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
    title: 'Map Your Expat Filing Situation Before You Spend a Dollar on Preparation',
    description: 'Most expats either over-file or under-file. In a paid consultation, I review your country, income, accounts, and filing history to map exactly what is required — and what is not — before any preparation work begins.',
    questions: [
      'Which years and returns may need attention?',
      'Which forms, accounts, or income sources should be reviewed?',
      'Is FileAbroad the right fit, or is another professional needed?',
    ],
  },
  {
    slug: 'pfic',
    label: 'PFIC consultation',
    title: 'Foreign Funds and PFICs: The Surprise Tax Bill Most Expats Never See Coming',
    description: 'Foreign mutual funds, ETFs, and pension investments can trigger PFIC rules and Form 8621 — often with harsh tax consequences. If you hold foreign investment products, use this paid consultation path to map the reporting questions before they become a problem.',
    questions: [
      'Which holdings may be PFICs and how are they owned?',
      'Are annual information statements available for an election?',
      'Which years and transactions need to be gathered before a scope can be written?',
    ],
  },
  {
    slug: 'streamlined',
    label: 'Streamlined consultation',
    title: 'The Penalty-Free Catch-Up Window: Do You Qualify?',
    description: 'The IRS Streamlined program allows some expats to file past returns without certain penalties — but eligibility is strict and the certification is your responsibility. In a paid consultation, I review your facts to see if this path fits and what records you will need.',
    questions: [
      'Which filing years and FBAR periods are potentially incomplete?',
      'What facts and records are available for the required certification?',
      'Is a tax attorney or other representative needed before filing?',
    ],
  },
  {
    slug: 'business-abroad',
    label: 'Business abroad consultation',
    title: 'Own a Business Abroad? The Reporting Rules Are a Minefield.',
    description: 'Foreign companies, partnerships, and online businesses can trigger Forms 5471, 8858, 8865, and 8992 — often without the owner realizing it. In a paid consultation, I identify the entity and ownership questions that must be answered before any return can be prepared.',
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
