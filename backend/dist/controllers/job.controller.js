"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobController = void 0;
const job_service_1 = require("../services/job.service");
class JobController {
    static async listJobs(req, res, next) {
        try {
            const result = await job_service_1.JobService.listJobs(req.query);
            res.status(200).json({
                success: true,
                count: result.jobs.length,
                total: result.total,
                page: result.page,
                limit: result.limit,
                totalPages: result.totalPages,
                data: result.jobs,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async getJob(req, res, next) {
        try {
            const { job, related } = await job_service_1.JobService.getJobByIdOrSlug(req.params.id);
            res.status(200).json({
                success: true,
                data: {
                    job,
                    related,
                },
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async createJob(req, res, next) {
        try {
            const job = await job_service_1.JobService.createJob(req.user._id.toString(), req.body);
            res.status(201).json({
                success: true,
                message: 'Job posting submitted successfully',
                data: { job },
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async updateJob(req, res, next) {
        try {
            const job = await job_service_1.JobService.updateJob(req.params.id, req.user._id.toString(), req.user.role, req.body);
            res.status(200).json({
                success: true,
                message: 'Job updated successfully',
                data: { job },
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async closeJob(req, res, next) {
        try {
            const job = await job_service_1.JobService.closeJob(req.params.id, req.user._id.toString(), req.user.role);
            res.status(200).json({
                success: true,
                message: 'Job vacancy has been closed',
                data: { job },
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.JobController = JobController;
