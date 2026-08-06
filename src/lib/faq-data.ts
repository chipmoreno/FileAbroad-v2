export interface FAQ {
  question: string;
  answer: string;
}

export interface FAQCategory {
  name: string;
  faqs: FAQ[];
}

/**
 * Full FAQ data used on /faq page (23 questions, 5 categories)
 */
export const faqCategories: FAQCategory[] = [
  {
    name: 'Filing Requirements',
    faqs: [
      {
        question: 'Do I really need to file U.S. taxes if I live abroad?',
        answer:
          'Yes. The United States taxes its citizens on their worldwide income, regardless of where they live. Even if you earn all your income overseas, you are still required to file a U.S. tax return if your income exceeds the standard filing threshold. The U.S. is one of only two countries in the world (along with Eritrea) that taxes based on citizenship rather than residency.',
      },
      {
        question: 'What is the income threshold for filing?',
        answer:
          "Filing thresholds change by tax year and depend on filing status, age, dependency status, and other facts. Special filing triggers can apply even below the general gross-income threshold, including certain self-employment income. Check the current IRS filing-requirement chart for the year at issue or request a scope review.",
      },
      {
        question: 'What deadlines apply to Americans abroad?',
        answer:
          "The standard deadline is April 15, but Americans abroad get an automatic 2-month extension to June 15 without filing any forms. You can extend further to October 15 by filing Form 4868 by June 15. However, if you owe taxes, interest begins accruing from April 15 regardless of extensions. The FBAR deadline is April 15 with an automatic extension to October 15.",
      },
      {
        question: 'Do I need to file a state tax return?',
        answer:
          "It depends on the state's current residency, domicile, and source-income rules and your facts. FileAbroad can screen whether a state return may be in scope; disputed domicile, nexus, or legal-residency questions may require state-specific counsel or a credentialed reviewer.",
      },
    ],
  },
  {
    name: 'FEIE & Tax Credits',
    faqs: [
      {
        question: 'What is the Foreign Earned Income Exclusion (FEIE)?',
        answer:
          "The FEIE allows qualifying Americans abroad to exclude foreign earned income from U.S. taxation. For 2025 (filed in 2026), you can exclude up to $130,000. For 2026 (filed in 2027), it increases to $132,900. To qualify, you must have foreign earned income, have your tax home in a foreign country, and meet either the Bona Fide Residence test or the Physical Presence test.",
      },
      {
        question: 'What is the Physical Presence Test?',
        answer:
          "The Physical Presence Test requires you to be physically present in a foreign country (or countries) for at least 330 full days during any 12-month period. The days don't need to be consecutive, but partial days don't count. This is often easier to meet than the Bona Fide Residence test because it's purely objective.",
      },
      {
        question: 'What is the Bona Fide Residence Test?',
        answer:
          "The Bona Fide Residence test requires you to be a bona fide resident of a foreign country for an uninterrupted period that includes an entire tax year. This is more subjective than the Physical Presence test — the IRS looks at factors like the type of visa you hold, your intent to stay abroad, and your ties to the foreign country.",
      },
      {
        question: 'What is the Foreign Tax Credit?',
        answer:
          "The Foreign Tax Credit (FTC) gives you a dollar-for-dollar credit against your U.S. tax liability for income taxes paid to foreign governments. If you live in a high-tax country like Germany or the UK, the FTC often saves more than the FEIE. You can sometimes use both together, but you can't claim the FTC for taxes paid on income you've excluded with the FEIE.",
      },
      {
        question: 'Should I use the FEIE or Foreign Tax Credit?',
        answer:
          "It depends on the year, type and source of income, foreign taxes, eligibility, and longer-term effects. FileAbroad can prepare in-scope calculations, but treaty positions and legal opinions require an appropriate credentialed reviewer or referral.",
      },
      {
        question: 'Can I avoid double taxation?',
        answer:
          "The FEIE, Foreign Tax Credit, housing provisions, totalization agreements, and some treaty provisions may reduce overlapping taxes, but results depend on the facts and no outcome is guaranteed. Treaty-based positions are outside FileAbroad's standard preparation scope unless an appropriate reviewer is confirmed.",
      },
    ],
  },
  {
    name: 'FBAR & FATCA',
    faqs: [
      {
        question: 'What is the FBAR and who needs to file it?',
        answer:
          "FBAR (FinCEN Form 114) is a Report of Foreign Bank and Financial Accounts. You must file if you have a financial interest in or signature authority over foreign accounts that exceeded $10,000 in aggregate at any point during the calendar year. This includes bank accounts, securities accounts, mutual funds, and some pension accounts.",
      },
      {
        question: 'How is FATCA different from FBAR?',
        answer:
          "FATCA (Form 8938) has higher thresholds — $200,000 at year-end or $300,000 at any time for expats. It covers a broader range of assets including foreign stocks and partnership interests. FATCA is filed with your tax return to the IRS, while FBAR is filed separately with FinCEN. Many expats need to file both.",
      },
      {
        question: 'What are the penalties for not filing FBAR?',
        answer:
          "Potential FBAR penalties depend on current law, the filing period, the facts, and the government's characterization of the conduct. Published amounts are adjusted over time. FileAbroad does not determine willfulness or provide legal advice; seek an experienced tax attorney when intent or legal exposure is uncertain.",
      },
      {
        question: 'Does cryptocurrency need to be reported?',
        answer:
          "FinCEN Notice 2020-2 says an account holding only virtual currency is not currently reportable on the FBAR, unless it also holds reportable assets. Self-custody wallets are not foreign financial accounts. Other tax and information reporting may still apply, and FinCEN has announced its intent to amend the FBAR rules, so check current official guidance for the account you use.",
      },
    ],
  },
  {
    name: 'Back Taxes & Compliance',
    faqs: [
      {
        question: "What if I haven't filed U.S. taxes in several years?",
        answer:
          "There are IRS procedures that may help some Americans abroad return to compliance. The Streamlined Foreign Offshore Procedures generally involve 3 years of returns and 6 years of FBARs for eligible taxpayers, but FileAbroad does not determine willfulness. If intent is uncertain or the IRS has contacted you, consult an appropriate tax attorney or credentialed representative before filing.",
      },
      {
        question: 'What does "non-willful" mean?',
        answer:
          'It is a fact-sensitive legal concept that this website and FileAbroad do not determine. Do not rely on examples or a questionnaire to sign a certification. If intent is uncertain, obtain advice from an experienced tax attorney before submitting anything.',
      },
      {
        question: 'Can I just start filing going forward without addressing past years?',
        answer:
          "This is called \"quiet disclosure\" and the IRS has explicitly warned against it. It's not a formal program, and if the IRS later discovers your previous non-compliance, you won't get the benefits of the Streamlined procedures. You could face full penalties. The Streamlined program exists precisely for catching up — use it.",
      },
      {
        question: 'Will I owe a lot of back taxes?',
        answer:
          "The result depends on each year's income, eligibility, elections, credits, information returns, and interest. Qualifying Streamlined Foreign submissions may receive specified penalty relief, but FileAbroad does not promise eligibility or an outcome.",
      },
    ],
  },
  {
    name: 'Working With Me',
    faqs: [
      {
        question: 'How do we communicate?',
        answer:
          "I primarily communicate through email, with video calls when needed. Sensitive tax documents must be uploaded through the secure Encyro portal. Response time varies with filing volume and urgency.",
      },
      {
        question: 'What documents will I need?',
        answer:
          "Common documents include: W-2s or 1099s (if any), foreign income statements, proof of foreign taxes paid, foreign bank statements showing maximum balances, previous year's tax return, and your passport. I'll send you a personalized checklist based on your situation. Don't worry if you're missing something — I'll help you figure out what you need.",
      },
      {
        question: 'How long does the process take?',
        answer:
          "From start to finish, most returns are completed in 2-3 weeks. This includes the intake review, document gathering (depends on you), return preparation (5-7 days), your review and any revisions (2-3 days), and filing (1 day). Rush service is available if you need it faster.",
      },
      {
        question: 'What happens before preparation begins?',
        answer:
          "The accepted preparation scope depends on the years, forms, records, and complexity involved. Book a consultation to identify the next step before preparation begins.",
      },
      {
        question: 'Do you offer refunds?',
        answer:
          "Preparation starts only after you approve a written scope. The consultation fee is credited toward an accepted preparation engagement when the written scope says so; if FileAbroad cannot accept the preparation work, the consultation still provides the written next step and any referral boundary.",
      },
    ],
  },
];

/**
 * Shorter FAQ subset used on the homepage (8 questions, no categories)
 */
export const homepageFaqs: FAQ[] = [
  {
    question: 'Do I really need to file U.S. taxes if I live abroad?',
    answer:
      'Yes. U.S. citizens and resident aliens generally remain subject to U.S. tax on worldwide income while abroad. Filing thresholds depend on your tax year and facts, and exclusions or credits do not necessarily remove the filing requirement. FBAR and other information reports are separate. Passport restrictions can apply in cases involving seriously delinquent federal tax debt; missing one return does not automatically trigger them.',
  },
  {
    question: 'What is the Foreign Earned Income Exclusion (FEIE)?',
    answer:
      'The Foreign Earned Income Exclusion allows qualifying U.S. citizens and residents living abroad to exclude a significant amount of their foreign earnings from U.S. taxation. For tax year 2025 (filed in 2026), this exclusion is up to $130,000. To qualify, you must meet either the Bona Fide Residence test or the Physical Presence test.',
  },
  {
    question: 'What is the FBAR and who needs to file it?',
    answer:
      'FBAR (FinCEN Form 114) reports Foreign Bank and Financial Accounts. You must file if you have a financial interest in or signature authority over foreign accounts whose combined value exceeded $10,000 at any time during the calendar year. The deadline is April 15, with an automatic extension to October 15.',
  },
  {
    question: "What happens if I haven't filed U.S. taxes in several years?",
    answer:
      "There are IRS procedures that may apply, including Streamlined procedures for eligible taxpayers. FileAbroad begins with scope screening and does not determine willfulness; uncertain intent, prior IRS contact, or legal exposure requires an appropriate attorney or credentialed-representative referral.",
  },
  {
    question: 'Can I avoid double taxation on my income?',
    answer:
      'The FEIE, Foreign Tax Credit, housing provisions, totalization agreements, and some treaty provisions may reduce overlapping taxes, but eligibility and results depend on your facts. FileAbroad does not promise a tax result and refers treaty-based positions when appropriate.',
  },
  {
    question: 'Do I still have state tax obligations while living abroad?',
    answer:
      'It depends on the state’s current residency, domicile, and source-income rules and your facts. FileAbroad can screen whether a return may be in scope; disputed domicile, nexus, or legal-residency questions may require state-specific counsel or a credentialed reviewer.',
  },
  {
    question: 'What documents do I need to provide for my tax return?',
    answer:
      "Typically, you'll need W-2s or 1099s (if any), records of foreign income, foreign-account statements, proof of foreign taxes paid, records of foreign investments or assets, and your previous year's tax return. Once your case is accepted, I'll send a checklist specific to your situation.",
  },
  {
    question: 'How do we communicate and work together?',
    answer:
      "I communicate via email and video calls across time zones. Accepted clients receive secure Encyro upload instructions.",
  },
];
