import { NextRequest, NextResponse } from 'next/server';
import { FintechRepository } from '@/lib/db/store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { eventId = 'evt-udaipur-101', amount, title, isInterstate = false } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { success: false, error: 'A valid payment amount is required' },
        { status: 400 }
      );
    }

    const { orderId, invoice } = await FintechRepository.createOrder(
      eventId,
      Number(amount),
      title || 'Saat Phere Milestone Production Advance',
      Boolean(isInterstate)
    );

    return NextResponse.json({
      success: true,
      message: 'Razorpay / Cashfree order initiated with 18% GST calculation',
      order_id: orderId,
      currency: 'INR',
      amount: invoice.totalAmount,
      invoice,
    });
  } catch (error) {
    console.error('Error creating payment order:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create payment order' },
      { status: 500 }
    );
  }
}
