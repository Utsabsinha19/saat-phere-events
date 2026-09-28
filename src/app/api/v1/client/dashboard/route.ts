import { NextRequest, NextResponse } from 'next/server';
import { ClientPortalRepository, RsvpRepository, FintechRepository } from '@/lib/db/store';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get('eventId') || 'evt-udaipur-101';

    const event = await ClientPortalRepository.getEvent(eventId);
    const milestones = await ClientPortalRepository.getMilestones(eventId);
    const rsvpStats = await RsvpRepository.getStats(eventId);
    const invoices = await FintechRepository.getInvoices(eventId);

    const totalCommitted = invoices.reduce((acc, inv) => acc + inv.totalAmount, 0);
    const totalPaid = invoices.filter((i) => i.paymentStatus === 'Paid').reduce((acc, inv) => acc + inv.totalAmount, 0);
    const totalDue = invoices.filter((i) => i.paymentStatus === 'Unpaid').reduce((acc, inv) => acc + inv.totalAmount, 0);

    return NextResponse.json({
      success: true,
      data: {
        event,
        metrics: {
          totalBudget: event?.totalBudget || 25000000,
          daysRemaining: event?.daysRemaining || 80,
          rsvpAcceptanceRate: rsvpStats.totalInvitations > 0
            ? `${Math.round((rsvpStats.confirmedCount / rsvpStats.totalInvitations) * 100)}%`
            : '0%',
          confirmedHeadcount: rsvpStats.totalConfirmedAttendees,
          totalInvitations: rsvpStats.totalInvitations,
        },
        budgetTotals: {
          allocatedBudget: event?.totalBudget || 25000000,
          committedInvoices: totalCommitted,
          totalPaid,
          totalDue,
        },
        milestones,
        invoices,
      },
    });
  } catch (error) {
    console.error('Error in client dashboard API:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}
