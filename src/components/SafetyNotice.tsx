'use client';

// ============================================================
// PF Claim Decoder — Safety Notice Component
// ============================================================
// Displays persistent prominent synthetic data warnings
// ============================================================

import React from 'react';
import { useClaim } from '@/context/ClaimContext';
import { getTranslation } from '@/lib/i18n';

interface SafetyNoticeProps {
  variant?: 'banner' | 'card' | 'inline';
  customMessage?: string;
}

export function SafetyNotice({ variant = 'banner', customMessage }: SafetyNoticeProps) {
  const { language } = useClaim();
  const t = getTranslation(language);

  if (variant === 'inline') {
    return (
      <div className="flex items-center gap-2 text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 px-3 py-2 rounded-xl border border-amber-200 dark:border-amber-800/50">
        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span>{customMessage || t.syntheticNotice}</span>
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div className="rounded-2xl p-4 sm:p-5 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 text-amber-900 dark:text-amber-200 flex items-start gap-3">
        <div className="p-2 bg-amber-100 dark:bg-amber-900/40 rounded-xl shrink-0 mt-0.5">
          <svg className="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="space-y-1 text-xs sm:text-sm">
          <p className="font-bold uppercase tracking-wider text-[11px] text-amber-800 dark:text-amber-300">
            {language === 'hi' ? 'सिंथेटिक डेमो डेटा' : 'Synthetic Prototype Guardrails'}
          </p>
          <p className="leading-relaxed">
            {customMessage || t.syntheticNotice}
          </p>
        </div>
      </div>
    );
  }

  return (
    <aside aria-label="Synthetic data disclosure" className="w-full bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 text-white text-xs py-2 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <span className="bg-black/20 uppercase font-black tracking-widest px-2 py-0.5 rounded-full text-[10px]">
            SYNTHETIC DATA
          </span>
          <span className="font-medium text-[11px] sm:text-xs">
            {t.independentNotice}
          </span>
        </div>
        <span className="text-[11px] opacity-90 hidden md:inline">
          No live government endpoints or PII storage
        </span>
      </div>
    </aside>
  );
}
