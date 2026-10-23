"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobFairService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const crypto_1 = __importDefault(require("crypto"));
const JobFair_1 = require("../models/JobFair");
const JobFairRegistration_1 = require("../models/JobFairRegistration");
const AppError_1 = require("../utils/AppError");
class JobFairService {
    static async listFairs(query) {
        const filter = {};
        if (query?.city) {
            filter.city = { $regex: new RegExp(`^${query.city.trim()}$`, 'i') };
        }
        if (query?.mode) {
            filter.mode = query.mode;
        }
        return JobFair_1.JobFair.find(filter).sort({ date: 1 });
    }
    static async getFairByIdOrSlug(identifier) {
        let fair = null;
        if (mongoose_1.default.Types.ObjectId.isValid(identifier)) {
            fair = await JobFair_1.JobFair.findById(identifier);
        }
        if (!fair) {
            fair = await JobFair_1.JobFair.findOne({ slug: identifier });
        }
        if (!fair) {
            throw new AppError_1.AppError('Job fair not found.', 404);
        }
        return fair;
    }
    static async createFair(input) {
        const slug = input.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        const fair = new JobFair_1.JobFair({
            ...input,
            slug: `${slug}-${Math.random().toString(36).substring(2, 6)}`,
            status: 'upcoming',
        });
        await fair.save();
        return fair;
    }
    static async updateFair(id, input) {
        const fair = await JobFair_1.JobFair.findById(id);
        if (!fair) {
            throw new AppError_1.AppError('Job fair not found.', 404);
        }
        Object.assign(fair, input);
        await fair.save();
        return fair;
    }
    static async deleteFair(id) {
        const fair = await JobFair_1.JobFair.findById(id);
        if (!fair) {
            throw new AppError_1.AppError('Job fair not found.', 404);
        }
        await JobFair_1.JobFair.findByIdAndDelete(id);
    }
    static async registerUser(fairIdentifier, userId, input) {
        const fair = await this.getFairByIdOrSlug(fairIdentifier);
        // Prevent duplicate registrations
        const existing = await JobFairRegistration_1.JobFairRegistration.findOne({
            jobFair: fair._id,
            user: new mongoose_1.default.Types.ObjectId(userId),
        });
        if (existing) {
            throw new AppError_1.AppError('You are already registered for this job fair.', 409);
        }
        // Generate unique entry ticket ID
        const ticketId = `PASS-${Date.now().toString(36).toUpperCase()}-${crypto_1.default
            .randomBytes(3)
            .toString('hex')
            .toUpperCase()}`;
        const registration = new JobFairRegistration_1.JobFairRegistration({
            jobFair: fair._id,
            user: new mongoose_1.default.Types.ObjectId(userId),
            name: input.name.trim(),
            email: input.email.trim().toLowerCase(),
            phone: input.phone.trim(),
            ticketId,
            status: 'registered',
        });
        await registration.save();
        return registration;
    }
    static async getRegistrationsForFair(fairId) {
        return JobFairRegistration_1.JobFairRegistration.find({
            jobFair: new mongoose_1.default.Types.ObjectId(fairId),
        })
            .populate('user', 'name email phone')
            .sort({ createdAt: -1 });
    }
}
exports.JobFairService = JobFairService;
