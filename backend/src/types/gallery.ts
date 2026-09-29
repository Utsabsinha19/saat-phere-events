export type GalleryCategory =
  | 'All'
  | 'Mandap Designs'
  | 'Stage Decors'
  | 'Floral Styling'
  | 'Destination Weddings'
  | 'Haldi / Mehendi'
  | 'Corporate Events';

export interface GalleryMediaItem {
  id: string;
  title: string;
  category: GalleryCategory;
  type: 'image' | 'video';
  imageUrl: string;
  videoUrl?: string; // YouTube/Vimeo embed or direct mp4
  location: string;
  eventDate?: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square';
  featured?: boolean;
  description?: string;
}
