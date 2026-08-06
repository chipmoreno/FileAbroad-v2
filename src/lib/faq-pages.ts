export interface FAQPageEntry {
  slug: string;
  title: string;
  description: string;
  question: string;
  answer: string;
  relatedGuideSlugs: string[];
  relatedBlogSlugs: string[];
  relatedServiceSlugs: string[];
  relatedFaqs: { slug: string; question: string }[];
}

export const FAQ_PAGES: FAQPageEntry[] = [
  {
    slug: 'what-is-pfic',
    title: 'What Is a PFIC? — Passive Foreign Investment Company Explained',
    description:
      'A PFIC is a foreign corporation that earns mostly passive income or holds mostly passive assets. Learn what makes an investment a PFIC, common examples, and the US tax consequences.',
    question: 'What is a PFIC?',
    answer:
      'A Passive Foreign Investment Company (PFIC) is a foreign corporation that meets one of two tests: (1) 75% or more of its gross income is passive income (dividends, interest, rents, royalties, capital gains), or (2) 50% or more of its assets produce passive income. Most foreign mutual funds, foreign ETFs, and unit trusts are PFICs. US shareholders must file Form 8621 and may face punitive tax treatment under the excess distribution method unless they make a QEF or mark-to-market election.',
    relatedGuideSlugs: ['pfic-guide'],
    relatedBlogSlugs: ['pfic-identification-checklist', 'pfic-qef-vs-mark-to-market'],
    relatedServiceSlugs: ['expat-tax-filing'],
    relatedFaqs: [
      { slug: 'is-my-foreign-fund-a-pfic', question: 'Is my foreign mutual fund a PFIC?' },
      { slug: 'do-i-report-foreign-gift', question: 'Do I need to report a foreign gift?' },
    ],
  },
  {
    slug: 'do-i-need-to-file-fbar',
    title: 'Do I Need to File FBAR? — $10,000 Threshold Explained',
    description:
      'You must file an FBAR if the aggregate value of all your foreign financial accounts exceeded $10,000 at any time during the calendar year. Learn what counts, who must file, and common exceptions.',
    question: 'Do I need to file FBAR?',
    answer:
      'You must file an FBAR (FinCEN Form 114) if you are a US person (citizen, resident, entity, or trust) and the aggregate value of all your foreign financial accounts exceeded $10,000 at any time during the calendar year. This includes bank accounts, securities accounts, and any other financial account maintained by a foreign financial institution. The threshold is aggregate across all accounts — even if no single account exceeded $10,000. You also must file if you have signature authority over accounts that exceed the threshold, even if you do not own the assets.',
    relatedGuideSlugs: ['fbar-guide'],
    relatedBlogSlugs: ['fbar-requirements-americans-abroad', 'fbar-vs-fatca'],
    relatedServiceSlugs: ['fbar-filing'],
    relatedFaqs: [
      { slug: 'fbar-10000-threshold', question: 'What is the FBAR $10,000 threshold?' },
      { slug: 'fbar-10000-threshold', question: 'What is the FBAR $10,000 threshold?' },
    ],
  },
  {
    slug: 'what-is-streamlined-filing',
    title: 'What Is Streamlined Filing Compliance? — Catch-Up Guide for Expats',
    description:
      'Streamlined Foreign Offshore allows non-willful non-filers living abroad to catch up on US tax returns and FBARs with reduced penalties. Learn eligibility, required documents, and the filing process.',
    question: 'What is Streamlined Filing?',
    answer:
      'Streamlined Filing Compliance Procedures are an IRS amnesty program for non-willful non-filers. Streamlined Foreign Offshore is designed for US taxpayers living abroad who have not filed tax returns or FBARs. To qualify, you must certify that your failure to file was non-willful (due to negligence, inadvertence, or mistake). The program requires filing: (1) the most recent 3 years of delinquent tax returns, (2) the most recent 6 years of delinquent FBARs, and (3) Form 14653 certifying non-willfulness. If accepted, the IRS waives all failure-to-file and failure-to-pay penalties.',
    relatedGuideSlugs: ['streamlined-filing-guide'],
    relatedBlogSlugs: [],
    relatedServiceSlugs: ['streamlined-filing'],
    relatedFaqs: [
      { slug: 'am-i-eligible-streamlined', question: 'Am I eligible for Streamlined Filing?' },
      { slug: 'how-to-stop-filing-state-taxes-abroad', question: 'How to stop filing state taxes abroad?' },
    ],
  },
  {
    slug: 'do-expats-pay-state-taxes',
    title: 'Do Expats Pay State Taxes? — State Residency Rules for Americans Abroad',
    description:
      'Many expats still owe state taxes even after moving abroad. Learn which states are most aggressive, how to terminate residency, and whether you need to keep filing state returns.',
    question: 'Do expats pay state taxes?',
    answer:
      'It depends on the state. Some states (California, Virginia, New Mexico, New York, South Carolina) are extremely aggressive about claiming that expats remain residents for tax purposes. Others (Texas, Florida, Nevada, Washington, Tennessee) have no state income tax, so there is no filing obligation. To stop filing state taxes, you must generally: (1) establish a new domicile in another state or country, (2) sever as many ties as possible with the old state (sell property, cancel voter registration, surrender driver\'s license, close bank accounts), and (3) document your intent to remain abroad permanently. Each state has different safe-harbor rules and presumptions.',
    relatedGuideSlugs: [],
    relatedBlogSlugs: ['state-tax-obligations-americans-abroad', 'best-state-domicile-expats'],
    relatedServiceSlugs: ['expat-tax-filing'],
    relatedFaqs: [
      { slug: 'how-to-stop-filing-state-taxes-abroad', question: 'How to stop filing state taxes abroad?' },
      { slug: 'do-i-need-to-file-fbar', question: 'Do I need to file FBAR?' },
    ],
  },
  {
    slug: 'am-i-accidental-american',
    title: 'Am I an Accidental American? — Tax Filing Guide for Unknowing US Citizens',
    description:
      'Accidental Americans are people who hold US citizenship without realizing it — typically born in the US to foreign parents or born abroad to American parents. Learn your filing obligations and options.',
    question: 'Am I an accidental American?',
    answer:
      'You may be an accidental American if: (1) you were born in the United States to foreign parents and acquired US citizenship at birth, even if you left as an infant and have never returned, or (2) you were born abroad to a US citizen parent who met the residency requirements to transmit citizenship. Many accidental Americans discover their status only when a foreign bank requests a US tax identification number or sends a FATCA letter. As a US citizen, you are required to file US tax returns regardless of where you live, and you may also have FBAR and Form 8938 obligations. Options include coming into compliance via Streamlined Filing or renouncing citizenship.',
    relatedGuideSlugs: ['expat-tax-guide'],
    relatedBlogSlugs: ['what-is-accidental-american', 'accidental-american-filing-requirements'],
    relatedServiceSlugs: ['streamlined-filing'],
    relatedFaqs: [
      { slug: 'accidental-american-taxes', question: 'What are an accidental American\'s tax obligations?' },
      { slug: 'what-is-streamlined-filing', question: 'What is Streamlined Filing?' },
    ],
  },
  {
    slug: 'fbar-10000-threshold',
    title: 'FBAR $10,000 Threshold Explained for US Expats (2026)',
    description:
      'The FBAR $10,000 threshold is aggregate across all foreign accounts. Learn how it works, what counts toward the limit, and common mistakes expats make.',
    question: 'What is the FBAR $10,000 threshold?',
    answer:
      'The $10,000 FBAR threshold is aggregate across all your foreign financial accounts. You must file FinCEN Form 114 if the combined maximum value of all accounts exceeded $10,000 at any time during the calendar year. This includes checking, savings, brokerage, and certain pension accounts held with foreign financial institutions. Even if no single account exceeded $10,000, the aggregate total triggers the filing requirement. For 2026, non-willful penalties assessed on or after January 17, 2025 can reach $16,536 per unfiled form per year. Willful violations carry penalties of $165,353 or 50% of the account balance.',
    relatedGuideSlugs: ['fbar-guide'],
    relatedBlogSlugs: ['fbar-requirements-americans-abroad', 'fbar-vs-fatca'],
    relatedServiceSlugs: ['fbar-filing'],
    relatedFaqs: [
      { slug: 'do-i-need-to-file-fbar', question: 'Do I need to file FBAR?' },
      { slug: 'do-i-report-foreign-gift', question: 'Do I need to report a foreign gift?' },
    ],
  },
  {
    slug: 'can-i-use-feie-remote-work',
    title: 'Can You Claim FEIE for Remote Work Abroad? (2026 Rules)',
    description:
      'Remote workers abroad can claim the FEIE if they meet the physical presence or bona fide residence test. Learn the rules, limits, and common traps for 2026.',
    question: 'Can I claim FEIE for remote work?',
    answer:
      'Yes, you can claim the Foreign Earned Income Exclusion for remote work if you meet either the physical presence test or the bona fide residence test. The physical presence test requires 330 full days outside the US in a 12-month period, while the bona fide residence test requires establishing genuine residence in a foreign country. For 2026, the FEIE limit is $132,900 per person. The income must be earned income — wages, salaries, or self-employment income — and you must have a foreign tax home. Simply working remotely from a beach for three months does not qualify unless you meet the full test requirements.',
    relatedGuideSlugs: ['feie-guide'],
    relatedBlogSlugs: ['feie-remote-workers-contractors-abroad', 'physical-presence-test-330-days'],
    relatedServiceSlugs: ['expat-tax-filing'],
    relatedFaqs: [
      { slug: 'do-expats-pay-state-taxes', question: 'Do expats pay state taxes?' },
      { slug: 'digital-nomad-state-taxes', question: 'Do digital nomads owe state taxes?' },
    ],
  },
  {
    slug: 'am-i-eligible-streamlined',
    title: 'Am I Eligible for Streamlined Filing? Expat Compliance Guide',
    description:
      'Streamlined Foreign Offshore is for non-willful non-filers living abroad. Learn who qualifies, what non-willful means, and how to catch up penalty-free.',
    question: 'Am I eligible for Streamlined Filing?',
    answer:
      'You are eligible for Streamlined Foreign Offshore if you are a US taxpayer living abroad, have not filed required tax returns or FBARs, and your failure to file was non-willful. Non-willful means your conduct was due to negligence, inadvertence, or mistake — not intentional evasion. You must file the most recent 3 years of delinquent tax returns, the most recent 6 years of delinquent FBARs, and Form 14653 certifying non-willfulness. The IRS waives all failure-to-file and failure-to-pay penalties if your submission is accepted. This program is not available if the IRS has already initiated an examination or criminal investigation.',
    relatedGuideSlugs: ['streamlined-filing-guide'],
    relatedBlogSlugs: ['delinquent-fbar-filing-how-to-catch-up', 'fbar-penalties-bittner-case-explained'],
    relatedServiceSlugs: ['streamlined-filing'],
    relatedFaqs: [
      { slug: 'what-is-streamlined-filing', question: 'What is Streamlined Filing?' },
      { slug: 'how-to-stop-filing-state-taxes-abroad', question: 'How to stop filing state taxes abroad?' },
    ],
  },
  {
    slug: 'how-to-stop-filing-state-taxes-abroad',
    title: 'How to Stop Filing State Taxes While Living Abroad (2026)',
    description:
      'Expats in aggressive states like California and Virginia must formally terminate residency to stop filing. Learn the steps, domicile rules, and safe harbors.',
    question: 'How to stop filing state taxes abroad?',
    answer:
      'To stop filing state taxes abroad, you must generally terminate your state domicile and establish a new domicile in another state or foreign country. Start by moving to a no-tax state like Texas or Florida before leaving the US, or document your intent to remain abroad permanently. Sever ties aggressively: sell property, cancel voter registration, surrender your driver\'s license, and close bank accounts in the old state. Aggressive states like California, Virginia, New Mexico, New York, and South Carolina presume you remain a resident until you prove otherwise. Each state has different safe-harbor rules, so documentation and timing are critical.',
    relatedGuideSlugs: [],
    relatedBlogSlugs: ['state-tax-obligations-americans-abroad'],
    relatedServiceSlugs: ['expat-tax-filing'],
    relatedFaqs: [
      { slug: 'do-expats-pay-state-taxes', question: 'Do expats pay state taxes?' },
      { slug: 'digital-nomad-state-taxes', question: 'Do digital nomads owe state taxes?' },
    ],
  },
  {
    slug: 'can-i-collect-social-security-abroad',
    title: 'Can US Expats Collect Social Security Abroad? 2026 Guide',
    description:
      'Most Americans can collect Social Security while living abroad, but some countries restrict payments. Learn the rules, tax treatment, and how to keep benefits active.',
    question: 'Can I collect Social Security abroad?',
    answer:
      'Yes, you can collect Social Security benefits while living abroad in most countries. The Social Security Administration sends payments to eligible recipients in nearly every country, with limited exceptions like Cuba and North Korea. If you work while receiving benefits and are under full retirement age, your benefits may be reduced if you earn above the annual limit — approximately $24,000 for 2026. Your benefits may be taxable in the US depending on your combined income, and some foreign countries tax them under local law or treaty provisions. You must report the income on your US tax return regardless of where you live.',
    relatedGuideSlugs: ['foreign-pensions-guide'],
    relatedBlogSlugs: ['social-security-ecuador-taxes', 'best-countries-retire-taxes-american-retirees'],
    relatedServiceSlugs: ['expat-tax-filing'],
    relatedFaqs: [
      { slug: 'ira-contributions-expat', question: 'Can I make IRA contributions as an expat?' },
      { slug: 'is-my-foreign-pension-taxable', question: 'Is my foreign pension taxable in the US?' },
    ],
  },
  {
    slug: 'ira-contributions-expat',
    title: 'Can Expats Make IRA Contributions? US Retirement Rules 2026',
    description:
      'US citizens abroad can contribute to IRAs, but foreign earned income exclusions and no US taxable income can block eligibility. Learn the workaround strategies.',
    question: 'Can I make IRA contributions as an expat?',
    answer:
      'You can contribute to a traditional or Roth IRA as an expat, but only if you have taxable compensation that is not fully excluded by the FEIE or foreign housing exclusion. If you exclude all your income using the FEIE, you have no taxable compensation left for IRA contribution purposes. One workaround is to claim only part of the FEIE and use the foreign tax credit for the remainder, which preserves taxable income for IRA eligibility. For 2026, the IRA contribution limit is $7,000 if you are under 50, or $8,000 if you are 50 or older. You must have US-sourced or unexcluded foreign earned income to qualify.',
    relatedGuideSlugs: ['foreign-pensions-guide'],
    relatedBlogSlugs: ['best-countries-retire-taxes-american-retirees', 'feie-vs-foreign-tax-credit'],
    relatedServiceSlugs: ['expat-tax-filing'],
    relatedFaqs: [
      { slug: 'can-i-collect-social-security-abroad', question: 'Can I collect Social Security abroad?' },
      { slug: 'is-my-foreign-pension-taxable', question: 'Is my foreign pension taxable in the US?' },
    ],
  },
  {
    slug: 'is-my-foreign-pension-taxable',
    title: 'Is My Foreign Pension Taxable in the US? Expat Guide 2026',
    description:
      'Foreign pensions are generally taxable in the US, but treaty benefits and local tax credits may reduce the bill. Learn reporting rules and PFIC traps inside pensions.',
    question: 'Is my foreign pension taxable in the US?',
    answer:
      'Most foreign pension distributions are taxable in the US as ordinary income, though tax treaties may allow you to defer taxation or claim exclusions until distribution. Employer contributions and growth in the plan are often taxed in the US unless a treaty specifically exempts them. Some foreign pension wrappers contain PFIC investments, which trigger Form 8621 reporting and punitive tax treatment under the excess distribution regime. You generally cannot roll a foreign pension into a US IRA. Report the income on your US return and claim the foreign tax credit for any local taxes paid to avoid double taxation.',
    relatedGuideSlugs: ['foreign-pensions-guide'],
    relatedBlogSlugs: ['australian-superannuation-us-taxpayers', 'uk-sipp-us-taxpayers-guide'],
    relatedServiceSlugs: ['expat-tax-filing'],
    relatedFaqs: [
      { slug: 'can-i-collect-social-security-abroad', question: 'Can I collect Social Security abroad?' },
      { slug: 'ira-contributions-expat', question: 'Can I make IRA contributions as an expat?' },
    ],
  },
  {
    slug: 'is-my-foreign-fund-a-pfic',
    title: 'Is My Foreign Mutual Fund a PFIC? Identification Guide 2026',
    description:
      'Most foreign mutual funds and ETFs are PFICs under US tax law. Learn the income and asset tests, why it matters, and how to avoid the worst tax outcomes.',
    question: 'Is my foreign mutual fund a PFIC?',
    answer:
      'Your foreign mutual fund is almost certainly a PFIC if it is a foreign corporation that earns 75% or more passive income or holds 50% or more passive assets. Most foreign-domiciled mutual funds, ETFs, and unit trusts meet this definition because they pool investor money and generate dividends, interest, or capital gains. If you own shares directly or through a foreign brokerage account, you must file Form 8621 annually. Without a QEF or mark-to-market election, distributions are taxed under the excess distribution method with interest charges that can wipe out gains. Check the fund\'s domicile and asset mix before investing.',
    relatedGuideSlugs: ['pfic-guide'],
    relatedBlogSlugs: ['pfic-identification-checklist', 'pfic-qef-vs-mark-to-market'],
    relatedServiceSlugs: ['expat-tax-filing'],
    relatedFaqs: [
      { slug: 'what-is-pfic', question: 'What is a PFIC?' },
      { slug: 'do-i-need-form-5471', question: 'Do I need to file Form 5471?' },
    ],
  },
  {
    slug: 'do-i-report-foreign-gift',
    title: 'Do You Need to Report a Foreign Gift? IRS Rules for 2026',
    description:
      'Foreign gifts over $100,000 from non-resident aliens must be reported on Form 3520. Learn the thresholds, penalties for non-filing, and what counts as a gift.',
    question: 'Do I need to report a foreign gift?',
    answer:
      'You must report foreign gifts on Form 3520 if you receive more than $100,000 in aggregate from non-resident aliens or foreign estates during the tax year. Gifts from foreign corporations or partnerships have a lower threshold that is indexed annually, approximately $18,500 for 2026. The gift itself is not taxable income to you, but failure to file Form 3520 can trigger penalties of 5% per month up to 25% of the gift amount. Bequests and inheritances from foreign estates are reported on the same form. You must file by the due date of your income tax return, including extensions.',
    relatedGuideSlugs: ['foreign-trusts-guide'],
    relatedBlogSlugs: ['foreign-gift-reporting-form-3520', 'foreign-inheritance-us-tax'],
    relatedServiceSlugs: ['fatca-compliance'],
    relatedFaqs: [
      { slug: 'foreign-inheritance-us-tax', question: 'Do I need to report a foreign inheritance on Form 3520?' },
      { slug: 'fbar-10000-threshold', question: 'What is the FBAR $10,000 threshold?' },
    ],
  },
  {
    slug: 'foreign-inheritance-us-tax',
    title: 'Foreign Inheritance Form 3520 Reporting: $100,000 Threshold',
    description:
      'Learn when a US person must report a foreign inheritance on Form 3520, how the $100,000 threshold works, and which records to keep.',
    question: 'Do I need to report a foreign inheritance on Form 3520?',
    answer:
      'A foreign inheritance is generally not subject to US income tax when you receive it, but you may still need to report it on Form 3520 if the amount exceeds $100,000 from a non-resident alien or foreign estate. The foreign estate itself may owe US estate tax if the decedent was a US citizen or domiciliary, or if the estate held US situs assets. If you are a covered expatriate, special inheritance tax rules under Section 2801 may impose a tax on gifts or bequests you receive from that person. Keep detailed records of the inheritance, including appraisals and currency conversion rates. Consult a cross-border estate attorney if the estate exceeds the unified credit threshold.',
    relatedGuideSlugs: ['foreign-trusts-guide'],
    relatedBlogSlugs: ['foreign-gift-reporting-form-3520', 'foreign-inheritance-us-tax'],
    relatedServiceSlugs: ['expat-tax-filing'],
    relatedFaqs: [
      { slug: 'do-i-report-foreign-gift', question: 'Do I need to report a foreign gift?' },
      { slug: 'do-i-need-to-file-fbar', question: 'Do I need to file FBAR?' },
    ],
  },
  {
    slug: 'do-i-need-form-5471',
    title: 'Do You Need to File Form 5471? US Expats with Foreign Corps',
    description:
      'Form 5471 is required for US persons who own 10% or more of a foreign corporation. Learn the five filing categories, penalties, and GILTI reporting overlap.',
    question: 'Do I need to file Form 5471?',
    answer:
      'You must file Form 5471 if you are a US person who owns 10% or more of a foreign corporation, or if you are an officer or director of a foreign corporation with 10% or more US ownership. There are five filing categories with different reporting requirements based on ownership percentage, controlled foreign corporation status, and other factors. A CFC is a foreign corporation where US shareholders own more than 50% in aggregate. Form 5471 is filed with your individual tax return and carries a $10,000 penalty for each late or incomplete form. If the foreign corporation is a CFC, you may also have GILTI income to report on Form 8992.',
    relatedGuideSlugs: ['cfc-guide'],
    relatedBlogSlugs: ['form-5471-filing-categories', 'gilti-individual-cfc-owners'],
    relatedServiceSlugs: ['expat-tax-filing'],
    relatedFaqs: [
      { slug: 'what-is-gilti', question: 'What is GILTI tax?' },
      { slug: 'is-my-foreign-fund-a-pfic', question: 'Is my foreign mutual fund a PFIC?' },
    ],
  },
  {
    slug: 'what-is-gilti',
    title: 'What Is GILTI Tax? US Expats with Foreign Corporations (2026)',
    description:
      'GILTI taxes US shareholders on intangible income earned by their foreign corporations. Learn the rules, Section 250 deduction, and how individuals can mitigate it.',
    question: 'What is GILTI tax?',
    answer:
      'GILTI — Global Intangible Low-Taxed Income — is a US tax regime that forces individual shareholders of CFCs to pay US tax on certain foreign corporate earnings. For 2026, US individual shareholders generally cannot claim the Section 250 deduction that corporations enjoy, which means GILTI is taxed at your full ordinary income rate. You may be able to make a Section 962 election to be taxed as a corporation and claim the 50% deduction, reducing the effective rate. GILTI is reported on Form 8992 and flows through to your individual return. If you own a foreign operating business, plan carefully — GILTI can create tax liability even when no cash is distributed to you.',
    relatedGuideSlugs: ['cfc-guide'],
    relatedBlogSlugs: ['gilti-individual-cfc-owners', 'form-5471-filing-categories'],
    relatedServiceSlugs: ['expat-tax-filing'],
    relatedFaqs: [
      { slug: 'do-i-need-form-5471', question: 'Do I need to file Form 5471?' },
      { slug: 'is-my-foreign-fund-a-pfic', question: 'Is my foreign mutual fund a PFIC?' },
    ],
  },
  {
    slug: 'how-to-avoid-covered-expatriate-status',
    title: 'How to Avoid Covered Expatriate Status: Exit Tax Guide 2026',
    description:
      'Covered expatriates face exit tax on worldwide assets and inheritance tax on future gifts. Learn the net worth and tax liability tests, and how to plan around them.',
    question: 'How to avoid covered expatriate status?',
    answer:
      'You are a covered expatriate if you meet any of three tests on the date before renunciation: net worth of $2 million or more, average annual net income tax liability exceeding $201,000 for the five years before expatriation, or failure to certify tax compliance for the prior five years. To avoid covered status, reduce your net worth below $2 million through legitimate estate planning, accelerate income into pre-expatriation years to manage the tax liability average, and ensure you are fully compliant for the five years prior to renouncing. If you are not compliant, use Streamlined Filing or another disclosure program to clean up before filing Form 8854. Dual citizens from birth and certain minors who meet limited conditions may qualify for exceptions.',
    relatedGuideSlugs: ['exit-tax-guide'],
    relatedBlogSlugs: ['covered-expatriate-test-exit-tax', 'form-8854-filing-deadline'],
    relatedServiceSlugs: ['expat-tax-filing'],
    relatedFaqs: [
      { slug: 'am-i-accidental-american', question: 'Am I an accidental American?' },
      { slug: 'accidental-american-taxes', question: 'What are an accidental American\'s tax obligations?' },
    ],
  },
  {
    slug: 'digital-nomad-state-taxes',
    title: 'Do Digital Nomads Owe State Taxes? US State Residency Guide',
    description:
      'Digital nomads often remain state tax residents even while traveling full-time. Learn which states chase nomads, how to break residency, and domicile documentation.',
    question: 'Do digital nomads owe state taxes?',
    answer:
      'Digital nomads frequently owe state taxes if they have not formally established a new domicile in a no-tax state or foreign country before hitting the road. States like California, New York, and Virginia use factors such as voter registration, driver\'s license, property ownership, and time spent in the state to assert residency. Simply leaving the US and working remotely does not automatically terminate state residency — you must actively sever ties and document your intent. Many nomads establish domicile in Texas, Florida, or Nevada before departing to eliminate state tax exposure. Keep records of your domicile change, travel logs, and foreign residence documentation in case of audit.',
    relatedGuideSlugs: ['feie-guide'],
    relatedBlogSlugs: ['feie-remote-workers-contractors-abroad', '1099-income-abroad-freelancers'],
    relatedServiceSlugs: ['expat-tax-filing'],
    relatedFaqs: [
      { slug: 'do-expats-pay-state-taxes', question: 'Do expats pay state taxes?' },
      { slug: 'how-to-stop-filing-state-taxes-abroad', question: 'How to stop filing state taxes abroad?' },
    ],
  },
  {
    slug: 'accidental-american-taxes',
    title: 'Accidental American Tax Obligations: Filing Guide for 2026',
    description:
      'Accidental Americans must file US tax returns regardless of where they live. Learn FEIE and FTC options, FATCA problems, and how Streamlined Filing can help.',
    question: 'What are an accidental American\'s tax obligations?',
    answer:
      'As an accidental American, you are subject to the same US tax filing obligations as any other citizen, including reporting worldwide income, FBARs, and FATCA forms. You can use the Foreign Earned Income Exclusion or Foreign Tax Credit to reduce or eliminate double taxation on foreign income. Many accidental Americans face bank account closures or FATCA reporting demands from foreign financial institutions. Streamlined Filing Compliance Procedures allow you to catch up on delinquent returns penalty-free if your failure to file was non-willful. Renunciation is an option, but it requires becoming compliant first and may trigger exit tax if you are a covered expatriate.',
    relatedGuideSlugs: ['expat-tax-guide'],
    relatedBlogSlugs: [],
    relatedServiceSlugs: ['streamlined-filing'],
    relatedFaqs: [
      { slug: 'am-i-accidental-american', question: 'Am I an accidental American?' },
      { slug: 'how-to-avoid-covered-expatriate-status', question: 'How to avoid covered expatriate status?' },
    ],
  },
  {
    slug: 'fbar',
    title: 'FBAR FAQ for Americans Abroad',
    description: 'Answers to the most common FBAR questions: accounts, thresholds, ownership, deadlines, and how FBAR differs from Form 8938.',
    question: 'What is an FBAR?',
    answer: 'An FBAR is the electronic Report of Foreign Bank and Financial Accounts filed with FinCEN by certain U.S. persons with reportable foreign financial accounts. The review includes account type, ownership or signature authority, maximum value, and the combined value of accounts during the calendar year. It is separate from the federal income-tax return and from Form 8938.',
    relatedGuideSlugs: ['fbar-guide'],
    relatedBlogSlugs: ['fbar-aggregating-multiple-countries', 'fbar-treasury-exchange-rates'],
    relatedServiceSlugs: ['fbar-filing'],
    relatedFaqs: [
      { slug: 'do-i-need-to-file-fbar', question: 'Do I need to file FBAR?' },
      { slug: 'fbar-10000-threshold', question: 'What is the FBAR threshold?' },
    ],
  },
  {
    slug: 'do-i-need-form-8938',
    title: 'Do I Need Form 8938? FATCA FAQ for Expats',
    description: 'A practical starting point for deciding whether your foreign financial assets require Form 8938 with your U.S. tax return.',
    question: 'Do I need Form 8938?',
    answer: 'You may need Form 8938 if you are a specified individual or entity, are required to file an income-tax return, and your specified foreign financial assets exceed the applicable filing-year thresholds. Filing status, foreign residence, ownership, asset type, and duplicative-reporting rules all matter. Use the current IRS instructions rather than relying on a generic threshold from an older article.',
    relatedGuideSlugs: ['fatca-guide'],
    relatedBlogSlugs: ['form-8938-thresholds-expats', 'fatca-foreign-assets-reporting'],
    relatedServiceSlugs: ['fatca-compliance'],
    relatedFaqs: [
      { slug: 'fatca-vs-fbar-difference', question: 'What is the difference between FATCA and FBAR?' },
      { slug: 'do-i-need-to-file-fbar', question: 'Do I need to file FBAR?' },
    ],
  },
  {
    slug: 'fatca-vs-fbar-difference',
    title: 'FATCA vs FBAR: What Is the Difference?',
    description: 'Understand the different agencies, forms, assets, thresholds, and filing systems behind FATCA Form 8938 and the FBAR.',
    question: 'What is the difference between FATCA and FBAR?',
    answer: 'FATCA Form 8938 is attached to an IRS income-tax return and covers specified foreign financial assets. The FBAR is filed electronically with FinCEN and focuses on reportable foreign financial accounts under the Bank Secrecy Act. The forms can overlap, but one does not replace the other. Compare the current instructions for both before deciding what to file.',
    relatedGuideSlugs: ['fatca-guide', 'fbar-guide'],
    relatedBlogSlugs: ['fbar-vs-fatca', 'fatca-foreign-assets-reporting'],
    relatedServiceSlugs: ['fatca-compliance', 'fbar-filing'],
    relatedFaqs: [
      { slug: 'fbar', question: 'What is an FBAR?' },
      { slug: 'do-i-need-form-8938', question: 'Do I need Form 8938?' },
    ],
  },
  {
    slug: 'what-is-feie',
    title: 'What Is FEIE? Eligibility Tests and Form 2555 FAQ',
    description: 'Learn what the FEIE does, which income can qualify, and why the physical-presence and bona-fide-residence tests matter.',
    question: 'What is the FEIE?',
    answer: 'The Foreign Earned Income Exclusion is claimed on Form 2555 and can exclude qualifying foreign earned income when a taxpayer satisfies the applicable physical-presence or bona-fide-residence test. It does not cover every kind of foreign income, does not automatically eliminate self-employment tax, and requires a filing-year review of the income and housing rules.',
    relatedGuideSlugs: ['feie-guide'],
    relatedBlogSlugs: ['physical-presence-test-330-days', 'bona-fide-residence-test-guide'],
    relatedServiceSlugs: ['expat-tax-filing'],
    relatedFaqs: [
      { slug: 'can-i-use-feie-remote-work', question: 'Can I use FEIE for remote work?' },
      { slug: 'feie-self-employment-income', question: 'Does FEIE cover self-employment income?' },
    ],
  },
  {
    slug: 'feie-self-employment-income',
    title: 'Does the FEIE Cover Self-Employment Income?',
    description: 'How the Foreign Earned Income Exclusion interacts with Schedule C income, self-employment tax, and the source of services.',
    question: 'Does the FEIE cover self-employment income?',
    answer: 'Self-employment income can qualify as foreign earned income when the underlying services and qualification tests support the exclusion. The FEIE generally does not eliminate U.S. self-employment tax by itself, and business expenses, foreign tax credits, totalization agreements, and entity structure can change the result. Model the income and tax separately.',
    relatedGuideSlugs: ['feie-guide'],
    relatedBlogSlugs: ['feie-remote-workers-contractors-abroad', 'self-employment-tax-digital-nomads'],
    relatedServiceSlugs: ['expat-tax-filing'],
    relatedFaqs: [
      { slug: 'what-is-feie', question: 'What is the FEIE?' },
      { slug: 'can-i-use-feie-remote-work', question: 'Can I use FEIE for remote work?' },
    ],
  },
  {
    slug: 'what-is-foreign-tax-credit',
    title: 'What Is the Foreign Tax Credit?',
    description: 'A clear explanation of Form 1116, creditable foreign income taxes, the limitation, and carryover concepts for expats.',
    question: 'What is the Foreign Tax Credit?',
    answer: 'The Foreign Tax Credit can reduce U.S. tax on qualifying foreign-source income by allowing a credit for certain foreign income taxes paid or accrued. Form 1116 separates income into categories and applies a limitation, so the result is not automatically a dollar-for-dollar credit against all U.S. tax. Review the current IRS instructions and keep records of the foreign levy, income source, currency, and carryovers.',
    relatedGuideSlugs: ['foreign-tax-credit-guide'],
    relatedBlogSlugs: ['ftc-form-1116-step-by-step', 'ftc-basket-categories-explained'],
    relatedServiceSlugs: ['expat-tax-filing'],
    relatedFaqs: [
      { slug: 'can-i-claim-ftc-and-feie', question: 'Can I claim the FTC and FEIE together?' },
      { slug: 'what-is-feie', question: 'What is the FEIE?' },
    ],
  },
  {
    slug: 'can-i-claim-ftc-and-feie',
    title: 'Can I Claim the Foreign Tax Credit and FEIE Together?',
    description: 'When an expat may use Form 2555 and Form 1116 in the same return, and why the same income cannot receive both benefits.',
    question: 'Can I claim the FTC and FEIE together?',
    answer: 'A taxpayer may use Form 2555 and Form 1116 in the same return when the forms apply to different income or related foreign taxes. Foreign tax connected to income excluded under the FEIE cannot also be used to claim a credit for that same excluded income. The allocation should be documented before either form is prepared.',
    relatedGuideSlugs: ['feie-guide', 'foreign-tax-credit-guide'],
    relatedBlogSlugs: ['feie-vs-foreign-tax-credit', 'ftc-high-tax-countries'],
    relatedServiceSlugs: ['expat-tax-filing'],
    relatedFaqs: [
      { slug: 'what-is-feie', question: 'What is the FEIE?' },
      { slug: 'what-is-foreign-tax-credit', question: 'What is the Foreign Tax Credit?' },
    ],
  },
  {
    slug: 'streamlined-vs-voluntary-disclosure',
    title: 'Streamlined vs. Voluntary Disclosure: Choosing a Catch-Up Path | FAQ',
    description: 'Compare the non-willful Streamlined procedures with voluntary disclosure and understand why the willfulness analysis comes first.',
    question: 'What is the difference between Streamlined Filing and Voluntary Disclosure?',
    answer: 'Streamlined procedures are for taxpayers who can truthfully certify that their failure to report and pay was non-willful. Voluntary disclosure is a different path for taxpayers with potential willful conduct and possible criminal exposure. The correct procedure depends on the full history, notices, assets, returns, and advice—not on the size of the account alone.',
    relatedGuideSlugs: ['streamlined-filing-guide'],
    relatedBlogSlugs: ['streamlined-vs-delinquent-fbar-procedures', 'streamlined-non-willful-statement-guide'],
    relatedServiceSlugs: ['streamlined-filing'],
    relatedFaqs: [
      { slug: 'what-is-streamlined-filing', question: 'What is Streamlined Filing?' },
      { slug: 'am-i-eligible-streamlined', question: 'Am I eligible for Streamlined Filing?' },
    ],
  },
  {
    slug: 'what-is-exit-tax',
    title: 'What Is the U.S. Expatriation Exit Tax?',
    description: 'An overview of the exit-tax framework, covered-expatriate tests, Form 8854, and why renunciation does not answer the tax question by itself.',
    question: 'What is the exit tax?',
    answer: 'The expatriation tax can apply to certain former U.S. citizens and long-term lawful permanent residents who meet the statutory covered-expatriate tests. The analysis can involve net worth, prior-year tax liability, tax compliance certification, deemed-sale rules, deferred compensation, and Form 8854. Citizenship or green-card status, dates, assets, and prior filings must be reviewed together.',
    relatedGuideSlugs: ['exit-tax-guide'],
    relatedBlogSlugs: ['what-is-exit-tax-renouncing-citizenship', 'renouncing-us-citizenship-tax-consequences'],
    relatedServiceSlugs: ['expat-tax-filing'],
    relatedFaqs: [
      { slug: 'how-to-avoid-covered-expatriate-status', question: 'How is covered-expatriate status analyzed?' },
      { slug: 'am-i-accidental-american', question: 'Am I an accidental American?' },
    ],
  },
  {
    slug: 'foreign-pension-form-3520-or-8621',
    title: 'Foreign Pension: Form 3520 or Form 8621?',
    description: 'Why a foreign pension can require a trust, PFIC, FATCA, FBAR, or treaty review before any U.S. form is selected.',
    question: 'Does a foreign pension require Form 3520 or Form 8621?',
    answer: 'There is no universal form answer for a foreign pension. The plan’s legal structure, treaty, underlying investments, trust classification, employer relationship, and distribution rules can affect Form 3520, Form 8621, Form 8938, FBAR, and income reporting. Obtain the plan documents and holdings before choosing a form.',
    relatedGuideSlugs: ['foreign-pensions-guide', 'pfic-guide'],
    relatedBlogSlugs: ['foreign-pension-form-3520', 'pfic-foreign-pensions-trap'],
    relatedServiceSlugs: ['expat-tax-filing'],
    relatedFaqs: [
      { slug: 'is-my-foreign-pension-taxable', question: 'Is my foreign pension taxable in the U.S.?' },
      { slug: 'what-is-pfic', question: 'What is a PFIC?' },
    ],
  },
  {
    slug: 'do-digital-nomads-pay-us-taxes',
    title: 'Do Digital Nomads Pay U.S. Taxes?',
    description: 'How citizenship, residence, income source, FEIE, FTC, state domicile, and self-employment rules affect digital nomad tax filing.',
    question: 'Do digital nomads pay U.S. taxes?',
    answer: 'U.S. citizens and resident aliens generally remain subject to U.S. tax on worldwide income while abroad. Digital nomads may qualify for the FEIE or Foreign Tax Credit, but those benefits do not automatically cover every income type or eliminate self-employment or state-tax issues. Track where services were performed, where you are resident, and where your domicile remains.',
    relatedGuideSlugs: ['digital-nomad-tax-guide'],
    relatedBlogSlugs: ['digital-nomad-tax-residency', 'feie-digital-nomads-multiple-countries'],
    relatedServiceSlugs: ['expat-tax-filing'],
    relatedFaqs: [
      { slug: 'can-i-use-feie-remote-work', question: 'Can I use FEIE for remote work?' },
      { slug: 'digital-nomad-state-taxes', question: 'Do digital nomads owe state taxes?' },
    ],
  },
  {
    slug: 'self-employment-tax-abroad',
    title: 'Self-Employment Tax Abroad FAQ',
    description: 'Answers about Schedule C, self-employment tax, FEIE, Foreign Tax Credit, totalization agreements, and foreign business entities.',
    question: 'Do self-employed Americans abroad pay U.S. self-employment tax?',
    answer: 'Self-employed Americans abroad must review U.S. Schedule C and self-employment tax rules even when the services are performed outside the United States. The FEIE generally does not remove self-employment tax by itself. A totalization agreement or a different business structure may affect the result, but the country, coverage certificate, entity, and services must be reviewed.',
    relatedGuideSlugs: ['expat-tax-guide'],
    relatedBlogSlugs: ['self-employment-tax-digital-nomads', 'schedule-c-abroad-self-employed'],
    relatedServiceSlugs: ['expat-tax-filing'],
    relatedFaqs: [
      { slug: 'feie-self-employment-income', question: 'Does the FEIE cover self-employment income?' },
      { slug: 'quarterly-taxes-expats', question: 'Do expats need quarterly tax payments?' },
    ],
  },
  {
    slug: 'quarterly-taxes-expats',
    title: 'Do Expats Need Quarterly Estimated Tax Payments?',
    description: 'How self-employed and investment-income taxpayers abroad should think about estimated payments, withholding, and safe documentation.',
    question: 'Do expats need quarterly tax payments?',
    answer: 'An expat may need estimated tax payments when withholding is not enough to cover the expected U.S. tax. The calculation depends on worldwide income, foreign tax credits, FEIE, self-employment tax, filing status, and prior-year tax. Use the current IRS estimated-tax instructions and document how foreign taxes and timing were modeled.',
    relatedGuideSlugs: ['expat-tax-guide'],
    relatedBlogSlugs: ['quarterly-estimated-taxes-expats', 'self-employment-tax-digital-nomads'],
    relatedServiceSlugs: ['expat-tax-filing'],
    relatedFaqs: [
      { slug: 'self-employment-tax-abroad', question: 'Do self-employed Americans abroad pay U.S. self-employment tax?' },
      { slug: 'what-is-foreign-tax-credit', question: 'What is the Foreign Tax Credit?' },
    ],
  },
  {
    slug: 'do-green-card-holders-file-abroad',
    title: 'Do Green Card Holders File U.S. Taxes While Abroad?',
    description: 'How lawful permanent residents living outside the United States should review worldwide-income filing, residency, FBAR, and expatriation rules.',
    question: 'Do green card holders file U.S. taxes while abroad?',
    answer: 'A lawful permanent resident may remain a U.S. resident for tax purposes while living abroad and may have a worldwide-income filing obligation. Leaving the United States, letting a card expire, or filing Form I-407 does not by itself answer the tax-residency or expatriation questions. Review immigration status, tax residency, treaty rules, and the date of any formal abandonment together.',
    relatedGuideSlugs: ['green-card-holders-abroad'],
    relatedBlogSlugs: ['green-card-holder-filing-requirements', 'green-card-expired-abroad-taxes'],
    relatedServiceSlugs: ['expat-tax-filing'],
    relatedFaqs: [
      { slug: 'what-is-exit-tax', question: 'What is the exit tax?' },
      { slug: 'do-i-need-to-file-fbar', question: 'Do I need to file FBAR?' },
    ],
  },
  {
    slug: 'can-i-file-jointly-foreign-spouse',
    title: 'Can I File Jointly With a Foreign Spouse?',
    description: 'How filing status, the nonresident-spouse election, worldwide income, and taxpayer identification affect expat couples.',
    question: 'Can I file jointly with a foreign spouse?',
    answer: 'A U.S. citizen or resident may be able to elect to treat a nonresident alien spouse as a U.S. resident and file jointly, but the election generally brings the spouse’s worldwide income into the U.S. return and requires the applicable identification and consent. Filing separately can produce a different result. Review the current Form 1040 and election instructions before choosing.',
    relatedGuideSlugs: ['expat-tax-guide'],
    relatedBlogSlugs: ['filing-jointly-foreign-spouse', 'non-resident-alien-spouse-election'],
    relatedServiceSlugs: ['expat-tax-filing'],
    relatedFaqs: [
      { slug: 'self-employment-tax-abroad', question: 'Do self-employed Americans abroad pay U.S. self-employment tax?' },
      { slug: 'do-i-need-to-file-fbar', question: 'Do I need to file FBAR?' },
    ],
  },
  {
    slug: 'do-tax-treaties-prevent-double-taxation',
    title: 'Do Tax Treaties Prevent Double Taxation?',
    description: 'Why treaties can reduce double taxation but do not automatically exempt U.S. citizens from U.S. tax or remove information-reporting duties.',
    question: 'Do tax treaties prevent double taxation?',
    answer: 'Tax treaties can allocate taxing rights, provide relief, or coordinate credits, but they do not automatically eliminate U.S. filing or tax for a U.S. citizen. The treaty article, saving clause, taxpayer status, source of income, and disclosure rules must be reviewed. The Foreign Tax Credit is often part of the analysis, not a substitute for reading the treaty.',
    relatedGuideSlugs: ['tax-treaties-guide'],
    relatedBlogSlugs: ['ftc-treaty-benefits', 'tax-treaty-tie-breaker-rules'],
    relatedServiceSlugs: ['expat-tax-filing'],
    relatedFaqs: [
      { slug: 'treaty-savings-clause', question: 'What is a treaty saving clause?' },
      { slug: 'what-is-foreign-tax-credit', question: 'What is the Foreign Tax Credit?' },
    ],
  },
  {
    slug: 'treaty-savings-clause',
    title: 'What Is a Tax Treaty Saving Clause?',
    description: 'How the saving clause can preserve a country’s right to tax its citizens and residents despite other treaty articles.',
    question: 'What is a treaty saving clause?',
    answer: 'A saving clause generally preserves a country’s ability to tax its citizens or residents as if the treaty had not entered into force, subject to listed exceptions. For U.S. citizens abroad, this is why a residence-country treaty article does not automatically erase U.S. tax. Read the specific treaty and protocol for the income category at issue.',
    relatedGuideSlugs: ['tax-treaties-guide'],
    relatedBlogSlugs: ['tax-treaty-tie-breaker-rules', 'ftc-treaty-benefits'],
    relatedServiceSlugs: ['expat-tax-filing'],
    relatedFaqs: [
      { slug: 'do-tax-treaties-prevent-double-taxation', question: 'Do tax treaties prevent double taxation?' },
      { slug: 'what-is-foreign-tax-credit', question: 'What is the Foreign Tax Credit?' },
    ],
  },
  {
    slug: 'do-i-report-crypto-abroad',
    title: 'Do I Report Cryptocurrency Held Abroad?',
    description: 'A fact-based starting point for digital assets held at foreign exchanges, custodians, or private wallets.',
    question: 'Do I report crypto held abroad?',
    answer: 'Digital-asset income and foreign-asset information reporting are separate questions. Review the custody platform, legal entity, account structure, asset type, transactions, and current IRS and FinCEN guidance. A foreign exchange account, self-custodied wallet, and DeFi position should not be treated as identical facts.',
    relatedGuideSlugs: ['crypto-taxes-expats'],
    relatedBlogSlugs: ['crypto-exchange-foreign-account', 'fatca-cryptocurrency-reporting'],
    relatedServiceSlugs: ['expat-tax-filing'],
    relatedFaqs: [
      { slug: 'crypto-fbar', question: 'Does crypto require an FBAR?' },
      { slug: 'do-i-need-form-8938', question: 'Do I need Form 8938?' },
    ],
  },
  {
    slug: 'crypto-fbar',
    title: 'Does Cryptocurrency Require an FBAR?',
    description: 'Why the answer depends on custody, the foreign institution, and current FinCEN guidance rather than the word cryptocurrency alone.',
    question: 'Does crypto require an FBAR?',
    answer: 'An FBAR analysis depends on whether the digital asset is held in a reportable foreign financial account under the applicable FinCEN rules. A custodial account at a foreign platform and a self-custodied wallet are different fact patterns. Preserve platform agreements, account location, maximum values, and transaction records, then apply the filing-year guidance.',
    relatedGuideSlugs: ['fbar-guide', 'crypto-taxes-expats'],
    relatedBlogSlugs: ['crypto-exchange-foreign-account', 'fbar-cryptocurrency-foreign-exchanges'],
    relatedServiceSlugs: ['fbar-filing'],
    relatedFaqs: [
      { slug: 'do-i-report-crypto-abroad', question: 'Do I report crypto held abroad?' },
      { slug: 'fbar', question: 'What is an FBAR?' },
    ],
  },
  {
    slug: 'can-irs-audit-me-abroad',
    title: 'Can the IRS Audit Me While I Live Abroad?',
    description: 'What living outside the United States changes—and does not change—about IRS notices, examinations, records, and representation.',
    question: 'Can the IRS audit me while I live abroad?',
    answer: 'Living abroad does not prevent the IRS from examining a return or requesting records. International correspondence, foreign-account information, time zones, language, and document delivery can complicate the process, but the response deadline on the notice still matters. Preserve the notice envelope, identify the years and forms involved, and obtain representation when the issue is high stakes.',
    relatedGuideSlugs: ['irs-notices-expats'],
    relatedBlogSlugs: ['irs-find-me-abroad', 'expat-statute-limitations'],
    relatedServiceSlugs: ['expat-tax-filing'],
    relatedFaqs: [
      { slug: 'what-to-do-irs-notice-abroad', question: 'What should I do with an IRS notice abroad?' },
      { slug: 'do-i-need-to-file-fbar', question: 'Do I need to file FBAR?' },
    ],
  },
  {
    slug: 'what-to-do-irs-notice-abroad',
    title: 'What Should I Do With an IRS Notice While Abroad?',
    description: 'A practical first-response checklist for expats who receive an IRS notice, including deadlines, records, and escalation points.',
    question: 'What should I do with an IRS notice abroad?',
    answer: 'Read the notice completely, identify the response deadline and tax year, preserve every page and envelope, and compare the issue to the filed return and supporting documents. Do not ignore the notice because you live abroad or immediately send an explanation without checking the underlying account transcript. If the notice concerns foreign accounts, penalties, examination, or possible willfulness, seek qualified representation promptly.',
    relatedGuideSlugs: ['irs-notices-expats'],
    relatedBlogSlugs: ['cp2000-expat-what-to-do', 'irs-audit-expat-preparation'],
    relatedServiceSlugs: ['expat-tax-filing'],
    relatedFaqs: [
      { slug: 'can-irs-audit-me-abroad', question: 'Can the IRS audit me while I live abroad?' },
      { slug: 'do-i-need-to-file-fbar', question: 'Do I need to file FBAR?' },
    ],
  },
];

export function getFAQPageBySlug(slug: string): FAQPageEntry | undefined {
  return FAQ_PAGES.find((page) => page.slug === slug);
}

export function getAllFAQPageSlugs(): string[] {
  return FAQ_PAGES.map((page) => page.slug);
}
