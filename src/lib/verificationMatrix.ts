// ============================================================
// PF Claim Decoder — Verification Matrix Generator
// ============================================================
// Builds the Known / Possible Issue / Not Verified / Unknown
// matrix from the synthetic input and matched category.
//
// Rules:
// - "verified_from_input" = explicitly stated in synthetic input
// - "possible_issue" = flagged in remark / matched category
// - "not_verified" = no live government / official system connected
// - "unknown" = not established by input
// - NEVER call "not mentioned" verified!
// ============================================================

import { ClaimInput, MatchResult, VerificationCondition } from './types';

export function buildVerificationMatrix(
  input: ClaimInput,
  match: MatchResult
): VerificationCondition[] {
  const cat = match.categoryId;
  const conditions: VerificationCondition[] = [];

  // 1. Name Match / Identity
  if (cat === 'aadhaar_mismatch') {
    conditions.push({
      condition: 'Name Match & Aadhaar Link',
      conditionHi: 'नाम मिलान और आधार लिंक',
      status: 'possible_issue',
      meaning: 'Flagged as potential mismatch in synthetic remark',
      meaningHi: 'सिंथेटिक रिमार्क में संभावित बेमेल के रूप में चिह्नित',
    });
  } else {
    conditions.push({
      condition: 'Official Aadhaar Record Verification',
      conditionHi: 'आधिकारिक आधार रिकॉर्ड सत्यापन',
      status: 'not_verified',
      meaning: 'No live UIDAI / EPFO system connected to verify identity',
      meaningHi: 'पहचान सत्यापित करने के लिए कोई लाइव UIDAI / EPFO सिस्टम जुड़ा नहीं है',
    });
  }

  // 2. Employer Approval
  if (cat === 'employer_non_approval' || input.employerState === 'pending') {
    conditions.push({
      condition: 'Employer Attestation / Approval',
      conditionHi: 'नियोक्ता प्रमाणन / स्वीकृति',
      status: 'possible_issue',
      meaning: 'Pending or non-approval indicated in input/remark',
      meaningHi: 'इनपुट/रिमार्क में लंबित या गैर-स्वीकृति का संकेत',
    });
  } else if (input.employerState === 'approved') {
    conditions.push({
      condition: 'Employer Approval State',
      conditionHi: 'नियोक्ता स्वीकृति स्थिति',
      status: 'verified_from_input',
      meaning: 'Input states employer has approved (not verified on live portal)',
      meaningHi: 'इनपुट बताता है कि नियोक्ता ने स्वीकृति दे दी है (लाइव पोर्टल पर सत्यापित नहीं)',
    });
  } else {
    conditions.push({
      condition: 'Employer Approval Status',
      conditionHi: 'नियोक्ता स्वीकृति स्थिति',
      status: 'unknown',
      meaning: 'No employer confirmation supplied in input',
      meaningHi: 'इनपुट में कोई नियोक्ता पुष्टि प्रदान नहीं की गई',
    });
  }

  // 3. KYC Status
  if (cat === 'kyc_incomplete' || input.kycState === 'partial' || input.kycState === 'not_submitted') {
    conditions.push({
      condition: 'KYC Completeness (Aadhaar/PAN/Bank)',
      conditionHi: 'KYC पूर्णता (आधार/पैन/बैंक)',
      status: 'possible_issue',
      meaning: 'Incomplete or unapproved KYC flagged in remark/input',
      meaningHi: 'रिमार्क/इनपुट में अधूरा या अस्वीकृत KYC चिह्नित',
    });
  } else if (input.kycState === 'complete') {
    conditions.push({
      condition: 'KYC Submission State',
      conditionHi: 'KYC प्रस्तुतीकरण स्थिति',
      status: 'verified_from_input',
      meaning: 'Input indicates KYC complete (official verification status unverified)',
      meaningHi: 'इनपुट KYC पूर्ण होने का संकेत देता है (आधिकारिक सत्यापन स्थिति असत्यापित)',
    });
  } else {
    conditions.push({
      condition: 'KYC Verification State',
      conditionHi: 'KYC सत्यापन स्थिति',
      status: 'unknown',
      meaning: 'Not established by input',
      meaningHi: 'इनपुट द्वारा स्थापित नहीं',
    });
  }

  // 4. Bank / IFSC Details
  if (cat === 'bank_ifsc_mismatch') {
    conditions.push({
      condition: 'Bank Account & IFSC Validation',
      conditionHi: 'बैंक खाता और IFSC सत्यापन',
      status: 'possible_issue',
      meaning: 'Bank or IFSC discrepancy flagged in remark',
      meaningHi: 'रिमार्क में बैंक या IFSC विसंगति चिह्नित',
    });
  } else {
    conditions.push({
      condition: 'Bank Account & IFSC Match',
      conditionHi: 'बैंक खाता और IFSC मिलान',
      status: 'not_verified',
      meaning: 'Bank details not validated against live banking records',
      meaningHi: 'लाइव बैंकिंग रिकॉर्ड के विरुद्ध बैंक विवरण सत्यापित नहीं किए गए',
    });
  }

  // 5. Exit Date
  if (cat === 'missing_exit_date') {
    conditions.push({
      condition: 'Date of Exit Updated',
      conditionHi: 'निकास तिथि अपडेटेड',
      status: 'possible_issue',
      meaning: 'Remark indicates exit date missing or not updated by employer',
      meaningHi: 'रिमार्क इंगित करता है कि निकास तिथि गायब है या नियोक्ता द्वारा अपडेट नहीं की गई',
    });
  } else {
    conditions.push({
      condition: 'Date of Exit Status',
      conditionHi: 'निकास तिथि स्थिति',
      status: 'unknown',
      meaning: 'Not established as an issue or verified in input',
      meaningHi: 'समस्या के रूप में स्थापित नहीं या इनपुट में असत्यापित',
    });
  }

  // 6. Duplicate Claim Flag
  if (cat === 'duplicate_claim_flagged') {
    conditions.push({
      condition: 'Claim Uniqueness',
      conditionHi: 'दावे की विशिष्टता',
      status: 'possible_issue',
      meaning: 'Remark suggests duplicate claim may already exist',
      meaningHi: 'रिमार्क बताता है कि डुप्लिकेट दावा पहले से मौजूद हो सकता है',
    });
  } else {
    conditions.push({
      condition: 'Duplicate Claim Check',
      conditionHi: 'डुप्लिकेट दावा जांच',
      status: 'not_verified',
      meaning: 'No live claim history repository connected',
      meaningHi: 'कोई लाइव दावा इतिहास रिपोजिटरी जुड़ी नहीं है',
    });
  }

  // 7. EPS / Service Length
  if (cat === 'eps_eligibility_gap') {
    conditions.push({
      condition: 'EPS Pension Service Eligibility',
      conditionHi: 'EPS पेंशन सेवा पात्रता',
      status: 'possible_issue',
      meaning: 'Remark suggests pensionable service gap or non-eligibility',
      meaningHi: 'रिमार्क पेंशन योग्य सेवा अंतर या गैर-पात्रता का संकेत देता है',
    });
  }

  // 8. Service Timeline (20-day)
  if (cat === 'past_20_day_no_response') {
    conditions.push({
      condition: 'Stated 20-Day Processing Timeline',
      conditionHi: 'निर्धारित 20-दिवसीय प्रसंस्करण समयसीमा',
      status: 'possible_issue',
      meaning: 'Submission timeline exceeded without meaningful response',
      meaningHi: 'सार्थक प्रतिक्रिया के बिना जमा समयसीमा पार हो गई',
    });
  }

  return conditions;
}
