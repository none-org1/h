import { describe, it, expect } from 'vitest';
import { buildVerificationMatrix } from '../lib/verificationMatrix';
import { ClaimInput, MatchResult } from '../lib/types';

describe('Verification Matrix Engine', () => {
  const baseInput: ClaimInput = {
    claimantName: 'Aarav Mehta',
    claimType: 'pf_withdrawal',
    claimReference: 'DEMO-CLM-2026-001',
    remark: 'Claim returned due to mismatch in name with Aadhaar-linked records.',
    submissionDate: '2026-07-15',
    employerState: 'approved',
    kycState: 'partial',
    sector: 'Manufacturing',
  };

  it('correctly maps name mismatch to possible_issue and explicit employer state to verified_from_input', () => {
    const match: MatchResult = {
      categoryId: 'aadhaar_mismatch',
      confidence: 'high',
      matchedSignals: ['aadhaar', 'mismatch in name'],
      score: 5,
    };

    const matrix = buildVerificationMatrix(baseInput, match);

    // Name match condition
    const nameCond = matrix.find((c) => c.condition.includes('Name Match'));
    expect(nameCond?.status).toBe('possible_issue');

    // Employer state explicitly supplied as 'approved'
    const employerCond = matrix.find((c) => c.condition.includes('Employer Approval State'));
    expect(employerCond?.status).toBe('verified_from_input');

    // KYC partial
    const kycCond = matrix.find((c) => c.condition.includes('KYC Completeness'));
    expect(kycCond?.status).toBe('possible_issue');

    // Bank not validated against live records
    const bankCond = matrix.find((c) => c.condition.includes('Bank Account & IFSC Match'));
    expect(bankCond?.status).toBe('not_verified');
  });

  it('ensures "not mentioned" is never labeled as verified', () => {
    const neutralInput: ClaimInput = {
      ...baseInput,
      employerState: 'unknown',
      kycState: 'unknown',
    };
    const match: MatchResult = {
      categoryId: 'other_unclear',
      confidence: 'low',
      matchedSignals: [],
      score: 0,
    };

    const matrix = buildVerificationMatrix(neutralInput, match);

    // None should be falsely verified
    const verifiedEntries = matrix.filter((c) => c.status === 'verified_from_input');
    expect(verifiedEntries.length).toBe(0);
  });
});
