import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().trim().email('Please enter a valid email address').toLowerCase(),
  phone: z
    .string()
    .trim()
    .min(7, 'Please enter a valid phone number')
    .max(15, 'Phone number is too long'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  role: z.enum(['jobseeker', 'employer'], {
    errorMap: () => ({ message: 'Role must be either jobseeker or employer. Admin registration is prohibited.' }),
  }),
  terms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms of use and privacy policy to continue',
  }),
});

export const loginSchema = z.object({
  email: z.string().trim().email('Please enter a valid email address').toLowerCase(),
  password: z.string().min(1, 'Password is required'),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
