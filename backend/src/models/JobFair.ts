import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export type JobFairMode = 'In-person' | 'Virtual';
export type JobFairStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

export interface IJobFair extends Document {
  _id: Types.ObjectId;
  slug: string;
  title: string;
  date: string;
  city: string;
  venue: string;
  employers: number;
  vacancies: number;
  mode: JobFairMode;
  description?: string;
  status: JobFairStatus;
  createdAt: Date;
  updatedAt: Date;
}

const jobFairSchema = new Schema<IJobFair>(
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
      required: [true, 'Job fair title is required'],
      trim: true,
    },
    date: {
      type: String,
      required: [true, 'Job fair date is required'],
      trim: true,
      index: true,
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
      index: true,
    },
    venue: {
      type: String,
      required: [true, 'Venue is required'],
      trim: true,
    },
    employers: {
      type: Number,
      default: 0,
    },
    vacancies: {
      type: Number,
      default: 0,
    },
    mode: {
      type: String,
      enum: ['In-person', 'Virtual'],
      default: 'In-person',
      index: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
      default: 'upcoming',
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(_doc, ret: Record<string, any>) {
        ret.id = ret.slug || ret._id.toString();
        delete ret.__v;
        return ret;
      },
    },
  }
);

export const JobFair: Model<IJobFair> = mongoose.model<IJobFair>('JobFair', jobFairSchema);
