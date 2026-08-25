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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="bg-white dark:bg-zinc-900 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-950">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h2 id="sources-drawer-title" className="text-base font-bold text-zinc-900 dark:text-zinc-50">
                {language === 'hi' ? 'आधिकारिक स्रोत रजिस्ट्री' : 'Official Grounding Source Registry'}
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
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
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4">
          <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800/60 text-xs text-blue-900 dark:text-blue-200">
            <p className="font-semibold mb-1">
              {language === 'hi' ? 'स्रोत सीमा सिद्धांत:' : 'Grounding & Evidence Notice:'}
            </p>
            <p>
              {language === 'hi'
                ? 'यदि कोई आधिकारिक स्रोत किसी तथ्य की पुष्टि नहीं करता है, तो प्रोटोटाइप उसे "उपलब्ध आधिकारिक स्रोत द्वारा स्थापित नहीं" के रूप में चिह्नित करता है।'
                : 'If an official source does not explicitly verify a claim condition, the prototype explicitly marks it as "Not established by the available official source."'}
            </p>
          </div>

          <div className="space-y-3">
            {OFFICIAL_SOURCES.map((source) => (
              <div
                key={source.id}
                className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700 bg-white dark:bg-zinc-950 transition-colors space-y-1.5"
              >
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                    {source.title}
                  </h3>
                  <span className="text-[10px] font-mono bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-2 py-0.5 rounded shrink-0">
                    {source.officialDomain}
                  </span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  <span className="font-semibold text-zinc-700 dark:text-zinc-300">Supported Grounding: </span>
                  {source.supportedClaim}
                </p>
                <div className="pt-1 flex items-center justify-between text-[11px] text-zinc-400">
                  <span>Verified: {source.checkedDate}</span>
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-medium"
                  >
                    <span>Visit Portal</span>
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-zinc-800 dark:bg-zinc-200 text-white dark:text-zinc-900 font-semibold text-xs hover:opacity-90 transition-opacity"
          >
            {language === 'hi' ? 'बंद करें' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
