"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerJobFairSchema = exports.updateJobFairSchema = exports.createJobFairSchema = void 0;
const zod_1 = require("zod");
exports.createJobFairSchema = zod_1.z.object({
    title: zod_1.z.string().trim().min(3, 'Title is required'),
    date: zod_1.z.string().trim().min(1, 'Date is required'),
    city: zod_1.z.string().trim().min(2, 'City is required'),
    venue: zod_1.z.string().trim().min(2, 'Venue is required'),
    employers: zod_1.z.coerce.number().int().min(0).default(0),
    vacancies: zod_1.z.coerce.number().int().min(0).default(0),
    mode: zod_1.z.enum(['In-person', 'Virtual']).default('In-person'),
    description: zod_1.z.string().trim().optional(),
});
exports.updateJobFairSchema = exports.createJobFairSchema.partial().extend({
    status: zod_1.z.enum(['upcoming', 'ongoing', 'completed', 'cancelled']).optional(),
});
exports.registerJobFairSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(2, 'Full name is required'),
    email: zod_1.z.string().trim().email('Valid email is required').toLowerCase(),
    phone: zod_1.z.string().trim().min(7, 'Valid mobile number is required'),
});
