import { NextRequest, NextResponse } from 'next/server';
import { EnterpriseRepository } from '@/lib/db/store';

export async function GET() {
  try {
    const concepts = await EnterpriseRepository.getDecorConcepts();
    return NextResponse.json({ success: true, concepts });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch decor concepts' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { prompt } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ success: false, error: 'A valid text prompt is required' }, { status: 400 });
    }

    const concept = await EnterpriseRepository.generateDecorConcept(prompt);
    return NextResponse.json({
      success: true,
      concept,
      message: '3D Spatial Decor Concept successfully synthesized with procedural WebGL parameters.',
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to generate decor concept' }, { status: 500 });
  }
}
