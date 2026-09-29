import { Router, Request, Response } from 'express';
import { FintechRepository } from '@/db/store';

const router = Router();

router.post('/create-order', async (req: Request, res: Response) => {
  try {
    const { eventId = 'evt-udaipur-101', amount, title, isInterstate = false } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ success: false, error: 'A valid payment amount is required' });
    }

    const { orderId, invoice } = await FintechRepository.createOrder(
      eventId,
      Number(amount),
      title || 'Saat Phere Milestone Production Advance',
      Boolean(isInterstate)
    );

    return res.json({
      success: true,
      message: 'Razorpay / Cashfree order initiated with 18% GST calculation',
      order_id: orderId,
      currency: 'INR',
      amount: invoice.totalAmount,
      invoice,
    });
  } catch (error) {
    console.error('Error creating payment order:', error);
    return res.status(500).json({ success: false, error: 'Failed to create payment order' });
  }
});

router.post('/webhook', async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const event = body.event || 'payment.captured';
    const paymentEntity = body.payload?.payment?.entity || body;

    const razorpayOrderId = paymentEntity.order_id || body.order_id;
    const razorpayPaymentId = paymentEntity.id || body.payment_id || `pay_${Date.now()}`;

    if (!razorpayOrderId) {
      return res.status(400).json({ success: false, error: 'order_id is required in webhook payload' });
    }

    const updatedInvoice = await FintechRepository.capturePayment(
      razorpayOrderId,
      razorpayPaymentId
    );

    if (!updatedInvoice) {
      return res.status(404).json({ success: false, error: 'Invoice matching order_id not found' });
    }

    return res.json({
      success: true,
      event,
      message: 'Payment captured and GST invoice receipt generated',
      invoice: updatedInvoice,
    });
  } catch (error) {
    console.error('Error handling payment webhook:', error);
    return res.status(500).json({ success: false, error: 'Failed to process payment webhook' });
  }
});

export default router;
