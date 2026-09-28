import { NextResponse } from 'next/server';
import { EnterpriseRepository } from '@/lib/db/store';

export async function GET() {
  try {
    const checkpoints = await EnterpriseRepository.getCheckpoints();
    const alerts = await EnterpriseRepository.getCrewAlerts();
    return NextResponse.json({
      success: true,
      checkpoints,
      alerts,
      activeEvent: 'Singhania & Rao Royal Wedding (Jagmandir, Udaipur)',
      systemStatus: 'AI Event Copilot Active - Real-time Checkpoints Tracking',
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch orchestrator data' }, { status: 500 });
  }
}
