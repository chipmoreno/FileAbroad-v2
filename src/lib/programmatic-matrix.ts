import { getAllCountries, getCountryBySlug, type CountryData } from './countries';
import { getPersonaBySlug } from './personas';
import { getStateBySlug } from './state-taxes';

export interface MatrixCountryProfile {
  slug: string;
  name: string;
  region: string;
  currencyCode: string;
  authorityName: string;
  authorityUrl: string;
  countryContext: string;
  financialProducts: string[];
  workPattern: string;
  residencePrompt: string;
  sources: { label: string; href: string }[];
}

interface MatrixCountrySeed {
  slug: string;
  name: string;
  region: string;
  currencyCode: string;
  authorityName: string;
  authorityUrl: string;
  countryContext: string;
  financialProducts: string[];
  workPattern: string;
  residencePrompt: string;
}

const IRS_INTERNATIONAL_SOURCE = {
  label: 'IRS International Taxpayers',
  href: 'https://www.irs.gov/individuals/international-taxpayers',
};
const IRS_PUB_54_SOURCE = {
  label: 'IRS Publication 54: Tax Guide for U.S. Citizens and Resident Aliens Abroad',
  href: 'https://www.irs.gov/publications/p54',
};
const FBAR_SOURCE = {
  label: 'FinCEN: Report of Foreign Bank and Financial Accounts',
  href: 'https://www.fincen.gov/report-foreign-bank-and-financial-accounts',
};

const MATRIX_COUNTRY_SEEDS: MatrixCountrySeed[] = [
  {
    slug: 'argentina', name: 'Argentina', region: 'South America', currencyCode: 'ARS',
    authorityName: 'Argentina tax authority (ARCA)', authorityUrl: 'https://www.afip.gob.ar/',
    countryContext: 'Argentina uses the peso and has a formal local tax-registration system. Currency conversion, inflation-sensitive records, local withholding, and the distinction between an individual account and a business account deserve a dated workpaper.',
    financialProducts: ['peso and U.S.-dollar bank accounts', 'local plazo fijo term deposits', 'brokerage and money-market holdings'],
    workPattern: 'Remote services, professional practices, technology work, and locally registered businesses can produce different local records even when the customer or payer is abroad.',
    residencePrompt: 'Map the visa or residence basis, local registration, household, days, lease, and tax filings instead of assuming that an entry stamp or a local bank account establishes every residence conclusion.',
  },
  {
    slug: 'austria', name: 'Austria', region: 'Europe', currencyCode: 'EUR',
    authorityName: 'Austrian Federal Ministry of Finance', authorityUrl: 'https://www.bmf.gv.at/',
    countryContext: 'Austria uses the euro and a formal registration system. Employment, social-insurance records, municipal registration, and investment statements should be reconciled with the U.S. return by tax year.',
    financialProducts: ['Austrian current accounts', 'employer pension arrangements', 'European securities and fund accounts'],
    workPattern: 'Employees, researchers, contractors, and founders may have different payroll, social-insurance, and entity records depending on where services are performed.',
    residencePrompt: 'Keep the Meldezettel or other residence records, lease, work authorization, family facts, and day count together; do not treat registration alone as a treaty tie-breaker conclusion.',
  },
  {
    slug: 'belgium', name: 'Belgium', region: 'Europe', currencyCode: 'EUR',
    authorityName: 'Belgian Federal Public Service Finance', authorityUrl: 'https://finances.belgium.be/',
    countryContext: 'Belgium uses the euro and local records may include municipal registration, payroll withholding, social-security statements, and investment reporting. Preserve the original documents and any translation used for the U.S. file.',
    financialProducts: ['Belgian bank and savings accounts', 'employer group-insurance plans', 'European funds and brokerage accounts'],
    workPattern: 'Cross-border employment, consulting, and work performed from a Belgian home require a service-location calendar rather than a payer-address assumption.',
    residencePrompt: 'Analyze the household, registered address, available home, work arrangement, and actual days in Belgium alongside any treaty residence question.',
  },
  {
    slug: 'brazil', name: 'Brazil', region: 'South America', currencyCode: 'BRL',
    authorityName: 'Brazil Federal Revenue Service', authorityUrl: 'https://www.gov.br/receitafederal/pt-br',
    countryContext: 'Brazil uses the real and its local tax file commonly includes CPF identity records, payroll or self-employment documentation, and banking statements. Amounts should be preserved in reais with a stated U.S.-dollar conversion method.',
    financialProducts: ['Brazilian current and savings accounts', 'Tesouro Direto and local fixed-income holdings', 'Brazilian pension or previdência products'],
    workPattern: 'Employment, contractor work, and Brazilian-company activity can create separate payroll, invoice, withholding, and entity records that need classification before a U.S. form is selected.',
    residencePrompt: 'Document CPF, visa or residence status, entry and departure history, home, family, work, and local filing history without treating any single Brazilian registration as dispositive.',
  },
  {
    slug: 'chile', name: 'Chile', region: 'South America', currencyCode: 'CLP',
    authorityName: 'Chile Internal Revenue Service (SII)', authorityUrl: 'https://www.sii.cl/',
    countryContext: 'Chile uses the peso and maintains a structured taxpayer-registration and electronic-invoicing environment. Keep SII records, local assessments, payment receipts, and conversion support with the U.S. workpapers.',
    financialProducts: ['Chilean bank accounts', 'AFP pension accounts', 'local mutual funds and brokerage accounts'],
    workPattern: 'A contractor or business owner may need to separate Chilean invoices, withholding, entity records, and services physically performed in Chile from U.S. customer relationships.',
    residencePrompt: 'Preserve residence-permit, RUT, lease, household, day-count, employment, and local return records before making a treaty or foreign-tax-credit conclusion.',
  },
  {
    slug: 'china', name: 'China', region: 'Asia', currencyCode: 'CNY',
    authorityName: 'State Taxation Administration of China', authorityUrl: 'https://www.chinatax.gov.cn/',
    countryContext: 'China uses the renminbi and local tax, payroll, employment, and banking records can be highly document-specific. Keep the original Chinese records, translations, and evidence of how amounts were converted.',
    financialProducts: ['Chinese bank accounts', 'employer social-insurance and housing-fund records', 'local investment and wealth-management products'],
    workPattern: 'Employment assignment, teaching, consulting, and company activity may involve employer withholding, work-location, and entity records that do not map one-to-one to U.S. categories.',
    residencePrompt: 'Map the visa, work permit, residence registration, days, home, family, and employer assignment period; do not infer treaty residence from a visa label alone.',
  },
  {
    slug: 'czechia', name: 'Czechia', region: 'Europe', currencyCode: 'CZK',
    authorityName: 'Czech Financial Administration', authorityUrl: 'https://www.financnisprava.cz/',
    countryContext: 'Czechia uses the koruna and local records may include employment certificates, trade-license documents, social insurance, and electronic tax filings. Keep the legal entity and individual records separate.',
    financialProducts: ['Czech bank accounts', 'pension-savings arrangements', 'European brokerage and fund accounts'],
    workPattern: 'Trade-license work, employment, and Czech-company ownership can generate distinct invoices, payroll records, and entity books for the U.S. analysis.',
    residencePrompt: 'Build a timeline from residence registration, lease, work authorization, actual days, family, and local returns, then analyze any treaty article with current sources.',
  },
  {
    slug: 'denmark', name: 'Denmark', region: 'Europe', currencyCode: 'DKK',
    authorityName: 'Danish Tax Agency (Skattestyrelsen)', authorityUrl: 'https://skat.dk/',
    countryContext: 'Denmark uses the krone and commonly produces detailed payroll, pension, social-contribution, and tax-assessment records. Preserve annual statements and explain the conversion from kroner to U.S. dollars.',
    financialProducts: ['Danish bank accounts', 'ATP and employer pension accounts', 'Danish and European investment funds'],
    workPattern: 'Employees and contractors should separate Danish payroll, pension, and social contributions from U.S. earned-income and self-employment questions.',
    residencePrompt: 'Keep the CPR or residence record, home availability, family, employment, departure date, and travel history together before relying on a treaty residence position.',
  },
  {
    slug: 'finland', name: 'Finland', region: 'Europe', currencyCode: 'EUR',
    authorityName: 'Finnish Tax Administration', authorityUrl: 'https://www.vero.fi/',
    countryContext: 'Finland uses the euro and local files may include detailed payroll, pension, and pre-completed tax-return information. Reconcile the local assessment and withholding certificate to U.S. income categories.',
    financialProducts: ['Finnish bank accounts', 'employment pension records', 'Nordic and European securities accounts'],
    workPattern: 'Employment, research, consulting, and startup work can carry separate payroll, pension, and equity records that require year-specific classification.',
    residencePrompt: 'Document the registered home, lease, work, family, days, and departure conduct; a local registration record is evidence, not an automatic treaty conclusion.',
  },
  {
    slug: 'hong-kong', name: 'Hong Kong', region: 'Asia', currencyCode: 'HKD',
    authorityName: 'Hong Kong Inland Revenue Department', authorityUrl: 'https://www.ird.gov.hk/',
    countryContext: 'Hong Kong uses the Hong Kong dollar and local records often distinguish employment, business profits, and property income. Keep contracts, assessments, bank records, and property schedules by tax year.',
    financialProducts: ['Hong Kong bank accounts', 'Mandatory Provident Fund accounts', 'brokerage and listed securities accounts'],
    workPattern: 'An employee or business owner should map where services were performed, where the business was managed, and whether property or investment income has a separate source analysis.',
    residencePrompt: 'Preserve immigration status, actual days, home, family, employment, business, and local filing facts; do not treat a Hong Kong address as resolving U.S. citizenship filing obligations.',
  },
  {
    slug: 'hungary', name: 'Hungary', region: 'Europe', currencyCode: 'HUF',
    authorityName: 'National Tax and Customs Administration of Hungary', authorityUrl: 'https://nav.gov.hu/',
    countryContext: 'Hungary uses the forint and local files may contain payroll, social-contribution, business, and investment documents in a different reporting format from the U.S. return.',
    financialProducts: ['Hungarian bank accounts', 'voluntary pension funds', 'European funds and brokerage accounts'],
    workPattern: 'Employees, contractors, and owners of Hungarian entities should preserve payroll, invoices, entity financials, and the exact place where services were performed.',
    residencePrompt: 'Tie residence evidence to the actual home, lease, family, employment, registration, and travel record rather than relying on a residence card by itself.',
  },
  {
    slug: 'india', name: 'India', region: 'Asia', currencyCode: 'INR',
    authorityName: 'Income Tax Department of India', authorityUrl: 'https://www.incometax.gov.in/',
    countryContext: 'India uses the rupee and local records may include PAN, Form 16, Form 26AS, TDS certificates, remittance records, and multiple account types. Preserve the original Indian documents and a clear U.S.-dollar conversion schedule.',
    financialProducts: ['Indian resident and non-resident bank accounts', 'Public Provident Fund and pension accounts', 'mutual funds and demat securities accounts'],
    workPattern: 'Employment, consulting, software work, and ownership of an Indian company can produce different withholding, remittance, and entity records for U.S. classification.',
    residencePrompt: 'Track citizenship, OCI or visa status, days, homes, family, work, remittances, and local returns; Indian residence and U.S. residence are separate analyses.',
  },
  {
    slug: 'south-korea', name: 'South Korea', region: 'Asia', currencyCode: 'KRW',
    authorityName: 'National Tax Service of Korea', authorityUrl: 'https://www.nts.go.kr/english/',
    countryContext: 'South Korea uses the won and local employment files commonly include withholding certificates, pension records, and insurance contributions. Keep translated records and document the tax year covered by each certificate.',
    financialProducts: ['Korean bank accounts', 'National Pension and employer plans', 'Korean securities and brokerage accounts'],
    workPattern: 'Teaching, employment assignment, contracting, and company ownership can create separate payroll, social-insurance, and entity books that need U.S. category mapping.',
    residencePrompt: 'Preserve visa, alien-registration, home, family, employment, actual days, and departure records before analyzing a treaty or foreign-tax-credit position.',
  },
  {
    slug: 'luxembourg', name: 'Luxembourg', region: 'Europe', currencyCode: 'EUR',
    authorityName: 'Luxembourg Direct Tax Administration', authorityUrl: 'https://impotsdirects.public.lu/',
    countryContext: 'Luxembourg uses the euro and is a financial center with employment, pension, fund, and cross-border banking records that can involve several jurisdictions.',
    financialProducts: ['Luxembourg bank accounts', 'occupational pension plans', 'investment funds and private-banking accounts'],
    workPattern: 'Cross-border employees, fund professionals, and business owners should identify the physical work location, employer, entity, and account custodian separately.',
    residencePrompt: 'Keep residence registration, home, work, family, commuting, days, and local returns together; cross-border commuting does not automatically settle U.S. sourcing or treaty residence.',
  },
  {
    slug: 'norway', name: 'Norway', region: 'Europe', currencyCode: 'NOK',
    authorityName: 'Norwegian Tax Administration', authorityUrl: 'https://www.skatteetaten.no/',
    countryContext: 'Norway uses the krone and local files may include tax assessments, payroll, pension, and petroleum or investment records. Preserve the annual assessment and the basis for every foreign-tax amount claimed.',
    financialProducts: ['Norwegian bank accounts', 'occupational and national pension records', 'Nordic securities accounts'],
    workPattern: 'Employees, offshore workers, consultants, and company owners should maintain a workday and compensation-location schedule rather than rely on the employer’s address.',
    residencePrompt: 'Document home, family, registration, actual days, work, and move conduct, then test the current treaty and social-security provisions against the facts.',
  },
  {
    slug: 'poland', name: 'Poland', region: 'Europe', currencyCode: 'PLN',
    authorityName: 'Polish Ministry of Finance', authorityUrl: 'https://www.podatki.gov.pl/',
    countryContext: 'Poland uses the zloty and local records may include PIT certificates, social insurance, employment contracts, and business-registration documents. Preserve Polish and translated copies.',
    financialProducts: ['Polish bank accounts', 'employee capital plans and pension accounts', 'Polish and European brokerage holdings'],
    workPattern: 'Employment, B2B contracting, and Polish-company ownership should be separated into wage, service, distribution, and entity workpapers.',
    residencePrompt: 'Map local registration, home, center of life, family, work, days, and tax filings before concluding where treaty residence or income source lies.',
  },
  {
    slug: 'romania', name: 'Romania', region: 'Europe', currencyCode: 'RON',
    authorityName: 'Romanian National Agency for Fiscal Administration', authorityUrl: 'https://www.anaf.ro/',
    countryContext: 'Romania uses the leu and local files can include payroll certificates, social contributions, PFA or company records, and banking statements. Keep legal entity documents with the individual return file.',
    financialProducts: ['Romanian bank accounts', 'private pension pillars', 'local mutual funds and brokerage accounts'],
    workPattern: 'PFA contractors, employees, and company owners may have different local filing and withholding records, even when services are sold to foreign customers.',
    residencePrompt: 'Preserve residence, lease, household, family, work, days, registration, and departure records; do not equate a local tax number with U.S. filing status.',
  },
  {
    slug: 'south-africa', name: 'South Africa', region: 'Africa', currencyCode: 'ZAR',
    authorityName: 'South African Revenue Service', authorityUrl: 'https://www.sars.gov.za/',
    countryContext: 'South Africa uses the rand and local records may include IRP5 certificates, provisional-tax payments, retirement annuities, and investment statements. Reconcile local taxable categories with U.S. categories rather than importing totals without review.',
    financialProducts: ['South African bank accounts', 'retirement annuities and pension funds', 'unit trusts and brokerage accounts'],
    workPattern: 'Employment, consulting, mining or professional work, and private-company ownership can require separate source, payroll, and entity schedules.',
    residencePrompt: 'Keep visa, permit, home, family, days, work, and local return evidence together; a local residence conclusion does not replace the U.S. worldwide filing analysis.',
  },
  {
    slug: 'turkey', name: 'Turkey', region: 'Europe/Asia', currencyCode: 'TRY',
    authorityName: 'Turkish Revenue Administration', authorityUrl: 'https://www.gib.gov.tr/',
    countryContext: 'Turkey uses the lira and currency volatility makes transaction-level records and a consistent conversion method especially important for U.S. reporting.',
    financialProducts: ['Turkish bank accounts', 'time deposits and participation accounts', 'local securities and investment funds'],
    workPattern: 'Employment, consulting, online business, and ownership of a Turkish company should be mapped to the place of service, payer, entity, and account records.',
    residencePrompt: 'Document residence permits, household, actual days, work, family, and local filings; do not assume that a visa or property purchase answers treaty residence.',
  },
  {
    slug: 'morocco', name: 'Morocco', region: 'Africa', currencyCode: 'MAD',
    authorityName: 'Moroccan General Tax Administration', authorityUrl: 'https://www.tax.gov.ma/',
    countryContext: 'Morocco uses the dirham and local files may contain payroll, self-employment, property, and banking documents in French or Arabic. Preserve originals and working translations.',
    financialProducts: ['Moroccan bank accounts', 'local savings and term deposits', 'property and rental records'],
    workPattern: 'Remote work, consulting, teaching, and local business activity should be separated by service location, legal owner, customer, and entity records.',
    residencePrompt: 'Tie the residence analysis to the permit, home, family, local registration, actual days, and tax filings rather than a tourist or residency label alone.',
  },
  {
    slug: 'egypt', name: 'Egypt', region: 'Africa', currencyCode: 'EGP',
    authorityName: 'Egyptian Tax Authority', authorityUrl: 'https://www.eta.gov.eg/',
    countryContext: 'Egypt uses the pound and local work, payroll, banking, and property records may require careful translation and currency conversion.',
    financialProducts: ['Egyptian bank accounts', 'time deposits and certificates', 'local property and rental accounts'],
    workPattern: 'Employment, university work, contracting, and Egyptian-company activity require a clear location-of-services and ownership schedule.',
    residencePrompt: 'Preserve visa, residence, home, family, days, employer, and local filing records before making a treaty or foreign-tax-credit claim.',
  },
  {
    slug: 'kenya', name: 'Kenya', region: 'Africa', currencyCode: 'KES',
    authorityName: 'Kenya Revenue Authority', authorityUrl: 'https://www.kra.go.ke/',
    countryContext: 'Kenya uses the shilling and local files may include KRA PIN records, payroll certificates, mobile-money statements, and business records.',
    financialProducts: ['Kenyan bank accounts', 'mobile-money wallets', 'NSSF or employer retirement accounts'],
    workPattern: 'NGO work, employment, consulting, and online business can produce different local withholding and work-location records.',
    residencePrompt: 'Map permits, days, home, family, employer or client, local registration, and return history; a mobile-money account is a records clue, not a residence conclusion.',
  },
  {
    slug: 'nigeria', name: 'Nigeria', region: 'Africa', currencyCode: 'NGN',
    authorityName: 'Federal Inland Revenue Service of Nigeria', authorityUrl: 'https://www.firs.gov.ng/',
    countryContext: 'Nigeria uses the naira and local files may include tax identification, payroll, business, remittance, and banking records. Preserve transaction-level conversion support.',
    financialProducts: ['Nigerian bank accounts', 'pension contribution accounts', 'local mutual funds and treasury holdings'],
    workPattern: 'Employment, oil-and-gas assignments, consulting, and Nigerian-company ownership should be mapped separately for U.S. income and information reporting.',
    residencePrompt: 'Keep immigration, residence, home, family, days, work, and local filing records together and separate Nigerian residence from U.S. citizenship filing.',
  },
  {
    slug: 'ghana', name: 'Ghana', region: 'Africa', currencyCode: 'GHS',
    authorityName: 'Ghana Revenue Authority', authorityUrl: 'https://gra.gov.gh/',
    countryContext: 'Ghana uses the cedi and local records may include taxpayer identification, payroll, mobile-money, pension, and business documents.',
    financialProducts: ['Ghanaian bank accounts', 'mobile-money wallets', 'SSNIT and private pension accounts'],
    workPattern: 'Consulting, employment, education, and local-business activity should be separated into service, payroll, distribution, and entity records.',
    residencePrompt: 'Document the residence permit, actual days, home, family, local registration, work, and tax filings before choosing a treaty or credit position.',
  },
  {
    slug: 'tanzania', name: 'Tanzania', region: 'Africa', currencyCode: 'TZS',
    authorityName: 'Tanzania Revenue Authority', authorityUrl: 'https://www.tra.go.tz/',
    countryContext: 'Tanzania uses the shilling and local records may involve payroll, business licenses, withholding, banking, and property documentation.',
    financialProducts: ['Tanzanian bank accounts', 'mobile-money wallets', 'pension-fund accounts'],
    workPattern: 'Tourism, NGO, consulting, and locally managed business activity should be documented by actual work location and legal owner.',
    residencePrompt: 'Preserve visa, permit, lease, household, days, work, and local return evidence; do not use an island or mainland travel label as a tax conclusion.',
  },
  {
    slug: 'mauritius', name: 'Mauritius', region: 'Africa', currencyCode: 'MUR',
    authorityName: 'Mauritius Revenue Authority', authorityUrl: 'https://www.mra.mu/',
    countryContext: 'Mauritius uses the rupee and serves as a regional financial and business hub. Keep residence, company, investment, and banking records separate by legal owner.',
    financialProducts: ['Mauritian bank accounts', 'global-business company accounts', 'pension and investment funds'],
    workPattern: 'Remote work, global-business companies, and investment activity require an entity and management-location schedule in addition to an individual income schedule.',
    residencePrompt: 'Document the residence permit, home, days, work, family, company management, and local tax registrations before relying on a residence or treaty position.',
  },
  {
    slug: 'seychelles', name: 'Seychelles', region: 'Africa', currencyCode: 'SCR',
    authorityName: 'Seychelles Revenue Commission', authorityUrl: 'https://src.gov.sc/',
    countryContext: 'Seychelles uses the rupee and local files can mix residence, tourism, company, property, and offshore banking records. Identify the legal owner and actual management location for each item.',
    financialProducts: ['Seychellois bank accounts', 'company and trust records', 'property and investment accounts'],
    workPattern: 'Hospitality, consulting, online-business, and entity activity should be separated by where services are performed and where decisions are made.',
    residencePrompt: 'Keep permit, home, actual days, family, work, registration, and company-management evidence together; an offshore-company label does not resolve U.S. forms.',
  },
  {
    slug: 'fiji', name: 'Fiji', region: 'Oceania', currencyCode: 'FJD',
    authorityName: 'Fiji Revenue and Customs Service', authorityUrl: 'https://www.frcs.org.fj/',
    countryContext: 'Fiji uses the dollar and local files may include employment, tourism, property, banking, and business records. Keep island-to-island travel and currency conversion evidence clear.',
    financialProducts: ['Fijian bank accounts', 'employer superannuation accounts', 'property and tourism-business records'],
    workPattern: 'Remote work, hospitality, education, and local business activity need a physical work-location and customer/entity schedule.',
    residencePrompt: 'Document permit, residence, household, days, work, family, local filings, and departures; a long stay or resort address is not enough by itself.',
  },
  {
    slug: 'taiwan', name: 'Taiwan', region: 'Asia', currencyCode: 'TWD',
    authorityName: 'Taiwan Ministry of Finance', authorityUrl: 'https://www.mof.gov.tw/eng/',
    countryContext: 'Taiwan uses the New Taiwan dollar and local employment, health-insurance, payroll, and investment records should be preserved with translations where necessary.',
    financialProducts: ['Taiwan bank accounts', 'labor-insurance and pension records', 'Taiwan securities accounts'],
    workPattern: 'Teaching, technology employment, consulting, and company activity can create distinct payroll, withholding, and entity books.',
    residencePrompt: 'Map visa, household, address, actual days, work, family, and local filing records and verify current treaty or agreement sources before taking a treaty position.',
  },
  {
    slug: 'croatia', name: 'Croatia', region: 'Europe', currencyCode: 'EUR',
    authorityName: 'Croatian Tax Administration', authorityUrl: 'https://www.porezna-uprava.hr/',
    countryContext: 'Croatia uses the euro and local records may include residence registration, payroll, property, seasonal work, and investment statements.',
    financialProducts: ['Croatian bank accounts', 'voluntary pension funds', 'property and rental accounts'],
    workPattern: 'Seasonal, remote, tourism, and local-company work should be mapped by actual service location and the legal owner of receipts and accounts.',
    residencePrompt: 'Preserve residence, home, family, days, work, registration, and local return facts before deciding whether a treaty or local tax result changes the U.S. filing.',
  },
  {
    slug: 'cyprus', name: 'Cyprus', region: 'Europe', currencyCode: 'EUR',
    authorityName: 'Cyprus Tax Department', authorityUrl: 'https://www.mof.gov.cy/mof/tax/taxdep.nsf/',
    countryContext: 'Cyprus uses the euro and local files can involve residence certificates, employment, pensions, shipping, property, and investment records.',
    financialProducts: ['Cyprus bank accounts', 'provident and pension funds', 'investment and property accounts'],
    workPattern: 'Remote work, shipping, consulting, and company ownership require a service-location and entity-management workpaper.',
    residencePrompt: 'Keep permit, residence certificate, home, actual days, family, work, and local return evidence together before making a treaty conclusion.',
  },
  {
    slug: 'malta', name: 'Malta', region: 'Europe', currencyCode: 'EUR',
    authorityName: 'Malta Commissioner for Revenue', authorityUrl: 'https://cfr.gov.mt/',
    countryContext: 'Malta uses the euro and local residence, employment, gaming, maritime, property, and investment records may span several legal entities.',
    financialProducts: ['Maltese bank accounts', 'pension and insurance products', 'investment funds and brokerage accounts'],
    workPattern: 'Remote work, gaming, maritime, consulting, and company activity should be separated by service location, legal entity, and management facts.',
    residencePrompt: 'Document residence program records, home, family, actual days, work, and local tax filings; a residence scheme label does not answer every U.S. form.',
  },
  {
    slug: 'slovenia', name: 'Slovenia', region: 'Europe', currencyCode: 'EUR',
    authorityName: 'Financial Administration of the Republic of Slovenia', authorityUrl: 'https://www.fu.gov.si/',
    countryContext: 'Slovenia uses the euro and local records may include payroll, social-insurance, sole-trader, pension, and investment documents.',
    financialProducts: ['Slovenian bank accounts', 'supplementary pension accounts', 'European funds and brokerage accounts'],
    workPattern: 'Employment, s.p. self-employment, and company ownership should be documented separately for income source and entity reporting.',
    residencePrompt: 'Preserve registration, home, family, employment, days, and local return records and review the current treaty text before making a residence claim.',
  },
  {
    slug: 'slovakia', name: 'Slovakia', region: 'Europe', currencyCode: 'EUR',
    authorityName: 'Financial Directorate of the Slovak Republic', authorityUrl: 'https://www.financnasprava.sk/en/home',
    countryContext: 'Slovakia uses the euro and local records may include employment, social contributions, trade-license, pension, and investment statements.',
    financialProducts: ['Slovak bank accounts', 'supplementary pension funds', 'European brokerage holdings'],
    workPattern: 'Employment and sole-trader or company work should be separated by actual work location, invoice owner, payroll, and entity books.',
    residencePrompt: 'Map registration, home, family, actual days, work, and local filings; do not use a residence document as the sole treaty or U.S. filing fact.',
  },
  {
    slug: 'serbia', name: 'Serbia', region: 'Europe', currencyCode: 'RSD',
    authorityName: 'Serbian Tax Administration', authorityUrl: 'https://www.purs.gov.rs/en.html',
    countryContext: 'Serbia uses the dinar and local files may involve payroll, freelance, company, property, and banking records. Preserve original statements and conversion calculations.',
    financialProducts: ['Serbian bank accounts', 'voluntary pension funds', 'property and local investment accounts'],
    workPattern: 'Freelance, employment, and Serbian-company activity should be mapped to the physical place of services and the legal owner of revenue.',
    residencePrompt: 'Keep residence, lease, household, days, work, registration, and local tax records together before choosing a treaty position.',
  },
  {
    slug: 'bulgaria', name: 'Bulgaria', region: 'Europe', currencyCode: 'BGN',
    authorityName: 'Bulgarian National Revenue Agency', authorityUrl: 'https://nra.bg/',
    countryContext: 'Bulgaria uses the lev and local records may include payroll, self-employment, social contributions, company, and bank statements.',
    financialProducts: ['Bulgarian bank accounts', 'supplementary pension funds', 'European investment accounts'],
    workPattern: 'Remote employees, freelancers, and company owners should keep invoices, payroll, entity accounts, and actual workday records separate.',
    residencePrompt: 'Document the home, registration, family, days, work, and local filing history, then test treaty residence and foreign-tax-credit assumptions against current guidance.',
  },
  {
    slug: 'uruguay', name: 'Uruguay', region: 'South America', currencyCode: 'UYU',
    authorityName: 'Uruguay General Tax Directorate', authorityUrl: 'https://www.dgi.gub.uy/',
    countryContext: 'Uruguay uses the peso and local records may include residence, property, pension, investment, and banking documents. Keep local and U.S.-dollar values in parallel.',
    financialProducts: ['Uruguayan bank accounts', 'local pension accounts', 'property and investment funds'],
    workPattern: 'Retirees, remote workers, and business owners should separate local residence, foreign-source income, services, and property records.',
    residencePrompt: 'Preserve residence permit, home, household, days, property, local tax registration, and actual conduct evidence before relying on a residence-based result.',
  },
  {
    slug: 'peru', name: 'Peru', region: 'South America', currencyCode: 'PEN',
    authorityName: 'Peruvian National Superintendency of Tax Administration', authorityUrl: 'https://www.sunat.gob.pe/',
    countryContext: 'Peru uses the sol and local records may include RUC, payroll, invoices, withholding, property, and banking documentation.',
    financialProducts: ['Peruvian bank accounts', 'AFP pension accounts', 'local funds and brokerage accounts'],
    workPattern: 'Employment, independent work, and Peruvian-company activity should be documented by physical work location, payer, legal owner, and entity records.',
    residencePrompt: 'Map visa, residence, home, actual days, family, work, RUC, and local filing records before choosing treaty or foreign-tax-credit treatment.',
  },
  {
    slug: 'dominican-republic', name: 'Dominican Republic', region: 'Caribbean', currencyCode: 'DOP',
    authorityName: 'Dominican Republic Internal Revenue Service', authorityUrl: 'https://dgii.gov.do/',
    countryContext: 'The Dominican Republic uses the peso and local files may include residence, property, payroll, tourism, and business records.',
    financialProducts: ['Dominican bank accounts', 'pension accounts', 'property and tourism-business accounts'],
    workPattern: 'Remote work, hospitality, consulting, and local-company activity should be separated by actual services, property use, and entity ownership.',
    residencePrompt: 'Keep residence permits, home, family, actual days, work, and local tax records together; a tourist stay and a tax residence are not interchangeable.',
  },
  {
    slug: 'jamaica', name: 'Jamaica', region: 'Caribbean', currencyCode: 'JMD',
    authorityName: 'Tax Administration Jamaica', authorityUrl: 'https://www.jamaicatax.gov.jm/',
    countryContext: 'Jamaica uses the dollar and local files may include payroll, self-employment, tourism, property, and banking records.',
    financialProducts: ['Jamaican bank accounts', 'National Insurance and pension records', 'property and investment accounts'],
    workPattern: 'Remote workers, entertainers, consultants, and local-business owners need a clear source and work-location schedule.',
    residencePrompt: 'Document residence, home, family, days, employment or business, and local filings before drawing a U.S. or treaty conclusion.',
  },
  {
    slug: 'bahamas', name: 'Bahamas', region: 'Caribbean', currencyCode: 'BSD',
    authorityName: 'Bahamas Department of Inland Revenue', authorityUrl: 'https://inlandrevenue.finance.gov.bs/',
    countryContext: 'The Bahamas uses the Bahamian dollar, which is pegged to the U.S. dollar, but local residence, employment, property, and business records still need a separate U.S. analysis.',
    financialProducts: ['Bahamian bank accounts', 'investment and brokerage accounts', 'property and business accounts'],
    workPattern: 'Remote work, finance, tourism, and property activity should be separated by actual services, legal owner, and local business presence.',
    residencePrompt: 'Preserve immigration, home, family, actual days, work, property, and local registration evidence; currency parity does not remove reporting obligations.',
  },
  {
    slug: 'barbados', name: 'Barbados', region: 'Caribbean', currencyCode: 'BBD',
    authorityName: 'Barbados Revenue Authority', authorityUrl: 'https://bra.gov.bb/',
    countryContext: 'Barbados uses the Barbados dollar and local records may include remote-work permits, payroll, property, and business documentation.',
    financialProducts: ['Barbadian bank accounts', 'pension and insurance products', 'property and investment accounts'],
    workPattern: 'Remote employees, digital nomads, tourism workers, and local-company owners should document where services and management actually occur.',
    residencePrompt: 'Keep permit, home, family, actual days, work, local tax records, and departure facts together before relying on a residence or treaty position.',
  },
  {
    slug: 'trinidad-and-tobago', name: 'Trinidad and Tobago', region: 'Caribbean', currencyCode: 'TTD',
    authorityName: 'Trinidad and Tobago Board of Inland Revenue', authorityUrl: 'https://www.ird.gov.tt/',
    countryContext: 'Trinidad and Tobago uses the dollar and local files may include employment, energy-sector, self-employment, property, and banking records.',
    financialProducts: ['local bank accounts', 'National Insurance and pension accounts', 'property and investment accounts'],
    workPattern: 'Energy, consulting, remote work, and company activity should be mapped by work location, payer, entity, and management facts.',
    residencePrompt: 'Document permit, home, family, actual days, work, registration, and local filings before selecting a U.S. foreign-tax or treaty treatment.',
  },
  {
    slug: 'belize', name: 'Belize', region: 'Central America', currencyCode: 'BZD',
    authorityName: 'Belize Tax Service', authorityUrl: 'https://taxservice.gov.bz/',
    countryContext: 'Belize uses the dollar, which is pegged to the U.S. dollar, and local files may include property, tourism, business, and banking documents.',
    financialProducts: ['Belizean bank accounts', 'property and rental accounts', 'company and investment accounts'],
    workPattern: 'Remote work, tourism, consulting, and property activity should be separated into personal, business, rental, and investment records.',
    residencePrompt: 'Keep immigration, home, family, days, work, property, and local registration evidence together; a dollar-denominated account is not a U.S. account.',
  },
  {
    slug: 'guatemala', name: 'Guatemala', region: 'Central America', currencyCode: 'GTQ',
    authorityName: 'Guatemalan Superintendency of Tax Administration', authorityUrl: 'https://portal.sat.gob.gt/portal/',
    countryContext: 'Guatemala uses the quetzal and local files may include NIT, payroll, invoices, withholding, property, and bank records.',
    financialProducts: ['Guatemalan bank accounts', 'pension or savings products', 'property and business accounts'],
    workPattern: 'Remote services, education, consulting, and local-company activity require a physical work-location and legal-owner schedule.',
    residencePrompt: 'Document visa, residence, home, family, days, work, NIT, and local return records before making a residence or credit conclusion.',
  },
  {
    slug: 'georgia', name: 'Georgia', region: 'Caucasus', currencyCode: 'GEL',
    authorityName: 'Revenue Service of Georgia', authorityUrl: 'https://www.rs.ge/Default.aspx?lang=2',
    countryContext: 'Georgia uses the lari and its local records may include residence, small-business, property, banking, and translated contract documents.',
    financialProducts: ['Georgian bank accounts', 'small-business accounts', 'property and investment records'],
    workPattern: 'Remote workers, independent professionals, and local-company owners should separate services performed in Georgia from foreign payer and platform records.',
    residencePrompt: 'Keep visa, residence, home, family, actual days, work, business registration, and local tax records together before making a U.S. residence or credit conclusion.',
  },
  {
    slug: 'saudi-arabia', name: 'Saudi Arabia', region: 'Middle East', currencyCode: 'SAR',
    authorityName: 'Zakat, Tax and Customs Authority', authorityUrl: 'https://zatca.gov.sa/en/',
    countryContext: 'Saudi Arabia uses the riyal and expatriate files may include employer assignments, payroll, residence permits, housing, and end-of-service records.',
    financialProducts: ['Saudi bank accounts', 'employer end-of-service records', 'local investment and brokerage accounts'],
    workPattern: 'Employment assignments, consulting, and company activity require a work-location, employer, housing, and benefit schedule.',
    residencePrompt: 'Keep iqama or other permit records, assignment dates, home, family, actual days, employer, and travel history together; immigration status is not a U.S. tax conclusion.',
  },
  {
    slug: 'qatar', name: 'Qatar', region: 'Middle East', currencyCode: 'QAR',
    authorityName: 'Qatar General Tax Authority', authorityUrl: 'https://gta.gov.qa/en/',
    countryContext: 'Qatar uses the riyal and expatriate records may include employer sponsorship, housing, payroll, benefits, and local business documents.',
    financialProducts: ['Qatari bank accounts', 'employer benefit and pension-like records', 'property and investment accounts'],
    workPattern: 'Energy, education, aviation, contracting, and company work should be mapped by physical services, employer, project, and entity ownership.',
    residencePrompt: 'Preserve permit, assignment, housing, family, actual days, employer, and departure evidence before evaluating FEIE or treaty questions.',
  },
  {
    slug: 'bahrain', name: 'Bahrain', region: 'Middle East', currencyCode: 'BHD',
    authorityName: 'Bahrain National Bureau for Revenue', authorityUrl: 'https://www.nbr.gov.bh/',
    countryContext: 'Bahrain uses the dinar and expatriate files may include employment, housing, banking, and business records with transactions in several currencies.',
    financialProducts: ['Bahraini bank accounts', 'employer benefit accounts', 'investment and property accounts'],
    workPattern: 'Financial, energy, consulting, and remote work should be separated by physical services, employer, customer, and entity management.',
    residencePrompt: 'Keep permit, home, family, days, work, local registration, and travel records together; a sponsored employment status is evidence but not the entire analysis.',
  },
  {
    slug: 'oman', name: 'Oman', region: 'Middle East', currencyCode: 'OMR',
    authorityName: 'Oman Tax Authority', authorityUrl: 'https://taxoman.gov.om/',
    countryContext: 'Oman uses the rial and expatriate files may include employer assignment, housing, payroll, end-of-service, property, and banking records.',
    financialProducts: ['Omani bank accounts', 'employer benefit and end-of-service records', 'property and investment accounts'],
    workPattern: 'Energy, engineering, education, consulting, and local-company work need a dated services and employer-location schedule.',
    residencePrompt: 'Document permit, assignment, home, family, actual days, employer, and departure facts before choosing a federal exclusion or treaty position.',
  },
  {
    slug: 'kuwait', name: 'Kuwait', region: 'Middle East', currencyCode: 'KWD',
    authorityName: 'Kuwait Ministry of Finance', authorityUrl: 'https://www.mof.gov.kw/',
    countryContext: 'Kuwait uses the dinar and expatriate records may include civil identification, employer assignments, payroll, housing, and banking statements.',
    financialProducts: ['Kuwaiti bank accounts', 'employer benefits and end-of-service records', 'investment and property accounts'],
    workPattern: 'Contract assignments, engineering, education, and business activity should be separated by physical services, employer, project, and entity.',
    residencePrompt: 'Keep permit, assignment, home, family, days, work, employer, and travel records together rather than relying on a residence label alone.',
  },
  {
    slug: 'tunisia', name: 'Tunisia', region: 'Africa', currencyCode: 'TND',
    authorityName: 'Tunisian Ministry of Finance', authorityUrl: 'https://www.finances.gov.tn/',
    countryContext: 'Tunisia uses the dinar and local files may include payroll, self-employment, property, banking, and bilingual documentation.',
    financialProducts: ['Tunisian bank accounts', 'local savings and pension accounts', 'property and business accounts'],
    workPattern: 'Remote services, teaching, tourism, and local business activity require a clear location-of-services and owner schedule.',
    residencePrompt: 'Preserve permit, home, household, actual days, work, local registration, and tax records before relying on any treaty or credit treatment.',
  },
];

function profileFromCountry(country: CountryData): MatrixCountryProfile {
  return {
    slug: country.slug,
    name: country.name,
    region: country.region,
    currencyCode: country.banking.currencyCode,
    authorityName: `${country.name} local tax authority`,
    authorityUrl: country.officialSources?.[0]?.href || IRS_INTERNATIONAL_SOURCE.href,
    countryContext: `${country.name} is recorded in the FileAbroad country library as using a ${country.localTax.system} local-tax framework. The country record notes ${country.localTax.rates}; preserve local registration, assessment, payment, withholding, and currency records by tax year rather than copying a local total into a U.S. form.`,
    financialProducts: country.banking.majorBanks.slice(0, 3),
    workPattern: `The country record flags this work-location question for ${country.name}: ${country.feie.physicalPresenceNotes} Keep payer, contract, service-location, payroll, and entity records separate.`,
    residencePrompt: `${country.feie.bonaFideNotes} Build the residence file from the permit, home, family, days, work, and local filing records together.`,
    sources: [
      ...(country.officialSources || []),
      IRS_INTERNATIONAL_SOURCE,
      IRS_PUB_54_SOURCE,
      FBAR_SOURCE,
    ],
  };
}

export const MATRIX_COUNTRY_PROFILES: MatrixCountryProfile[] = [
  ...getAllCountries().map(profileFromCountry),
  ...MATRIX_COUNTRY_SEEDS.map((seed) => ({
    ...seed,
    sources: [
      { label: seed.authorityName, href: seed.authorityUrl },
      IRS_INTERNATIONAL_SOURCE,
      IRS_PUB_54_SOURCE,
      FBAR_SOURCE,
    ],
  })),
].filter((profile, index, all) => all.findIndex((item) => item.slug === profile.slug) === index);

export interface MatrixFormDefinition {
  slug: string;
  coreSlug: string;
  number: string;
  name: string;
  purpose: string;
  trigger: string;
  records: string[];
  countryQuestions: string[];
  pitfalls: string[];
  source: { label: string; href: string };
  relatedGuide: string;
  consultationPath: string;
}

export const MATRIX_FORM_DEFINITIONS: MatrixFormDefinition[] = [
  {
    slug: '8621', coreSlug: '8621-pfic', number: '8621', name: 'PFIC and foreign-fund reporting',
    purpose: 'Form 8621 reports interests in passive foreign investment companies and can require a classification, election, basis, distribution, and excess-distribution workpaper.',
    trigger: 'A foreign mutual fund, ETF, unit trust, insurance investment, or other foreign corporation may need screening under the PFIC income and asset tests; the account label alone is not enough.',
    records: ['purchase and sale confirmations', 'annual statements and fund classifications', 'distributions and cost basis', 'annual information statements if available', 'currency conversion schedule'],
    countryQuestions: ['Does the local product hold pooled investments?', 'Is the account a pension, insurance wrapper, or ordinary brokerage account under local law?', 'Does the provider issue the information needed for a QEF election?'],
    pitfalls: ['assuming a tax-advantaged local wrapper is tax-free in the United States', 'using an account balance instead of transaction-level basis', 'making a QEF or mark-to-market assumption without the required statement'],
    source: { label: 'IRS Form 8621 and instructions', href: 'https://www.irs.gov/forms-pubs/about-form-8621' },
    relatedGuide: '/guides/pfic-guide', consultationPath: '/consultation/pfic',
  },
  {
    slug: '5471', coreSlug: '5471-foreign-corporation', number: '5471', name: 'controlled foreign corporation reporting',
    purpose: 'Form 5471 reports specified ownership and activity in a foreign corporation and can require balance-sheet, income, ownership, and category schedules.',
    trigger: 'Ownership, control, officer or director status, acquisitions, dispositions, and related-party activity can each change the filing analysis; distributions are not the only trigger.',
    records: ['formation and ownership documents', 'shareholder and transfer ledger', 'translated trial balance and financial statements', 'intercompany agreements and payments', 'entity tax returns and dividend records'],
    countryQuestions: ['How is the local entity legally organized?', 'Who owns, controls, manages, and receives value from it?', 'Which local books and currency records support the U.S. schedules?'],
    pitfalls: ['assuming a local limited company has the same U.S. classification', 'waiting for a distribution before reviewing CFC status', 'using unaudited totals without reconciling owners, currency, and related parties'],
    source: { label: 'IRS Form 5471 and instructions', href: 'https://www.irs.gov/forms-pubs/about-form-5471' },
    relatedGuide: '/guides/cfc-guide', consultationPath: '/consultation/business-abroad',
  },
  {
    slug: '3520', coreSlug: '3520-foreign-gifts', number: '3520', name: 'foreign gifts, inheritances, and trusts',
    purpose: 'Form 3520 can report transactions with foreign trusts and large gifts or inheritances from foreign persons, with the correct branch depending on the transaction and ownership facts.',
    trigger: 'A gift, inheritance, trust transfer, trust distribution, or related ownership fact may create a reporting question even when the receipt is not itself taxable income.',
    records: ['donor, decedent, trustee, or grantor identity', 'trust instrument or estate documents', 'transfer and distribution dates', 'fair-market-value evidence', 'trust statements and beneficiary schedules'],
    countryQuestions: ['Is the local arrangement a trust, foundation, estate, pension, or another legal form?', 'Who transferred the property and who legally owns it?', 'Do local statements identify income character and distributions?'],
    pitfalls: ['treating a foreign inheritance as invisible because it is not ordinary income', 'using a local label without reviewing the governing documents', 'confusing Form 3520 with Form 3520-A or another information return'],
    source: { label: 'IRS Form 3520 and instructions', href: 'https://www.irs.gov/forms-pubs/about-form-3520' },
    relatedGuide: '/guides/foreign-trusts-guide', consultationPath: '/consultation/business-abroad',
  },
  {
    slug: '8854', coreSlug: '8854-expatriation', number: '8854', name: 'expatriation and covered-expatriate reporting',
    purpose: 'Form 8854 supports the expatriation-year and compliance-certification analysis for covered expatriate and long-term-resident questions.',
    trigger: 'Renunciation, abandonment of long-term-resident status, the net-worth or tax-liability tests, and the five-year compliance certification must be reviewed together.',
    records: ['citizenship or green-card history', 'five prior years of filed returns', 'tax-liability and net-worth workpapers', 'asset valuations and basis', 'expatriation appointment and certificate records'],
    countryQuestions: ['Where are assets, pensions, homes, and entities located?', 'What local tax and currency records support the valuation?', 'Does the country’s residence or treaty position affect post-expatriation payments?'],
    pitfalls: ['renouncing before checking five-year compliance', 'using a local valuation without a date and currency method', 'assuming an accidental-American fact pattern removes every U.S. filing step'],
    source: { label: 'IRS Form 8854 and instructions', href: 'https://www.irs.gov/forms-pubs/about-form-8854' },
    relatedGuide: '/guides/exit-tax-guide', consultationPath: '/consultation',
  },
  {
    slug: '8938', coreSlug: '8938-fatca', number: '8938', name: 'specified foreign financial asset reporting',
    purpose: 'Form 8938 reports specified foreign financial assets when the applicable filing-status and residence thresholds are met, with definitions that differ from FBAR.',
    trigger: 'Foreign accounts, securities, interests in entities, contracts, and other specified assets must be inventoried and tested under the tax-year thresholds and exceptions.',
    records: ['maximum and year-end account values', 'custodian statements and account numbers', 'ownership and beneficiary documents', 'foreign entity or trust records', 'FBAR comparison and exchange-rate support'],
    countryQuestions: ['Is the asset held through a bank, broker, pension, trust, or entity?', 'Does the country statement show the maximum value?', 'Is the asset reportable on Form 8938, FBAR, both, or neither?'],
    pitfalls: ['treating Form 8938 and FBAR as interchangeable', 'omitting non-bank foreign financial assets', 'using the filing threshold without considering filing status and residence'],
    source: { label: 'IRS Form 8938 and instructions', href: 'https://www.irs.gov/forms-pubs/about-form-8938' },
    relatedGuide: '/guides/fatca-guide', consultationPath: '/consultation',
  },
  {
    slug: '1116', coreSlug: '1116-ftc', number: '1116', name: 'foreign tax credit reporting',
    purpose: 'Form 1116 calculates foreign tax credits by category and coordinates foreign income, legally imposed tax, timing, carryovers, and the limitation calculation.',
    trigger: 'Foreign income tax paid or accrued may be creditable, but the amount, category, source, timing, and refund or carryback facts must be documented before claiming it.',
    records: ['foreign return and assessment', 'withholding certificates and payment receipts', 'income-category schedule', 'refund and carryover history', 'currency conversion method'],
    countryQuestions: ['Which country imposed the tax and on what income?', 'Was the tax paid, withheld, accrued, refunded, or offset?', 'Does the local tax map to the U.S. separate limitation category?'],
    pitfalls: ['crediting non-income taxes without analysis', 'using local taxable income rather than U.S.-source categories', 'ignoring refunds, carryovers, or exchange-rate consistency'],
    source: { label: 'IRS Form 1116 and instructions', href: 'https://www.irs.gov/forms-pubs/about-form-1116' },
    relatedGuide: '/guides/foreign-tax-credit-guide', consultationPath: '/consultation',
  },
  {
    slug: '2555', coreSlug: '2555-feie', number: '2555', name: 'foreign earned income exclusion',
    purpose: 'Form 2555 supports the Foreign Earned Income Exclusion and housing calculations for qualifying foreign earned income when the tax-home and presence or residence tests are satisfied.',
    trigger: 'Earned income, a foreign tax home, and either the Physical Presence Test or Bona Fide Residence Test must be analyzed for the relevant period; the exclusion does not cover every income type.',
    records: ['travel and day-count calendar', 'visa and residence documents', 'employment or client contracts', 'payroll and self-employment records', 'foreign housing and rent records'],
    countryQuestions: ['Where were services physically performed?', 'Was there a foreign tax home and what supports it?', 'Are the income items earned, investment, pension, rental, or distribution income?'],
    pitfalls: ['counting partial or transit days incorrectly', 'using the exclusion for pensions or investment income', 'assuming a foreign visa automatically proves bona fide residence'],
    source: { label: 'IRS Form 2555 and instructions', href: 'https://www.irs.gov/forms-pubs/about-form-2555' },
    relatedGuide: '/guides/feie-guide', consultationPath: '/consultation',
  },
  {
    slug: '8891', coreSlug: '8891-rrsp', number: '8891', name: 'Canadian RRSP and RRIF legacy questions',
    purpose: 'Form 8891 is a legacy form associated with Canadian registered retirement plans; current-year treatment requires checking the governing treaty procedure and current IRS guidance.',
    trigger: 'A Canadian RRSP or RRIF, historical filing, distribution, rollover, or prior treaty election can require review, while residence in another country does not by itself create a Form 8891 filing.',
    records: ['plan registration and administrator statements', 'contributions, transfers, and distributions', 'Canadian slips and withholding', 'prior Forms 8891, 8938, and FBARs', 'beneficiary, death, or divorce records'],
    countryQuestions: ['Is the account actually a Canadian RRSP or RRIF?', 'Was the relevant year before or after the legacy procedure changed?', 'How do distribution, withholding, and currency records reconcile?'],
    pitfalls: ['attaching an obsolete form without checking the current year', 'treating a TFSA or RESP as an RRSP', 'assuming treaty deferral eliminates FBAR, FATCA, or distribution analysis'],
    source: { label: 'IRS Publication 597: U.S.–Canada Income Tax Treaty', href: 'https://www.irs.gov/forms-pubs/about-publication-597' },
    relatedGuide: '/guides/foreign-pensions-guide', consultationPath: '/consultation',
  },
  {
    slug: '8833', coreSlug: '8833-treaty-benefits', number: '8833', name: 'treaty-based return position disclosure',
    purpose: 'Form 8833 discloses certain treaty-based return positions and requires the taxpayer to identify the treaty, article, affected income, and position taken.',
    trigger: 'A treaty position that overrides or modifies an Internal Revenue Code result may require disclosure, subject to the current exceptions and instructions.',
    records: ['treaty and protocol text', 'residence certificates and local returns', 'income and withholding statements', 'article-by-article position memo', 'exception analysis and prior disclosures'],
    countryQuestions: ['Is there a current U.S. treaty or other applicable agreement?', 'What article, saving-clause rule, or protocol applies?', 'Does the local residence and income source support the position for the year?'],
    pitfalls: ['citing a treaty without identifying the article', 'assuming a treaty eliminates citizenship-based filing', 'omitting disclosure because local tax was paid'],
    source: { label: 'IRS Form 8833 and instructions', href: 'https://www.irs.gov/forms-pubs/about-form-8833' },
    relatedGuide: '/guides/tax-treaties-guide', consultationPath: '/consultation',
  },
  {
    slug: '8889', coreSlug: '8889-hsa', number: '8889', name: 'health savings account reporting abroad',
    purpose: 'Form 8889 reports HSA contributions, eligibility, distributions, qualified medical expenses, and any additional tax; living abroad does not automatically make a local health plan a U.S.-qualified HDHP.',
    trigger: 'HSA contributions, distributions, a foreign health plan, Medicare enrollment, or a move during the year can change the Form 8889 analysis.',
    records: ['HSA trustee statements and Forms 1099-SA', 'Form W-2 and payroll contributions', 'health-plan certificate and coverage months', 'foreign medical receipts and reimbursements', 'Medicare and eligibility calendar'],
    countryQuestions: ['Is the health plan actually a U.S.-qualified HDHP?', 'Were medical expenses incurred abroad reimbursed or deducted elsewhere?', 'Was the HSA held at a U.S. or foreign custodian?'],
    pitfalls: ['assuming a comprehensive local plan qualifies as an HDHP', 'treating every foreign medical payment as qualified', 'confusing an HSA with a foreign financial account without reviewing the custodian'],
    source: { label: 'IRS Form 8889 and instructions', href: 'https://www.irs.gov/forms-pubs/about-form-8889' },
    relatedGuide: '/guides/expat-tax-guide', consultationPath: '/consultation',
  },
];

export interface MatrixPageSection { heading: string; body: string }
export interface MatrixPageContent {
  title: string;
  description: string;
  heading: string;
  sections: MatrixPageSection[];
  faqs: { question: string; answer: string }[];
  relatedLinks: { label: string; href: string }[];
  sources: { label: string; href: string }[];
}

export function getMatrixCountryProfile(slug: string): MatrixCountryProfile | null {
  return MATRIX_COUNTRY_PROFILES.find((profile) => profile.slug === slug) || null;
}

export function getMatrixForm(slug: string): MatrixFormDefinition | null {
  return MATRIX_FORM_DEFINITIONS.find((form) => form.slug === slug) || null;
}

export function getMatrixFormCountryParams(): { country: string; form: string }[] {
  return MATRIX_COUNTRY_PROFILES.flatMap((country) =>
    MATRIX_FORM_DEFINITIONS.map((form) => ({ country: country.slug, form: `form-${form.slug}` }))
  );
}

function countWords(value: string): number {
  return value.match(/\b[\w’'-]+\b/g)?.length || 0;
}

export function getMatrixFormCountryContent(countrySlug: string, formSlug: string): MatrixPageContent | null {
  const country = getMatrixCountryProfile(countrySlug);
  const form = getMatrixForm(formSlug.replace(/^form-/, ''));
  if (!country || !form) return null;

  const legacy8891Note = form.slug === '8891' && country.slug !== 'canada'
    ? `Form 8891 is specifically associated with Canadian RRSP and RRIF history. Residence in ${country.name} does not create a Form 8891 filing by itself. Use this page to screen whether a Canadian account, prior filing, or distribution is actually in the file, then confirm the current treaty procedure.`
    : '';
  const productList = country.financialProducts.join(', ');
  const recordList = form.records.join(', ');
  const questionList = form.countryQuestions.join(' ');
  const pitfallList = form.pitfalls.join(' ');
  const sources = [...country.sources, form.source].filter((source, index, all) => all.findIndex((item) => item.href === source.href) === index);
  const sections: MatrixPageSection[] = [
    {
      heading: `Why ${form.name} requires a ${country.name} records review`,
      body: `${form.purpose} The fact that a taxpayer lives in ${country.name} changes the documents and local labels that appear in the file, but it does not turn the U.S. form into a country-specific shortcut. ${country.countryContext} Start with the tax year, the taxpayer's citizenship or resident-alien status, filing status, and the legal owner of each account, payment, entity, or plan. Then identify whether ${form.trigger.toLowerCase()} ${legacy8891Note}`,
    },
    {
      heading: `Residence, work, and source facts in ${country.name}`,
      body: `${country.residencePrompt} ${country.workPattern} For this Form ${form.number} review, keep the residence timeline beside the income and asset map. Record arrival and departure dates, visas or permits, homes available, family location, workdays, payer, customer, employer, and local return or assessment. A local tax number, payroll certificate, bank account, or residence card may support one fact without answering the entire U.S. classification. If the person moved during the year, split the file by period and explain which records cover each period. Do not let a country label replace a fact pattern.`,
    },
    {
      heading: `The ${country.name} accounts, products, and entities to inventory`,
      body: `Begin with the products most likely to appear in a ${country.name} file: ${productList}. For every item, record the institution or counterparty, legal owner, joint owners, beneficiaries, signature authority, opening and closing dates, maximum value, year-end value, currency, and tax statements. For an entity, add formation documents, ownership changes, financial statements, related-party transactions, and management location. For a pension, insurance policy, trust, or local savings wrapper, preserve the governing document and investment menu instead of relying on the marketing name. The U.S. form analysis may change when a local product is a foreign corporation, trust, pension, bank account, or service payment.`,
    },
    {
      heading: `Documents to request before preparing Form ${form.number}`,
      body: `The minimum records for this intersection usually include ${recordList}. Add the ${country.name} tax registration, local return or assessment, payment and withholding evidence, and a translation or explanation when the source document is not in English. Keep original-currency amounts and the exchange-rate method in the workpaper. For account values, preserve monthly or transaction statements when the year-end statement does not show the maximum. For employment and services, keep contracts, invoices, payroll, travel calendars, and evidence of where work occurred. A clean request list should identify the missing document, the period it covers, and the conclusion that cannot be made without it.`,
    },
    {
      heading: `Country-specific questions that can change the U.S. result`,
      body: `${questionList} In ${country.name}, the answer may depend on local terminology, the legal form of the product, the local tax year, a residence or work permit, a withholding certificate, or a foreign-currency calculation. Write each answer as a fact plus source: what happened, which document proves it, which U.S. instruction or treaty provision may be affected, and what remains unresolved. If the local authority's guidance is unclear, preserve the question for professional review rather than turning an assumption into a filed position. The current ${country.authorityName} material should be checked directly at the source link shown below.`,
    },
    {
      heading: `Common mistakes for Americans filing from ${country.name}`,
      body: `Screen for these recurring errors: ${pitfallList} Also check for duplicate or omitted reporting between the federal return, FBAR, Form 8938, local return, employer certificate, entity filing, and prior-year return. A foreign tax paid is not automatically a credit, a foreign account is not automatically exempt, and a treaty headline is not a complete position. If the form is not applicable, document why: no triggering fact, different legal classification, threshold not met, or a current exception. That conclusion should be tied to the tax year and records reviewed.`,
    },
    {
      heading: `A preparation workflow that can be reconciled later`,
      body: `Use a five-part workflow for Form ${form.number} and ${country.name}: first, lock the year and identity facts; second, classify the income, account, entity, plan, gift, or treaty position; third, reconcile local statements and original-currency amounts; fourth, prepare the relevant U.S. schedules and compare them with FBAR, Form 8938, or other information returns; and fifth, save the source log, assumptions, filed copy, acceptance record, and unresolved questions. The workflow should also note whether another professional is needed for a legal, local-country, audit-representation, valuation, or entity-classification question. Do not promise a result before the facts and written scope are accepted.`,
    },
    {
      heading: `How to reconcile the ${country.name} source file`,
      body: `Before the return is finalized, compare the local statement totals with the U.S. schedules, bank and investment inventory, and any prior-year carryover. Mark every difference as timing, currency, classification, withholding, refund, ownership, or missing-record issue. Keep a dated source log that names the agency, provider, account, document period, URL or reference, and reviewer question. This is especially important when ${country.name} records use different tax years, languages, account labels, or reporting categories. A reconciliation that cannot be explained should remain an open issue in the written scope rather than being hidden in a rounded number.`,
    },
    {
      heading: `When to book a consultation about Form ${form.number} in ${country.name}`,
      body: `A paid consultation is useful when the file spans multiple years, a move, multiple countries, a foreign entity, a pension or trust, a local investment product, an IRS notice, or competing FEIE, foreign-tax-credit, and treaty theories. Bring the ${country.name} residence timeline, account and income inventory, local returns or statements, prior U.S. filings, and the records listed above. The consultation should produce a written issue list, missing-document request, expected deliverable, assumptions, and boundaries before preparation begins. FileAbroad does not treat a country-form page as a determination of your filing obligation; it is a source-backed starting map for a fact review.`,
    },
  ];
  const allText = sections.map((section) => `${section.heading} ${section.body}`).join(' ');
  if (countWords(allText) < 1000) throw new Error(`Matrix page is below 1,000 words: ${country.slug}/${form.slug}`);

  return {
    title: `Form ${form.number} for Americans in ${country.name}: ${form.name}`,
    description: `Country-specific records and U.S. filing questions for Form ${form.number} when an American lives, works, owns assets, or has transactions connected to ${country.name}. Start with a paid consultation and written scope.`,
    heading: `Form ${form.number} for Americans in ${country.name}`,
    sections,
    faqs: [
      {
        question: `Does living in ${country.name} automatically require Form ${form.number}?`,
        answer: `No. The filing question depends on the form's trigger, the taxpayer's status, the legal owner, the tax year, and the records. Living in ${country.name} identifies the local documents to gather; it does not replace the U.S. instructions or a fact-specific review.`,
      },
      {
        question: `Which ${country.name} records should I gather first?`,
        answer: `Start with residence and travel records, local tax identification and returns, bank or investment statements, income and withholding records, the legal documents for any entity or plan, and the original-currency conversion support. Then add the form-specific records listed on this page.`,
      },
      {
        question: `Can a local tax return replace the U.S. Form ${form.number} analysis?`,
        answer: `No. A local return can provide evidence about income, tax paid, residence, or ownership, but U.S. forms use their own definitions and tax-year instructions. Reconcile the local return with the U.S. filing rather than copying its categories.`,
      },
      {
        question: `What happens before FileAbroad prepares Form ${form.number}?`,
        answer: `The process starts with a paid consultation to identify the relevant years, facts, records, forms, unresolved classifications, and professional boundaries. Accepted preparation follows a written scope rather than a public price or an automatic form selection.`,
      },
    ],
    relatedLinks: [
      { label: `${country.name} country guide`, href: getCountryBySlug(country.slug) ? `/countries/${country.slug}` : '/countries' },
      { label: `Form ${form.number} overview`, href: `/forms/${form.coreSlug}` },
      { label: 'Related guide', href: form.relatedGuide },
      { label: 'Book a consultation', href: form.consultationPath },
    ],
    sources,
  };
}

export const MATRIX_PERSONA_SLUGS = [
  'digital-nomads', 'retirees', 'accidental-americans', 'military-contractors',
  'freelancers', 'married-foreign-spouse', 'green-card-holders', 'crypto-investors',
] as const;

export const MATRIX_PERSONA_ALIASES: Record<string, (typeof MATRIX_PERSONA_SLUGS)[number]> = {
  'digital-nomad': 'digital-nomads',
  'retiree-abroad': 'retirees',
  'accidental-american': 'accidental-americans',
  'military-contractor': 'military-contractors',
  'self-employed-abroad': 'freelancers',
  'married-to-foreign-spouse': 'married-foreign-spouse',
  'green-card-holder': 'green-card-holders',
  'crypto-investor': 'crypto-investors',
};

export function resolvePersonaMatrixSlug(slug: string): (typeof MATRIX_PERSONA_SLUGS)[number] | string {
  return MATRIX_PERSONA_ALIASES[slug] || slug;
}

export function getPersonaCountryParams(): { slug: string; country: string }[] {
  return MATRIX_PERSONA_SLUGS.flatMap((slug) =>
    MATRIX_COUNTRY_PROFILES.map((country) => ({ slug, country: country.slug }))
  );
}

export function getPersonaCountryContent(personaSlug: string, countrySlug: string): MatrixPageContent | null {
  const resolvedPersonaSlug = resolvePersonaMatrixSlug(personaSlug);
  const persona = getPersonaBySlug(resolvedPersonaSlug);
  const country = getMatrixCountryProfile(countrySlug);
  if (!persona || !country || !MATRIX_PERSONA_SLUGS.includes(resolvedPersonaSlug as (typeof MATRIX_PERSONA_SLUGS)[number])) return null;

  const challenges = persona.painPoints.slice(0, 4).join(' ');
  const help = persona.howWeHelp.slice(0, 4).join(' ');
  const resources = persona.relevantContent.slice(0, 4).map((item) => item.label).join(', ');
  const products = country.financialProducts.join(', ');
  const sections: MatrixPageSection[] = [
    {
      heading: `${persona.name} in ${country.name}: start with a two-country fact map`,
      body: `${persona.description} A ${persona.name.toLowerCase()} case connected to ${country.name} needs two parallel maps: the continuing U.S. citizenship or resident-alien filing analysis and the country-specific residence, work, account, and local-tax record. ${country.countryContext} The label ${persona.name.toLowerCase()} is a screening starting point, not a tax conclusion. Lock the tax year, identity, move timeline, local status, home, family, work location, income, accounts, entities, pensions, and prior filings before choosing a form or exclusion.`,
    },
    {
      heading: `The ${country.name} residence and work questions for this persona`,
      body: `${country.residencePrompt} ${country.workPattern} For this audience, ask where services were actually performed, where the tax home was, whether local residence was established, which employer or customer paid, and whether the person moved between countries. Keep travel calendars, permits, leases, employer letters, contracts, invoices, and local returns together. A country address or local tax number can support one fact but does not automatically settle FEIE, treaty residence, state domicile, or U.S. filing obligations.`,
    },
    {
      heading: `Income and accounts to inventory in ${country.name}`,
      body: `List wages, contractor receipts, business income, equity, pensions, Social Security, rent, interest, dividends, capital gains, digital assets, gifts, trusts, and distributions. Then inventory ${products}. For every item record the legal owner, account country, maximum and year-end value, currency, basis, statement, withholding, local tax, and service or transaction date. ${challenges} These issues are especially important for this persona because a payer, bank, platform, visa, or local account label may conceal a different U.S. classification.`,
    },
    {
      heading: `Federal forms, exclusions, and local records`,
      body: `${help} Screen the likely combination of Form 2555, Form 1116, FBAR, Form 8938, and any form triggered by a foreign fund, company, partnership, trust, gift, pension, or treaty position. Keep the ${country.name} local return and assessment beside the U.S. workpaper, but do not copy local categories without testing U.S. definitions. Compare the FEIE and foreign tax credit by income category and tax year; a benefit for earned income may not cover pensions, investments, entity income, or self-employment tax.`,
    },
    {
      heading: `State ties and prior-year compliance`,
      body: `A ${persona.name.toLowerCase()} can still have a former-state domicile, retained home, family tie, license, voter record, property, or source-income obligation after moving to ${country.name}. Build a departure-year and annual-tie workpaper. If returns or FBARs are missing, preserve every prior address, residence period, account statement, entity record, and notice before selecting a catch-up path. A non-willful certification, streamlined procedure, amended return, or late information return is a fact-specific choice and should not be selected from a persona label alone.`,
    },
    {
      heading: `A records-first workflow for ${persona.name.toLowerCase()} cases in ${country.name}`,
      body: `Use ${resources} as organization tools, then create a source log with four columns: fact, document, U.S. or local rule affected, and unresolved question. Reconcile original-currency amounts, keep translations, identify missing documents, and mark assumptions. The final file should contain identity and residence evidence, travel and work calendars, income schedules, account and ownership inventories, local returns, U.S. returns, foreign-tax workpapers, state analysis, and notices. This order makes the analysis reviewable when the person changes countries, employers, accounts, or filing status.`,
    },
    {
      heading: `Reconcile changes across years in ${country.name}`,
      body: `Do not copy last year's country-persona conclusion without checking what changed. Compare arrival and departure dates, days, employer or customer, home, family, visa, account values, entity ownership, fund holdings, local tax paid, and state ties. Mark changes as new facts, changed law, changed documentation, or unresolved classification. Keep the original source and the date it was reviewed. For a person who moves often or has several income streams, a simple annual table showing country, workdays, residence evidence, accounts, and filings can reveal missing periods before a return or information report is prepared.`,
    },
    {
      heading: `When a consultation is the right next step`,
      body: `Book a paid consultation when the ${persona.name.toLowerCase()} file spans multiple tax years, countries, employers, accounts, foreign funds, entities, state ties, or uncertain residence. Bring the ${country.name} records, prior returns, account inventory, day calendar, local tax documents, and the questions above. The consultation should produce a written issue list, document request, deliverable, assumptions, and boundaries before preparation begins. It should also identify questions that require another specialist rather than promising that a persona or country label determines the result.`,
    },
  ];
  const allText = sections.map((section) => `${section.heading} ${section.body}`).join(' ');
  if (countWords(allText) < 850) throw new Error(`Persona-country page is below 850 words: ${resolvedPersonaSlug}/${countrySlug}`);

  return {
    title: `${persona.name} in ${country.name}: U.S. Expat Tax Questions`,
    description: `A records-first U.S. tax planning map for ${persona.name.toLowerCase()} living or working in ${country.name}. Review residence, income, accounts, forms, state ties, and next steps.`,
    heading: `${persona.name} in ${country.name}`,
    sections,
    faqs: [
      { question: `Does ${country.name} residence change the U.S. filing obligation for ${persona.name.toLowerCase()}?`, answer: `It can change local filings, residence evidence, foreign-tax records, and the forms that need review, but U.S. citizenship or resident-alien status generally remains the starting point. The exact result depends on the tax year and facts.` },
      { question: `Which records matter most for this country and persona?`, answer: `Start with the move and day timeline, residence and work records, income and account inventory, local returns, prior U.S. filings, and the documents for any entity, pension, fund, trust, or digital-asset activity.` },
      { question: `Can the FEIE or foreign tax credit solve every issue?`, answer: `No. They address different categories and do not automatically answer FBAR, FATCA, state domicile, self-employment tax, entity, pension, trust, or treaty questions.` },
    ],
    relatedLinks: [
      { label: `${persona.name} pillar`, href: `/personas/${persona.slug}` },
      { label: `${country.name} country guide`, href: getCountryBySlug(country.slug) ? `/countries/${country.slug}` : '/countries' },
      ...persona.relevantTools.slice(0, 2),
      { label: 'Book a consultation', href: '/consultation' },
    ],
    sources: [...country.sources, IRS_PUB_54_SOURCE, FBAR_SOURCE].filter((source, index, all) => all.findIndex((item) => item.href === source.href) === index),
  };
}

export interface MatrixServiceDefinition {
  slug: string;
  name: string;
  focus: string;
  records: string[];
  consultationPath: string;
}

export const MATRIX_STATE_SLUGS = [
  'california', 'virginia', 'new-mexico', 'new-york',
  'south-carolina', 'massachusetts', 'texas', 'florida',
] as const;

export const MATRIX_SERVICE_DEFINITIONS: MatrixServiceDefinition[] = [
  { slug: 'streamlined', name: 'Streamlined filing', focus: 'catch-up returns, FBAR history, and the non-willful statement', records: ['prior returns and notices', 'residence and travel timeline', 'foreign account statements', 'income and asset inventory'], consultationPath: '/consultation/streamlined' },
  { slug: 'fbar', name: 'FBAR filing', focus: 'foreign-account ownership, signature authority, and maximum values', records: ['account-opening and closing records', 'monthly or transaction statements', 'ownership and signature-authority documents', 'currency conversion workpaper'], consultationPath: '/consultation' },
  { slug: 'fatca', name: 'FATCA compliance', focus: 'Form 8938 and specified foreign financial assets', records: ['custodian statements', 'asset and ownership inventory', 'filing-status and threshold facts', 'FBAR comparison'], consultationPath: '/consultation' },
  { slug: 'expat-tax-filing', name: 'Expat tax filing', focus: 'federal income, foreign tax, state, and information-return coordination', records: ['income statements and contracts', 'foreign returns and tax receipts', 'travel and residence records', 'prior U.S. returns and state filings'], consultationPath: '/consultation' },
  { slug: 'pfic', name: 'PFIC and foreign-fund review', focus: 'foreign pooled investments, Form 8621, and election records', records: ['fund statements and transaction history', 'annual information statements', 'basis and distributions', 'account and wrapper documents'], consultationPath: '/consultation/pfic' },
  { slug: 'business-abroad', name: 'Business abroad', focus: 'foreign entity classification, ownership, books, and U.S. information returns', records: ['formation and ownership documents', 'translated financial statements', 'intercompany and payroll records', 'entity tax returns and bank statements'], consultationPath: '/consultation/business-abroad' },
];

export function getStateServiceParams(): { state: string; service: string }[] {
  return MATRIX_STATE_SLUGS.flatMap((state) => MATRIX_SERVICE_DEFINITIONS.map((service) => ({ state, service: service.slug })));
}

export function getStateServiceContent(stateSlug: string, serviceSlug: string): MatrixPageContent | null {
  const state = getStateBySlug(stateSlug);
  const service = MATRIX_SERVICE_DEFINITIONS.find((item) => item.slug === serviceSlug);
  if (!state || !service || !MATRIX_STATE_SLUGS.includes(stateSlug as (typeof MATRIX_STATE_SLUGS)[number])) return null;

  const keyRules = state.keyRules.slice(0, 3).join(' ');
  const traps = state.commonTraps.slice(0, 3).join(' ');
  const considerations = state.expatConsiderations.slice(0, 3).join(' ');
  const records = service.records.join(', ');
  const sections: MatrixPageSection[] = [
    {
      heading: `${service.name} for a ${state.name} taxpayer moving abroad`,
      body: `${state.description} A ${service.name.toLowerCase()} review for a former ${state.name} resident must coordinate the state question with the federal return and the foreign-country record. ${state.persistenceSummary} The state result is not determined by a foreign address, FEIE claim, or paid consultation form alone. Start with the tax year, last day of ${state.name} residence, first day of the foreign home, homes retained, family, workdays, property, licenses, voter records, and state-source income. Then test which parts of ${service.focus} actually apply.`,
    },
    {
      heading: `${state.name} rules that change the service file`,
      body: `${keyRules} These rules should be read with the current ${state.name} instructions for the year under review. Separate domicile, physical presence, permanent-place-of-abode, safe-harbor, and source-income questions instead of turning them into one day count. If the state has no broad safe harbor for the fact pattern, say so and analyze the general rule. A federal result can be useful evidence while still failing to answer a state question.`,
    },
    {
      heading: `Evidence to gather before a ${state.name} ${service.name.toLowerCase()} review`,
      body: `Gather ${records}. Add the last ${state.name} return, departure-year return, address history, driver-license and voter records, home sale or lease documents, utility and insurance records, family and school facts, travel calendar, employer or client contracts, payroll, property schedules, federal returns, foreign returns, notices, and prior professional work. For each item, record the date, the fact it proves, and any limitation. Preserve the original and a working translation where necessary. An organized evidence file is more useful than a general statement that the taxpayer intended to leave.`,
    },
    {
      heading: `Income sourcing and federal coordination`,
      body: `A ${state.name} customer, employer, bank, or property does not automatically determine the source of service income. Record where the service was physically performed, which entity paid, where the business was managed, and the number of ${state.name} workdays. Separate wages, self-employment, business distributions, rent, capital gains, pensions, equity, and foreign tax. ${considerations} Compare state treatment with the federal return, Form 2555, Form 1116, FBAR, Form 8938, entity forms, and any treaty disclosure, but do not assume federal exclusions or credits carry over to the state.`,
    },
    {
      heading: `Traps and notice-response questions in ${state.name}`,
      body: `${traps} A notice may concern residency, source income, withholding, estimated tax, federal information matching, or a missing return. Preserve the entire notice, deadline, return, source schedule, and departure evidence. Answer the agency's exact question with an indexed explanation and identify whether audit representation or a state-law opinion is outside the preparation scope. Do not ignore a notice because the taxpayer lives abroad, and do not send an unorganized bundle of documents.`,
    },
    {
      heading: `A written-scope workflow for ${service.name.toLowerCase()} and ${state.name}`,
      body: `The work should move from issue list to document request, state and federal classification, calculation, review, and final filing or response. The written scope should identify years, returns, schedules, state-source categories, assumptions, missing records, translation or valuation limits, and whether representation is included. If the service reveals a domicile dispute, entity issue, local-country question, or legal interpretation, mark the boundary and refer it appropriately. A paid consultation is the correct starting point when the record is incomplete or the position depends on competing facts.`,
    },
  ];
  const allText = sections.map((section) => `${section.heading} ${section.body}`).join(' ');
  if (countWords(allText) < 650) throw new Error(`State-service page is below 650 words: ${stateSlug}/${serviceSlug}`);

  return {
    title: `${state.name} ${service.name}: State Tax Issues Abroad`,
    description: `Records-first ${service.name.toLowerCase()} guidance for former ${state.name} residents abroad. Review domicile, sourcing, federal coordination, evidence, and consultation scope.`,
    heading: `${state.name} and ${service.name} for Americans Abroad`,
    sections,
    faqs: [
      { question: `Does moving abroad automatically end ${state.name} obligations?`, answer: `No. Review domicile, physical presence, available homes, family, work, property, licenses, and ${state.name}-source income under the current tax-year rules.` },
      { question: 'What records should I bring?', answer: 'Bring the departure timeline, prior state and federal returns, foreign residence records, travel calendar, income and property schedules, account records, and any notice or agency correspondence.' },
      { question: 'Can FileAbroad choose my state position from an online form?', answer: 'No. The process starts with a paid consultation and written scope that identifies facts, missing records, deliverables, assumptions, and professional boundaries.' },
    ],
    relatedLinks: [
      { label: `${state.name} state-tax guide`, href: `/state-taxes/${state.slug}` },
      { label: service.name, href: service.consultationPath },
      { label: 'State tax guide', href: '/guides/state-taxes-abroad' },
      { label: 'Book a consultation', href: '/consultation' },
    ],
    sources: [
      IRS_INTERNATIONAL_SOURCE,
      IRS_PUB_54_SOURCE,
    ].filter((source, index, all) => all.findIndex((item) => item.href === source.href) === index),
  };
}

export function getMatrixCounts() {
  return {
    countries: MATRIX_COUNTRY_PROFILES.length,
    forms: MATRIX_FORM_DEFINITIONS.length,
    formCountry: getMatrixFormCountryParams().length,
    personaCountry: getPersonaCountryParams().length,
    stateService: getStateServiceParams().length,
  };
}
