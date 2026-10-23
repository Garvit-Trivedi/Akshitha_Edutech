import express, { Application, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { env } from './config/env';
import apiRouter from './routes';
import { generalLimiter } from './middleware/rateLimiter.middleware';
import { errorHandler } from './middleware/error.middleware';
import { AppError } from './utils/AppError';

export function createApp(): Application {
  const app = express();

  // Enable trust proxy for cloud providers (Render, Railway, Heroku, AWS ALB)
  app.set('trust proxy', 1);

  // 1. Security Headers
  app.use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    })
  );

  // 2. CORS configuration with explicit origin whitelist
  app.use(
    cors({
      origin: (origin, callback) => {
        // Allow requests with no origin (e.g. mobile apps, curl, server-to-server)
        if (!origin) return callback(null, true);
        if (env.CLIENT_ORIGINS.includes(origin)) {
          return callback(null, true);
        }
        return callback(new Error(`Origin ${origin} is not allowed by CORS`));
      },
      credentials: true, // Essential for HTTP-only cookies
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    })
  );

  // 3. Body parsers
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: true, limit: '1mb' }));
  app.use(cookieParser());

  // 4. Rate Limiting on API routes
  app.use('/api', generalLimiter);

  // 5. Static uploads directory for resumes
  const uploadsPath = path.resolve(__dirname, '../', env.UPLOAD_DIR);
  app.use('/uploads/resumes', express.static(uploadsPath));

  // 6. Mount API v1
  app.use('/api/v1', apiRouter);

  // 7. Handle 404 for undefined routes
  app.all('*', (req: Request, _res: Response, next: NextFunction) => {
    next(new AppError(`Cannot find route ${req.method} ${req.originalUrl} on this server`, 404));
  });

  // 8. Centralized Error Handler
  app.use(errorHandler);

  return app;
}
