import { NextRequest, NextResponse } from 'next/server';
import { GalleryRepository } from '@/lib/db/store';
import { GalleryCategory } from '@/types/gallery';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category') as GalleryCategory | null;

    const items = await GalleryRepository.getAll(category || undefined);

    return NextResponse.json({
      success: true,
      count: items.length,
      data: items,
    });
  } catch (error) {
    console.error('Error fetching gallery items:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch gallery items' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (!body.title || !body.imageUrl || !body.category) {
      return NextResponse.json(
        { success: false, error: 'Title, Image URL, and Category are required' },
        { status: 400 }
      );
    }

    const newItem = await GalleryRepository.create({
      title: body.title,
      category: body.category,
      type: body.type || 'image',
      imageUrl: body.imageUrl,
      videoUrl: body.videoUrl,
      location: body.location || 'Jaipur, Rajasthan',
      eventDate: body.eventDate || new Date().toISOString().split('T')[0],
      featured: body.featured ?? false,
      description: body.description,
    });

    return NextResponse.json(
      { success: true, message: 'Gallery item uploaded successfully', data: newItem },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating gallery item:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create gallery item' },
      { status: 500 }
    );
  }
}
