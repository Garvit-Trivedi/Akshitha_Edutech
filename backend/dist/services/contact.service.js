"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const ContactMessage_1 = require("../models/ContactMessage");
const AppError_1 = require("../utils/AppError");
class ContactService {
    static async submitMessage(input) {
        const contact = new ContactMessage_1.ContactMessage({
            name: input.name.trim(),
            email: input.email.trim().toLowerCase(),
            subject: input.subject.trim(),
            message: input.message.trim(),
            status: 'unread',
        });
        await contact.save();
        return contact;
    }
    static async listMessages(status) {
        const filter = {};
        if (status) {
            filter.status = status;
        }
        return ContactMessage_1.ContactMessage.find(filter).sort({ createdAt: -1 });
    }
    static async updateStatus(id, status) {
        const message = await ContactMessage_1.ContactMessage.findById(id);
        if (!message) {
            throw new AppError_1.AppError('Contact message not found.', 404);
        }
        message.status = status;
        await message.save();
        return message;
    }
}
exports.ContactService = ContactService;
