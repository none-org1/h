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

  const { actionPlan, input } = decodedResult;

  const toggleCheck = (idx: number) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const getOwnerBadge = (owner: ActionOwner) => {
    const config: Record<ActionOwner, { labelEn: string; labelHi: string; bg: string; text: string }> = {
      member: { labelEn: 'Member Action Required', labelHi: 'सदस्य कार्रवाई आवश्यक', bg: 'bg-blue-100 dark:bg-blue-950/60', text: 'text-blue-800 dark:text-blue-300' },
      employer: { labelEn: 'Employer / Establishment Action', labelHi: 'नियोक्ता / प्रतिष्ठान कार्रवाई', bg: 'bg-amber-100 dark:bg-amber-950/60', text: 'text-amber-800 dark:text-amber-300' },
      EPFO: { labelEn: 'EPFO Administrative Action', labelHi: 'EPFO प्रशासनिक कार्रवाई', bg: 'bg-purple-100 dark:bg-purple-950/60', text: 'text-purple-800 dark:text-purple-300' },
      unknown: { labelEn: 'Official Clarification Required', labelHi: 'आधिकारिक स्पष्टीकरण आवश्यक', bg: 'bg-zinc-100 dark:bg-zinc-800', text: 'text-zinc-700 dark:text-zinc-300' },
    };

    const item = config[owner] || config.unknown;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.bg} ${item.text} border border-current/20`}>
        {language === 'hi' ? item.labelHi : item.labelEn}
      </span>
    );
  };

  const handleNext = () => {
    setActiveStep(5);
    router.push('/document');
  };

  return (
    <div className="flex-1 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Step Indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            <span>{language === 'hi' ? 'चरण 4 / 6' : 'Step 4 of 6'}</span>
            <span>•</span>
            <span>{t.step4}</span>
          </div>
          <Link
            href="/verify"
            onClick={() => setActiveStep(3)}
            className="text-xs text-slate-500 hover:text-blue-600 underline font-medium"
          >
            ← {language === 'hi' ? 'सत्यापन मैट्रिक्स पर वापस जाएं' : 'Back to Matrix'}
          </Link>
        </div>

        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-50">
            {t.actionTitle}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {language === 'hi'
              ? 'नैदानिक निष्कर्षों और सत्यापित इनपुट पर आधारित अनुशंसित कार्ययोजना'
              : 'Actionable next steps, evidentiary checklists, and document recommendations.'}
          </p>
        </div>

        {/* Primary Recommended Action Card */}
        <div className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-zinc-800">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                {t.nextActionTitle}
              </span>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-50 leading-snug">
                {language === 'hi' ? actionPlan.nextActionHi : actionPlan.nextAction}
              </h2>
            </div>
            <div>{getOwnerBadge(actionPlan.actionOwner)}</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-zinc-950 border border-slate-200/80 dark:border-zinc-800/80 space-y-1 text-xs sm:text-sm">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              {language === 'hi' ? 'तार्किक कारण:' : 'Underlying Rationale:'}
            </span>
            <p className="text-slate-600 dark:text-slate-400">
              {language === 'hi' ? actionPlan.reasonHi : actionPlan.reason}
            </p>
          </div>

          {/* Evidence Checklist */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <span>{t.evidenceChecklistTitle}</span>
              </h3>
              <span className="text-xs text-slate-400">
                {Object.values(checkedItems).filter(Boolean).length} / {actionPlan.checklist.length} completed
              </span>
            </div>

            <div className="space-y-2">
              {(language === 'hi' ? actionPlan.checklistHi : actionPlan.checklist).map((item, idx) => {
                const isChecked = !!checkedItems[idx];
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleCheck(idx)}
                    className={`w-full p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all ${
                      isChecked
                        ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800/80 text-emerald-900 dark:text-emerald-200'
                        : 'bg-slate-50 dark:bg-zinc-950/60 border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border transition-colors ${
                        isChecked
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-slate-300 dark:border-zinc-600 bg-white dark:bg-zinc-800'
                      }`}
                    >
                      {isChecked && (
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </span>
                    <span className={`text-xs sm:text-sm leading-relaxed ${isChecked ? 'line-through opacity-80' : ''}`}>
                      {item}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* What NOT to do */}
          <div className="p-4 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300 flex items-center gap-1.5">
              <svg className="w-4 h-4 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
              </svg>
              <span>{t.whatNotToDoTitle}</span>
            </h3>
            <ul className="space-y-1.5 pl-5 list-disc text-xs text-rose-900 dark:text-rose-200">
              {(language === 'hi' ? actionPlan.whatNotToDoHi : actionPlan.whatNotToDo).map((item, idx) => (
                <li key={idx} className="leading-relaxed">{item}</li>
              ))}
            </ul>
          </div>

          {/* Recommended Document Callout */}
          <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/80 flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                {language === 'hi' ? 'अनुशंसित दस्तावेज प्रकार' : 'Recommended Document Draft'}
              </span>
              <p className="text-sm font-bold text-blue-950 dark:text-blue-100">
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
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shrink-0 transition-colors"
            >
              {language === 'hi' ? 'ड्राफ्ट देखें' : 'View Draft'} →
            </button>
          </div>
        </div>

        {/* Limitations Notice */}
        <div className="p-4 rounded-xl bg-slate-100 dark:bg-zinc-900 text-xs text-slate-500 dark:text-slate-400 space-y-1">
          <p className="font-bold text-slate-700 dark:text-slate-300">
            {t.limitationsTitle}:
          </p>
          <p>
            {language === 'hi' ? actionPlan.limitationsHi : actionPlan.limitations}
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4">
          <Link
            href="/verify"
            onClick={() => setActiveStep(3)}
            className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-700 dark:text-slate-200 text-sm font-semibold hover:bg-slate-50 transition-colors"
          >
            ← {t.backBtn}
          </Link>

          <button
            type="button"
            onClick={handleNext}
            className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
          >
            <span>{t.nextBtn} ({t.step5})</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
