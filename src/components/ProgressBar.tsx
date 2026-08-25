'use client';

// ============================================================
// PF Claim Decoder — Stepper & Progress Bar Component
// ============================================================

import React from 'react';
import { useClaim } from '@/context/ClaimContext';
import { getTranslation } from '@/lib/i18n';
import Link from 'next/link';

export function ProgressBar() {
  const { language, activeStep, setActiveStep, decodedResult } = useClaim();
  const t = getTranslation(language);

  const steps = [
    { num: 1, label: t.step1, path: '/input' },
    { num: 2, label: t.step2, path: '/decode' },
    { num: 3, label: t.step3, path: '/verify' },
    { num: 4, label: t.step4, path: '/action' },
    { num: 5, label: t.step5, path: '/document' },
    { num: 6, label: t.step6, path: '/handoff' },
  ];

  return (
    <div className="w-full bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 sticky top-0 z-30 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <nav aria-label="Journey Progress" className="flex items-center justify-between overflow-x-auto no-scrollbar gap-2 sm:gap-4">
          {steps.map((step, idx) => {
            const isActive = activeStep === step.num;
            const isCompleted = activeStep > step.num;
            const isAccessible = isCompleted || isActive || (decodedResult !== null);

            return (
              <div key={step.num} className="flex items-center shrink-0">
                <Link
                  href={isAccessible ? step.path : '#'}
                  onClick={(e) => {
                    if (!isAccessible) {
                      e.preventDefault();
                    } else {
                      setActiveStep(step.num);
                    }
                  }}
                  className={`flex items-center gap-2 px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-800'
                      : isCompleted
                      ? 'text-emerald-700 dark:text-emerald-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                      : 'text-zinc-400 dark:text-zinc-500 cursor-not-allowed opacity-75'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                      isActive
                        ? 'bg-blue-600 text-white'
                        : isCompleted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    {isCompleted ? (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      step.num
                    )}
                  </span>
                  <span className="whitespace-nowrap">{step.label}</span>
                </Link>

                {idx < steps.length - 1 && (
                  <div
                    className={`h-[2px] w-3 sm:w-6 mx-1 sm:mx-2 shrink-0 ${
                      isCompleted ? 'bg-emerald-500' : 'bg-zinc-200 dark:bg-zinc-800'
                    }`}
                  />
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
