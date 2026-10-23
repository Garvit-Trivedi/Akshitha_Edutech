"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = connectDB;
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./env");
async function connectDB() {
    try {
        mongoose_1.default.set('strictQuery', true);
        const conn = await mongoose_1.default.connect(env_1.env.MONGODB_URI);
        console.log(`[Database] MongoDB connected successfully: ${conn.connection.host}`);
        return conn;
    }
    catch (error) {
        console.error('[Database] MongoDB connection failed:', error);
        throw error;
    }
}
mongoose_1.default.connection.on('disconnected', () => {
    console.warn('[Database] MongoDB connection lost');
});
mongoose_1.default.connection.on('error', (err) => {
    console.error('[Database] MongoDB runtime error:', err);
});
