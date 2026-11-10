import { Router, Request, Response } from 'express';
import { uploadToCloudinary } from '@/utils/cloudinary';

const router = Router();

// POST /api/upload - Direct upload to Cloudinary (accepts JSON { file, folder })
router.post('/', async (req: Request, res: Response) => {
  try {
    const { file, folder } = req.body;

    if (!file) {
      return res.status(400).json({ success: false, error: 'No file or image URL provided' });
    }

    const result = await uploadToCloudinary(file, folder || 'saat-phere-events/gallery');

    return res.status(200).json({
      success: true,
      message: 'File successfully uploaded to Cloudinary',
      data: {
        url: result.url,
        publicId: result.publicId,
        width: result.width,
        height: result.height,
        format: result.format,
        bytes: result.bytes,
      },
    });
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Upload failed';
    console.error('[BACKEND CLOUDINARY UPLOAD ERROR]:', error);
    return res.status(500).json({ success: false, error: errorMsg });
  }
});

export default router;
