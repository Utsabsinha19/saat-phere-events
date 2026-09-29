import { Router } from 'express';
import healthRouter from './health';
import inquiriesRouter from './inquiries';
import quotesRouter from './quotes';
import galleryRouter from './gallery';
import testimonialsRouter from './testimonials';
import servicesRouter from './services';
import vendorsRouter from './vendors';
import branchesRouter from './branches';
import rsvpsRouter from './rsvps';
import crmRouter from './crm';
import paymentsRouter from './payments';
import v1ClientRouter from './v1/client';
import v1EnterpriseRouter from './v1/enterprise';

const router = Router();

router.use('/health', healthRouter);
router.use('/inquiries', inquiriesRouter);
router.use('/quotes', quotesRouter);
router.use('/gallery', galleryRouter);
router.use('/testimonials', testimonialsRouter);
router.use('/services', servicesRouter);
router.use('/vendors', vendorsRouter);
router.use('/branches', branchesRouter);
router.use('/rsvps', rsvpsRouter);
router.use('/crm', crmRouter);
router.use('/payments', paymentsRouter);
router.use('/v1/client', v1ClientRouter);
router.use('/v1/enterprise', v1EnterpriseRouter);

export default router;
