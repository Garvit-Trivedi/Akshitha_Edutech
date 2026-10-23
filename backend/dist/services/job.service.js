"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Job_1 = require("../models/Job");
const Company_1 = require("../models/Company");
const AppError_1 = require("../utils/AppError");
class JobService {
    static async listJobs(query) {
        const filter = { status: 'active' };
        // Keyword search
        if (query.q) {
            const q = query.q.trim();
            filter.$or = [
                { title: { $regex: q, $options: 'i' } },
                { company: { $regex: q, $options: 'i' } },
                { skills: { $in: [new RegExp(q, 'i')] } },
                { description: { $regex: q, $options: 'i' } },
                { category: { $regex: q, $options: 'i' } },
            ];
        }
        // Exact or regex filters
        if (query.location) {
            filter.location = { $regex: new RegExp(`^${query.location.trim()}$`, 'i') };
        }
        if (query.category) {
            filter.category = { $regex: new RegExp(`^${query.category.trim()}$`, 'i') };
        }
        if (query.type) {
            filter.type = query.type;
        }
        // Sorting
        let sortObj = { createdAt: -1 };
        if (query.sort === 'openings') {
            sortObj = { openings: -1, createdAt: -1 };
        }
        else if (query.sort === 'salary') {
            sortObj = { salary: -1, createdAt: -1 };
        }
        const page = query.page || 1;
        const limit = query.limit || 12;
        const skip = (page - 1) * limit;
        const [jobs, total] = await Promise.all([
            Job_1.Job.find(filter).sort(sortObj).skip(skip).limit(limit),
            Job_1.Job.countDocuments(filter),
        ]);
        return {
            jobs,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit) || 1,
        };
    }
    static async getJobByIdOrSlug(identifier) {
        let job = null;
        if (mongoose_1.default.Types.ObjectId.isValid(identifier)) {
            job = await Job_1.Job.findById(identifier);
        }
        if (!job) {
            job = await Job_1.Job.findOne({ slug: identifier });
        }
        if (!job) {
            throw new AppError_1.AppError('Job not found.', 404);
        }
        // Fetch related jobs in the same category
        const related = await Job_1.Job.find({
            category: job.category,
            _id: { $ne: job._id },
            status: 'active',
        })
            .limit(3)
            .sort({ createdAt: -1 });
        return { job, related };
    }
    static async createJob(ownerId, input) {
        // Generate readable slug
        const cleanSlug = input.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        const companySlug = input.company
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        const randomSuffix = Math.random().toString(36).substring(2, 6);
        const slug = `${cleanSlug}-${companySlug}-${randomSuffix}`;
        const job = new Job_1.Job({
            ...input,
            slug,
            owner: new mongoose_1.default.Types.ObjectId(ownerId),
            status: 'active',
        });
        await job.save();
        // Increment company openings count if company exists
        await Company_1.Company.updateOne({ owner: new mongoose_1.default.Types.ObjectId(ownerId) }, { $inc: { openings: input.openings || 1 } });
        return job;
    }
    static async updateJob(jobId, userId, userRole, input) {
        const job = await Job_1.Job.findById(jobId);
        if (!job) {
            throw new AppError_1.AppError('Job not found.', 404);
        }
        // Check ownership or admin
        if (userRole !== 'admin' && job.owner.toString() !== userId) {
            throw new AppError_1.AppError('Forbidden: You can only edit jobs created by your account.', 403);
        }
        Object.assign(job, input);
        await job.save();
        return job;
    }
    static async closeJob(jobId, userId, userRole) {
        const job = await Job_1.Job.findById(jobId);
        if (!job) {
            throw new AppError_1.AppError('Job not found.', 404);
        }
        if (userRole !== 'admin' && job.owner.toString() !== userId) {
            throw new AppError_1.AppError('Forbidden: You can only manage jobs created by your account.', 403);
        }
        job.status = 'closed';
        await job.save();
        return job;
    }
}
exports.JobService = JobService;
