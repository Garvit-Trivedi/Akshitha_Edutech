import { Request, Response, NextFunction } from 'express';
import { JobService } from '../services/job.service';

export class JobController {
  static async listJobs(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await JobService.listJobs(req.query as any);
      res.status(200).json({
        success: true,
        count: result.jobs.length,
        total: result.total,
        page: result.page,
        limit: result.limit,
        totalPages: result.totalPages,
        data: result.jobs,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getJob(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { job, related } = await JobService.getJobByIdOrSlug(req.params.id);
      res.status(200).json({
        success: true,
        data: {
          job,
          related,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async createJob(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const job = await JobService.createJob(req.user!._id.toString(), req.body);
      res.status(201).json({
        success: true,
        message: 'Job posting submitted successfully',
        data: { job },
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateJob(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const job = await JobService.updateJob(
        req.params.id,
        req.user!._id.toString(),
        req.user!.role,
        req.body
      );
      res.status(200).json({
        success: true,
        message: 'Job updated successfully',
        data: { job },
      });
    } catch (error) {
      next(error);
    }
  }

  static async closeJob(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const job = await JobService.closeJob(
        req.params.id,
        req.user!._id.toString(),
        req.user!.role
      );
      res.status(200).json({
        success: true,
        message: 'Job vacancy has been closed',
        data: { job },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getMyJobs(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Strict security: always determine employer ownership via authenticated token
      const employerId = req.user!._id.toString();
      const jobs = await JobService.getMyJobs(employerId);
      res.status(200).json({
        success: true,
        count: jobs.length,
        data: jobs,
      });
    } catch (error) {
      next(error);
    }
  }
}
