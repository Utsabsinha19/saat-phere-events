import { NextRequest, NextResponse } from 'next/server';
import { RsvpRepository } from '@/lib/db/store';
import { RsvpStatus, DietaryPreference } from '@/types/rsvp';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { guestId, rsvpStatus, dietaryPreference, roomAssigned, notes } = body;

    if (!guestId || !rsvpStatus) {
      return NextResponse.json(
        { success: false, error: 'guestId and rsvpStatus are required' },
        { status: 400 }
      );
    }

    const updated = await RsvpRepository.updateStatus(
      guestId,
      rsvpStatus as RsvpStatus,
      roomAssigned
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Guest not found' },
        { status: 404 }
      );
    }

    if (dietaryPreference) {
      updated.dietaryPreference = dietaryPreference as DietaryPreference;
    }
    if (notes) {
      updated.notes = notes;
    }

    return NextResponse.json({
      success: true,
      message: 'RSVP response successfully recorded! See you at the celebration.',
      data: updated,
    });
  } catch (error) {
    console.error('Error in rsvp/update:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to record RSVP response' },
      { status: 500 }
    );
  }
}
