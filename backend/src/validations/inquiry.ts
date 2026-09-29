import { z } from 'zod';

export const inquirySchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Full name must be at least 2 characters long' })
    .max(100, { message: 'Full name cannot exceed 100 characters' }),
  phone: z
    .string()
    .min(8, { message: 'Please enter a valid phone number with country code' })
    .max(20, { message: 'Phone number is too long' })
    .regex(/^[+0-9\s\-()]+$/, { message: 'Invalid phone number format' }),
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' }),
  eventType: z.enum([
    'Wedding Planning & Management',
    'Destination Wedding',
    'Engagement & Ring Ceremony',
    'Birthday Party & Kids Event',
    'Anniversary & Couple Celebration',
    'Haldi, Mehendi & Sangeet',
    'Reception & Wedding Decor',
    'Corporate Event & Gala',
    'Theme Party & Bespoke Celebration',
  ], { message: 'Please select a valid event category' }),
  eventDate: z
    .string()
    .min(4, { message: 'Event date is required' }),
  eventLocation: z
    .string()
    .min(2, { message: 'Please specify the event city or location' }),
  guestCount: z
    .union([z.string().min(1, 'Please specify expected guest count'), z.number().positive()])
    .transform(val => String(val)),
  budgetRange: z
    .string()
    .min(1, { message: 'Please select an approximate budget range' }),
  requirements: z
    .string()
    .max(2000, { message: 'Requirements cannot exceed 2000 characters' })
    .optional(),
});

export type InquiryFormValues = z.infer<typeof inquirySchema>;
