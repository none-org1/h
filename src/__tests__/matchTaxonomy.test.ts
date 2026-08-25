import { describe, it, expect } from 'vitest';
import { matchTaxonomy } from '../lib/matchTaxonomy';
import { TAXONOMY } from '../lib/taxonomy';

describe('Deterministic Taxonomy Matcher', () => {
  it('should match all 12 categories accurately with canonical synthetic remarks', () => {
    const testCases: Record<string, string> = {
      aadhaar_mismatch: 'Claim returned due to mismatch in name with Aadhaar-linked records.',
      employer_non_approval: 'Claim pending for employer approval in the unified portal.',
      eps_eligibility_gap: 'Member is not eligible for pension under EPS scheme due to service period.',
      kyc_incomplete: 'Claim cannot be processed as KYC verification is pending and incomplete.',
      bank_ifsc_mismatch: 'Claim returned due to bank account mismatch and incorrect IFSC code.',
      duplicate_claim_flagged: 'Duplicate claim already exists for this member in the system.',
      missing_exit_date: 'Exit date not updated by employer on the portal.',
      dues_arrears_pending: 'Claim held up due to employer dues and arrears pending.',
      multiple_uan_conflict: 'Transfer pending due to multiple UAN conflict across member IDs.',
      verification_pending: 'Verification pending.',
      past_20_day_no_response: 'No meaningful response after the stated service timeline past 20 days.',
      other_unclear: 'Random unrelated string that matches no categories.',
    };

    for (const [expectedCat, remark] of Object.entries(testCases)) {
      const result = matchTaxonomy(remark);
      expect(result.categoryId).toBe(expectedCat);
    }
  });

  it('handles uppercase, extra spaces, and heavy punctuation', () => {
    const raw = '  CLAIM RETURNED DUE TO MISMATCH IN NAME WITH AADHAAR-LINKED RECORDS!!!  ';
    const result = matchTaxonomy(raw);
    expect(result.categoryId).toBe('aadhaar_mismatch');
    expect(result.confidence).toBe('high');
  });

  it('treats generic "pending" alone as verification_pending with low confidence', () => {
    const result = matchTaxonomy('pending');
    expect(result.categoryId).toBe('verification_pending');
    expect(result.confidence).toBe('low');
  });

  it('falls back to other_unclear on empty or whitespace-only input', () => {
    const emptyResult = matchTaxonomy('');
    expect(emptyResult.categoryId).toBe('other_unclear');
    expect(emptyResult.confidence).toBe('low');

    const spaceResult = matchTaxonomy('   \n\t  ');
    expect(spaceResult.categoryId).toBe('other_unclear');
  });

  it('falls back to other_unclear on unmatchable gibberish', () => {
    const result = matchTaxonomy('xyz123 foo bar baz lorem ipsum');
    expect(result.categoryId).toBe('other_unclear');
    expect(result.confidence).toBe('low');
  });

  it('ensures taxonomy contains exactly 12 categories', () => {
    expect(TAXONOMY.length).toBe(12);
  });
});
