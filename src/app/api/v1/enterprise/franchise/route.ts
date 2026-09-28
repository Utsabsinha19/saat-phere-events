import { NextRequest, NextResponse } from 'next/server';
import { EnterpriseRepository } from '@/lib/db/store';

export async function GET() {
  try {
    const branches = await EnterpriseRepository.getFranchiseBranches();
    const referrals = await EnterpriseRepository.getConciergeReferrals();
    return NextResponse.json({ success: true, branches, referrals });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch franchise data' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { hotelName, conciergeDirector, clientName, clientOrigin, destinationCity, estimatedBudgetInr } = body;

    if (!hotelName || !conciergeDirector || !clientName || !estimatedBudgetInr) {
      return NextResponse.json({ success: false, error: 'All referral fields are required' }, { status: 400 });
    }

    const referral = await EnterpriseRepository.submitConciergeReferral({
      hotelName,
      conciergeDirector,
      clientName,
      clientOrigin: clientOrigin || 'London, UK',
      destinationCity: destinationCity || 'Udaipur',
      estimatedBudgetInr: Number(estimatedBudgetInr),
    });

    return NextResponse.json({
      success: true,
      referral,
      message: `Concierge referral logged. 5.0% commission (₹${referral.potentialPayoutInr.toLocaleString('en-IN')}) earmarked upon contract execution.`,
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to register concierge referral' }, { status: 500 });
  }
}
