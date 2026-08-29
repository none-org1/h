// ============================================================
// PF Claim Decoder — Supabase Persistence Client
// ============================================================
// Performs server-safe and client-safe REST persistence to Supabase
// for claims, diagnostic decodes, and generated drafts.
// Zero extra external dependencies required (uses standard Fetch API).
// ============================================================

import { ClaimInput, MatchResult, ExplanationResponse, DocumentDraft } from './types';
import { getTaxonomyEntry } from './taxonomy';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xalmmmbkosvifslysvmw.supabase.co';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

/**
 * Saves a completed claim, its diagnostic decode result, and drafts to Supabase tables.
 */
export async function saveClaimToSupabase(
  input: ClaimInput,
  match: MatchResult,
  explanation?: ExplanationResponse | null,
  grievanceDraft?: DocumentDraft | null,
  rtiDraft?: DocumentDraft | null
): Promise<{ success: boolean; claimId?: string; error?: string }> {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.warn('Supabase URL or Anon Key missing. Skipping DB persistence.');
    return { success: false, error: 'Supabase environment variables missing' };
  }

  const headers = {
    'Content-Type': 'application/json',
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
    'Prefer': 'return=representation',
  };

  try {
    // 1. Insert into public.claims (or UPSERT by claim_reference)
    const claimPayload = {
      claimant_name: input.claimantName,
      claim_reference: input.claimReference || `CLM-${Date.now()}`,
      claim_type: input.claimType || 'other',
      submission_date: input.submissionDate || new Date().toISOString().split('T')[0],
      remark: input.remark,
      employer_state: input.employerState || 'unknown',
      kyc_state: input.kycState || 'unknown',
      sector: input.sector || 'General',
    };

    const claimsRes = await fetch(`${SUPABASE_URL}/rest/v1/claims`, {
      method: 'POST',
      headers,
      body: JSON.stringify(claimPayload),
    });

    if (!claimsRes.ok) {
      const errText = await claimsRes.text();
      console.warn('Supabase claims insert warning:', errText);
      return { success: false, error: errText };
    }

    const insertedClaims = await claimsRes.json();
    const claimId = insertedClaims[0]?.id;

    if (!claimId) {
      return { success: false, error: 'No claim ID returned' };
    }

    // 2. Insert into public.decodes
    const entry = getTaxonomyEntry(match.categoryId);
    const decodePayload = {
      claim_id: claimId,
      category_id: match.categoryId,
      confidence: match.confidence,
      matched_signals: match.matchedSignals,
      score: match.score,
      action_owner: entry?.actionOwner || 'unknown',
      next_action: entry?.checklist[0] || 'Check status with EPFO',
      rationale: explanation?.summary || entry?.explanationTemplate || 'Analysis based on static taxonomy rules.',
    };

    await fetch(`${SUPABASE_URL}/rest/v1/decodes`, {
      method: 'POST',
      headers,
      body: JSON.stringify(decodePayload),
    });

    // 3. Insert drafts if available
    if (grievanceDraft) {
      await fetch(`${SUPABASE_URL}/rest/v1/drafts`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          claim_id: claimId,
          doc_type: 'grievance',
          title: grievanceDraft.title,
          body: grievanceDraft.body,
          assumptions: grievanceDraft.assumptions || [],
        }),
      });
    }

    if (rtiDraft) {
      await fetch(`${SUPABASE_URL}/rest/v1/drafts`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          claim_id: claimId,
          doc_type: 'rti',
          title: rtiDraft.title,
          body: rtiDraft.body,
          assumptions: rtiDraft.assumptions || [],
        }),
      });
    }

    console.log(`Successfully saved claim & decodes to Supabase ID: ${claimId}`);
    return { success: true, claimId };
  } catch (err: any) {
    console.error('Failed to save to Supabase:', err?.message || err);
    return { success: false, error: err?.message || 'Network error' };
  }
}
