import mongoose from 'mongoose';
import crypto from 'crypto';
import { JobFair, IJobFair } from '../models/JobFair';
import {
  JobFairRegistration,
  IJobFairRegistration,
} from '../models/JobFairRegistration';
import {
  CreateJobFairInput,
  UpdateJobFairInput,
  RegisterJobFairInput,
} from '../validators/jobFair.validator';
import { AppError } from '../utils/AppError';

export class JobFairService {
  static async listFairs(query?: { city?: string; mode?: string }): Promise<IJobFair[]> {
    const filter: any = {};
    if (query?.city) {
      filter.city = { $regex: new RegExp(`^${query.city.trim()}$`, 'i') };
    }
    if (query?.mode) {
      filter.mode = query.mode;
    }

    return JobFair.find(filter).sort({ date: 1 });
  }

  static async getFairByIdOrSlug(identifier: string): Promise<IJobFair> {
    let fair: IJobFair | null = null;
    if (mongoose.Types.ObjectId.isValid(identifier)) {
      fair = await JobFair.findById(identifier);
    }
    if (!fair) {
      fair = await JobFair.findOne({ slug: identifier });
    }
    if (!fair) {
      throw new AppError('Job fair not found.', 404);
    }
    return fair;
  }

  static async createFair(input: CreateJobFairInput): Promise<IJobFair> {
    const slug = input.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const fair = new JobFair({
      ...input,
      slug: `${slug}-${Math.random().toString(36).substring(2, 6)}`,
      status: 'upcoming',
    });

    await fair.save();
    return fair;
  }

  static async updateFair(id: string, input: UpdateJobFairInput): Promise<IJobFair> {
    const fair = await JobFair.findById(id);
    if (!fair) {
      throw new AppError('Job fair not found.', 404);
    }

    Object.assign(fair, input);
    await fair.save();
    return fair;
  }

  static async deleteFair(id: string): Promise<void> {
    const fair = await JobFair.findById(id);
    if (!fair) {
      throw new AppError('Job fair not found.', 404);
    }
    await JobFair.findByIdAndDelete(id);
  }

  static async registerUser(
    fairIdentifier: string,
    userId: string,
    input: RegisterJobFairInput
  ): Promise<IJobFairRegistration> {
    const fair = await this.getFairByIdOrSlug(fairIdentifier);

    // Prevent duplicate registrations
    const existing = await JobFairRegistration.findOne({
      jobFair: fair._id,
      user: new mongoose.Types.ObjectId(userId),
    });

    if (existing) {
      throw new AppError('You are already registered for this job fair.', 409);
    }

    // Generate unique entry ticket ID
    const ticketId = `PASS-${Date.now().toString(36).toUpperCase()}-${crypto
      .randomBytes(3)
      .toString('hex')
      .toUpperCase()}`;

    const registration = new JobFairRegistration({
      jobFair: fair._id,
      user: new mongoose.Types.ObjectId(userId),
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      phone: input.phone.trim(),
      ticketId,
      status: 'registered',
    });

    await registration.save();
    return registration;
  }

  static async getRegistrationsForFair(fairId: string): Promise<IJobFairRegistration[]> {
    return JobFairRegistration.find({
      jobFair: new mongoose.Types.ObjectId(fairId),
    })
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 });
  }
}
