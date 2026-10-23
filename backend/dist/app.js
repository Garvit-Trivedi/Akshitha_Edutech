"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createApp = createApp;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const path_1 = __importDefault(require("path"));
const env_1 = require("./config/env");
const routes_1 = __importDefault(require("./routes"));
const rateLimiter_middleware_1 = require("./middleware/rateLimiter.middleware");
const error_middleware_1 = require("./middleware/error.middleware");
const AppError_1 = require("./utils/AppError");
function createApp() {
    const app = (0, express_1.default)();
    // Enable trust proxy for cloud providers (Render, Railway, Heroku, AWS ALB)
    app.set('trust proxy', 1);
    // 1. Security Headers
    app.use((0, helmet_1.default)({
        crossOriginResourcePolicy: { policy: 'cross-origin' },
    }));
    // 2. CORS configuration with explicit origin whitelist
    app.use((0, cors_1.default)({
        origin: (origin, callback) => {
            // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
            if (!origin)
                return callback(null, true);
            if (env_1.env.CLIENT_ORIGINS.includes(origin)) {
                return callback(null, true);
            }
            return callback(new Error(`Origin ${origin} is not allowed by CORS`));
        },
        credentials: true, // Essential for HTTP-only cookies
        methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    }));
    // 3. Body parsers
    app.use(express_1.default.json({ limit: '1mb' }));
    app.use(express_1.default.urlencoded({ extended: true, limit: '1mb' }));
    app.use((0, cookie_parser_1.default)());
    // 4. Rate Limiting on API routes
    app.use('/api', rateLimiter_middleware_1.generalLimiter);
    // 5. Static uploads directory for resumes
    const uploadsPath = path_1.default.resolve(__dirname, '../', env_1.env.UPLOAD_DIR);
    app.use('/uploads/resumes', express_1.default.static(uploadsPath));
    // 6. Mount API v1
    app.use('/api/v1', routes_1.default);
    // 7. Handle 404 for undefined routes
    app.all('*', (req, _res, next) => {
        next(new AppError_1.AppError(`Cannot find route ${req.method} ${req.originalUrl} on this server`, 404));
    });
    // 8. Centralized Error Handler
    app.use(error_middleware_1.errorHandler);
    return app;
}
