import nodemailer, { type Transporter } from 'nodemailer';
import { SITE_CONFIG } from '@/config/site';
import { InquiryLead } from '@/types/inquiry';

export interface EmailDispatchResponse {
  success: boolean;
  messageId?: string;
  recipient: string;
  isSimulated?: boolean;
  error?: string;
}

/**
 * Creates and returns a configured Nodemailer transporter based on available environment variables.
 * Supports:
 * 1. Gmail SMTP with App Password (GMAIL_USER & GMAIL_APP_PASSWORD)
 * 2. Custom SMTP (SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE)
 * 3. Fallback when credentials are not yet configured
 */
export function getMailTransporter(): Transporter | null {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : undefined;
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;

  const user = process.env.GMAIL_USER || process.env.SMTP_USER;
  const pass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS || process.env.SMTP_PASSWORD;

  // 1. Explicit Custom SMTP Host (SendGrid, Brevo, AWS SES, Resend, or custom mail server)
  if (host && user && pass) {
    return nodemailer.createTransport({
      host,
      port: port || 587,
      secure,
      auth: { user, pass },
      tls: {
        rejectUnauthorized: process.env.NODE_ENV === 'production',
      },
    });
  }

  // 2. Direct Gmail / Google Workspace SMTP
  if (user && pass) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    });
  }

  // 3. Optional Local SMTP during development (e.g. Supabase local mailhog/Inbucket on port 54325)
  if (process.env.NODE_ENV !== 'production' && process.env.ENABLE_LOCAL_SMTP === 'true') {
    return nodemailer.createTransport({
      host: '127.0.0.1',
      port: 54325,
      ignoreTLS: true,
    });
  }

  return null;
}

/**
 * Clean phone number to generate international WhatsApp link
 */
function getWhatsAppCleanNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('91') && digits.length === 12) return digits;
  if (digits.length === 10) return `91${digits}`;
  return digits;
}

/**
 * Generates an exquisite luxury HTML email template tailored for Saat Phere Events admin notifications.
 */
export function generateAdminEmailHtml(lead: Partial<InquiryLead>): string {
  const waNumber = getWhatsAppCleanNumber(lead.phone || '');
  const waLink = waNumber
    ? `https://wa.me/${waNumber}?text=${encodeURIComponent(
        `Namaste ${lead.fullName}, thank you for your inquiry with Saat Phere Events. We received your request regarding your ${lead.eventType} celebration.`
      )}`
    : `https://wa.me/${SITE_CONFIG.contact.whatsappRaw}`;

  const currentYear = new Date().getFullYear();
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
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Event Inquiry - Saat Phere Events</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #0c0c0c;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #333333;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #0c0c0c;
      padding: 30px 15px;
    }
    .container {
      max-width: 620px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #D4AF37;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    }
    .header {
      background: linear-gradient(135deg, #4A0012 0%, #800020 50%, #2A000A 100%);
      padding: 32px 24px;
      text-align: center;
      border-bottom: 3px solid #D4AF37;
    }
    .brand-title {
      color: #F8F5E9;
      font-size: 24px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin: 0 0 6px 0;
    }
    .brand-subtitle {
      color: #D4AF37;
      font-size: 12px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      margin: 0;
    }
    .alert-banner {
      background-color: #FFFBEB;
      border-left: 4px solid #D4AF37;
      padding: 14px 20px;
      margin: 20px 24px 10px 24px;
      border-radius: 4px;
    }
    .alert-banner p {
      margin: 0;
      font-size: 13px;
      color: #92400E;
      font-weight: 600;
    }
    .content {
      padding: 10px 24px 24px 24px;
    }
    .section-title {
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #800020;
      font-weight: 700;
      border-bottom: 2px solid #F3F4F6;
      padding-bottom: 8px;
      margin-top: 24px;
      margin-bottom: 14px;
    }
    .info-table {
      width: 100%;
      border-collapse: collapse;
    }
    .info-table td {
      padding: 10px 8px;
      font-size: 14px;
      vertical-align: top;
      border-bottom: 1px solid #F3F4F6;
    }
    .info-table td.label {
      width: 38%;
      color: #6B7280;
      font-weight: 600;
    }
    .info-table td.value {
      width: 62%;
      color: #111827;
      font-weight: 500;
    }
    .highlight-value {
      font-weight: 700 !important;
      color: #800020 !important;
    }
    .requirements-box {
      background-color: #F9FAFB;
      border: 1px solid #E5E7EB;
      border-radius: 8px;
      padding: 16px;
      font-size: 14px;
      line-height: 1.6;
      color: #1F2937;
      white-space: pre-wrap;
    }
    .action-container {
      margin: 28px 0 10px 0;
      text-align: center;
    }
    .btn {
      display: inline-block;
      padding: 12px 22px;
      margin: 6px 4px;
      font-size: 13px;
      font-weight: 700;
      text-decoration: none;
      border-radius: 6px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .btn-gold {
      background: linear-gradient(135deg, #D4AF37 0%, #AA8010 100%);
      color: #000000 !important;
      box-shadow: 0 4px 12px rgba(212, 175, 55, 0.35);
    }
    .btn-whatsapp {
      background-color: #25D366;
      color: #FFFFFF !important;
    }
    .btn-outline {
      background-color: #800020;
      color: #FFFFFF !important;
    }
    .footer {
      background-color: #181818;
      padding: 24px;
      text-align: center;
      color: #9CA3AF;
      font-size: 12px;
      line-height: 1.6;
    }
    .footer a {
      color: #D4AF37;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <!-- Royal Header -->
      <div class="header">
        <div style="color: #D4AF37; font-size: 20px; margin-bottom: 6px;">✦ ✦ ✦</div>
        <h1 class="brand-title">Saat Phere Events</h1>
        <p class="brand-subtitle">New Client Lead Dispatch • Executive Notification</p>
      </div>

      <!-- Priority Alert Banner -->
      <div class="alert-banner">
        <p>🚨 URGENT LEAD NOTIFICATION • Reference ID: <strong>#${lead.id || 'NEW-LEAD'}</strong></p>
        <p style="font-weight: 400; font-size: 12px; margin-top: 4px; color: #78350F;">
          Received on: ${istTime}
        </p>
      </div>

      <div class="content">
        <!-- Client Details -->
        <div class="section-title">1. Client Contact Information</div>
        <table class="info-table">
          <tr>
            <td class="label">Full Name</td>
            <td class="value highlight-value">${lead.fullName || 'Not specified'}</td>
          </tr>
          <tr>
            <td class="label">Phone / Mobile</td>
            <td class="value">
              <a href="tel:${lead.phone}" style="color: #800020; font-weight: 700; text-decoration: none;">
                ${lead.phone || 'Not specified'}
              </a>
            </td>
          </tr>
          <tr>
            <td class="label">Email Address</td>
            <td class="value">
              <a href="mailto:${lead.email}" style="color: #1E40AF; text-decoration: underline;">
                ${lead.email || 'Not specified'}
              </a>
            </td>
          </tr>
        </table>

        <!-- Celebration Details -->
        <div class="section-title">2. Celebration Specifications</div>
        <table class="info-table">
          <tr>
            <td class="label">Event Category</td>
            <td class="value highlight-value">${lead.eventType || 'Wedding Planning & Management'}</td>
          </tr>
          <tr>
            <td class="label">Event Date</td>
            <td class="value">${lead.eventDate || 'Not specified'}</td>
          </tr>
          <tr>
            <td class="label">Destination / City</td>
            <td class="value">${lead.eventLocation || 'Not specified'}</td>
          </tr>
          <tr>
            <td class="label">Expected Guests</td>
            <td class="value">${lead.guestCount || 'Not specified'}</td>
          </tr>
          <tr>
            <td class="label">Target Budget</td>
            <td class="value highlight-value">${lead.budgetRange || 'Not specified'}</td>
          </tr>
          ${
            lead.source
              ? `<tr><td class="label">Lead Source</td><td class="value">${lead.source}</td></tr>`
              : ''
          }
        </table>

        <!-- Requirements & Vision -->
        <div class="section-title">3. Requirements &amp; Special Vision</div>
        <div class="requirements-box">
${lead.requirements || 'No additional custom requirements entered.'}
        </div>

        <!-- Immediate Actions for Team -->
        <div class="action-container">
          <a href="tel:${lead.phone}" class="btn btn-gold">
            📞 Call Client Now
          </a>
          <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">
            💬 WhatsApp Client
          </a>
          <a href="mailto:${lead.email}?subject=${encodeURIComponent(
            `Saat Phere Events Consultation | In response to your inquiry #${lead.id}`
          )}" class="btn btn-outline">
            ✉️ Reply via Email
          </a>
        </div>
      </div>

      <!-- Footer -->
      <div class="footer">
        <p style="margin: 0 0 6px 0; color: #FFFFFF; font-weight: 600;">
          Saat Phere Events — Luxury Wedding &amp; Event Management
        </p>
        <p style="margin: 0 0 8px 0;">
          Headquarters: ${SITE_CONFIG.contact.headquarters.street}, ${SITE_CONFIG.contact.headquarters.city}, ${SITE_CONFIG.contact.headquarters.state} – ${SITE_CONFIG.contact.headquarters.postalCode}
        </p>
        <p style="margin: 0;">
          Hotline: <a href="tel:${SITE_CONFIG.contact.phoneRaw}">${SITE_CONFIG.contact.phone}</a> | 
          Official Email: <a href="mailto:saatpherektr@gmail.com">saatpherektr@gmail.com</a> | 
          <a href="${SITE_CONFIG.url}">saatphereevents.com</a>
        </p>
        <p style="margin-top: 12px; font-size: 11px; color: #6B7280;">
          © ${currentYear} Saat Phere Events. All rights reserved. Confidential lead dispatch for internal operations only.
        </p>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Generates plain-text fallback representation of the lead for standard email readers.
 */
export function generateAdminEmailText(lead: Partial<InquiryLead>): string {
  const waNumber = getWhatsAppCleanNumber(lead.phone || '');
  const waLink = waNumber ? `https://wa.me/${waNumber}` : 'N/A';
  const timestamp = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  return `
========================================================================
SAAT PHERE EVENTS - NEW CLIENT INQUIRY NOTIFICATION
========================================================================
A new event inquiry has just been submitted on the website.

REFERENCE CODE:   #${lead.id || 'NEW-LEAD'}
TIMESTAMP:        ${timestamp} IST
REGISTERED TO:    saatpherektr@gmail.com

--- 1. CLIENT CONTACT INFORMATION ---
Full Name:        ${lead.fullName || 'Not specified'}
Phone Number:     ${lead.phone || 'Not specified'}
WhatsApp Direct:  ${waLink}
Email Address:    ${lead.email || 'Not specified'}

--- 2. CELEBRATION SPECIFICATIONS ---
Event Category:   ${lead.eventType || 'Wedding Planning & Management'}
Event Date:       ${lead.eventDate || 'Not specified'}
Location / City:  ${lead.eventLocation || 'Not specified'}
Expected Guests:  ${lead.guestCount || 'Not specified'}
Target Budget:    ${lead.budgetRange || 'Not specified'}
Inquiry Source:   ${lead.source || 'Website Inquiry Form'}

--- 3. CLIENT REQUIREMENTS & VISION ---
${lead.requirements || 'No additional custom requirements entered.'}

========================================================================
ACTION REQUIRED:
Please contact the prospective client via Phone or WhatsApp within 4 to 6 hours.
Direct Phone: tel:${lead.phone}
WhatsApp:     ${waLink}
Reply Email:  mailto:${lead.email}

Saat Phere Events | Katihar HQ: Daulat Ram Chowk, Katihar, Bihar 854105
Phone: ${SITE_CONFIG.contact.phone} | Email: saatpherektr@gmail.com
========================================================================
  `.trim();
}

/**
 * Generates client confirmation email HTML.
 */
export function generateClientConfirmationHtml(lead: Partial<InquiryLead>): string {
  const currentYear = new Date().getFullYear();

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>We Received Your Inquiry - Saat Phere Events</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0C0C0C; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #333333;">
  <div style="width: 100%; padding: 30px 15px; box-sizing: border-box;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #FFFFFF; border-radius: 12px; overflow: hidden; border: 1px solid #D4AF37;">
      
      <div style="background: linear-gradient(135deg, #4A0012 0%, #800020 50%, #2A000A 100%); padding: 32px 24px; text-align: center; border-bottom: 3px solid #D4AF37;">
        <div style="color: #D4AF37; font-size: 18px; margin-bottom: 4px;">✦ ✦ ✦</div>
        <h1 style="color: #FFFFFF; font-size: 24px; margin: 0 0 6px 0; text-transform: uppercase; letter-spacing: 2px;">Saat Phere Events</h1>
        <p style="color: #D4AF37; font-size: 12px; margin: 0; text-transform: uppercase; letter-spacing: 1.5px;">Luxury Wedding &amp; Event Management</p>
      </div>

      <div style="padding: 28px 24px;">
        <h2 style="color: #800020; font-size: 20px; margin-top: 0;">Namaste ${lead.fullName || 'Valued Client'},</h2>
        <p style="font-size: 15px; line-height: 1.6; color: #374151;">
          Thank you for reaching out to <strong>Saat Phere Events</strong> for your upcoming <strong>${lead.eventType || 'celebration'}</strong>. We are honored by your interest in our bespoke celebration and luxury wedding planning services.
        </p>

        <div style="background-color: #FFFBEB; border: 1px solid #FDE68A; border-radius: 8px; padding: 16px; margin: 20px 0;">
          <h3 style="color: #92400E; font-size: 14px; margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: 1px;">Your Inquiry Summary</h3>
          <p style="margin: 4px 0; font-size: 14px; color: #78350F;"><strong>Reference ID:</strong> #${lead.id || 'N/A'}</p>
          <p style="margin: 4px 0; font-size: 14px; color: #78350F;"><strong>Event Category:</strong> ${lead.eventType || 'Wedding Planning'}</p>
          <p style="margin: 4px 0; font-size: 14px; color: #78350F;"><strong>Target Date:</strong> ${lead.eventDate || 'To be finalized'}</p>
          <p style="margin: 4px 0; font-size: 14px; color: #78350F;"><strong>Destination / City:</strong> ${lead.eventLocation || 'Not specified'}</p>
        </div>

        <p style="font-size: 15px; line-height: 1.6; color: #374151;">
          Our Senior Event Concierge and Creative Direction team from our headquarters are currently reviewing your event requirements. A dedicated Event Director will connect with you via Phone / WhatsApp at <strong>${lead.phone}</strong> within <strong>4 to 6 business hours</strong>.
        </p>

        <div style="margin: 24px 0; text-align: center;">
          <a href="https://wa.me/${SITE_CONFIG.contact.whatsappRaw}?text=${encodeURIComponent(
            `Namaste Saat Phere Events, I have submitted an inquiry (#${lead.id}) on your website and would like to speak with a concierge.`
          )}" style="display: inline-block; background-color: #25D366; color: #FFFFFF; font-weight: 700; text-decoration: none; padding: 12px 24px; border-radius: 6px; font-size: 14px;">
            Connect with us on WhatsApp
          </a>
        </div>

        <p style="font-size: 14px; line-height: 1.6; color: #4B5563; margin-bottom: 0;">
          Warm regards,<br>
          <strong>Client Relations &amp; Creative Direction</strong><br>
          Saat Phere Events | Luxury Wedding Planners<br>
          Hotline: ${SITE_CONFIG.contact.phone}
        </p>
      </div>

      <div style="background-color: #181818; padding: 20px; text-align: center; color: #9CA3AF; font-size: 12px;">
        <p style="margin: 0 0 6px 0;">Saat Phere Events • Daulat Ram Chowk, Katihar, Bihar 854105</p>
        <p style="margin: 0;">© ${currentYear} Saat Phere Events. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();
}

/**
 * Main function to send the inquiry details to the registered company email: saatpherektr@gmail.com
 */
export async function sendInquiryNotificationToAdmin(
  lead: Partial<InquiryLead> & { id: string }
): Promise<EmailDispatchResponse> {
  const recipient =
    process.env.ADMIN_ALERT_EMAIL ||
    SITE_CONFIG.contact.email ||
    'saatpherektr@gmail.com';

  const subject = `🚨 [NEW EVENT INQUIRY] ${lead.fullName || 'Prospective Client'} • ${lead.eventType || 'Event'} (${lead.eventLocation || 'City'}) - #${lead.id}`;
  const html = generateAdminEmailHtml(lead);
  const text = generateAdminEmailText(lead);

  const transporter = getMailTransporter();

  // If no SMTP transporter is configured, provide structured diagnostics and gracefully simulate
  if (!transporter) {
    const diagnosticMessage = `[EMAIL NOTIFICATION TO saatpherektr@gmail.com] Transporter not configured. Lead #${lead.id} for "${lead.fullName}" captured. To enable live dispatch, set GMAIL_USER and GMAIL_APP_PASSWORD (or SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS) in .env.local.`;
    console.warn(diagnosticMessage);
    console.log(text);

    return {
      success: true,
      recipient,
      isSimulated: true,
      messageId: `sim_${Date.now()}_${Math.random().toString(36).substring(7)}`,
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
      text,
      html,
    });

    console.log(`[EMAIL DISPATCH SUCCESS] Real inquiry email delivered to ${recipient} (Message ID: ${info.messageId}) for Lead ${lead.id}`);

    return {
      success: true,
      recipient,
      isSimulated: false,
      messageId: info.messageId,
    };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`[EMAIL DISPATCH ERROR] Failed to send email to ${recipient}:`, errorMsg);
    console.log('[FALLBACK LEAD LOG]:', text);

    return {
      success: false,
      recipient,
      error: errorMsg,
    };
  }
}

/**
 * Optional function to send confirmation copy to the client who submitted the inquiry
 */
export async function sendClientConfirmationEmail(
  lead: Partial<InquiryLead> & { id: string }
): Promise<EmailDispatchResponse> {
  if (!lead.email || !lead.email.includes('@')) {
    return {
      success: false,
      recipient: lead.email || '',
      error: 'Invalid recipient email',
    };
  }

  const recipient = lead.email;
  const subject = `Welcome to Saat Phere Events | We Received Your Consultation Request (#${lead.id})`;
  const html = generateClientConfirmationHtml(lead);
  const text = `Namaste ${lead.fullName},\n\nThank you for choosing Saat Phere Events for your upcoming ${lead.eventType}. We received your inquiry (#${lead.id}) and a Senior Event Director will contact you within 4 to 6 business hours.\n\nWarm regards,\nSaat Phere Events\nPhone: ${SITE_CONFIG.contact.phone}\nWhatsApp: https://wa.me/${SITE_CONFIG.contact.whatsappRaw}`;

  const transporter = getMailTransporter();
  if (!transporter) {
    return {
      success: true,
      recipient,
      isSimulated: true,
      messageId: `sim_client_${Date.now()}`,
    };
  }

  try {
    const sender =
      process.env.EMAIL_FROM ||
      `"Saat Phere Events" <${process.env.GMAIL_USER || process.env.SMTP_USER || 'saatpherektr@gmail.com'}>`;

    const info = await transporter.sendMail({
      from: sender,
      to: recipient,
      subject,
      text,
      html,
    });

    return {
      success: true,
      recipient,
      isSimulated: false,
      messageId: info.messageId,
    };
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    console.error(`[CLIENT CONFIRMATION EMAIL ERROR] Failed to send confirmation to ${recipient}:`, errorMsg);
    return {
      success: false,
      recipient,
      error: errorMsg,
    };
  }
}
