import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export type ApplicationStatus = 'submitted' | 'in_review' | 'shortlisted' | 'rejected' | 'accepted';

export interface IApplication extends Document {
  _id: Types.ObjectId;
  applicant: Types.ObjectId;
  job: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  coverNote?: string;
  resumeUrl?: string;
  status: ApplicationStatus;
  createdAt: Date;
  updatedAt: Date;
}

const applicationSchema = new Schema<IApplication>(
  {
    applicant: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Applicant reference is required'],
      index: true,
    },
    job: {
      type: Schema.Types.ObjectId,
      ref: 'Job',
      required: [true, 'Job reference is required'],
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Applicant name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Applicant email is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Applicant phone number is required'],
      trim: true,
    },
    coverNote: {
      type: String,
      trim: true,
    },
    resumeUrl: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['submitted', 'in_review', 'shortlisted', 'rejected', 'accepted'],
      default: 'submitted',
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret: Record<string, any>) {
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Prevent duplicate applications by the same applicant for the same job
applicationSchema.index({ applicant: 1, job: 1 }, { unique: true });

export const Application: Model<IApplication> = mongoose.model<IApplication>(
  'Application',
  applicationSchema
);
