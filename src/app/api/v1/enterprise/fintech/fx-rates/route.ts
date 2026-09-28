import { NextRequest, NextResponse } from 'next/server';
import { EnterpriseRepository } from '@/lib/db/store';
import { SupportedCurrency } from '@/types/enterprise';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const targetCurrency = (searchParams.get('currency') || 'USD') as SupportedCurrency;

    const allLocks = await EnterpriseRepository.getFxLocks();
    const specificLock = await EnterpriseRepository.requestFxLock(targetCurrency);
    const gstConfigs = await EnterpriseRepository.getGstConfigs();
    const escrowReleases = await EnterpriseRepository.getEscrowReleases();

    return NextResponse.json({
      success: true,
      currentLock: specificLock,
      allLocks,
      gstConfigs,
      escrowReleases,
      guaranteeNotice: 'FX rates locked for 48 hours under Stripe Global Treasury & Razorpay International underwriting.',
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch FX rates' }, { status: 500 });
  }
}
