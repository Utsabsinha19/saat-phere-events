import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const id = `SPE-LEAD-${Date.now().toString().slice(-4)}${Math.floor(10 + Math.random() * 90)}`;
    const newLead = {
      id,
      ...body,
      status: 'New',
      createdAt: new Date().toISOString(),
      source: 'Website Quote Engine',
    };

    // If backend URL is set and accessible, forward the lead
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
    try {
      await fetch(`${backendUrl}/api/inquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(1500),
      }).catch(() => null);
    } catch {
      // Backend not running locally is normal in frontend standalone mode
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry received successfully',
      data: newLead,
    });
  } catch (error) {
    console.error('Error handling inquiry submission:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to record quote inquiry' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'Saat Phere Events Inquiry Engine Ready',
  });
}
