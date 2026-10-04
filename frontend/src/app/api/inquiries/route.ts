import { NextResponse } from 'next/server';
import { sendInquiryNotificationToAdmin, sendClientConfirmationEmail } from '@/lib/email/mailer';
import { InquiryLead } from '@/types/inquiry';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Basic sanitization and validation
    const fullName = String(body.fullName || body.brideGroomName || '').trim();
    const phone = String(body.phone || '').trim();
    const email = String(body.email || '').trim();

    if (!fullName || !phone) {
      return NextResponse.json(
        { success: false, error: 'Full name and phone number are required.' },
        { status: 400 }
      );
    }

    const id = `SPE-LEAD-${Date.now().toString().slice(-5)}${Math.floor(10 + Math.random() * 90)}`;
    
    const newLead: InquiryLead = {
      id,
      fullName,
      phone,
      email: email || 'not-provided@client.local',
      eventType: body.eventType || 'Wedding Planning & Management',
      eventDate: body.eventDate || new Date().toISOString().split('T')[0],
      eventLocation: body.eventLocation || body.venue || 'Not specified',
      guestCount: body.guestCount || '250 – 500 Guests',
      budgetRange: body.budgetRange || body.decorBudget || 'Not specified',
      requirements: body.requirements || body.specialNotes || 'None specified',
      status: 'New',
      createdAt: new Date().toISOString(),
      source: body.source || (body.nationality ? 'Website Quote Engine' : 'Website Official Inquiry Form'),
    };

    // 1. Dispatch real email with inquiry details to registered email: saatpherektr@gmail.com
    const emailResult = await sendInquiryNotificationToAdmin(newLead);

    // 2. Dispatch courtesy confirmation email to client if valid email was provided
    if (email && email.includes('@')) {
      sendClientConfirmationEmail(newLead).catch((err) => {
        console.warn('[CLIENT EMAIL CONFIRMATION WARNING]', err);
      });
    }

    // 3. If backend is running, forward lead to backend repository
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    try {
      await fetch(`${backendUrl}/api/inquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-email-dispatched': 'true', // Prevents double email sending by backend
        },
        body: JSON.stringify(newLead),
        signal: AbortSignal.timeout(2000),
      }).catch(() => null);
    } catch {
      // Backend not running locally is normal in frontend standalone mode
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry received successfully and dispatched to concierge team.',
      data: newLead,
      emailDispatched: emailResult.success,
      emailRecipient: emailResult.recipient,
      isSimulated: emailResult.isSimulated || false,
    });
  } catch (error) {
    console.error('Error handling inquiry submission:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to record quote inquiry' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Saat Phere Events Inquiry Engine Ready',
    targetEmail: 'saatpherektr@gmail.com',
  });
}
