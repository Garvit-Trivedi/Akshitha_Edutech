"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateContactStatusSchema = exports.createContactSchema = void 0;
const zod_1 = require("zod");
exports.createContactSchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(2, 'Name is required'),
    email: zod_1.z.string().trim().email('Valid email is required').toLowerCase(),
    subject: zod_1.z.string().trim().min(2, 'Subject is required'),
    message: zod_1.z.string().trim().min(10, 'Message must be at least 10 characters'),
});
exports.updateContactStatusSchema = zod_1.z.object({
    status: zod_1.z.enum(['unread', 'read', 'resolved']),
});
