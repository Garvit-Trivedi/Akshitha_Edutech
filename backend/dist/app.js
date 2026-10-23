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
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const env_1 = require("./config/env");
const swagger_1 = require("./config/swagger");
const routes_1 = __importDefault(require("./routes"));
const rateLimiter_middleware_1 = require("./middleware/rateLimiter.middleware");
const error_middleware_1 = require("./middleware/error.middleware");
const AppError_1 = require("./utils/AppError");
function createApp() {
    const app = (0, express_1.default)();
    // Enable trust proxy for cloud providers (Render, Railway, Heroku, AWS ALB)
    app.set('trust proxy', 1);
    // 1. Security Headers (CSP disabled to allow interactive Swagger UI styling)
    app.use((0, helmet_1.default)({
        contentSecurityPolicy: false,
        crossOriginResourcePolicy: { policy: 'cross-origin' },
    }));
    // 2. CORS configuration - Allow all origins while preserving credentials/cookies
    app.use((0, cors_1.default)({
        origin: (_origin, callback) => {
            // Allow all requesting origins dynamically (works with credentials: true)
            callback(null, true);
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
    // 6. Interactive Swagger API Documentation & Tester
    app.get('/api-docs.json', (_req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swagger_1.swaggerDocument);
    });
    app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.swaggerDocument, {
        customSiteTitle: 'Akshitha Edutech API Documentation & Tester',
        swaggerOptions: {
            persistAuthorization: true,
            docExpansion: 'list',
            filter: true,
            displayRequestDuration: true,
        },
    }));
    app.get('/docs', (_req, res) => {
        res.redirect('/api-docs');
    });
    // Root landing & health check for Render, uptime monitors and browsers
    app.all('/', (_req, res) => {
        res.status(200).json({
            status: 'ok',
            service: 'Akshitha Edutech API Server',
            message: 'API server is live and healthy',
            version: '1.0.0',
            apiBase: '/api/v1',
            docs: '/api-docs',
            health: '/api/v1/health',
        });
    });
    // 7. Mount API v1
    app.use('/api/v1', routes_1.default);
    // 7. Handle 404 for undefined routes
    app.all('*', (req, _res, next) => {
        next(new AppError_1.AppError(`Cannot find route ${req.method} ${req.originalUrl} on this server`, 404));
    });
    // 8. Centralized Error Handler
    app.use(error_middleware_1.errorHandler);
    return app;
}
