import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'content/personas/personas-data.json');

export interface PersonaData {
  slug: string;
  name: string;
  headline: string;
  description: string;
  painPoints: string[];
  howWeHelp: string[];
  relevantContent: { label: string; href: string }[];
  relevantTools: { label: string; href: string }[];
  pricingNote: string;
  longFormSections?: { heading: string; body: string }[];
  faqs: { question: string; answer: string }[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

let cachedData: PersonaData[] | null = null;

function loadPersonas(): PersonaData[] {
  if (cachedData) return cachedData;
  if (!fs.existsSync(DATA_PATH)) return [];
  const raw = fs.readFileSync(DATA_PATH, 'utf8');
  cachedData = JSON.parse(raw) as PersonaData[];
  return cachedData;
}

export function getAllPersonas(): PersonaData[] {
  return loadPersonas();
}

export function getPersonaBySlug(slug: string): PersonaData | null {
  return loadPersonas().find((p) => p.slug === slug) || null;
}

export function getAllPersonaSlugs(): string[] {
  return loadPersonas().map((p) => p.slug);
}

/**
 * Persona pages need more than a label and a generic service list. This
 * editorial layer uses each persona's own pain points, help areas, tools,
 * resources, and FAQs to create a records-first planning guide on the page.
 */
export function getPersonaLongFormSections(persona: PersonaData): { heading: string; body: string }[] {
  const challenges = persona.painPoints.join(' ');
  const help = persona.howWeHelp.join(' ');
  const resources = persona.relevantContent.map((item) => item.label).join(', ');
  const tools = persona.relevantTools.map((item) => item.label).join(', ');
  const faqThemes = persona.faqs.map((faq) => faq.question).join(' ');

  return [
    {
      heading: `Start with the facts that make ${persona.name} different`,
      body: `${persona.description} A ${persona.name.toLowerCase()} filing is not defined by the label alone. The useful starting point is a dated inventory of citizenship or immigration status, tax residence, work location, family location, income sources, accounts, investments, entities, pensions, and prior filings. The questions on this page are designed to turn a broad concern into a reviewable file. Current challenges often include: ${challenges} Write each challenge as a question that can be answered with a document, a calculation, or a professional boundary. Do not treat a persona page as a conclusion about a specific taxpayer; treat it as a map of the facts that must be tested for the relevant tax year.`,
    },
    {
      heading: 'Separate federal filing from foreign residence',
      body: `Living, working, retiring, studying, investing, or operating a business outside the United States can change the local filing result without turning off U.S. citizenship-based reporting. First identify the U.S. filing status and tax year. Then identify where the person was resident under local law and whether a treaty tie-breaker is relevant. Preserve visas, residence permits, leases, day counts, local returns, tax assessments, and evidence of where work was performed. A foreign tax number or a local tax payment may support the analysis, but neither automatically replaces a U.S. return or information report. ${persona.name} should compare the two systems rather than copying the foreign return into a U.S. form.`,
    },
    {
      heading: 'Build an income and work-location map',
      body: `List wages, contractor income, business receipts, equity compensation, pensions, Social Security, interest, dividends, rent, capital gains, trust distributions, and digital-asset transactions. For each item record the payer, legal owner, service dates, work location, currency, gross amount, withholding, local tax, and source document. A payer’s country and the bank receiving the payment may not answer the source question. For self-employed or remote-work income, keep a calendar showing where services were performed and a separate record of business expenses. For retirement or investment income, keep the statement, cost basis, distribution date, and treaty or foreign-tax workpaper. This makes the relevant forms easier to classify without assuming that one exclusion fits every item.`,
    },
    {
      heading: 'Map accounts, assets, and ownership before choosing forms',
      body: `Create an account and asset inventory with the legal owner, joint owners, beneficiaries, signature authority, institution country, account type, maximum value, year-end value, currency, and closing date. Ask about dormant accounts, childhood accounts, employer plans, local savings products, insurance with cash value, foreign funds, wallets, family trusts, and entities. The institution’s marketing name is not always the U.S. tax classification. Compare the inventory with the current FBAR, Form 8938, Form 3520, Form 5471, Form 8621, or other instructions that may apply. The useful resources for this audience include ${resources}; the relevant tools include ${tools}. Use them for screening and organization, not as a substitute for document review.`,
    },
    {
      heading: 'Treat exclusions, credits, and treaties as separate decisions',
      body: `A Foreign Earned Income Exclusion question is different from a Foreign Tax Credit question, and both are different from a treaty residence or pension question. Check whether the income is earned, whether the tax home and presence or residence tests are met, whether the foreign tax qualifies, and whether an election changes later years. Preserve the foreign assessment, payment evidence, withholding statement, refund notice, and exchange-rate method. Do not credit tax against a category that the current rules exclude, and do not assume that a local exemption produces a U.S. benefit. Model the federal result alongside the local filing and document the assumptions that could change.`,
    },
    {
      heading: 'Review state ties after an international move',
      body: `Federal residence does not settle a former state’s domicile question. Review the state where the person last lived, the move date, homes retained, family location, vehicle and driver-license records, voter registration, professional licenses, property, workdays, and state-source income. A remote worker, retiree, business owner, military contractor, or green-card holder can have a different state analysis even when the foreign destination is the same. Keep a departure-year timeline and state-source schedule next to the federal return. If the state sends a notice, classify whether it concerns residency, source income, withholding, or information matching before responding.`,
    },
    {
      heading: 'Use the forms as a reporting map, not a checklist of labels',
      body: `The likely forms depend on the legal owner, transaction, income category, filing status, residence, and prior elections. A bank account may raise FBAR and Form 8938 questions; a foreign fund may raise Form 8621; a foreign company may raise Form 5471, Form 8858, or Form 8865; a trust or gift may raise Form 3520 or Form 3520-A; a treaty position may require Form 8833. The absence of taxable income does not automatically answer an information-return question. Write a form map with four columns: fact, source document, possible form, and unresolved classification. This is the point at which ${persona.name.toLowerCase()} cases should be screened for referral or credentialed review.`,
    },
    {
      heading: 'Records should be gathered in the order the decision needs them',
      body: `Start with identity and status records, then residence and travel records, then income and account statements, and finally prior returns, notices, and elections. Add governing documents for companies, trusts, pensions, funds, insurance, or family arrangements. For each record, write the tax year, owner, currency, and question it answers. Keep original foreign-language documents with any required translation or explanation. Do not send Social Security numbers, passports, account numbers, or tax documents through ordinary email or an unsecured public message. ${persona.name} should keep a redacted preliminary summary and a secure final document set so the scope review can proceed without losing control of sensitive records.`,
    },
    {
      heading: 'Prior-year gaps require a chronology before a filing path',
      body: `If returns or information reports are missing, list every year, country, state, income source, account, entity, pension, fund, notice, and prior professional contact. Note when the taxpayer learned about the U.S. obligation, when a bank or agency asked a question, and what steps were taken. Do not select a catch-up procedure from a short questionnaire. The result can depend on residence, payment history, tax due, filing history, willfulness facts, and current IRS procedures. The [catch-up program](/tools/catch-up-program) can organize the questions, but a consultation is needed before FileAbroad accepts a catch-up preparation scope.`,
    },
    {
      heading: 'Common mistakes for this audience are often classification mistakes',
      body: `${persona.name} commonly encounter a mismatch between the local label and the U.S. classification: a pension treated as an ordinary account, a foreign fund treated as a U.S. mutual fund, an entity treated as a personal bank account, or an inherited asset treated as a current-year income item. Other errors include copying a prior-year election, using the wrong exchange rate, omitting maximum account values, or assuming the FEIE covers pensions or investment income. The right control is a decision log with the fact, source, rule, and unresolved question. When the records do not support a conclusion, mark the item for review instead of filling the gap with a guess.`,
    },
    {
      heading: 'Household and relationship facts can change the filing map',
      body: `Review spouse or partner status, dependents, citizenships, immigration status, identification numbers, community-property exposure, shared accounts, gifts, inheritances, and the location of the household. A foreign spouse may need an ITIN or a different filing-status analysis. A child’s account may belong to a parent, a trust, or the child under local and U.S. rules. A family business or inherited property can add entity, trust, gift, or state questions. Do not choose joint or separate filing based only on the final tax number; compare the reporting forms, foreign income, credits, future elections, and documentation burden as well.`,
    },
    {
      heading: 'Use practical tools as preparation for the conversation',
      body: `The relevant tools for ${persona.name} include ${tools}. Use them to organize dates, identify account categories, compare broad scenarios, or prepare questions. A calculator cannot determine whether a foreign investment is a PFIC, whether a trust is a foreign trust, whether a state domicile ended, or whether a catch-up procedure is available. Save the inputs and assumptions behind a result, then compare them with the current IRS or state instructions. A tool output that looks favorable should be treated as a prompt for review, not a filing position or guarantee of a refund, penalty result, or tax savings.`,
    },
    {
      heading: 'Create a year-end control file',
      body: `Before filing, reconcile names, addresses, ownership, dates, currencies, maximum values, foreign tax, and prior-year carryovers across the federal return, information returns, state return, and local return. Save the filed copies, acceptance messages, payment confirmations, conversion rates, source records, and a short list of open questions for next year. After filing, set a reminder to review new accounts, sales, distributions, residence changes, state visits, entity changes, and notices. This is especially important for ${persona.name.toLowerCase()} because the same fact can trigger a different form or tax result when the ownership, residence, or transaction changes.`,
    },
    {
      heading: 'What a FileAbroad consultation should produce',
      body: `FileAbroad’s role is to turn the broad facts into a written next step. The consultation should identify the years, likely forms, records needed, scope questions, assumptions, preparation boundary, and any issue that requires an attorney, credentialed reviewer, valuation professional, immigration adviser, or local tax specialist. The preparation engagement is separate from the educational content on this page. ${help} If the work is accepted, the written scope controls before preparation begins and the consultation fee is credited toward that accepted preparation engagement if you proceed, as stated in the scope. If it is not accepted, you still receive the documented next step and referral boundary.`,
    },
    {
      heading: 'Questions to bring to the appointment',
      body: `Bring the tax years, countries and states, broad income categories, account and entity types, major transactions, residence timeline, prior filings, notices, and the question that feels most urgent. The FAQs on this page cover themes such as ${faqThemes} but they do not decide the reader’s result. Bring a redacted timeline and a list of missing records rather than sending sensitive documents through WhatsApp. The most useful appointment is one where the facts are organized enough to identify what can be answered now, what requires a calculation, what requires current primary-source research, and what must be referred outside the preparation scope.`,
    },
  ];
}
