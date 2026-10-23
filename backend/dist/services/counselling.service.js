"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CounsellingService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const CounsellingRequest_1 = require("../models/CounsellingRequest");
const AppError_1 = require("../utils/AppError");
class CounsellingService {
    static async submitRequest(input, userId) {
        const request = new CounsellingRequest_1.CounsellingRequest({
            name: input.name.trim(),
            email: input.email.trim().toLowerCase(),
            phone: input.phone.trim(),
            topic: input.topic.trim(),
            date: input.date.trim(),
            slot: input.slot.trim(),
            notes: input.notes?.trim(),
            user: userId ? new mongoose_1.default.Types.ObjectId(userId) : undefined,
            status: 'pending',
        });
        await request.save();
        return request;
    }
    static async listRequests(status) {
        const filter = {};
        if (status) {
            filter.status = status;
        }
        return CounsellingRequest_1.CounsellingRequest.find(filter).sort({ createdAt: -1 });
    }
    static async updateStatus(id, status) {
        const request = await CounsellingRequest_1.CounsellingRequest.findById(id);
        if (!request) {
            throw new AppError_1.AppError('Counselling request not found.', 404);
        }
        request.status = status;
        await request.save();
        return request;
    }
}
exports.CounsellingService = CounsellingService;
