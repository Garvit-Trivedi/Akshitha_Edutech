"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeEmail = normalizeEmail;
exports.normalizePhone = normalizePhone;
/**
 * Normalizes email by trimming and converting to lowercase
 */
function normalizeEmail(email) {
    if (!email)
        return '';
    return email.trim().toLowerCase();
}
/**
 * Normalizes phone number: strips non-digit characters except leading plus if international,
 * or formats cleanly
 */
function normalizePhone(phone) {
    if (!phone)
        return '';
    return phone.replace(/[^0-9+]/g, '').trim();
}
