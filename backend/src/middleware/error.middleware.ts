import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/AppError';
import { env } from '../config/env';
import multer from 'multer';

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  let error = { ...err };
  error.message = err.message;
  error.name = err.name;
  error.statusCode = err.statusCode || 500;

  // 1. Mongoose Bad ObjectId (CastError)
  if (err.name === 'CastError') {
    const message = `Resource not found with id of ${err.value}`;
    error = new AppError(message, 404);
  }

  // 2. Mongoose Duplicate Key (E11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    const message = `An account or record already exists with that ${field}.`;
    error = new AppError(message, 409);
  }

  // 3. Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors || {}).map((val: any) => val.message);
    const message = `Validation error: ${messages.join('. ')}`;
    error = new AppError(message, 400);
  }

  // 4. Multer File Upload Error
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      error = new AppError(
        `File too large. Maximum file size allowed is ${env.MAX_FILE_SIZE_MB} MB.`,
        400
      );
    } else {
      error = new AppError(`File upload error: ${err.message}`, 400);
    }
  }

  // Log error (safe logging: no passwords/tokens)
  if (env.NODE_ENV !== 'test') {
    console.error(`[Error] ${error.statusCode} - ${error.message}`);
    if (error.statusCode === 500) {
      console.error(err.stack || err);
    }
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || 'An unexpected server error occurred',
    errors: error.errors,
    ...(env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}
