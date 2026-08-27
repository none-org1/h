'use client';

// ============================================================
// PF Claim Decoder — Source Drawer & Reference Modal
// ============================================================

import React from 'react';
import { OFFICIAL_SOURCES } from '@/lib/sources';
import { useClaim } from '@/context/ClaimContext';

interface SourceDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SourceDrawer({ isOpen, onClose }: SourceDrawerProps) {
  const { language } = useClaim();

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="sources-drawer-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
    >
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden animate-fade-in">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between bg-gray-50 dark:bg-gray-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h2 id="sources-drawer-title" className="text-base font-bold text-gray-900 dark:text-gray-50">
                {language === 'hi' ? 'आधिकारिक स्रोत रजिस्ट्री' : 'Official Grounding Source Registry'}
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {language === 'hi'
                  ? 'यह प्रोटोटाइप निम्नलिखित सत्यापित सार्वजनिक दिशानिर्देशों पर आधारित है'
                  : 'Rules and templates are strictly grounded in public government documentation'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close dialog"
            className="p-2 rounded-xl text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4">
          <div className="p-4 bg-indigo-50 dark:bg-indigo-950/20 rounded-xl border border-indigo-200 dark:border-indigo-800/40 text-xs text-indigo-900 dark:text-indigo-200">
            <p className="font-semibold mb-1">
              {language === 'hi' ? 'स्रोत सीमा सिद्धांत:' : 'Grounding & Evidence Notice:'}
            </p>
            <p className="leading-relaxed">
              {language === 'hi'
                ? 'यदि कोई आधिकारिक स्रोत किसी तथ्य की पुष्टि नहीं करता है, तो प्रोटोटाइप उसे "उपलब्ध आधिकारिक स्रोत द्वारा स्थापित नहीं" के रूप में चिह्नित करता है।'
                : 'If an official source does not explicitly verify a claim condition, the prototype explicitly marks it as "Not established by the available official source."'}
            </p>
          </div>

          <div className="space-y-3">
            {OFFICIAL_SOURCES.map((source) => (
              <div
                key={source.id}
                className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-indigo-300 dark:hover:border-indigo-700 bg-white dark:bg-gray-900 hover:shadow-md transition-all duration-200 space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">
                    {source.title}
                  </h3>
                  <span className="text-[10px] font-mono bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full shrink-0">
                    {source.officialDomain}
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                  <span className="font-semibold text-gray-700 dark:text-gray-300">Supported Grounding: </span>
                  {source.supportedClaim}
                </p>
                <div className="pt-1 flex items-center justify-between text-[11px] text-gray-400">
                  <span>Verified: {source.checkedDate}</span>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 font-medium"
                  >
                    <span>Visit Portal</span>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 font-semibold text-xs hover:opacity-90 transition-all duration-200"
          >
            {language === 'hi' ? 'बंद करें' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
