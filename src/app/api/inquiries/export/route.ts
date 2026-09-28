import { NextRequest, NextResponse } from 'next/server';
import { InquiryRepository } from '@/lib/db/store';
import { convertInquiriesToCsv } from '@/lib/utils/exportCsv';
import { InquiryStatus } from '@/types/inquiry';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') as InquiryStatus | 'All' | null;

    const inquiries = await InquiryRepository.getAll({
      status: status || undefined,
    });

    const csvData = convertInquiriesToCsv(inquiries);
    const filename = `saat-phere-leads-${new Date().toISOString().split('T')[0]}.csv`;

    return new NextResponse(csvData, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Error generating CSV export:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to generate export file' },
      { status: 500 }
    );
  }
}
