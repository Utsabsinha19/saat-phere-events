import { Router, Request, Response } from 'express';
import { BranchRepository } from '@/db/store';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const branches = await BranchRepository.getAll();
    const totals = await BranchRepository.getTotals();

    return res.json({
      success: true,
      branches,
      totals,
    });
  } catch (error) {
    console.error('Error fetching branches:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch branch data' });
  }
});

export default router;
