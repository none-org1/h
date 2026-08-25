// ============================================================
// PF Claim Decoder — Standalone Test Suite Runner
// ============================================================

import { matchTaxonomy } from '../lib/matchTaxonomy';
import { TAXONOMY } from '../lib/taxonomy';
import { checkSensitiveData } from '../lib/safetyUtils';
import { buildVerificationMatrix } from '../lib/verificationMatrix';
import { generateGrievanceDraft, generateRtiDraft } from '../lib/documentTemplates';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`  ✓ PASS: ${message}`);
  } else {
    failed++;
    console.error(`  ✗ FAIL: ${message}`);
  }
}

console.log('\n--- 1. Testing Deterministic Taxonomy Matcher ---');
const testCases = {
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

assert(TAXONOMY.length === 12, 'Taxonomy contains exactly 12 categories');

for (const [expectedCat, remark] of Object.entries(testCases)) {
  const result = matchTaxonomy(remark);
  assert(result.categoryId === expectedCat, `Matches category "${expectedCat}"`);
}

// Edge cases
const rawPunctuation = '  CLAIM RETURNED DUE TO MISMATCH IN NAME WITH AADHAAR-LINKED RECORDS!!!  ';
const punctResult = matchTaxonomy(rawPunctuation);
assert(punctResult.categoryId === 'aadhaar_mismatch' && punctResult.confidence === 'high', 'Handles uppercase and punctuation');

const pendingResult = matchTaxonomy('pending');
assert(pendingResult.categoryId === 'verification_pending' && pendingResult.confidence === 'low', 'Treats bare "pending" as verification_pending with low confidence');

const emptyResult = matchTaxonomy('');
assert(emptyResult.categoryId === 'other_unclear' && emptyResult.confidence === 'low', 'Empty input falls back to other_unclear');

console.log('\n--- 2. Testing Safety & PII Detection ---');
const aadhaarCheck = checkSensitiveData('My Aadhaar is 2345 6789 1234');
assert(aadhaarCheck.hasSensitiveData && aadhaarCheck.detectedTypes.includes('Aadhaar number'), 'Detects Aadhaar numbers');

const panCheck = checkSensitiveData('My PAN is ABCDE1234F');
assert(panCheck.hasSensitiveData && panCheck.detectedTypes.includes('PAN number'), 'Detects PAN numbers');

const uanCheck = checkSensitiveData('My UAN is 101234567890');
assert(uanCheck.hasSensitiveData && uanCheck.detectedTypes.includes('UAN'), 'Detects UAN numbers');

const otpCheck = checkSensitiveData('Your OTP is 492012');
assert(otpCheck.hasSensitiveData && otpCheck.detectedTypes.includes('OTP / PIN'), 'Detects OTP codes');

const cleanCheck = checkSensitiveData('Claim returned due to mismatch in name with Aadhaar-linked records.');
assert(!cleanCheck.hasSensitiveData, 'Allows clean synthetic remarks without false positive PII warning');

console.log('\n--- 3. Testing 4-Tier Verification Matrix ---');
const sampleInput = {
  claimantName: 'Aarav Mehta',
  claimType: 'pf_withdrawal',
  claimReference: 'DEMO-CLM-2026-001',
  remark: 'Claim returned due to mismatch in name with Aadhaar-linked records.',
  submissionDate: '2026-07-15',
  employerState: 'approved',
  kycState: 'partial',
  sector: 'Manufacturing',
};
const sampleMatch = {
  categoryId: 'aadhaar_mismatch',
  confidence: 'high',
  matchedSignals: ['aadhaar'],
  score: 5,
};

const matrix = buildVerificationMatrix(sampleInput, sampleMatch);
const nameCond = matrix.find((c) => c.condition.includes('Name Match'));
assert(nameCond && nameCond.status === 'possible_issue', 'Maps flagged issue to possible_issue');

const empCond = matrix.find((c) => c.condition.includes('Employer Approval State'));
assert(empCond && empCond.status === 'verified_from_input', 'Maps explicit input to verified_from_input');

const bankCond = matrix.find((c) => c.condition.includes('Bank Account & IFSC Match'));
assert(bankCond && bankCond.status === 'not_verified', 'Maps unverified live record to not_verified');

console.log('\n--- 4. Testing Document Templates ---');
const grievance = generateGrievanceDraft(sampleInput, sampleMatch);
assert(grievance.type === 'grievance', 'Generates Grievance draft');
assert(grievance.body.includes('Aarav Mehta') && grievance.body.includes('DEMO-CLM-2026-001'), 'Replaces claimant and reference slots in Grievance');
assert(grievance.footer.includes('Generated from synthetic input by an independent prototype'), 'Includes mandatory synthetic notice in Grievance footer');

const rti = generateRtiDraft(sampleInput, sampleMatch);
assert(rti.type === 'rti', 'Generates RTI draft');
assert(rti.body.includes('RIGHT TO INFORMATION ACT, 2005'), 'Includes RTI Act Section 6(1) structure');
assert(rti.footer.includes('Generated from synthetic input by an independent prototype'), 'Includes mandatory synthetic notice in RTI footer');

console.log(`\n======================================================`);
console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
console.log(`======================================================\n`);

if (failed > 0) {
  process.exit(1);
}
