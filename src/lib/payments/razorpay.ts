export interface TokenDepositOrderRequest {
  bookingId: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  amount: number; // in INR
  currency: 'INR';
  description: string;
  notes?: Record<string, string>;
}

export interface PaymentTransactionRecord {
  transactionId: string;
  orderId: string;
  bookingId: string;
  amount: number;
  gstAmount: number;
  netAmount: number;
  status: 'PENDING' | 'AUTHORIZED' | 'CAPTURED' | 'FAILED' | 'REFUNDED';
  paymentGateway: 'Razorpay' | 'Cashfree';
  invoiceNumber: string;
  createdAt: string;
}

export async function createTokenDepositOrder(
  request: TokenDepositOrderRequest
): Promise<{ orderId: string; keyId: string; amount: number; currency: string }> {
  // Enterprise Phase 2 Razorpay / Cashfree integration stub
  const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(7)}`;
  const keyId = process.env.RAZORPAY_KEY_ID || 'rzp_test_saatphereevents';

  return {
    orderId,
    keyId,
    amount: request.amount * 100, // paise
    currency: request.currency,
  };
}

export function generateGSTInvoiceMetadata(amount: number, clientGstin?: string) {
  const gstRate = 0.18; // 18% Event Management GST in India
  const taxableAmount = amount / (1 + gstRate);
  const gstAmount = amount - taxableAmount;
  const cgst = gstAmount / 2;
  const sgst = gstAmount / 2;

  return {
    invoiceNumber: `SPE-INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    taxableAmount: Math.round(taxableAmount * 100) / 100,
    cgst: Math.round(cgst * 100) / 100,
    sgst: Math.round(sgst * 100) / 100,
    totalGst: Math.round(gstAmount * 100) / 100,
    totalPayable: amount,
    clientGstin: clientGstin || 'B2C-CONSUMER',
    hsnSacCode: '998596', // Event management service SAC code
  };
}
