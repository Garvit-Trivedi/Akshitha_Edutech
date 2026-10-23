import { z } from 'zod';

export const createJobSchema = z.object({
  title: z.string().trim().min(2, 'Job title is required'),
  company: z.string().trim().min(2, 'Company name is required'),
  location: z.string().trim().min(2, 'Location is required'),
  type: z.enum(['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'], {
    errorMap: () => ({ message: 'Invalid job type' }),
  }),
  category: z.string().trim().min(2, 'Category/sector is required'),
  experience: z.string().trim().min(1, 'Experience requirement is required'),
  salary: z.string().trim().optional().default('Competitive'),
  openings: z.coerce.number().int().min(1, 'At least 1 opening is required').default(1),
  skills: z
    .union([z.array(z.string()), z.string()])
    .transform((val) => {
      if (Array.isArray(val)) return val.map((s) => s.trim()).filter(Boolean);
      return val
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    })
    .default([]),
  description: z.string().trim().min(30, 'Job description must be at least 30 characters'),
  responsibilities: z
    .union([z.array(z.string()), z.string()])
    .transform((val) => {
      if (Array.isArray(val)) return val.map((s) => s.trim()).filter(Boolean);
      return val
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
    })
    .optional()
    .default([]),
  requirements: z
    .union([z.array(z.string()), z.string()])
    .transform((val) => {
      if (Array.isArray(val)) return val.map((s) => s.trim()).filter(Boolean);
      return val
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
    })
    .optional()
    .default([]),
  contactEmail: z.string().trim().email('Invalid contact email').optional(),
});

export const updateJobSchema = createJobSchema.partial().extend({
  status: z.enum(['active', 'closed', 'draft']).optional(),
});

export const jobQuerySchema = z.object({
  q: z.string().trim().optional(),
  location: z.string().trim().optional(),
  category: z.string().trim().optional(),
  type: z.string().trim().optional(),
  sort: z.enum(['latest', 'openings', 'salary']).optional().default('latest'),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(12),
});

export type CreateJobInput = z.infer<typeof createJobSchema>;
export type UpdateJobInput = z.infer<typeof updateJobSchema>;
export type JobQueryInput = z.infer<typeof jobQuerySchema>;
