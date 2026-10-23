"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCounsellingStatusSchema = exports.createCounsellingSchema = void 0;
const zod_1 = require("zod");
exports.createCounsellingSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(2, 'Full name is required'),
    email: zod_1.z.string().trim().email('Valid email is required').toLowerCase(),
    phone: zod_1.z.string().trim().min(7, 'Valid mobile number is required'),
    topic: zod_1.z.string().trim().min(2, 'Topic is required'),
    date: zod_1.z.string().trim().min(1, 'Preferred date is required'),
    slot: zod_1.z.string().trim().min(1, 'Time slot is required'),
    notes: zod_1.z.string().trim().optional(),
});
exports.updateCounsellingStatusSchema = zod_1.z.object({
    status: zod_1.z.enum(['pending', 'confirmed', 'completed', 'cancelled']),
});
