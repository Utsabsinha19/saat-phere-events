import { NextResponse } from 'next/server';
import { sendInquiryNotificationToAdmin, sendClientConfirmationEmail } from '@/lib/email/mailer';
import { QuotationEstimateBreakdown } from '@/types/quotation';
import { InquiryLead } from '@/types/inquiry';

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const fullName = String(data.fullName || '').trim();
    const phone = String(data.phone || '').trim();
    const email = String(data.email || '').trim();

    if (!fullName || !phone) {
      return NextResponse.json(
        { success: false, error: 'Full name and phone number are required.' },
        { status: 400 }
      );
    }

    const guestCount = Number(data.guestCount) || 250;
    const venueType = data.venueType || 'Heritage Palace';
    const cityLocation = data.cityLocation || 'Udaipur, Rajasthan';
    const budgetRange = data.budgetRange || '₹75 Lakhs – ₹1.5 Cr';
    const selectedServices: string[] = Array.isArray(data.selectedServices) ? data.selectedServices : [];

    // Determine planning tier
    let estimatedTier: QuotationEstimateBreakdown['estimatedTier'] = 'Classic Luxury';
    let timeline = '4 to 6 Months';

    if (guestCount > 400 || venueType === 'Heritage Palace') {
      estimatedTier = 'Grand Royal Bespoke';
      timeline = '8 to 12 Months';
    } else if (guestCount > 250 || String(budgetRange).includes('Cr')) {
      estimatedTier = 'Signature Elegance';
      timeline = '6 to 9 Months';
    } else if (guestCount < 100) {
      estimatedTier = 'Curated Intimate';
      timeline = '2 to 4 Months';
    }

    const scopeSummary = [
      'Dedicated Senior Event Director & Bridal Shadow Coordinator',
      'Custom 3D CAD Architectural Venue & Mandap Blueprints',
      'Curated Selection of Top 5 Regional & Destination Luxury Venues',
      'Contract Negotiation & Master Line-Item Budget Architecture',
      'White Glove Hospitality Protocol & Guest Concierge Desk',
    ];

    if (selectedServices.includes('Destination Weddings & Guest Hospitality')) {
      scopeSummary.push('Charter Flight Coordination & Airport Welcome Desks');
    }

    if (selectedServices.includes('Bespoke Mandap & Floral Scenography')) {
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
      preliminaryConsultationNote: `A bespoke quotation proposal will be prepared by our Senior Creative Director within 24 hours based on your selected ${venueType} in ${cityLocation}.`,
    };

    const newLead: InquiryLead = {
      id: quotationId,
      fullName,
      phone,
      email: email || 'not-provided@client.local',
      eventType: data.eventType || 'Destination Wedding',
      eventDate: data.eventDate || new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0],
      eventLocation: cityLocation,
      guestCount,
      budgetRange,
      requirements: `[Interactive Quotation Engine: ${quotationId}]\nVenue: ${venueType}\nTier: ${estimatedTier}\nServices: ${selectedServices.join(', ')}\nNotes: ${data.customRequirements || 'None'}`,
      status: 'New',
      createdAt: new Date().toISOString(),
      source: 'Interactive Quotation Calculator',
    };

    // 1. Dispatch lead notification to saatpherektr@gmail.com
    await sendInquiryNotificationToAdmin(newLead);

    // 2. Dispatch client confirmation if email provided
    if (email && email.includes('@')) {
      sendClientConfirmationEmail(newLead).catch(() => null);
    }

    // 3. Forward to backend if available
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    try {
      await fetch(`${backendUrl}/api/quotes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-email-dispatched': 'true',
        },
        body: JSON.stringify(data),
        signal: AbortSignal.timeout(2000),
      }).catch(() => null);
    } catch {
      // Backend not running locally is normal in frontend standalone mode
    }

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
