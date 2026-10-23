import { createApp } from './app';
import { connectDB } from './config/db';
import { env } from './config/env';

async function bootstrap() {
  try {
    // 1. Connect to MongoDB
    console.log('[Server] Connecting to MongoDB...');
    await connectDB();

    // 2. Initialize Express application
    const app = createApp();

    // 3. Start listening
    const server = app.listen(env.PORT, () => {
      console.log('====================================================');
      console.log(`🚀 Akshitha Edutech API Server running!`);
      console.log(`📡 URL: http://localhost:${env.PORT}`);
      console.log(`🌍 Environment: ${env.NODE_ENV}`);
      console.log(`🔐 Allowed Origins: ${env.CLIENT_ORIGINS.join(', ')}`);
      console.log(`📚 Base API: http://localhost:${env.PORT}/api/v1`);
      console.log('====================================================');
    });

    // Handle Unhandled Promise Rejections
    process.on('unhandledRejection', (err: any) => {
      console.error('[Unhandled Rejection] Error details:', err.message || err);
      server.close(() => process.exit(1));
    });

    // Handle Uncaught Exceptions
    process.on('uncaughtException', (err: Error) => {
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
  } catch (error) {
    console.error('[Fatal Error] Failed to start server:', error);
    process.exit(1);
  }
}

bootstrap();
