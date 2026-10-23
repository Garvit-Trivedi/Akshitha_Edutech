import { z } from 'zod';

export const createJobFairSchema = z.object({
  title: z.string().trim().min(3, 'Title is required'),
  date: z.string().trim().min(1, 'Date is required'),
  city: z.string().trim().min(2, 'City is required'),
  venue: z.string().trim().min(2, 'Venue is required'),
  employers: z.coerce.number().int().min(0).default(0),
  vacancies: z.coerce.number().int().min(0).default(0),
  mode: z.enum(['In-person', 'Virtual']).default('In-person'),
  description: z.string().trim().optional(),
});

export const updateJobFairSchema = createJobFairSchema.partial().extend({
  status: z.enum(['upcoming', 'ongoing', 'completed', 'cancelled']).optional(),
});

export const registerJobFairSchema = z.object({
  name: z.string().trim().min(2, 'Full name is required'),
  email: z.string().trim().email('Valid email is required').toLowerCase(),
  phone: z.string().trim().min(7, 'Valid mobile number is required'),
});

export type CreateJobFairInput = z.infer<typeof createJobFairSchema>;
export type UpdateJobFairInput = z.infer<typeof updateJobFairSchema>;
export type RegisterJobFairInput = z.infer<typeof registerJobFairSchema>;
