import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
dotenv.config({ path: path.resolve(__dirname, '../.env') });

export const env = {
  PORT: parseInt(process.env.PORT || '5000', 10),
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/akshitha_edutech',
  JWT_SECRET: process.env.JWT_SECRET || 'dev_jwt_secret_akshitha_edutech_portal_key_32chars!',
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
  COOKIE_NAME: process.env.COOKIE_NAME || 'token',
  CLIENT_ORIGINS: (process.env.CLIENT_ORIGINS || 'http://localhost:3000,http://127.0.0.1:3000')
    .split(',')
    .map((origin) => origin.trim()),
  MAX_FILE_SIZE_MB: parseInt(process.env.MAX_FILE_SIZE_MB || '2', 10),
  UPLOAD_DIR: process.env.UPLOAD_DIR || 'uploads/resumes',
  ADMIN_NAME: process.env.ADMIN_NAME || 'Admin',
  ADMIN_EMAIL: process.env.ADMIN_EMAIL || 'admin@akshithaedutech.example',
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD || 'AdminSecurePass123!',
  ADMIN_PHONE: process.env.ADMIN_PHONE || '9876543210',
};
