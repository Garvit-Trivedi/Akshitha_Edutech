"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = require("../config/db");
const env_1 = require("../config/env");
const User_1 = require("../models/User");
const normalize_1 = require("../utils/normalize");
async function createAdmin() {
    try {
        console.log('[Script] Connecting to MongoDB...');
        await (0, db_1.connectDB)();
        const email = (0, normalize_1.normalizeEmail)(env_1.env.ADMIN_EMAIL);
        const phone = (0, normalize_1.normalizePhone)(env_1.env.ADMIN_PHONE);
        const password = env_1.env.ADMIN_PASSWORD;
        const name = env_1.env.ADMIN_NAME;
        if (!email || !password) {
            console.error('[Error] ADMIN_EMAIL and ADMIN_PASSWORD must be configured in .env');
            process.exit(1);
        }
        const existing = await User_1.User.findOne({ email });
        if (existing) {
            if (existing.role === 'admin') {
                console.log(`[Info] Admin user '${email}' already exists.`);
                process.exit(0);
            }
            existing.role = 'admin';
            existing.isVerified = true;
            await existing.save();
            console.log(`[Success] Updated existing user '${email}' to administrator role.`);
            process.exit(0);
        }
        const admin = new User_1.User({
            name,
            email,
            phone,
            password,
            role: 'admin',
            isVerified: true,
        });
        await admin.save();
        console.log('====================================================');
        console.log('🎉 Administrator account created successfully!');
        console.log(`👤 Name:  ${admin.name}`);
        console.log(`📧 Email: ${admin.email}`);
        console.log(`🔑 Role:  ${admin.role}`);
        console.log('====================================================');
        await mongoose_1.default.disconnect();
        process.exit(0);
    }
    catch (error) {
        console.error('[Fatal Error] Failed to create administrator:', error);
        process.exit(1);
    }
}
createAdmin();
