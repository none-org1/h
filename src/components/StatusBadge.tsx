'use client';

// ============================================================
// PF Claim Decoder — Verification Status Badge Component
// ============================================================

import React from 'react';
import { VerificationStatus } from '@/lib/types';
import { useClaim } from '@/context/ClaimContext';

interface StatusBadgeProps {
  status: VerificationStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const { language } = useClaim();

  const labels: Record<VerificationStatus, { en: string; hi: string }> = {
    verified_from_input: { en: 'Verified from Input', hi: 'इनपुट से सत्यापित' },
    possible_issue: { en: 'Possible Issue', hi: 'संभावित समस्या' },
    not_verified: { en: 'Not Verified', hi: 'असत्यापित' },
    unknown: { en: 'Unknown / Not Stated', hi: 'अज्ञात / अव्यक्त' },
  };

  const styles: Record<VerificationStatus, { badge: string; dot: string }> = {
    verified_from_input: {
      badge: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-700',
      dot: 'bg-emerald-500',
    },
    possible_issue: {
      badge: 'bg-rose-100 text-rose-800 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-700',
      dot: 'bg-rose-500',
    },
    not_verified: {
      badge: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-700',
      dot: 'bg-amber-500',
    },
    unknown: {
      badge: 'bg-zinc-100 text-zinc-700 border-zinc-300 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700',
      dot: 'bg-zinc-400',
    },
  };

  const config = styles[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border ${config.badge}`}
    >
      <span className={`w-2 h-2 rounded-full shrink-0 ${config.dot}`} />
      <span>{labels[status][language]}</span>
    </span>
  );
}
