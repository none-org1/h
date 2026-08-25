'use client';

// ============================================================
// PF Claim Decoder — Application State Context
// ============================================================
// Manages the state across the 6-step claim decoding journey.
// No sensitive data is persisted to localStorage or external APIs.
// ============================================================

import React, { createContext, useContext, useState, useEffect, useTransition } from 'react';
import {
  ClaimInput,
  DecodedResult,
  Language,
  MatchResult,
} from '@/lib/types';
import { matchTaxonomy } from '@/lib/matchTaxonomy';
import { buildVerificationMatrix } from '@/lib/verificationMatrix';
import { buildActionPlan } from '@/lib/actionRecommendation';
import { generateGrievanceDraft, generateRtiDraft } from '@/lib/documentTemplates';
import { DEMO_SCENARIOS } from '@/lib/demoScenarios';

const DEFAULT_INPUT: ClaimInput = {
  claimantName: 'Aarav Mehta',
  claimType: 'pf_withdrawal',
  claimReference: 'DEMO-CLM-2026-001',
  remark: 'Claim returned due to mismatch in name with Aadhaar-linked records.',
  submissionDate: '2026-07-15',
  employerState: 'approved',
  kycState: 'partial',
  sector: 'Manufacturing',
};

interface ClaimContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  claimInput: ClaimInput;
  setClaimInput: React.Dispatch<React.SetStateAction<ClaimInput>>;
  decodedResult: DecodedResult | null;
  setDecodedResult: React.Dispatch<React.SetStateAction<DecodedResult | null>>;
  activeStep: number;
  setActiveStep: (step: number) => void;
  decodeClaim: (input: ClaimInput) => DecodedResult;
  loadScenario: (scenarioId: string) => void;
  resetAll: () => void;
  isAiLoading: boolean;
  enhanceWithAi: () => Promise<void>;
  aiError: string | null;
}

const ClaimContext = createContext<ClaimContextType | undefined>(undefined);

export function ClaimProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [claimInput, setClaimInput] = useState<ClaimInput>(DEFAULT_INPUT);
  const [decodedResult, setDecodedResult] = useState<DecodedResult | null>(null);
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);

  /**
   * Deterministically decode the claim input without making any AI calls
   */
  const decodeClaim = (input: ClaimInput): DecodedResult => {
    const match: MatchResult = matchTaxonomy(input.remark);
    const verificationMatrix = buildVerificationMatrix(input, match);
    const actionPlan = buildActionPlan(input, match);
    const grievanceDraft = generateGrievanceDraft(input, match);
    const rtiDraft = generateRtiDraft(input, match);

    const result: DecodedResult = {
      input,
      match,
      verificationMatrix,
      actionPlan,
      grievanceDraft,
      rtiDraft,
      aiEnhanced: false,
    };

    setDecodedResult(result);
    return result;
  };

  /**
   * Load a synthetic scenario
   */
  const loadScenario = (scenarioId: string) => {
    const scenario = DEMO_SCENARIOS.find((s) => s.id === scenarioId);
    if (!scenario) return;

    const newInput: ClaimInput = {
      claimantName: scenario.claimantName,
      claimType: scenario.claimType,
      claimReference: scenario.claimReference,
      remark: language === 'hi' ? scenario.remarkHi : scenario.remark,
      submissionDate: scenario.submissionDate,
      employerState: scenario.employerState,
      kycState: scenario.kycState,
      sector: scenario.sector,
    };

    setClaimInput(newInput);
    decodeClaim(newInput);
  };

  /**
   * Call the optional server-side AI explanation endpoint
   */
  const enhanceWithAi = async () => {
    if (!decodedResult) return;
    setIsAiLoading(true);
    setAiError(null);

    try {
      const res = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          claimInput: decodedResult.input,
          categoryId: decodedResult.match.categoryId,
          language,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      if (data.explanation) {
        setDecodedResult((prev) =>
          prev
            ? {
                ...prev,
                aiEnhanced: true,
                explanation: data.explanation,
              }
            : null
        );
      }
    } catch (err: any) {
      console.warn('AI enhancement fallback to deterministic explanation:', err);
      setAiError('AI service unavailable. Using grounded deterministic template.');
    } finally {
      setIsAiLoading(false);
    }
  };

  /**
   * Reset everything to clean initial state
   */
  const resetAll = () => {
    setClaimInput(DEFAULT_INPUT);
    setDecodedResult(null);
    setActiveStep(1);
    setAiError(null);
  };

  // Initial seed decode so user can explore directly if desired
  useEffect(() => {
    if (!decodedResult) {
      decodeClaim(DEFAULT_INPUT);
    }
  }, []);

  return (
    <ClaimContext.Provider
      value={{
        language,
        setLanguage,
        claimInput,
        setClaimInput,
        decodedResult,
        setDecodedResult,
        activeStep,
        setActiveStep,
        decodeClaim,
        loadScenario,
        resetAll,
        isAiLoading,
        enhanceWithAi,
        aiError,
      }}
    >
      {children}
    </ClaimContext.Provider>
  );
}

export function useClaim() {
  const context = useContext(ClaimContext);
  if (!context) {
    throw new Error('useClaim must be used within a ClaimProvider');
  }
  return context;
}
