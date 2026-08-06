import type { Locale } from './config';

export type LocalizedToolSlug = 'feie-calculator' | 'fbar-checker' | 'catch-up-program' | 'expat-tax-deadline-calendar' | 'tax-savings-estimator';

type ToolCopy = { title: string; description: string; breadcrumb: string };

const en: Record<LocalizedToolSlug, ToolCopy> = {
  'feie-calculator': { title: 'FEIE Calculator', description: 'Estimate how much you could save with the Foreign Earned Income Exclusion (Form 2555). The 2025 exclusion limit is $130,000.', breadcrumb: 'FEIE Calculator' },
  'fbar-checker': { title: 'FBAR Requirement Checker', description: 'Answer four quick questions to find out if you may need to file an FBAR (FinCEN Form 114) for foreign financial accounts.', breadcrumb: 'FBAR Checker' },
  'catch-up-program': { title: 'Which IRS Catch-Up Program Fits Me?', description: 'Review educational information about common catch-up paths. This tool cannot determine eligibility or willfulness and does not replace advice from an attorney or credentialed representative.', breadcrumb: 'Catch-Up Program Finder' },
  'expat-tax-deadline-calendar': { title: '2026 Expat Tax Deadline Calendar', description: 'Review important tax dates for Americans living abroad in 2026, including FBAR, returns, extensions, and estimated payments.', breadcrumb: 'Deadline Calendar' },
  'tax-savings-estimator': { title: 'FEIE vs FTC Estimator', description: 'Compare the Foreign Earned Income Exclusion and Foreign Tax Credit for a preliminary side-by-side estimate.', breadcrumb: 'FEIE vs FTC Estimator' },
};

export const localizedToolCopy: Record<Locale, Record<LocalizedToolSlug, ToolCopy>> = {
  en,
  es: {
    'feie-calculator': { title: 'Calculadora FEIE para expatriados', description: 'Estime cuánto podría ahorrar con la Exclusión de Ingresos del Trabajo en el Extranjero (Formulario 2555). El límite de exclusión de 2025 es $130,000.', breadcrumb: 'Calculadora FEIE' },
    'fbar-checker': { title: 'Comprobador de obligación FBAR', description: 'Responda cuatro preguntas para saber si puede necesitar presentar un FBAR (Formulario FinCEN 114) por sus cuentas financieras extranjeras.', breadcrumb: 'Comprobador FBAR' },
    'catch-up-program': { title: '¿Qué programa de regularización del IRS podría corresponder?', description: 'Revise información educativa sobre rutas comunes para ponerse al día. Esta herramienta no determina elegibilidad ni intencionalidad y no sustituye el consejo de un abogado o representante acreditado.', breadcrumb: 'Buscador de regularización' },
    'expat-tax-deadline-calendar': { title: 'Calendario de fechas fiscales para expatriados 2026', description: 'Revise las fechas fiscales importantes de 2026 para estadounidenses en el extranjero, incluidos FBAR, declaraciones, extensiones y pagos estimados.', breadcrumb: 'Calendario fiscal' },
    'tax-savings-estimator': { title: 'Estimador FEIE frente a crédito fiscal extranjero', description: 'Compare la Exclusión de Ingresos del Trabajo en el Extranjero y el Crédito Fiscal Extranjero mediante una estimación preliminar.', breadcrumb: 'Estimador FEIE y FTC' },
  },
  pt: {
    'feie-calculator': { title: 'Calculadora FEIE para expatriados', description: 'Estime quanto pode poupar com a Exclusão de Rendimentos do Trabalho no Estrangeiro (Formulário 2555). O limite de exclusão de 2025 é $130.000.', breadcrumb: 'Calculadora FEIE' },
    'fbar-checker': { title: 'Verificador da obrigação FBAR', description: 'Responda a quatro perguntas para saber se pode precisar apresentar um FBAR (Formulário FinCEN 114) sobre contas financeiras estrangeiras.', breadcrumb: 'Verificador FBAR' },
    'catch-up-program': { title: 'Qual programa de regularização do IRS pode se aplicar?', description: 'Consulte informações educativas sobre caminhos comuns para regularizar declarações. A ferramenta não determina elegibilidade ou intenção e não substitui orientação profissional.', breadcrumb: 'Localizador de regularização' },
    'expat-tax-deadline-calendar': { title: 'Calendário fiscal de expatriados 2026', description: 'Consulte as principais datas fiscais de 2026 para americanos no exterior, incluindo FBAR, declarações, extensões e pagamentos estimados.', breadcrumb: 'Calendário fiscal' },
    'tax-savings-estimator': { title: 'Estimador FEIE versus crédito fiscal estrangeiro', description: 'Compare a Exclusão de Rendimentos do Trabalho no Estrangeiro e o Crédito Fiscal Estrangeiro numa estimativa preliminar.', breadcrumb: 'Estimador FEIE e FTC' },
  },
  fr: {
    'feie-calculator': { title: 'Calculateur FEIE pour expatriés', description: 'Estimez vos économies possibles grâce à l’exclusion des revenus du travail à l’étranger (formulaire 2555). La limite 2025 est de 130 000 $.', breadcrumb: 'Calculateur FEIE' },
    'fbar-checker': { title: 'Vérificateur de l’obligation FBAR', description: 'Répondez à quatre questions pour savoir si vous pourriez devoir déposer un FBAR (formulaire FinCEN 114) pour vos comptes financiers étrangers.', breadcrumb: 'Vérificateur FBAR' },
    'catch-up-program': { title: 'Quel programme IRS de mise en conformité peut correspondre ?', description: 'Consultez des informations éducatives sur les parcours courants de régularisation. Cet outil ne détermine ni l’éligibilité ni l’intention et ne remplace pas un conseil professionnel.', breadcrumb: 'Recherche de régularisation' },
    'expat-tax-deadline-calendar': { title: 'Calendrier fiscal des expatriés 2026', description: 'Consultez les dates fiscales importantes de 2026 pour les Américains à l’étranger : FBAR, déclarations, prolongations et acomptes.', breadcrumb: 'Calendrier fiscal' },
    'tax-savings-estimator': { title: 'Estimateur FEIE ou crédit d’impôt étranger', description: 'Comparez l’exclusion des revenus du travail à l’étranger et le crédit d’impôt étranger dans une première estimation.', breadcrumb: 'Estimateur FEIE et FTC' },
  },
  de: {
    'feie-calculator': { title: 'FEIE-Rechner für Expats', description: 'Schätzen Sie Ihre mögliche Ersparnis durch den Ausschluss ausländischer Arbeitseinkünfte (Formular 2555). Das Limit für 2025 beträgt 130.000 $.', breadcrumb: 'FEIE-Rechner' },
    'fbar-checker': { title: 'Prüfung der FBAR-Pflicht', description: 'Beantworten Sie vier Fragen, um zu prüfen, ob für ausländische Finanzkonten ein FBAR (FinCEN-Formular 114) erforderlich sein könnte.', breadcrumb: 'FBAR-Prüfung' },
    'catch-up-program': { title: 'Welcher IRS-Nachholweg könnte passen?', description: 'Lesen Sie Bildungsinformationen zu gängigen Wegen der Nachmeldung. Dieses Tool bestimmt weder Berechtigung noch Vorsatz und ersetzt keine professionelle Beratung.', breadcrumb: 'Nachholprogramm-Finder' },
    'expat-tax-deadline-calendar': { title: 'Steuerkalender für Expats 2026', description: 'Prüfen Sie wichtige Steuertermine 2026 für Amerikaner im Ausland, einschließlich FBAR, Erklärungen, Verlängerungen und Vorauszahlungen.', breadcrumb: 'Steuerkalender' },
    'tax-savings-estimator': { title: 'Schätzer: FEIE oder ausländische Steuergutschrift', description: 'Vergleichen Sie den Ausschluss ausländischer Arbeitseinkünfte mit der ausländischen Steuergutschrift in einer ersten Schätzung.', breadcrumb: 'FEIE- und FTC-Schätzer' },
  },
  it: {
    'feie-calculator': { title: 'Calcolatore FEIE per espatriati', description: 'Stima quanto potresti risparmiare con l’esclusione del reddito da lavoro estero (modulo 2555). Il limite 2025 è di 130.000 $.', breadcrumb: 'Calcolatore FEIE' },
    'fbar-checker': { title: 'Verifica dell’obbligo FBAR', description: 'Rispondi a quattro domande per capire se potresti dover presentare un FBAR (modulo FinCEN 114) per conti finanziari esteri.', breadcrumb: 'Verifica FBAR' },
    'catch-up-program': { title: 'Quale percorso IRS per regolarizzare può essere adatto?', description: 'Consulta informazioni educative sui percorsi comuni per recuperare le dichiarazioni. Lo strumento non determina idoneità o intenzionalità e non sostituisce un professionista.', breadcrumb: 'Ricerca percorso di regolarizzazione' },
    'expat-tax-deadline-calendar': { title: 'Calendario fiscale degli espatriati 2026', description: 'Consulta le date fiscali importanti del 2026 per gli americani all’estero, inclusi FBAR, dichiarazioni, proroghe e pagamenti stimati.', breadcrumb: 'Calendario fiscale' },
    'tax-savings-estimator': { title: 'Stima FEIE o credito d’imposta estero', description: 'Confronta l’esclusione del reddito da lavoro estero e il credito d’imposta estero con una prima stima.', breadcrumb: 'Stima FEIE e FTC' },
  },
  nl: {
    'feie-calculator': { title: 'FEIE-calculator voor expats', description: 'Schat hoeveel u mogelijk bespaart met de uitsluiting van buitenlands arbeidsinkomen (Formulier 2555). De limiet voor 2025 is $130.000.', breadcrumb: 'FEIE-calculator' },
    'fbar-checker': { title: 'Controle van de FBAR-plicht', description: 'Beantwoord vier vragen om te controleren of u een FBAR (FinCEN-formulier 114) voor buitenlandse financiële rekeningen moet indienen.', breadcrumb: 'FBAR-controle' },
    'catch-up-program': { title: 'Welk IRS-inhaalprogramma kan passen?', description: 'Bekijk educatieve informatie over gebruikelijke routes om aangiften bij te werken. Deze tool bepaalt geen geschiktheid of opzet en vervangt geen professioneel advies.', breadcrumb: 'Inhaalprogramma zoeken' },
    'expat-tax-deadline-calendar': { title: 'Belastingkalender voor expats 2026', description: 'Bekijk belangrijke belastingdata voor Amerikanen in het buitenland in 2026, waaronder FBAR, aangiften, uitstel en voorschotten.', breadcrumb: 'Belastingkalender' },
    'tax-savings-estimator': { title: 'Schatting: FEIE of buitenlandse belastingkorting', description: 'Vergelijk de uitsluiting van buitenlands arbeidsinkomen met de buitenlandse belastingkorting in een eerste schatting.', breadcrumb: 'FEIE- en FTC-schatting' },
  },
  ja: {
    'feie-calculator': { title: '海外居住者向けFEIE計算機', description: '外国所得勤労控除（フォーム2555）による節税額を試算します。2025年の控除上限は130,000ドルです。', breadcrumb: 'FEIE計算機' },
    'fbar-checker': { title: 'FBAR提出義務の確認', description: '4つの質問に答えて、海外金融口座についてFBAR（FinCENフォーム114）が必要かを確認します。', breadcrumb: 'FBAR確認' },
    'catch-up-program': { title: 'IRSの未申告対応ルートを確認', description: '申告を取り戻す一般的な方法を教育目的で確認します。このツールは適格性や故意性を判断せず、専門家の助言に代わるものではありません。', breadcrumb: '未申告対応ルート' },
    'expat-tax-deadline-calendar': { title: '海外居住者向け2026年税務期限カレンダー', description: 'FBAR、申告、延長、予定納税など、2026年に海外在住アメリカ人が確認すべき日付を整理します。', breadcrumb: '税務期限カレンダー' },
    'tax-savings-estimator': { title: 'FEIEと外国税額控除の比較試算', description: '外国所得勤労控除と外国税額控除を比較し、予備的な節税額を試算します。', breadcrumb: 'FEIE・FTC試算' },
  },
  zh: {
    'feie-calculator': { title: '海外美国人FEIE节税计算器', description: '估算使用外国劳动收入排除（表格2555）可能节省的税款。2025年排除上限为130,000美元。', breadcrumb: 'FEIE计算器' },
    'fbar-checker': { title: 'FBAR申报义务检查', description: '回答四个问题，初步判断海外金融账户是否可能需要提交FBAR（FinCEN表格114）。', breadcrumb: 'FBAR检查' },
    'catch-up-program': { title: '查看IRS补申报路径', description: '了解常见补申报路径的教育信息。本工具不判断资格或主观故意，也不能替代专业人士建议。', breadcrumb: '补申报路径' },
    'expat-tax-deadline-calendar': { title: '海外美国人2026年税务期限日历', description: '整理2026年海外美国人需要关注的税务日期，包括FBAR、报税、延期和预缴税。', breadcrumb: '税务期限日历' },
    'tax-savings-estimator': { title: 'FEIE与外国税收抵免估算器', description: '比较外国劳动收入排除和外国税收抵免，获得初步的节税估算。', breadcrumb: 'FEIE与FTC估算' },
  },
};

export function getLocalizedToolCopy(locale: Locale, slug: LocalizedToolSlug): ToolCopy {
  return localizedToolCopy[locale][slug];
}
