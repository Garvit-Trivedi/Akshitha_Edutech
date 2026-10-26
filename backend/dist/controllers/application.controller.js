"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationController = void 0;
const application_service_1 = require("../services/application.service");
class ApplicationController {
    static async applyForJob(req, res, next) {
        try {
            let uploadedResumeUrl;
            if (req.file) {
                // Build URL relative to host
                uploadedResumeUrl = `/uploads/resumes/${req.file.filename}`;
            }
            const application = await application_service_1.ApplicationService.apply(req.params.id, req.user._id.toString(), req.body, uploadedResumeUrl);
            res.status(201).json({
                success: true,
                message: 'Your job application has been submitted successfully',
                data: { application },
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async getMyApplications(req, res, next) {
        try {
            const applications = await application_service_1.ApplicationService.getMyApplications(req.user._id.toString());
            res.status(200).json({
                success: true,
                count: applications.length,
                data: applications,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async getJobApplicationsForEmployer(req, res, next) {
        try {
            const applications = await application_service_1.ApplicationService.getJobApplicationsForEmployer(req.params.id, req.user._id.toString(), req.user.role);
            res.status(200).json({
                success: true,
                count: applications.length,
                data: applications,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async updateStatus(req, res, next) {
        try {
            const application = await application_service_1.ApplicationService.updateStatus(req.params.id, req.user._id.toString(), req.user.role, req.body.status);
            res.status(200).json({
                success: true,
                message: `Application status updated to ${req.body.status}`,
                data: { application },
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async getApplication(req, res, next) {
        try {
            const application = await application_service_1.ApplicationService.getApplicationById(req.params.id, req.user._id.toString(), req.user.role);
            res.status(200).json({
                success: true,
                data: { application },
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ApplicationController = ApplicationController;
