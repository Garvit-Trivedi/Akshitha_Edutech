import mongoose from 'mongoose';
import { Application, IApplication, ApplicationStatus } from '../models/Application';
import { Job } from '../models/Job';
import { CreateApplicationInput } from '../validators/application.validator';
import { AppError } from '../utils/AppError';

export class ApplicationService {
  static async apply(
    jobIdentifier: string,
    applicantId: string,
    input: CreateApplicationInput,
    uploadedResumeUrl?: string
  ): Promise<IApplication> {
    // Find job by ID or slug
    let job = await Job.findById(jobIdentifier).catch(() => null);
    if (!job) {
      job = await Job.findOne({ slug: jobIdentifier });
    }

    if (!job) {
      throw new AppError('The requested job listing does not exist.', 404);
    }

    if (job.status !== 'active') {
      throw new AppError('This job vacancy is no longer accepting applications.', 400);
    }

    // Check duplicate application
    const existing = await Application.findOne({
      job: job._id,
      applicant: new mongoose.Types.ObjectId(applicantId),
    });

    if (existing) {
      throw new AppError('You have already applied for this position.', 409);
    }

    const application = new Application({
      applicant: new mongoose.Types.ObjectId(applicantId),
      job: job._id,
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      phone: input.phone.trim(),
      coverNote: input.coverNote?.trim(),
      resumeUrl: uploadedResumeUrl || input.resumeUrl,
      status: 'submitted',
    });

    await application.save();
    return application;
  }

  static async getMyApplications(applicantId: string): Promise<IApplication[]> {
    return Application.find({ applicant: new mongoose.Types.ObjectId(applicantId) })
      .populate('job')
      .sort({ createdAt: -1 });
  }

  static async getJobApplicationsForEmployer(
    jobId: string,
    employerId: string,
    userRole: string
  ): Promise<IApplication[]> {
    let job: any = null;
    if (mongoose.Types.ObjectId.isValid(jobId)) {
      job = await Job.findById(jobId);
    }
    if (!job) {
      job = await Job.findOne({ slug: jobId });
    }
    if (!job) {
      throw new AppError('Job not found.', 404);
    }

    // Verify employer owns the job
    if (userRole !== 'admin' && job.owner.toString() !== employerId) {
      throw new AppError(
        'Forbidden: You are not authorized to view applications for this listing.',
        403
      );
    }

    return Application.find({ job: job._id })
      .populate('applicant', 'name email phone')
      .sort({ createdAt: -1 });
  }

  static async getApplicationById(
    applicationId: string,
    userId: string,
    userRole: string
  ): Promise<IApplication> {
    if (!mongoose.Types.ObjectId.isValid(applicationId)) {
      throw new AppError('Invalid application ID.', 400);
    }

    const application = await Application.findById(applicationId)
      .populate('job')
      .populate('applicant', 'name email phone');

    if (!application) {
      throw new AppError('Application record not found.', 404);
    }

    const job = application.job as any;
    const isOwner = job && job.owner && job.owner.toString() === userId;
    const isApplicant =
      application.applicant &&
      ((application.applicant as any)._id?.toString() === userId ||
        application.applicant.toString() === userId);

    if (userRole !== 'admin' && !isOwner && !isApplicant) {
      throw new AppError(
        'Forbidden: You are not authorized to access this application record.',
        403
      );
    }

    return application;
  }

  static async updateStatus(
    applicationId: string,
    userId: string,
    userRole: string,
    newStatus: ApplicationStatus
  ): Promise<IApplication> {
    const application = await Application.findById(applicationId).populate('job');
    if (!application) {
      throw new AppError('Application record not found.', 404);
    }

    const job = application.job as any;
    if (userRole !== 'admin' && job.owner.toString() !== userId) {
      throw new AppError(
        'Forbidden: Only the job poster or an admin can update application status.',
        403
      );
    }

    application.status = newStatus;
    await application.save();
    return application;
  }
}
