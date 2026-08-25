'use client';

// ============================================================
// PF Claim Decoder — Screen 1: Input Page
// ============================================================

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useClaim } from '@/context/ClaimContext';
import { getTranslation } from '@/lib/i18n';
import { DEMO_SCENARIOS } from '@/lib/demoScenarios';
import { checkSensitiveData } from '@/lib/safetyUtils';
import { ClaimType, EmployerState, KYCState } from '@/lib/types';
import { SafetyNotice } from '@/components/SafetyNotice';

export default function InputPage() {
  const { language, claimInput, setClaimInput, decodeClaim, setActiveStep } = useClaim();
  const t = getTranslation(language);
  const router = useRouter();

  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('');
  const [safetyCheck, setSafetyCheck] = useState(checkSensitiveData(claimInput.remark));

  // Run safety check when remark changes
  useEffect(() => {
    setSafetyCheck(checkSensitiveData(claimInput.remark));
  }, [claimInput.remark]);

  const handleScenarioChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sId = e.target.value;
    setSelectedScenarioId(sId);
    if (!sId) return;

    const s = DEMO_SCENARIOS.find((item) => item.id === sId);
    if (!s) return;

    setClaimInput({
      claimantName: s.claimantName,
      claimType: s.claimType,
      claimReference: s.claimReference,
      remark: language === 'hi' ? s.remarkHi : s.remark,
      submissionDate: s.submissionDate,
      employerState: s.employerState,
      kycState: s.kycState,
      sector: s.sector || '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!claimInput.remark.trim()) {
      alert(language === 'hi' ? 'कृपया दावा रिमार्क दर्ज करें' : 'Please enter a claim remark.');
      return;
    }

    decodeClaim(claimInput);
    setActiveStep(2);
    router.push('/decode');
  };

  return (
    <div className="flex-1 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            <span>{language === 'hi' ? 'चरण 1 / 6' : 'Step 1 of 6'}</span>
            <span>•</span>
            <span>{t.step1}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-50">
            {t.inputTitle}
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {t.inputSubtitle}
          </p>
        </div>

        {/* Safety Warning Card */}
        <SafetyNotice
          variant="card"
          customMessage={
            language === 'hi'
              ? 'कृपया ध्यान दें: केवल सिंथेटिक/डमी डेटा दर्ज करें। कभी भी वास्तविक आधार संख्या, पैन, UAN, बैंक खाता संख्या या OTP दर्ज न करें।'
              : 'Strict Safety Rule: Use synthetic or demo data only. Never input real Aadhaar, PAN, UAN, bank account numbers, OTPs, or passwords.'
          }
        />

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-2xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 shadow-xs space-y-6">
          {/* Quick Scenario Loader */}
          <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/60 space-y-2">
            <label htmlFor="scenario-select" className="block text-xs font-bold uppercase tracking-wider text-blue-900 dark:text-blue-300">
              {t.demoSelectLabel}
            </label>
            <select
              id="scenario-select"
              value={selectedScenarioId}
              onChange={handleScenarioChange}
              className="w-full p-2.5 rounded-lg border border-blue-200 dark:border-blue-800 bg-white dark:bg-zinc-900 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 font-medium"
            >
              <option value="">{t.demoSelectPlaceholder}</option>
              {DEMO_SCENARIOS.map((s) => (
                <option key={s.id} value={s.id}>
                  [{s.claimReference}] {language === 'hi' ? s.labelHi : s.label} — &ldquo;{s.claimantName}&rdquo;
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Claimant Name */}
            <div className="space-y-1.5">
              <label htmlFor="claimant-name" className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                {t.claimantNameLabel} <span className="text-rose-500">*</span>
              </label>
              <input
                id="claimant-name"
                type="text"
                required
                value={claimInput.claimantName}
                onChange={(e) => setClaimInput({ ...claimInput, claimantName: e.target.value })}
                placeholder={t.claimantNamePlaceholder}
                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-zinc-900"
              />
            </div>

            {/* Claim Reference */}
            <div className="space-y-1.5">
              <label htmlFor="claim-ref" className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                {t.claimRefLabel} <span className="text-rose-500">*</span>
              </label>
              <input
                id="claim-ref"
                type="text"
                required
                value={claimInput.claimReference}
                onChange={(e) => setClaimInput({ ...claimInput, claimReference: e.target.value })}
                placeholder={t.claimRefPlaceholder}
                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-slate-100 text-sm font-mono focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-zinc-900"
              />
            </div>
          </div>

          {/* Remark Textarea */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label htmlFor="claim-remark" className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                {t.claimRemarkLabel} <span className="text-rose-500">*</span>
              </label>
              <span className="text-xs text-slate-400 font-mono">
                {claimInput.remark.length} {t.charCount}
              </span>
            </div>
            <textarea
              id="claim-remark"
              required
              rows={4}
              value={claimInput.remark}
              onChange={(e) => setClaimInput({ ...claimInput, remark: e.target.value })}
              placeholder={t.claimRemarkPlaceholder}
              className="w-full p-3 rounded-lg border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white dark:focus:bg-zinc-900 leading-relaxed font-sans"
            />

            {/* Sensitive Data Warning Trigger */}
            {safetyCheck.hasSensitiveData && (
              <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-lg flex items-start gap-2 text-xs text-rose-800 dark:text-rose-200 animate-in fade-in duration-150">
                <svg className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>
                  {language === 'hi' ? safetyCheck.warningMessageHi : safetyCheck.warningMessage}
                </span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Claim Type */}
            <div className="space-y-1.5">
              <label htmlFor="claim-type" className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                {t.claimTypeLabel}
              </label>
              <select
                id="claim-type"
                value={claimInput.claimType}
                onChange={(e) => setClaimInput({ ...claimInput, claimType: e.target.value as ClaimType })}
                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="pf_withdrawal">PF Full Withdrawal (Form 19)</option>
                <option value="pf_advance">PF Advance / Partial (Form 31)</option>
                <option value="pf_transfer">PF Transfer (Form 13)</option>
                <option value="pension">EPS Pension (Form 10D / 10C)</option>
                <option value="death_claim">Death Claim (Form 20 / 5IF)</option>
                <option value="other">Other / General Claim</option>
              </select>
            </div>

            {/* Submission Date */}
            <div className="space-y-1.5">
              <label htmlFor="submission-date" className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                {t.submissionDateLabel}
              </label>
              <input
                id="submission-date"
                type="date"
                value={claimInput.submissionDate}
                onChange={(e) => setClaimInput({ ...claimInput, submissionDate: e.target.value })}
                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Sector */}
            <div className="space-y-1.5">
              <label htmlFor="sector" className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                {t.sectorLabel}
              </label>
              <input
                id="sector"
                type="text"
                value={claimInput.sector || ''}
                onChange={(e) => setClaimInput({ ...claimInput, sector: e.target.value })}
                placeholder="e.g. IT, Manufacturing"
                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Employer State */}
            <div className="space-y-1.5">
              <label htmlFor="employer-state" className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                {t.employerStateLabel}
              </label>
              <select
                id="employer-state"
                value={claimInput.employerState}
                onChange={(e) => setClaimInput({ ...claimInput, employerState: e.target.value as EmployerState })}
                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="approved">Approved / Attested</option>
                <option value="pending">Pending Approval</option>
                <option value="rejected">Rejected by Employer</option>
                <option value="unknown">Unknown / Not Stated</option>
              </select>
            </div>

            {/* KYC State */}
            <div className="space-y-1.5">
              <label htmlFor="kyc-state" className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                {t.kycStateLabel}
              </label>
              <select
                id="kyc-state"
                value={claimInput.kycState}
                onChange={(e) => setClaimInput({ ...claimInput, kycState: e.target.value as KYCState })}
                className="w-full p-2.5 rounded-lg border border-slate-200 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-950 text-slate-900 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="complete">Complete & Verified (Aadhaar/PAN/Bank)</option>
                <option value="partial">Partial / Pending Employer Attestation</option>
                <option value="not_submitted">Not Submitted</option>
                <option value="unknown">Unknown / Unchecked</option>
              </select>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-slate-100 dark:border-zinc-800 flex items-center justify-end">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm sm:text-base shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2"
            >
              <span>{t.analyzeBtn}</span>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
