import { Router, Request, Response } from 'express';
import { ServiceRepository } from '@/db/store';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const slug = req.query.slug as string | undefined;

    if (slug) {
      const service = await ServiceRepository.getBySlug(slug);
      if (!service) {
        return res.status(404).json({ success: false, error: 'Service category not found' });
      }
      return res.json({ success: true, data: service });
    }

    const services = await ServiceRepository.getAll();
    return res.json({ success: true, count: services.length, data: services });
  } catch (error) {
    console.error('Error fetching services:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch services' });
  }
});

export default router;
