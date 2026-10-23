import mongoose from 'mongoose';
import {
  CounsellingRequest,
  ICounsellingRequest,
  CounsellingStatus,
} from '../models/CounsellingRequest';
import { CreateCounsellingInput } from '../validators/counselling.validator';
import { AppError } from '../utils/AppError';

export class CounsellingService {
  static async submitRequest(
    input: CreateCounsellingInput,
    userId?: string
  ): Promise<ICounsellingRequest> {
    const request = new CounsellingRequest({
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      phone: input.phone.trim(),
      topic: input.topic.trim(),
      date: input.date.trim(),
      slot: input.slot.trim(),
      notes: input.notes?.trim(),
      user: userId ? new mongoose.Types.ObjectId(userId) : undefined,
      status: 'pending',
    });

    await request.save();
    return request;
  }

  static async listRequests(status?: string): Promise<ICounsellingRequest[]> {
    const filter: any = {};
    if (status) {
      filter.status = status;
    }
    return CounsellingRequest.find(filter).sort({ createdAt: -1 });
  }

  static async updateStatus(
    id: string,
    status: CounsellingStatus
  ): Promise<ICounsellingRequest> {
    const request = await CounsellingRequest.findById(id);
    if (!request) {
      throw new AppError('Counselling request not found.', 404);
    }

    request.status = status;
    await request.save();
    return request;
  }
}
