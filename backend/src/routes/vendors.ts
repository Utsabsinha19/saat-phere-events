import { Router, Request, Response } from 'express';
import { VendorRepository } from '@/db/store';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const vendors = await VendorRepository.getAll();
    const rfps = await VendorRepository.getRfps();
    const pos = await VendorRepository.getPurchaseOrders();

    return res.json({
      success: true,
      vendors,
      rfps,
      purchaseOrders: pos,
    });
  } catch (error) {
    console.error('Error fetching vendors data:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch vendors data' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const body = req.body;
    if (!body.title || !body.category || !body.destination) {
      return res.status(400).json({ success: false, error: 'Title, category, and destination are required' });
    }

    const newRfp = await VendorRepository.createRfp({
      title: body.title,
      category: body.category,
      destination: body.destination,
      eventDates: body.eventDates || 'TBD',
      scopeDescription: body.scopeDescription || '',
      deadline: body.deadline || new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
      status: 'Open',
    });

    return res.json({
      success: true,
      message: 'RFP published to vendor network',
      data: newRfp,
    });
  } catch (error) {
    console.error('Error creating RFP:', error);
    return res.status(500).json({ success: false, error: 'Failed to create RFP' });
  }
});

router.patch('/', async (req: Request, res: Response) => {
  try {
    const { action, poId, milestoneIndex } = req.body;

    if (action === 'release-milestone') {
      if (!poId || milestoneIndex === undefined) {
        return res.status(400).json({ success: false, error: 'poId and milestoneIndex are required' });
      }

      const updatedPo = await VendorRepository.releaseMilestone(poId, Number(milestoneIndex));
      if (!updatedPo) {
        return res.status(404).json({ success: false, error: 'PO or milestone index not found' });
      }

      return res.json({
        success: true,
        message: 'Milestone escrow payment successfully released to vendor bank',
        data: updatedPo,
      });
    }

    return res.status(400).json({ success: false, error: 'Unknown action' });
  } catch (error) {
    console.error('Error updating vendor data:', error);
    return res.status(500).json({ success: false, error: 'Failed to process vendor update' });
  }
});

export default router;
