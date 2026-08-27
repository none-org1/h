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
    <div className="w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3">
        <nav aria-label="Journey Progress" className="flex items-center justify-between overflow-x-auto no-scrollbar gap-1 sm:gap-2">
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
                  className={`flex items-center gap-2 px-2 sm:px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-200 dark:border-indigo-800'
                      : isCompleted
                      ? 'text-emerald-700 dark:text-emerald-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                      : 'text-gray-400 dark:text-gray-500 cursor-not-allowed opacity-60'
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-all duration-200 ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30 animate-pulse-ring'
                        : isCompleted
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {isCompleted ? (
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      step.num
                    )}
                  </span>
                  <span className="whitespace-nowrap hidden md:inline">{step.label}</span>
                </Link>

                {idx < steps.length - 1 && (
                  <div
                    className={`h-[2px] w-4 sm:w-8 mx-1 sm:mx-2 shrink-0 rounded-full transition-colors duration-300 ${
                      isCompleted ? 'bg-emerald-500' : 'bg-gray-200 dark:bg-gray-800'
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
