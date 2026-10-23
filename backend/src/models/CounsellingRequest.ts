import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export type CounsellingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';

export interface ICounsellingRequest extends Document {
  _id: Types.ObjectId;
  user?: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  topic: string;
  date: string;
  slot: string;
  notes?: string;
  status: CounsellingStatus;
  createdAt: Date;
  updatedAt: Date;
}

const counsellingRequestSchema = new Schema<ICounsellingRequest>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
      index: true,
    },
    phone: {
      type: String,
      required: [true, 'Mobile number is required'],
      trim: true,
    },
    topic: {
      type: String,
      required: [true, 'Topic is required'],
      trim: true,
    },
    date: {
      type: String,
      required: [true, 'Preferred date is required'],
      trim: true,
    },
    slot: {
      type: String,
      required: [true, 'Time slot is required'],
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'completed', 'cancelled'],
      default: 'pending',
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

export const CounsellingRequest: Model<ICounsellingRequest> =
  mongoose.model<ICounsellingRequest>('CounsellingRequest', counsellingRequestSchema);
