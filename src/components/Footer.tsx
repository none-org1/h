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
    <footer className="w-full border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 py-8 px-4 mt-auto">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="space-y-1">
            <p className="font-bold text-sm text-zinc-900 dark:text-zinc-100">
              {t.appName}
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-lg">
              {t.independentNotice}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-medium text-zinc-600 dark:text-zinc-400">
            <a
              href="https://epfigms.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 underline"
            >
              EPFiGMS Portal
            </a>
            <a
              href="https://rtionline.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 underline"
            >
              RTI Online
            </a>
            <a
              href="https://www.epfindia.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 dark:hover:text-blue-400 underline"
            >
              EPFO Official Website
            </a>
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-zinc-400 dark:text-zinc-500">
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
