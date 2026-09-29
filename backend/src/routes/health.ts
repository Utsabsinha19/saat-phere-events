import { Router, Request, Response } from 'express';
import { SITE_CONFIG } from '@/config/site';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  return res.json({
    status: 'healthy',
    system: 'Saat Phere Events Enterprise Backend Service',
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
      enterpriseOrchestrator: 'active',
    },
    contact: {
      concierge: SITE_CONFIG.contact.email,
      phone: SITE_CONFIG.contact.phone,
    },
  });
});

export default router;
