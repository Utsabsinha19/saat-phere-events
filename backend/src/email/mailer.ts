import nodemailer, { type Transporter } from 'nodemailer';
import { SITE_CONFIG } from '@/config/site';

/**
 * Creates and returns configured Nodemailer transporter for backend services.
 */
export function getBackendMailTransporter(): Transporter | null {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : undefined;
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;

  const user = process.env.GMAIL_USER || process.env.SMTP_USER;
  const pass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS || process.env.SMTP_PASSWORD;

  // Custom SMTP
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

  // Gmail / Google Workspace SMTP
  if (user && pass) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    });
  }

  return null;
}

/**
 * Clean phone number to generate international WhatsApp link
 */
export function getCleanWhatsApp(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('91') && digits.length === 12) return digits;
  if (digits.length === 10) return `91${digits}`;
  return digits;
}
