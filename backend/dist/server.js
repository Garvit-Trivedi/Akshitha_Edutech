"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const db_1 = require("./config/db");
const env_1 = require("./config/env");
async function bootstrap() {
    try {
        // 1. Connect to MongoDB
        console.log('[Server] Connecting to MongoDB...');
        await (0, db_1.connectDB)();
        // 2. Initialize Express application
        const app = (0, app_1.createApp)();
        // 3. Start listening
        const server = app.listen(env_1.env.PORT, () => {
            console.log('====================================================');
            console.log(`🚀 Akshitha Edutech API Server running!`);
            console.log(`📡 URL: http://localhost:${env_1.env.PORT}`);
            console.log(`🌍 Environment: ${env_1.env.NODE_ENV}`);
            console.log(`🔐 Allowed Origins: ${env_1.env.CLIENT_ORIGINS.join(', ')}`);
            console.log(`📚 Base API: http://localhost:${env_1.env.PORT}/api/v1`);
            console.log(`📖 Swagger API Docs: http://localhost:${env_1.env.PORT}/api-docs`);
            console.log('====================================================');
        });
        // Handle Unhandled Promise Rejections
        process.on('unhandledRejection', (err) => {
            console.error('[Unhandled Rejection] Error details:', err.message || err);
            server.close(() => process.exit(1));
        });
        // Handle Uncaught Exceptions
        process.on('uncaughtException', (err) => {
            console.error('[Uncaught Exception] Error details:', err.message || err);
            process.exit(1);
        });
        // Graceful Shutdown
        const shutdown = () => {
            console.log('\n[Server] Gracefully shutting down...');
            server.close(() => {
                console.log('[Server] HTTP server closed.');
                process.exit(0);
            });
        };
        process.on('SIGTERM', shutdown);
        process.on('SIGINT', shutdown);
    }
    catch (error) {
        console.error('[Fatal Error] Failed to start server:', error);
        process.exit(1);
    }
}
bootstrap();
