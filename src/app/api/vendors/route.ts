import { NextRequest, NextResponse } from 'next/server';
import { VendorRepository } from '@/lib/db/store';

export async function GET() {
  try {
    const vendors = await VendorRepository.getAll();
    const rfps = await VendorRepository.getRfps();
    const pos = await VendorRepository.getPurchaseOrders();

    return NextResponse.json({
      success: true,
      vendors,
      rfps,
      purchaseOrders: pos,
    });
  } catch (error) {
    console.error('Error fetching vendors data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch vendors data' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.title || !body.category || !body.destination) {
      return NextResponse.json(
        { success: false, error: 'Title, category, and destination are required' },
        { status: 400 }
      );
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

    return NextResponse.json({
      success: true,
      message: 'RFP published to vendor network',
      data: newRfp,
    });
  } catch (error) {
    console.error('Error creating RFP:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create RFP' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, poId, milestoneIndex } = body;

    if (action === 'release-milestone') {
      if (!poId || milestoneIndex === undefined) {
        return NextResponse.json(
          { success: false, error: 'poId and milestoneIndex are required' },
          { status: 400 }
        );
      }

      const updatedPo = await VendorRepository.releaseMilestone(poId, Number(milestoneIndex));
      if (!updatedPo) {
        return NextResponse.json(
          { success: false, error: 'PO or milestone index not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        message: 'Milestone escrow payment successfully released to vendor bank',
        data: updatedPo,
      });
    }

    return NextResponse.json(
      { success: false, error: 'Unknown action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error updating vendor data:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process vendor update' },
      { status: 500 }
    );
  }
}
