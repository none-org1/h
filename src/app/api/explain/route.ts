// ============================================================
// PF Claim Decoder — API Route: /api/explain
// ============================================================
// Server-side OpenAI explanation route with schema validation
// and deterministic fallback on failure or timeout.
//
// Critical rules:
// - Category is supplied by deterministic matcher — model CANNOT change it.
// - Model cannot claim official EPFO verification or legal determination.
// - No sensitive data logged or transmitted.
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import { getTaxonomyEntry } from '@/lib/taxonomy';
import { ClaimInput, ExplanationResponse } from '@/lib/types';
import { checkSensitiveData } from '@/lib/safetyUtils';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { claimInput, categoryId, language = 'en' } = body as {
      claimInput: ClaimInput;
      categoryId: string;
      language?: 'en' | 'hi';
    };

    if (!claimInput || !categoryId) {
      return NextResponse.json(
        { error: 'Missing claimInput or categoryId' },
        { status: 400 }
      );
    }

    // Safety guard: reject if sensitive data detected
    const safety = checkSensitiveData(claimInput.remark);
    if (safety.hasSensitiveData) {
      return NextResponse.json(
        { error: 'Sensitive data pattern detected in input. Please remove.' },
        { status: 400 }
      );
    }

    const entry = getTaxonomyEntry(categoryId);
    if (!entry) {
      return NextResponse.json(
        { error: 'Invalid categoryId' },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;

    // Deterministic fallback if API key is placeholder or missing
    if (!apiKey || apiKey.startsWith('sk-placeholder') || apiKey.length < 10) {
      const fallbackExplanation: ExplanationResponse = {
        summary: language === 'hi' ? entry.explanationTemplateHi : entry.explanationTemplate,
        verificationState: 'possible_issue',
        known: [
          `Claimant: ${claimInput.claimantName}`,
          `Claim Reference: ${claimInput.claimReference}`,
          `Remark: "${claimInput.remark}"`,
        ],
        notVerified: entry.notVerifiedConditions,
        unknown: [
          'Official internal EPFO processing notes',
          'Actual database records of member or establishment',
        ],
        nextAction: entry.checklist[0] || 'Check status with EPFO',
        likelyActionOwner: entry.actionOwner,
        checklist: language === 'hi' ? entry.checklistHi : entry.checklist,
        documentType: entry.recommendedDoc,
        documentDraft: '',
        caution:
          'This is generated from synthetic demo inputs. Review before taking action on official portals.',
      };

      return NextResponse.json({
        explanation: fallbackExplanation,
        source: 'deterministic_fallback',
      });
    }

    // Call OpenAI with strict system prompt and schema
    const systemPrompt = `
You are a specialized assistant for the "PF Claim Decoder & Action Pack" citizen prototype.
Your role is to produce a plain-language explanation of a synthetic PF claim remark.

SAFETY RULES:
1. The category is FIXED: "${entry.label}" (ID: ${entry.id}). Do NOT change, reclassify, or invent categories.
2. Never claim official verification by EPFO, Aadhaar, PAN, or banks.
3. Never make legal determinations or declare official wrongdoing.
4. Clearly separate what the remark suggests from what remains unverified or unknown.
5. All input is SYNTHETIC demo data.
6. Language: Return output in ${language === 'hi' ? 'Hindi (हिन्दी)' : 'English'}.
7. Return strictly valid JSON conforming to the requested schema.
`.trim();

    const userPrompt = `
Synthetic Claim Input:
- Claimant Name: ${claimInput.claimantName}
- Claim Reference: ${claimInput.claimReference}
- Claim Type: ${claimInput.claimType}
- Submission Date: ${claimInput.submissionDate}
- Remark: "${claimInput.remark}"
- Fixed Category: ${entry.label} (${entry.id})
- Approved Checklist: ${entry.checklist.join('; ')}

Produce a structured explanation in JSON format:
{
  "summary": "Clear, grounded 2-3 sentence explanation of the remark",
  "verificationState": "possible_issue",
  "known": ["string array of facts explicitly stated in input"],
  "notVerified": ["string array of conditions that the prototype cannot verify"],
  "unknown": ["string array of remaining unknown factors"],
  "nextAction": "Safe next action for citizen",
  "likelyActionOwner": "${entry.actionOwner}",
  "checklist": ["string array of step-by-step evidence/action items"],
  "documentType": "${entry.recommendedDoc}",
  "documentDraft": "",
  "caution": "Review warning stating prototype is independent"
}
`.trim();

    // Fetch with 15s timeout
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
        response_format: { type: 'json_object' },
        temperature: 0.2,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!openAiRes.ok) {
      throw new Error(`OpenAI API returned status ${openAiRes.status}`);
    }

    const openAiData = await openAiRes.json();
    const content = openAiData.choices?.[0]?.message?.content;
    const parsedExplanation: ExplanationResponse = JSON.parse(content);

    return NextResponse.json({
      explanation: parsedExplanation,
      source: 'openai_gpt4o_mini',
    });
  } catch (error: any) {
    console.warn('OpenAI explanation route failed or timed out, returning fallback:', error.message);

    // Graceful fallback
    return NextResponse.json({
      explanation: {
        summary:
          'The supplied synthetic remark was analyzed using the grounded deterministic taxonomy rules.',
        verificationState: 'possible_issue',
        known: ['Remark provided in demo input'],
        notVerified: ['Official EPFO and UIDAI live database records'],
        unknown: ['Internal processing reasons at EPFO regional office'],
        nextAction: 'Review the checklist and proceed to official grievance or RTI filing.',
        likelyActionOwner: 'member',
        checklist: [
          'Verify KYC status on UAN portal',
          'Check employer attestation state',
          'Document claim tracking reference',
        ],
        documentType: 'grievance',
        documentDraft: '',
        caution:
          'Independent prototype — review all drafts before official submission.',
      },
      source: 'deterministic_fallback',
    });
  }
}
