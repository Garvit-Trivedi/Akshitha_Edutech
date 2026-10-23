"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactController = void 0;
const contact_service_1 = require("../services/contact.service");
class ContactController {
    static async submitMessage(req, res, next) {
        try {
            const contact = await contact_service_1.ContactService.submitMessage(req.body);
            res.status(201).json({
                success: true,
                message: "Thank you for reaching out. We'll reply within one working day.",
                data: { contact },
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async listMessages(req, res, next) {
        try {
            const messages = await contact_service_1.ContactService.listMessages(req.query.status);
            res.status(200).json({
                success: true,
                count: messages.length,
                data: messages,
            });
        }
        catch (error) {
            next(error);
        }
    }
    static async updateStatus(req, res, next) {
        try {
            const message = await contact_service_1.ContactService.updateStatus(req.params.id, req.body.status);
            res.status(200).json({
                success: true,
                message: 'Message status updated',
                data: { message },
            });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.ContactController = ContactController;
