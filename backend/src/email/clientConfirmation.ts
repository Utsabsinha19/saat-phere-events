import { InquiryCreateInput } from '@/types/inquiry';
import { SITE_CONFIG } from '@/config/site';
import { EmailDispatchResult } from './adminNotification';

export async function sendClientInquiryConfirmation(lead: InquiryCreateInput & { id: string }): Promise<EmailDispatchResult> {
  const recipient = lead.email;
  const subject = `Welcome to Saat Phere Events | We Received Your Consultation Request (#${lead.id.substring(0, 8)})`;

  const emailBody = `
Dear ${lead.fullName},

Thank you for choosing Saat Phere Events for your upcoming ${lead.eventType}.

Our Senior Event Concierge team has received your inquiry details. We are currently curating initial creative perspectives, venue availability considerations, and custom styling proposals tailored to your celebration in ${lead.eventLocation}.

Your Reference Number: ${lead.id}
Event Date: ${lead.eventDate}
Guest Count: ${lead.guestCount}

A dedicated Event Director will contact you via WhatsApp / Phone at ${lead.phone} within 4 to 6 business hours.

Warm regards,
Client Relations & Creative Direction
Saat Phere Events | Luxury Wedding Planners
Phone: ${SITE_CONFIG.contact.phone}
WhatsApp: https://wa.me/${SITE_CONFIG.contact.whatsappRaw}
Website: ${SITE_CONFIG.url}
`;

  console.log(`[SMTP SIMULATION] Confirmation sent to client ${recipient}`);
  console.log(emailBody);

  return {
    success: true,
    messageId: `conf_${Date.now()}_${Math.random().toString(36).substring(7)}`,
    recipient,
    subject,
    dispatchedAt: new Date().toISOString(),
  };
}
