import { z } from 'zod';

export const quoteSchema = z.object({
  eventType: z.string().min(1, 'Please select an event type'),
  guestCount: z.number().min(10, 'Minimum guest count is 10').max(10000, 'Maximum guest count is 10,000'),
  venueType: z.enum([
    'Heritage Palace',
    '5-Star Luxury Resort',
    'Beachfront Venue',
    'Banqueting Hall',
    'Private Farmhouse',
    'Other',
  ]),
  cityLocation: z.string().min(2, 'Please enter target city or destination'),
  budgetRange: z.string().min(1, 'Please select a budget range'),
  selectedServices: z.array(z.string()).min(1, 'Please select at least one service'),
  customRequirements: z.string().optional(),
  fullName: z.string().min(2, 'Full name is required'),
  phone: z.string().min(8, 'Phone number is required'),
  email: z.string().email('Valid email is required'),
});

export type QuoteFormValues = z.infer<typeof quoteSchema>;
