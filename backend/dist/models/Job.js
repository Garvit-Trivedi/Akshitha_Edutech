"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Job = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const jobSchema = new mongoose_1.Schema({
    slug: {
        type: String,
        unique: true,
        sparse: true,
        trim: true,
        lowercase: true,
        index: true,
    },
    title: {
        type: String,
        required: [true, 'Job title is required'],
        trim: true,
        index: true,
    },
    company: {
        type: String,
        required: [true, 'Company name is required'],
        trim: true,
        index: true,
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true,
        index: true,
    },
    type: {
        type: String,
        enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'],
        required: [true, 'Job type is required'],
        index: true,
    },
    category: {
        type: String,
        required: [true, 'Job category/sector is required'],
        trim: true,
        index: true,
    },
    experience: {
        type: String,
        required: [true, 'Experience requirement is required'],
        default: '0–2 years',
        trim: true,
    },
    salary: {
        type: String,
        default: 'Competitive',
        trim: true,
    },
    openings: {
        type: Number,
        default: 1,
        min: [1, 'Openings must be at least 1'],
    },
    skills: {
        type: [String],
        default: [],
        index: true,
    },
    description: {
        type: String,
        required: [true, 'Job description is required'],
        trim: true,
    },
    responsibilities: {
        type: [String],
        default: [],
    },
    requirements: {
        type: [String],
        default: [],
    },
    contactEmail: {
        type: String,
        trim: true,
        lowercase: true,
    },
    status: {
        type: String,
        enum: ['active', 'closed', 'draft'],
        default: 'active',
        index: true,
    },
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Job posting must have an owner'],
        index: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
        transform(_doc, ret) {
            ret.id = ret.slug || ret._id.toString();
            // Calculate postedDaysAgo dynamically from createdAt
            const now = new Date();
            const created = new Date(ret.createdAt);
            const diffDays = Math.floor((now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24));
            ret.postedDaysAgo = Math.max(1, diffDays || 1);
            delete ret.__v;
            return ret;
        },
    },
});
// Compound indexes for optimal query performance
jobSchema.index({ status: 1, category: 1, location: 1, type: 1, createdAt: -1 });
jobSchema.index({
    title: 'text',
    company: 'text',
    skills: 'text',
    description: 'text',
});
exports.Job = mongoose_1.default.model('Job', jobSchema);
