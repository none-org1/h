// ============================================================
// PF Claim Decoder & Action Pack — Domain Types
// ============================================================

/** Verification status for a single condition */
export type VerificationStatus =
  | 'verified_from_input'
  | 'possible_issue'
  | 'not_verified'
  | 'unknown';

/** Confidence of taxonomy match */
export type Confidence = 'high' | 'medium' | 'low';

/** Who is likely responsible for the next action */
export type ActionOwner = 'member' | 'employer' | 'EPFO' | 'unknown';

/** Type of document to recommend */
export type DocumentType = 'grievance' | 'rti' | 'both';

/** Claim type selector */
export type ClaimType =
  | 'pf_withdrawal'
  | 'pf_transfer'
  | 'pension'
  | 'pf_advance'
  | 'death_claim'
  | 'other';

/** KYC state selector */
export type KYCState =
  | 'complete'
  | 'partial'
  | 'not_submitted'
  | 'unknown';

/** Employer state selector */
export type EmployerState =
  | 'approved'
  | 'pending'
  | 'rejected'
  | 'unknown';

// ────────────────────────────────────────────────────────────

/** One entry in the fixed 12-category taxonomy */
export interface TaxonomyEntry {
  id: string;
  label: string;
  labelHi: string;
  keywords: string[];
  phrases: string[];                     // higher-priority exact phrases
  explanationTemplate: string;
  explanationTemplateHi: string;
  checklist: string[];
  checklistHi: string[];
  recommendedDoc: DocumentType;
  actionOwner: ActionOwner;
  notVerifiedConditions: string[];
  whatNotToDo: string[];
}

/** Result of deterministic taxonomy matching */
export interface MatchResult {
  categoryId: string;
  confidence: Confidence;
  matchedSignals: string[];
  score: number;
}

/** One row in the verification matrix */
export interface VerificationCondition {
  condition: string;
  conditionHi: string;
  status: VerificationStatus;
  meaning: string;
  meaningHi: string;
}

/** Full action plan for a matched category */
export interface ActionPlan {
  nextAction: string;
  nextActionHi: string;
  actionOwner: ActionOwner;
  reason: string;
  reasonHi: string;
  checklist: string[];
  checklistHi: string[];
  whatNotToDo: string[];
  whatNotToDoHi: string[];
  recommendedDoc: DocumentType;
  limitations: string;
  limitationsHi: string;
}

/** Generated document draft */
export interface DocumentDraft {
  type: DocumentType;
  title: string;
  body: string;
  missingFields: string[];
  assumptions: string[];
  footer: string;
}

/** Synthetic demo scenario */
export interface DemoScenario {
  id: string;
  label: string;
  labelHi: string;
  claimantName: string;
  claimReference: string;
  claimType: ClaimType;
  remark: string;
  remarkHi: string;
  submissionDate: string;
  employerState: EmployerState;
  kycState: KYCState;
  sector: string;
  expectedCategoryId: string;
  syntheticAgeDays?: number;
}

/** User input for the claim decoder */
export interface ClaimInput {
  claimantName: string;
  claimType: ClaimType;
  claimReference: string;
  remark: string;
  submissionDate: string;
  employerState: EmployerState;
  kycState: KYCState;
  sector: string;
}

/** Official source reference */
export interface OfficialSource {
  id: string;
  title: string;
  url: string;
  officialDomain: string;
  checkedDate: string;
  supportedClaim: string;
}

/** OpenAI explanation response schema */
export interface ExplanationResponse {
  summary: string;
  verificationState: 'possible_issue' | 'not_verified' | 'unknown';
  known: string[];
  notVerified: string[];
  unknown: string[];
  nextAction: string;
  likelyActionOwner: ActionOwner;
  checklist: string[];
  documentType: DocumentType;
  documentDraft: string;
  caution: string;
}

/** Language option */
export type Language = 'en' | 'hi';

/** Full decoded result passed between screens */
export interface DecodedResult {
  input: ClaimInput;
  match: MatchResult;
  verificationMatrix: VerificationCondition[];
  actionPlan: ActionPlan;
  grievanceDraft: DocumentDraft | null;
  rtiDraft: DocumentDraft | null;
  aiEnhanced: boolean;
  explanation?: ExplanationResponse;
}
