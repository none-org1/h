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
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4">
        <p className="text-sm text-slate-500">
          {language === 'hi' ? 'कोई दावा डेटा लोड नहीं हुआ है।' : 'No claim data has been decoded yet.'}
        </p>
        <Link
          href="/input"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm"
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
    <div className="flex-1 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Step Indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            <span>{language === 'hi' ? 'चरण 2 / 6' : 'Step 2 of 6'}</span>
            <span>•</span>
            <span>{t.step2}</span>
          </div>
          <Link
            href="/input"
            onClick={() => setActiveStep(1)}
            className="text-xs text-slate-500 hover:text-blue-600 underline font-medium"
          >
            ← {language === 'hi' ? 'इनपुट संपादित करें' : 'Edit Input'}
          </Link>
        </div>

        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-50">
            {t.decodeTitle}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 font-mono">
            Tracking ID: {input.claimReference} | Claimant: {input.claimantName}
          </p>
        </div>

        {/* Raw Remark Display */}
        <div className="p-4 rounded-xl bg-slate-100 dark:bg-zinc-900/80 border border-slate-200 dark:border-zinc-800 space-y-1">
          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500">
            {language === 'hi' ? 'दर्ज किया गया रिमार्क पाठ' : 'Supplied Synthetic Remark'}
          </span>
          <p className="text-sm font-medium text-slate-800 dark:text-slate-200 italic">
            &ldquo;{input.remark}&rdquo;
          </p>
        </div>

        {/* Diagnosis Card */}
        <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-6 sm:p-8 space-y-6 shadow-xs">
          {/* Matched Category & Confidence Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-zinc-800">
            <div className="space-y-1">
              <span className="text-xs uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400">
                {t.matchedCategory}
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-slate-50">
                {entry ? (language === 'hi' ? entry.labelHi : entry.label) : match.categoryId}
              </h2>
              <span className="inline-block text-xs font-mono text-slate-400">
                Taxonomy ID: <code className="bg-slate-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">{match.categoryId}</code>
              </span>
            </div>

            <div className="flex flex-col sm:items-end gap-1.5">
              <ConfidenceBadge confidence={match.confidence} />
              {match.matchedSignals.length > 0 && (
                <div className="flex flex-wrap gap-1 max-w-xs justify-start sm:justify-end">
                  {match.matchedSignals.map((signal, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-mono bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded"
                    >
                      {signal}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* AI Explanation or Deterministic Explanation */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <span>{t.whatRemarkSuggests}</span>
                {aiEnhanced && (
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 px-2 py-0.5 rounded">
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
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800 hover:bg-purple-100 transition-colors flex items-center gap-1.5"
                >
                  {isAiLoading ? (
                    <>
                      <span className="w-3 h-3 rounded-full border-2 border-purple-600 border-t-transparent animate-spin" />
                      <span>{t.aiEnhancing}</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span>{t.aiEnhanceBtn}</span>
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200/80 dark:border-zinc-800 text-sm text-slate-700 dark:text-slate-300 leading-relaxed space-y-2">
              <p>
                {aiEnhanced && explanation
                  ? explanation.summary
                  : entry
                  ? (language === 'hi' ? entry.explanationTemplateHi : entry.explanationTemplate)
                  : 'No specific explanation template found for this input.'}
              </p>
            </div>

            {aiError && (
              <p className="text-xs text-amber-600 dark:text-amber-400">
                ℹ️ {aiError}
              </p>
            )}
          </div>

          {/* What the prototype cannot verify */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              {t.whatNotVerified}
            </h3>
            <ul className="space-y-2">
              {(aiEnhanced && explanation ? explanation.notVerified : entry?.notVerifiedConditions || []).map(
                (item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400"
                  >
                    <span className="text-rose-500 font-bold shrink-0 mt-0.5">✕</span>
                    <span>{item}</span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Caution Alert */}
          <div className="p-4 rounded-xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 text-xs text-rose-900 dark:text-rose-200 space-y-1">
            <p className="font-bold flex items-center gap-1.5 text-rose-800 dark:text-rose-300">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        <div className="flex items-center justify-between pt-4">
          <Link
            href="/input"
            onClick={() => setActiveStep(1)}
            className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-700 dark:text-slate-200 text-sm font-semibold hover:bg-slate-50 transition-colors"
          >
            ← {t.backBtn}
          </Link>

          <button
            type="button"
            onClick={handleNext}
            className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
          >
            <span>{t.nextBtn} ({t.step3})</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
