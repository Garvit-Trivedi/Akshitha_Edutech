"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
const AppError_1 = require("../utils/AppError");
const env_1 = require("../config/env");
const multer_1 = __importDefault(require("multer"));
function errorHandler(err, _req, res, _next) {
    let error = { ...err };
    error.message = err.message;
    error.name = err.name;
    error.statusCode = err.statusCode || 500;
    // 1. Mongoose Bad ObjectId (CastError)
    if (err.name === 'CastError') {
        const message = `Resource not found with id of ${err.value}`;
        error = new AppError_1.AppError(message, 404);
    }
    // 2. Mongoose Duplicate Key (E11000)
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue || {})[0] || 'field';
        const message = `An account or record already exists with that ${field}.`;
        error = new AppError_1.AppError(message, 409);
    }
    // 3. Mongoose Validation Error
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors || {}).map((val) => val.message);
        const message = `Validation error: ${messages.join('. ')}`;
        error = new AppError_1.AppError(message, 400);
    }
    // 4. Multer File Upload Error
    if (err instanceof multer_1.default.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            error = new AppError_1.AppError(`File too large. Maximum file size allowed is ${env_1.env.MAX_FILE_SIZE_MB} MB.`, 400);
        }
        else {
            error = new AppError_1.AppError(`File upload error: ${err.message}`, 400);
        }
    }
    // Log error (safe logging: no passwords/tokens)
    if (env_1.env.NODE_ENV !== 'test') {
        if (error.statusCode === 404) {
            console.log(`[Info] 404 Not Found - ${err.message}`);
        }
        else {
            console.error(`[Error] ${error.statusCode} - ${error.message}`);
            if (error.statusCode === 500) {
                console.error(err.stack || err);
            }
        }
    }
    res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || 'An unexpected server error occurred',
        errors: error.errors,
        ...(env_1.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
}
