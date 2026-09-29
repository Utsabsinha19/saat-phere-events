export type RsvpStatus = 'Confirmed' | 'Tentative' | 'Declined' | 'Awaiting Response';

export type DietaryPreference =
  | 'Jain (Strict)'
  | 'Pure Vegetarian'
  | 'Non-Vegetarian'
  | 'Vegan'
  | 'Gluten-Free'
  | 'Halal';

export interface GuestItem {
  id: string;
  eventId: string;
  guestName: string;
  groupTag: 'Bride Family' | 'Groom Family' | 'Dignitaries & VIPs' | 'Friends & Colleagues';
  phone: string;
  email: string;
  totalAttendees: number;
  rsvpStatus: RsvpStatus;
  dietaryPreference: DietaryPreference;
  hotelAllocated: string;
  roomNumber?: string;
  flightArrival?: string;
  whatsappInviteSent: boolean;
  notes?: string;
}
