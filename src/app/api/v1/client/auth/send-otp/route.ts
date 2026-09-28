import { NextRequest, NextResponse } from 'next/server';
import { ClientPortalRepository } from '@/lib/db/store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phoneOrEmail } = body;

    if (!phoneOrEmail) {
      return NextResponse.json(
        { success: false, error: 'Phone number or email is required' },
        { status: 400 }
      );
    }

    const { otp } = await ClientPortalRepository.sendOtp(phoneOrEmail);

    return NextResponse.json({
      success: true,
      message: `Authentication OTP dispatched via WhatsApp to ${phoneOrEmail}`,
      demoHint: 'For immediate testing, use code: 777777 or ' + otp,
      otp,
    });
  } catch (error) {
    console.error('Error in send-otp:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to dispatch OTP' },
      { status: 500 }
    );
  }
}
