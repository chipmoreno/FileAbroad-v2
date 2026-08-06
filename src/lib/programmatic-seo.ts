// Programmatic SEO data layer for form+country and visa+country combinations.
// Each entry includes location-specific guidance to produce genuinely useful pages
// rather than thin, duplicate content.

export interface FormCountryEntry {
  formSlug: string;
  countrySlug: string;
  title: string;
  description: string;
  heading: string;
  introduction: string;
  specificGuidance: string[];
  commonMistakes: string[];
  filingTips: string[];
  faqs: { question: string; answer: string }[];
}

export interface VisaEntry {
  slug: string;
  title: string;
  description: string;
  visaName: string;
  overview: string;
  eligibilityCriteria: string[];
  taxImplications: string;
  countrySlugs: string[];
  countrySpecificNotes: Record<string, string>;
  faqs: { question: string; answer: string }[];
  officialSources?: { label: string; href: string }[];
}

// ── Form + Country Combinations ─────────────────────────────────────────────

export const PROGRAMMATIC_FORM_COUNTRIES: FormCountryEntry[] = [
  {
    formSlug: '8621',
    countrySlug: 'uk',
    title: 'Form 8621 for Americans in the UK: PFIC Reporting for UK ISAs & Funds',
    description:
      'How to file Form 8621 from the UK. Learn which UK investments are PFICs, including ISAs, OEICs, and unit trusts, and how to make QEF or mark-to-market elections.',
    heading: 'Form 8621 & PFIC Reporting for Americans in the UK',
    introduction:
      'The United Kingdom is one of the most popular destinations for American expats, but it is also a PFIC minefield. UK Individual Savings Accounts (ISAs), Open-Ended Investment Companies (OEICs), and unit trusts are almost always PFICs. If you hold these investments, you must file Form 8621 and choose a tax regime — or face punitive excess distribution taxation. This guide explains how UK-specific investment structures map to US PFIC rules.',
    specificGuidance: [
      'UK ISAs (Cash ISAs, Stocks & Shares ISAs, Lifetime ISAs) are not recognized by the US and do not receive tax-free treatment. Stocks & Shares ISAs that hold UK funds are PFICs.',
      'UK OEICs and unit trusts are pooled investment vehicles organized in the UK. Because they are foreign corporations that meet the passive income or asset test, they are PFICs.',
      'UK investment platforms (Hargreaves Lansdown, AJ Bell, Interactive Investor) do not provide US tax forms or Annual Information Statements. Without an AIS, you cannot make a QEF election.',
      'The UK-US tax treaty does not override PFIC rules. Treaty benefits do not eliminate Form 8621 filing or the PFIC tax regimes.',
      'UK pension funds (SIPPs, workplace pensions) may hold PFICs internally. The pension wrapper may protect you from immediate PFIC taxation, but the analysis is complex and depends on whether the pension is treated as a trust or an employment pension under US rules.',
    ],
    commonMistakes: [
      'Assuming UK ISAs are tax-free for US purposes — they are not. Income and gains inside a Stocks & Shares ISA are taxable in the US.',
      'Failing to file Form 8621 for UK unit trusts because they are called "funds" rather than "corporations."',
      'Attempting a QEF election without the Annual Information Statement, which UK funds almost never provide.',
      'Overlooking PFICs inside UK pension wrappers, which may trigger indirect ownership rules.',
    ],
    filingTips: [
      'If you hold UK OEICs or unit trusts that are publicly traded, consider the mark-to-market election to avoid the excess distribution method.',
      'Keep detailed records of all purchases, sales, dividends, and distributions for every UK fund you hold.',
      'If you have a UK SIPP, consult a specialist to determine whether the pension wrapper protects you from PFIC attribution.',
      'File Form 8621 with your Form 1040 by the extended due date for taxpayers abroad.',
    ],
    faqs: [
      {
        question: 'Is my UK ISA a PFIC?',
        answer:
          'The ISA wrapper itself is not a PFIC, but the investments inside a Stocks & Shares ISA may be. If your ISA holds UK OEICs, unit trusts, or foreign ETFs, those underlying investments are PFICs. Cash ISAs are not PFICs but must still be reported on FBAR and possibly Form 8938.',
      },
      {
        question: 'Can I make a QEF election for a UK unit trust?',
        answer:
          'Only if the fund provides an Annual Information Statement (AIS). Most UK OEICs and unit trusts do not provide AISs because they are not structured for US tax compliance. Without an AIS, your only elections are mark-to-market (if publicly traded) or the default excess distribution method.',
      },
      {
        question: 'Does the UK-US tax treaty eliminate PFIC rules?',
        answer:
          'No. The UK-US tax treaty does not override the PFIC provisions of the Internal Revenue Code. Treaty benefits may reduce withholding tax on dividends and interest, but they do not change the PFIC classification or filing requirements.',
      },
    ],
  },
  {
    formSlug: '5471',
    countrySlug: 'mexico',
    title: 'Form 5471 for Americans in Mexico: CFC Reporting for Business Owners',
    description:
      'How to file Form 5471 from Mexico. Learn the CFC rules, GILTI calculations, and Subpart F income inclusions for US business owners with Mexican corporations.',
    heading: 'Form 5471 & CFC Reporting for Americans with Mexican Corporations',
    introduction:
      'Mexico is the most popular destination for American expats, and many start businesses there — restaurants, real estate companies, consulting firms, and e-commerce operations. If you own 10% or more of a Mexican corporation, you likely have CFC reporting obligations via Form 5471. This guide explains how Mexican corporate structures interact with US CFC, GILTI, and Subpart F rules.',
    specificGuidance: [
      'Mexican corporations (Sociedad Anónima, S. de R.L., S.A.P.I.) are foreign corporations for US tax purposes. If US persons collectively own more than 50% and each owns at least 10%, the corporation is a CFC.',
      'Mexico has a Totalization Agreement with the US, which may exempt you from US self-employment tax if you pay into IMSS. However, the Totalization Agreement does not affect CFC or GILTI rules.',
      'Mexican corporate tax rates (30% federal) are lower than US rates, which means GILTI inclusions are common for profitable Mexican CFCs.',
      'If your Mexican corporation provides services to US clients, the income may be foreign base company services income under Subpart F, triggering current inclusion even if no distributions are made.',
      'Mexican real estate held through a corporation creates CFC status if US ownership thresholds are met. Rental income may be passive income subject to Subpart F.',
    ],
    commonMistakes: [
      'Assuming a Mexican LLC (S. de R.L.) is treated as a disregarded entity for US tax — it may be, but only if no election is made and it has a single owner. Multiple-member S. de R.L.s are often partnerships or corporations.',
      'Failing to file Form 5471 for a profitable Mexican corporation because no distributions were made.',
      'Ignoring GILTI because the corporation pays Mexican tax — GILTI applies to net tested income, not taxable income.',
      'Not attributing stock owned by a Mexican spouse or family members when calculating CFC status.',
    ],
    filingTips: [
      'Obtain Mexican financial statements and translate them to USD using the appropriate exchange rate method (year-end rate for the balance sheet, average rate for the income statement).',
      'Calculate QBAI (Qualified Business Asset Investment) carefully — Mexican real estate and equipment count, but intangibles do not.',
      'Consider a Section 962 election if you are an individual shareholder to reduce GILTI tax rate.',
      'File Form 5471 with your Form 1040 by the extended due date. The $10,000 penalty applies even if the corporation had no income.',
    ],
    faqs: [
      {
        question: 'Does my Mexican corporation need to file US taxes?',
        answer:
          'The corporation itself does not file a US return, but you as a US shareholder must file Form 5471 to report the corporation\'s income, balance sheet, and your share of Subpart F and GILTI. The corporation may also need to register for US tax purposes if it conducts business in the US.',
      },
      {
        question: 'Can I avoid GILTI by paying myself a salary?',
        answer:
          'Paying yourself a reasonable salary from the Mexican corporation reduces the corporation\'s net tested income, which reduces GILTI. However, the salary is taxable to you as earned income. The optimal balance depends on your total income, FEIE eligibility, and Mexican tax rates.',
      },
      {
        question: 'What if my Mexican corporation is inactive?',
        answer:
          'Even inactive corporations may require Form 5471 if you meet the ownership thresholds. However, inactive corporations with no income generally have no Subpart F or GILTI inclusions. You still must file the form to avoid the $10,000 penalty.',
      },
    ],
  },
  {
    formSlug: '3520',
    countrySlug: 'canada',
    title: 'Form 3520 for Americans in Canada: Foreign Gifts, Inheritances & Trusts',
    description:
      'How to file Form 3520 from Canada. Learn the reporting requirements for Canadian inheritances, gifts from Canadian relatives, and Canadian trust distributions.',
    heading: 'Form 3520 & Foreign Gift Reporting for Americans in Canada',
    introduction:
      'Canada is home to over a million American expats and dual citizens. Many receive inheritances from Canadian estates, gifts from Canadian relatives, or distributions from Canadian family trusts. Form 3520 is how the IRS tracks these transactions. This guide explains how Canadian-specific rules interact with US Form 3520 filing requirements.',
    specificGuidance: [
      'Canadian inheritances are not taxable to the recipient under US law, but they must be reported on Form 3520 if the aggregate value from all foreign persons exceeds $100,000 in a tax year.',
      'Canadian family trusts (inter vivos trusts, testamentary trusts) are often foreign trusts for US purposes. Beneficiaries who receive distributions must file Form 3520.',
      'Canadian RESPs (Registered Education Savings Plans) may be foreign trusts. The subscriber (person who opens the plan) is treated as the owner for US tax purposes and may need to file Form 3520-A.',
      'Canadian RRSPs and RRIFs are generally not foreign trusts under the Canada-US tax treaty, but they must be reported on FBAR and Form 8938. Form 8891 (or treaty election) is used to defer tax on RRSP income.',
      'Gifts from Canadian corporations or partnerships have a lower threshold ($16,649 for 2026) and must be reported on Form 3520 regardless of the amount.',
    ],
    commonMistakes: [
      'Failing to report a Canadian inheritance because Canada does not have an estate tax at the federal level.',
      'Confusing RRSPs with foreign trusts — RRSPs are generally not trusts, but RESPs may be.',
      'Not filing Form 3520-A for a RESP of which you are the subscriber.',
      'Missing the lower threshold for gifts from Canadian corporations.',
    ],
    filingTips: [
      'Obtain a valuation of inherited Canadian property at the date of death for US basis purposes.',
      'Keep records of all gifts and inheritances, including donor information, dates, and values in both CAD and USD.',
      'If you receive a distribution from a Canadian trust, request a trust statement showing income character (interest, dividends, capital gains) for US tax purposes.',
      'File Form 3520 with your Form 1040 by the extended due date. The $10,000 penalty applies even for non-taxable inheritances.',
    ],
    faqs: [
      {
        question: 'Do I pay US tax on a Canadian inheritance?',
        answer:
          'No. The US does not tax the recipient of gifts or inheritances. However, you must report the inheritance on Form 3520 if the aggregate value from all foreign persons exceeds $100,000 in the tax year. The estate of the deceased may have Canadian or US estate tax obligations depending on their citizenship and residency.',
      },
      {
        question: 'Is my Canadian RRSP a foreign trust?',
        answer:
          'Generally no. Under the Canada-US tax treaty, RRSPs and RRIFs are recognized as pension arrangements, not trusts. You report them on FBAR and Form 8938, but not on Form 3520. Income inside the RRSP is deferred until distribution if you make the proper treaty election.',
      },
      {
        question: 'What about my Canadian RESP?',
        answer:
          'Canadian RESPs may be treated as foreign trusts for US tax purposes. The subscriber (the person who opened the plan and makes contributions) is generally treated as the owner and must file Form 3520-A annually. The beneficiary does not file Form 3520 for RESP distributions if the subscriber has filed Form 3520-A.',
      },
    ],
  },
  {
    formSlug: '8854',
    countrySlug: 'uk',
    title: 'Form 8854 for Americans in the UK: Exit Tax & Expatriation Guide',
    description:
      'How to file Form 8854 from the UK. Learn the covered expatriate tests, exit tax calculations, and post-expatriation obligations for Americans renouncing citizenship while resident in the UK.',
    heading: 'Form 8854 & Exit Tax for Americans Renouncing from the UK',
    introduction:
      'The United Kingdom is one of the most common countries from which Americans renounce citizenship. Whether you are a dual national, an accidental American, or someone who has built a life in Britain and no longer wants US tax obligations, Form 8854 is your exit paperwork. This guide explains how UK residency, UK assets, and the UK-US tax treaty interact with the US exit tax.',
    specificGuidance: [
      'UK residency does not affect your US citizenship status, but it does affect your domicile and tax obligations. If you are UK-domiciled, your worldwide estate may be subject to UK inheritance tax, which interacts with US estate tax rules.',
      'UK property is subject to the exit tax deemed sale rule if you are a covered expatriate. The gain is calculated in USD using the exchange rate at acquisition and the exchange rate at expatriation. Currency fluctuations can create phantom gains or losses.',
      'UK pensions (SIPPs, workplace pensions) are treated as deferred compensation under the exit tax rules. Covered expatriates face deemed distribution taxation on these accounts.',
      'The UK-US tax treaty does not eliminate the exit tax, but it may affect how certain income is sourced and taxed after expatriation.',
      'If you are an accidental American born in the US to British parents, you may be able to renounce without exit tax if your net worth and average tax liability are below the thresholds. However, you must first come into compliance via Streamlined Filing.',
    ],
    commonMistakes: [
      'Renouncing without calculating the exit tax — many UK-based expatriates are surprised by the deemed sale of their UK property and pensions.',
      'Failing to file UK tax returns for the year of expatriation, which creates a compliance gap and prevents the tax compliance certification.',
      'Ignoring currency fluctuations when calculating the deemed sale gain on UK property.',
      'Not obtaining a US tax compliance certificate before renouncing if you were born in the US but never filed.',
    ],
    filingTips: [
      'Obtain a professional valuation of all UK assets (property, pensions, investments) in GBP and convert to USD using the official exchange rate on the day before expatriation.',
      'File all missing US returns via Streamlined Filing before renouncing if you are not in compliance.',
      'Consider the timing of expatriation — doing it in a year with lower income or capital gains may reduce your 5-year average tax liability.',
      'File Form 8854 with your dual-status return for the year of expatriation.',
    ],
    faqs: [
      {
        question: 'Will I owe UK tax after renouncing US citizenship?',
        answer:
          'Yes, if you remain UK resident. The UK taxes residents on worldwide income and capital gains. Renouncing US citizenship does not affect your UK tax obligations. You will file UK tax returns as a non-US person, which may simplify some aspects but does not eliminate taxation.',
      },
      {
        question: 'Does the UK-US tax treaty help with exit tax?',
        answer:
          'The treaty does not override the US exit tax rules. However, it may affect the sourcing of certain income after expatriation, which can impact your post-expatriation US tax obligations. The treaty also provides relief from double taxation on pension income and dividends.',
      },
      {
        question: 'What happens to my UK SIPP if I renounce?',
        answer:
          'If you are a covered expatriate, your UK SIPP is treated as deferred compensation and is subject to deemed distribution on the day before expatriation. The distribution is taxed at ordinary income rates. After expatriation, future SIPP distributions to a non-resident alien may be subject to 30% US withholding unless treaty benefits apply.',
      },
    ],
  },
  {
    formSlug: '2555',
    countrySlug: 'ecuador',
    title: 'Form 2555 for Americans in Ecuador: FEIE Filing Guide',
    description:
      'How to file Form 2555 from Ecuador. Learn the Physical Presence Test, Bona Fide Residence Test, and common FEIE mistakes for Ecuador-based expats.',
    heading: 'Form 2555 & the Foreign Earned Income Exclusion in Ecuador',
    introduction:
      'If you are a U.S. citizen or green-card holder living in Ecuador, Form 2555 is how you claim the Foreign Earned Income Exclusion (FEIE) and exclude up to $130,000 of foreign earned income from U.S. tax. Ecuador is a popular destination for retirees, remote workers, and business owners, but filing from Ecuador comes with specific rules about the Physical Presence Test, the Bona Fide Residence Test, and self-employment tax.',
    specificGuidance: [
      'Ecuador uses the US dollar as its currency, so exchange-rate complexity is minimal, but you must still report Ecuadorian-sourced income in USD.',
      'The 90-day tourist visa does not qualify for the Bona Fide Residence Test. You need a residency visa (retiree, professional, investor, or rentista) to establish bona fide residence.',
      'The Physical Presence Test requires 330 full days outside the U.S. in any 12-month period. Trips back to the U.S. for holidays or family visits count against the 35-day allowance.',
      'Self-employed expats in Ecuador must pay self-employment tax (15.3%) on net earnings even if they exclude income via the FEIE. Consider a Totalization Agreement exemption if applicable.',
      'Ecuador taxes worldwide income for residents after 183 days, but the FEIE is a U.S. provision. You may still owe Ecuadorian tax on income not covered by the FEIE or foreign tax credits.',
    ],
    commonMistakes: [
      'Claiming the FEIE while on a 90-day tourist visa — the IRS may challenge bona fide residence.',
      'Forgetting to file Schedule C and SE for Ecuadorian freelance or business income.',
      'Excluding Ecuadorian pension income — the FEIE only covers earned income, not pensions or investment income.',
      'Missing the June 15 automatic extension for taxpayers abroad.',
    ],
    filingTips: [
      'Use a reliable method to track your days in and out of the U.S. (spreadsheet or travel app).',
      'Keep your Ecuadorian visa, cédula, and utility bills as evidence of bona fide residence.',
      'If you have both Ecuadorian and U.S. income, calculate whether the FEIE or Foreign Tax Credit produces the better result.',
      'File Form 2555 with your Form 1040 by the extended due date (June 15, or October 15 with extension).',
    ],
    faqs: [
      {
        question: 'Can I claim the FEIE in Ecuador on a tourist visa?',
        answer:
          'The Physical Presence Test does not require a specific visa, but the Bona Fide Residence Test generally does. A 90-day tourist visa is weak evidence of bona fide residence. For a strong claim, obtain a residency visa (retiree, professional, investor, or rentista) and establish genuine local ties.',
      },
      {
        question: 'Does Ecuador tax my U.S. income?',
        answer:
          'Ecuador taxes residents on worldwide income after 183 days of presence. If you are a tax resident of Ecuador, you must report worldwide income to Ecuador\'s SRI. The U.S. FEIE does not eliminate Ecuadorian tax liability. You may need to use foreign tax credits to avoid double taxation.',
      },
      {
        question: 'Do I pay self-employment tax in Ecuador?',
        answer:
          'Yes. The FEIE excludes income from U.S. income tax but does not reduce self-employment tax (Social Security and Medicare at 15.3%). If Ecuador has a Totalization Agreement with the U.S. (it does not), you might be exempt. Without an agreement, self-employed Americans in Ecuador generally owe U.S. SE tax on net earnings.',
      },
    ],
  },
  {
    formSlug: '2555',
    countrySlug: 'mexico',
    title: 'Form 2555 for Americans in Mexico: FEIE Filing Guide',
    description:
      'How to file Form 2555 from Mexico. Learn the Physical Presence Test, Bona Fide Residence Test, and special considerations for Mexico-based U.S. expats.',
    heading: 'Form 2555 & the Foreign Earned Income Exclusion in Mexico',
    introduction:
      'Mexico is the most popular destination for American expats, with over a million U.S. citizens living across the border and throughout the country. Whether you are working in Mexico City, retiring in San Miguel de Allende, or running a business in Playa del Carmen, Form 2555 is essential for reducing your U.S. tax burden through the Foreign Earned Income Exclusion.',
    specificGuidance: [
      'Mexico has a Totalization Agreement with the U.S., which may exempt you from U.S. self-employment tax if you are paying into the Mexican social security system (IMSS).',
      'The Bona Fide Residence Test is widely used in Mexico because many expats hold long-term resident visas (temporary or permanent) and have established genuine residence.',
      'Mexico taxes residents on worldwide income, so you may need to file both U.S. and Mexican returns. The Foreign Tax Credit often produces a better result than the FEIE for high earners in Mexico because Mexican tax rates can be substantial.',
      'If you earn more than the FEIE limit ($130,000), the stacking rule pushes your excess income into higher U.S. brackets. Model both FEIE and FTC scenarios before choosing.',
      'Mexican bank accounts must be reported on the FBAR if the aggregate balance exceeds $10,000 at any time during the year.',
    ],
    commonMistakes: [
      'Failing to obtain a Mexican tax ID (RFC) and file Mexican tax returns, which weakens bona fide residence evidence.',
      'Assuming the FEIE is always better than the FTC without comparing both scenarios.',
      'Overlooking FBAR filing for Mexican bank accounts and investment accounts.',
      'Claiming the FEIE for rental income from Mexican property — the FEIE only covers earned income, not passive rental income.',
    ],
    filingTips: [
      'Register with SAT (Mexican tax authority) and obtain an RFC to strengthen your bona fide residence claim.',
      'Keep detailed records of your Mexican visa, utility bills, and local bank accounts.',
      'If you have a Mexican employer, request a copy of your Mexican withholding records for FTC purposes.',
      'Consider the Foreign Housing Exclusion if your employer provides a housing allowance in a high-cost city like Mexico City.',
    ],
    faqs: [
      {
        question: 'Does the U.S.-Mexico Totalization Agreement eliminate self-employment tax?',
        answer:
          'Yes, if you are self-employed in Mexico and paying into the Mexican social security system (IMSS), you may be exempt from U.S. self-employment tax. You must obtain a certificate of coverage from the Mexican authorities and attach it to your U.S. return. File Form 2555 and attach the certificate.',
      },
      {
        question: 'Should I use the FEIE or the Foreign Tax Credit in Mexico?',
        answer:
          'It depends on your income and Mexican tax liability. If you earn near or below the FEIE limit ($130,000) and Mexican taxes are low, the FEIE is usually better. If you earn significantly more than the limit or Mexican taxes are high, the FTC often produces a better result because it avoids the stacking rule. FileAbroad recommends modeling both scenarios.',
      },
      {
        question: 'Do I need to file Mexican taxes if I claim the U.S. FEIE?',
        answer:
          'Yes, if you are a tax resident of Mexico. The FEIE is a U.S. tax provision and does not eliminate your Mexican tax obligations. Mexico taxes residents on worldwide income. Filing Mexican taxes also strengthens your bona fide residence claim for U.S. purposes.',
      },
    ],
  },
  {
    formSlug: '8938',
    countrySlug: 'switzerland',
    title: 'Form 8938 for Americans in Switzerland: FATCA Asset Reporting',
    description:
      'How to file Form 8938 from Switzerland. Learn the FATCA reporting thresholds, Swiss account requirements, and common mistakes for Switzerland-based U.S. expats.',
    heading: 'Form 8938 & FATCA Reporting for Americans in Switzerland',
    introduction:
      'Switzerland is a major financial center, and American expats there often hold multiple bank accounts, investment portfolios, pension funds, and insurance products. Form 8938 (Statement of Specified Foreign Financial Assets) requires you to report these assets to the IRS if they exceed certain thresholds. Switzerland has strict banking secrecy laws, but FATCA and the U.S.-Swiss tax treaty mean Swiss banks actively report U.S. account holders to the IRS.',
    specificGuidance: [
      'The Form 8938 threshold for taxpayers living abroad is $200,000 at year-end or $300,000 at any time during the year (single filers; $400,000/$600,000 for married filing jointly).',
      'Swiss pension funds (Pillar 2 and Pillar 3a) may be reportable on Form 8938 depending on their structure. Consult a specialist to determine whether your specific pension qualifies as a specified foreign financial asset.',
      'Swiss bank accounts are also reportable on the FBAR (FinCEN Form 114) if the aggregate balance exceeds $10,000. Form 8938 and FBAR are separate filings with different thresholds and deadlines.',
      'Swiss life insurance policies with cash surrender value may be reportable on both Form 8938 and FBAR.',
      'The U.S.-Swiss tax treaty provides some relief, but it does not eliminate FATCA reporting obligations.',
    ],
    commonMistakes: [
      'Failing to report Swiss pension funds on Form 8938 because they are tax-deferred in Switzerland.',
      'Confusing the FBAR threshold ($10,000 aggregate) with the Form 8938 threshold ($200,000/$300,000).',
      'Not reporting joint accounts held with a non-U.S. spouse — these may still be reportable.',
      'Missing the Form 8938 filing deadline (same as your tax return, with the automatic June 15 extension for taxpayers abroad).',
    ],
    filingTips: [
      'Request a year-end statement from each Swiss bank showing the highest balance during the year.',
      'List all specified foreign financial assets on Form 8938, including bank accounts, investment accounts, pension funds, and insurance policies with cash value.',
      'File Form 8938 with your Form 1040 — it cannot be filed separately.',
      'If you are also filing FBAR, reconcile the two forms to ensure consistency. Discrepancies can trigger IRS inquiry.',
    ],
    faqs: [
      {
        question: 'Do I need to report my Swiss pension on Form 8938?',
        answer:
          'It depends on the type of pension. Swiss Pillar 2 (occupational) and Pillar 3a (private) pensions are generally considered specified foreign financial assets and must be reported on Form 8938 if you exceed the threshold. Pillar 1 (state) is typically not reportable. The exact treatment depends on the pension structure and whether you have a beneficial interest.',
      },
      {
        question: 'What is the difference between FBAR and Form 8938?',
        answer:
          'FBAR (FinCEN Form 114) is filed separately with the Treasury and has a $10,000 aggregate threshold. Form 8938 is filed with your tax return and has higher thresholds ($200,000/$300,000 for single taxpayers abroad). Some assets are reportable on both forms, some on only one. Both must be filed if thresholds are met.',
      },
      {
        question: 'Do Swiss banks report my accounts to the IRS?',
        answer:
          'Yes. Under FATCA and the U.S.-Swiss agreement, Swiss banks report account information of U.S. persons to the IRS. This includes balance, interest, dividends, and identifying information. Failing to self-report can result in penalties when the IRS already has your data.',
      },
    ],
  },
];

// ── Visa Types ────────────────────────────────────────────────────────────────

export const PROGRAMMATIC_VISAS: VisaEntry[] = [
  {
    slug: 'retirement-visa',
    title: 'Retirement Visas for U.S. Expats: Country Comparison & Tax Guide',
    description:
      'Compare retirement visa programs in Ecuador, Mexico, Portugal, Spain, and Thailand. Learn the tax implications, residency requirements, and how each visa affects your U.S. tax filing.',
    visaName: 'Retirement Visa',
    overview:
      'A retirement visa allows Americans to live abroad on a fixed income, often with lower tax burdens and reduced cost of living. Popular destinations include Ecuador, Mexico, Portugal, Spain, and Thailand. Each country has different income requirements, health insurance rules, and tax treaties that affect your U.S. filing obligations.',
    eligibilityCriteria: [
      'Proof of stable retirement income (pension, Social Security, investments) meeting the host-country minimum.',
      'Valid health insurance coverage in the host country or internationally.',
      'Clean criminal background check from the U.S. and sometimes the FBI.',
      'Passport valid for at least 6–12 months beyond the intended stay.',
    ],
    taxImplications:
      'Retirement income (pensions, Social Security, 401(k) distributions, IRA withdrawals) is generally taxable in the U.S. regardless of where you live. The FEIE does not apply to retirement income because it is not "earned income." However, tax treaties may reduce or eliminate host-country tax on U.S. pensions. You must still file a U.S. return and report foreign bank accounts via FBAR if thresholds are met.',
    countrySlugs: ['ecuador', 'mexico', 'portugal', 'spain', 'thailand'],
    countrySpecificNotes: {
      ecuador:
        'The Ecuadorian retiree visa (pensionado) requires proof of $800+/month in pension income. Ecuador taxes residents on worldwide income after 183 days. There is no tax treaty with the U.S., so you rely on the Foreign Tax Credit to avoid double taxation.',
      mexico:
        'Mexico offers a temporary resident visa for retirees with income of approximately $3,100+/month or savings of $50,000+. Mexico taxes residents on worldwide income, but the U.S.-Mexico tax treaty provides some relief on U.S. pension income.',
      portugal:
        'Portugal\'s D7 visa is popular with retirees and requires passive income of approximately €820+/month. Portugal taxes residents on worldwide income, but the NHR (Non-Habitual Resident) regime may provide a 10-year tax break on foreign-sourced income.',
      spain:
        'Spain\'s non-lucrative visa requires proof of approximately €2,400+/month in passive income. Spain taxes residents on worldwide income and has a tax treaty with the U.S. that reduces double taxation on pensions and Social Security.',
      thailand:
        'Thailand\'s retirement visa (O-A or O-X) requires proof of approximately $2,000+/month in income or $25,000+ in a Thai bank account. Thailand taxes residents on income remitted to Thailand, but many retirees structure their finances to minimize Thai tax liability.',
    },
    faqs: [
      {
        question: 'Can I exclude my pension income with the FEIE?',
        answer:
          'No. The Foreign Earned Income Exclusion (FEIE) only applies to "earned income" such as wages, salaries, and self-employment income. Pension income, Social Security, 401(k) distributions, and IRA withdrawals are considered passive or unearned income and do not qualify for the FEIE.',
      },
      {
        question: 'Do I still file a U.S. tax return if I retire abroad?',
        answer:
          'Yes. U.S. citizens and green-card holders must file a U.S. tax return regardless of where they live, even in retirement. You must report worldwide income, including pensions, investment income, and Social Security. You may also need to file FBAR and Form 8938 if you hold foreign financial assets.',
      },
      {
        question: 'Which country has the best retirement visa for tax purposes?',
        answer:
          'There is no single "best" country — it depends on your income sources and level. Portugal\'s NHR regime offers significant tax advantages for the first 10 years. Ecuador has a low cost of living and no tax treaty, which can be simple but may result in double taxation without careful planning. Spain and Mexico have U.S. tax treaties that reduce double taxation. Consult a tax advisor to model your specific situation.',
      },
    ],
  },
  {
    slug: 'digital-nomad-visa',
    title: 'Digital Nomad Visas for Remote Workers: Tax Implications & Filing Guide',
    description:
      'Compare digital nomad visa programs in Portugal, Spain, Costa Rica, and Estonia. Learn how remote work visas affect your U.S. tax obligations, FEIE eligibility, and self-employment tax.',
    visaName: 'Digital Nomad Visa',
    overview:
      'Digital nomad visas allow remote workers to live in a foreign country while working for a U.S. or international employer. These visas are designed for location-independent workers and often come with tax incentives. However, the tax implications for U.S. citizens are complex: you must still file a U.S. return, you may qualify for the FEIE, and you need to track your physical presence carefully.',
    eligibilityCriteria: [
      'Proof of remote employment or self-employment with clients outside the host country.',
      'Minimum monthly income threshold (varies by country, typically $2,500–$5,000/month).',
      'Valid health insurance covering the host country.',
      'Clean criminal background check.',
    ],
    taxImplications:
      'Digital nomads often qualify for the FEIE if they pass the Physical Presence Test (330 days outside the U.S.) or the Bona Fide Residence Test. However, many nomads move between countries frequently, making the Bona Fide Residence Test difficult. The Physical Presence Test is usually the better option, but requires strict day-tracking. Self-employed nomads must also pay U.S. self-employment tax unless a Totalization Agreement applies.',
    countrySlugs: ['portugal', 'spain', 'costa-rica', 'estonia'],
    countrySpecificNotes: {
      portugal:
        'Portugal\'s D8 digital nomad visa requires proof of approximately €3,280+/month in remote income. Portugal taxes residents on worldwide income, but the NHR regime may provide favorable tax treatment for the first 10 years.',
      spain:
        'Spain\'s digital nomad visa requires proof of approximately €2,000+/month in remote income. Spain has a tax treaty with the U.S. and taxes residents on worldwide income. The Beckham Law may provide flat-tax treatment for high earners.',
      'costa-rica':
        'Costa Rica\'s digital nomad visa (Rentista para Nómadas Digitales) requires proof of $3,000+/month in income. Costa Rica does not tax foreign-sourced income, making it attractive for remote workers with U.S. clients. However, you still owe U.S. tax and may qualify for the FEIE.',
      estonia:
        'Estonia\'s digital nomad visa requires proof of approximately €3,500+/month in remote income. Estonia taxes residents on worldwide income and has a tax treaty with the U.S. The e-Residency program is separate and does not confer tax residency.',
    },
    faqs: [
      {
        question: 'Can I claim the FEIE as a digital nomad?',
        answer:
          'Yes, if you pass either the Physical Presence Test (330 full days outside the U.S. in a 12-month period) or the Bona Fide Residence Test. Most digital nomads use the Physical Presence Test because they move between countries frequently. Keep meticulous records of your travel days — the IRS requires proof.',
      },
      {
        question: 'Do I pay tax in the country where I have a digital nomad visa?',
        answer:
          'It depends on the country and how long you stay. Some countries (e.g., Costa Rica, Dubai) do not tax foreign-sourced income. Others (e.g., Portugal, Spain, Estonia) tax residents on worldwide income. Even if the host country does not tax you, you still owe U.S. tax and must file a U.S. return.',
      },
      {
        question: 'Does self-employment tax apply to digital nomads?',
        answer:
          'Yes. Self-employed digital nomads must pay U.S. self-employment tax (15.3%) on net earnings unless a Totalization Agreement exempts them. Most countries popular with digital nomads do not have Totalization Agreements with the U.S., so self-employment tax generally applies. Consider forming a foreign corporation or using a U.S. LLC to optimize your structure.',
      },
    ],
  },
  {
    slug: 'd7-portugal',
    title: 'Portugal D7 Visa: Tax Implications for American Expats',
    description:
      'The Portugal D7 visa is a popular residency option for retirees and passive-income earners. Learn how the D7 visa affects your U.S. tax filing, NHR regime benefits, and FBAR obligations.',
    visaName: 'Portugal D7 Visa',
    overview:
      'The D7 visa is Portugal\'s residency visa for individuals with stable passive income (pensions, rental income, investments, royalties). It is one of the most popular visas for American retirees and remote workers because it leads to permanent residency and eventual citizenship. The Non-Habitual Resident (NHR) regime can provide significant tax advantages for the first 10 years.',
    eligibilityCriteria: [
      'Proof of regular passive income of at least €820/month (approximately $900/month) for the primary applicant.',
      'Additional income requirement for dependents (approximately €410/month per dependent).',
      'Valid health insurance for Portugal.',
      'Clean criminal background check.',
      'Proof of accommodation in Portugal (rental contract or property deed).',
    ],
    taxImplications:
      'As a US citizen with Portuguese residency, you must file both US and Portuguese tax returns. The NHR regime may exempt most foreign-sourced income from Portuguese tax for 10 years, but you still owe US tax. The FEIE may apply to earned income, but not to passive income. FBAR and Form 8938 obligations continue. The US-Portugal tax treaty provides relief on pension income and Social Security.',
    countrySlugs: ['portugal'],
    countrySpecificNotes: {
      portugal:
        'The NHR regime allows most foreign-sourced income (pensions, dividends, interest, royalties, self-employment income from certain professions) to be exempt from Portuguese tax for 10 years. US-sourced employment income is taxed at a flat 20%. Portuguese-sourced income is taxed at normal progressive rates. You must register for NHR by March 31 of the year following your first year of residency.',
    },
    faqs: [
      {
        question: 'Does the D7 visa make me a Portuguese tax resident?',
        answer:
          'Yes. If you hold a D7 visa and spend more than 183 days in Portugal in a calendar year, you are a Portuguese tax resident. Even if you spend fewer than 183 days, having your habitual abode (permanent home) in Portugal can create residency. As a tax resident, you must file a Portuguese return and report worldwide income.',
      },
      {
        question: 'Can I use the FEIE with the D7 visa?',
        answer:
          'Yes, but only on earned income. If you work remotely or have self-employment income, the FEIE can exclude up to $130,000 (2025) of foreign earned income. However, the D7 visa is designed for passive income (pensions, investments, rentals), which does not qualify for the FEIE. The NHR regime may exempt this passive income from Portuguese tax, but it does not eliminate US tax.',
      },
      {
        question: 'How does the NHR regime affect my US tax?',
        answer:
          'The NHR regime is a Portuguese tax benefit and does not change your US tax obligations. The US taxes its citizens on worldwide income regardless of foreign tax benefits. However, because NHR may result in little or no Portuguese tax on foreign income, you may not have foreign tax credits to offset your US tax liability. This can create a situation where you owe US tax even though you owe no Portuguese tax.',
      },
    ],
  },
  {
    slug: 'golden-visa-greece',
    title: 'Greece Golden Visa: Tax Implications for American Investors',
    description:
      'The Greece Golden Visa grants residency to non-EU investors who purchase real estate or make other qualifying investments. Learn how the Golden Visa affects your US tax filing, Greek tax residency, and FBAR obligations.',
    visaName: 'Greece Golden Visa',
    overview:
      'The Greece Golden Visa program grants 5-year renewable residency permits to non-EU nationals who invest at least €250,000 in Greek real estate (or other qualifying investments). It is one of the most affordable golden visa programs in Europe and is popular with American retirees and investors. Unlike many other visas, the Golden Visa does not require you to live in Greece to maintain residency, which creates unique tax planning opportunities.',
    eligibilityCriteria: [
      'Purchase Greek real estate worth at least €250,000 (increased to €400,000–€800,000 in certain high-demand areas after 2024).',
      'Alternatively, invest €400,000 in Greek government bonds, shares, or investment funds.',
      'Valid health insurance for Greece.',
      'Clean criminal background check.',
    ],
    taxImplications:
      'The Greece Golden Visa does not automatically make you a Greek tax resident. If you spend fewer than 183 days in Greece and do not have your center of vital interests there, you remain a non-resident for Greek tax purposes. As a non-resident, you only pay Greek tax on Greek-sourced income (e.g., rental income from your Greek property). As a US citizen, you must still file a US tax return regardless of Greek residency status.',
    countrySlugs: ['greece'],
    countrySpecificNotes: {
      greece:
        'Greece taxes residents on worldwide income at progressive rates up to 44%. Non-residents are taxed only on Greek-sourced income. Rental income from Greek property is taxed at 15–45% depending on the amount. Capital gains on real estate are generally exempt if the property was held for more than 5 years. Greece has a tax treaty with the US that reduces double taxation on dividends, interest, and capital gains.',
    },
    faqs: [
      {
        question: 'Do I become a Greek tax resident with the Golden Visa?',
        answer:
          'Not automatically. The Golden Visa grants residency for immigration purposes, but tax residency is determined separately. You are a Greek tax resident if you spend more than 183 days in Greece in a calendar year or if your center of vital interests (family, business, property) is in Greece. Many Golden Visa holders maintain non-resident status by spending fewer than 183 days in Greece.',
      },
      {
        question: 'Do I pay Greek tax on rental income from my Golden Visa property?',
        answer:
          'Yes. Rental income from Greek real estate is Greek-sourced income and is taxable in Greece regardless of your residency status. Non-residents pay tax at the same progressive rates as residents (15–45%). You must file a Greek non-resident tax return. The US-Greece tax treaty allows you to claim a foreign tax credit on your US return for Greek tax paid.',
      },
      {
        question: 'Can I claim the FEIE if I live in Greece on a Golden Visa?',
        answer:
          'Yes, if you qualify under the Physical Presence Test or Bona Fide Residence Test. If you spend 330+ days outside the US in a 12-month period, you can claim the FEIE on earned income even if you are not a Greek tax resident. However, the Golden Visa is an investment visa, not an employment visa, so many holders do not have foreign earned income.',
      },
    ],
  },
  {
    slug: 'd7-portugal-tax-guide',
    title: 'Portugal D7 Visa Tax Guide for Americans: Residency, Pensions & Filing',
    description:
      'A practical Portugal D7 visa tax guide for Americans covering passive income, Portuguese tax residency, the post-2023 NHR transition, U.S. filing, and foreign-account reporting.',
    visaName: 'Portugal D7 Visa',
    overview:
      'Portugal’s D7 is a residence pathway commonly used by retirees and people with stable passive income such as pensions, rental income, or investment distributions. The immigration application and tax-residency analysis are separate questions: holding a D7 residence visa does not by itself answer where you are tax resident. Before applying, map the days you expect to spend in Portugal, your housing situation, and each income source in both countries.',
    eligibilityCriteria: [
      'Document recurring passive income or other financial means that meet the current Portuguese consular requirements for the applicant and any dependents.',
      'Provide the residence, insurance, criminal-record, passport, and financial documents required by the relevant Portuguese consulate or visa service.',
      'Separate the immigration file from the tax analysis: a visa approval is not a ruling on Portuguese tax residence or U.S. tax treatment.',
      'Recheck income thresholds, document formats, and appointment requirements before filing because consular procedures can change.',
    ],
    taxImplications:
      'A U.S. citizen generally continues to file a U.S. return and report worldwide income after moving to Portugal. Pension, Social Security, rental, and investment income is not foreign earned income for FEIE purposes, although the foreign tax credit and the U.S.-Portugal treaty may matter. Portugal’s former NHR regime is not a blanket new-arrival benefit: the Portuguese Tax Authority states that the regime was repealed from January 1, 2024, subject to transitional rules. Model Portuguese residence, withholding, treaty treatment, FBAR, and Form 8938 together before choosing a move date.',
    countrySlugs: ['portugal'],
    countrySpecificNotes: {
      portugal:
        'Use the Portuguese government’s current residence-visa instructions for the immigration checklist. For tax planning, confirm whether you fall under an existing or transitional NHR rule rather than assuming the historic ten-year treatment applies to every new D7 holder. Keep a day-count calendar and obtain Portuguese advice on each pension, account, and investment before the first resident return.',
    },
    faqs: [
      {
        question: 'Does the Portugal D7 visa automatically make me a Portuguese tax resident?',
        answer:
          'No. Immigration residence and tax residence are related but distinct. Your days in Portugal, habitual home, and personal and economic connections can affect the tax analysis. Review the facts for the year you arrive and do not rely on the visa label alone.',
      },
      {
        question: 'Can I use the FEIE for income supporting my D7 application?',
        answer:
          'Usually not for passive income such as a pension, Social Security, rent, or investment distributions. The FEIE is for qualifying foreign earned income. A remote-work or self-employment arrangement requires a separate earned-income analysis and does not change the D7 income requirement.',
      },
      {
        question: 'Is Portugal’s NHR regime still available to every new D7 applicant?',
        answer:
          'No. The Portuguese Tax Authority says the prior NHR regime was repealed from January 1, 2024, with transitional rules. Confirm the current regime and your eligibility with Portuguese counsel before pricing a move around an NHR assumption.',
      },
    ],
    officialSources: [
      {
        label: 'Portuguese government: residence visa service information',
        href: 'https://www.gov.pt/servicos/pedir-visto-de-residencia-para-o-exercicio-de-atividade-profissional-independente-ou-para-imigrantes-empreendedores?_com_liferay_asset_publisher_web_portlet_AssetPublisherPortlet_INSTANCE_l9g40ajii2wq_mvcPath=%2Fview.jsp',
      },
      {
        label: 'Portuguese Tax Authority: NHR tax regime',
        href: 'https://info.portaldasfinancas.gov.pt/en/tax-information/living-in-portugal/work-and-retirement/nhr-tax-regime/Pages/default.aspx',
      },
      {
        label: 'IRS Publication 54: Tax Guide for U.S. Citizens and Resident Aliens Abroad',
        href: 'https://www.irs.gov/publications/p54',
      },
    ],
  },
  {
    slug: 'digital-nomad-spain-tax-guide',
    title: 'Spain Digital Nomad Visa Tax Guide for Americans: Remote Work & Filing',
    description:
      'Understand the Spain digital nomad visa from a U.S. tax perspective, including remote-work eligibility, Spanish tax residence, FEIE, foreign tax credits, and reporting.',
    visaName: 'Spain Digital Nomad Visa',
    overview:
      'Spain’s international telework visa is designed for eligible non-EU remote workers whose professional activity is primarily connected to companies or clients outside Spain. The visa can solve an immigration problem without resolving every tax question. A U.S. applicant should coordinate the consular checklist with a tax residence timeline, payroll or contractor structure, and a plan for tracking workdays and travel.',
    eligibilityCriteria: [
      'Show an established remote employment or professional relationship and the work history or qualifications requested by the current Spanish consular guidance.',
      'Demonstrate the required income, health coverage, clean-record, and documentation conditions for the application route used.',
      'If self-employed, review the limits and documentation for any Spanish-client work before accepting local engagements.',
      'Keep the visa application, Spanish tax-residence analysis, and U.S. FEIE/foreign-tax-credit analysis as three related but separate workstreams.',
    ],
    taxImplications:
      'A U.S. citizen remains subject to U.S. worldwide-income reporting while living in Spain. If you become Spanish tax resident, Spain may also tax worldwide income, with treaty and foreign-tax-credit coordination needed to reduce double taxation. The FEIE may apply to qualifying earned income if you satisfy the Physical Presence Test or Bona Fide Residence Test, but it does not exclude pensions or investment income and does not automatically remove U.S. self-employment tax. The visa itself is not a U.S. tax election.',
    countrySlugs: ['spain'],
    countrySpecificNotes: {
      spain:
        'Start with the Spanish consular telework-visa checklist and confirm whether your employer, clients, contract term, and professional evidence fit the current rules. Then model Spanish residence, payroll or autónomo obligations, U.S. earned income, and the interaction between FEIE and foreign tax credits before choosing the application date.',
    },
    faqs: [
      {
        question: 'Can I claim the FEIE while living in Spain on a digital nomad visa?',
        answer:
          'Possibly. The visa does not grant FEIE eligibility by itself. You still need qualifying foreign earned income and must satisfy either the Physical Presence Test or the Bona Fide Residence Test. Maintain dated travel and work records that support the test you claim.',
      },
      {
        question: 'Does Spain tax a U.S. remote worker on worldwide income?',
        answer:
          'It can if the worker is Spanish tax resident. Residence depends on the facts and applicable Spanish rules, not only the name of the visa. Determine the first year of residence, filing obligations, and treaty position before assuming that only U.S.-source income is reportable in Spain.',
      },
      {
        question: 'Does the Spain digital nomad visa eliminate U.S. self-employment tax?',
        answer:
          'No. A visa is an immigration authorization, not a Social Security exemption. Self-employed Americans need a separate U.S. self-employment-tax and totalization-agreement analysis, even when foreign income is eligible for the FEIE.',
      },
    ],
    officialSources: [
      {
        label: 'Spanish Ministry of Foreign Affairs: telework visa',
        href: 'https://www.exteriores.gob.es/Consulados/washington/en/ServiciosConsulares/Paginas/Consular/Telework-visa.aspx',
      },
      {
        label: 'IRS: Foreign Earned Income Exclusion',
        href: 'https://www.irs.gov/individuals/international-taxpayers/foreign-earned-income-exclusion',
      },
      {
        label: 'IRS Publication 54: Tax Guide for U.S. Citizens and Resident Aliens Abroad',
        href: 'https://www.irs.gov/publications/p54',
      },
    ],
  },
  {
    slug: 'nhr-portugal-tax-guide',
    title: 'Portugal NHR Tax Guide for Americans: Legacy, Transitional & Current Rules',
    description:
      'A current-oriented Portugal NHR guide for Americans explaining the regime’s repeal, transitional eligibility, Portuguese filing questions, and continuing U.S. obligations.',
    visaName: 'Portugal NHR Tax Regime',
    overview:
      'Portugal’s Non-Habitual Resident regime was widely marketed to international retirees and professionals, but it should not be treated as an open-ended ten-year incentive for every new arrival. The Portuguese Tax Authority states that the prior NHR regime was repealed from January 1, 2024, with transitional rules. This page is therefore an eligibility and due-diligence guide: establish whether you already qualified, fall within a transitional rule, or need to analyze the current replacement regime before relying on any rate or exemption.',
    eligibilityCriteria: [
      'Determine the date you became Portuguese tax resident and whether you satisfied the historic registration requirements before the repeal date.',
      'Collect evidence for any transitional pathway, including housing, employment, or other facts required by the Portuguese Tax Authority’s current guidance.',
      'Classify each income stream separately: pensions, dividends, interest, rent, employment, self-employment, and capital gains may not receive the same treatment.',
      'Obtain written Portuguese advice before making a move or investment decision based on an NHR headline rate.',
    ],
    taxImplications:
      'NHR is a Portuguese tax regime; it does not change U.S. citizenship-based filing. U.S. citizens continue to report worldwide income and may need FBAR and Form 8938 filings. A Portuguese exemption or reduced rate can also reduce the foreign tax credits available on the U.S. return, so a lower Portuguese bill is not automatically a lower combined tax bill. Compare the Portuguese result, treaty rules, FEIE availability for earned income, and foreign tax credits for the exact tax year.',
    countrySlugs: ['portugal'],
    countrySpecificNotes: {
      portugal:
        'The official Portuguese Tax Authority pages should control the current analysis. Confirm whether your registration is legacy, transitional, or governed by a different current incentive, and preserve the registration decision, tax-residence certificate, and income classification supporting your position.',
    },
    faqs: [
      {
        question: 'Was Portugal NHR repealed?',
        answer:
          'The Portuguese Tax Authority states that the prior NHR regime was repealed from January 1, 2024, subject to transitional rules. The correct question for a taxpayer is whether the facts fit a legacy or transitional provision, not whether an old ten-year summary still applies to all new arrivals.',
      },
      {
        question: 'Does NHR eliminate my U.S. tax return?',
        answer:
          'No. U.S. citizens and resident aliens generally continue to file a U.S. return and report worldwide income. Portuguese tax paid or withheld may support a foreign tax credit, but that calculation depends on the income category and the U.S. limitation rules.',
      },
      {
        question: 'Can NHR make my pension tax-free in both countries?',
        answer:
          'Do not assume that. Portuguese treatment, treaty provisions, and U.S. rules can produce different results, and a Portuguese exemption may leave no Portuguese tax available for a U.S. foreign tax credit. Analyze the pension type, source, tax year, and residence facts together.',
      },
    ],
    officialSources: [
      {
        label: 'Portuguese Tax Authority: NHR tax regime',
        href: 'https://info.portaldasfinancas.gov.pt/en/tax-information/living-in-portugal/work-and-retirement/nhr-tax-regime/Pages/default.aspx',
      },
      {
        label: 'Portuguese Tax Authority: registering as NHR',
        href: 'https://info.portaldasfinancas.gov.pt/en/tax-information/getting-started-in-portugal/non-habitual-resident/register-as-a-non-habitual-resident/Pages/default.aspx',
      },
      {
        label: 'IRS Publication 54: Tax Guide for U.S. Citizens and Resident Aliens Abroad',
        href: 'https://www.irs.gov/publications/p54',
      },
    ],
  },
  {
    slug: '30-percent-ruling-netherlands',
    title: 'Netherlands 30% Ruling Tax Guide for Americans: Expat Payroll & U.S. Filing',
    description:
      'Learn how the Netherlands 30% facility works for qualifying employees and how it interacts with U.S. worldwide-income reporting, FEIE, foreign tax credits, and foreign accounts.',
    visaName: 'Netherlands 30% Facility',
    overview:
      'The Netherlands 30% facility is an employer-applied payroll tax facility for qualifying employees recruited or transferred from abroad. It is not a visa and is not automatic for every international hire. For an American employee, the useful planning question is the combined result: Dutch payroll treatment, U.S. worldwide-income reporting, the FEIE or foreign tax credit, pension and equity compensation, and the documentation needed if the Dutch rules change during the assignment.',
    eligibilityCriteria: [
      'Be recruited or transferred from abroad into qualifying employment with an employer that can apply the facility.',
      'Meet the current Dutch expertise, salary, distance-from-border, and other conditions that apply in the tax year of the application.',
      'Have the employer submit the application and retain the decision; an employee should not assume approval without the written ruling.',
      'Recheck current percentages, salary thresholds, and election deadlines because the facility has been amended and may change again.',
    ],
    taxImplications:
      'The Dutch facility may change how qualifying employment compensation is handled through payroll, but it does not turn off U.S. citizenship-based taxation. A U.S. citizen must generally report worldwide wages and may need to coordinate the Dutch tax result with the FEIE or foreign tax credit. Employer-provided housing, equity, bonuses, pensions, and foreign bank accounts need separate review. Use the current Dutch Tax Administration decision and the U.S. return instructions for the relevant year rather than relying on a historical 30% summary.',
    countrySlugs: ['netherlands'],
    countrySpecificNotes: {
      netherlands:
        'The employer should confirm the application date, qualifying salary, and facility duration with the Dutch Tax Administration. Keep the ruling, payroll statements, employment agreement, and proof of Dutch tax withheld so the U.S. return can reconcile compensation and foreign tax credits accurately.',
    },
    faqs: [
      {
        question: 'Is the Netherlands 30% facility the same as a visa?',
        answer:
          'No. It is a Dutch payroll tax facility for qualifying employees. You still need the immigration and work authorization that fits your job and nationality, and the employer generally needs to apply for the facility.',
      },
      {
        question: 'Does the 30% facility make my U.S. salary exempt from U.S. tax?',
        answer:
          'No. U.S. citizens generally report worldwide wages on the U.S. return. Depending on your facts, the FEIE or foreign tax credit may reduce U.S. tax, but neither benefit is granted merely because the Dutch employer received a 30% facility decision.',
      },
      {
        question: 'Can I still claim the FEIE while using the Dutch facility?',
        answer:
          'Possibly, if you have qualifying foreign earned income and satisfy the Physical Presence Test or Bona Fide Residence Test. Compare the FEIE with the foreign tax credit and account for Dutch payroll treatment before choosing the U.S. position for the year.',
      },
    ],
    officialSources: [
      {
        label: 'Government of the Netherlands: 30% facility',
        href: 'https://www.government.nl/themes/taxes-benefits-and-allowances/income-tax/shortening-30-percent-ruling',
      },
      {
        label: 'Dutch Tax Administration: Expat Scheme (30% facility)',
        href: 'https://www.belastingdienst.nl/wps/wcm/connect/en/individuals/content/coming-to-work-in-the-netherlands-30-percent-facility',
      },
      {
        label: 'IRS Publication 54: Tax Guide for U.S. Citizens and Resident Aliens Abroad',
        href: 'https://www.irs.gov/publications/p54',
      },
    ],
  },
];

// ── Helper Functions ────────────────────────────────────────────────────────

export function getAllFormCountryCombinations(): FormCountryEntry[] {
  return PROGRAMMATIC_FORM_COUNTRIES;
}

export function getFormCountryEntry(
  formSlug: string,
  countrySlug: string
): FormCountryEntry | undefined {
  return PROGRAMMATIC_FORM_COUNTRIES.find(
    (entry) => entry.formSlug === formSlug && entry.countrySlug === countrySlug
  );
}

export function getAllFormCountrySlugs(): { formSlug: string; countrySlug: string }[] {
  return PROGRAMMATIC_FORM_COUNTRIES.map((entry) => ({
    formSlug: entry.formSlug,
    countrySlug: entry.countrySlug,
  }));
}

export function getAllVisas(): VisaEntry[] {
  return PROGRAMMATIC_VISAS;
}

export function getVisaBySlug(slug: string): VisaEntry | undefined {
  return PROGRAMMATIC_VISAS.find((visa) => visa.slug === slug);
}

export function getAllVisaSlugs(): string[] {
  return PROGRAMMATIC_VISAS.map((visa) => visa.slug);
}

export function getVisaCountryCombinations(
  visaSlug: string
): { visaSlug: string; countrySlug: string }[] {
  const visa = getVisaBySlug(visaSlug);
  if (!visa) return [];
  return visa.countrySlugs.map((countrySlug) => ({ visaSlug, countrySlug }));
}
