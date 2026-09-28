export interface TestimonialItem {
  id: string;
  clientNames: string;
  eventType: string;
  weddingLocation: string;
  reviewText: string;
  rating: number; // 1 to 5
  avatarUrl: string;
  venueImage?: string;
  eventDate: string;
  featured: boolean;
  status: 'Approved' | 'Pending';
}
