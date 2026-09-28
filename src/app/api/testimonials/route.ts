import { NextRequest, NextResponse } from 'next/server';
import { TestimonialRepository } from '@/lib/db/store';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const featuredOnly = searchParams.get('featured') === 'true';

    const items = await TestimonialRepository.getAll(featuredOnly);

    return NextResponse.json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch testimonials' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.clientNames || !body.reviewText) {
      return NextResponse.json(
        { success: false, error: 'Client name and review text are required' },
        { status: 400 }
      );
    }

    const item = await TestimonialRepository.create({
      clientNames: body.clientNames,
      eventType: body.eventType || 'Luxury Wedding',
      weddingLocation: body.weddingLocation || 'Rajasthan',
      reviewText: body.reviewText,
      rating: Number(body.rating) || 5,
      avatarUrl: body.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      venueImage: body.venueImage,
      eventDate: body.eventDate || new Date().toISOString().split('T')[0],
      featured: body.featured ?? false,
    });

    return NextResponse.json(
      { success: true, message: 'Testimonial added successfully', data: item },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating testimonial:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create testimonial' },
      { status: 500 }
    );
  }
}
