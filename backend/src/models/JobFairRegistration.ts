import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export type FairRegistrationStatus = 'registered' | 'attended' | 'cancelled';

export interface IJobFairRegistration extends Document {
  _id: Types.ObjectId;
  jobFair: Types.ObjectId;
  user: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  ticketId: string;
  status: FairRegistrationStatus;
  createdAt: Date;
  updatedAt: Date;
}

const jobFairRegistrationSchema = new Schema<IJobFairRegistration>(
  {
    jobFair: {
      type: Schema.Types.ObjectId,
      ref: 'JobFair',
      required: [true, 'Job Fair reference is required'],
      index: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User reference is required'],
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    ticketId: {
      type: String,
      required: [true, 'Ticket ID is required'],
      unique: true,
      index: true,
    },
    status: {
      type: String,
      enum: ['registered', 'attended', 'cancelled'],
      default: 'registered',
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

// Prevent duplicate fair registration for the same fair by the same user
jobFairRegistrationSchema.index({ jobFair: 1, user: 1 }, { unique: true });

export const JobFairRegistration: Model<IJobFairRegistration> =
  mongoose.model<IJobFairRegistration>('JobFairRegistration', jobFairRegistrationSchema);
