// ============================================================
// PF Claim Decoder — Document Template Engine
// ============================================================
// Generates structured Grievance and RTI drafts from synthetic inputs.
// Contains mandatory synthetic data notices and validation.
// ============================================================

import { ClaimInput, DocumentDraft, MatchResult } from './types';
import { getTaxonomyEntry } from './taxonomy';

const MANDATORY_FOOTER = `
----------------------------------------------------------------------
[NOTICE: Generated from synthetic input by an independent prototype]
[Not an official EPFO document. Review and verify before submitting]
[Official portals: EPFiGMS (epfigms.gov.in) | RTI Online (rtionline.gov.in)]
----------------------------------------------------------------------`.trim();

/**
 * Generate a Grievance draft tailored for EPFiGMS
 */
export function generateGrievanceDraft(
  input: ClaimInput,
  match: MatchResult
): DocumentDraft {
  const entry = getTaxonomyEntry(match.categoryId);
  const categoryLabel = entry ? entry.label : 'General Claim Grievance';
  const today = new Date().toISOString().split('T')[0];

  const missingFields: string[] = [];
  if (!input.claimantName) missingFields.push('Claimant Name');
  if (!input.claimReference) missingFields.push('Claim Tracking Reference');
  if (!input.submissionDate) missingFields.push('Submission Date');

  const title = `Grievance regarding PF Claim (${input.claimReference || 'DEMO-CLM-REF'}) — Issue: ${categoryLabel}`;

  const body = `
To,
The Regional P.F. Commissioner / Grievance Officer,
Employees' Provident Fund Organisation (EPFO),
Regional Office.

Date: ${today}

Subject: Grievance concerning pending/returned claim Ref No: ${input.claimReference || '[CLAIM_REFERENCE]'} (${input.claimType || 'PF Claim'})

Respected Sir/Madam,

I am writing to register a formal grievance regarding my PF Claim submitted on ${input.submissionDate || '[SUBMISSION_DATE]'}.

1. CLAIM DETAILS:
   - Claimant Name: ${input.claimantName || '[CLAIMANT_NAME]'}
   - Claim Type: ${input.claimType || '[CLAIM_TYPE]'}
   - Claim Reference No: ${input.claimReference || '[CLAIM_REFERENCE]'}
   - Current Status / Remark: "${input.remark || '[REMARK]'}"

2. ISSUE SUMMARY:
   The claim tracking status indicates: "${categoryLabel}".
   According to the remark received, there appears to be an issue requiring administrative attention or employer coordination.

3. STATEMENT OF FACTS:
   - The claim was submitted in good faith on ${input.submissionDate || '[DATE]'}.
   - Employer Status: ${input.employerState === 'approved' ? 'Employer attestation completed' : 'Pending employer action'}.
   - KYC Status: ${input.kycState === 'complete' ? 'KYC details submitted and seeded' : 'KYC verification in progress'}.

4. PRAYER / RELIEF SOUGHT:
   I respectfully request your good office to:
   a) Review the exact technical or documentation bottleneck causing this status.
   b) Direct the concerned section or employer to expedite resolution.
   c) Process and settle the claim at the earliest.

Thanking you.

Yours faithfully,

${input.claimantName || '[CLAIMANT_NAME]'}
(Synthetic Applicant for Prototype Demonstration)
`.trim();

  return {
    type: 'grievance',
    title,
    body,
    missingFields,
    assumptions: [
      'Assumes member has an active UAN record',
      'Assumes claim was filed electronically via Unified Member Portal',
    ],
    footer: MANDATORY_FOOTER,
  };
}

/**
 * Generate an RTI Request draft tailored for RTI Online (rtionline.gov.in)
 */
export function generateRtiDraft(
  input: ClaimInput,
  match: MatchResult
): DocumentDraft {
  const entry = getTaxonomyEntry(match.categoryId);
  const categoryLabel = entry ? entry.label : 'PF Claim Status Clarification';
  const today = new Date().toISOString().split('T')[0];

  const missingFields: string[] = [];
  if (!input.claimantName) missingFields.push('Applicant Name');
  if (!input.claimReference) missingFields.push('Claim Tracking ID');
  if (!input.submissionDate) missingFields.push('Date of Application');

  const title = `RTI Application under Section 6(1) for Claim Status (${input.claimReference || 'DEMO-CLM-REF'})`;

  const body = `
APPLICATION UNDER SECTION 6(1) OF THE RIGHT TO INFORMATION ACT, 2005

To,
The Central Public Information Officer (CPIO),
Employees' Provident Fund Organisation (EPFO),
Regional Office.

Date: ${today}

1. APPLICANT DETAILS:
   - Name: ${input.claimantName || '[APPLICANT_NAME]'}
   - Nature of Inquiry: Status and official file records for PF Claim ${input.claimReference || '[CLAIM_REFERENCE]'}

2. PARTICULARS OF INFORMATION SOUGHT:
   Regarding Claim Tracking Reference: ${input.claimReference || '[CLAIM_REFERENCE]'} submitted on ${input.submissionDate || '[SUBMISSION_DATE]'} for ${input.claimType || 'PF Settlement'}, with stated remark: "${input.remark || '[REMARK]'}"

   Please provide the following specific information from official records:

   1. Daily Progress Report / File Movement:
      Please provide certified copies of the file notings and daily movement history of the above-mentioned claim application from ${input.submissionDate || '[SUBMISSION_DATE]'} to the date of this reply.

   2. Name and Designation of Dealing Officials:
      Please provide the names and designations of the dealing assistants / Section Supervisors / APFCs who handled this claim file and the dates on which it was pending before each official.

   3. Specific Grounds for Pendency / Rejection:
      Please provide the specific documentary or procedural discrepancy recorded in EPFO file notings leading to the remark "${input.remark || categoryLabel}".

   4. Citizens' Charter Compliance:
      As per the EPFO Citizens' Charter, the mandated timeline for settlement of claims is 20 days. If the claim has exceeded this duration, please provide the recorded reasons for the delay as documented in official files.

3. STATUTORY DECLARATION:
   I hereby state that the information sought falls within the ambit of Section 2(f) and 2(j) of the RTI Act, 2005 and is not exempt under Section 8 or 9. I am a citizen of India.

Applicant:
${input.claimantName || '[APPLICANT_NAME]'}
(Synthetic Applicant for Prototype Demonstration)
`.trim();

  return {
    type: 'rti',
    title,
    body,
    missingFields,
    assumptions: [
      'RTI seeks official information and file notings; it does not in itself process payments or approve claims.',
      'Statutory response timeline under RTI Act is 30 days from receipt by CPIO.',
    ],
    footer: MANDATORY_FOOTER,
  };
}
