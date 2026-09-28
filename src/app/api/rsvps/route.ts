import { NextRequest, NextResponse } from 'next/server';
import { RsvpRepository } from '@/lib/db/store';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const eventId = searchParams.get('eventId') || 'evt-udaipur-101';

    const guests = await RsvpRepository.getAll(eventId);
    const stats = await RsvpRepository.getStats(eventId);

    return NextResponse.json({
      success: true,
      stats,
      guests,
    });
  } catch (error) {
    console.error('Error fetching RSVP guests:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch RSVP guests' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.guestName || !body.phone) {
      return NextResponse.json(
        { success: false, error: 'Guest name and phone number are required' },
        { status: 400 }
      );
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

    return NextResponse.json({
      success: true,
      message: 'Guest added successfully',
      data: newGuest,
    });
  } catch (error) {
    console.error('Error adding RSVP guest:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to add guest' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, rsvpStatus, roomNumber } = body;

    if (!id || !rsvpStatus) {
      return NextResponse.json(
        { success: false, error: 'Guest ID and rsvpStatus are required' },
        { status: 400 }
      );
    }

    const updated = await RsvpRepository.updateStatus(id, rsvpStatus, roomNumber);
    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Guest record not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Guest RSVP updated',
      data: updated,
    });
  } catch (error) {
    console.error('Error updating RSVP:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update RSVP' },
      { status: 500 }
    );
  }
}
