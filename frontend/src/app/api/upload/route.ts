import { NextRequest, NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/cloudinary';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';

    // Handle Multipart Form Data (Direct File Upload from browser input)
    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File | null;
      const folder = (formData.get('folder') as string) || 'saat-phere-events/gallery';

      if (!file) {
        return NextResponse.json({ success: false, error: 'No file provided in form data' }, { status: 400 });
      }

      // Convert file to Buffer
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const result = await uploadToCloudinary(buffer, folder);

      return NextResponse.json({
        success: true,
        data: {
          url: result.url,
          publicId: result.publicId,
          width: result.width,
          height: result.height,
          format: result.format,
          bytes: result.bytes,
        },
      });
    }

    // Handle JSON (Base64 or external image URL)
    if (contentType.includes('application/json')) {
      const body = await req.json();
      const file = body.file; // base64 data URI or image URL
      const folder = body.folder || 'saat-phere-events/gallery';

      if (!file) {
        return NextResponse.json({ success: false, error: 'No file or image URL provided' }, { status: 400 });
      }

      const result = await uploadToCloudinary(file, folder);

      return NextResponse.json({
        success: true,
        data: {
          url: result.url,
          publicId: result.publicId,
          width: result.width,
          height: result.height,
          format: result.format,
          bytes: result.bytes,
        },
      });
    }

    return NextResponse.json({ success: false, error: 'Unsupported Content-Type' }, { status: 400 });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Upload to Cloudinary failed';
    console.error('[CLOUDINARY UPLOAD ERROR]:', error);
    return NextResponse.json({ success: false, error: errorMsg }, { status: 500 });
  }
}
