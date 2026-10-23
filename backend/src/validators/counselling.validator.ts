import { z } from 'zod';

export const createCounsellingSchema = z.object({
  name: z.string().trim().min(2, 'Full name is required'),
  email: z.string().trim().email('Valid email is required').toLowerCase(),
  phone: z.string().trim().min(7, 'Valid mobile number is required'),
  topic: z.string().trim().min(2, 'Topic is required'),
  date: z.string().trim().min(1, 'Preferred date is required'),
  slot: z.string().trim().min(1, 'Time slot is required'),
  notes: z.string().trim().optional(),
});

export const updateCounsellingStatusSchema = z.object({
  status: z.enum(['pending', 'confirmed', 'completed', 'cancelled']),
});

export type CreateCounsellingInput = z.infer<typeof createCounsellingSchema>;
