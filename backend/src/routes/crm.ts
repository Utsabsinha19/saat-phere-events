import { Router, Request, Response } from 'express';
import { CrmRepository } from '@/db/store';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const logs = await CrmRepository.getLogs();
    const stats = await CrmRepository.getStats();

    return res.json({
      success: true,
      stats,
      logs,
    });
  } catch (error) {
    console.error('Error fetching CRM logs:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch CRM logs' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const { recipientName, phone, sequenceType, contentSnippet } = req.body;

    if (!recipientName || !phone || !sequenceType) {
      return res.status(400).json({
        success: false,
        error: 'Recipient name, phone, and sequence type are required',
      });
    }

    const messageLog = await CrmRepository.dispatchMessage(
      recipientName,
      phone,
      sequenceType,
      contentSnippet || `Notification from Saat Phere Events Concierge for ${recipientName}.`
    );

    return res.json({
      success: true,
      message: 'WhatsApp notification dispatched via Meta Business API Gateway',
      data: messageLog,
    });
  } catch (error) {
    console.error('Error dispatching WhatsApp CRM message:', error);
    return res.status(500).json({ success: false, error: 'Failed to dispatch message' });
  }
});

export default router;
