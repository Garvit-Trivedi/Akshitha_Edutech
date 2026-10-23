"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateApplicationStatusSchema = exports.createApplicationSchema = void 0;
const zod_1 = require("zod");
exports.createApplicationSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(2, 'Full name is required'),
    email: zod_1.z.string().trim().email('Valid email address is required').toLowerCase(),
    phone: zod_1.z.string().trim().min(7, 'Valid mobile number is required'),
    coverNote: zod_1.z.string().trim().optional(),
    resumeUrl: zod_1.z.string().trim().optional(),
});
exports.updateApplicationStatusSchema = zod_1.z.object({
    status: zod_1.z.enum(['submitted', 'in_review', 'shortlisted', 'rejected', 'accepted'], {
        errorMap: () => ({ message: 'Invalid application status' }),
    }),
});
