// ============================================================
// PF Claim Decoder — API Route: /api/reminder
// ============================================================
// Optional mock reminder endpoint (e.g. n8n simulation).
// NEVER sends real SMS, emails, or notifications.
// ============================================================

import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { claimReference, reminderDate } = body;

    // Simulation response — strictly synthetic
    return NextResponse.json({
      success: true,
      message: 'Demo reminder created for synthetic scenario.',
      claimReference: claimReference || 'DEMO-CLM-2026-001',
      scheduledDate: reminderDate || new Date().toISOString().split('T')[0],
      notice: 'This is a simulation. No actual emails or SMS were dispatched.',
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to process reminder simulation' },
      { status: 500 }
    );
  }
}
