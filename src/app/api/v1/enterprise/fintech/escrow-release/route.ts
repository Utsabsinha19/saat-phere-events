import { NextRequest, NextResponse } from 'next/server';
import { EnterpriseRepository } from '@/lib/db/store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { releaseId } = body;

    if (!releaseId) {
      return NextResponse.json({ success: false, error: 'releaseId is required' }, { status: 400 });
    }

    const updatedRelease = await EnterpriseRepository.releaseVendorEscrow(releaseId);

    if (!updatedRelease) {
      return NextResponse.json({ success: false, error: 'Escrow release record not found' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      release: updatedRelease,
      message: `Escrow release of ₹${updatedRelease.allocatedAmount.toLocaleString('en-IN')} approved and dispatched to ${updatedRelease.vendorName}.`,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to release escrow' }, { status: 500 });
  }
}
