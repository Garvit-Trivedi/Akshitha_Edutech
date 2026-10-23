import { z } from 'zod';

export const createApplicationSchema = z.object({
  name: z.string().trim().min(2, 'Full name is required'),
  email: z.string().trim().email('Valid email address is required').toLowerCase(),
  phone: z.string().trim().min(7, 'Valid mobile number is required'),
  coverNote: z.string().trim().optional(),
  resumeUrl: z.string().trim().optional(),
});

export const updateApplicationStatusSchema = z.object({
  status: z.enum(['submitted', 'in_review', 'shortlisted', 'rejected', 'accepted'], {
    errorMap: () => ({ message: 'Invalid application status' }),
  }),
});

export type CreateApplicationInput = z.infer<typeof createApplicationSchema>;
export type UpdateApplicationStatusInput = z.infer<typeof updateApplicationStatusSchema>;
