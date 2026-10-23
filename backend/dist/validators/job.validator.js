"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jobQuerySchema = exports.updateJobSchema = exports.createJobSchema = void 0;
const zod_1 = require("zod");
exports.createJobSchema = zod_1.z.object({
    title: zod_1.z.string().trim().min(2, 'Job title is required'),
    company: zod_1.z.string().trim().min(2, 'Company name is required'),
    location: zod_1.z.string().trim().min(2, 'Location is required'),
    type: zod_1.z.enum(['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'], {
        errorMap: () => ({ message: 'Invalid job type' }),
    }),
    category: zod_1.z.string().trim().min(2, 'Category/sector is required'),
    experience: zod_1.z.string().trim().min(1, 'Experience requirement is required'),
    salary: zod_1.z.string().trim().optional().default('Competitive'),
    openings: zod_1.z.coerce.number().int().min(1, 'At least 1 opening is required').default(1),
    skills: zod_1.z
        .union([zod_1.z.array(zod_1.z.string()), zod_1.z.string()])
        .transform((val) => {
        if (Array.isArray(val))
            return val.map((s) => s.trim()).filter(Boolean);
        return val
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean);
    })
        .default([]),
    description: zod_1.z.string().trim().min(30, 'Job description must be at least 30 characters'),
    responsibilities: zod_1.z
        .union([zod_1.z.array(zod_1.z.string()), zod_1.z.string()])
        .transform((val) => {
        if (Array.isArray(val))
            return val.map((s) => s.trim()).filter(Boolean);
        return val
            .split('\n')
            .map((s) => s.trim())
            .filter(Boolean);
    })
        .optional()
        .default([]),
    requirements: zod_1.z
        .union([zod_1.z.array(zod_1.z.string()), zod_1.z.string()])
        .transform((val) => {
        if (Array.isArray(val))
            return val.map((s) => s.trim()).filter(Boolean);
        return val
            .split('\n')
            .map((s) => s.trim())
            .filter(Boolean);
    })
        .optional()
        .default([]),
    contactEmail: zod_1.z.string().trim().email('Invalid contact email').optional(),
});
exports.updateJobSchema = exports.createJobSchema.partial().extend({
    status: zod_1.z.enum(['active', 'closed', 'draft']).optional(),
});
exports.jobQuerySchema = zod_1.z.object({
    q: zod_1.z.string().trim().optional(),
    location: zod_1.z.string().trim().optional(),
    category: zod_1.z.string().trim().optional(),
    type: zod_1.z.string().trim().optional(),
    sort: zod_1.z.enum(['latest', 'openings', 'salary']).optional().default('latest'),
    page: zod_1.z.coerce.number().int().min(1).default(1),
    limit: zod_1.z.coerce.number().int().min(1).max(100).default(12),
});
