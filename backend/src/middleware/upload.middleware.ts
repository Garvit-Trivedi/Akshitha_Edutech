import multer from 'multer';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { env } from '../config/env';
import { AppError } from '../utils/AppError';

// Ensure upload directory exists
const uploadAbsolutePath = path.resolve(__dirname, '../../', env.UPLOAD_DIR);
if (!fs.existsSync(uploadAbsolutePath)) {
  fs.mkdirSync(uploadAbsolutePath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadAbsolutePath);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const randomHex = crypto.randomBytes(16).toString('hex');
    const safeFilename = `resume-${Date.now()}-${randomHex}${ext}`;
    cb(null, safeFilename);
  },
});

const fileFilter = (
  _req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedExtensions = ['.pdf', '.doc', '.docx'];
  const ext = path.extname(file.originalname).toLowerCase();

  const allowedMimeTypes = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  if (allowedExtensions.includes(ext) && allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        'Invalid file type. Only PDF and Word documents (.pdf, .doc, .docx) are accepted.',
        400
      )
    );
  }
};

export const uploadResume = multer({
  storage,
  limits: {
    fileSize: env.MAX_FILE_SIZE_MB * 1024 * 1024, // e.g. 2 MB
  },
  fileFilter,
});
