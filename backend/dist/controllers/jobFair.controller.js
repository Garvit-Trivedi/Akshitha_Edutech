"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobFairController = void 0;
const jobFair_service_1 = require("../services/jobFair.service");
class JobFairController {
    static async listFairs(req, res, next) {
        try {
            const fairs = await jobFair_service_1.JobFairService.listFairs({
                city: req.query.city,
                mode: req.query.mode,
            });
            res.status(200).json({
                success: true,
                count: fairs.length,
                data: fairs,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async getFair(req, res, next) {
        try {
            const fair = await jobFair_service_1.JobFairService.getFairByIdOrSlug(req.params.id);
            res.status(200).json({
                success: true,
                data: { fair },
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async createFair(req, res, next) {
        try {
            const fair = await jobFair_service_1.JobFairService.createFair(req.body);
            res.status(201).json({
                success: true,
                message: 'Job fair created successfully',
                data: { fair },
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async updateFair(req, res, next) {
        try {
            const fair = await jobFair_service_1.JobFairService.updateFair(req.params.id, req.body);
            res.status(200).json({
                success: true,
                message: 'Job fair updated successfully',
                data: { fair },
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async deleteFair(req, res, next) {
        try {
            await jobFair_service_1.JobFairService.deleteFair(req.params.id);
            res.status(200).json({
                success: true,
                message: 'Job fair deleted successfully',
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async registerForFair(req, res, next) {
        try {
            const registration = await jobFair_service_1.JobFairService.registerUser(req.params.id, req.user._id.toString(), req.body);
            res.status(201).json({
                success: true,
                message: 'You have successfully registered for this job fair!',
                data: { registration },
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async getRegistrations(req, res, next) {
        try {
            const registrations = await jobFair_service_1.JobFairService.getRegistrationsForFair(req.params.id);
            res.status(200).json({
                success: true,
                count: registrations.length,
                data: registrations,
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.JobFairController = JobFairController;
