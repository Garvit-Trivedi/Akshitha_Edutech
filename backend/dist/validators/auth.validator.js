"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(2, 'Name must be at least 2 characters').max(100),
    email: zod_1.z.string().trim().email('Please enter a valid email address').toLowerCase(),
    phone: zod_1.z
        .string()
        .trim()
        .min(7, 'Please enter a valid phone number')
        .max(15, 'Phone number is too long'),
    password: zod_1.z.string().min(8, 'Password must be at least 8 characters'),
    role: zod_1.z.enum(['jobseeker', 'employer'], {
        errorMap: () => ({ message: 'Role must be either jobseeker or employer. Admin registration is prohibited.' }),
    }),
    terms: zod_1.z.boolean().refine((val) => val === true, {
        message: 'You must accept the terms of use and privacy policy to continue',
    }),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().trim().email('Please enter a valid email address').toLowerCase(),
    password: zod_1.z.string().min(1, 'Password is required'),
});
