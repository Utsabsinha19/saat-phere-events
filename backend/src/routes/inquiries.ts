import { Router, Request, Response } from 'express';
import { inquirySchema } from '@/validations/inquiry';
import { InquiryRepository } from '@/db/store';
import { sendAdminLeadNotification } from '@/email/adminNotification';
import { sendClientInquiryConfirmation } from '@/email/clientConfirmation';
import { convertInquiriesToCsv } from '@/utils/exportCsv';
import { InquiryFilterParams, InquiryStatus, InquiryLead, InquiryCreateInput } from '@/types/inquiry';

const router = Router();

// GET /api/inquiries/export - Download CSV of leads
router.get('/export', async (req: Request, res: Response) => {
  try {
    const status = req.query.status as InquiryStatus | 'All' | undefined;
    const inquiries = await InquiryRepository.getAll({
      status: status && status !== 'All' ? status : undefined,
    });

    const csvData = convertInquiriesToCsv(inquiries);
    const filename = `saat-phere-leads-${new Date().toISOString().split('T')[0]}.csv`;

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    return res.status(200).send(csvData);
  } catch (error) {
    console.error('Error generating CSV export:', error);
    return res.status(500).json({ success: false, error: 'Failed to generate export file' });
  }
});

// GET /api/inquiries - List inquiries with filtering & metrics
router.get('/', async (req: Request, res: Response) => {
  try {
    const status = req.query.status as InquiryStatus | 'All' | undefined;
    const search = (req.query.search as string) || undefined;
    const eventType = (req.query.eventType as string) || undefined;

    const filter: InquiryFilterParams = {
      status: status && status !== 'All' ? status : undefined,
      search,
      eventType,
    };

    const inquiries = await InquiryRepository.getAll(filter);
    const metrics = await InquiryRepository.getMetrics();

    return res.json({
      success: true,
      count: inquiries.length,
      metrics,
      data: inquiries,
    });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return res.status(500).json({ success: false, error: 'Internal server error while fetching inquiries' });
  }
});

// GET /api/inquiries/:id - Fetch single inquiry
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const inquiries = await InquiryRepository.getAll();
    const lead = inquiries.find((item: InquiryLead) => item.id === id);

    if (!lead) {
      return res.status(404).json({ success: false, error: 'Inquiry record not found' });
    }

    return res.json({ success: true, data: lead });
  } catch (error) {
    console.error('Error fetching single inquiry:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch inquiry' });
  }
});

// POST /api/inquiries - Create new inquiry lead
router.post('/', async (req: Request, res: Response) => {
  try {
    const parseResult = inquirySchema.safeParse(req.body);

    if (!parseResult.success) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: parseResult.error.flatten().fieldErrors,
      });
    }

    const validatedData = parseResult.data;
    const newLead = await InquiryRepository.create(validatedData as unknown as InquiryCreateInput);

    // Automated Pipeline per PRD Section 4.1:
    Promise.allSettled([
      sendAdminLeadNotification(newLead),
      sendClientInquiryConfirmation(newLead),
    ]).catch((err) => {
      console.error('Background email dispatch warning:', err);
    });

    return res.status(201).json({
      success: true,
      message: 'Your inquiry has been received. Our senior concierge will contact you shortly.',
      data: newLead,
    });
  } catch (error) {
    console.error('Error processing inquiry:', error);
    return res.status(500).json({ success: false, error: 'Failed to process inquiry submission' });
  }
});

// PATCH /api/inquiries/:id - Update inquiry status or notes
router.patch('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const { status, notes } = req.body;

    const validStatuses: InquiryStatus[] = ['New', 'Contacted', 'Quoted', 'Booked'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status value' });
    }

    const updated = await InquiryRepository.updateStatus(id, status, notes);

    if (!updated) {
      return res.status(404).json({ success: false, error: 'Inquiry record not found' });
    }

    return res.json({
      success: true,
      message: `Lead ${id} updated successfully`,
      data: updated,
    });
  } catch (error) {
    console.error('Error updating inquiry:', error);
    return res.status(500).json({ success: false, error: 'Failed to update inquiry' });
  }
});

// DELETE /api/inquiries/:id - Delete an inquiry
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const deleted = await InquiryRepository.delete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Inquiry record not found' });
    }

    return res.json({
      success: true,
      message: `Lead ${id} deleted successfully`,
    });
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    return res.status(500).json({ success: false, error: 'Failed to delete inquiry' });
  }
});

export default router;
