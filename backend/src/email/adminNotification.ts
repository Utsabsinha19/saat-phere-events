import { InquiryCreateInput } from '@/types/inquiry';
import { SITE_CONFIG } from '@/config/site';
import { getBackendMailTransporter, getCleanWhatsApp } from './mailer';

export interface EmailDispatchResult {
  success: boolean;
  messageId: string;
  recipient: string;
  subject: string;
  dispatchedAt: string;
  isSimulated?: boolean;
  error?: string;
}

export function generateAdminEmailHtml(lead: InquiryCreateInput & { id: string }): string {
  const cleanPhone = getCleanWhatsApp(lead.phone || '');
  const waLink = cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
        `Namaste ${lead.fullName}, thank you for your inquiry with Saat Phere Events. We received your request regarding your ${lead.eventType} celebration.`
      )}`
    : `https://wa.me/${SITE_CONFIG.contact.whatsappRaw}`;

  const istTime = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>New Event Inquiry - Saat Phere Events</title>
  <style>
    body { margin: 0; padding: 0; background-color: #0c0c0c; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #333; }
    .wrapper { width: 100%; background-color: #0c0c0c; padding: 30px 15px; }
    .container { max-width: 620px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #D4AF37; }
    .header { background: linear-gradient(135deg, #4A0012 0%, #800020 50%, #2A000A 100%); padding: 32px 24px; text-align: center; border-bottom: 3px solid #D4AF37; }
    .brand-title { color: #F8F5E9; font-size: 24px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin: 0 0 6px 0; }
    .brand-subtitle { color: #D4AF37; font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; margin: 0; }
    .alert-banner { background-color: #FFFBEB; border-left: 4px solid #D4AF37; padding: 14px 20px; margin: 20px 24px 10px 24px; border-radius: 4px; }
    .content { padding: 10px 24px 24px 24px; }
    .section-title { font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #800020; font-weight: 700; border-bottom: 2px solid #F3F4F6; padding-bottom: 8px; margin-top: 24px; margin-bottom: 14px; }
    .info-table { width: 100%; border-collapse: collapse; }
    .info-table td { padding: 10px 8px; font-size: 14px; border-bottom: 1px solid #F3F4F6; }
    .info-table td.label { width: 38%; color: #6B7280; font-weight: 600; }
    .info-table td.value { width: 62%; color: #111827; font-weight: 500; }
    .requirements-box { background-color: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; white-space: pre-wrap; }
    .btn { display: inline-block; padding: 12px 20px; margin: 6px 4px; font-size: 13px; font-weight: 700; text-decoration: none; border-radius: 6px; }
    .btn-gold { background: #D4AF37; color: #000 !important; }
    .btn-whatsapp { background-color: #25D366; color: #FFF !important; }
    .btn-outline { background-color: #800020; color: #FFF !important; }
    .footer { background-color: #181818; padding: 24px; text-align: center; color: #9CA3AF; font-size: 12px; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <div style="color: #D4AF37; font-size: 20px; margin-bottom: 6px;">✦ ✦ ✦</div>
        <h1 class="brand-title">Saat Phere Events</h1>
        <p class="brand-subtitle">New Client Lead Dispatch • Executive Notification</p>
      </div>

      <div class="alert-banner">
        <p style="margin: 0; color: #92400E; font-weight: 700; font-size: 14px;">
          🚨 URGENT LEAD NOTIFICATION • Reference ID: #${lead.id}
        </p>
        <p style="margin: 4px 0 0 0; font-size: 12px; color: #78350F;">Received on: ${istTime}</p>
      </div>

      <div class="content">
        <div class="section-title">1. Client Contact Details</div>
        <table class="info-table">
          <tr><td class="label">Full Name</td><td class="value" style="font-weight: 700; color: #800020;">${lead.fullName}</td></tr>
          <tr><td class="label">Phone</td><td class="value"><a href="tel:${lead.phone}" style="color: #800020; font-weight: 700;">${lead.phone}</a></td></tr>
          <tr><td class="label">Email</td><td class="value"><a href="mailto:${lead.email}" style="color: #1E40AF;">${lead.email}</a></td></tr>
        </table>

        <div class="section-title">2. Celebration Specifications</div>
        <table class="info-table">
          <tr><td class="label">Event Category</td><td class="value" style="font-weight: 700; color: #800020;">${lead.eventType}</td></tr>
          <tr><td class="label">Target Date</td><td class="value">${lead.eventDate}</td></tr>
          <tr><td class="label">Destination / City</td><td class="value">${lead.eventLocation}</td></tr>
          <tr><td class="label">Expected Guests</td><td class="value">${lead.guestCount}</td></tr>
          <tr><td class="label">Budget Range</td><td class="value" style="font-weight: 700; color: #800020;">${lead.budgetRange}</td></tr>
        </table>

        <div class="section-title">3. Requirements &amp; Special Vision</div>
        <div class="requirements-box">
${lead.requirements || 'No special requirements specified'}
        </div>

        <div style="margin-top: 24px; text-align: center;">
          <a href="tel:${lead.phone}" class="btn btn-gold">📞 Call Client Now</a>
          <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">💬 Chat on WhatsApp</a>
          <a href="mailto:${lead.email}" class="btn btn-outline">✉️ Reply via Email</a>
        </div>
      </div>

      <div class="footer">
        <p style="margin: 0 0 6px 0; color: #FFF; font-weight: 600;">Saat Phere Events — Luxury Wedding &amp; Event Management</p>
        <p style="margin: 0;">Hotline: ${SITE_CONFIG.contact.phone} | Official Email: saatpherektr@gmail.com</p>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
}

export async function sendAdminLeadNotification(lead: InquiryCreateInput & { id: string }): Promise<EmailDispatchResult> {
  const recipient =
    process.env.ADMIN_ALERT_EMAIL ||
    SITE_CONFIG.contact.email ||
    'saatpherektr@gmail.com';

  const subject = `[URGENT LEAD] New Event Inquiry: ${lead.fullName} (${lead.eventType}) - #${lead.id}`;

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
Registered Email: saatpherektr@gmail.com
Please review in Admin Dashboard: ${SITE_CONFIG.url}/admin/inquiries
`;

  const transporter = getBackendMailTransporter();

  if (!transporter) {
    console.warn(`[BACKEND EMAIL WARNING] Transporter not configured. Lead ${lead.id} logged locally. Configure GMAIL_USER/GMAIL_APP_PASSWORD in backend/.env for live delivery to ${recipient}.`);
    console.log(emailBody);

    return {
      success: true,
      messageId: `sim_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      recipient,
      subject,
      dispatchedAt: new Date().toISOString(),
      isSimulated: true,
    };
  }

  try {
    const sender =
      process.env.EMAIL_FROM ||
      `"Saat Phere Events Leads" <${process.env.GMAIL_USER || process.env.SMTP_USER || 'saatpherektr@gmail.com'}>`;

    const info = await transporter.sendMail({
      from: sender,
      to: recipient,
      replyTo: lead.email ? `"${lead.fullName}" <${lead.email}>` : undefined,
      subject,
      text: emailBody,
      html: generateAdminEmailHtml(lead),
    });

    console.log(`[BACKEND EMAIL DISPATCH] Successfully delivered lead email to ${recipient} (Message ID: ${info.messageId}) for Lead ${lead.id}`);

    return {
      success: true,
      messageId: info.messageId,
      recipient,
      subject,
      dispatchedAt: new Date().toISOString(),
      isSimulated: false,
    };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`[BACKEND EMAIL DISPATCH ERROR] Failed to send email to ${recipient}:`, errorMsg);
    console.log(emailBody);

    return {
      success: false,
      messageId: `err_${Date.now()}`,
      recipient,
      subject,
      dispatchedAt: new Date().toISOString(),
      error: errorMsg,
    };
  }
}
