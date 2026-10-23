import { z } from 'zod';

export const createContactSchema = z.object({
  name: z.string().trim().min(2, 'Name is required'),
  email: z.string().trim().email('Valid email is required').toLowerCase(),
  subject: z.string().trim().min(2, 'Subject is required'),
  message: z.string().trim().min(10, 'Message must be at least 10 characters'),
});

export const updateContactStatusSchema = z.object({
  status: z.enum(['unread', 'read', 'resolved']),
});

export type CreateContactInput = z.infer<typeof createContactSchema>;
