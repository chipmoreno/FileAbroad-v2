export interface ComparisonPage {
  slug: string;
  title: string;
  description: string;
  leftTitle: string;
  rightTitle: string;
  leftPoints: { label: string; detail: string }[];
  rightPoints: { label: string; detail: string }[];
  keyDifferences: { aspect: string; left: string; right: string }[];
  whenToChooseLeft: string;
  whenToChooseRight: string;
  faqs: { question: string; answer: string }[];
  relatedGuideSlugs: string[];
  relatedServiceSlugs: string[];
  relatedBlogSlugs: string[];
}

export const COMPARISON_PAGES: ComparisonPage[] = [
  {
    slug: 'feie-vs-ftc',
    title: 'FEIE vs Foreign Tax Credit: Which Saves More for US Expats?',
    description:
      'Compare the Foreign Earned Income Exclusion (FEIE) and the Foreign Tax Credit (FTC) side by side. Learn which option reduces your US tax bill more based on your income, country, and filing status.',
    leftTitle: 'Foreign Earned Income Exclusion (FEIE)',
    rightTitle: 'Foreign Tax Credit (FTC)',
    leftPoints: [
      { label: 'Excludes income from tax', detail: 'The FEIE removes qualifying foreign earned income from your taxable income, up to the annual limit ($130,000 for 2025; $132,900 for 2026).' },
      { label: 'Simple calculation', detail: 'If you qualify, you simply exclude eligible income. No complex foreign tax calculations or carryforwards required.' },
      { label: 'Best for low-tax countries', detail: 'If you live in a country with no or low income tax (e.g., UAE, Singapore, some Caribbean nations), the FEIE usually produces a better result.' },
      { label: 'Housing exclusion available', detail: 'You can also claim the Foreign Housing Exclusion/Deduction for employer-provided or self-paid housing costs above a base amount.' },
    ],
    rightPoints: [
      { label: 'Credits tax paid abroad', detail: 'The FTC gives you a dollar-for-dollar credit for income taxes paid to a foreign country, reducing your US tax liability directly.' },
      { label: 'No income cap', detail: 'Unlike the FEIE, there is no limit on how much foreign tax you can credit. High earners in high-tax countries often benefit more from the FTC.' },
      { label: 'Best for high-tax countries', detail: 'If you live in a high-tax country (e.g., Germany, UK, France, Spain), the FTC usually eliminates or dramatically reduces your US tax.' },
      { label: 'Credits carry forward', detail: 'Excess foreign tax credits can be carried back 1 year or forward 10 years, providing flexibility across tax years.' },
    ],
    keyDifferences: [
      { aspect: 'Income limit', left: '$130,000 (2025) / $132,900 (2026)', right: 'No limit' },
      { aspect: 'Applies to', left: 'Foreign earned income only', right: 'Foreign sourced income (passive and active)' },
      { aspect: 'Qualifying tests', left: 'Physical Presence or Bona Fide Residence', right: 'None (but tax must be paid or accrued)' },
      { aspect: 'Effect on tax brackets', left: 'Stacking rule: excluded income still pushes other income into higher brackets', right: 'No stacking; credits reduce tax directly' },
      { aspect: 'IRA contribution eligibility', left: 'May reduce or eliminate earned income needed for IRA contributions', right: 'Does not affect earned income calculation' },
      { aspect: 'Self-employment tax', left: 'Does not reduce self-employment tax (15.3%)', right: 'Does not reduce self-employment tax (15.3%)' },
      { aspect: 'Form used', left: 'Form 2555', right: 'Form 1116' },
    ],
    whenToChooseLeft:
      'Choose the FEIE if you earn below or near the exclusion limit, live in a low-tax or no-tax country, have straightforward wage income, and want a simpler filing. It is especially powerful for digital nomads and remote workers in tax-friendly jurisdictions.',
    whenToChooseRight:
      'Choose the FTC if you earn significantly more than the FEIE limit, live in a high-tax country, have passive foreign income, or want to preserve your ability to contribute to an IRA. It is almost always better for expats in Western Europe and other high-tax jurisdictions.',
    faqs: [
      {
        question: 'Can I use both the FEIE and the FTC?',
        answer:
          'Yes, but not on the same income. You can use the FEIE to exclude earned income up to the limit, and then use the FTC on any remaining foreign income or on passive income that does not qualify for the FEIE. This hybrid approach requires both Form 2555 and Form 1116.',
      },
      {
        question: 'Can I switch from FEIE to FTC?',
        answer:
          'Yes, but revoking the FEIE election prevents you from re-electing it for 5 tax years without IRS approval. Before switching, model both scenarios carefully and consider whether you may need the FEIE again in the future.',
      },
      {
        question: 'Does the FEIE affect my ability to contribute to an IRA?',
        answer:
          'Yes. Because the FEIE excludes earned income from your US taxable income, it can reduce or eliminate the earned income you need to contribute to a Traditional or Roth IRA. The FTC does not have this effect because it only reduces your tax liability, not your reported earned income.',
      },
      {
        question: 'What is the stacking rule?',
        answer:
          'The stacking rule means that even though the FEIE removes foreign earned income from taxation, it still counts as income for the purpose of determining your tax bracket. Your remaining taxable income (e.g., US-sourced income, investment income) is taxed as if the excluded income were still there, pushing it into higher brackets.',
      },
    ],
    relatedGuideSlugs: ['feie-guide', 'foreign-tax-credit-guide'],
    relatedServiceSlugs: ['expat-tax-filing'],
    relatedBlogSlugs: ['feie-vs-foreign-tax-credit', 'feie-llc-owners-moving-abroad'],
  },
  {
    slug: 'fbar-vs-form-8938',
    title: 'FBAR vs Form 8938: What Is the Difference?',
    description:
      'FBAR (FinCEN Form 114) and IRS Form 8938 both report foreign financial assets, but they have different thresholds, filing requirements, and penalties. Learn which one you need to file — or whether you need both.',
    leftTitle: 'FBAR (FinCEN Form 114)',
    rightTitle: 'Form 8938 (FATCA)',
    leftPoints: [
      { label: 'Filed with FinCEN', detail: 'FBAR is filed electronically with the Financial Crimes Enforcement Network (FinCEN), not the IRS. It is an anti-money-laundering tool, not a tax form.' },
      { label: '$10,000 aggregate threshold', detail: 'You must file if the aggregate value of all your foreign financial accounts exceeded $10,000 at any time during the calendar year. This is a low threshold that catches almost every expat with more than one account.' },
      { label: 'Broader account coverage', detail: 'FBAR covers bank accounts, securities accounts, and any other financial account where a foreign financial institution holds assets for your benefit.' },
      { label: 'Signature authority counts', detail: 'You must file for accounts over which you have signature authority, even if you do not own the assets (e.g., business accounts, trust accounts).' },
    ],
    rightPoints: [
      { label: 'Filed with your tax return', detail: 'Form 8938 is filed with your Form 1040 and is an IRS information return under the Foreign Account Tax Compliance Act (FATCA).' },
      { label: 'Higher thresholds', detail: 'For taxpayers living abroad, the threshold is $200,000 at year-end or $300,000 at any time during the year (single; $400,000/$600,000 married filing jointly).' },
      { label: 'Broader asset coverage', detail: 'Form 8938 covers not only foreign financial accounts but also foreign stock, foreign partnership interests, foreign trusts, foreign pension plans, and foreign real estate held through a foreign entity.' },
      { label: 'No signature authority rule', detail: 'Form 8938 only covers assets you own or in which you have a beneficial interest. Signature authority alone does not trigger Form 8938.' },
    ],
    keyDifferences: [
      { aspect: 'Filing authority', left: 'FinCEN (Treasury)', right: 'IRS' },
      { aspect: 'Threshold (single, abroad)', left: '$10,000 aggregate', right: '$200,000 year-end / $300,000 anytime' },
      { aspect: 'Threshold (married, abroad)', left: '$10,000 aggregate', right: '$400,000 year-end / $600,000 anytime' },
      { aspect: 'What to report', left: 'Foreign financial accounts', right: 'Specified foreign financial assets (accounts + investments + entities)' },
      { aspect: 'Signature authority', left: 'Must report', right: 'Not reportable' },
      { aspect: 'Filing deadline', left: 'April 15 (auto-extended to Oct 15)', right: 'Same as tax return (June 15 auto-ext for expats)' },
      { aspect: 'Penalty (non-willful)', left: '$16,536 per form per year (post-Bittner)', right: '$10,000' },
      { aspect: 'Penalty (willful)', left: 'Greater of $165,353 or 50% of account balance', right: 'Up to $50,000 + 40% of underreported tax' },
    ],
    whenToChooseLeft:
      'You file the FBAR if you have foreign bank accounts, securities accounts, or signature authority over accounts with an aggregate balance exceeding $10,000 at any time during the year. Almost every expat with more than one modest foreign account meets this threshold.',
    whenToChooseRight:
      'You file Form 8938 if you are a specified individual with specified foreign financial assets exceeding the higher thresholds. If you have significant investments, foreign pensions, or business interests abroad, you likely need Form 8938 in addition to the FBAR.',
    faqs: [
      {
        question: 'Do I need to file both FBAR and Form 8938?',
        answer:
          'Often yes. If your foreign financial accounts exceed $10,000, you must file FBAR. If your total specified foreign financial assets also exceed the Form 8938 thresholds ($200,000/$300,000 single abroad), you must file both. Many expats file FBAR only, many file both, and some file neither if they are below both thresholds.',
      },
      {
        question: 'Can the same account be reported on both forms?',
        answer:
          'Yes. The same foreign bank account can be reported on both FBAR and Form 8938 if both thresholds are met. However, the forms ask for different information. FBAR wants account numbers, bank addresses, and maximum balances. Form 8938 wants asset categories, income generated, and how the asset is held.',
      },
      {
        question: 'What happens if I file one but not the other?',
        answer:
          'If you are required to file both but only file one, you face penalties for the missing form. The IRS and FinCEN share information, so filing one form does not protect you from penalties for failing to file the other.',
      },
      {
        question: 'Does my foreign pension go on FBAR or Form 8938?',
        answer:
          'It depends. Foreign pension accounts are generally reported on the FBAR if the pension is a financial account. Form 8938 may also require reporting depending on the pension type and whether it is a specified foreign financial asset. Some employer-sponsored pensions are exempt from Form 8938 but still reportable on FBAR.',
      },
    ],
    relatedGuideSlugs: ['fbar-guide', 'fatca-guide'],
    relatedServiceSlugs: ['fbar-filing', 'fatca-compliance'],
    relatedBlogSlugs: ['fbar-vs-fatca', 'fbar-requirements-americans-abroad'],
  },
  {
    slug: 'streamlined-vs-voluntary-disclosure',
    title: 'Streamlined Filing vs Voluntary Disclosure: Which IRS Program?',
    description:
      'Compare Streamlined Foreign Offshore and the Voluntary Disclosure Program. Learn which IRS catch-up path fits non-willful vs willful non-filers.',
    leftTitle: 'Streamlined Filing Compliance',
    rightTitle: 'Voluntary Disclosure Program',
    leftPoints: [
      { label: 'For non-willful non-filers', detail: 'Streamlined is designed for taxpayers whose failure to file was due to negligence, inadvertence, or mistake. You must certify under penalty of perjury that your conduct was non-willful.' },
      { label: 'Lower cost', detail: 'Streamlined Foreign Offshore waives all failure-to-file and failure-to-pay penalties. You only pay the tax due plus interest. This is dramatically cheaper than voluntary disclosure.' },
      { label: 'Simpler process', detail: 'File 3 years of tax returns, 6 years of FBARs, and Form 14653 with a non-willful certification. No amnesty application, no negotiations, no IRS Criminal Investigation involvement.' },
      { label: 'Available to expats', detail: 'Streamlined Foreign Offshore requires you to have lived outside the US for at least 330 days in 1 of the last 3 years. Streamlined Domestic Offshore is for US residents.' },
    ],
    rightPoints: [
      { label: 'For willful non-filers', detail: 'Voluntary Disclosure is for taxpayers who intentionally failed to report income or file required information returns. It provides protection from criminal prosecution.' },
      { label: 'Criminal protection', detail: 'The primary benefit is avoiding criminal prosecution for tax evasion or willful failure to file. This is essential if there is evidence of intentional non-compliance.' },
      { label: 'Higher cost', detail: 'You pay a penalty of 50% of the highest aggregate balance of foreign financial assets during the disclosure period, plus tax and interest. This can be tens or hundreds of thousands of dollars.' },
      { label: 'Complex process', detail: 'Requires a detailed disclosure statement, cooperation with IRS Criminal Investigation, and often takes 1-2 years to resolve. An attorney is essential.' },
    ],
    keyDifferences: [
      { aspect: 'Target audience', left: 'Non-willful non-filers', right: 'Willful non-filers' },
      { aspect: 'Criminal protection', left: 'None (civil only)', right: 'Protection from criminal prosecution' },
      { aspect: 'Penalties', left: 'Waived (tax + interest only)', right: '50% of highest offshore asset balance' },
      { aspect: 'Process complexity', left: 'Simple: file returns + certification', right: 'Complex: disclosure statement + CI review' },
      { aspect: 'Time to resolve', left: '3-6 months', right: '1-2 years' },
      { aspect: 'Professional required', left: 'Tax preparer (optional attorney)', right: 'Attorney (essential)' },
      { aspect: 'Residency requirement', left: 'Yes (Foreign Offshore)', right: 'No' },
      { aspect: 'IRS unit handling', left: 'Streamlined unit', right: 'Criminal Investigation' },
    ],
    whenToChooseLeft:
      'Choose Streamlined if your failure to file was non-willful — meaning you did not know about the requirement, were confused, or made a mistake. This covers most expats who simply did not realize they had to file US taxes from abroad. You must be able to certify under penalty of perjury that your conduct was non-willful.',
    whenToChooseRight:
      'Choose Voluntary Disclosure only if your failure to file was willful — meaning you intentionally hid income, knew about filing requirements but ignored them, or took steps to conceal assets. If there is any risk of criminal prosecution, consult a tax attorney immediately before making any disclosure.',
    faqs: [
      {
        question: 'What counts as "non-willful" for Streamlined?',
        answer:
          'Non-willful means your failure to file was due to negligence, inadvertence, mistake, or conduct that is the result of a good faith misunderstanding of the law. The IRS does not provide a bright-line test, but common examples include: not knowing about the requirement, relying on bad advice, or being overwhelmed by a move abroad. Willful blindness (deliberately avoiding learning the rules) may disqualify you.',
      },
      {
        question: 'Can I switch from Streamlined to Voluntary Disclosure?',
        answer:
          'Yes, but only if Streamlined has not been processed. If the IRS rejects your Streamlined submission due to willfulness concerns, you may need to enter Voluntary Disclosure. However, once you have submitted Streamlined, you cannot "upgrade" to Voluntary Disclosure for the same years. This is why assessing willfulness before filing is critical.',
      },
      {
        question: 'Do I need an attorney for Streamlined?',
        answer:
          'Not necessarily. Many taxpayers use a qualified tax preparer or CPA for Streamlined filings. However, if there is any doubt about willfulness, consult an attorney before submitting anything. Once you certify non-willfulness under penalty of perjury, you cannot later claim you did not understand the question.',
      },
    ],
    relatedGuideSlugs: ['streamlined-filing-guide'],
    relatedServiceSlugs: ['streamlined-filing'],
    relatedBlogSlugs: [],
  },
  {
    slug: 'pfic-excess-distribution-vs-mark-to-market',
    title: 'PFIC Methods: Excess Distribution vs Mark-to-Market vs QEF',
    description:
      'Compare the three PFIC tax regimes. Learn which election saves you the most on foreign mutual funds, ETFs, and pension wrappers.',
    leftTitle: 'Excess Distribution (Default)',
    rightTitle: 'Mark-to-Market Election',
    leftPoints: [
      { label: 'Automatic application', detail: 'If you do not make an election, the excess distribution method applies by default. This is the worst possible outcome for most taxpayers.' },
      { label: 'Punitive tax rates', detail: 'Excess distributions are taxed as ordinary income at the highest marginal rate. Interest charges apply to deferred tax, often resulting in effective rates exceeding 50%.' },
      { label: 'Complex calculations', detail: 'You must calculate the 3-year average, determine the excess, allocate it over the holding period, and compute interest on deferred amounts. This requires detailed records.' },
      { label: 'No election needed', detail: 'Because it is the default, you do not need to file anything to elect this method. However, you will almost always want to avoid it.' },
    ],
    rightPoints: [
      { label: 'Available for publicly traded stock', detail: 'You can only make a mark-to-market election for PFIC stock that is regularly traded on a qualified exchange or market. Most foreign ETFs and some mutual funds qualify.' },
      { label: 'Annual unrealized gain taxation', detail: 'You report unrealized gains annually as ordinary income. Unrealized losses are deductible (subject to limitations). There are no interest charges.' },
      { label: 'Simpler than excess distribution', detail: 'The calculation is straightforward: fair market value at year-end minus adjusted basis. No allocation over holding periods, no interest charges.' },
      { label: 'Ordinary income on sale', detail: 'When you sell the PFIC, any additional gain is treated as ordinary income (not capital gain). This is a downside compared to the QEF election.' },
    ],
    keyDifferences: [
      { aspect: 'Availability', left: 'All PFICs (default)', right: 'Publicly traded PFICs only' },
      { aspect: 'Election required', left: 'No (automatic)', right: 'Yes (Form 8621)' },
      { aspect: 'Tax rate on distributions', left: 'Highest ordinary rate + interest', right: 'Ordinary rates (no interest)' },
      { aspect: 'Tax rate on sale', left: 'Highest ordinary rate + interest', right: 'Ordinary rates' },
      { aspect: 'Unrealized gains', left: 'Not taxed until distribution/sale', right: 'Taxed annually' },
      { aspect: 'Losses', left: 'Capital losses (limited)', right: 'Ordinary losses (limited)' },
      { aspect: 'Best for', left: 'No one — avoid if possible', right: 'Short-term holdings, publicly traded funds' },
    ],
    whenToChooseLeft:
      'You should never choose the excess distribution method. It applies only if you fail to make a timely QEF or mark-to-market election. If you are already in this regime, consult a specialist about whether you can make a purging election or late election to switch to a better regime.',
    whenToChooseRight:
      'Choose mark-to-market if your PFIC is publicly traded, you do not have an Annual Information Statement for a QEF election, and you want to avoid the punitive interest charges of the excess distribution method. It is particularly suitable for short-term holdings and actively traded foreign ETFs.',
    faqs: [
      {
        question: 'What about the QEF election?',
        answer:
          'The QEF election is usually the best option if available. It allows you to report your pro-rata share of the PFIC\'s ordinary income and net capital gains annually. Gains are taxed at ordinary rates, but there are no interest charges. When you sell, the gain is treated as capital gain. The catch: you need an Annual Information Statement (AIS) from the PFIC, which many foreign funds do not provide.',
      },
      {
        question: 'Can I change elections later?',
        answer:
          'Generally no. Elections are irrevocable unless revoked with IRS consent or the PFIC ceases to be a PFIC. A "purging election" may allow you to switch from excess distribution to QEF or mark-to-market, but it requires paying tax on deferred income. Consult a specialist before making any election.',
      },
      {
        question: 'Which method is best for foreign pension funds?',
        answer:
          'Foreign pension funds inside PFIC wrappers are extremely complex. Some pension structures may be exempt from PFIC rules under treaty provisions or pension-specific regulations. If PFIC rules do apply, the QEF election is usually preferred for long-term holdings, but the AIS requirement often makes this impossible. Mark-to-market may be the only viable alternative for publicly traded pension fund units.',
      },
    ],
    relatedGuideSlugs: ['pfic-guide'],
    relatedServiceSlugs: ['expat-tax-filing'],
    relatedBlogSlugs: ['pfic-qef-vs-mark-to-market', 'pfic-identification-checklist'],
  },
  {
    slug: 'expat-tax-software-vs-human-preparer',
    title: 'Expat Tax Software vs Human Preparer: Which Is Better?',
    description:
      'Compare DIY expat tax software with hiring a human tax preparer. Learn which option fits your complexity, budget, and risk tolerance.',
    leftTitle: 'DIY Expat Tax Software',
    rightTitle: 'Human Tax Preparer (FileAbroad)',
    leftPoints: [
      { label: 'Lower setup burden', detail: 'Software can be convenient for simple returns, but compare the workflow, international-form coverage, and accountability rather than headline prices.' },
      { label: 'Faster for simple returns', detail: 'If you have straightforward W-2 income, no foreign accounts, and no FEIE or FTC complications, software can file your return in under an hour.' },
      { label: 'Available 24/7', detail: 'You can work on your return at any time, from anywhere. No scheduling calls or waiting for email responses.' },
      { label: 'Guided workflow', detail: 'Most software uses interview-style questions to walk you through the return. This is helpful if you are comfortable with technology and understand the basics of expat tax.' },
    ],
    rightPoints: [
      { label: 'Handles complexity', detail: 'A human preparer can navigate multi-year catch-ups, PFICs, CFCs, foreign trusts, treaty positions, and state tax issues that software cannot handle accurately.' },
      { label: 'Personalized advice', detail: 'Software gives you a return. A preparer gives you a strategy — FEIE vs FTC, Roth conversions, pension planning, and entity structuring.' },
      { label: 'Accountability', detail: 'If the IRS questions your return, a human preparer can explain the positions taken, amend if needed, and help you respond to notices. Software provides no representation.' },
      { label: 'No hidden errors', detail: 'Expat tax software often misses nuanced issues: FBAR requirements, Form 8938 thresholds, passive foreign investment company rules, and state tax nexus. A specialist reviews your entire situation.' },
    ],
    keyDifferences: [
      { aspect: 'Scope and support', left: 'Self-directed workflow varies by product', right: 'Written scope after consultation' },
      { aspect: 'Speed', left: 'Minutes to hours', right: 'Days to weeks' },
      { aspect: 'Complexity limit', left: 'Moderate (W-2, simple FEIE)', right: 'Unlimited (PFICs, trusts, CFCs)' },
      { aspect: 'Personal advice', left: 'None (generic help articles)', right: 'Custom strategy and planning' },
      { aspect: 'IRS representation', left: 'None', right: 'Document preparation and explanation' },
      { aspect: 'State tax guidance', left: 'Minimal or generic', right: 'Domicile analysis and termination' },
      { aspect: 'Best for', left: 'Simple, low-risk returns', right: 'Complex, high-value, or anxious filers' },
    ],
    whenToChooseLeft:
      'Choose software if you have a simple return (single W-2, no foreign accounts, no FEIE or FTC needed), you are comfortable with tax concepts, and your primary goal is a self-directed filing. Be aware that even "simple" expat returns often have hidden complexities that software misses.',
    whenToChooseRight:
      'Choose a human preparer if you have any complexity (self-employment, foreign accounts, investments, pensions, business ownership), you are behind on filings, you are anxious about making mistakes, or you want strategic advice beyond just filing a return. The added review and accountability can be valuable when the facts do not fit a standard workflow.',
    faqs: [
      {
        question: 'Can I use software for Streamlined Filing?',
        answer:
          'No. Streamlined Filing requires specific forms (Form 14653), detailed non-willful certifications, and multi-year coordination that no consumer software supports. You need a preparer or attorney who understands the Streamlined procedures.',
      },
      {
        question: 'Does software handle FBAR and Form 8938?',
        answer:
          'Some software packages include FBAR filing (separate from the tax return), but Form 8938 integration is often weak. More importantly, software cannot assess whether you need these forms — it simply asks questions. Many expats do not know the right answers, leading to missing filings or incorrect exemptions.',
      },
      {
        question: 'What if I make a mistake with software?',
        answer:
          'You are responsible for the error. Software companies generally disclaim liability for mistakes caused by user input. If the IRS assesses penalties for a missed FBAR, incorrect FEIE calculation, or omitted Form 8938, you bear the cost. A human preparer with errors and omissions insurance may provide some protection, though this varies by provider.',
      },
    ],
    relatedGuideSlugs: ['expat-tax-guide'],
    relatedServiceSlugs: ['expat-tax-filing'],
    relatedBlogSlugs: ['best-expat-tax-filing-services-2026'],
  },
  {
    slug: 'form-3520-vs-3520-a',
    title: 'Form 3520 vs Form 3520-A: What Is the Difference?',
    description:
      'Form 3520 reports foreign gifts and trust distributions. Form 3520-A is the annual information return of a foreign trust. Learn which form you need and when.',
    leftTitle: 'Form 3520',
    rightTitle: 'Form 3520-A',
    leftPoints: [
      { label: 'For recipients and donors', detail: 'File Form 3520 if you receive foreign gifts over $100,000, receive distributions from a foreign trust, are treated as the owner of a foreign trust, or transfer assets to a foreign trust.' },
      { label: 'Event-driven', detail: 'Form 3520 is filed when a reportable event occurs — a gift, a distribution, a transfer, or the creation of a trust. It is not necessarily filed every year.' },
      { label: 'Penalties start at $10,000', detail: 'The penalty for failure to file Form 3520 is the greater of $10,000 or 35% of the gross reportable amount. For foreign trust distributions, the penalty is 35% of the distribution amount.' },
      { label: 'Filed with Form 1040', detail: 'Attach Form 3520 to your personal tax return by the due date (April 15, June 15 for expats, or October 15 with extension).' },
    ],
    rightPoints: [
      { label: 'For trust owners', detail: 'File Form 3520-A if you are treated as the owner of a foreign trust under the grantor trust rules (Sections 671-679). This applies if you funded the trust and retained certain powers or benefits.' },
      { label: 'Annual requirement', detail: 'Form 3520-A is filed every year the trust exists and you remain the owner. It reports the trust\'s income, deductions, distributions, and changes in beneficial interest.' },
      { label: 'Same $10,000 penalty', detail: 'The penalty for failure to file Form 3520-A is also the greater of $10,000 or 35% of the gross reportable amount. Because it is an annual form, penalties can compound quickly.' },
      { label: 'Filed separately or with 1040', detail: 'Form 3520-A can be filed by the trust itself (if it has a US agent) or by the owner attaching it to their personal return. Most expat-owned foreign trusts file via the owner\'s return.' },
    ],
    keyDifferences: [
      { aspect: 'Who files', left: 'Recipients, donors, responsible parties', right: 'Trust owners (grantor trust rules)' },
      { aspect: 'Trigger', left: 'Reportable event (gift, distribution, transfer)', right: 'Annual (every year trust exists)' },
      { aspect: 'Information reported', left: 'Gift/distribution details, trust transactions', right: 'Trust income, deductions, balance sheet' },
      { aspect: 'Penalty', left: 'Greater of $10,000 or 35% of amount', right: 'Greater of $10,000 or 35% of amount' },
      { aspect: 'Due date', left: 'With Form 1040', right: 'With Form 1040 (or March 15 if trust files separately)' },
      { aspect: 'Foreign gift reporting', left: 'Yes (over $100,000)', right: 'No' },
      { aspect: 'Example', left: 'You receive a $150,000 inheritance from a German estate', right: 'You funded an offshore trust and retained a reversionary interest' },
    ],
    whenToChooseLeft:
      'File Form 3520 if you received a foreign gift or inheritance over $100,000, received a distribution from a foreign trust, or transferred assets to a foreign trust. Most expats encounter Form 3520 when receiving large gifts from family abroad or when named as a beneficiary of a foreign trust.',
    whenToChooseRight:
      'File Form 3520-A only if you are treated as the owner of a foreign trust under US grantor trust rules. This typically applies if you created or funded a foreign trust and retained certain powers (revocation, control over beneficial enjoyment, reversionary interest). Most ordinary expats who merely receive trust distributions do not file Form 3520-A — they file Form 3520 for the distribution.',
    faqs: [
      {
        question: 'Do I need to file both Form 3520 and 3520-A?',
        answer:
          'Possibly. If you are the owner of a foreign trust and also receive a distribution from it, you may need both forms. Form 3520-A reports the trust\'s annual activity as the owner. Form 3520 reports the distribution you received as a beneficiary. However, if you are only a beneficiary (not the owner), you typically file only Form 3520.',
      },
      {
        question: 'What is a foreign trust for US tax purposes?',
        answer:
          'A trust is foreign if a US court cannot exercise primary supervision over its administration and no US person has authority to control all substantial decisions. Many offshore trusts, family trusts in common-law countries, and some pension structures are foreign trusts. The IRS applies a facts-and-circumstances test.',
      },
      {
        question: 'Do I file Form 3520 for a foreign inheritance?',
        answer:
          'Yes, if the aggregate value of foreign gifts and inheritances from all foreign persons exceeds $100,000 in a tax year. The inheritance itself is not taxable to the recipient, but it must be reported. Form 3520 is an information return, not a tax return. Keep detailed records of the donor, date, value, and relationship.',
      },
    ],
    relatedGuideSlugs: ['foreign-trusts-guide'],
    relatedServiceSlugs: ['expat-tax-filing'],
    relatedBlogSlugs: ['foreign-gift-reporting-form-3520', 'foreign-inheritance-us-tax'],
  },
];

export function getComparisonBySlug(slug: string): ComparisonPage | undefined {
  return COMPARISON_PAGES.find((page) => page.slug === slug);
}

export function getAllComparisonSlugs(): string[] {
  return COMPARISON_PAGES.map((page) => page.slug);
}
