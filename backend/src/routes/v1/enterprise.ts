import { Router, Request, Response } from 'express';
import { EnterpriseRepository } from '@/db/store';
import { SupportedCurrency } from '@/types/enterprise';

const router = Router();

// --- Live Orchestrator ---
router.get('/orchestrator', async (req: Request, res: Response) => {
  try {
    const checkpoints = await EnterpriseRepository.getCheckpoints();
    const alerts = await EnterpriseRepository.getCrewAlerts();
    return res.json({
      success: true,
      checkpoints,
      alerts,
      activeEvent: 'Singhania & Rao Royal Wedding (Jagmandir, Udaipur)',
      systemStatus: 'AI Event Copilot Active - Real-time Checkpoints Tracking',
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to fetch orchestrator data' });
  }
});

router.post('/orchestrator/delay', async (req: Request, res: Response) => {
  try {
    const { checkpointId, delayMinutes, reason } = req.body;

    if (!checkpointId || !delayMinutes) {
      return res.status(400).json({ success: false, error: 'checkpointId and delayMinutes are required' });
    }

    const result = await EnterpriseRepository.injectDelay(
      checkpointId,
      Number(delayMinutes),
      reason || 'Ceremony pacing adjustment'
    );

    if (!result) {
      return res.status(404).json({ success: false, error: 'Checkpoint not found' });
    }

    return res.json({
      success: true,
      checkpoint: result.checkpoint,
      alert: result.alert,
      message: `Delay of ${delayMinutes} mins recorded. Downstream kitchen plating & artist cues automatically recalibrated.`,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to inject delay' });
  }
});

// --- Smart Check-In ---
router.get('/checkin/scan', async (req: Request, res: Response) => {
  try {
    const guests = await EnterpriseRepository.getSmartCheckIns();
    return res.json({ success: true, guests });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to fetch check-in list' });
  }
});

router.post('/checkin/scan', async (req: Request, res: Response) => {
  try {
    const { qrCode } = req.body;

    if (!qrCode) {
      return res.status(400).json({ success: false, error: 'qrCode or guest RFID is required' });
    }

    const guest = await EnterpriseRepository.scanCheckIn(qrCode);

    if (!guest) {
      return res.status(404).json({ success: false, error: 'Digital Pass / QR Code not recognized in guest registry' });
    }

    return res.json({
      success: true,
      guest,
      message: `Royal Check-In Successful! Keycard issued for ${guest.assignedSuite}. Welcome hamper dispatched.`,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to process smart check-in' });
  }
});

// --- Crew Hub ---
router.get('/crew/tasks', async (req: Request, res: Response) => {
  try {
    const tasks = await EnterpriseRepository.getCrewTasks();
    const broadcasts = await EnterpriseRepository.getEmergencyBroadcasts();
    return res.json({ success: true, tasks, broadcasts });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to fetch crew operational data' });
  }
});

router.post('/crew/tasks', async (req: Request, res: Response) => {
  try {
    const { taskId, status, supervisorSignOff, supervisorName } = req.body;

    if (!taskId || !status) {
      return res.status(400).json({ success: false, error: 'taskId and status are required' });
    }

    const updatedTask = await EnterpriseRepository.updateCrewTask(taskId, status, supervisorSignOff, supervisorName);

    if (!updatedTask) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }

    return res.json({
      success: true,
      task: updatedTask,
      message: 'Crew task status updated and synced across all mobile operational feeds.',
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to update crew task' });
  }
});

// --- Fintech & FX ---
router.get('/fintech/fx-rates', async (req: Request, res: Response) => {
  try {
    const targetCurrency = (req.query.currency || 'USD') as SupportedCurrency;

    const allLocks = await EnterpriseRepository.getFxLocks();
    const specificLock = await EnterpriseRepository.requestFxLock(targetCurrency);
    const gstConfigs = await EnterpriseRepository.getGstConfigs();
    const escrowReleases = await EnterpriseRepository.getEscrowReleases();

    return res.json({
      success: true,
      currentLock: specificLock,
      allLocks,
      gstConfigs,
      escrowReleases,
      guaranteeNotice: 'FX rates locked for 48 hours under Stripe Global Treasury & Razorpay International underwriting.',
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to fetch FX rates' });
  }
});

router.post('/fintech/escrow-release', async (req: Request, res: Response) => {
  try {
    const { releaseId } = req.body;

    if (!releaseId) {
      return res.status(400).json({ success: false, error: 'releaseId is required' });
    }

    const updatedRelease = await EnterpriseRepository.releaseVendorEscrow(releaseId);

    if (!updatedRelease) {
      return res.status(404).json({ success: false, error: 'Escrow release record not found' });
    }

    return res.json({
      success: true,
      release: updatedRelease,
      message: `Escrow release of ₹${updatedRelease.allocatedAmount.toLocaleString('en-IN')} approved and dispatched to ${updatedRelease.vendorName}.`,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to release escrow' });
  }
});

// --- Franchise & Concierge ---
router.get('/franchise', async (req: Request, res: Response) => {
  try {
    const branches = await EnterpriseRepository.getFranchiseBranches();
    const referrals = await EnterpriseRepository.getConciergeReferrals();
    return res.json({ success: true, branches, referrals });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to fetch franchise data' });
  }
});

router.post('/franchise', async (req: Request, res: Response) => {
  try {
    const { hotelName, conciergeDirector, clientName, clientOrigin, destinationCity, estimatedBudgetInr } = req.body;

    if (!hotelName || !conciergeDirector || !clientName || !estimatedBudgetInr) {
      return res.status(400).json({ success: false, error: 'All referral fields are required' });
    }

    const referral = await EnterpriseRepository.submitConciergeReferral({
      hotelName,
      conciergeDirector,
      clientName,
      clientOrigin: clientOrigin || 'London, UK',
      destinationCity: destinationCity || 'Udaipur',
      estimatedBudgetInr: Number(estimatedBudgetInr),
    });

    return res.json({
      success: true,
      referral,
      message: `Concierge referral logged. 5.0% commission (₹${referral.potentialPayoutInr.toLocaleString('en-IN')}) earmarked upon contract execution.`,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to register concierge referral' });
  }
});

// --- Spatial Studio ---
router.get('/spatial/decor', async (req: Request, res: Response) => {
  try {
    const concepts = await EnterpriseRepository.getDecorConcepts();
    return res.json({ success: true, concepts });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to fetch decor concepts' });
  }
});

router.post('/spatial/decor', async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;

    if (!prompt || typeof prompt !== 'string') {
      return res.status(400).json({ success: false, error: 'A valid text prompt is required' });
    }

    const concept = await EnterpriseRepository.generateDecorConcept(prompt);
    return res.json({
      success: true,
      concept,
      message: '3D Spatial Decor Concept successfully synthesized with procedural WebGL parameters.',
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to generate decor concept' });
  }
});

router.get('/spatial/seating', async (req: Request, res: Response) => {
  try {
    const tables = await EnterpriseRepository.getSeatingTables();
    return res.json({ success: true, tables });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to fetch seating tables' });
  }
});

router.post('/spatial/seating', async (req: Request, res: Response) => {
  try {
    const { action, guestId, targetTableId } = req.body;

    if (action === 'optimize') {
      const result = await EnterpriseRepository.optimizeSeatingMatrix();
      return res.json({
        success: true,
        tables: result.tables,
        summary: result.optimizationSummary,
        harmonyScore: result.harmonyScore,
      });
    }

    if (action === 'reassign' && guestId && targetTableId) {
      const tables = await EnterpriseRepository.reassignGuest(guestId, targetTableId);
      return res.json({
        success: true,
        tables,
        message: 'Guest seat reassigned successfully.',
      });
    }

    return res.status(400).json({ success: false, error: 'Invalid action' });
  } catch (error) {
    return res.status(500).json({ success: false, error: 'Failed to process seating action' });
  }
});

export default router;
