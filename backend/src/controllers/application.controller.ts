import { Request, Response, NextFunction } from 'express';
import { ApplicationService } from '../services/application.service';

export class ApplicationController {
  static async applyForJob(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      let uploadedResumeUrl: string | undefined;

      if (req.file) {
        // Build URL relative to host
        uploadedResumeUrl = `/uploads/resumes/${req.file.filename}`;
      }

      const application = await ApplicationService.apply(
        req.params.id,
        req.user!._id.toString(),
        req.body,
        uploadedResumeUrl
      );

      res.status(201).json({
        success: true,
        message: 'Your job application has been submitted successfully',
        data: { application },
      });
    } catch (error) {
      next(error);
    }
  }

  static async getMyApplications(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const applications = await ApplicationService.getMyApplications(
        req.user!._id.toString()
      );
      res.status(200).json({
        success: true,
        count: applications.length,
        data: applications,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getJobApplicationsForEmployer(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const applications = await ApplicationService.getJobApplicationsForEmployer(
        req.params.id,
        req.user!._id.toString(),
        req.user!.role
      );
      res.status(200).json({
        success: true,
        count: applications.length,
        data: applications,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const application = await ApplicationService.updateStatus(
        req.params.id,
        req.user!._id.toString(),
        req.user!.role,
        req.body.status
      );
      res.status(200).json({
        success: true,
        message: `Application status updated to ${req.body.status}`,
        data: { application },
      });
    } catch (error) {
      next(error);
    }
  }
}
