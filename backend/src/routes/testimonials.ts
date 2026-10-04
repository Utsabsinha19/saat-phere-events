import { Router, Request, Response } from 'express';
import { TestimonialRepository } from '@/db/store';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const featuredOnly = req.query.featured === 'true';
    const items = await TestimonialRepository.getAll(featuredOnly);

    return res.json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch testimonials' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const body = req.body;
    if (!body.clientNames || !body.reviewText) {
      return res.status(400).json({ success: false, error: 'Client name and review text are required' });
    }

    const item = await TestimonialRepository.create({
      clientNames: body.clientNames,
      eventType: body.eventType || 'Luxury Wedding',
      weddingLocation: body.weddingLocation || 'Rajasthan',
      reviewText: body.reviewText,
      rating: Number(body.rating) || 5,
      avatarUrl: body.avatarUrl || '/images/testimonials/avatar-ishika-agarwal.jpg',
      venueImage: body.venueImage || '/images/real-events/stage-decor-1.webp',
      eventDate: body.eventDate || new Date().toISOString().split('T')[0],
      featured: body.featured ?? false,
      verified: true,
    });

    return res.status(201).json({
      success: true,
      message: 'Testimonial added successfully',
      data: item,
    });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return res.status(500).json({ success: false, error: 'Failed to create testimonial' });
  }
});

export default router;
