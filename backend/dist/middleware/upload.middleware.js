"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadResume = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const crypto_1 = __importDefault(require("crypto"));
const env_1 = require("../config/env");
const AppError_1 = require("../utils/AppError");
// Ensure upload directory exists
const uploadAbsolutePath = path_1.default.resolve(__dirname, '../../', env_1.env.UPLOAD_DIR);
if (!fs_1.default.existsSync(uploadAbsolutePath)) {
    fs_1.default.mkdirSync(uploadAbsolutePath, { recursive: true });
}
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadAbsolutePath);
    },
    filename: (_req, file, cb) => {
        const ext = path_1.default.extname(file.originalname).toLowerCase();
        const randomHex = crypto_1.default.randomBytes(16).toString('hex');
        const safeFilename = `resume-${Date.now()}-${randomHex}${ext}`;
        cb(null, safeFilename);
    },
});
const fileFilter = (_req, file, cb) => {
    const allowedExtensions = ['.pdf', '.doc', '.docx'];
    const ext = path_1.default.extname(file.originalname).toLowerCase();
    const allowedMimeTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];
    if (allowedExtensions.includes(ext) && allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new AppError_1.AppError('Invalid file type. Only PDF and Word documents (.pdf, .doc, .docx) are accepted.', 400));
    }
};
exports.uploadResume = (0, multer_1.default)({
    storage,
    limits: {
        fileSize: env_1.env.MAX_FILE_SIZE_MB * 1024 * 1024, // e.g. 2 MB
    },
    fileFilter,
});
