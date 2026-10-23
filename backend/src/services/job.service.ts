import mongoose, { FilterQuery } from 'mongoose';
import { Job, IJob } from '../models/Job';
import { Company } from '../models/Company';
import { CreateJobInput, UpdateJobInput, JobQueryInput } from '../validators/job.validator';
import { AppError } from '../utils/AppError';

export class JobService {
  static async listJobs(query: JobQueryInput) {
    const filter: FilterQuery<IJob> = { status: 'active' };

    // Keyword search
    if (query.q) {
      const q = query.q.trim();
      filter.$or = [
        { title: { $regex: q, $options: 'i' } },
        { company: { $regex: q, $options: 'i' } },
        { skills: { $in: [new RegExp(q, 'i')] } },
        { description: { $regex: q, $options: 'i' } },
        { category: { $regex: q, $options: 'i' } },
      ];
    }

    // Exact or regex filters
    if (query.location) {
      filter.location = { $regex: new RegExp(`^${query.location.trim()}$`, 'i') };
    }
    if (query.category) {
      filter.category = { $regex: new RegExp(`^${query.category.trim()}$`, 'i') };
    }
    if (query.type) {
      filter.type = query.type as any;
    }

    // Sorting
    let sortObj: Record<string, 1 | -1> = { createdAt: -1 };
    if (query.sort === 'openings') {
      sortObj = { openings: -1, createdAt: -1 };
    } else if (query.sort === 'salary') {
      sortObj = { salary: -1, createdAt: -1 };
    }

    const page = query.page || 1;
    const limit = query.limit || 12;
    const skip = (page - 1) * limit;

    const [jobs, total] = await Promise.all([
      Job.find(filter).sort(sortObj).skip(skip).limit(limit),
      Job.countDocuments(filter),
    ]);

    return {
      jobs,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit) || 1,
    };
  }

  static async getJobByIdOrSlug(identifier: string): Promise<{ job: IJob; related: IJob[] }> {
    let job: IJob | null = null;

    if (mongoose.Types.ObjectId.isValid(identifier)) {
      job = await Job.findById(identifier);
    }

    if (!job) {
      job = await Job.findOne({ slug: identifier });
    }

    if (!job) {
      throw new AppError('Job not found.', 404);
    }

    // Fetch related jobs in the same category
    const related = await Job.find({
      category: job.category,
      _id: { $ne: job._id },
      status: 'active',
    })
      .limit(3)
      .sort({ createdAt: -1 });

    return { job, related };
  }

  static async createJob(ownerId: string, input: CreateJobInput): Promise<IJob> {
    // Generate readable slug
    const cleanSlug = input.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const companySlug = input.company
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    const randomSuffix = Math.random().toString(36).substring(2, 6);
    const slug = `${cleanSlug}-${companySlug}-${randomSuffix}`;

    const job = new Job({
      ...input,
      slug,
      owner: new mongoose.Types.ObjectId(ownerId),
      status: 'active',
    });

    await job.save();

    // Increment company openings count if company exists
    await Company.updateOne(
      { owner: new mongoose.Types.ObjectId(ownerId) },
      { $inc: { openings: input.openings || 1 } }
    );

    return job;
  }

  static async updateJob(
    jobId: string,
    userId: string,
    userRole: string,
    input: UpdateJobInput
  ): Promise<IJob> {
    const job = await Job.findById(jobId);
    if (!job) {
      throw new AppError('Job not found.', 404);
    }

    // Check ownership or admin
    if (userRole !== 'admin' && job.owner.toString() !== userId) {
      throw new AppError('Forbidden: You can only edit jobs created by your account.', 403);
    }

    Object.assign(job, input);
    await job.save();
    return job;
  }

  static async closeJob(jobId: string, userId: string, userRole: string): Promise<IJob> {
    const job = await Job.findById(jobId);
    if (!job) {
      throw new AppError('Job not found.', 404);
    }

    if (userRole !== 'admin' && job.owner.toString() !== userId) {
      throw new AppError('Forbidden: You can only manage jobs created by your account.', 403);
    }

    job.status = 'closed';
    await job.save();
    return job;
  }
}
