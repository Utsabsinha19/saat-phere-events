import { Router, Request, Response } from 'express';
import { quoteSchema } from '@/validations/quote';
import { QuotationEstimateBreakdown } from '@/types/quotation';
import { InquiryRepository } from '@/db/store';
import { EventType } from '@/types/inquiry';

import { sendAdminLeadNotification } from '@/email/adminNotification';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const result = quoteSchema.safeParse(req.body);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: result.error.flatten().fieldErrors,
      });
    }

    const data = result.data;

    // Determine planning tier based on parameters
    let estimatedTier: QuotationEstimateBreakdown['estimatedTier'] = 'Classic Luxury';
    let timeline = '4 to 6 Months';

    if (data.guestCount > 400 || data.venueType === 'Heritage Palace') {
      estimatedTier = 'Grand Royal Bespoke';
      timeline = '8 to 12 Months';
    } else if (data.guestCount > 250 || data.budgetRange.includes('Cr')) {
      estimatedTier = 'Signature Elegance';
      timeline = '6 to 9 Months';
    } else if (data.guestCount < 100) {
      estimatedTier = 'Curated Intimate';
      timeline = '2 to 4 Months';
    }

    const scopeSummary = [
      `Dedicated Senior Event Director & Bridal Shadow Coordinator`,
      `Custom 3D CAD Architectural Venue & Mandap Blueprints`,
      `Curated Selection of Top 5 Regional & Destination Luxury Venues`,
      `Contract Negotiation & Master Line-Item Budget Architecture`,
      `White Glove Hospitality Protocol & Guest Concierge Desk`,
    ];

    if (data.selectedServices.includes('Destination Weddings')) {
      scopeSummary.push('Charter Flight Coordination & Airport Welcome Desks');
    }

    if (data.selectedServices.includes('Reception & Wedding Decor')) {
      scopeSummary.push('Imported Cold-Chain Blossom Supply & Structural Rigging');
    }

    const quotationId = `SPE-Q-${Date.now().toString().slice(-6)}`;
    const breakdown: QuotationEstimateBreakdown = {
      id: quotationId,
      generatedDate: new Date().toISOString(),
      input: data,
      estimatedTier,
      recommendedPlanningTimeline: timeline,
      scopeSummary,
      preliminaryConsultationNote: `A bespoke quotation proposal will be prepared by our Senior Creative Director within 24 hours based on your selected ${data.venueType} in ${data.cityLocation}.`,
    };

    // Store as lead in system
    const newLead = await InquiryRepository.create({
      fullName: data.fullName,
      phone: data.phone,
      email: data.email,
      eventType: (data.eventType as EventType) || 'Wedding Planning & Management',
      eventDate: new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0],
      eventLocation: data.cityLocation,
      guestCount: data.guestCount,
      budgetRange: data.budgetRange,
      requirements: `[Interactive Quotation Engine: ${quotationId}]\nVenue: ${data.venueType}\nTier: ${estimatedTier}\nServices: ${data.selectedServices.join(', ')}\nNotes: ${data.customRequirements || 'None'}`,
    });

    const skipEmail = req.headers['x-email-dispatched'] === 'true';
    if (!skipEmail) {
      sendAdminLeadNotification(newLead).catch((err) => {
        console.error('Background quote email dispatch warning:', err);
      });
    }

    return res.json({
      success: true,
      data: breakdown,
    });
  } catch (error) {
    console.error('Error generating quotation:', error);
    return res.status(500).json({ success: false, error: 'Failed to process quotation request' });
  }
});

export default router;
