import { NextRequest, NextResponse } from 'next/server';
import { inquirySchema } from '@/lib/validations/inquiry';
import { InquiryRepository } from '@/lib/db/store';
import { sendAdminLeadNotification } from '@/lib/email/adminNotification';
import { sendClientInquiryConfirmation } from '@/lib/email/clientConfirmation';
import { InquiryFilterParams, InquiryStatus } from '@/types/inquiry';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') as InquiryStatus | 'All' | null;
    const search = searchParams.get('search') || undefined;
    const eventType = searchParams.get('eventType') || undefined;

    const filter: InquiryFilterParams = {
      status: status || undefined,
      search,
      eventType,
    };

    const inquiries = await InquiryRepository.getAll(filter);
    const metrics = await InquiryRepository.getMetrics();

    return NextResponse.json({
      success: true,
      count: inquiries.length,
      metrics,
      data: inquiries,
    });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error while fetching inquiries' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = inquirySchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: parseResult.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const validatedData = parseResult.data;
    const newLead = await InquiryRepository.create(validatedData);

    // Automated Pipeline per PRD Section 4.1:
    // 1. Dispatch Admin Alert to info@saatphereevents.com
    // 2. Dispatch Client Confirmation Email
    Promise.allSettled([
      sendAdminLeadNotification(newLead),
      sendClientInquiryConfirmation(newLead),
    ]).catch((err) => {
      console.error('Background email dispatch warning:', err);
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Your inquiry has been received. Our senior concierge will contact you shortly.',
        data: newLead,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error processing inquiry:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process inquiry submission' },
      { status: 500 }
    );
  }
}
