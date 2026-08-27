'use client';

// ============================================================
// PF Claim Decoder — Application Footer
// ============================================================

import React from 'react';
import { useClaim } from '@/context/ClaimContext';
import { getTranslation } from '@/lib/i18n';
import Link from 'next/link';

export function Footer() {
  const { language } = useClaim();
  const t = getTranslation(language);

  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 py-8 px-4 sm:px-6 mt-auto">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-1">
            <p className="font-bold text-sm text-gray-900 dark:text-gray-100">
              {t.appName}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 max-w-lg leading-relaxed">
              {t.independentNotice}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-gray-600 dark:text-gray-400">
            <a
              href="https://epfigms.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 underline underline-offset-2 transition-colors duration-200"
            >
              EPFiGMS Portal
            </a>
            <a
              href="https://rtionline.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 underline underline-offset-2 transition-colors duration-200"
            >
              RTI Online
            </a>
            <a
              href="https://www.epfindia.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-600 dark:hover:text-indigo-400 underline underline-offset-2 transition-colors duration-200"
            >
              EPFO Official Website
            </a>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-gray-400 dark:text-gray-500">
          <p>
            Deterministic Taxonomy & Action Engine | Built for Hackathon Demo
          </p>
          <p>
            No PII Stored | Synthetic Data Demonstration Only
          </p>
        </div>
      </div>
    </footer>
  );
}
