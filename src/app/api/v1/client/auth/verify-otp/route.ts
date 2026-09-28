import { NextRequest, NextResponse } from 'next/server';
import { ClientPortalRepository } from '@/lib/db/store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phoneOrEmail, otp } = body;

    if (!phoneOrEmail || !otp) {
      return NextResponse.json(
        { success: false, error: 'Phone/email and OTP are required' },
        { status: 400 }
      );
    }

    const isValid = await ClientPortalRepository.verifyOtp(phoneOrEmail, otp);
    if (!isValid) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired OTP. Use demo code 777777.' },
        { status: 401 }
      );
    }

    const clientEvent = await ClientPortalRepository.getEvent();

    return NextResponse.json({
      success: true,
      message: 'Authenticated successfully',
      token: `spe_jwt_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
      client: {
        name: clientEvent?.clientName || 'Ananya & Siddharth Singhania',
        email: clientEvent?.clientEmail || phoneOrEmail,
        eventId: clientEvent?.eventId || 'evt-udaipur-101',
      },
    });
  } catch (error) {
    console.error('Error in verify-otp:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to verify OTP' },
      { status: 500 }
    );
  }
}
