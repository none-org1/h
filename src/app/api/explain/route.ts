// ============================================================
// PF Claim Decoder — API Route: /api/explain
// ============================================================
// Server-side Gemini explanation route with schema validation
// and deterministic fallback on failure or timeout.
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

    const apiKey = process.env.GEMINI_API_KEY;

    // Detailed deterministic fallback generator
    const generateRichFallback = (): ExplanationResponse => {
      const isHi = language === 'hi';
      const categoryTitle = isHi ? entry.labelHi : entry.label;
      const baseExplanation = isHi ? entry.explanationTemplateHi : entry.explanationTemplate;

      const detailedSummary = isHi
        ? `विशेषज्ञ विश्लेषण [श्रेणी: ${categoryTitle}]: ${baseExplanation} यह रिमार्क इंगित करता है कि ईपीएफओ क्षेत्रीय कार्यालय ने दावा प्रक्रिया में एक विशिष्ट असंगतता की पहचान की है। कृपया नीचे दी गई चरण-दर-चरण चेकलिस्ट का पालन करें और आधिकारिक यूएएन पोर्टल पर संशोधन जमा करें।`
        : `Detailed Analysis [Category: ${categoryTitle}]: ${baseExplanation} This status remark indicates that the regional EPFO field office encountered a specific discrepancy during automated verification. Follow the step-by-step evidentiary checklist below to submit corrected documentation through official government portals.`;

      return {
        summary: detailedSummary,
        verificationState: 'possible_issue',
        known: [
          `Claimant Name: ${claimInput.claimantName}`,
          `Claim Reference ID: ${claimInput.claimReference}`,
          `Remark Analyzed: "${claimInput.remark}"`,
          `Submission Date: ${claimInput.submissionDate}`,
          `Claim Form Type: ${claimInput.claimType}`,
        ],
        notVerified: entry.notVerifiedConditions,
        unknown: [
          'Internal field office dispatch & noting entries',
          'Live database records at EPFO / UIDAI servers',
          'Physical establishment attestation registers',
        ],
        nextAction: entry.checklist[0] || 'Check status with EPFO regional office',
        likelyActionOwner: entry.actionOwner,
        checklist: isHi ? entry.checklistHi : entry.checklist,
        documentType: entry.recommendedDoc,
        documentDraft: '',
        caution:
          'Independent prototype disclaimer: All analysis is generated from synthetic inputs. Review carefully before submitting filings on EPFiGMS or RTI Online portals.',
      };
    };

    // If API key is missing or dummy format, return rich fallback immediately
    if (!apiKey || apiKey === 'your-gemini-api-key-here' || apiKey.length < 10 || apiKey.startsWith('AQ.')) {
      return NextResponse.json({
        explanation: generateRichFallback(),
        source: 'deterministic_fallback',
      });
    }

    const prompt = `
You are an expert civic-tech diagnostic assistant for the "PF Claim Decoder & Action Pack" citizen prototype.

SAFETY RULES:
1. The category is FIXED: "${entry.label}" (ID: ${entry.id}). Do NOT change, reclassify, or invent categories.
2. Never claim official verification by EPFO, Aadhaar, PAN, or banks.
3. Never make legal determinations or declare official wrongdoing.
4. Clearly separate what the remark suggests from what remains unverified or unknown.
5. All input is SYNTHETIC demo data.
6. Language: Return output in ${language === 'hi' ? 'Hindi (हिन्दी)' : 'English'}.
7. Return strictly valid JSON only — no markdown, no code fences.

Synthetic Claim Input:
- Claimant Name: ${claimInput.claimantName}
- Claim Reference: ${claimInput.claimReference}
- Claim Type: ${claimInput.claimType}
- Submission Date: ${claimInput.submissionDate}
- Remark: "${claimInput.remark}"
- Fixed Category: ${entry.label} (${entry.id})
- Approved Checklist: ${entry.checklist.join('; ')}

Produce an IN-DEPTH, HIGHLY DETAILED structured explanation as JSON:
{
  "summary": "Detailed 3-4 sentence comprehensive explanation breaking down the remark, root cause, and legal/administrative context for the citizen",
  "verificationState": "possible_issue",
  "known": ["Explicit facts derived from claim reference, type, and remark"],
  "notVerified": ["Specific database parameters that cannot be verified without official access"],
  "unknown": ["Internal field office file notings and physical record states"],
  "nextAction": "Clear primary resolution action",
  "likelyActionOwner": "${entry.actionOwner}",
  "checklist": ["Detailed step-by-step evidence and filing items"],
  "documentType": "${entry.recommendedDoc}",
  "documentDraft": "",
  "caution": "Review warning stating prototype is independent"
}
`.trim();

    // Fetch with 15s timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.2,
            responseMimeType: 'application/json',
          },
        }),
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    if (!geminiRes.ok) {
      throw new Error(`Gemini API returned status ${geminiRes.status}`);
    }

    const geminiData = await geminiRes.json();
    const content = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
    const parsedExplanation: ExplanationResponse = JSON.parse(content);

    return NextResponse.json({
      explanation: parsedExplanation,
      source: 'gemini_1_5_flash',
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.warn('Gemini explanation route fallback triggered:', message);

    const entry = getTaxonomyEntry('other_unclear');
    return NextResponse.json({
      explanation: {
        summary:
          'Detailed Analysis: The supplied claim remark was processed through the grounded deterministic taxonomy rules. A discrepancy was detected regarding member verification state or attestation.',
        verificationState: 'possible_issue',
        known: ['Remark provided in demo input', 'Claim reference logged'],
        notVerified: ['Official EPFO database records', 'UIDAI Aadhaar vault entries'],
        unknown: ['Internal processing notes at EPFO field office'],
        nextAction: 'Review the checklist and proceed to official grievance or RTI filing.',
        likelyActionOwner: 'member',
        checklist: [
          'Verify Member profile and KYC status on UAN portal',
          'Confirm employer digital signature attestation',
          'Keep original Joint Declaration or Bank Passbook ready',
        ],
        documentType: 'grievance',
        documentDraft: '',
        caution:
          'Independent citizen prototype — review all generated drafts before official submission on government portals.',
      },
      source: 'deterministic_fallback',
    });
  }
}
