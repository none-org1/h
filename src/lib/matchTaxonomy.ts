// ============================================================
// PF Claim Decoder — Deterministic Taxonomy Matcher
// ============================================================
// NO AI calls. NO dynamic categories. Fully deterministic.
// "pending" alone is NOT a specific diagnosis.
// Unknown input → other_unclear.
// ============================================================

import { MatchResult } from './types';
import { TAXONOMY } from './taxonomy';

/** Normalise input: lowercase, strip punctuation, collapse whitespace */
function normalise(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')   // punctuation → space
    .replace(/\s+/g, ' ')       // collapse whitespace
    .trim();
}

/** Score a single taxonomy entry against normalised text */
function scoreEntry(
  normalised: string,
  keywords: string[],
  phrases: string[]
): { score: number; matchedSignals: string[] } {
  let score = 0;
  const matchedSignals: string[] = [];

  // Phase 1: Exact phrase matches (higher priority — 3 points each)
  for (const phrase of phrases) {
    const normPhrase = normalise(phrase);
    if (normalised.includes(normPhrase)) {
      score += 3;
      matchedSignals.push(phrase);
    }
  }

  // Phase 2: Keyword matches (1 point each)
  for (const keyword of keywords) {
    const normKeyword = normalise(keyword);
    if (normalised.includes(normKeyword)) {
      score += 1;
      // Only add if not already covered by a phrase
      if (!matchedSignals.some((s) => normalise(s).includes(normKeyword))) {
        matchedSignals.push(keyword);
      }
    }
  }

  return { score, matchedSignals };
}

/** Determine confidence from score */
function getConfidence(score: number): 'high' | 'medium' | 'low' {
  if (score >= 5) return 'high';
  if (score >= 2) return 'medium';
  return 'low';
}

/**
 * Match a remark against the fixed taxonomy.
 *
 * Rules:
 * - Empty / whitespace-only → other_unclear with low confidence
 * - "pending" alone → verification_pending (not a specific diagnosis)
 * - Unknown → other_unclear
 * - Best score wins; ties broken by entry order
 */
export function matchTaxonomy(remark: string): MatchResult {
  const trimmed = remark.trim();

  // Empty guard
  if (!trimmed) {
    return {
      categoryId: 'other_unclear',
      confidence: 'low',
      matchedSignals: [],
      score: 0,
    };
  }

  const normalised = normalise(trimmed);

  // Guard: bare "pending" alone is not a specific diagnosis
  // But "verification pending" IS specific enough for that category
  if (normalised === 'pending') {
    return {
      categoryId: 'verification_pending',
      confidence: 'low',
      matchedSignals: ['pending'],
      score: 1,
    };
  }

  let bestResult: MatchResult = {
    categoryId: 'other_unclear',
    confidence: 'low',
    matchedSignals: [],
    score: 0,
  };

  for (const entry of TAXONOMY) {
    // Skip the fallback category — it has no keywords
    if (entry.id === 'other_unclear') continue;

    const { score, matchedSignals } = scoreEntry(
      normalised,
      entry.keywords,
      entry.phrases
    );

    if (score > bestResult.score) {
      bestResult = {
        categoryId: entry.id,
        confidence: getConfidence(score),
        matchedSignals,
        score,
      };
    }
  }

  // If nothing matched (score 0), fall back to other_unclear
  if (bestResult.score === 0) {
    return {
      categoryId: 'other_unclear',
      confidence: 'low',
      matchedSignals: [],
      score: 0,
    };
  }

  return bestResult;
}
