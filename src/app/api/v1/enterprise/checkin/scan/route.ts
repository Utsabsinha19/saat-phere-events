import { NextRequest, NextResponse } from 'next/server';
import { EnterpriseRepository } from '@/lib/db/store';

export async function GET() {
  try {
    const guests = await EnterpriseRepository.getSmartCheckIns();
    return NextResponse.json({ success: true, guests });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch check-in list' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { qrCode } = body;

    if (!qrCode) {
      return NextResponse.json({ success: false, error: 'qrCode or guest RFID is required' }, { status: 400 });
    }

    const guest = await EnterpriseRepository.scanCheckIn(qrCode);

    if (!guest) {
      return NextResponse.json({ success: false, error: 'Digital Pass / QR Code not recognized in guest registry' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      guest,
      message: `Royal Check-In Successful! Keycard issued for ${guest.assignedSuite}. Welcome hamper dispatched.`,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to process smart check-in' }, { status: 500 });
  }
}
