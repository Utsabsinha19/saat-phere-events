import { NextRequest, NextResponse } from 'next/server';
import { CrmRepository } from '@/lib/db/store';

export async function GET() {
  try {
    const logs = await CrmRepository.getLogs();
    const stats = await CrmRepository.getStats();

    return NextResponse.json({
      success: true,
      stats,
      logs,
    });
  } catch (error) {
    console.error('Error fetching CRM logs:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch CRM logs' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { recipientName, phone, sequenceType, contentSnippet } = body;

    if (!recipientName || !phone || !sequenceType) {
      return NextResponse.json(
        { success: false, error: 'Recipient name, phone, and sequence type are required' },
        { status: 400 }
      );
    }

    const messageLog = await CrmRepository.dispatchMessage(
      recipientName,
      phone,
      sequenceType,
      contentSnippet || `Notification from Saat Phere Events Concierge for ${recipientName}.`
    );

    return NextResponse.json({
      success: true,
      message: 'WhatsApp notification dispatched via Meta Business API Gateway',
      data: messageLog,
    });
  } catch (error) {
    console.error('Error dispatching WhatsApp CRM message:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to dispatch message' },
      { status: 500 }
    );
  }
}
