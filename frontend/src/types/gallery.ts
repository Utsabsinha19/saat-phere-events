export type GalleryCategory =
  | 'All'
  | 'Stage Decors'
  | 'Mandap Designs'
  | 'Myra / Bhaat'
  | 'Haldi / Mehendi'
  | 'Jalwa Ceremony'
  | 'Vintage Procession'
  | 'Wooden Games'
  | 'Floral Styling'
  | 'Destination Weddings'
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
