import { NextRequest, NextResponse } from 'next/server';
import { EnterpriseRepository } from '@/lib/db/store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { checkpointId, delayMinutes, reason } = body;

    if (!checkpointId || !delayMinutes) {
      return NextResponse.json({ success: false, error: 'checkpointId and delayMinutes are required' }, { status: 400 });
    }

    const result = await EnterpriseRepository.injectDelay(checkpointId, Number(delayMinutes), reason || 'Ceremony pacing adjustment');

    if (!result) {
      return NextResponse.json({ success: false, error: 'Checkpoint not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      checkpoint: result.checkpoint,
      alert: result.alert,
      message: `Delay of ${delayMinutes} mins recorded. Downstream kitchen plating & artist cues automatically recalibrated.`,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to inject delay' }, { status: 500 });
  }
}
