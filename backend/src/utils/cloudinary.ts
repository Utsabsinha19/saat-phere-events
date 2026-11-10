import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

// Configure Cloudinary with environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'ct7edeoo',
  api_key: process.env.CLOUDINARY_API_KEY || '934886645915611',
  api_secret: process.env.CLOUDINARY_API_SECRET || 'esPcHh9GKecj7PvEzz2K9YmTyEE',
  secure: true,
});

export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
  width: number;
  height: number;
  format: string;
  bytes: number;
}

/**
 * Upload a file (Buffer, base64 data URI, or URL) directly to Cloudinary.
 */
export async function uploadToCloudinary(
  file: Buffer | string,
  folder = 'saat-phere-events/gallery'
): Promise<CloudinaryUploadResult> {
  return new Promise((resolve, reject) => {
    if (typeof file === 'string' && (file.startsWith('data:') || file.startsWith('http'))) {
      cloudinary.uploader.upload(
        file,
        {
          folder,
          resource_type: 'auto',
          quality: 'auto',
          fetch_format: 'auto',
        },
        (error, result) => {
          if (error || !result) {
            return reject(error || new Error('Upload to Cloudinary failed'));
          }
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
            bytes: result.bytes,
          });
        }
      );
    } else {
      const buffer = Buffer.isBuffer(file) ? file : Buffer.from(file);
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'auto',
          quality: 'auto',
          fetch_format: 'auto',
        },
        (error, result: UploadApiResponse | undefined) => {
          if (error || !result) {
            return reject(error || new Error('Upload to Cloudinary failed'));
          }
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
            bytes: result.bytes,
          });
        }
      );
      uploadStream.end(buffer);
    }
  });
}

/**
 * Delete an asset from Cloudinary by public ID.
 */
export async function deleteFromCloudinary(publicId: string): Promise<boolean> {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === 'ok';
  } catch (err) {
    console.error('Failed to delete asset from Cloudinary:', err);
    return false;
  }
}

export default cloudinary;
