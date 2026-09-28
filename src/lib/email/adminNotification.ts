import { InquiryCreateInput } from '@/types/inquiry';
import { SITE_CONFIG } from '@/config/site';

export interface EmailDispatchResult {
  success: boolean;
  messageId: string;
  recipient: string;
  subject: string;
  dispatchedAt: string;
}

export async function sendAdminLeadNotification(lead: InquiryCreateInput & { id: string }): Promise<EmailDispatchResult> {
  const recipient = SITE_CONFIG.contact.email;
  const subject = `[URGENT LEAD] New Event Inquiry: ${lead.fullName} (${lead.eventType})`;

  const emailBody = `
=====================================================
SAAT PHERE EVENTS - NEW INQUIRY DISPATCH
=====================================================
Lead ID:         ${lead.id}
Client Name:     ${lead.fullName}
Phone:           ${lead.phone}
Email:           ${lead.email}
Event Category:  ${lead.eventType}
Event Date:      ${lead.eventDate}
Location / City: ${lead.eventLocation}
Expected Guests: ${lead.guestCount}
Budget Range:    ${lead.budgetRange}
Requirements:    ${lead.requirements || 'None specified'}
Timestamp:       ${new Date().toISOString()}
=====================================================
Auto-routed to executive concierge team.
Please review in Admin Dashboard: ${SITE_CONFIG.url}/admin/inquiries
`;

  // Simulate enterprise SMTP/Resend/SendGrid delivery
  console.log(`[SMTP SIMULATION] Dispatched email to ${recipient} for Lead ${lead.id}`);
  console.log(emailBody);

  return {
    success: true,
    messageId: `msg_${Date.now()}_${Math.random().toString(36).substring(7)}`,
    recipient,
    subject,
    dispatchedAt: new Date().toISOString(),
  };
}
