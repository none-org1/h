import { describe, it, expect } from 'vitest';
import { generateGrievanceDraft, generateRtiDraft } from '../lib/documentTemplates';
import { ClaimInput, MatchResult } from '../lib/types';

describe('Document Template Engine', () => {
  const sampleInput: ClaimInput = {
    claimantName: 'Aarav Mehta',
    claimType: 'pf_withdrawal',
    claimReference: 'DEMO-CLM-2026-001',
    remark: 'Claim returned due to mismatch in name with Aadhaar-linked records.',
    submissionDate: '2026-07-15',
    employerState: 'approved',
    kycState: 'partial',
    sector: 'Manufacturing',
  };

  const sampleMatch: MatchResult = {
    categoryId: 'aadhaar_mismatch',
    confidence: 'high',
    matchedSignals: ['aadhaar'],
    score: 5,
  };

  it('generates Grievance draft with correct slots and mandatory footer', () => {
    const draft = generateGrievanceDraft(sampleInput, sampleMatch);
    expect(draft.type).toBe('grievance');
    expect(draft.body).toContain('Aarav Mehta');
    expect(draft.body).toContain('DEMO-CLM-2026-001');
    expect(draft.footer).toContain('Generated from synthetic input by an independent prototype');
    expect(draft.footer).toContain('Not an official EPFO document');
  });

  it('generates RTI draft with Section 6(1) structure and mandatory footer', () => {
    const draft = generateRtiDraft(sampleInput, sampleMatch);
    expect(draft.type).toBe('rti');
    expect(draft.body).toContain('RIGHT TO INFORMATION ACT, 2005');
    expect(draft.body).toContain('Aarav Mehta');
    expect(draft.body).toContain('DEMO-CLM-2026-001');
    expect(draft.footer).toContain('Generated from synthetic input by an independent prototype');
  });
});
