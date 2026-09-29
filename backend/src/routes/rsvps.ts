import { Router, Request, Response } from 'express';
import { RsvpRepository } from '@/db/store';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const eventId = (req.query.eventId as string) || 'evt-udaipur-101';

    const guests = await RsvpRepository.getAll(eventId);
    const stats = await RsvpRepository.getStats(eventId);

    return res.json({
      success: true,
      stats,
      guests,
    });
  } catch (error) {
    console.error('Error fetching RSVP guests:', error);
    return res.status(500).json({ success: false, error: 'Failed to fetch RSVP guests' });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const body = req.body;
    if (!body.guestName || !body.phone) {
      return res.status(400).json({ success: false, error: 'Guest name and phone number are required' });
    }

    const newGuest = await RsvpRepository.addGuest({
      eventId: body.eventId || 'evt-udaipur-101',
      guestName: body.guestName,
      groupTag: body.groupTag || 'Friends & Colleagues',
      phone: body.phone,
      email: body.email || '',
      totalAttendees: Number(body.totalAttendees) || 1,
      rsvpStatus: body.rsvpStatus || 'Confirmed',
      dietaryPreference: body.dietaryPreference || 'Pure Vegetarian',
      hotelAllocated: body.hotelAllocated || 'The Oberoi Udaivilas',
      roomNumber: body.roomNumber,
      flightArrival: body.flightArrival,
      whatsappInviteSent: true,
      notes: body.notes,
    });

    return res.json({
      success: true,
      message: 'Guest added successfully',
      data: newGuest,
    });
  } catch (error) {
    console.error('Error adding RSVP guest:', error);
    return res.status(500).json({ success: false, error: 'Failed to add guest' });
  }
});

router.patch('/', async (req: Request, res: Response) => {
  try {
    const { id, rsvpStatus, roomNumber } = req.body;

    if (!id || !rsvpStatus) {
      return res.status(400).json({ success: false, error: 'Guest ID and rsvpStatus are required' });
    }

    const updated = await RsvpRepository.updateStatus(id, rsvpStatus, roomNumber);
    if (!updated) {
      return res.status(404).json({ success: false, error: 'Guest record not found' });
    }

    return res.json({
      success: true,
      message: 'Guest RSVP updated',
      data: updated,
    });
  } catch (error) {
    console.error('Error updating RSVP:', error);
    return res.status(500).json({ success: false, error: 'Failed to update RSVP' });
  }
});

export default router;
