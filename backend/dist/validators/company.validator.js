"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyCompanySchema = exports.updateCompanySchema = void 0;
const zod_1 = require("zod");
exports.updateCompanySchema = zod_1.z.object({
    name: zod_1.z.string().trim().min(2, 'Company name is required').optional(),
    type: zod_1.z.string().trim().optional(),
    industry: zod_1.z.string().trim().min(2, 'Industry is required').optional(),
    location: zod_1.z.string().trim().min(2, 'Location is required').optional(),
    description: zod_1.z.string().trim().optional(),
    website: zod_1.z.string().trim().url('Invalid website URL').optional().or(zod_1.z.literal('')),
});
exports.verifyCompanySchema = zod_1.z.object({
    isVerified: zod_1.z.boolean(),
});
