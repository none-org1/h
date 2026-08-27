'use client';

// ============================================================
// PF Claim Decoder — Screen 2: Diagnostic Assessment (Decode)
// ============================================================

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useClaim } from '@/context/ClaimContext';
import { getTranslation } from '@/lib/i18n';
import { getTaxonomyEntry } from '@/lib/taxonomy';
import { ConfidenceBadge } from '@/components/ConfidenceBadge';
import { SafetyNotice } from '@/components/SafetyNotice';

export default function DecodePage() {
  const {
    language,
    decodedResult,
    setActiveStep,
    isAiLoading,
    enhanceWithAi,
    aiError,
  } = useClaim();
  const t = getTranslation(language);
  const router = useRouter();

  if (!decodedResult) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-4 bg-gray-50 dark:bg-gray-950">
        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
          {language === 'hi' ? 'कोई दावा डेटा लोड नहीं हुआ है।' : 'No claim data has been decoded yet.'}
        </p>
        <Link
          href="/input"
          className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold text-sm shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-200"
        >
          {language === 'hi' ? 'इनपुट पर जाएं' : 'Go to Input'}
        </Link>
      </div>
    );
  }

  const { match, input, explanation, aiEnhanced } = decodedResult;
  const entry = getTaxonomyEntry(match.categoryId);

  const handleNext = () => {
    setActiveStep(3);
    router.push('/verify');
  };

  return (
    <div className="flex-1 py-8 p-4 sm:p-6 animate-fade-in bg-gray-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        {/* Step Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            <span>{language === 'hi' ? 'चरण 2 / 6' : 'Step 2 of 6'}</span>
            <span>•</span>
            <span>{t.step2}</span>
          </div>
          <Link
            href="/input"
            onClick={() => setActiveStep(1)}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
          >
            ← {language === 'hi' ? 'इनपुट संपादित करें' : 'Edit Input'}
          </Link>
        </div>

        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-50">
            {t.decodeTitle}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">
            Tracking ID: {input.claimReference} | Claimant: {input.claimantName}
          </p>
        </div>

        {/* Raw Remark Display */}
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col gap-2">
          <span className="text-xs uppercase font-bold tracking-wider text-gray-500 dark:text-gray-400">
            {language === 'hi' ? 'दर्ज किया गया रिमार्क पाठ' : 'Supplied Synthetic Remark'}
          </span>
          <p className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 italic">
            &ldquo;{input.remark}&rdquo;
          </p>
        </div>

        {/* Diagnosis Card */}
        <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-4 sm:p-8 flex flex-col gap-6 shadow-sm animate-scale-up">
          {/* Matched Category & Confidence Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100 dark:border-gray-800">
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase font-bold tracking-wider text-indigo-600 dark:text-indigo-400">
                {t.matchedCategory}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-gray-50">
                {entry ? (language === 'hi' ? entry.labelHi : entry.label) : match.categoryId}
              </h2>
              <span className="inline-block text-xs font-mono text-gray-500 dark:text-gray-400">
                Taxonomy ID: <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{match.categoryId}</code>
              </span>
            </div>

            <div className="flex flex-col sm:items-end gap-2">
              <ConfidenceBadge confidence={match.confidence} />
              {match.matchedSignals.length > 0 && (
                <div className="flex flex-wrap gap-2 max-w-xs justify-start sm:justify-end">
                  {match.matchedSignals.map((signal, i) => (
                    <span
                      key={i}
                      className="text-[10px] sm:text-xs font-mono bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full border border-gray-200 dark:border-gray-700"
                    >
                      {signal}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* AI Explanation or Deterministic Explanation */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <span>{t.whatRemarkSuggests}</span>
                {aiEnhanced && (
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 px-2 py-1 rounded-full">
                    AI Enhanced
                  </span>
                )}
              </h3>

              {/* Trigger OpenAI Explanation */}
              {!aiEnhanced && (
                <button
                  type="button"
                  onClick={enhanceWithAi}
                  disabled={isAiLoading}
                  className="w-full sm:w-auto px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 transition-all duration-200 flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  {isAiLoading ? (
                    <>
                      <span className="w-4 h-4 rounded-full border-2 border-indigo-600 dark:border-indigo-400 border-t-transparent animate-spin" />
                      <span>{t.aiEnhancing}</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>{t.aiEnhanceBtn}</span>
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="p-4 sm:p-6 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed flex flex-col gap-2">
              <p>
                {aiEnhanced && explanation
                  ? explanation.summary
                  : entry
                  ? (language === 'hi' ? entry.explanationTemplateHi : entry.explanationTemplate)
                  : 'No specific explanation template found for this input.'}
              </p>
            </div>

            {aiError && (
              <p className="text-sm text-amber-600 dark:text-amber-400">
                ℹ️ {aiError}
              </p>
            )}
          </div>

          {/* What the prototype cannot verify */}
          <div className="flex flex-col gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
              {t.whatNotVerified}
            </h3>
            <ul className="flex flex-col gap-2">
              {(aiEnhanced && explanation ? explanation.notVerified : entry?.notVerifiedConditions || []).map(
                (item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <span className="text-rose-500 font-bold shrink-0 mt-0.5">✕</span>
                    <span>{item}</span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Caution Alert */}
          <div className="p-4 sm:p-6 rounded-2xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-900 text-sm text-rose-900 dark:text-rose-200 flex flex-col gap-2">
            <p className="font-bold flex items-center gap-2 text-rose-800 dark:text-rose-300">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <span>{t.cautionTitle}</span>
            </p>
            <p className="leading-relaxed">
              {aiEnhanced && explanation?.caution
                ? explanation.caution
                : language === 'hi'
                ? 'यह प्रोटोटाइप आधिकारिक EPFO सत्यापन या अस्वीकृति स्थापित नहीं करता है। आधिकारिक स्थिति केवल EPFiGMS या क्षेत्रीय कार्यालय के माध्यम से निर्धारित की जा सकती है।'
                : 'This prototype does not establish official EPFO claim rejection or approval. Official status can only be confirmed via the official EPFiGMS grievance portal or your Regional PF Office.'}
            </p>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800 gap-4">
          <Link
            href="/input"
            onClick={() => setActiveStep(1)}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 text-center focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            ← {t.backBtn}
          </Link>

          <button
            type="button"
            onClick={handleNext}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-200 flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <span>{t.nextBtn} ({t.step3})</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
