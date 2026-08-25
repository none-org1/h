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
    high: 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/50 dark:text-emerald-300 dark:border-emerald-800',
    medium: 'bg-amber-50 text-amber-700 border-amber-300 dark:bg-amber-950/50 dark:text-amber-300 dark:border-amber-800',
    low: 'bg-blue-50 text-blue-700 border-blue-300 dark:bg-blue-950/50 dark:text-blue-300 dark:border-blue-800',
  };

  const dots = {
    high: 'bg-emerald-500',
    medium: 'bg-amber-500',
    low: 'bg-blue-500',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${colors[confidence]}`}
    >
      <span className={`w-2 h-2 rounded-full ${dots[confidence]}`} />
      {labels[confidence][language]}
    </span>
  );
}
