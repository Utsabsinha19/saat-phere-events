import { NextRequest, NextResponse } from 'next/server';
import { InquiryRepository } from '@/lib/db/store';
import { InquiryStatus } from '@/types/inquiry';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status, notes } = body;

    const validStatuses: InquiryStatus[] = ['New', 'Contacted', 'Quoted', 'Booked'];
    if (status && !validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status value' },
        { status: 400 }
      );
    }

    const updated = await InquiryRepository.updateStatus(id, status, notes);

    if (!updated) {
      return NextResponse.json(
        { success: false, error: 'Inquiry record not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Lead ${id} updated successfully`,
      data: updated,
    });
  } catch (error) {
    console.error('Error updating inquiry:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update inquiry' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const deleted = await InquiryRepository.delete(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Inquiry record not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Lead ${id} deleted successfully`,
    });
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete inquiry' },
      { status: 500 }
    );
  }
}
