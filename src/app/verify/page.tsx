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

  const { verificationMatrix, input } = decodedResult;

  const handleNext = () => {
    setActiveStep(4);
    router.push('/action');
  };

  return (
    <div className="flex-1 py-8 p-4 sm:p-6 animate-fade-in bg-gray-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        {/* Step Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            <span>{language === 'hi' ? 'चरण 3 / 6' : 'Step 3 of 6'}</span>
            <span>•</span>
            <span>{t.step3}</span>
          </div>
          <Link
            href="/decode"
            onClick={() => setActiveStep(2)}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
          >
            ← {language === 'hi' ? 'डिकोड पर वापस जाएं' : 'Back to Decode'}
          </Link>
        </div>

        {/* Title */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-50">
            {t.verifyTitle}
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
            {t.verifySubtitle}
          </p>
        </div>

        {/* Crucial Guardrail Banner */}
        <div className="p-4 sm:p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-sm text-amber-900 dark:text-amber-200 flex flex-col sm:flex-row items-start gap-4">
          <svg className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex flex-col gap-2">
            <p className="font-bold uppercase tracking-wider text-xs sm:text-sm text-amber-800 dark:text-amber-300">
              {language === 'hi' ? 'साक्ष्यगत नियम: "उल्लेखित नहीं" ≠ "सत्यापित"' : 'Evidentiary Rule: "Not Mentioned" ≠ "Verified"'}
            </p>
            <p className="leading-relaxed">
              {language === 'hi'
                ? 'यदि किसी रिमार्क में आधार या बैंक का उल्लेख नहीं है, तो प्रोटोटाइप यह नहीं मान सकता कि वे सही हैं। यह उन्हें स्पष्ट रूप से "असत्यापित" या "अज्ञात" के रूप में चिह्नित करता है।'
                : 'Just because a remark does not mention an Aadhaar or Bank issue does not mean those records are verified. The matrix rigorously labels such conditions as "Not Verified" or "Unknown".'}
            </p>
          </div>
        </div>

        {/* Verification Matrix — Responsive List on Mobile, Table on Tablet/Desktop */}
        <div className="block sm:hidden space-y-4 animate-scale-up">
          {verificationMatrix.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col gap-3 hover-card-trigger"
            >
              <div className="flex items-center justify-between gap-3 border-b border-gray-100 dark:border-gray-800 pb-2.5">
                <span className="font-bold text-gray-900 dark:text-gray-100 text-sm">
                  {language === 'hi' ? item.conditionHi : item.condition}
                </span>
                <StatusBadge status={item.status} />
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                {language === 'hi' ? item.meaningHi : item.meaning}
              </p>
            </div>
          ))}
        </div>

        <div className="hidden sm:block rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 overflow-hidden shadow-sm animate-scale-up">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-bold uppercase tracking-wider text-xs">
                <tr>
                  <th scope="col" className="py-4 px-4 sm:px-6">
                    {t.matrixColCondition}
                  </th>
                  <th scope="col" className="py-4 px-4 sm:px-6">
                    {t.matrixColStatus}
                  </th>
                  <th scope="col" className="py-4 px-4 sm:px-6">
                    {t.matrixColMeaning}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {verificationMatrix.map((item, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
                  >
                    <td className="py-4 px-4 sm:px-6 font-semibold text-gray-900 dark:text-gray-100 align-top">
                      {language === 'hi' ? item.conditionHi : item.condition}
                    </td>
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap align-top">
                      <StatusBadge status={item.status} />
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-gray-700 dark:text-gray-300 text-sm leading-relaxed align-top">
                      {language === 'hi' ? item.meaningHi : item.meaning}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Legend / Status Definitions */}
        <div className="rounded-2xl p-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col gap-6">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
            {t.legendTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="font-bold text-emerald-700 dark:text-emerald-400">
                  {t.statusVerifiedFromInput}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed pl-5">
                {t.statusVerifiedFromInputDesc}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <span className="font-bold text-rose-700 dark:text-rose-400">
                  {t.statusPossibleIssue}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed pl-5">
                {t.statusPossibleIssueDesc}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <span className="font-bold text-amber-700 dark:text-amber-400">
                  {t.statusNotVerified}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed pl-5">
                {t.statusNotVerifiedDesc}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-gray-400" />
                <span className="font-bold text-gray-700 dark:text-gray-300">
                  {t.statusUnknown}
                </span>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed pl-5">
                {t.statusUnknownDesc}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800 gap-4">
          <Link
            href="/decode"
            onClick={() => setActiveStep(2)}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 text-center focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            ← {t.backBtn}
          </Link>

          <button
            type="button"
            onClick={handleNext}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-200 flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <span>{t.nextBtn} ({t.step4})</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
