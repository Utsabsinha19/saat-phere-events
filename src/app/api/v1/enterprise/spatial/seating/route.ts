import { NextRequest, NextResponse } from 'next/server';
import { EnterpriseRepository } from '@/lib/db/store';

export async function GET() {
  try {
    const tables = await EnterpriseRepository.getSeatingTables();
    return NextResponse.json({ success: true, tables });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch seating tables' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, guestId, targetTableId } = body;

    if (action === 'optimize') {
      const result = await EnterpriseRepository.optimizeSeatingMatrix();
      return NextResponse.json({
        success: true,
        tables: result.tables,
        summary: result.optimizationSummary,
        harmonyScore: result.harmonyScore,
      });
    }

    if (action === 'reassign' && guestId && targetTableId) {
      const tables = await EnterpriseRepository.reassignGuest(guestId, targetTableId);
      return NextResponse.json({
        success: true,
        tables,
        message: 'Guest seat reassigned successfully.',
      });
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to process seating action' }, { status: 500 });
  }
}
