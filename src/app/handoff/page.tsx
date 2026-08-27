'use client';

// ============================================================
// PF Claim Decoder — Screen 6: Official Portal Handoff
// ============================================================

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useClaim } from '@/context/ClaimContext';
import { getTranslation } from '@/lib/i18n';
import { CopyButton } from '@/components/CopyButton';
import { SafetyNotice } from '@/components/SafetyNotice';

export default function HandoffPage() {
  const { language, decodedResult, resetAll } = useClaim();
  const t = getTranslation(language);
  const router = useRouter();

  if (!decodedResult) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-4 animate-fade-in">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {language === 'hi' ? 'कोई दावा डेटा लोड नहीं हुआ है।' : 'No claim data has been decoded yet.'}
        </p>
        <Link
          href="/input"
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/30 transition-all duration-200"
        >
          {language === 'hi' ? 'इनपुट पर जाएं' : 'Go to Input'}
        </Link>
      </div>
    );
  }

  const { input, match, grievanceDraft, rtiDraft, actionPlan } = decodedResult;

  // Build combined action pack text for download
  const fullActionPackText = `
======================================================================
PF CLAIM DECODER & ACTION PACK — EXPORTED SUMMARY
======================================================================
Generated from synthetic input by an independent prototype.
Not an official EPFO document. Review before copying or submitting.
----------------------------------------------------------------------

1. CLAIM REFERENCE & INPUT DETAILS:
- Claimant Name: ${input.claimantName}
- Claim Reference: ${input.claimReference}
- Claim Type: ${input.claimType}
- Submission Date: ${input.submissionDate}
- Remark: "${input.remark}"

2. DIAGNOSTIC ASSESSMENT:
- Matched Category ID: ${match.categoryId}
- Confidence: ${match.confidence.toUpperCase()}
- Likely Action Owner: ${actionPlan.actionOwner.toUpperCase()}
- Recommended Next Step: ${actionPlan.nextAction}

3. EVIDENCE & ACTION CHECKLIST:
${actionPlan.checklist.map((item, idx) => `[ ] ${idx + 1}. ${item}`).join('\n')}

4. WHAT NOT TO DO:
${actionPlan.whatNotToDo.map((item, idx) => `(!) ${idx + 1}. ${item}`).join('\n')}

======================================================================
5. EPFiGMS GRIEVANCE DRAFT:
======================================================================
${grievanceDraft ? `${grievanceDraft.title}\n\n${grievanceDraft.body}\n\n${grievanceDraft.footer}` : 'N/A'}

======================================================================
6. RTI APPLICATION DRAFT:
======================================================================
${rtiDraft ? `${rtiDraft.title}\n\n${rtiDraft.body}\n\n${rtiDraft.footer}` : 'N/A'}

======================================================================
OFFICIAL PORTAL LINKS:
- EPFiGMS Grievance Portal: https://epfigms.gov.in/
- RTI Online Portal: https://rtionline.gov.in/
- EPFO Official: https://www.epfindia.gov.in/
======================================================================
`.trim();

  const handleDownloadActionPack = () => {
    const filename = `${input.claimReference || 'DEMO-CLAIM'}_FULL_ACTION_PACK.txt`;
    const element = document.createElement('a');
    const file = new Blob([fullActionPackText], { type: 'text/plain;charset=utf-8' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleStartOver = () => {
    resetAll();
    router.push('/input');
  };

  return (
    <div className="flex-1 py-8 px-4 animate-fade-in">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Step Indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            <span>{language === 'hi' ? 'चरण 6 / 6' : 'Step 6 of 6'}</span>
            <span>•</span>
            <span>{t.step6}</span>
          </div>
          <Link
            href="/document"
            className="text-xs text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 underline font-medium transition-all duration-200"
          >
            ← {language === 'hi' ? 'दस्तावेज़ संपादित करें' : 'Back to Documents'}
          </Link>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-50">
            {t.handoffTitle}
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t.handoffSubtitle}
          </p>
        </div>

        {/* Clean Break Banner */}
        <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/60 text-emerald-950 dark:text-emerald-200 flex flex-col sm:flex-row items-start gap-4 shadow-sm">
          <div className="p-3 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div className="space-y-2 text-sm sm:text-base">
            <p className="font-bold text-emerald-900 dark:text-emerald-300">
              {t.handoffWarningTitle}
            </p>
            <p className="leading-relaxed text-emerald-800 dark:text-emerald-200/90 text-sm">
              {t.handoffWarningBody}
            </p>
          </div>
        </div>

        {/* Action Pack Download & Quick Copy Container */}
        <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm space-y-6 animate-scale-up">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100 dark:border-gray-800">
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-50">
                {language === 'hi' ? 'पूर्ण एक्शन पैक निर्यात करें' : 'Download Complete Action Pack'}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {language === 'hi'
                  ? 'निदान, साक्ष्य चेकलिस्ट और ड्राफ्ट दोनों को एक एकल .txt फ़ाइल में शामिल करता है'
                  : 'Includes full diagnosis, matrix, evidence checklist, and both document drafts in a single bundle'}
              </p>
            </div>

            <button
              type="button"
              onClick={handleDownloadActionPack}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gray-900 dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-white text-white dark:text-gray-900 text-sm font-bold transition-all duration-200 shadow-md flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>{t.downloadActionPackBtn}</span>
            </button>
          </div>

          {/* Quick Copy Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 space-y-3 hover-card-trigger">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  {language === 'hi' ? 'विकल्प A: शिकायत' : 'Option A: Grievance'}
                </span>
                <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                  EPFiGMS Grievance Draft
                </h3>
              </div>
              <CopyButton
                text={grievanceDraft ? `${grievanceDraft.title}\n\n${grievanceDraft.body}\n\n${grievanceDraft.footer}` : ''}
                className="w-full"
                label={language === 'hi' ? 'शिकायत ड्राफ्ट कॉपी करें' : 'Copy Grievance Draft'}
              />
            </div>

            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-950 border border-gray-200 dark:border-gray-800 space-y-3 hover-card-trigger">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  {language === 'hi' ? 'विकल्प B: RTI' : 'Option B: RTI Application'}
                </span>
                <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                  RTI Information Request
                </h3>
              </div>
              <CopyButton
                text={rtiDraft ? `${rtiDraft.title}\n\n${rtiDraft.body}\n\n${rtiDraft.footer}` : ''}
                className="w-full"
                label={language === 'hi' ? 'RTI ड्राफ्ट कॉपी करें' : 'Copy RTI Draft'}
              />
            </div>
          </div>
        </div>

        {/* Official Portal External Launchers */}
        <div className="rounded-2xl p-6 sm:p-8 bg-gradient-to-tr from-indigo-900 via-blue-900 to-gray-900 text-white shadow-xl space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-indigo-300">
              {language === 'hi' ? 'आधिकारिक सरकारी चैनल' : 'Official Government Channels'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold">
              {language === 'hi' ? 'आधिकारिक पोर्टलों पर जाएं' : 'Proceed to Official Submission'}
            </h2>
            <p className="text-sm text-gray-300">
              {language === 'hi'
                ? 'सरकारी पोर्टलों पर सबमिशन केवल नागरिक द्वारा व्यक्तिगत रूप से किया जाता है।'
                : 'Submissions must be made independently by the citizen on verified official portals.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <a
              href="https://epfigms.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 transition-all duration-200 flex items-center justify-between group focus-visible:ring-2 focus-visible:ring-white"
            >
              <div className="space-y-1">
                <p className="text-xs text-indigo-200 font-bold">Official Grievance Portal</p>
                <p className="text-base font-bold">EPFiGMS Portal</p>
                <p className="text-[11px] text-gray-300 font-mono">epfigms.gov.in</p>
              </div>
              <svg className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            <a
              href="https://rtionline.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 transition-all duration-200 flex items-center justify-between group focus-visible:ring-2 focus-visible:ring-white"
            >
              <div className="space-y-1">
                <p className="text-xs text-indigo-200 font-bold">Official RTI Filing</p>
                <p className="text-base font-bold">RTI Online Portal</p>
                <p className="text-[11px] text-gray-300 font-mono">rtionline.gov.in</p>
              </div>
              <svg className="w-6 h-6 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        {/* Start Over Button */}
        <div className="flex items-center justify-center pt-8">
          <button
            type="button"
            onClick={handleStartOver}
            className="w-full sm:w-auto px-8 py-3 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-900 dark:text-gray-100 text-sm font-bold shadow-sm transition-all duration-200 flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>{t.startOverBtn}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
