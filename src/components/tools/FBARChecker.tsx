'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, XCircle, AlertTriangle, ArrowRight } from '@/components/icons';
import { trackConversionEvent } from '@/components/analytics/ConversionTracking';

interface Question {
  id: string;
  text: string;
  helpText: string;
}

const questions: Question[] = [
  {
    id: 'us-person',
    text: 'Are you a US citizen, green card holder, or US tax resident?',
    helpText: 'This includes dual citizens and permanent residents living abroad.',
  },
  {
    id: 'foreign-accounts',
    text: 'Do you have any financial accounts outside the United States?',
    helpText: 'This includes bank accounts, brokerage accounts, mutual funds, and certain retirement accounts.',
  },
  {
    id: 'threshold',
    text: 'Did the total value of ALL your foreign accounts exceed $10,000 at any point during the year?',
    helpText: 'Add up the maximum balances of ALL accounts combined. Convert foreign currency at the year-end exchange rate.',
  },
  {
    id: 'signature',
    text: 'Do you have signature authority or financial interest in these accounts?',
    helpText: 'Signature authority means you can control the disposition of assets in the account by direct communication to the bank.',
  },
];

type Answer = 'yes' | 'no' | null;

export default function FBARChecker() {
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [complete, setComplete] = useState(false);

  const handleAnswer = (answer: Answer) => {
    if (currentStep === 0) {
      trackConversionEvent('tool_start', { tool: 'fbar_checker' });
    }
    const question = questions[currentStep];
    const newAnswers = { ...answers, [question.id]: answer };
    setAnswers(newAnswers);

    // Early exit if any answer is "no"
    if (answer === 'no') {
      trackConversionEvent('tool_complete', { tool: 'fbar_checker' });
      setComplete(true);
      return;
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      trackConversionEvent('tool_complete', { tool: 'fbar_checker' });
      setComplete(true);
    }
  };

  const mustFile = Object.values(answers).every((a) => a === 'yes') && Object.keys(answers).length === questions.length;

  const reset = () => {
    setAnswers({});
    setCurrentStep(0);
    setComplete(false);
  };

  return (
    <div className="space-y-6">
      {!complete ? (
        <Card className="border-border">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-sm font-medium text-muted-foreground">
                Question {currentStep + 1} of {questions.length}
              </span>
              <div
                className="flex-1 bg-border rounded-full h-2"
                role="progressbar"
                aria-label="FBAR checker questions"
                aria-valuemin={1}
                aria-valuemax={questions.length}
                aria-valuenow={currentStep + 1}
              >
                <div
                  className="bg-secondary rounded-full h-2 transition-all"
                  style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                />
              </div>
            </div>

            <h2 id="fbar-question" className="text-xl font-bold text-foreground mb-2">
              {questions[currentStep].text}
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              {questions[currentStep].helpText}
            </p>

            <div className="flex gap-4" role="group" aria-labelledby="fbar-question">
              <button
                type="button"
                onClick={() => handleAnswer('yes')}
                className="flex-1 bg-secondary hover:bg-secondary/90 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                Yes <ArrowRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleAnswer('no')}
                className="flex-1 bg-muted hover:bg-muted/80 text-foreground font-semibold py-3 rounded-lg transition-colors"
              >
                No
              </button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card
          className={`border-2 ${mustFile ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}
          role="region"
          aria-live="polite"
          aria-label="FBAR checker result"
        >
          <CardContent className="p-6 text-center">
            {mustFile ? (
              <>
                <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-red-800 mb-2">
                  You Likely Need to File an FBAR
                </h2>
                <p className="text-red-700 mb-4">
                  Based on your answers, you are required to file FinCEN Form 114 (FBAR)
                  to report your foreign financial accounts. The deadline is April 15, with
                  an automatic extension to October 15.
                </p>
                <div className="bg-white/70 rounded-lg p-4 mb-4 text-left">
                  <p className="text-sm font-medium text-red-800 mb-2">Key reminders:</p>
                  <ul className="space-y-1.5 text-sm text-red-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      FBAR is filed electronically through FinCEN BSA E-Filing
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      Penalties for non-filing can reach $10,000+ per violation
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      Report ALL foreign accounts, even those with small balances
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <XCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-green-800 mb-2">
                  FBAR Filing Likely Not Required
                </h2>
                <p className="text-green-700 mb-4">
                  Based on your answers, you likely do not need to file an FBAR this year.
                  However, you should reassess if your circumstances change.
                </p>
              </>
            )}

            <button
              type="button"
              onClick={reset}
              className="bg-muted hover:bg-muted/80 text-foreground font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
            >
              Start Over
            </button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
