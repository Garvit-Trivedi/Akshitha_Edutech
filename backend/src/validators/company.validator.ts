import { z } from 'zod';

export const updateCompanySchema = z.object({
  name: z.string().trim().min(2, 'Company name is required').optional(),
  type: z.string().trim().optional(),
  industry: z.string().trim().min(2, 'Industry is required').optional(),
  location: z.string().trim().min(2, 'Location is required').optional(),
  description: z.string().trim().optional(),
  website: z.string().trim().url('Invalid website URL').optional().or(z.literal('')),
});

export const verifyCompanySchema = z.object({
  isVerified: z.boolean(),
});

export type UpdateCompanyInput = z.infer<typeof updateCompanySchema>;
export type VerifyCompanyInput = z.infer<typeof verifyCompanySchema>;
