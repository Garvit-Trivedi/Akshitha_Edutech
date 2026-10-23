import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export type JobTypeEnum = 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Remote';
export type JobStatusEnum = 'active' | 'closed' | 'draft';

export interface IJob extends Document {
  _id: Types.ObjectId;
  slug: string;
  title: string;
  company: string;
  location: string;
  type: JobTypeEnum;
  category: string;
  experience: string;
  salary: string;
  openings: number;
  skills: string[];
  description: string;
  responsibilities: string[];
  requirements: string[];
  contactEmail?: string;
  status: JobStatusEnum;
  owner: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const jobSchema = new Schema<IJob>(
  {
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
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Job posting must have an owner'],
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(_doc, ret: Record<string, any>) {
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
  }
);

// Compound indexes for optimal query performance
jobSchema.index({ status: 1, category: 1, location: 1, type: 1, createdAt: -1 });
jobSchema.index({
  title: 'text',
  company: 'text',
  skills: 'text',
  description: 'text',
});

export const Job: Model<IJob> = mongoose.model<IJob>('Job', jobSchema);
