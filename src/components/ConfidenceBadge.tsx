'use client';

// ============================================================
// PF Claim Decoder — Confidence Badge Component
// ============================================================

import React from 'react';
import { Confidence } from '@/lib/types';
import { useClaim } from '@/context/ClaimContext';

interface ConfidenceBadgeProps {
  confidence: Confidence;
}

export function ConfidenceBadge({ confidence }: ConfidenceBadgeProps) {
  const { language } = useClaim();

  const labels = {
    high: { en: 'High Confidence', hi: 'उच्च विश्वास' },
    medium: { en: 'Medium Confidence', hi: 'मध्यम विश्वास' },
    low: { en: 'Low / Fallback', hi: 'निम्न / फ़ॉलबैक' },
  };

  const colors = {
    high: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-300 dark:border-emerald-800',
    medium: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800',
    low: 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/30 dark:text-indigo-300 dark:border-indigo-800',
  };

  const dots = {
    high: 'bg-emerald-500',
    medium: 'bg-amber-500',
    low: 'bg-indigo-500',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border shadow-sm ${colors[confidence]}`}
    >
      <span className={`w-2 h-2 rounded-full ${dots[confidence]}`} />
      {labels[confidence][language]}
    </span>
  );
}
