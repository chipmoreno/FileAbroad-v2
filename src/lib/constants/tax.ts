/**
 * Versioned tax facts used by calculators and editorial checks.
 *
 * `taxYear` identifies the return year. `filingSeason` identifies the year in
 * which that return is generally filed. Penalty figures are keyed by the date
 * the civil penalty is assessed, not by the FBAR reporting year.
 *
 * Do not change a value without updating its source and reviewedOn date.
 */

export const TAX_FACT_SOURCES = {
  feie2025: 'https://www.irs.gov/pub/irs-drop/rp-24-40.pdf',
  feie2026: 'https://www.irs.gov/pub/irs-drop/rp-25-32.pdf',
  filingThresholds2025: 'https://www.irs.gov/individuals/check-if-you-need-to-file-a-tax-return',
  freeFile2025: 'https://www.irs.gov/filing/irs-free-file-do-your-taxes-for-free',
  expatExtension: 'https://www.irs.gov/faqs/irs-procedures/extensions/extensions',
  fbarPenalties2025: 'https://www.federalregister.gov/documents/2025/01/17/2025-00896/inflation-adjustment-of-civil-monetary-penalties',
} as const;

export const TAX_YEAR_FACTS = {
  2025: {
    taxYear: 2025,
    filingSeason: 2026,
    reviewedOn: '2026-07-22',
    feieLimit: 130_000,
    housingBase: 20_800,
    housingGeneralMaximum: 39_000,
    standardDeduction: {
      singleUnder65: 15_750,
      headOfHouseholdUnder65: 23_625,
      marriedFilingJointlyBothUnder65: 31_500,
    },
    freeFileAgiLimit: 89_000,
    filingDeadlines: {
      standard: 'April 15, 2026',
      taxpayerAbroadAutomatic: 'June 15, 2026',
      extended: 'October 15, 2026',
      fbarAutomaticExtended: 'October 15, 2026',
    },
  },
  2026: {
    taxYear: 2026,
    filingSeason: 2027,
    reviewedOn: '2026-07-22',
    feieLimit: 132_900,
    housingBase: 21_264,
    housingGeneralMaximum: 39_870,
  },
} as const;

export const CIVIL_PENALTY_FACTS = {
  assessedOnOrAfter2025January17: {
    reviewedOn: '2026-07-22',
    fbarNonWillfulMaximum: 16_536,
    fbarWillfulMaximum: 165_353,
  },
} as const;

export const CURRENT_FILING_TAX_YEAR = 2025;
export const CURRENT_TAX_FACTS = TAX_YEAR_FACTS[CURRENT_FILING_TAX_YEAR];

// Named exports keep component code readable while the structured object
// remains the canonical record.
export const FEIE_LIMIT_2025 = TAX_YEAR_FACTS[2025].feieLimit;
export const FEIE_LIMIT_2026 = TAX_YEAR_FACTS[2026].feieLimit;
export const HOUSING_BASE_2025 = TAX_YEAR_FACTS[2025].housingBase;
export const HOUSING_BASE_2026 = TAX_YEAR_FACTS[2026].housingBase;
export const HOUSING_MAX_GENERAL_2025 = TAX_YEAR_FACTS[2025].housingGeneralMaximum;
export const STANDARD_DEDUCTION_SINGLE_2025 = TAX_YEAR_FACTS[2025].standardDeduction.singleUnder65;
export const STANDARD_DEDUCTION_HOH_2025 = TAX_YEAR_FACTS[2025].standardDeduction.headOfHouseholdUnder65;
export const STANDARD_DEDUCTION_MFJ_2025 = TAX_YEAR_FACTS[2025].standardDeduction.marriedFilingJointlyBothUnder65;
export const FREE_FILE_AGI_LIMIT_2025 = TAX_YEAR_FACTS[2025].freeFileAgiLimit;

// FBAR (FinCEN 114)
export const FBAR_THRESHOLD = 10_000;
export const FBAR_PENALTY_NONWILLFUL_2025 = CIVIL_PENALTY_FACTS.assessedOnOrAfter2025January17.fbarNonWillfulMaximum;
export const FBAR_PENALTY_WILLFUL_2025 = CIVIL_PENALTY_FACTS.assessedOnOrAfter2025January17.fbarWillfulMaximum;

// Form 8938 (FATCA, filing from abroad)
export const FORM_8938_SINGLE_YEAR_END = 200_000;
export const FORM_8938_SINGLE_ANY_TIME = 300_000;
export const FORM_8938_MFJ_YEAR_END = 400_000;
export const FORM_8938_MFJ_ANY_TIME = 600_000;

// Self-employment tax
export const SE_TAX_RATE = 0.153;

// Form 8854 covered-expatriate net-worth test
export const EXPATRIATION_NET_WORTH = 2_000_000;

export const TAX_DEADLINE_STANDARD = 'April 15';
export const TAX_DEADLINE_EXPAT_AUTO = 'June 15';
export const TAX_DEADLINE_EXTENSION = 'October 15';
export const FBAR_DEADLINE_AUTO_EXTENDED = 'October 15';

export const formatUSD = (n: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n);
