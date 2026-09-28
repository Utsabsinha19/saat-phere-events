import { NextResponse } from 'next/server';
import { SITE_CONFIG } from '@/config/site';

export async function GET() {
  return NextResponse.json({
    status: 'healthy',
    system: 'Saat Phere Events Enterprise Engine',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    features: {
      leadPipeline: 'active',
      quotationEngine: 'active',
      galleryLightbox: 'active',
      adminCms: 'active',
      phase2PaymentsModule: 'ready',
      phase2ClientPortal: 'ready',
    },
    contact: {
      concierge: SITE_CONFIG.contact.email,
      phone: SITE_CONFIG.contact.phone,
    },
  });
}
