import { NextRequest, NextResponse } from 'next/server';
import { FintechRepository } from '@/lib/db/store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const event = body.event || 'payment.captured';
    const paymentEntity = body.payload?.payment?.entity || body;

    const razorpayOrderId = paymentEntity.order_id || body.order_id;
    const razorpayPaymentId = paymentEntity.id || body.payment_id || `pay_${Date.now()}`;

    if (!razorpayOrderId) {
      return NextResponse.json(
        { success: false, error: 'order_id is required in webhook payload' },
        { status: 400 }
      );
    }

    const updatedInvoice = await FintechRepository.capturePayment(
      razorpayOrderId,
      razorpayPaymentId
    );

    if (!updatedInvoice) {
      return NextResponse.json(
        { success: false, error: 'Invoice matching order_id not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      event,
      message: 'Payment captured and GST invoice receipt generated',
      invoice: updatedInvoice,
    });
  } catch (error) {
    console.error('Error handling payment webhook:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process payment webhook' },
      { status: 500 }
    );
  }
}
