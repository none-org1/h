'use client';

// ============================================================
// PF Claim Decoder — Screen 4: Strategic Action Plan
// ============================================================

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useClaim } from '@/context/ClaimContext';
import { getTranslation } from '@/lib/i18n';
import { ActionOwner } from '@/lib/types';
import { SafetyNotice } from '@/components/SafetyNotice';

export default function ActionPage() {
  const { language, decodedResult, setActiveStep } = useClaim();
  const t = getTranslation(language);
  const router = useRouter();

  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

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

  const { actionPlan, input } = decodedResult;

  const toggleCheck = (idx: number) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const getOwnerBadge = (owner: ActionOwner) => {
    const config: Record<ActionOwner, { labelEn: string; labelHi: string; bg: string; text: string }> = {
      member: { labelEn: 'Member Action Required', labelHi: 'सदस्य कार्रवाई आवश्यक', bg: 'bg-indigo-100 dark:bg-indigo-900/40', text: 'text-indigo-800 dark:text-indigo-300' },
      employer: { labelEn: 'Employer / Establishment Action', labelHi: 'नियोक्ता / प्रतिष्ठान कार्रवाई', bg: 'bg-amber-100 dark:bg-amber-900/40', text: 'text-amber-800 dark:text-amber-300' },
      EPFO: { labelEn: 'EPFO Administrative Action', labelHi: 'EPFO प्रशासनिक कार्रवाई', bg: 'bg-purple-100 dark:bg-purple-900/40', text: 'text-purple-800 dark:text-purple-300' },
      unknown: { labelEn: 'Official Clarification Required', labelHi: 'आधिकारिक स्पष्टीकरण आवश्यक', bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-700 dark:text-gray-300' },
    };

    const item = config[owner] || config.unknown;
    return (
      <span className={`px-4 py-1.5 rounded-full text-xs font-bold ${item.bg} ${item.text} border border-current/20`}>
        {language === 'hi' ? item.labelHi : item.labelEn}
      </span>
    );
  };

  const handleNext = () => {
    setActiveStep(5);
    router.push('/document');
  };

  return (
    <div className="flex-1 py-8 p-4 sm:p-6 animate-fade-in bg-gray-50 dark:bg-gray-950">
      <div className="max-w-4xl mx-auto flex flex-col gap-8">
        {/* Step Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            <span>{language === 'hi' ? 'चरण 4 / 6' : 'Step 4 of 6'}</span>
            <span>•</span>
            <span>{t.step4}</span>
          </div>
          <Link
            href="/verify"
            onClick={() => setActiveStep(3)}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-indigo-500 rounded"
          >
            ← {language === 'hi' ? 'सत्यापन मैट्रिक्स पर वापस जाएं' : 'Back to Matrix'}
          </Link>
        </div>

        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-50">
            {t.actionTitle}
          </h1>
          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
            {language === 'hi'
              ? 'नैदानिक निष्कर्षों और सत्यापित इनपुट पर आधारित अनुशंसित कार्ययोजना'
              : 'Actionable next steps, evidentiary checklists, and document recommendations.'}
          </p>
        </div>

        {/* Primary Recommended Action Card */}
        <div className="p-4 sm:p-8 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col gap-6 animate-scale-up">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100 dark:border-gray-800">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                {t.nextActionTitle}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50 leading-snug">
                {language === 'hi' ? actionPlan.nextActionHi : actionPlan.nextAction}
              </h2>
            </div>
            <div>{getOwnerBadge(actionPlan.actionOwner)}</div>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 flex flex-col gap-2 text-sm sm:text-base">
            <span className="font-bold text-gray-900 dark:text-gray-100">
              {language === 'hi' ? 'तार्किक कारण:' : 'Underlying Rationale:'}
            </span>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {language === 'hi' ? actionPlan.reasonHi : actionPlan.reason}
            </p>
          </div>

          {/* Evidence Checklist */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <span>{t.evidenceChecklistTitle}</span>
              </h3>
              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                {Object.values(checkedItems).filter(Boolean).length} / {actionPlan.checklist.length} completed
              </span>
            </div>

            <div className="flex flex-col gap-2 animate-stagger">
              {(language === 'hi' ? actionPlan.checklistHi : actionPlan.checklist).map((item, idx) => {
                const isChecked = !!checkedItems[idx];
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleCheck(idx)}
                    className={`w-full p-4 rounded-xl border text-left flex items-start gap-4 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                      isChecked
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-100'
                        : 'bg-gray-50 dark:bg-gray-950 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-gray-700'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 border transition-colors ${
                        isChecked
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900'
                      }`}
                    >
                      {isChecked && (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                    <span className={`text-sm sm:text-base leading-relaxed ${isChecked ? 'line-through opacity-80' : ''}`}>
                      {item}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* What NOT to do */}
          <div className="p-4 sm:p-6 rounded-xl bg-rose-50 dark:bg-rose-900/20 border border-rose-200 dark:border-rose-900 flex flex-col gap-4">
            <h3 className="text-sm sm:text-base font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300 flex items-center gap-2">
              <svg className="w-5 h-5 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
              <span>{t.whatNotToDoTitle}</span>
            </h3>
            <ul className="flex flex-col gap-2 pl-6 list-disc text-sm sm:text-base text-rose-900 dark:text-rose-200">
              {(language === 'hi' ? actionPlan.whatNotToDoHi : actionPlan.whatNotToDo).map((item, idx) => (
                <li key={idx} className="leading-relaxed">{item}</li>
              ))}
            </ul>
          </div>

          {/* Recommended Document Callout */}
          <div className="p-4 sm:p-6 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300">
                {language === 'hi' ? 'अनुशंसित दस्तावेज प्रकार' : 'Recommended Document Draft'}
              </span>
              <p className="text-base font-bold text-indigo-950 dark:text-indigo-100">
                {actionPlan.recommendedDoc === 'grievance'
                  ? 'EPFiGMS Grievance Submission'
                  : actionPlan.recommendedDoc === 'rti'
                  ? 'RTI Information Request (RTI Online)'
                  : 'Both Grievance & RTI Application'}
              </p>
            </div>
            <button
              type="button"
              onClick={handleNext}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shrink-0 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-indigo-500 text-center"
            >
              {language === 'hi' ? 'ड्राफ्ट देखें' : 'View Draft'} →
            </button>
          </div>
        </div>

        {/* Limitations Notice */}
        <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm text-sm text-gray-500 dark:text-gray-400 flex flex-col gap-2">
          <p className="font-bold text-gray-700 dark:text-gray-300">
            {t.limitationsTitle}:
          </p>
          <p className="leading-relaxed">
            {language === 'hi' ? actionPlan.limitationsHi : actionPlan.limitations}
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-gray-100 dark:border-gray-800 gap-4">
          <Link
            href="/verify"
            onClick={() => setActiveStep(3)}
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 text-sm font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 text-center focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            ← {t.backBtn}
          </Link>

          <button
            type="button"
            onClick={handleNext}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-200 flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <span>{t.nextBtn} ({t.step5})</span>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
