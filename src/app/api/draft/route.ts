// ============================================================
// PF Claim Decoder — API Route: /api/draft
// ============================================================
// Server-side OpenAI document drafting route (Grievance / RTI)
// with deterministic fallback.
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { getTaxonomyEntry } from '@/lib/taxonomy';
import { ClaimInput, DocumentDraft, DocumentType } from '@/lib/types';
import { generateGrievanceDraft, generateRtiDraft } from '@/lib/documentTemplates';
import { checkSensitiveData } from '@/lib/safetyUtils';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      claimInput,
      categoryId,
      docType = 'grievance',
      language = 'en',
    } = body as {
      claimInput: ClaimInput;
      categoryId: string;
      docType: 'grievance' | 'rti';
      language?: 'en' | 'hi';
    };

    if (!claimInput || !categoryId) {
      return NextResponse.json(
        { error: 'Missing claimInput or categoryId' },
        { status: 400 }
      );
    }

    // Safety check
    const safety = checkSensitiveData(claimInput.remark);
    if (safety.hasSensitiveData) {
      return NextResponse.json(
        { error: 'Sensitive data pattern detected in input.' },
        { status: 400 }
      );
    }

    const entry = getTaxonomyEntry(categoryId);
    const apiKey = process.env.OPENAI_API_KEY;

    // Fallback if no valid OpenAI API key
    if (!apiKey || apiKey.startsWith('sk-placeholder') || apiKey.length < 10) {
      const match = {
        categoryId,
        confidence: 'high' as const,
        matchedSignals: [],
        score: 5,
      };

      const fallbackDraft =
        docType === 'grievance'
          ? generateGrievanceDraft(claimInput, match)
          : generateRtiDraft(claimInput, match);

      return NextResponse.json({
        draft: fallbackDraft,
        source: 'deterministic_fallback',
      });
    }

    const systemPrompt = `
You are an expert citizen assistance legal drafting assistant.
Your role is to draft a formal ${docType === 'grievance' ? 'EPFiGMS Grievance' : 'RTI Online Application'} based ONLY on the supplied synthetic facts.

RULES:
1. Do NOT invent real government responses or reference numbers.
2. Use synthetic names and references as supplied.
3. If drafting an RTI: focus on file movement, noting copies, and specific grounds under RTI Act 2005.
4. If drafting a Grievance: state facts, attach checklist, and politely request resolution.
5. End with the mandatory notice: "Generated from synthetic input by an independent prototype. Not an official EPFO document."
6. Language: ${language === 'hi' ? 'Hindi (हिन्दी)' : 'English'}.
`.trim();

    const userPrompt = `
Draft Type: ${docType.toUpperCase()}
Category: ${entry?.label || categoryId}
Claimant: ${claimInput.claimantName}
Claim Reference: ${claimInput.claimReference}
Claim Type: ${claimInput.claimType}
Submission Date: ${claimInput.submissionDate}
Remark: "${claimInput.remark}"
`.trim();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const openAiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        temperature: 0.2,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!openAiRes.ok) {
      throw new Error(`OpenAI returned ${openAiRes.status}`);
    }

    const data = await openAiRes.json();
    const draftText = data.choices?.[0]?.message?.content || '';

    const draft: DocumentDraft = {
      type: docType,
      title: `${docType === 'grievance' ? 'EPFiGMS Grievance' : 'RTI Application'} — ${claimInput.claimReference}`,
      body: draftText,
      missingFields: [],
      assumptions: ['Draft enriched via OpenAI gpt-4o-mini'],
      footer:
        '--------------------------------------------------\nGenerated from synthetic input by an independent prototype.\nNot an official EPFO document. Review before submitting.\n--------------------------------------------------',
    };

    return NextResponse.json({
      draft,
      source: 'openai_gpt4o_mini',
    });
  } catch (err: any) {
    console.warn('Drafting API fallback:', err.message);

    const match = {
      categoryId: 'other_unclear',
      confidence: 'low' as const,
      matchedSignals: [],
      score: 0,
    };

    return NextResponse.json({
      draft: generateGrievanceDraft(
        {
          claimantName: 'Aarav Mehta',
          claimType: 'pf_withdrawal',
          claimReference: 'DEMO-CLM-2026-001',
          remark: 'Verification pending',
          submissionDate: '2026-07-15',
          employerState: 'approved',
          kycState: 'complete',
          sector: 'Manufacturing',
        },
        match
      ),
      source: 'deterministic_fallback',
    });
  }
}
