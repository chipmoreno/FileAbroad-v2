import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'content/state-taxes/state-data.json');

export interface StateTaxData {
  slug: string;
  name: string;
  abbreviation: string;
  headline: string;
  description: string;
  persistenceRisk: 'extreme' | 'high' | 'moderate' | 'low';
  persistenceSummary: string;
  keyRules: string[];
  terminationSteps: string[];
  commonTraps: string[];
  expatConsiderations: string[];
  residencyAnalysis?: string[];
  incomeSourcing?: string[];
  departureYearWorkflow?: string[];
  evidenceChecklist?: string[];
  longFormSections?: { heading: string; body: string }[];
  faqs: { question: string; answer: string }[];
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

let cachedData: StateTaxData[] | null = null;

function loadStates(): StateTaxData[] {
  if (cachedData) return cachedData;
  if (!fs.existsSync(DATA_PATH)) return [];
  const raw = fs.readFileSync(DATA_PATH, 'utf8');
  cachedData = JSON.parse(raw) as StateTaxData[];
  return cachedData;
}

export function getAllStates(): StateTaxData[] {
  return loadStates();
}

export function getStateBySlug(slug: string): StateTaxData | null {
  return loadStates().find((s) => s.slug === slug) || null;
}

export function getAllStateSlugs(): string[] {
  return loadStates().map((s) => s.slug);
}

/**
 * Adds the long-form editorial layer required for a state pillar page. The
 * source record supplies the state-specific rule, traps, and considerations;
 * these sections turn those facts into a practical departure, sourcing, and
 * notice-response workflow without inventing a universal safe harbor.
 */
export function getStateLongFormSections(state: StateTaxData): { heading: string; body: string }[] {
  const safeHarbor = state.keyRules.find((rule) => /safe harbor/i.test(rule))
    || `No broad expat safe harbor is identified in this summary for ${state.name}; confirm the current state instructions before relying on a day-count exception.`;
  const sourceRule = state.keyRules.find((rule) => /source|worldwide|resident/i.test(rule))
    || `${state.name} distinguishes resident income from ${state.name}-source income under its current individual income-tax rules.`;
  const topTrap = state.commonTraps[0] || `Keeping a ${state.name} tie without documenting its continuing purpose.`;
  const consideration = state.expatConsiderations[0] || `Foreign residence does not by itself answer the ${state.name} residency question.`;

  return [
    {
      heading: `The question to answer is whether ${state.name} residency actually ended`,
      body: `${state.name} state tax analysis starts with a dated conclusion, not with the fact that a taxpayer boarded a plane. The file should identify the last day the taxpayer was a ${state.name} resident, the first day the taxpayer established a permanent home abroad, and the facts supporting the change. ${state.persistenceSummary} A foreign lease or residence permit is useful evidence, but it is only one part of the record. Explain where the taxpayer intended to live, where the household was organized, where important personal property was kept, and how the taxpayer described the move to employers, banks, insurers, and government agencies. If the move was temporary, document the expected return; if it was indefinite, document the actions that made the new country the practical home.`,
    },
    {
      heading: 'Domicile and physical presence should be analyzed separately',
      body: `A state can use a domicile concept, a day-count rule, a permanent-place-of-abode test, or a combination of these ideas. Do not merge them into a single “days abroad” calculation. ${sourceRule} Build two workpapers: one for the legal home and intent facts, and one for days, available homes, and work locations. Record every ${state.name} visit, including partial days where the state instructions count them differently. Then explain whether each visit was a holiday, a family event, a work assignment, a property task, or an attempt to maintain the former home. A clean separation helps prevent a federal residence conclusion from being copied into a state return without state-specific support.`,
    },
    {
      heading: 'Safe-harbor language is not a substitute for the full residency test',
      body: `${safeHarbor} Treat a safe harbor as a narrow rule with its own purpose, day count, income limit, contract requirement, exception, and documentation. Confirm the tax year and current state instructions before claiming it. A taxpayer who misses one condition may still have a broader domicile argument, but the argument should not be labeled as a safe harbor. Keep the employment agreement, travel calendar, source-income schedule, state return, and proof of the foreign residence together. If the state does not publish a safe harbor for this fact pattern, say so directly and analyze the general domicile and sourcing rules instead of inventing a bright-line threshold.`,
    },
    {
      heading: `Homes, family, and personal property create the ${state.name} fact pattern`,
      body: `The former home is often the strongest continuing-tie question. State the property’s address, ownership, occupants, lease terms, availability for personal use, utility activity, insurance, and storage. If the taxpayer kept the home for a spouse, child, parent, or tenant, explain that purpose and whether the taxpayer could return at will. Map the family’s location and school or work arrangements without treating family presence as automatically decisive. Also identify vehicles, pets, furniture, collections, professional licenses, club memberships, and voting records that moved—or did not move. ${topTrap} A tie retained for a real reason is not necessarily fatal; an unexplained tie is difficult to defend.`,
    },
    {
      heading: 'The evidence file should prove conduct, not only intention',
      body: `A statement that the taxpayer “planned to live abroad” is weaker than a sequence of dated actions. Preserve the foreign visa or residence permit, lease or deed, utility records, local bank activity, employer or client contract, school records, health-insurance enrollment, local tax registration, and travel history. Preserve ${state.name} sale, lease, move-out, DMV, voter, vehicle, and professional-license records as well. For each document, write the date, what fact it supports, and any limitation. If a document is in another language, save the original and the required translation or explanation. A reviewer should be able to reconstruct the move without asking the taxpayer to rely on memory several years later.`,
    },
    {
      heading: `Remote work requires a ${state.name} source-income analysis`,
      body: `The employer’s address, the client’s address, and the bank where compensation was deposited do not automatically determine the state source of service income. Start with where the services were physically performed, then review the contract, payroll records, business activity, and any ${state.name} workdays. Keep a calendar that distinguishes workdays, vacation, sick days, travel, and days spent dealing with a retained property. A remote worker who performs all services abroad may have a different result from a person who repeatedly works from a ${state.name} home. The conclusion should be consistent with the federal work-location facts, the state return, and any employer withholding correction.`,
    },
    {
      heading: 'Business owners need separate personal and entity maps',
      body: `A former ${state.name} resident who owns a company must analyze personal domicile, service location, entity activity, customers, employees, property, and pass-through reporting separately. A ${state.name} customer does not by itself answer whether service income is sourced there, while a ${state.name} office, employee, inventory, or real property may create a different filing question. Keep contracts, invoices, travel records, payroll, entity returns, and ownership documents together. If the entity is foreign, add the federal international forms and local financial statements to the review. Do not use the taxpayer’s new foreign address as proof that every business activity moved.`,
    },
    {
      heading: 'Real estate can survive the residency break',
      body: `${state.name} real estate may continue to produce state-source rental income or gain after the taxpayer becomes a nonresident. Separate the property analysis from the domicile analysis. Track rent, repairs, taxes, insurance, depreciation, management fees, mortgage interest, sale proceeds, and personal-use days. If the property was rented, preserve the signed lease, listing history, management agreement, tenant communications, and evidence of personal access. If it was retained as a family home or occasional residence, explain that use with the calendar and utility records. A nonresident filing obligation created by property income does not necessarily mean the taxpayer remained a ${state.name} resident.`,
    },
    {
      heading: 'Investment, retirement, and pass-through items need a source schedule',
      body: `Do not assume that every income item follows the wage result. Review dividends, interest, capital gains, pensions, retirement distributions, stock compensation, partnership or S-corporation items, trusts, and deferred compensation under the current ${state.name} rules. Note whether the state conforms to federal exclusions, credits, basis rules, or retirement treatment. Keep the federal return beside the state schedule and mark each adjustment. A foreign tax credit or federal FEIE result may not carry over in the same form. If the taxpayer has a state-source partnership or pass-through item, obtain the entity’s state allocation rather than relying on the taxpayer’s foreign residence alone.`,
    },
    {
      heading: 'The departure-year return should tell one consistent story',
      body: `Choose the move date from evidence, then use it consistently across the federal return, ${state.name} return, employer records, property schedule, travel calendar, and foreign return. Identify whether the year is full-year resident, part-year resident, or nonresident under the current state instructions. Allocate resident-period worldwide income and post-move ${state.name}-source income according to the applicable forms and instructions. Reconcile withholding, estimated payments, credits, carryovers, and prior-year notices. If spouses have different residency positions, analyze filing status and community-property or allocation rules separately. The objective is not to maximize a single form; it is to produce a consistent filing record that can be explained later.`,
    },
    {
      heading: 'Penalties and notices are a records problem before they are a payment problem',
      body: `A ${state.name} notice may be generated from federal information, payer records, property records, or a prior return. It is not automatically proof that the taxpayer remained a resident. Preserve the complete notice, response deadline, return, source schedule, address history, and departure evidence. Answer the agency’s specific question with an indexed explanation. Review whether the notice concerns residency, source income, withholding, estimated tax, information matching, or a missing return. Do not ignore it because the taxpayer lives abroad, and do not send an unorganized bundle of records. If the matter involves audit representation, legal interpretation, or contested domicile, identify that boundary and refer the question appropriately.`,
    },
    {
      heading: 'Annual review matters after the first year abroad',
      body: `A residency conclusion can change after the move. Revisit ${state.name} visits, the retained home, family arrangements, new employment, property transactions, business activity, voter or license records, and any return to the United States. Keep an annual tie review with the original departure file. If the taxpayer later buys a home, returns for a long assignment, moves to another country, or changes a rental to personal use, update the analysis instead of copying last year’s answer. This is also the time to check current instructions, rates, filing thresholds, and agency forms. State rules are tax-year-specific, and a strong file states which year was reviewed.`,
    },
    {
      heading: `A consultation should answer the ${state.name} questions in writing`,
      body: `Bring the last ${state.name} return, move timeline, foreign residence records, property documents, travel calendar, address changes, income source schedule, federal return, and any notices to a paid consultation. The consultation should identify the state questions, missing evidence, likely forms, source categories, and professional boundaries. ${consideration} It should not promise that a state obligation ended or select a legal position from a short form. If preparation is accepted, the written scope should state the years, returns, schedules, records, assumptions, exclusions, and review steps. If the issue requires audit representation, a state-law opinion, or another credential, that boundary should be identified before preparation begins.`,
    },
    {
      heading: 'A defensible file is organized around facts and sources',
      body: `Use a decision log with four columns: fact, source document, state rule or form affected, and unresolved question. Record the source URL or current state publication for each high-stakes conclusion and note the access date. Mark assumptions separately from verified facts. This prevents a foreign tax return, a residence card, or a federal exclusion from being treated as conclusive proof of a ${state.name} result. It also makes updates easier when the agency revises instructions or a new notice arrives. Keep final filed returns, payment confirmations, agency correspondence, and calculation workpapers in the same year folder, with sensitive documents handled through the secure exchange process.`,
    },
  ];
}
