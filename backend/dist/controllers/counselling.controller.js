"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CounsellingController = void 0;
const counselling_service_1 = require("../services/counselling.service");
class CounsellingController {
    static async submitRequest(req, res, next) {
        try {
            const userId = req.user ? req.user._id.toString() : undefined;
            const request = await counselling_service_1.CounsellingService.submitRequest(req.body, userId);
            res.status(201).json({
                success: true,
                message: 'Your career counselling request has been received. Our team will contact you.',
                data: { request },
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async listRequests(req, res, next) {
        try {
            const requests = await counselling_service_1.CounsellingService.listRequests(req.query.status);
            res.status(200).json({
                success: true,
                count: requests.length,
                data: requests,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async updateStatus(req, res, next) {
        try {
            const request = await counselling_service_1.CounsellingService.updateStatus(req.params.id, req.body.status);
            res.status(200).json({
                success: true,
                message: 'Counselling request status updated',
                data: { request },
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.CounsellingController = CounsellingController;
