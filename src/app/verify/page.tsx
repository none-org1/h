'use client';

// ============================================================
// PF Claim Decoder — Screen 3: 4-Tier Verification Matrix
// ============================================================

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useClaim } from '@/context/ClaimContext';
import { getTranslation } from '@/lib/i18n';
import { StatusBadge } from '@/components/StatusBadge';
import { SafetyNotice } from '@/components/SafetyNotice';

export default function VerifyPage() {
  const { language, decodedResult, setActiveStep } = useClaim();
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

  const { verificationMatrix, input } = decodedResult;

  const handleNext = () => {
    setActiveStep(4);
    router.push('/action');
  };

  return (
    <div className="flex-1 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Step Indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            <span>{language === 'hi' ? 'चरण 3 / 6' : 'Step 3 of 6'}</span>
            <span>•</span>
            <span>{t.step3}</span>
          </div>
          <Link
            href="/decode"
            onClick={() => setActiveStep(2)}
            className="text-xs text-slate-500 hover:text-blue-600 underline font-medium"
          >
            ← {language === 'hi' ? 'डिकोड पर वापस जाएं' : 'Back to Decode'}
          </Link>
        </div>

        {/* Title */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-50">
            {t.verifyTitle}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {t.verifySubtitle}
          </p>
        </div>

        {/* Crucial Guardrail Banner */}
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
          <svg className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="space-y-1">
            <p className="font-bold uppercase tracking-wider text-[11px] text-amber-800 dark:text-amber-300">
              {language === 'hi' ? 'साक्ष्यगत नियम: "उल्लेखित नहीं" ≠ "सत्यापित"' : 'Evidentiary Rule: "Not Mentioned" ≠ "Verified"'}
            </p>
            <p className="leading-relaxed">
              {language === 'hi'
                ? 'यदि किसी रिमार्क में आधार या बैंक का उल्लेख नहीं है, तो प्रोटोटाइप यह नहीं मान सकता कि वे सही हैं। यह उन्हें स्पष्ट रूप से "असत्यापित" या "अज्ञात" के रूप में चिह्नित करता है।'
                : 'Just because a remark does not mention an Aadhaar or Bank issue does not mean those records are verified. The matrix rigorously labels such conditions as "Not Verified" or "Unknown".'}
            </p>
          </div>
        </div>

        {/* Verification Matrix Table */}
        <div className="rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-zinc-950 border-b border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider text-[11px]">
                <tr>
                  <th scope="col" className="py-3.5 px-4 sm:px-6">
                    {t.matrixColCondition}
                  </th>
                  <th scope="col" className="py-3.5 px-4 sm:px-6">
                    {t.matrixColStatus}
                  </th>
                  <th scope="col" className="py-3.5 px-4 sm:px-6">
                    {t.matrixColMeaning}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/80">
                {verificationMatrix.map((item, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-slate-50/60 dark:hover:bg-zinc-800/40 transition-colors"
                  >
                    <td className="py-4 px-4 sm:px-6 font-semibold text-slate-900 dark:text-slate-100 align-top">
                      {language === 'hi' ? item.conditionHi : item.condition}
                    </td>
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap align-top">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed align-top">
                      {language === 'hi' ? item.meaningHi : item.meaning}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Legend / Status Definitions */}
        <div className="rounded-2xl p-6 bg-slate-50 dark:bg-zinc-900/50 border border-slate-200 dark:border-zinc-800 space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            {t.legendTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="font-bold text-emerald-700 dark:text-emerald-400">
                  {t.statusVerifiedFromInput}
                </span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 pl-4.5 leading-relaxed">
                {t.statusVerifiedFromInputDesc}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span className="font-bold text-rose-700 dark:text-rose-400">
                  {t.statusPossibleIssue}
                </span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 pl-4.5 leading-relaxed">
                {t.statusPossibleIssueDesc}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="font-bold text-amber-700 dark:text-amber-400">
                  {t.statusNotVerified}
                </span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 pl-4.5 leading-relaxed">
                {t.statusNotVerifiedDesc}
              </p>
            </div>

            <div className="p-3 rounded-lg bg-white dark:bg-zinc-900 border border-slate-200/80 dark:border-zinc-800 space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-400" />
                <span className="font-bold text-zinc-700 dark:text-zinc-300">
                  {t.statusUnknown}
                </span>
              </div>
              <p className="text-slate-500 dark:text-slate-400 pl-4.5 leading-relaxed">
                {t.statusUnknownDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4">
          <Link
            href="/decode"
            onClick={() => setActiveStep(2)}
            className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-700 dark:text-slate-200 text-sm font-semibold hover:bg-slate-50 transition-colors"
          >
            ← {t.backBtn}
          </Link>

          <button
            type="button"
            onClick={handleNext}
            className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
          >
            <span>{t.nextBtn} ({t.step4})</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
