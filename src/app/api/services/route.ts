import { NextRequest, NextResponse } from 'next/server';
import { ServiceRepository } from '@/lib/db/store';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (slug) {
      const service = await ServiceRepository.getBySlug(slug);
      if (!service) {
        return NextResponse.json(
          { success: false, error: 'Service category not found' },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: service });
    }

    const services = await ServiceRepository.getAll();
    return NextResponse.json({ success: true, count: services.length, data: services });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch services' },
      { status: 500 }
    );
  }
}
