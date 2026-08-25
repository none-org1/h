'use client';

// ============================================================
// PF Claim Decoder — Screen 5: Document Generator & Editor
// ============================================================

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useClaim } from '@/context/ClaimContext';
import { getTranslation } from '@/lib/i18n';
import { CopyButton } from '@/components/CopyButton';
import { SafetyNotice } from '@/components/SafetyNotice';

export default function DocumentPage() {
  const { language, decodedResult, setActiveStep } = useClaim();
  const t = getTranslation(language);
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<'grievance' | 'rti'>('grievance');
  const [grievanceText, setGrievanceText] = useState<string>('');
  const [rtiText, setRtiText] = useState<string>('');

  useEffect(() => {
    if (decodedResult) {
      if (decodedResult.grievanceDraft) {
        setGrievanceText(
          `${decodedResult.grievanceDraft.title}\n\n${decodedResult.grievanceDraft.body}\n\n${decodedResult.grievanceDraft.footer}`
        );
      }
      if (decodedResult.rtiDraft) {
        setRtiText(
          `${decodedResult.rtiDraft.title}\n\n${decodedResult.rtiDraft.body}\n\n${decodedResult.rtiDraft.footer}`
        );
      }
      // Set default active tab based on recommendation
      if (decodedResult.actionPlan.recommendedDoc === 'rti') {
        setActiveTab('rti');
      }
    }
  }, [decodedResult]);

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

  const currentDraft = activeTab === 'grievance' ? decodedResult.grievanceDraft : decodedResult.rtiDraft;
  const currentText = activeTab === 'grievance' ? grievanceText : rtiText;

  const handleDownload = () => {
    const filename = `${decodedResult.input.claimReference || 'DEMO-CLAIM'}_${activeTab.toUpperCase()}_DRAFT.txt`;
    const element = document.createElement('a');
    const file = new Blob([currentText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleNext = () => {
    setActiveStep(6);
    router.push('/handoff');
  };

  return (
    <div className="flex-1 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Step Indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            <span>{language === 'hi' ? 'चरण 5 / 6' : 'Step 5 of 6'}</span>
            <span>•</span>
            <span>{t.step5}</span>
          </div>
          <Link
            href="/action"
            onClick={() => setActiveStep(4)}
            className="text-xs text-slate-500 hover:text-blue-600 underline font-medium"
          >
            ← {language === 'hi' ? 'कार्ययोजना पर वापस जाएं' : 'Back to Action Plan'}
          </Link>
        </div>

        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-50">
            {t.docTitle}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {t.docSubtitle}
          </p>
        </div>

        {/* RTI vs Grievance Clarification Notice */}
        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60 text-xs text-blue-900 dark:text-blue-200 flex items-start gap-3">
          <svg className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="space-y-1 leading-relaxed">
            <p className="font-bold">
              {language === 'hi' ? 'शिकायत (Grievance) बनाम RTI का अंतर:' : 'Grievance vs. RTI Legal Distinction:'}
            </p>
            <p>
              {language === 'hi'
                ? 'शिकायत सेवा समाधान या सुधार की मांग करती है। RTI सूचना या आधिकारिक फाइल रिकॉर्ड मांगती है। RTI स्वयं PF दावे को स्वीकृत या निपटाती नहीं है।'
                : 'A grievance on EPFiGMS seeks administrative resolution or correction. An RTI application seeks file notings or official records. RTI does not itself approve or settle a PF claim.'}
            </p>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-200 dark:border-zinc-800 gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('grievance')}
            className={`py-3 px-5 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'grievance'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>{t.tabGrievance}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('rti')}
            className={`py-3 px-5 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'rti'
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
            </svg>
            <span>{t.tabRti}</span>
          </button>
        </div>

        {/* Missing Fields Warning if any */}
        {currentDraft && currentDraft.missingFields.length > 0 && (
          <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 rounded-xl text-xs text-amber-800 dark:text-amber-200 flex items-center gap-2">
            <span className="font-bold">{t.missingFieldsWarning}</span>
            <span>{currentDraft.missingFields.join(', ')}</span>
          </div>
        )}

        {/* Editable Document Preview Container */}
        <div className="p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-zinc-800">
            <div className="space-y-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {language === 'hi' ? 'संपादन योग्य ड्राफ्ट' : 'Editable Plain Text Draft'}
              </span>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                {currentDraft?.title}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <CopyButton text={currentText} />
              <button
                type="button"
                onClick={handleDownload}
                className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-slate-200 text-xs sm:text-sm font-semibold transition-colors flex items-center gap-1.5"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>{t.downloadDocBtn}</span>
              </button>
            </div>
          </div>

          {/* Textarea */}
          <textarea
            rows={16}
            value={currentText}
            onChange={(e) => {
              if (activeTab === 'grievance') {
                setGrievanceText(e.target.value);
              } else {
                setRtiText(e.target.value);
              }
            }}
            className="w-full p-4 rounded-xl border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-slate-100 text-xs sm:text-sm font-mono leading-relaxed focus:ring-2 focus:ring-blue-500"
          />

          {/* Assumptions & Caution */}
          <div className="p-3.5 bg-slate-50 dark:bg-zinc-950 rounded-xl border border-slate-200/80 dark:border-zinc-800/80 text-xs text-slate-500 space-y-1">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              {language === 'hi' ? 'दस्तावेज धारणाएं व सीमाएं:' : 'Draft Assumptions & Review Notice:'}
            </span>
            <ul className="list-disc pl-5 space-y-0.5">
              {(currentDraft?.assumptions || []).map((assump, i) => (
                <li key={i}>{assump}</li>
              ))}
              <li>Review all placeholders like [CLAIM_REFERENCE] or dates before official submission.</li>
            </ul>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-4">
          <Link
            href="/action"
            onClick={() => setActiveStep(4)}
            className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-slate-700 dark:text-slate-200 text-sm font-semibold hover:bg-slate-50 transition-colors"
          >
            ← {t.backBtn}
          </Link>

          <button
            type="button"
            onClick={handleNext}
            className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-md shadow-blue-500/20 transition-all flex items-center gap-2"
          >
            <span>{t.nextBtn} ({t.step6})</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
