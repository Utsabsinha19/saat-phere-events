import { NextRequest, NextResponse } from 'next/server';
import { quoteSchema } from '@/lib/validations/quote';
import { QuotationEstimateBreakdown } from '@/types/quotation';
import { InquiryRepository } from '@/lib/db/store';
import { EventType } from '@/types/inquiry';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = quoteSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
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
    await InquiryRepository.create({
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

    return NextResponse.json({
      success: true,
      data: breakdown,
    });
  } catch (error) {
    console.error('Error generating quotation:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process quotation request' },
      { status: 500 }
    );
  }
}
