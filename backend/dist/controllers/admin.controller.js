"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const admin_service_1 = require("../services/admin.service");
class AdminController {
    static async getStats(_req, res, next) {
        try {
            const stats = await admin_service_1.AdminService.getPlatformStats();
            res.status(200).json({
                success: true,
                data: { stats },
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async listUsers(req, res, next) {
        try {
            const users = await admin_service_1.AdminService.listUsers(req.query.role);
            res.status(200).json({
                success: true,
                count: users.length,
                data: users,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async verifyEmployer(req, res, next) {
        try {
            const isVerified = req.body.isVerified !== false;
            const user = await admin_service_1.AdminService.verifyEmployer(req.params.id, isVerified);
            res.status(200).json({
                success: true,
                message: `Employer verification status updated to ${isVerified}`,
                data: { user },
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.AdminController = AdminController;
