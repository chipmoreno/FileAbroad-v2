'use client';

import { useState } from 'react';
import Link from 'next/link';
import { trackConversionEvent } from '@/components/analytics/ConversionTracking';
import { Card, CardContent } from '@/components/ui/card';
import {
  AlertTriangle,
  ArrowRight,
  ShieldCheck,
  FileWarning,
  Scale,
  Building2,
  Globe,
  RefreshCw,
} from '@/components/icons';

type Answer = 'yes' | 'no';

type Program =
  | 'sfop'
  | 'sdop'
  | 'dfsp'
  | 'diirsp'
  | 'willful'
  | 'audit'
  | 'nothing-missed';

interface QuestionConfig {
  id: string;
  text: string;
  helpText?: string;
  yes: { next?: string; result?: Program };
  no: { next?: string; result?: Program };
}

const questions: Record<string, QuestionConfig> = {
  q1: {
    id: 'q1',
    text: 'Are you currently under IRS audit or criminal investigation?',
    helpText:
      'This includes receiving a formal audit notice (e.g., CP2000, Letter 525, Letter 915) or being contacted by IRS Criminal Investigation.',
    yes: { result: 'audit' },
    no: { next: 'q2' },
  },
  q2: {
    id: 'q2',
    text: 'Did you file US tax returns (Form 1040) for each of the years in question?',
    helpText:
      'If you filed returns but left off foreign income, report the missing FBAR, or skipped certain information forms, answer "Yes." If you never filed at all, answer "No."',
    yes: { next: 'q3' },
    no: { next: 'q6' },
  },
  q3: {
    id: 'q3',
    text: 'Did you report all your worldwide income on those returns? (Wages, self-employment, interest, dividends, capital gains — everything, everywhere.)',
    helpText:
      'US citizens are taxed on worldwide income. If you omitted foreign wages, rental income, dividends, or any other foreign-sourced income, answer "No."',
    yes: { next: 'q4' },
    no: { next: 'q6' },
  },
  q4: {
    id: 'q4',
    text: 'Is the only thing missing your FBAR (FinCEN Form 114)?',
    helpText:
      'FBAR is the report of foreign bank accounts filed separately from your tax return. If you also missed Form 5471, Form 3520, Form 8938, or similar information returns, answer "No."',
    yes: { result: 'dfsp' },
    no: { next: 'q5' },
  },
  q5: {
    id: 'q5',
    text: 'Is the missing item only a foreign information return (Form 5471, 3520, 3520-A, 8938, 8865) — with NO unreported income and NO additional tax owed?',
    helpText:
      'Missing international information returns can require amended filings, reasonable-cause analysis, and a form-specific review. This tool does not select that procedure.',
    yes: { result: 'diirsp' },
    no: { next: 'q6' },
  },
  q6: {
    id: 'q6',
    text: 'After appropriate professional or legal advice, are you confident the relevant conduct can be certified as non-willful?',
    helpText:
      'This tool cannot decide intent or willfulness. If you are unsure, answer “No” and speak with an experienced tax attorney before filing any certification.',
    yes: { next: 'q7' },
    no: { result: 'willful' },
  },
  q7: {
    id: 'q7',
    text: 'Have you lived outside the US for at least 330 full days in one of the three most recent years?',
    helpText:
      'This is the Streamlined Foreign "non-residency" requirement. Most Americans living abroad year-round qualify. If you split time between countries but spent less than 330 days abroad in every recent year, answer "No."',
    yes: { result: 'sfop' },
    no: { result: 'sdop' },
  },
};

interface ProgramInfo {
  id: Program;
  name: string;
  shortName: string;
  icon: typeof ShieldCheck;
  tone: 'good' | 'caution' | 'warning';
  summary: string;
  details: string[];
  nextStep: {
    label: string;
    href: string;
  };
}

const programs: Record<Program, ProgramInfo> = {
  sfop: {
    id: 'sfop',
    shortName: 'SFOP',
    name: 'Streamlined Foreign Offshore Procedures',
    icon: Globe,
    tone: 'good',
    summary:
      'This is a potential catch-up path for qualifying taxpayers abroad. If all current program requirements are met, the Streamlined Foreign procedures provide specified penalty relief while tax and interest remain due.',
    details: [
      'File the most recent 3 years of tax returns (amended or original).',
      'File the most recent 6 years of FBARs.',
      'Submit Form 14653 certifying your non-compliance was non-willful.',
      'Pay any taxes owed plus interest.',
      'The IRS describes specified penalty treatment for a complete, eligible submission; tax and interest may remain due.',
      'You must have lived outside the US for 330+ days in at least one of the last 3 tax years.',
    ],
    nextStep: {
      label: 'Book a paid consultation',
      href: '/payment/retainer/consultation30',
    },
  },
  sdop: {
    id: 'sdop',
    shortName: 'SDOP',
    name: 'Streamlined Domestic Offshore Procedures',
    icon: Building2,
    tone: 'caution',
    summary:
      'The domestic version of Streamlined has different eligibility rules and generally includes a 5% miscellaneous offshore penalty calculation. Confirm the current instructions and complete facts with an appropriate professional.',
    details: [
      'File 3 amended returns (you must have already filed originals).',
      'File 6 years of FBARs.',
      'Submit Form 14654 certifying non-willfulness.',
      'Pay taxes owed, interest, and a 5% miscellaneous offshore penalty (based on year-end balance of the highest year).',
      'The IRS describes specified treatment for a complete, eligible submission; this tool cannot confirm that treatment.',
      'The foreign non-residency test is more specific than simply living abroad; verify the current instructions.',
    ],
    nextStep: {
      label: 'Book a paid consultation',
      href: '/payment/retainer/consultation30',
    },
  },
  dfsp: {
    id: 'dfsp',
    shortName: 'Late FBAR review',
    name: 'Late FBAR Facts and Procedure Review',
    icon: ShieldCheck,
    tone: 'good',
    summary:
      'If the only missing item appears to be an FBAR, the next step is a current-guidance review of the filing history, reported income, IRS contact, account facts, and any intent or reasonable-cause issues.',
    details: [
      'Confirm that all related income was reported on filed returns.',
      'Check the current IRS and FinCEN late-filing instructions before submitting anything.',
      'A reasonable-cause position is fact-specific and is not guaranteed to prevent a penalty.',
      'IRS contact, omitted income, or uncertain intent changes the professional path.',
      'Seek attorney advice before filing when willfulness or legal exposure is uncertain.',
    ],
    nextStep: {
      label: 'Start your FBAR catch-up intake',
      href: '/intake',
    },
  },
  diirsp: {
    id: 'diirsp',
    shortName: 'Form-specific review',
    name: 'Missing International Information Return Review',
    icon: FileWarning,
    tone: 'caution',
    summary:
      'Missing Forms 5471, 3520, 3520-A, 8938, 8865, or similar filings require a form-specific corrective-filing and reasonable-cause review. This decision tree cannot select or validate the procedure.',
    details: [
      'Identify every missing form, year, related entity or transfer, and filing deadline.',
      'Confirm whether income, tax, or other returns were also omitted.',
      'Penalty and reasonable-cause rules differ by form and facts.',
      'Do not assume a reasonable-cause statement will be accepted.',
      'Use a credentialed preparer, representative, or attorney appropriate to the issue.',
    ],
    nextStep: {
      label: 'Request a reviewer or referral',
      href: '/intake?service=referral',
    },
  },
  willful: {
    id: 'willful',
    shortName: 'Voluntary Disclosure',
    name: 'IRS Criminal Investigation Voluntary Disclosure Practice',
    icon: Scale,
    tone: 'warning',
    summary:
      'This tool cannot assess intent or willfulness. Stop here and obtain advice from an experienced tax attorney before choosing any corrective filing path.',
    details: [
      'Do not sign a Streamlined non-willfulness certification based on an online tool.',
      'Voluntary-disclosure eligibility, legal exposure, and possible penalties depend on facts this tool cannot evaluate.',
      'An attorney can advise on privilege and the appropriate corrective path before information is submitted.',
      'FileAbroad does not handle VDP submissions. This is attorney-first work.',
      'FileAbroad does not provide a willfulness opinion or legal representation.',
    ],
    nextStep: {
      label: 'Seek attorney representation',
      href: 'https://irs.treasury.gov/rpo/rpo.jsf',
    },
  },
  audit: {
    id: 'audit',
    shortName: 'Ongoing Audit',
    name: 'You Cannot Use Self-Cure Programs',
    icon: AlertTriangle,
    tone: 'warning',
    summary:
      'Once an IRS audit or criminal investigation has started for the relevant years, the Streamlined and delinquent-filing programs are off the table. You need an attorney or enrolled representative working on the audit itself.',
    details: [
      'Streamlined Filing is explicitly unavailable to taxpayers under IRS examination.',
      'Do NOT file Streamlined certifications while under audit — this can be treated as obstruction.',
      'Engage qualified representation (CPA, EA, or tax attorney) for the audit.',
      'Once the audit closes, the Streamlined programs may become available again depending on the outcome.',
    ],
    nextStep: {
      label: 'Find qualified representation',
      href: 'https://irs.treasury.gov/rpo/rpo.jsf',
    },
  },
  'nothing-missed': {
    id: 'nothing-missed',
    shortName: 'Nothing to catch up on',
    name: "You're probably current",
    icon: ShieldCheck,
    tone: 'good',
    summary:
      "Based on your answers, there's nothing to catch up on. If your situation is more complicated than this tool can capture, message me and we'll talk through it.",
    details: [
      "You've filed your returns, reported worldwide income, and don't have missing FBARs or information returns.",
      'Keep filing each year and monitor FBAR thresholds ($10,000 aggregate across all foreign accounts).',
    ],
    nextStep: {
      label: 'Questions? Start an intake',
      href: '/intake',
    },
  },
};

const toneStyles: Record<ProgramInfo['tone'], { bg: string; border: string; icon: string }> = {
  good: { bg: 'bg-green-50', border: 'border-green-200', icon: 'text-green-700' },
  caution: { bg: 'bg-amber-50', border: 'border-amber-200', icon: 'text-amber-700' },
  warning: { bg: 'bg-red-50', border: 'border-red-200', icon: 'text-red-700' },
};

export default function CatchUpProgramFinder() {
  const [currentId, setCurrentId] = useState<string>('q1');
  const [result, setResult] = useState<Program | null>(null);
  const [history, setHistory] = useState<Array<{ questionId: string; answer: Answer }>>([]);

  const current = questions[currentId];

  const handleAnswer = (answer: Answer) => {
    if (history.length === 0) {
      trackConversionEvent('tool_start', { tool: 'catch_up_program_finder' });
    }
    const branch = current[answer];
    const newHistory = [...history, { questionId: current.id, answer }];
    setHistory(newHistory);

    if (branch.result) {
      trackConversionEvent('tool_complete', {
        tool: 'catch_up_program_finder',
        result: branch.result,
      });
      setResult(branch.result);
    } else if (branch.next) {
      setCurrentId(branch.next);
    }
  };

  const reset = () => {
    setCurrentId('q1');
    setResult(null);
    setHistory([]);
  };

  const back = () => {
    if (history.length === 0) return;
    const newHistory = history.slice(0, -1);
    const prev = history[history.length - 1];
    setHistory(newHistory);
    setResult(null);
    setCurrentId(prev.questionId);
  };

  if (result) {
    const program = programs[result];
    const Icon = program.icon;
    const tone = toneStyles[program.tone];

    return (
      <div className="space-y-6" role="region" aria-live="polite" aria-label="Catch-up program educational result">
        <Card className={`border-2 ${tone.border} ${tone.bg}`}>
          <CardContent className="p-6 md:p-8">
            <div className="flex items-start gap-4 mb-4">
              <div className={`${tone.icon} flex-shrink-0`}>
                <Icon className="w-10 h-10" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                  Educational Result
                </p>
                <h2 className="text-2xl md:text-3xl font-bold font-sans text-foreground">
                  {program.name}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Commonly abbreviated: {program.shortName}
                </p>
              </div>
            </div>

            <p className="text-base md:text-lg text-foreground mb-6 leading-relaxed">
              {program.summary}
            </p>

            <h3 className="font-semibold text-foreground mb-3">Key details:</h3>
            <ul className="space-y-2 mb-6">
              {program.details.map((d, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground/80">
                  <span className="text-secondary mt-1">&#10003;</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href={program.nextStep.href}
                className="inline-flex items-center justify-center gap-2 bg-secondary text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:shadow-lg hover:bg-secondary/90 transition-all"
              >
                {program.nextStep.label}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center justify-center gap-2 bg-background border border-border text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-muted transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Start over
              </button>
            </div>
          </CardContent>
        </Card>

        <div className="bg-muted/50 border border-border rounded-lg p-5 text-sm text-muted-foreground">
          <p className="mb-2">
            <strong className="text-foreground">How this tool works:</strong> This educational result maps your answers to commonly used IRS procedures. It is not a determination of eligibility, willfulness, reasonable cause, or the right filing path. Facts this tool cannot evaluate may change the answer.
          </p>
          <p>
            <strong className="text-foreground">What to do next:</strong> For Streamlined preparation, begin with a <Link href="/payment/retainer/consultation30" className="text-secondary underline hover:text-secondary/80">paid consultation</Link>. If the result involves willfulness, an examination, voluntary disclosure, or a high-risk international form, seek an EA, CPA, or tax attorney with the appropriate experience before filing.
          </p>
        </div>
      </div>
    );
  }

  const totalQuestions = Object.keys(questions).length;
  const currentIndex = history.length + 1;

  return (
    <div className="space-y-6">
      <Card className="border-border">
        <CardContent className="p-6 md:p-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-sm font-medium text-muted-foreground">
              Question {currentIndex} of up to {totalQuestions}
            </span>
            <div
              className="flex-1 bg-border rounded-full h-2"
              role="progressbar"
              aria-label="Catch-up program questions"
              aria-valuemin={1}
              aria-valuemax={totalQuestions}
              aria-valuenow={currentIndex}
            >
              <div
                className="bg-secondary rounded-full h-2 transition-all"
                style={{ width: `${(currentIndex / totalQuestions) * 100}%` }}
              />
            </div>
          </div>

          <h2 id="catch-up-question" className="text-xl md:text-2xl font-sans font-semibold text-foreground mb-3 leading-snug">
            {current.text}
          </h2>

          {current.helpText && (
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              {current.helpText}
            </p>
          )}

          <div className="grid grid-cols-2 gap-3" role="group" aria-labelledby="catch-up-question">
            <button
              type="button"
              onClick={() => handleAnswer('yes')}
              className="bg-secondary text-white px-6 py-4 rounded-lg font-semibold hover:bg-secondary/90 transition-colors"
            >
              Yes
            </button>
            <button
              type="button"
              onClick={() => handleAnswer('no')}
              className="bg-background border border-border text-foreground px-6 py-4 rounded-lg font-semibold hover:bg-muted transition-colors"
            >
              No
            </button>
          </div>

          {history.length > 0 && (
            <button
              type="button"
              onClick={back}
              className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              &larr; Back to previous question
            </button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
