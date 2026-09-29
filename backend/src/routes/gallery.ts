import { Router, Request, Response } from 'express';
import { GalleryRepository } from '@/db/store';
import { GalleryCategory } from '@/types/gallery';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const category = req.query.category as GalleryCategory | undefined;
    const items = await GalleryRepository.getAll(category || undefined);

    return res.json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch gallery items' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const body = req.body;
    if (!body.title || !body.imageUrl || !body.category) {
      return res.status(400).json({ success: false, error: 'Title, Image URL, and Category are required' });
    }

    const newItem = await GalleryRepository.create({
      title: body.title,
      category: body.category,
      type: body.type || 'image',
      imageUrl: body.imageUrl,
      videoUrl: body.videoUrl,
      location: body.location || 'Jaipur, Rajasthan',
      eventDate: body.eventDate || new Date().toISOString().split('T')[0],
      featured: body.featured ?? false,
      description: body.description,
    });

    return res.status(201).json({
      success: true,
      message: 'Gallery item uploaded successfully',
      data: newItem,
    });
  } catch (error) {
    console.error('Error creating gallery item:', error);
    return res.status(500).json({ success: false, error: 'Failed to create gallery item' });
  }
});

export default router;
