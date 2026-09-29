import { Router, Request, Response } from 'express';
import { ClientPortalRepository, RsvpRepository, FintechRepository } from '@/db/store';
import { RsvpStatus, DietaryPreference } from '@/types/rsvp';

const router = Router();

// POST /api/v1/client/auth/send-otp
router.post('/auth/send-otp', async (req: Request, res: Response) => {
  try {
    const { phoneOrEmail } = req.body;

    if (!phoneOrEmail) {
      return res.status(400).json({ success: false, error: 'Phone number or email is required' });
    }

    const { otp } = await ClientPortalRepository.sendOtp(phoneOrEmail);

    return res.json({
      success: true,
      message: `Authentication OTP dispatched via WhatsApp to ${phoneOrEmail}`,
      demoHint: 'For immediate testing, use code: 777777 or ' + otp,
      otp,
    });
  } catch (error) {
    console.error('Error in send-otp:', error);
    return res.status(500).json({ success: false, error: 'Failed to dispatch OTP' });
  }
});

// POST /api/v1/client/auth/verify-otp
router.post('/auth/verify-otp', async (req: Request, res: Response) => {
  try {
    const { phoneOrEmail, otp } = req.body;

    if (!phoneOrEmail || !otp) {
      return res.status(400).json({ success: false, error: 'Phone/email and OTP are required' });
    }

    const isValid = await ClientPortalRepository.verifyOtp(phoneOrEmail, otp);
    if (!isValid) {
      return res.status(401).json({ success: false, error: 'Invalid or expired OTP. Use demo code 777777.' });
    }

    const clientEvent = await ClientPortalRepository.getEvent();

    return res.json({
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
    return res.status(500).json({ success: false, error: 'Failed to verify OTP' });
  }
});

// GET /api/v1/client/dashboard
router.get('/dashboard', async (req: Request, res: Response) => {
  try {
    const eventId = (req.query.eventId as string) || 'evt-udaipur-101';

    const event = await ClientPortalRepository.getEvent(eventId);
    const milestones = await ClientPortalRepository.getMilestones(eventId);
    const rsvpStats = await RsvpRepository.getStats(eventId);
    const invoices = await FintechRepository.getInvoices(eventId);

    const totalCommitted = invoices.reduce((acc: number, inv: any) => acc + inv.totalAmount, 0);
    const totalPaid = invoices.filter((i: any) => i.paymentStatus === 'Paid').reduce((acc: number, inv: any) => acc + inv.totalAmount, 0);
    const totalDue = invoices.filter((i: any) => i.paymentStatus === 'Unpaid').reduce((acc: number, inv: any) => acc + inv.totalAmount, 0);

    return res.json({
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
    return res.status(500).json({ success: false, error: 'Failed to fetch dashboard data' });
  }
});

// POST /api/v1/client/rsvp/update
router.post('/rsvp/update', async (req: Request, res: Response) => {
  try {
    const { guestId, rsvpStatus, dietaryPreference, roomAssigned, notes } = req.body;

    if (!guestId || !rsvpStatus) {
      return res.status(400).json({ success: false, error: 'guestId and rsvpStatus are required' });
    }

    const updated = await RsvpRepository.updateStatus(
      guestId,
      rsvpStatus as RsvpStatus,
      roomAssigned
    );

    if (!updated) {
      return res.status(404).json({ success: false, error: 'Guest not found' });
    }

    if (dietaryPreference) {
      updated.dietaryPreference = dietaryPreference as DietaryPreference;
    }
    if (notes) {
      updated.notes = notes;
    }

    return res.json({
      success: true,
      message: 'RSVP response successfully recorded! See you at the celebration.',
      data: updated,
    });
  } catch (error) {
    console.error('Error in rsvp/update:', error);
    return res.status(500).json({ success: false, error: 'Failed to record RSVP response' });
  }
});

export default router;
