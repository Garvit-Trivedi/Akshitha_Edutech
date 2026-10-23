"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Application_1 = require("../models/Application");
const Job_1 = require("../models/Job");
const AppError_1 = require("../utils/AppError");
class ApplicationService {
    static async apply(jobIdentifier, applicantId, input, uploadedResumeUrl) {
        // Find job by ID or slug
        let job = await Job_1.Job.findById(jobIdentifier).catch(() => null);
        if (!job) {
            job = await Job_1.Job.findOne({ slug: jobIdentifier });
        }
        if (!job) {
            throw new AppError_1.AppError('The requested job listing does not exist.', 404);
        }
        if (job.status !== 'active') {
            throw new AppError_1.AppError('This job vacancy is no longer accepting applications.', 400);
        }
        // Check duplicate application
        const existing = await Application_1.Application.findOne({
            job: job._id,
            applicant: new mongoose_1.default.Types.ObjectId(applicantId),
        });
        if (existing) {
            throw new AppError_1.AppError('You have already applied for this position.', 409);
        }
        const application = new Application_1.Application({
            applicant: new mongoose_1.default.Types.ObjectId(applicantId),
            job: job._id,
            name: input.name.trim(),
            email: input.email.trim().toLowerCase(),
            phone: input.phone.trim(),
            coverNote: input.coverNote?.trim(),
            resumeUrl: uploadedResumeUrl || input.resumeUrl,
            status: 'submitted',
        });
        await application.save();
        return application;
    }
    static async getMyApplications(applicantId) {
        return Application_1.Application.find({ applicant: new mongoose_1.default.Types.ObjectId(applicantId) })
            .populate('job')
            .sort({ createdAt: -1 });
    }
    static async getJobApplicationsForEmployer(jobId, employerId, userRole) {
        const job = await Job_1.Job.findById(jobId);
        if (!job) {
            throw new AppError_1.AppError('Job not found.', 404);
        }
        // Verify employer owns the job
        if (userRole !== 'admin' && job.owner.toString() !== employerId) {
            throw new AppError_1.AppError('Forbidden: You are not authorized to view applications for this listing.', 403);
        }
        return Application_1.Application.find({ job: job._id })
            .populate('applicant', 'name email phone')
            .sort({ createdAt: -1 });
    }
    static async updateStatus(applicationId, userId, userRole, newStatus) {
        const application = await Application_1.Application.findById(applicationId).populate('job');
        if (!application) {
            throw new AppError_1.AppError('Application record not found.', 404);
        }
        const job = application.job;
        if (userRole !== 'admin' && job.owner.toString() !== userId) {
            throw new AppError_1.AppError('Forbidden: Only the job poster or an admin can update application status.', 403);
        }
        application.status = newStatus;
        await application.save();
        return application;
    }
}
exports.ApplicationService = ApplicationService;
